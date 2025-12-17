import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import db from '@/lib/db';
import { authConfig } from '@/auth.config';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import type { UserRole } from '@prisma/client';

// Extend the built-in session types
declare module 'next-auth' {
  interface User {
    role?: UserRole;
    stripe_connect_id?: string | null;
  }
  interface Session {
    user: {
      id: string;
      role: UserRole;
      stripe_connect_id?: string | null;
    } & import('next-auth').DefaultSession['user'];
  }
}

declare module '@auth/core/jwt' {
  interface JWT {
    role?: UserRole;
    stripe_connect_id?: string | null;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' }, // Using JWT for easier edge compatibility and role management
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.stripe_connect_id = user.stripe_connect_id;
        token.sub = user.id; // Ensure ID is present
      }
      return token;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role;
      }
      if (token.stripe_connect_id && session.user) {
        session.user.stripe_connect_id = token.stripe_connect_id;
      }
      return session;
    },
  },
  events: {
    async createUser({ user }) {
      // Default new users to CANDIDATE if not specified (Prisma default handles this, but good to be explicit if logic changes)
      // We could also create an empty Profile here if needed
      if (user.id) {
         await db.profile.create({
            data: {
               userId: user.id
            }
         })
      }
    }
  }
});

