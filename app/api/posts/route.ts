import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db/drizzle";
import { users, posts, contentBlocks } from "@/lib/db/schema";
import { eq, asc } from "drizzle-orm";
import { z } from "zod";
import { authenticateUser } from "@/utils/api-helpers/authenticateUser";

// Validation schema for the request body
const postSchema = z.object({
  user_id: z.string().optional(),
  description: z.string().optional(),
  title: z.string().optional(),
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

/**
 *
 * Adds a new post and validate the input
 *
 */
export async function POST(req: NextRequest) {
  const result = await authenticateUser();
  if (result instanceof NextResponse) return result;

  const body = await req.json();
  const parsed = postSchema.safeParse(body);
  console.log(body)

  if (!parsed.success) {
    return NextResponse.json(
      { message: parsed.error.issues[0].message, data: null },
      { status: 400 }
    );
  }

  const { user_id, title, content_blocks, description } = parsed.data;

  try {
    /**
     *  To make sure all database operations get executed at the same
     *  we use the transaction.
     */
    const post = await db.transaction(async (tx) => {
      // Ensure the authenticated user exists in the User table
      const userId = user_id ? user_id : result.id;
      await tx
        .insert(users)
        .values({
          userId: userId,
          email: result.email ?? `${userId}@unknown`,
          name: result.user_metadata?.full_name ?? null,
          emailVerified: !!result.email_confirmed_at,
        })
        .onConflictDoNothing({ target: users.userId });

      /**
       * Create a new post
       */
      const now = new Date();
      const [newPost] = await tx
        .insert(posts)
        .values({
          id: `${title
            ?.toLowerCase()
            .replace(/[^a-z0-9\s]/g, "") // Remove special characters
            .split(" ")
            .join("-")}-${new Date()
            .toLocaleDateString("en-US", {
              month: "long", // Use full month name
              day: "2-digit",
            })
            .toLowerCase()
            .replace(/ /g, "-")}`, // Add the formatted date (month-dd-yyyy) to the end
          title,
          userId: userId,
          description: description,
          createdAt: now,
          updatedAt: now,
        })
        .returning();

      const post_id = newPost.id;

      for (const block of content_blocks) {
        const { media, ...blockData } = block as any;
        await tx.insert(contentBlocks).values({
          contentOrder: blockData.content_order,
          contentType: blockData.content_type,
          contentData: blockData.content_data,
          postId: newPost.id,
          mediaId: media?.id ? Number(media.id) : null,
          createdAt: now,
          updatedAt: now,
        });
      }

      /**
       * Retrieve the post
       */
      const cb = await tx
        .select()
        .from(contentBlocks)
        .where(eq(contentBlocks.postId, post_id))
        .orderBy(asc(contentBlocks.contentOrder));

      return {
        ...newPost,
        content_blocks: cb,
      };
    });

    // Transform to match frontend expectations (snake_case)
    const { createdAt, updatedAt, content_blocks, ...restPost } = post;
    const transformedPost = {
      ...restPost,
      created_at: createdAt,
      updated_at: updatedAt,
      content_block: content_blocks?.map((block: any) => ({
        id: block.id,
        content_order: block.contentOrder,
        content_type: block.contentType,
        content_data: block.contentData,
        post_id: block.postId,
        media_id: block.mediaId,
        created_at: block.createdAt,
        updated_at: block.updatedAt,
      })),
    };

    return NextResponse.json(
      { data: transformedPost, status: "success" },
      { status: 201 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "unknown error";

    console.log("errorMessage", errorMessage);

    return NextResponse.json(
      {
        message: errorMessage,
        data: null,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const allPosts = await db.query.posts.findMany({
      with: {
        contentBlocks: {
          orderBy: [asc(contentBlocks.contentOrder)],
        },
      },
    });

    // Transform to match frontend expectations (snake_case from Prisma)
    const transformedPosts = allPosts.map((post) => {
      const { contentBlocks: postContentBlocks, createdAt, updatedAt, ...rest } = post;
      return {
        ...rest,
        created_at: createdAt,
        updated_at: updatedAt,
        content_block: postContentBlocks?.map((block: any) => ({
          id: block.id,
          content_order: block.contentOrder,
          content_type: block.contentType,
          content_data: block.contentData,
          post_id: block.postId,
          media_id: block.mediaId,
          created_at: block.createdAt,
          updated_at: block.updatedAt,
        })),
      };
    });

    return NextResponse.json(
      { data: transformedPosts, status: "success" },
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
}
