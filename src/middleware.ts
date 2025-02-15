import { NextResponse } from "next/server";

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isAuthRoute = createRouteMatcher(["/sign-in(.*)"]);
const isProtectedRoute = createRouteMatcher(["/dashboard(.*)", "/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  // se a rota for de autenticação e o usuário estiver logado, redireciona para o dashboard
  if (isAuthRoute(req) && !!userId) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // se a rota for protegida e o usuário não estiver logado, redireciona para o login
  if (isProtectedRoute(req) && !userId) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // senão continua a execução
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
