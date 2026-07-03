import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ALLOWED_ORIGINS = [
  "https://emilioulisesrivera.com",
  "https://www.emilioulisesrivera.com",
  ...(process.env.NODE_ENV === "development" ? ["http://localhost:3000"] : []),
];

export function middleware(request: NextRequest) {
  const origin = request.headers.get("origin") ?? "";
  const isAllowed = ALLOWED_ORIGINS.includes(origin);

  if (request.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": isAllowed ? origin : ALLOWED_ORIGINS[0],
        "Access-Control-Allow-Methods": "GET,OPTIONS,POST,PUT,DELETE",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Max-Age": "86400",
      },
    });
  }

  const response = NextResponse.next();
  response.headers.set(
    "Access-Control-Allow-Origin",
    isAllowed ? origin : ALLOWED_ORIGINS[0]
  );
  response.headers.set("Access-Control-Allow-Methods", "GET,OPTIONS,POST,PUT,DELETE");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return response;
}

export const config = {
  matcher: "/api/:path*",
};
