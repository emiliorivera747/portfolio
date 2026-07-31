import { NextResponse } from "next/server";
import { z } from "zod";
import { sendContactEmail } from "@/lib/resend";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message cannot be empty").max(5000),
});

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: parsed.error.issues[0].message, status: "error" },
        { status: 422 }
      );
    }

    await sendContactEmail(
      parsed.data.name,
      parsed.data.email,
      parsed.data.message
    );

    return NextResponse.json({ status: "success" }, { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { message: errorMessage, status: "error" },
      { status: 500 }
    );
  }
};
