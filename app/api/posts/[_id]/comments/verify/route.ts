import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db/drizzle";
import { comments, pendingComments } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

const verifySchema = z.object({
  pendingId: z.number().int(),
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

    const { pendingId, code } = parsed.data;

    const pending = await db.query.pendingComments.findFirst({
      where: and(
        eq(pendingComments.id, pendingId),
        eq(pendingComments.postId, _id)
      ),
    });

    if (!pending) {
      return NextResponse.json(
        { message: "Pending comment not found", status: "error" },
        { status: 404 }
      );
    }

    if (pending.verificationCode !== code) {
      return NextResponse.json(
        { message: "Invalid verification code", status: "error" },
        { status: 400 }
      );
    }

    if (new Date() > pending.verificationExpiresAt) {
      return NextResponse.json(
        { message: "Verification code has expired", status: "error" },
        { status: 400 }
      );
    }

    // Email verified — now create the actual comment and delete the pending record
    const comment = await db.transaction(async (tx) => {
      const [created] = await tx
        .insert(comments)
        .values({
          email: pending.email,
          content: pending.content,
          name: pending.name,
          postId: pending.postId,
        })
        .returning({
          id: comments.id,
          name: comments.name,
          content: comments.content,
          createdAt: comments.createdAt,
        });

      await tx
        .delete(pendingComments)
        .where(eq(pendingComments.id, pendingId));

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
