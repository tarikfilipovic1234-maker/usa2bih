import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { ButtonLink } from "@/components/ui/Button";
import { StatCard } from "@/components/dashboard/StatCard";
import { ImportStageTracker } from "@/components/dashboard/ImportStageTracker";
import { VehicleCard } from "@/components/vehicle/VehicleCard";
import { requireUser } from "@/lib/auth";
import { getDashboardStats, getRecentlyViewed, getUserImports } from "@/lib/dashboard";
import { getFavoritedIds } from "@/app/actions/favorites";
import { humanizeEnum } from "@/lib/utils";

export const metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const { user, profile } = await requireUser();
  const [stats, imports, recentlyViewed, favorited] = await Promise.all([
    getDashboardStats(user.id),
    getUserImports(user.id),
    getRecentlyViewed(user.id),
    getFavoritedIds(),
  ]);
  const activeImport = imports.find((i) => i.currentStage !== "COMPLETED");

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="font-display text-3xl font-bold tracking-tight text-chrome-gradient">
          Welcome back{profile.name ? `, ${profile.name.split(" ")[0]}` : ""}
        </h1>
        <p className="mt-1 text-silver-dim">Here&apos;s an overview of your imports and activity.</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active imports" value={stats.activeImports} icon="Truck" href="/dashboard/imports" />
        <StatCard label="Saved vehicles" value={stats.favorites} icon="Heart" href="/dashboard/favorites" />
        <StatCard label="Inquiries" value={stats.inquiries} icon="MessageSquare" href="/dashboard/inquiries" />
        <StatCard label="Calculations" value={stats.calculations} icon="Calculator" href="/dashboard/calculations" />
      </div>

      {activeImport ? (
        <GlassCard chrome className="flex flex-col gap-6 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-silver-dim">Current import</p>
              <h2 className="font-display text-lg font-semibold text-chrome">
                {activeImport.vehicle
                  ? `${activeImport.vehicle.year} ${activeImport.vehicle.make} ${activeImport.vehicle.model}`
                  : activeImport.reference}
              </h2>
              <p className="text-sm text-accent-bright">{humanizeEnum(activeImport.currentStage)}</p>
            </div>
            <ButtonLink href={`/dashboard/imports/${activeImport.id}`} variant="outline" size="sm">
              Details <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
          <ImportStageTracker currentStage={activeImport.currentStage} />
        </GlassCard>
      ) : (
        <GlassCard className="flex flex-col items-center gap-4 px-6 py-14 text-center">
          <h2 className="font-display text-lg font-semibold text-chrome">No active imports yet</h2>
          <p className="max-w-md text-sm text-silver-dim">
            Browse our listings and send an inquiry to get your first import started. We&apos;ll set
            up live tracking here.
          </p>
          <ButtonLink href="/cars">Browse cars</ButtonLink>
        </GlassCard>
      )}

      {recentlyViewed.length > 0 && (
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold text-chrome">Recently viewed</h2>
            <Link href="/cars" className="text-sm text-silver-dim transition-colors hover:text-accent">
              Browse all →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {recentlyViewed.map((v) => (
              <VehicleCard key={v.id} vehicle={v} favorited={favorited.has(v.id)} />
            ))}
          </div>
        </section>
      )}

      <div className="flex flex-wrap gap-3">
        <Link href="/calculator" className="text-sm text-silver-dim transition-colors hover:text-accent">
          → Estimate a new import cost
        </Link>
      </div>
    </div>
  );
}
