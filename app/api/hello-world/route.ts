import { NextResponse, NextRequest } from "next/server";

/**
 * 
 * Gets hello world message
 * 
 * @returns 
 */
export async function GET() {
  try {
    return NextResponse.json({
      status: "success",
      message: "Hello World!",
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "unknown error";
    return NextResponse.json(
      {
        message: errorMessage,
        data: null,
      },
      { status: 500 }
    );
  }
}
