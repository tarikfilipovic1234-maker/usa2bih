"use client";

import { useTransition } from "react";
import { setUserRole } from "@/app/actions/admin";
import type { Role } from "@/lib/generated/prisma/client";

export function UserRoleSelect({ userId, role }: { userId: string; role: Role }) {
  const [pending, startTransition] = useTransition();
  return (
    <select
      defaultValue={role}
      disabled={pending}
      onChange={(e) => startTransition(async () => void (await setUserRole(userId, e.target.value as Role)))}
      aria-label="User role"
      className="h-8 rounded-lg border border-steel bg-midnight-2 px-2 text-xs text-silver focus:border-accent focus:outline-none"
    >
      <option value="USER">User</option>
      <option value="ADMIN">Admin</option>
    </select>
  );
}
