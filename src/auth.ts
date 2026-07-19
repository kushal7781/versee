import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Apple from "next-auth/providers/apple";
import bcrypt from "bcryptjs";
import { authConfig } from "@/auth.config";
import { connectDB } from "@/lib/db/connect";
import { User } from "@/models/User";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  callbacks: {
    ...authConfig.callbacks,
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider === "google" || account?.provider === "apple") {
        try {
          if (!user?.email) {
            console.error("OAuth sign-in failed: No email provided by provider");
            return false;
          }
          
          await connectDB();
          const existingUser = await User.findOne({ email: user.email.toLowerCase() });
          
          if (!existingUser) {
            await User.create({
              name: user.name || "New User",
              email: user.email.toLowerCase(),
              image: user.image || "",
            });
          }
          return true;
        } catch (error) {
          console.error("Error saving OAuth user to DB:", error);
          const fs = require("fs");
          fs.writeFileSync("oauth-error.log", String(error) + "\n" + (error as Error).stack);
          return false;
        }
      }
      return true;
    },
    async jwt(params) {
      // First, run the original jwt callback from authConfig
      let token = params.token;
      if (authConfig.callbacks?.jwt) {
        // @ts-ignore
        token = await authConfig.callbacks.jwt(params);
      }
      
      // If this is an OAuth login, we need to overwrite the token.id 
      // (which is currently the Google ID) with the real MongoDB _id.
      if (params.user && (params.account?.provider === "google" || params.account?.provider === "apple")) {
        try {
          await connectDB();
          const dbUser = await User.findOne({ email: params.user.email });
          if (dbUser) {
            token.id = dbUser._id.toString();
            token.role = dbUser.role || "user";
          }
        } catch (e) {
          console.error("Error fetching OAuth user from DB for JWT:", e);
        }
      }
      return token;
    }
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Apple({
      clientId: process.env.APPLE_ID,
      clientSecret: process.env.APPLE_SECRET,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;

        if (!email || !password) {
          throw new Error("Email and password are required");
        }

        await connectDB();

        // password has `select: false` on the schema, so it must be
        // explicitly requested here or bcrypt.compare has nothing to check.
        const user = await User.findOne({ email: email.toLowerCase() }).select(
          "+password"
        );

        if (!user || !user.password) {
          throw new Error("Invalid email or password");
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
          throw new Error("Invalid email or password");
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
        };
      },
    }),
  ],
});
