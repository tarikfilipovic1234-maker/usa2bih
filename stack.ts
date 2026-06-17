import "server-only";
import { StackServerApp } from "@stackframe/stack";

/**
 * Neon Auth (Stack Auth) server app. Reads NEXT_PUBLIC_STACK_PROJECT_ID,
 * NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY and STACK_SECRET_SERVER_KEY from env.
 */
export const stackServerApp = new StackServerApp({
  tokenStore: "nextjs-cookie",
  urls: {
    home: "/",
    afterSignIn: "/dashboard",
    afterSignUp: "/dashboard",
    afterSignOut: "/",
  },
});
