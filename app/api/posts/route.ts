import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db/drizzle";
import { users, posts, contentBlocks } from "@/lib/db/schema";
import { eq, asc } from "drizzle-orm";
import { z } from "zod";
import { authenticateUser } from "@/utils/api-helpers/authenticateUser";

// Validation schema for the request body
const postSchema = z.object({
  userId: z.string().optional(),
  description: z.string().optional(),
  title: z.string().optional(),
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

  if (!parsed.success) {
    return NextResponse.json(
      { message: parsed.error.issues[0].message, data: null },
      { status: 400 }
    );
  }

  const { userId, title, contentBlocks: blocks, description } = parsed.data;

  try {
    /**
     *  To make sure all database operations get executed at the same
     *  we use the transaction.
     */
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

      /**
       * Retrieve the post
       */
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

    return NextResponse.json(
      { data: allPosts, status: "success" },
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
