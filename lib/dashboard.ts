import "server-only";
import { prisma } from "@/lib/db";
import { Prisma } from "@/lib/generated/prisma/client";

const importInclude = {
  vehicle: { include: { images: { orderBy: { sortOrder: "asc" } } } },
  events: { orderBy: { occurredAt: "desc" } },
  documents: { orderBy: { createdAt: "desc" } },
} satisfies Prisma.ImportOrderInclude;

export type ImportOrderFull = Prisma.ImportOrderGetPayload<{ include: typeof importInclude }>;

export async function getDashboardStats(userId: string) {
  const [favorites, inquiries, calculations, activeImports] = await Promise.all([
    prisma.favorite.count({ where: { userId } }),
    prisma.inquiry.count({ where: { userId } }),
    prisma.calculationHistory.count({ where: { userId } }),
    prisma.importOrder.count({ where: { userId, currentStage: { not: "COMPLETED" } } }),
  ]);
  return { favorites, inquiries, calculations, activeImports };
}

export async function getUserFavorites(userId: string) {
  const rows = await prisma.favorite.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: { vehicle: { include: { images: { orderBy: { sortOrder: "asc" } } } } },
  });
  return rows.map((r) => r.vehicle);
}

export async function getUserInquiries(userId: string) {
  return prisma.inquiry.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: { vehicle: { select: { slug: true, make: true, model: true, year: true } } },
  });
}

export async function getUserCalculations(userId: string) {
  return prisma.calculationHistory.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: { vehicle: { select: { slug: true, make: true, model: true, year: true } } },
  });
}

export async function getUserImports(userId: string): Promise<ImportOrderFull[]> {
  return prisma.importOrder.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: importInclude,
  });
}

export async function getImportOrder(userId: string, id: string): Promise<ImportOrderFull | null> {
  return prisma.importOrder.findFirst({ where: { id, userId }, include: importInclude });
}

export async function getRecentlyViewed(userId: string, limit = 4) {
  const rows = await prisma.recentlyViewed.findMany({
    where: { userId, vehicle: { status: "ACTIVE" } },
    orderBy: { viewedAt: "desc" },
    take: limit,
    include: { vehicle: { include: { images: { orderBy: { sortOrder: "asc" } } } } },
  });
  return rows.map((r) => r.vehicle);
}

export async function getUserDocuments(userId: string) {
  return prisma.importDocument.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: { importOrder: { select: { reference: true } } },
  });
}
