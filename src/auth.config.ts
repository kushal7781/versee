import type { NextAuthConfig } from "next-auth";

/**
 * WHY THIS FILE IS SEPARATE FROM `auth.ts`
 * -----------------------------------------
 * This config has to be importable from Edge Middleware, so it must never
 * pull in Node-only code (bcrypt, mongoose). The actual Credentials
 * provider — which *does* need those — lives in `auth.ts` and spreads
 * this config in, adding the provider on top for the Node runtime only.
 */
export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role ?? "user";
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as "user" | "admin";
      }
      return session;
    },
  },
  providers: [], // populated in auth.ts
};
