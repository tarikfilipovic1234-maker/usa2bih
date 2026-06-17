import { GlassCard } from "@/components/ui/GlassCard";
import { formatBAM, formatEUR, formatUSD } from "@/lib/utils";
import type { ImportCostResult } from "@/lib/calculator";

export function CostBreakdown({
  result,
  title = "Estimated landed cost",
}: {
  result: ImportCostResult;
  title?: string;
}) {
  return (
    <GlassCard chrome className="overflow-hidden p-0">
      <div className="border-b border-white/5 px-6 py-4">
        <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-chrome">
          {title}
        </h3>
      </div>

      <ul className="divide-y divide-white/5">
        {result.lineItems
          .filter((li) => li.amountUSD > 0)
          .map((li) => (
            <li key={li.key} className="flex items-center justify-between px-6 py-3 text-sm">
              <span className="text-silver-dim">{li.label}</span>
              <span className="font-mono text-silver">{formatUSD(li.amountUSD)}</span>
            </li>
          ))}
      </ul>

      <div className="bg-accent/5 px-6 py-5">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-silver-dim">Total in BAM</p>
            <p className="font-display text-3xl font-bold text-accent-gradient">
              {formatBAM(result.totalBAM)}
            </p>
          </div>
          <div className="text-right text-sm text-silver-dim">
            <p>{formatEUR(result.totalEUR)}</p>
            <p className="font-mono">{formatUSD(result.totalUSD)}</p>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
