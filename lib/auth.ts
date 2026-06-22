import "server-only";
import { redirect } from "next/navigation";
import { auth } from "@/lib/neon-auth";
import { prisma } from "@/lib/db";
import type { UserProfile } from "@/lib/generated/prisma/client";
import type { HeaderUser } from "@/components/layout/Header";

/** The Neon Auth (Better Auth) user shape we rely on. */
export type AuthUser = { id: string; email: string; name?: string | null; image?: string | null };

export type SessionData = { user: AuthUser; profile: UserProfile };

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

/** The signed-in user from the session cookie, or null. */
export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const { data } = await auth.getSession();
    return (data?.user as AuthUser | undefined) ?? null;
  } catch {
    return null;
  }
}

/**
 * Ensures a UserProfile row exists for the signed-in user and keeps email/name
 * in sync. Promotes to ADMIN when the email is in the ADMIN_EMAILS allowlist.
 */
async function ensureProfile(user: AuthUser): Promise<UserProfile> {
  const email = user.email?.toLowerCase() ?? null;
  const isAdminByEmail = Boolean(email && ADMIN_EMAILS.includes(email));

  return prisma.userProfile.upsert({
    where: { userId: user.id },
    update: {
      email: user.email ?? undefined,
      name: user.name ?? undefined,
      ...(isAdminByEmail ? { role: "ADMIN" } : {}),
    },
    create: {
      userId: user.id,
      email,
      name: user.name ?? null,
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
  if (!session) redirect("/auth/sign-in");
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
    displayName: session.user.name ?? session.profile.name ?? null,
    isAdmin: session.profile.role === "ADMIN",
  };
}
