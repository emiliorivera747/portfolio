import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

const ALLOWED_ORIGINS = [
  "https://emilioulisesrivera.com",
  "https://www.emilioulisesrivera.com",
  ...(process.env.NODE_ENV === "development" ? ["http://localhost:3000"] : []),
];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api/")) {
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

  return await updateSession(request);
}

export const config = {
  matcher: [
    "/api/:path*",
    "/admin/dashboard",
    "/admin/:path*",
    "/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
