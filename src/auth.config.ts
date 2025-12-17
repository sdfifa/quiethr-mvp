import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
    newUser: '/register', // Redirect here after signup if needed, or onboarding
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboardRecruiter = nextUrl.pathname.startsWith('/dashboard-recruiter');
      const isOnDashboardCandidate = nextUrl.pathname.startsWith('/dashboard-candidate');

      // 1. Redirect unauthenticated users
      if ((isOnDashboardRecruiter || isOnDashboardCandidate) && !isLoggedIn) {
        return false; // Redirect to login
      }

      // 2. Role-based Access Control
      if (isLoggedIn) {
        const userRole = auth.user.role; // We will extend the type later

        if (isOnDashboardRecruiter && userRole !== 'RECRUITER' && userRole !== 'ADMIN') {
          return Response.redirect(new URL('/dashboard-candidate', nextUrl));
        }

        if (isOnDashboardCandidate && userRole !== 'CANDIDATE' && userRole !== 'ADMIN') {
           // Optional: Allow recruiters to see candidate view? For now, strict.
          return Response.redirect(new URL('/dashboard-recruiter', nextUrl));
        }
      }

      return true;
    },
    // We will handle session augmentation in the main auth.ts to avoid Edge issues with Prisma
  },
  providers: [], // Configured in auth.ts
} satisfies NextAuthConfig;

