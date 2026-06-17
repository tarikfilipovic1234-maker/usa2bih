import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Truck } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { ImportStageTracker } from "@/components/dashboard/ImportStageTracker";
import { requireUser } from "@/lib/auth";
import { getUserImports } from "@/lib/dashboard";
import { humanizeEnum } from "@/lib/utils";

export const metadata = { title: "My Imports" };

export default async function ImportsPage() {
  const { user } = await requireUser();
  const imports = await getUserImports(user.id);

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="font-display text-3xl font-bold tracking-tight text-chrome-gradient">My Imports</h1>
        <p className="mt-1 text-silver-dim">Track every vehicle through the import process.</p>
      </header>

      {imports.length === 0 ? (
        <GlassCard className="flex flex-col items-center gap-4 px-6 py-16 text-center">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/5 text-silver-dim">
            <Truck className="h-7 w-7" />
          </span>
          <h2 className="font-display text-lg font-semibold text-chrome">No imports yet</h2>
          <p className="max-w-md text-sm text-silver-dim">
            Once you start an import with us it will appear here with live stage tracking.
          </p>
          <ButtonLink href="/cars">Browse cars</ButtonLink>
        </GlassCard>
      ) : (
        <div className="flex flex-col gap-4">
          {imports.map((imp) => {
            const img = imp.vehicle?.images[0];
            const completed = imp.currentStage === "COMPLETED";
            return (
              <GlassCard key={imp.id} className="flex flex-col gap-5 p-5">
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-graphite">
                    {img && <Image src={img.url} alt="" fill sizes="96px" className="object-cover" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-medium text-chrome">
                      {imp.vehicle
                        ? `${imp.vehicle.year} ${imp.vehicle.make} ${imp.vehicle.model}`
                        : imp.reference}
                    </h3>
                    <p className="font-mono text-xs text-silver-dim">{imp.reference}</p>
                  </div>
                  <Badge tone={completed ? "positive" : "accent"}>{humanizeEnum(imp.currentStage)}</Badge>
                  <ButtonLink href={`/dashboard/imports/${imp.id}`} variant="ghost" size="sm" className="hidden sm:inline-flex">
                    Details <ArrowRight className="h-4 w-4" />
                  </ButtonLink>
                </div>
                <ImportStageTracker currentStage={imp.currentStage} />
                <Link href={`/dashboard/imports/${imp.id}`} className="text-sm text-accent sm:hidden">
                  View details →
                </Link>
              </GlassCard>
            );
          })}
        </div>
      )}
    </div>
  );
}
