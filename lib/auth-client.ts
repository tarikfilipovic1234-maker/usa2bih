"use client";

import { createAuthClient } from "@neondatabase/auth/next";

/** Browser-side Neon Auth client (sign in/up/out via the /api/auth route). */
export const authClient = createAuthClient();
