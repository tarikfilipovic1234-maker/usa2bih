import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    // Run with: npx prisma db seed
    seed: "npx tsx prisma/seed.ts",
  },
  datasource: {
    // Migrations/introspection use the DIRECT (unpooled) Neon connection.
    // Falls back to DATABASE_URL for local/dev setups.
    url: process.env["DIRECT_URL"] ?? process.env["DATABASE_URL"],
  },
});
