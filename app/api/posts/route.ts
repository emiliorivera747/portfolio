import { NextResponse, NextRequest } from "next/server";

/**
 *
 * Adds a new post and validate the input
 *
 */
export async function POST(req: NextRequest) {
  
  const body = await req.json();
  console.log(body);

  try {
    return NextResponse.json(
      {
        status: "success",
        message: "Your first request was successful",
      },
      { status: 200 }
    );
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
