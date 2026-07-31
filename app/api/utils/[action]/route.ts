import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";
import { sendContactEmail } from "@/lib/resend";
import { uploadMedia } from "@/services/media-storage/upload-media";
import { authenticateUser } from "@/utils/api-helpers/authenticateUser";

// Consolidates four independent, single-purpose POST endpoints
// (contact, save-remote-media, sign-cloudinary-params, summarize) into one
// dynamic route, so Vercel only counts one serverless function instead of
// four. These are first-party endpoints only called from this app's own
// frontend, so their paths moved from /api/{name} to /api/utils/{name} —
// callers were updated accordingly.

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

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

// ---------- save-remote-media ----------

type RemoteMediaBody = {
  remoteUrl: string;
  alt: string;
  mediaType: string;
};

async function saveRemoteMedia(request: Request) {
  const authResult = await authenticateUser();
  if (authResult instanceof NextResponse) return authResult;

  try {
    const { remoteUrl, alt } = (await request.json()) as RemoteMediaBody;

    if (!remoteUrl) {
      return NextResponse.json(
        { error: "No remote URL provided." },
        { status: 400 }
      );
    }

    // Validate URL to prevent SSRF — only allow known media hostnames
    let parsedUrl: URL;
    try {
      parsedUrl = new URL(remoteUrl);
    } catch {
      return NextResponse.json({ error: "Invalid URL." }, { status: 400 });
    }
    const allowedHosts = ["res.cloudinary.com", "images.unsplash.com"];
    if (!allowedHosts.includes(parsedUrl.hostname) || parsedUrl.protocol !== "https:") {
      return NextResponse.json({ error: "URL not allowed." }, { status: 400 });
    }

    const response = await fetch(remoteUrl);
    if (!response.ok)
      throw new Error(`Failed to fetch file from URL: ${response.statusText}`);

    const fileBuffer = Buffer.from(await response.arrayBuffer());
    const fileType =
      response.headers.get("content-type") || "application/octet-stream";

    const mediaRecord = await uploadMedia({
      fileBuffer,
      fileType,
      alt,
    });

    return NextResponse.json(mediaRecord, { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "A server error or download/upload error occurred.";
    if (process.env.NODE_ENV === "development") {
      console.log(errorMessage);
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// ---------- sign-cloudinary-params ----------

async function signCloudinaryParams(request: Request) {
  const result = await authenticateUser();
  if (result instanceof NextResponse) return result;

  try {
    const body = await request.json();
    const { paramsToSign } = body;

    if (!paramsToSign) {
      return NextResponse.json(
        { error: "Missing parameters to sign" },
        { status: 400 }
      );
    }

    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET as string
    );

    return NextResponse.json({ signature }, { status: 200 });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Signature generation failed:", error);
    }
    return NextResponse.json(
      { error: "Failed to generate Cloudinary signature." },
      { status: 500 }
    );
  }
}

// ---------- summarize ----------

async function summarize(request: Request) {
  const authResult = await authenticateUser();
  if (authResult instanceof NextResponse) return authResult;

  try {
    const { content } = await request.json();

    if (!content || typeof content !== "string" || content.trim().length === 0) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent(
      `You are a helpful assistant that summarizes blog posts. Provide a clear, concise summary in that captures the key points of the article.\n\nSummarize the following blog post:\n\n${content}`
    );

    const summaryText = result.response.text();

    return NextResponse.json({ summary: summaryText });
  } catch (error) {
    console.error("Summarize API error:", error);
    return NextResponse.json(
      { error: "Failed to generate summary" },
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
    case "save-remote-media":
      return saveRemoteMedia(request);
    case "sign-cloudinary-params":
      return signCloudinaryParams(request);
    case "summarize":
      return summarize(request);
    default:
      return NextResponse.json(
        { message: "Not found", status: "error" },
        { status: 404 }
      );
  }
}
