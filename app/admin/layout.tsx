import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { requireAdmin } from "@/lib/auth";
import { ADMIN_NAV } from "@/lib/constants";

export const metadata = { title: "Admin" };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user } = await requireAdmin();

  return (
    <div className="flex min-h-dvh flex-col lg:flex-row">
      <DashboardSidebar items={ADMIN_NAV} title="Administration" displayName={user.name ?? null} />
      <main id="main-content" className="min-w-0 flex-1 px-5 py-8 sm:px-8">
        {children}
      </main>
    </div>
  );
}
