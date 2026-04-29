import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db/drizzle";
import { comments, pendingComments } from "@/lib/db/schema";
import { eq, and, gt } from "drizzle-orm";

const verifySchema = z.object({
  pendingId: z.number().int(),
  code: z.string().length(6, "Code must be 6 digits"),
});

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const parsed = verifySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: parsed.error.issues[0].message, status: "error" },
        { status: 422 }
      );
    }

    const { pendingId, code } = parsed.data;

    const [pending] = await db
      .select()
      .from(pendingComments)
      .where(
        and(
          eq(pendingComments.id, pendingId),
          eq(pendingComments.verificationCode, code),
          gt(pendingComments.verificationExpiresAt, new Date())
        )
      )
      .limit(1);

    if (!pending) {
      return NextResponse.json(
        { message: "Invalid or expired verification code", status: "error" },
        { status: 400 }
      );
    }

    const now = new Date();
    const [comment] = await db
      .insert(comments)
      .values({
        postId: pending.postId,
        email: pending.email,
        name: pending.name,
        content: pending.content,
        createdAt: now,
        updatedAt: now,
      })
      .returning({ id: comments.id });

    await db.delete(pendingComments).where(eq(pendingComments.id, pendingId));

    return NextResponse.json(
      { data: { commentId: comment.id }, status: "success" },
      { status: 201 }
    );
  } catch (error) {
    console.error("[verify-comment]", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { message: errorMessage, data: null },
      { status: 500 }
    );
  }
};
