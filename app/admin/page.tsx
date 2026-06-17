import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { StatCard } from "@/components/dashboard/StatCard";
import { getAdminAnalytics, getAdminStats } from "@/lib/admin";
import { formatUSD, formatDate } from "@/lib/utils";

export default async function AdminDashboard() {
  const [stats, analytics] = await Promise.all([getAdminStats(), getAdminAnalytics()]);

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="font-display text-3xl font-bold tracking-tight text-chrome-gradient">Admin Dashboard</h1>
        <p className="mt-1 text-silver-dim">Platform overview and recent activity.</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active listings" value={`${stats.activeVehicles}/${stats.vehicles}`} icon="Car" href="/admin/vehicles" />
        <StatCard label="New inquiries" value={stats.newInquiries} icon="MessageSquare" href="/admin/inquiries" />
        <StatCard label="Active imports" value={stats.imports} icon="Truck" />
        <StatCard label="Catalogue value" value={formatUSD(analytics.catalogueValue)} icon="Calculator" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <GlassCard className="p-6">
          <h2 className="mb-4 font-display text-lg font-semibold text-chrome">Most viewed</h2>
          {analytics.topViewed.length === 0 ? (
            <p className="text-sm text-silver-dim">No data yet.</p>
          ) : (
            <ul className="flex flex-col gap-2">
              {analytics.topViewed.map((v) => (
                <li key={v.id} className="flex items-center justify-between text-sm">
                  <Link href={`/cars/${v.slug}`} className="text-silver hover:text-accent">
                    {v.year} {v.make} {v.model}
                  </Link>
                  <span className="font-mono text-silver-dim">{v.views} views</span>
                </li>
              ))}
            </ul>
          )}
        </GlassCard>

        <GlassCard className="p-6">
          <h2 className="mb-4 font-display text-lg font-semibold text-chrome">Recent inquiries</h2>
          {analytics.recentInquiries.length === 0 ? (
            <p className="text-sm text-silver-dim">No inquiries yet.</p>
          ) : (
            <ul className="flex flex-col gap-3">
              {analytics.recentInquiries.map((inq) => (
                <li key={inq.id} className="flex items-center justify-between gap-3 text-sm">
                  <div className="min-w-0">
                    <p className="truncate text-chrome">{inq.name}</p>
                    <p className="truncate text-xs text-silver-dim">
                      {inq.vehicle ? `${inq.vehicle.year} ${inq.vehicle.make} ${inq.vehicle.model}` : "General"}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs text-silver-dim">{formatDate(inq.createdAt)}</span>
                </li>
              ))}
            </ul>
          )}
        </GlassCard>
      </div>
    </div>
  );
}
