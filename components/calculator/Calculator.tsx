"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { BadgeCheck, Bookmark, RotateCcw } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Input, Label } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { CostBreakdown } from "@/components/CostBreakdown";
import { calculateImportCost } from "@/lib/calculator";
import { saveCalculation } from "@/app/actions/calculations";
import type { CalculatorInput } from "@/lib/validation";

const DEFAULTS: CalculatorInput = {
  purchasePrice: 18000,
  auctionFees: 1400,
  shipping: 1900,
  fuelType: "GASOLINE",
  registration: 600,
  serviceFee: 750,
};

const FIELDS: { key: keyof CalculatorInput; label: string; hint?: string }[] = [
  { key: "purchasePrice", label: "Vehicle purchase price ($)" },
  { key: "auctionFees", label: "Auction & broker fees ($)" },
  { key: "shipping", label: "Shipping — ocean + inland ($)" },
  { key: "registration", label: "Registration & inspection ($)" },
  { key: "serviceFee", label: "USA2BIH service fee ($)" },
];

export function Calculator({
  initialPrice,
  vehicleId,
}: {
  initialPrice?: number;
  vehicleId?: string;
}) {
  const router = useRouter();
  const [values, setValues] = useState<CalculatorInput>({
    ...DEFAULTS,
    purchasePrice: initialPrice ?? DEFAULTS.purchasePrice,
  });
  const [saved, setSaved] = useState(false);
  const [pending, startTransition] = useTransition();

  const result = useMemo(() => calculateImportCost(values), [values]);

  function set(key: keyof CalculatorInput, raw: string) {
    const n = raw === "" ? 0 : Number(raw);
    setValues((v) => ({ ...v, [key]: Number.isFinite(n) ? n : 0 }));
    setSaved(false);
  }

  function onSave() {
    startTransition(async () => {
      const res = await saveCalculation(values, vehicleId);
      if (!res.ok) {
        if (res.requiresAuth) router.push("/auth/sign-in");
        return;
      }
      setSaved(true);
    });
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
      <GlassCard chrome className="flex flex-col gap-5 p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-chrome">Your inputs</h2>
          <button
            type="button"
            onClick={() => {
              setValues(DEFAULTS);
              setSaved(false);
            }}
            className="inline-flex items-center gap-1 text-xs text-silver-dim transition-colors hover:text-accent"
          >
            <RotateCcw className="h-3 w-3" /> Reset
          </button>
        </div>

        {FIELDS.map((f) => (
          <div key={f.key}>
            <Label htmlFor={f.key}>{f.label}</Label>
            <Input
              id={f.key}
              type="number"
              inputMode="numeric"
              min={0}
              value={values[f.key] as number}
              onChange={(e) => set(f.key, e.target.value)}
            />
          </div>
        ))}

        <p className="rounded-xl border border-white/5 bg-white/[0.02] p-3 text-xs leading-relaxed text-silver-dim">
          Estimates include BiH customs duty (5%) and VAT/PDV (17%). FX: 1 USD ≈ 0.92 EUR, 1 EUR =
          1.95583 BAM. Figures are indicative — contact us for a binding quote.
        </p>
      </GlassCard>

      <div className="flex flex-col gap-4">
        <CostBreakdown result={result} title="Estimated total in Bosnia" />

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button onClick={onSave} disabled={pending} className="flex-1">
            {saved ? <BadgeCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
            {saved ? "Saved to dashboard" : pending ? "Saving…" : "Save calculation"}
          </Button>
        </div>
      </div>
    </div>
  );
}
