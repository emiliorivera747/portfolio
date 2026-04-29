import { NextResponse } from "next/server";
import { db } from "@/lib/db/drizzle";
import { posts, users, contentBlocks, media, postTags, comments } from "@/lib/db/schema";
import { eq, asc, and } from "drizzle-orm";
import { z } from "zod";
import { authenticateUser } from "@/utils/api-helpers/authenticateUser";

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ _id: string }> }
) => {
  try {
    const { _id } = await params;

    if (!_id) {
      return NextResponse.json(
        { message: "Post ID not provided", status: "error" },
        { status: 400 }
      );
    }

    const post = await db.query.posts.findFirst({
      where: eq(posts.id, _id),
      with: {
        user: true,
        contentBlocks: {
          orderBy: [asc(contentBlocks.contentOrder)],
          with: {
            media: true,
          },
        },
      },
    });

    if (!post) {
      return NextResponse.json(
        { message: "Post not found", status: "error" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { data: post, status: "success" },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "unknown error";
    return NextResponse.json(
      {
        message: errorMessage,
        data: null,
      },
      { status: 500 }
    );
  }
};

const updatePostSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  contentBlocks: z
    .array(
      z
        .object({
          contentOrder: z.number().int(),
          contentType: z.enum(["doc", "image", "video", "iframe"]),
          contentData: z.record(z.string(), z.any()),
        })
        .extend({
          media: z
            .object({
              providerAssetId: z.string().optional(),
              id: z.number().optional(),
              url: z.string().url(),
              alt: z.string().optional(),
              mediaType: z.enum(["image", "video"]),
              description: z.string().optional(),
            })
            .optional(),
        })
    )
    .min(1, "At least one content block is required"),
});

export const PUT = async (
  request: Request,
  { params }: { params: Promise<{ _id: string }> }
) => {
  const result = await authenticateUser();
  if (result instanceof NextResponse) return result;

  try {
    const { _id } = await params;

    if (!_id) {
      return NextResponse.json(
        { message: "Post ID not provided", status: "error" },
        { status: 400 }
      );
    }

    // Verify the post belongs to the authenticated user
    const existingPost = await db.query.posts.findFirst({
      where: and(eq(posts.id, _id), eq(posts.userId, result.id)),
    });
    if (!existingPost) {
      return NextResponse.json(
        { message: "Post not found or unauthorized", status: "error" },
        { status: 403 }
      );
    }

    const body = await request.json();

    // Debug logging
    if (process.env.NODE_ENV === 'development') {
      console.log('PUT /api/posts/[_id] - Request body:', JSON.stringify(body, null, 2));
      console.log('Content blocks with media:', body.contentBlocks?.map((b: any) => ({
        contentType: b.contentType,
        hasMedia: !!b.media,
        mediaId: b.media?.id,
        mediaUrl: b.media?.url
      })));
    }

    const parsed = updatePostSchema.safeParse(body);

    if (!parsed.success) {
      console.error('Validation error:', parsed.error.issues);
      return NextResponse.json(
        { message: parsed.error.issues[0].message, data: null },
        { status: 400 }
      );
    }

    const { title, description, contentBlocks: blocks } = parsed.data;

    const post = await db.transaction(async (tx) => {
      const now = new Date();

      // Update the post metadata
      await tx
        .update(posts)
        .set({
          title,
          description,
          updatedAt: now,
        })
        .where(eq(posts.id, _id));

      // Delete existing content blocks for this post
      await tx.delete(contentBlocks).where(eq(contentBlocks.postId, _id));

      // Create new content blocks
      for (const block of blocks) {
        const { media, ...blockData } = block;
        const insertData = {
          contentOrder: blockData.contentOrder,
          contentType: blockData.contentType,
          contentData: blockData.contentData,
          postId: _id,
          mediaId: media?.id ? Number(media.id) : null,
          createdAt: now,
          updatedAt: now,
        };

        if (process.env.NODE_ENV === 'development') {
          console.log('Inserting content block:', {
            contentType: insertData.contentType,
            mediaId: insertData.mediaId,
            hasMedia: !!media,
            mediaObject: media
          });
        }

        await tx.insert(contentBlocks).values(insertData);
      }

      // Retrieve the updated post with content blocks
      const fullPost = await tx.query.posts.findFirst({
        where: eq(posts.id, _id),
        with: {
          contentBlocks: {
            orderBy: [asc(contentBlocks.contentOrder)],
            with: { media: true },
          },
        },
      });

      return fullPost;
    });

    return NextResponse.json(
      { data: post, status: "success" },
      { status: 200 }
    );
  } catch (error) {
    console.error("PUT /api/posts/[_id] error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "unknown error";
    return NextResponse.json(
      { message: errorMessage, data: null },
      { status: 500 }
    );
  }
};

export const DELETE = async (
  request: Request,
  { params }: { params: Promise<{ _id: string }> }
) => {
  const result = await authenticateUser();
  if (result instanceof NextResponse) return result;

  try {
    const { _id } = await params;

    if (!_id) {
      return NextResponse.json(
        { message: "Post ID not provided", status: "error" },
        { status: 400 }
      );
    }

    // Verify the post belongs to the authenticated user
    const existingPost = await db.query.posts.findFirst({
      where: and(eq(posts.id, _id), eq(posts.userId, result.id)),
    });
    if (!existingPost) {
      return NextResponse.json(
        { message: "Post not found or unauthorized", status: "error" },
        { status: 403 }
      );
    }

    await db.transaction(async (tx) => {
      // Delete content blocks first (due to FK constraint)
      await tx.delete(contentBlocks).where(eq(contentBlocks.postId, _id));
      // Delete post tags
      await tx.delete(postTags).where(eq(postTags.postId, _id));
      // Delete comments
      await tx.delete(comments).where(eq(comments.postId, _id));
      // Delete the post
      await tx.delete(posts).where(eq(posts.id, _id));
    });

    return NextResponse.json(
      { message: "Post deleted successfully", status: "success" },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "unknown error";
    return NextResponse.json(
      { message: errorMessage, data: null },
      { status: 500 }
    );
  }
};
