import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db/drizzle";
import { comments, pendingComments } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

const verifySchema = z.object({
  pendingId: z.number().int(),
  code: z.string().length(6, "Code must be 6 digits"),
});

// POST disabled — comments are temporarily turned off
export const POST = async () => {
  return NextResponse.json(
    { message: "Comments are currently disabled", status: "error" },
    { status: 403 }
  );
};
