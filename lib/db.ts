import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@/lib/generated/prisma/client";

/**
 * Prisma 7 uses the new query compiler + driver adapters, so the client is
 * constructed with the Neon adapter (WebSocket pool — supports transactions).
 * A global singleton prevents exhausting connections during dev HMR.
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createPrisma() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set — add it to .env / .env.local");
  }
  const adapter = new PrismaNeon({ connectionString });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrisma();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
