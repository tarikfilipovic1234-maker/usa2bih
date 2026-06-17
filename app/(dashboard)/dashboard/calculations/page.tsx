import Link from "next/link";
import { Calculator } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { ButtonLink } from "@/components/ui/Button";
import { requireUser } from "@/lib/auth";
import { getUserCalculations } from "@/lib/dashboard";
import { formatBAM, formatDate, formatEUR, formatUSD } from "@/lib/utils";

export const metadata = { title: "Calculations" };

export default async function CalculationsPage() {
  const { user } = await requireUser();
  const calcs = await getUserCalculations(user.id);

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="font-display text-3xl font-bold tracking-tight text-chrome-gradient">
          Calculation History
        </h1>
        <p className="mt-1 text-silver-dim">Your saved import cost estimates.</p>
      </header>

      {calcs.length === 0 ? (
        <GlassCard className="flex flex-col items-center gap-4 px-6 py-16 text-center">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/5 text-silver-dim">
            <Calculator className="h-7 w-7" />
          </span>
          <h2 className="font-display text-lg font-semibold text-chrome">No saved calculations</h2>
          <ButtonLink href="/calculator">Open calculator</ButtonLink>
        </GlassCard>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {calcs.map((c) => {
            const input = c.input as { purchasePrice?: number };
            const prefill = input.purchasePrice ?? "";
            return (
              <GlassCard key={c.id} interactive className="flex flex-col gap-4 p-5">
                <div className="flex items-start justify-between">
                  <div>
                    {c.vehicle ? (
                      <Link href={`/cars/${c.vehicle.slug}`} className="font-medium text-chrome hover:text-accent">
                        {c.vehicle.year} {c.vehicle.make} {c.vehicle.model}
                      </Link>
                    ) : (
                      <p className="font-medium text-chrome">Custom estimate</p>
                    )}
                    <p className="text-xs text-silver-dim">{formatDate(c.createdAt)}</p>
                  </div>
                  <Calculator className="h-5 w-5 text-accent/50" />
                </div>

                <div className="rounded-xl bg-accent/5 p-4">
                  <p className="text-xs uppercase tracking-wider text-silver-dim">Total landed</p>
                  <p className="font-display text-2xl font-bold text-accent-gradient">
                    {formatBAM(c.totalBAM)}
                  </p>
                  <p className="text-xs text-silver-dim">
                    {formatEUR(c.totalEUR)} · {formatUSD(c.totalUSD)}
                  </p>
                </div>

                <Link
                  href={`/calculator?price=${prefill}`}
                  className="text-sm text-silver-dim transition-colors hover:text-accent"
                >
                  → Recalculate
                </Link>
              </GlassCard>
            );
          })}
        </div>
      )}
    </div>
  );
}
