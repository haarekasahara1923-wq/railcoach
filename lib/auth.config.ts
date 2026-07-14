import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const authConfig = {
  providers: [
    // We'll leave this empty in the base config 
    // and add it in the main auth.ts to avoid Edge issues
    Credentials({}), 
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) (token as any).role = (user as any).role
      return token
    },
    async session({ session, token }) {
      if (session.user) (session.user as any).role = (token as any).role
      return session
    },
  },
  pages: {
    signIn: "/auth/login",
  },
} satisfies NextAuthConfig
