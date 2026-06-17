"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { profileSchema } from "@/lib/validation";

export type ProfileState = { ok?: boolean; error?: string };

export async function updateProfile(_prev: ProfileState, formData: FormData): Promise<ProfileState> {
  const { user } = await requireUser();

  const parsed = profileSchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    locale: formData.get("locale"),
  });
  if (!parsed.success) return { ok: false, error: "Please check your details and try again." };

  await prisma.userProfile.update({
    where: { userId: user.id },
    data: {
      name: parsed.data.name || null,
      phone: parsed.data.phone || null,
      locale: parsed.data.locale,
    },
  });

  revalidatePath("/dashboard/profile");
  return { ok: true };
}
