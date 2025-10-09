import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async (
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

    const post = 

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
};
