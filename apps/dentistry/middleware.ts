import { type NextRequest } from "next/server";

import { updateSession } from "@workspace/database";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - sign-in (authentication pages)
     * - sign-up (authentication pages)
     * - static assets
     */
    "/((?!_next/static|_next/image|favicon.ico|sign-in|sign-up|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
