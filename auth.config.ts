import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      console.log("authorized");
      if (isOnDashboard) {
        console.log("isLoggedIn", isLoggedIn);
        if (isLoggedIn) return true;
        return Response.redirect(new URL("/login", nextUrl));
        // Redirect unauthenticated users to login page
      } 
       if (isLoggedIn && nextUrl.pathname === "/login") {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add the providers property here
} satisfies NextAuthConfig;
