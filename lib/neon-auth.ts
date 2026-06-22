import "server-only";
import { createNeonAuth } from "@neondatabase/auth/next/server";

/**
 * Neon Auth (Better Auth) server instance — the single entry point for
 * server-side auth: `auth.handler()` (API route), `auth.getSession()`,
 * `auth.signIn`, `auth.signUp`, `auth.signOut`.
 */
export const auth = createNeonAuth({
  baseUrl: process.env.NEON_AUTH_BASE_URL!,
  cookies: {
    secret: process.env.NEON_AUTH_COOKIE_SECRET!,
  },
});
