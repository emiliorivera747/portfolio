import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db/drizzle";
import { users, posts, contentBlocks, postTags } from "@/lib/db/schema";
import { eq, asc, and } from "drizzle-orm";
import { authenticateUser } from "@/utils/api-helpers/authenticateUser";

// Consolidates what used to be two separate route files
// (posts/ and posts/[_id]/) into one optional catch-all, so Vercel only
// counts one serverless function instead of two. Public URLs are unchanged.

type RouteParams = { params: Promise<{ path?: string[] }> };

const postSchema = z.object({
  userId: z.string().optional(),
  description: z.string().optional(),
  title: z.string().optional(),
  contentBlocks: z
    .array(
      z
        .object({
          contentOrder: z.number().int(),
          contentType: z.enum(["doc", "image", "video", "iframe", "code"]),
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

const updatePostSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  contentBlocks: z
    .array(
      z
        .object({
          contentOrder: z.number().int(),
          contentType: z.enum(["doc", "image", "video", "iframe", "code"]),
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

function notFound() {
  return NextResponse.json(
    { message: "Not found", status: "error" },
    { status: 404 }
  );
}

// ---------- GET: list all posts | single post ----------

async function listPosts() {
  try {
    const allPosts = await db.query.posts.findMany({
      with: {
        contentBlocks: {
          orderBy: [asc(contentBlocks.contentOrder)],
        },
      },
    });

    return NextResponse.json(
      { data: allPosts, status: "success" },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "unknown error";
    return NextResponse.json({ message: errorMessage, data: null }, { status: 500 });
  }
}

async function getPost(_id: string) {
  try {
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
    return NextResponse.json({ message: errorMessage, data: null }, { status: 500 });
  }
}

export async function GET(request: Request, { params }: RouteParams) {
  const { path = [] } = await params;

  if (path.length === 0) return listPosts();

  const [_id] = path;
  if (!_id) {
    return NextResponse.json(
      { message: "Post ID not provided", status: "error" },
      { status: 400 }
    );
  }

  if (path.length === 1) return getPost(_id);

  return notFound();
}

// ---------- POST: create post ----------

async function createPost(request: Request) {
  const result = await authenticateUser();
  if (result instanceof NextResponse) return result;

  const body = await request.json();
  const parsed = postSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { message: parsed.error.issues[0].message, data: null },
      { status: 400 }
    );
  }

  const { userId, title, contentBlocks: blocks, description } = parsed.data;

  try {
    const post = await db.transaction(async (tx) => {
      // Ensure the authenticated user exists in the User table
      const userIdValue = userId ? userId : result.id;
      await tx
        .insert(users)
        .values({
          userId: userIdValue,
          email: result.email ?? `${userIdValue}@unknown`,
          name: result.user_metadata?.full_name ?? null,
          emailVerified: !!result.email_confirmed_at,
        })
        .onConflictDoNothing({ target: users.userId });

      const now = new Date();
      const [newPost] = await tx
        .insert(posts)
        .values({
          id: `${title
            ?.toLowerCase()
            .replace(/[^a-z0-9\s]/g, "")
            .split(" ")
            .join("-")}-${new Date()
            .toLocaleDateString("en-US", {
              month: "long",
              day: "2-digit",
            })
            .toLowerCase()
            .replace(/ /g, "-")}`,
          title,
          userId: userIdValue,
          description: description,
          createdAt: now,
          updatedAt: now,
        })
        .returning();

      const postId = newPost.id;

      for (const block of blocks) {
        const { media, ...blockData } = block as any;
        await tx.insert(contentBlocks).values({
          contentOrder: blockData.contentOrder,
          contentType: blockData.contentType,
          contentData: blockData.contentData,
          postId: newPost.id,
          mediaId: media?.id ? Number(media.id) : null,
          createdAt: now,
          updatedAt: now,
        });
      }

      const cb = await tx
        .select()
        .from(contentBlocks)
        .where(eq(contentBlocks.postId, postId))
        .orderBy(asc(contentBlocks.contentOrder));

      return {
        ...newPost,
        contentBlocks: cb,
      };
    });

    return NextResponse.json(
      { data: post, status: "success" },
      { status: 201 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "unknown error";
    return NextResponse.json({ message: errorMessage, data: null }, { status: 500 });
  }
}

export async function POST(request: Request, { params }: RouteParams) {
  const { path = [] } = await params;
  if (path.length !== 0) return notFound();
  return createPost(request);
}

// ---------- PUT: update post ----------

export async function PUT(request: Request, { params }: RouteParams) {
  const { path = [] } = await params;
  if (path.length !== 1) return notFound();
  const [_id] = path;

  const result = await authenticateUser();
  if (result instanceof NextResponse) return result;

  try {
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

    if (process.env.NODE_ENV === "development") {
      console.log("PUT /api/posts/[_id] - Request body:", JSON.stringify(body, null, 2));
      console.log(
        "Content blocks with media:",
        body.contentBlocks?.map((b: any) => ({
          contentType: b.contentType,
          hasMedia: !!b.media,
          mediaId: b.media?.id,
          mediaUrl: b.media?.url,
        }))
      );
    }

    const parsed = updatePostSchema.safeParse(body);

    if (!parsed.success) {
      console.error("Validation error:", parsed.error.issues);
      return NextResponse.json(
        { message: parsed.error.issues[0].message, data: null },
        { status: 400 }
      );
    }

    const { title, description, contentBlocks: blocks } = parsed.data;

    const post = await db.transaction(async (tx) => {
      const now = new Date();

      await tx
        .update(posts)
        .set({
          title,
          description,
          updatedAt: now,
        })
        .where(eq(posts.id, _id));

      await tx.delete(contentBlocks).where(eq(contentBlocks.postId, _id));

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

        if (process.env.NODE_ENV === "development") {
          console.log("Inserting content block:", {
            contentType: insertData.contentType,
            mediaId: insertData.mediaId,
            hasMedia: !!media,
            mediaObject: media,
          });
        }

        await tx.insert(contentBlocks).values(insertData);
      }

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
    return NextResponse.json({ message: errorMessage, data: null }, { status: 500 });
  }
}

// ---------- DELETE: delete post ----------

export async function DELETE(request: Request, { params }: RouteParams) {
  const { path = [] } = await params;
  if (path.length !== 1) return notFound();
  const [_id] = path;

  const result = await authenticateUser();
  if (result instanceof NextResponse) return result;

  try {
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
      await tx.delete(contentBlocks).where(eq(contentBlocks.postId, _id));
      await tx.delete(postTags).where(eq(postTags.postId, _id));
      await tx.delete(posts).where(eq(posts.id, _id));
    });

    return NextResponse.json(
      { message: "Post deleted successfully", status: "success" },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "unknown error";
    return NextResponse.json({ message: errorMessage, data: null }, { status: 500 });
  }
}
