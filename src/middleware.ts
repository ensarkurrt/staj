import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  /* const { cookies, url } = req;
  if (!url.includes("_next")) {
    const jwt = cookies.get(process.env.NEXT_PUBLIC_SESSION_COOKIE_NAME ?? "_session");
    if (!url.includes("/auth")) return await AuthGuard(jwt);
    else return await AuthLoginGuard(jwt);
  } */
  return NextResponse.next();
}

async function AuthGuard(jwt: string | undefined) {
  if (!jwt) return NextResponse.redirect(getURL() + "/auth/login");

  try {
    await jwtVerify(jwt, new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET ?? "secret"), {
      algorithms: ["HS256"],
    });
  } catch (e) {
    return NextResponse.redirect(getURL() + "/auth/login");
  }

  return NextResponse.next();
}

async function AuthLoginGuard(jwt: string | undefined) {
  if (!jwt) return NextResponse.next();

  try {
    await jwtVerify(jwt, new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET ?? "secret"), {
      algorithms: ["HS256"],
    });
    return NextResponse.redirect(getURL());
  } catch (e) {
    return NextResponse.next();
  }
}

function getURL(): string {
  return process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : `http://localhost:${process.env.PORT ?? 3000}`;
}
