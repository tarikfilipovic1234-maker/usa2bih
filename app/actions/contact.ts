"use server";

import { prisma } from "@/lib/db";
import { contactSchema } from "@/lib/validation";
import { sendContactEmail } from "@/lib/email";

export type ContactState = { ok?: boolean; error?: string; fieldErrors?: Record<string, string> };

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) fieldErrors[String(issue.path[0])] = issue.message;
    return { ok: false, error: "Please fix the highlighted fields.", fieldErrors };
  }

  await prisma.contactMessage.create({ data: parsed.data });
  await sendContactEmail(parsed.data).catch((e) => console.error("contact email failed", e));

  return { ok: true };
}
