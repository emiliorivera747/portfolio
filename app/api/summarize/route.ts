import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { authenticateUser } from "@/utils/api-helpers/authenticateUser";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: Request) {
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

    const summary = result.response.text();

    return NextResponse.json({ summary });
  } catch (error) {
    console.error("Summarize API error:", error);
    return NextResponse.json(
      { error: "Failed to generate summary" },
      { status: 500 }
    );
  }
}
