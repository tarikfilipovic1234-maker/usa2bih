"use server";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

/** Increment a vehicle's view counter and record it in the user's recently-viewed. */
export async function recordVehicleView(vehicleId: string) {
  await prisma.vehicle.update({
    where: { id: vehicleId },
    data: { views: { increment: 1 } },
  });

  const user = await getCurrentUser();
  if (!user) return;

  await prisma.recentlyViewed.upsert({
    where: { userId_vehicleId: { userId: user.id, vehicleId } },
    update: { viewedAt: new Date() },
    create: { userId: user.id, vehicleId },
  });
}
