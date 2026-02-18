import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const verifySchema = z.object({
  comment_id: z.number().int(),
  code: z.string().length(6, "Code must be 6 digits"),
});

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

    const body = await request.json();
    const parsed = verifySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: parsed.error.issues[0].message, data: null },
        { status: 400 }
      );
    }

    const { comment_id, code } = parsed.data;

    const comment = await prisma.comment.findFirst({
      where: { id: comment_id, post_id: _id },
    });

    if (!comment) {
      return NextResponse.json(
        { message: "Comment not found", status: "error" },
        { status: 404 }
      );
    }

    if (comment.verified) {
      return NextResponse.json(
        { message: "Comment already verified", status: "success" },
        { status: 200 }
      );
    }

    if (comment.verification_code !== code) {
      return NextResponse.json(
        { message: "Invalid verification code", status: "error" },
        { status: 400 }
      );
    }

    if (
      comment.verification_expires_at &&
      new Date() > comment.verification_expires_at
    ) {
      return NextResponse.json(
        { message: "Verification code has expired", status: "error" },
        { status: 400 }
      );
    }

    const verified = await prisma.comment.update({
      where: { id: comment_id },
      data: {
        verified: true,
        verification_code: null,
        verification_expires_at: null,
      },
      select: {
        id: true,
        name: true,
        content: true,
        created_at: true,
      },
    });

    return NextResponse.json(
      {
        data: verified,
        message: "Comment verified and published",
        status: "success",
      },
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
