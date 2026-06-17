import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { requireUser } from "@/lib/auth";
import { DASHBOARD_NAV } from "@/lib/constants";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user } = await requireUser();

  return (
    <div className="flex min-h-dvh flex-col lg:flex-row">
      <DashboardSidebar
        items={DASHBOARD_NAV}
        title="My Account"
        displayName={user.displayName ?? null}
      />
      <main className="min-w-0 flex-1 px-5 py-8 sm:px-8">{children}</main>
    </div>
  );
}
