"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { del, put } from "@vercel/blob";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { vehicleSchema, inquiryStatusSchema } from "@/lib/validation";
import type { VehicleStatus, Role, ImportStage } from "@/lib/generated/prisma/client";

export type AdminFormState = {
  ok?: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
};

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function uniqueSlug(base: string) {
  let slug = base;
  let n = 1;
  while (await prisma.vehicle.findUnique({ where: { slug } })) {
    slug = `${base}-${n++}`;
  }
  return slug;
}

function parseVehicleForm(formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  return { ...raw, featured: formData.get("featured") === "on" };
}

// ─────────────────────────── Vehicles ───────────────────────────

export async function createVehicle(
  _prev: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  await requireAdmin();
  const parsed = vehicleSchema.safeParse(parseVehicleForm(formData));
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const i of parsed.error.issues) fieldErrors[String(i.path[0])] = i.message;
    return { ok: false, error: "Please fix the highlighted fields.", fieldErrors };
  }

  const d = parsed.data;
  const slug = await uniqueSlug(slugify(`${d.year}-${d.make}-${d.model}`));
  const vehicle = await prisma.vehicle.create({
    data: { ...normalizeVehicle(d), slug },
  });

  revalidatePath("/admin/vehicles");
  redirect(`/admin/vehicles/${vehicle.id}/edit`);
}

export async function updateVehicle(
  id: string,
  _prev: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  await requireAdmin();
  const parsed = vehicleSchema.safeParse(parseVehicleForm(formData));
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const i of parsed.error.issues) fieldErrors[String(i.path[0])] = i.message;
    return { ok: false, error: "Please fix the highlighted fields.", fieldErrors };
  }

  await prisma.vehicle.update({ where: { id }, data: normalizeVehicle(parsed.data) });
  revalidatePath("/admin/vehicles");
  revalidatePath(`/admin/vehicles/${id}/edit`);
  return { ok: true };
}

/** Map validated form data to Prisma fields, turning "" into null for optionals. */
function normalizeVehicle(d: import("@/lib/validation").VehicleInput) {
  const orNull = (v?: string) => (v && v.length ? v : null);
  return {
    make: d.make,
    model: d.model,
    year: d.year,
    trim: orNull(d.trim),
    mileage: d.mileage,
    fuelType: d.fuelType,
    transmission: d.transmission,
    bodyStyle: d.bodyStyle,
    driveType: d.driveType,
    exteriorColor: orNull(d.exteriorColor),
    interiorColor: orNull(d.interiorColor),
    price: d.price,
    vin: orNull(d.vin),
    engine: orNull(d.engine),
    cylinders: d.cylinders ?? null,
    condition: orNull(d.condition),
    damageStatus: d.damageStatus,
    damageNotes: orNull(d.damageNotes),
    auctionName: orNull(d.auctionName),
    lotNumber: orNull(d.lotNumber),
    location: orNull(d.location),
    estimatedArrivalDays: d.estimatedArrivalDays ?? null,
    description: orNull(d.description),
    featured: d.featured,
    status: d.status,
  };
}

export async function deleteVehicle(id: string) {
  await requireAdmin();
  const images = await prisma.vehicleImage.findMany({ where: { vehicleId: id }, select: { url: true } });
  await Promise.all(images.map((img) => del(img.url).catch(() => {})));
  await prisma.vehicle.delete({ where: { id } });
  revalidatePath("/admin/vehicles");
  redirect("/admin/vehicles");
}

export async function toggleVehicleFeatured(id: string, featured: boolean) {
  await requireAdmin();
  await prisma.vehicle.update({ where: { id }, data: { featured } });
  revalidatePath("/admin/vehicles");
}

export async function setVehicleStatus(id: string, status: VehicleStatus) {
  await requireAdmin();
  await prisma.vehicle.update({ where: { id }, data: { status } });
  revalidatePath("/admin/vehicles");
}

// ─────────────────────────── Images ───────────────────────────

export async function uploadVehicleImages(
  vehicleId: string,
  _prev: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  await requireAdmin();
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return { ok: false, error: "Image storage is not configured (missing Blob token)." };
  }

  const files = formData.getAll("images").filter((f): f is File => f instanceof File && f.size > 0);
  if (files.length === 0) return { ok: false, error: "Choose at least one image." };

  const existing = await prisma.vehicleImage.count({ where: { vehicleId } });

  let order = existing;
  for (const file of files) {
    const blob = await put(`vehicles/${vehicleId}/${file.name}`, file, {
      access: "public",
      addRandomSuffix: true,
    });
    await prisma.vehicleImage.create({
      data: {
        vehicleId,
        url: blob.url,
        sortOrder: order,
        isPrimary: existing === 0 && order === 0,
      },
    });
    order++;
  }

  revalidatePath(`/admin/vehicles/${vehicleId}/edit`);
  return { ok: true };
}

export async function deleteVehicleImage(imageId: string) {
  await requireAdmin();
  const img = await prisma.vehicleImage.findUnique({ where: { id: imageId } });
  if (!img) return;
  await del(img.url).catch(() => {});
  await prisma.vehicleImage.delete({ where: { id: imageId } });
  // Ensure a primary remains.
  const remaining = await prisma.vehicleImage.findFirst({
    where: { vehicleId: img.vehicleId },
    orderBy: { sortOrder: "asc" },
  });
  if (remaining && img.isPrimary) {
    await prisma.vehicleImage.update({ where: { id: remaining.id }, data: { isPrimary: true } });
  }
  revalidatePath(`/admin/vehicles/${img.vehicleId}/edit`);
}

export async function setPrimaryImage(imageId: string) {
  await requireAdmin();
  const img = await prisma.vehicleImage.findUnique({ where: { id: imageId } });
  if (!img) return;
  await prisma.$transaction([
    prisma.vehicleImage.updateMany({ where: { vehicleId: img.vehicleId }, data: { isPrimary: false } }),
    prisma.vehicleImage.update({ where: { id: imageId }, data: { isPrimary: true } }),
  ]);
  revalidatePath(`/admin/vehicles/${img.vehicleId}/edit`);
}

// ─────────────────────────── Inquiries ───────────────────────────

export async function updateInquiryStatus(id: string, status: string) {
  await requireAdmin();
  const parsed = inquiryStatusSchema.safeParse(status);
  if (!parsed.success) return;
  await prisma.inquiry.update({ where: { id }, data: { status: parsed.data } });
  revalidatePath("/admin/inquiries");
}

// ─────────────────────────── Users ───────────────────────────

export async function setUserRole(userId: string, role: Role) {
  await requireAdmin();
  await prisma.userProfile.update({ where: { userId }, data: { role } });
  revalidatePath("/admin/users");
}

// ─────────────────────────── Guide ───────────────────────────

export async function updateGuideSection(
  id: string,
  _prev: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  await requireAdmin();
  const title = String(formData.get("title") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  if (!title || !body) return { ok: false, error: "Title and body are required." };

  await prisma.guideContent.update({ where: { id }, data: { title, body } });
  revalidatePath("/admin/guide");
  revalidatePath("/guide");
  return { ok: true };
}

// ─────────────────────────── Import orders ───────────────────────────

export async function advanceImportStage(importOrderId: string, stage: ImportStage, note?: string) {
  await requireAdmin();
  await prisma.$transaction([
    prisma.importOrder.update({ where: { id: importOrderId }, data: { currentStage: stage } }),
    prisma.importStageEvent.create({ data: { importOrderId, stage, note: note || null } }),
  ]);
  revalidatePath(`/dashboard/imports`);
}
