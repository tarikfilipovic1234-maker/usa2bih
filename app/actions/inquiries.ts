"use server";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { inquirySchema } from "@/lib/validation";
import { sendInquiryEmail } from "@/lib/email";

export type FormState = { ok?: boolean; error?: string; fieldErrors?: Record<string, string> };

/** Submit a vehicle inquiry (works signed-in or out). */
export async function submitInquiry(_prev: FormState, formData: FormData): Promise<FormState> {
  const parsed = inquirySchema.safeParse({
    vehicleId: formData.get("vehicleId") || undefined,
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    message: formData.get("message"),
  });

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) fieldErrors[String(issue.path[0])] = issue.message;
    return { ok: false, error: "Please fix the highlighted fields.", fieldErrors };
  }

  const user = await getCurrentUser();
  const data = parsed.data;

  const inquiry = await prisma.inquiry.create({
    data: {
      userId: user?.id ?? null,
      vehicleId: data.vehicleId ?? null,
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      message: data.message,
    },
    include: { vehicle: true },
  });

  await sendInquiryEmail(inquiry).catch((e) => console.error("inquiry email failed", e));

  return { ok: true };
}
