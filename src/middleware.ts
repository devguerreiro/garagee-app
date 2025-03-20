import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const publicRoutes = ["/login", "/cadastro"];

export default async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicRoute = publicRoutes.includes(path);
  const isLoggedIn = (await cookies()).get("token");

  // direciona para o login ao acessar rotas privadas quando nao estiver logado
  if (!isPublicRoute && !isLoggedIn) {
    let redirectURL = "/login";
    if (path !== "/") {
      const params = new URLSearchParams({
        redirect: path,
      });
      redirectURL += `?${params}`;
    }
    return NextResponse.redirect(new URL(redirectURL, request.nextUrl.origin));
  }
  // direciona para a home ao acessar a tela de cadastro ou login quando ja estiver logado
  else if (["/login", "/cadastro"].includes(path) && isLoggedIn) {
    return NextResponse.redirect(new URL("/", request.nextUrl.origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
