import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db/drizzle";
import { comments, posts, pendingComments } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { sendVerificationEmail } from "@/lib/resend";
import crypto from "crypto";

const createCommentSchema = z.object({
  email: z.string().email("Invalid email address"),
  content: z.string().min(1, "Comment cannot be empty").max(2000, "Comment is too long"),
  name: z.string().max(100).optional(),
});

function generateCode(): string {
  return crypto.randomInt(100000, 999999).toString();
}

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

    const commentsList = await db
      .select({
        id: comments.id,
        name: comments.name,
        email: comments.email,
        content: comments.content,
        createdAt: comments.createdAt,
      })
      .from(comments)
      .where(eq(comments.postId, _id))
      .orderBy(desc(comments.createdAt));

    // Mask emails: show first 2 chars + ***@domain
    const masked = commentsList.map((c: { id: number; name: string | null; email: string; content: string; createdAt: Date }) => {
      const [local, domain] = c.email.split("@");
      const maskedEmail =
        local.slice(0, 2) + "***@" + domain;
      return { ...c, email: maskedEmail };
    });

    return NextResponse.json(
      { data: masked, status: "success" },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { message: errorMessage, data: null },
      { status: 500 }
    );
  }
};

// POST disabled — comments are temporarily turned off
export const POST = async () => {
  return NextResponse.json(
    { message: "Comments are currently disabled", status: "error" },
    { status: 403 }
  );
};
