import { type NextRequest, NextResponse } from "next/server";

const ALLOWED_ORIGINS = [
  "https://emilioulisesrivera.com",
  "https://www.emilioulisesrivera.com",
  ...(process.env.NODE_ENV === "development" ? ["http://localhost:3000"] : []),
];

// Only handles CORS for first-party API routes now — the Supabase
// auth-session gate (sign-in/admin dashboard) was removed along with those
// features. Payload's own /studio admin has its own separate auth.
export async function proxy(request: NextRequest) {
  const origin = request.headers.get("origin") ?? "";
  const isAllowed = ALLOWED_ORIGINS.includes(origin);
  const allowedOrigin = isAllowed ? origin : ALLOWED_ORIGINS[0];

  if (request.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": allowedOrigin,
        "Access-Control-Allow-Methods": "GET,OPTIONS,POST,PUT,DELETE",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Max-Age": "86400",
      },
    });
  }

  const response = NextResponse.next();
  response.headers.set("Access-Control-Allow-Origin", allowedOrigin);
  response.headers.set("Access-Control-Allow-Methods", "GET,OPTIONS,POST,PUT,DELETE");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return response;
}

export const config = {
  matcher: ["/api/:path*"],
};
