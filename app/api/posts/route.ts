import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import type { PrismaClient } from "@prisma/client";

import { z } from "zod";

// Validation schema for the request body
const postSchema = z.object({
  user_id: z.number().int().optional(), // user_id is Int in schema
  title: z.string().optional(), // title is not in schema, but assuming you meant description
  content_blocks: z
    .array(
      z.object({
        content_order: z.number().int(),
        content_type: z.enum([
          "title",
          "subtitle",
          "paragraph",
          "list",
          "image",
          "video",
        ]),
        content_data: z.record(z.string(), z.any()), // JSON object for TipTap
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
  const body = await req.json();
  const parsed = postSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { message: parsed.error.issues[0].message, data: null },
      { status: 400 }
    );
  }

  const { user_id, title, content_blocks } = parsed.data;

  try {
    
    const post = await prisma.$transaction(async (prisma: any) => {
      
      /**
       * Create a new post
       */
      const newPost = await prisma.post.create({
        data: {
          title,
          user_id,
        },
      });

      const post_id = newPost.id;

      /**
       * Add id's to the content blocks
       */
      const contentBlocksPostId = content_blocks.map(
        ({ content_order, content_type, content_data }) => {
          return {
            post_id: newPost.id,
            content_order,
            content_type,
            content_data,
          };
        }
      );

      console.log(contentBlocksPostId);

      /**
       * Creat the content blocks
       */
      await prisma.ContentBlock.createMany({
        data: contentBlocksPostId,
      });

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

