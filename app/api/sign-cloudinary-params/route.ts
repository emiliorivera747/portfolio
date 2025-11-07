// app/api/sign-cloudinary-params/route.ts

import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

import { authenticateUser } from "@/utils/api-helpers/authenticateUser";


cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
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

    // This is the core function: it uses the CLOUDINARY_API_SECRET
    // to generate a secure, time-limited signature for the client.
    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET as string 
    );

    return NextResponse.json({ signature }, { status: 200 });
  } catch (error) {
    console.error("Signature generation failed:", error);
    return NextResponse.json(
      { error: "Failed to generate Cloudinary signature." },
      { status: 500 }
    );
  }
}
