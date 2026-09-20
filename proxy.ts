import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Phone-class UAs only — iPadOS Safari reports a Mac UA by default, so
// tablets already fall through to the desktop tree without extra logic.
const MOBILE_UA =
  /iPhone|iPod|Android.*Mobile|Windows Phone|BlackBerry|IEMobile|Opera Mini/i;

export function proxy(request: NextRequest) {
  const ua = request.headers.get("user-agent") ?? "";
  if (MOBILE_UA.test(ua)) {
    const url = request.nextUrl.clone();
    url.pathname = "/m";
    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
}

// Only the home route forks today — the site is a single page.
export const config = {
  matcher: "/",
};
