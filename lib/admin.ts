import "server-only";
import { prisma } from "@/lib/db";
import { Prisma } from "@/lib/generated/prisma/client";

export async function getAdminStats() {
  const [vehicles, activeVehicles, inquiries, newInquiries, imports, contacts] = await Promise.all([
    prisma.vehicle.count(),
    prisma.vehicle.count({ where: { status: "ACTIVE" } }),
    prisma.inquiry.count(),
    prisma.inquiry.count({ where: { status: "NEW" } }),
    prisma.importOrder.count({ where: { currentStage: { not: "COMPLETED" } } }),
    prisma.contactMessage.count({ where: { handled: false } }),
  ]);
  return { vehicles, activeVehicles, inquiries, newInquiries, imports, contacts };
}

/** Total estimated catalogue value + most-viewed vehicles for the analytics view. */
export async function getAdminAnalytics() {
  const [agg, topViewed, recentInquiries] = await Promise.all([
    prisma.vehicle.aggregate({ _sum: { price: true }, where: { status: "ACTIVE" } }),
    prisma.vehicle.findMany({
      where: { status: "ACTIVE" },
      orderBy: { views: "desc" },
      take: 5,
      select: { id: true, slug: true, make: true, model: true, year: true, views: true },
    }),
    prisma.inquiry.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { vehicle: { select: { make: true, model: true, year: true } } },
    }),
  ]);
  return { catalogueValue: agg._sum.price ?? 0, topViewed, recentInquiries };
}

export async function getAdminVehicles(search?: string) {
  const where: Prisma.VehicleWhereInput = search
    ? {
        OR: [
          { make: { contains: search, mode: "insensitive" } },
          { model: { contains: search, mode: "insensitive" } },
          { vin: { contains: search, mode: "insensitive" } },
        ],
      }
    : {};
  return prisma.vehicle.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: { images: { orderBy: { sortOrder: "asc" }, take: 1 }, _count: { select: { favorites: true, inquiries: true } } },
  });
}

export async function getAdminVehicle(id: string) {
  return prisma.vehicle.findUnique({
    where: { id },
    include: { images: { orderBy: { sortOrder: "asc" } } },
  });
}

export async function getAdminInquiries() {
  return prisma.inquiry.findMany({
    orderBy: [{ status: "asc" }, { createdAt: "desc" }],
    include: { vehicle: { select: { slug: true, make: true, model: true, year: true } } },
  });
}

export async function getAdminUsers() {
  return prisma.userProfile.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getAdminGuide() {
  return prisma.guideContent.findMany({ orderBy: { order: "asc" } });
}
