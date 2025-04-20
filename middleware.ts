import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

// Exact paths or prefixes considered public
const publicRoutes = ["/auth/signin", "/api/go/redirect"];

const isPublicRoute = (pathname: string): boolean => {
    return publicRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`));
};

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const sessionCookie = getSessionCookie(request);

    if (pathname === "/auth/signin" && sessionCookie) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (isPublicRoute(pathname)) {
        return NextResponse.next();
    }

    if (!sessionCookie) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/auth/signin", "/api/go/:path*"],
};
