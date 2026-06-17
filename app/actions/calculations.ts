"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { calculatorSchema } from "@/lib/validation";
import { calculateImportCost } from "@/lib/calculator";

export type SaveCalcResult =
  | { ok: true }
  | { ok: false; requiresAuth?: true; error?: string };

/** Persist a calculation to the signed-in user's history. */
export async function saveCalculation(
  raw: unknown,
  vehicleId?: string,
): Promise<SaveCalcResult> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, requiresAuth: true };

  const parsed = calculatorSchema.safeParse(raw);
  if (!parsed.success) return { ok: false, error: "Invalid calculator input." };

  const result = calculateImportCost(parsed.data);

  await prisma.calculationHistory.create({
    data: {
      userId: user.id,
      vehicleId: vehicleId ?? null,
      input: parsed.data,
      totalUSD: result.totalUSD,
      totalEUR: result.totalEUR,
      totalBAM: result.totalBAM,
    },
  });

  revalidatePath("/dashboard/calculations");
  return { ok: true };
}
