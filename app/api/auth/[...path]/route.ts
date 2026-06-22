import { auth } from "@/lib/neon-auth";

// Proxies all Neon Auth (Better Auth) client requests and manages session cookies.
export const { GET, POST } = auth.handler();
