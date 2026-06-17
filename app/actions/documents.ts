"use server";

import { revalidatePath } from "next/cache";
import { del, put } from "@vercel/blob";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth";

export type DocState = { ok?: boolean; error?: string };

const MAX_BYTES = 8 * 1024 * 1024; // 8MB

/** Upload a personal document to Vercel Blob and record it for the user. */
export async function uploadDocument(_prev: DocState, formData: FormData): Promise<DocState> {
  const { user } = await requireUser();

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return { ok: false, error: "File storage is not configured yet (missing Blob token)." };
  }

  const file = formData.get("file");
  const type = (formData.get("type") as string) || null;
  if (!(file instanceof File) || file.size === 0) return { ok: false, error: "Choose a file to upload." };
  if (file.size > MAX_BYTES) return { ok: false, error: "File is too large (max 8MB)." };

  const blob = await put(`documents/${user.id}/${Date.now()}-${file.name}`, file, {
    access: "public",
    addRandomSuffix: true,
  });

  await prisma.importDocument.create({
    data: { userId: user.id, name: file.name, url: blob.url, type },
  });

  revalidatePath("/dashboard/documents");
  return { ok: true };
}

export async function deleteDocument(id: string): Promise<DocState> {
  const { user } = await requireUser();
  const doc = await prisma.importDocument.findFirst({ where: { id, userId: user.id } });
  if (!doc) return { ok: false, error: "Document not found." };

  await del(doc.url).catch((e) => console.error("blob delete failed", e));
  await prisma.importDocument.delete({ where: { id } });

  revalidatePath("/dashboard/documents");
  return { ok: true };
}
