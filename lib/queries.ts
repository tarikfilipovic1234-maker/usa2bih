import "server-only";
import { prisma } from "@/lib/db";
import { Prisma } from "@/lib/generated/prisma/client";
import { PAGE_SIZE } from "@/lib/constants";

/** Vehicle with its images + favorite count — the shape cards/detail use. */
const vehicleListInclude = {
  images: { orderBy: { sortOrder: "asc" } },
} satisfies Prisma.VehicleInclude;

export type VehicleWithImages = Prisma.VehicleGetPayload<{ include: typeof vehicleListInclude }>;

export type VehicleFilters = {
  q?: string;
  make?: string;
  model?: string;
  yearMin?: number;
  yearMax?: number;
  mileageMax?: number;
  priceMin?: number;
  priceMax?: number;
  fuelType?: string;
  transmission?: string;
  bodyStyle?: string;
  driveType?: string;
  damageStatus?: string;
  featured?: boolean;
  sort?: string;
  page?: number;
};

function buildWhere(filters: VehicleFilters): Prisma.VehicleWhereInput {
  const where: Prisma.VehicleWhereInput = { status: "ACTIVE" };
  const and: Prisma.VehicleWhereInput[] = [];

  if (filters.q) {
    and.push({
      OR: [
        { make: { contains: filters.q, mode: "insensitive" } },
        { model: { contains: filters.q, mode: "insensitive" } },
        { trim: { contains: filters.q, mode: "insensitive" } },
        { vin: { contains: filters.q, mode: "insensitive" } },
      ],
    });
  }
  if (filters.make) where.make = { equals: filters.make, mode: "insensitive" };
  if (filters.model) where.model = { contains: filters.model, mode: "insensitive" };
  if (filters.fuelType) where.fuelType = filters.fuelType as Prisma.EnumFuelTypeFilter["equals"];
  if (filters.transmission)
    where.transmission = filters.transmission as Prisma.EnumTransmissionFilter["equals"];
  if (filters.bodyStyle) where.bodyStyle = filters.bodyStyle as Prisma.EnumBodyStyleFilter["equals"];
  if (filters.driveType) where.driveType = filters.driveType as Prisma.EnumDriveTypeFilter["equals"];
  if (filters.damageStatus)
    where.damageStatus = filters.damageStatus as Prisma.EnumDamageStatusFilter["equals"];
  if (filters.featured !== undefined) where.featured = filters.featured;

  if (filters.yearMin || filters.yearMax)
    where.year = { gte: filters.yearMin, lte: filters.yearMax };
  if (filters.priceMin || filters.priceMax)
    where.price = { gte: filters.priceMin, lte: filters.priceMax };
  if (filters.mileageMax) where.mileage = { lte: filters.mileageMax };

  if (and.length) where.AND = and;
  return where;
}

function buildOrderBy(sort?: string): Prisma.VehicleOrderByWithRelationInput {
  switch (sort) {
    case "price_asc":
      return { price: "asc" };
    case "price_desc":
      return { price: "desc" };
    case "year_desc":
      return { year: "desc" };
    case "mileage_asc":
      return { mileage: "asc" };
    default:
      return { createdAt: "desc" };
  }
}

export async function getVehicles(filters: VehicleFilters) {
  const page = Math.max(1, filters.page ?? 1);
  const where = buildWhere(filters);

  const [vehicles, total] = await Promise.all([
    prisma.vehicle.findMany({
      where,
      include: vehicleListInclude,
      orderBy: buildOrderBy(filters.sort),
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.vehicle.count({ where }),
  ]);

  return {
    vehicles,
    total,
    page,
    pageCount: Math.max(1, Math.ceil(total / PAGE_SIZE)),
  };
}

export async function getFeaturedVehicles(limit = 4): Promise<VehicleWithImages[]> {
  return prisma.vehicle.findMany({
    where: { status: "ACTIVE", featured: true },
    include: vehicleListInclude,
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

/** Fetch a set of vehicles by id (for the comparison tool), preserving input order. */
export async function getVehiclesByIds(idList: string[]): Promise<VehicleWithImages[]> {
  if (idList.length === 0) return [];
  const rows = await prisma.vehicle.findMany({
    where: { id: { in: idList } },
    include: vehicleListInclude,
  });
  const byId = new Map(rows.map((r) => [r.id, r]));
  return idList.map((id) => byId.get(id)).filter((v): v is VehicleWithImages => Boolean(v));
}

export async function getVehicleBySlug(slug: string) {
  return prisma.vehicle.findUnique({
    where: { slug },
    include: { images: { orderBy: { sortOrder: "asc" } } },
  });
}

/** Similar vehicles (same body style or make), excluding the current one. */
export async function getRelatedVehicles(
  vehicle: { id: string; make: string; bodyStyle: string },
  limit = 3,
): Promise<VehicleWithImages[]> {
  return prisma.vehicle.findMany({
    where: {
      status: "ACTIVE",
      id: { not: vehicle.id },
      OR: [
        { make: vehicle.make },
        { bodyStyle: vehicle.bodyStyle as Prisma.EnumBodyStyleFilter["equals"] },
      ],
    },
    include: vehicleListInclude,
    orderBy: { featured: "desc" },
    take: limit,
  });
}

/** Distinct manufacturers present in active listings (for filter dropdowns). */
export async function getAvailableMakes(): Promise<string[]> {
  const rows = await prisma.vehicle.findMany({
    where: { status: "ACTIVE" },
    distinct: ["make"],
    select: { make: true },
    orderBy: { make: "asc" },
  });
  return rows.map((r) => r.make);
}

export async function getPublishedGuide() {
  return prisma.guideContent.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });
}
