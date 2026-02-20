import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const verifySchema = z.object({
  pending_id: z.number().int(),
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

    const { pending_id, code } = parsed.data;

    const pending = await prisma.pendingComment.findFirst({
      where: { id: pending_id, post_id: _id },
    });

    if (!pending) {
      return NextResponse.json(
        { message: "Pending comment not found", status: "error" },
        { status: 404 }
      );
    }

    if (pending.verification_code !== code) {
      return NextResponse.json(
        { message: "Invalid verification code", status: "error" },
        { status: 400 }
      );
    }

    if (new Date() > pending.verification_expires_at) {
      return NextResponse.json(
        { message: "Verification code has expired", status: "error" },
        { status: 400 }
      );
    }

    // Email verified — now create the actual comment and delete the pending record
    const comment = await prisma.$transaction(async (tx: any) => {
      const created = await tx.comment.create({
        data: {
          email: pending.email,
          content: pending.content,
          name: pending.name,
          post_id: pending.post_id,
        },
        select: {
          id: true,
          name: true,
          content: true,
          created_at: true,
        },
      });

      await tx.pendingComment.delete({ where: { id: pending_id } });

      return created;
    });

    return NextResponse.json(
      {
        data: comment,
        message: "Comment verified and published",
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
