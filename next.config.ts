import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root (a stray lockfile exists in the home directory).
  turbopack: { root: __dirname },
  images: {
    remotePatterns: [
      // Vercel Blob storage
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
      // Seed / demo imagery
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  experimental: {
    // Server Actions can receive larger payloads (multi-image admin uploads).
    serverActions: {
      bodySizeLimit: "8mb",
    },
  },
};

export default nextConfig;
