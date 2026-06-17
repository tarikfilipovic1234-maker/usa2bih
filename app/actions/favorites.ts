"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export type ToggleFavoriteResult =
  | { ok: true; favorited: boolean }
  | { ok: false; requiresAuth: true };

/** Toggle a vehicle in the signed-in user's favorites. */
export async function toggleFavorite(vehicleId: string): Promise<ToggleFavoriteResult> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, requiresAuth: true };

  const existing = await prisma.favorite.findUnique({
    where: { userId_vehicleId: { userId: user.id, vehicleId } },
  });

  if (existing) {
    await prisma.favorite.delete({ where: { id: existing.id } });
  } else {
    await prisma.favorite.create({ data: { userId: user.id, vehicleId } });
  }

  revalidatePath("/dashboard/favorites");
  return { ok: true, favorited: !existing };
}

/** The set of vehicle ids the current user has favorited (empty when signed out). */
export async function getFavoritedIds(): Promise<Set<string>> {
  const user = await getCurrentUser();
  if (!user) return new Set();
  const rows = await prisma.favorite.findMany({
    where: { userId: user.id },
    select: { vehicleId: true },
  });
  return new Set(rows.map((r) => r.vehicleId));
}
