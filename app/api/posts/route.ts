import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
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
              id: z.string().optional(),
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
     *  we use the $transaction.
     */
    const post = await prisma.$transaction(async (prisma: any) => {
      /**
       * Create a new post
       */
      const newPost = await prisma.post.create({
        data: {
          id: title
        ?.toLowerCase()
        .replace(/[^a-z0-9\s]/g, "") // Remove special characters
        .split(" ")
        .join("-"),
          title,
          user_id: user_id ? user_id : result.id,
          description: description,
        },
      });

      const post_id = newPost.id;

      for (const block of content_blocks) {
        const { media, ...blockData } = block;

        /**
         * Create content block
         */
        const cb = await prisma.ContentBlock.create({
          data: {
            ...blockData,
            post_id: newPost.id,
          },
        });

        /**
         * Create media
         */
        if (media) {
          await prisma.Media.create({
            data: {
              provider_asset_id: media.provider_asset_id,
              url: media.url,
              media_type: media.media_type,
              description: media.description,
              alt: media.alt,
              contentBlock: { connect: { id: cb.id } },
            },
          });
        }
      }

      /**
       * Retrieve the post
       */
      const cb = await prisma.ContentBlock.findMany({
        where: {
          post_id,
        },
        orderBy: {
          content_order: "asc",
        },
      });

      return {
        ...newPost,
        content_blocks: cb,
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
    const posts = await prisma.post.findMany({
      include: {
        content_block: {
          orderBy: {
            content_order: "asc",
          },
        },
      },
    });

    return NextResponse.json(
      { data: posts, status: "success" },
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
