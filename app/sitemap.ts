import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";
import { SITE } from "@/lib/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE.url.replace(/\/$/, "");

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/cars",
    "/calculator",
    "/guide",
    "/about",
    "/contact",
    "/faq",
    "/compare",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/cars" ? "hourly" : "weekly",
    priority: path === "" ? 1 : 0.7,
  }));

  let vehicleRoutes: MetadataRoute.Sitemap = [];
  try {
    const vehicles = await prisma.vehicle.findMany({
      where: { status: "ACTIVE" },
      select: { slug: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
      take: 5000,
    });
    vehicleRoutes = vehicles.map((v) => ({
      url: `${base}/cars/${v.slug}`,
      lastModified: v.updatedAt,
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  } catch {
    // DB unavailable at build — ship the static routes only.
  }

  return [...staticRoutes, ...vehicleRoutes];
}
