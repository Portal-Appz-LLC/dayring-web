import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token");
    const pathName = request.nextUrl.pathname;

    const publicRoutes = [
        "/login",
        "/signup",
        "/forgot-password",
        "/reset-password",
    ];

    // Check if the request is for a public route or a static file
    const isPublicRoute = publicRoutes.some((route) =>
        pathName.startsWith(route)
    );

    const isStaticFile =
        pathName.startsWith("/_next/") ||
        pathName.startsWith("/favicon.ico") ||
        pathName.startsWith("/assets/");


    if(isStaticFile){
        return NextResponse.next();
    };

    // If the user is not authenticated and is trying to access a protected route, redirect to login
    if (!token && !isPublicRoute) {
        return NextResponse.redirect(new URL("/login", request.url));
    };

    // If the user is authenticated and is trying to access a public route, redirect to home
    if (token && isPublicRoute) {
        return NextResponse.redirect(new URL("/", request.url));
    };
    
    // For all other cases, allow the request to proceed
    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};