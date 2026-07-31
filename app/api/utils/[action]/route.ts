import { NextResponse } from "next/server";
import { z } from "zod";
import { sendContactEmail } from "@/lib/resend";

// Kept as a dynamic route (rather than a plain /api/contact route) since it
// used to consolidate contact, save-remote-media, sign-cloudinary-params,
// and summarize into one serverless function. The other three were
// blog-only and removed along with the blog feature.

const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message cannot be empty").max(5000),
});

type RouteParams = { params: Promise<{ action: string }> };

// ---------- contact ----------

async function contact(request: Request) {
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
}

// ---------- dispatch ----------

export async function POST(request: Request, { params }: RouteParams) {
  const { action } = await params;

  switch (action) {
    case "contact":
      return contact(request);
    default:
      return NextResponse.json(
        { message: "Not found", status: "error" },
        { status: 404 }
      );
  }
}
