import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const sessionCookie = getSessionCookie(request);

    if (pathname === "/auth/signin" && sessionCookie) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (pathname === "/auth/signin") {
        return NextResponse.next();
    }

    if (!sessionCookie) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard", "/auth/signin"],
};
