import { NextRequest, NextResponse } from "next/server";
import { createSupabaseMiddlewareClient } from "@/lib/supabase-server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next({
    request: {
      headers: req.headers,
    },
  });

  const supabase = createSupabaseMiddlewareClient(req, res);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { pathname } = req.nextUrl;
  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginRoute = pathname.startsWith("/admin/login");

  if (isAdminRoute && !isLoginRoute && !session) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/admin/login";
    redirectUrl.searchParams.set("redirectedFrom", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  if (isLoginRoute && session) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/admin";
    redirectUrl.searchParams.delete("redirectedFrom");
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

export const config = {
  matcher: ["/admin/:path*"],
};

