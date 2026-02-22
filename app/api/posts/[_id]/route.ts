import { NextResponse } from "next/server";
import { db } from "@/lib/db/drizzle";
import { posts, users, contentBlocks, media, postTags, comments } from "@/lib/db/schema";
import { eq, asc } from "drizzle-orm";
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
  content_blocks: z
    .array(
      z
        .object({
          content_order: z.number().int(),
          content_type: z.enum(["doc", "image", "video"]),
          content_data: z.record(z.string(), z.any()),
        })
        .extend({
          media: z
            .object({
              provider_asset_id: z.string().optional(),
              id: z.number().optional(),
              url: z.string().url(),
              alt: z.string().optional(),
              media_type: z.enum(["image", "video"]),
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

    const body = await request.json();
    const parsed = updatePostSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: parsed.error.issues[0].message, data: null },
        { status: 400 }
      );
    }

    const { title, description, content_blocks } = parsed.data;

    const post = await db.transaction(async (tx) => {
      // Update the post metadata
      await tx
        .update(posts)
        .set({
          title,
          description,
        })
        .where(eq(posts.id, _id));

      // Delete existing content blocks for this post
      await tx.delete(contentBlocks).where(eq(contentBlocks.postId, _id));

      // Create new content blocks
      for (const block of content_blocks) {
        const { media, ...blockData } = block;
        await tx.insert(contentBlocks).values({
          contentOrder: blockData.content_order,
          contentType: blockData.content_type,
          contentData: blockData.content_data,
          postId: _id,
          mediaId: media?.id ? media.id : null,
        });
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
