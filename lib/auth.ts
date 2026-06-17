import "server-only";
import { redirect } from "next/navigation";
import type { CurrentServerUser } from "@stackframe/stack";
import { stackServerApp } from "@/stack";
import { prisma } from "@/lib/db";
import type { UserProfile } from "@/lib/generated/prisma/client";
import type { HeaderUser } from "@/components/layout/Header";

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

export type SessionData = { user: CurrentServerUser; profile: UserProfile };

/** The signed-in Stack user, or null. Does NOT touch the DB. */
export async function getCurrentUser(): Promise<CurrentServerUser | null> {
  return stackServerApp.getUser();
}

/**
 * Ensures a UserProfile row exists for the signed-in user and keeps email/name
 * in sync. Promotes to ADMIN when the email is in the ADMIN_EMAILS allowlist.
 */
async function ensureProfile(user: CurrentServerUser): Promise<UserProfile> {
  const email = user.primaryEmail?.toLowerCase() ?? null;
  const isAdminByEmail = Boolean(email && ADMIN_EMAILS.includes(email));

  return prisma.userProfile.upsert({
    where: { userId: user.id },
    update: {
      email: user.primaryEmail ?? undefined,
      name: user.displayName ?? undefined,
      ...(isAdminByEmail ? { role: "ADMIN" } : {}),
    },
    create: {
      userId: user.id,
      email,
      name: user.displayName,
      role: isAdminByEmail ? "ADMIN" : "USER",
    },
  });
}

/** Signed-in user + synced profile, or null when signed out. */
export async function getSession(): Promise<SessionData | null> {
  const user = await getCurrentUser();
  if (!user) return null;
  const profile = await ensureProfile(user);
  return { user, profile };
}

/** Require auth — redirects to sign-in when signed out. */
export async function requireUser(): Promise<SessionData> {
  const session = await getSession();
  if (!session) redirect("/handler/sign-in");
  return session;
}

/** Require ADMIN — redirects signed-out → sign-in, non-admins → dashboard. */
export async function requireAdmin(): Promise<SessionData> {
  const session = await requireUser();
  if (session.profile.role !== "ADMIN") redirect("/dashboard");
  return session;
}

/** Lightweight shape for the site header (null when signed out). */
export async function getHeaderUser(): Promise<HeaderUser> {
  const session = await getSession();
  if (!session) return null;
  return {
    displayName: session.user.displayName ?? session.profile.name ?? null,
    isAdmin: session.profile.role === "ADMIN",
  };
}
