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
        created_at: comments.createdAt,
      })
      .from(comments)
      .where(eq(comments.postId, _id))
      .orderBy(desc(comments.createdAt));

    // Mask emails: show first 2 chars + ***@domain
    const masked = commentsList.map((c: { id: number; name: string | null; email: string; content: string; created_at: Date }) => {
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

export const POST = async (
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

    // Check that the post exists
    const post = await db.query.posts.findFirst({
      where: eq(posts.id, _id),
    });
    if (!post) {
      return NextResponse.json(
        { message: "Post not found", status: "error" },
        { status: 404 }
      );
    }

    const body = await request.json();
    const parsed = createCommentSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: parsed.error.issues[0].message, data: null },
        { status: 400 }
      );
    }

    const { email, content, name } = parsed.data;
    const code = generateCode();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Store as pending — comment is NOT created until email is verified
    const [pending] = await db
      .insert(pendingComments)
      .values({
        email,
        content,
        name: name || null,
        postId: _id,
        verificationCode: code,
        verificationExpiresAt: expiresAt,
      })
      .returning();

    await sendVerificationEmail(email, code);

    return NextResponse.json(
      {
        data: { pending_id: pending.id },
        message: "Verification code sent to your email",
        status: "success",
      },
      { status: 201 }
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
