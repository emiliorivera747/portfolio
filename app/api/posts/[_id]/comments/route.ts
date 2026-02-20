import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
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

    const comments = await prisma.comment.findMany({
      where: { post_id: _id },
      orderBy: { created_at: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        content: true,
        created_at: true,
      },
    });

    // Mask emails: show first 2 chars + ***@domain
    const masked = comments.map((c: { id: number; name: string | null; email: string; content: string; created_at: Date }) => {
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
    const post = await prisma.post.findUnique({ where: { id: _id } });
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
    const pending = await prisma.pendingComment.create({
      data: {
        email,
        content,
        name: name || null,
        post_id: _id,
        verification_code: code,
        verification_expires_at: expiresAt,
      },
    });

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
