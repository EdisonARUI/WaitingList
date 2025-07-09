import { updateSession } from "@/lib/supabase/middleware";
import { type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * - api/waiting-list (waiting list API - allow anonymous access)
     */
    "/((?!_next/static|_next/image|favicon.ico|api/waiting-list|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
