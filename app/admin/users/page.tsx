import { GlassCard } from "@/components/ui/GlassCard";
import { UserRoleSelect } from "@/components/admin/UserRoleSelect";
import { getAdminUsers } from "@/lib/admin";
import { formatDate } from "@/lib/utils";

export default async function AdminUsersPage() {
  const users = await getAdminUsers();

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="font-display text-3xl font-bold tracking-tight text-chrome-gradient">Users</h1>
        <p className="mt-1 text-silver-dim">{users.length} registered</p>
      </header>

      <GlassCard className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="border-b border-white/5 text-left text-xs uppercase tracking-wider text-silver-dim">
                <th className="px-5 py-3 font-medium">User</th>
                <th className="px-3 py-3 font-medium">Joined</th>
                <th className="px-5 py-3 text-right font-medium">Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-white/[0.02]">
                  <td className="px-5 py-3">
                    <p className="font-medium text-chrome">{u.name ?? "—"}</p>
                    <p className="text-xs text-silver-dim">{u.email ?? u.userId}</p>
                  </td>
                  <td className="px-3 py-3 text-silver-dim">{formatDate(u.createdAt)}</td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end">
                      <UserRoleSelect userId={u.userId} role={u.role} />
                    </div>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-5 py-12 text-center text-silver-dim">
                    No users yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
