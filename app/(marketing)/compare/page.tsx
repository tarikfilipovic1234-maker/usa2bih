import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { GitCompareArrows } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { ButtonLink } from "@/components/ui/Button";
import { CompareButton } from "@/components/compare/CompareButton";
import { getVehiclesByIds, type VehicleWithImages } from "@/lib/queries";
import { estimateLandedTotal } from "@/lib/calculator";
import { formatBAM, formatMiles, formatUSD, humanizeEnum } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Compare Vehicles",
  description: "Compare US auction vehicles side by side — specs, condition and estimated landed cost.",
};

type Row = { label: string; render: (v: VehicleWithImages) => string };

const ROWS: Row[] = [
  { label: "Auction price", render: (v) => formatUSD(v.price) },
  { label: "Est. landed (BAM)", render: (v) => `~${formatBAM(estimateLandedTotal(v.price).totalBAM)}` },
  { label: "Year", render: (v) => String(v.year) },
  { label: "Mileage", render: (v) => formatMiles(v.mileage) },
  { label: "Fuel", render: (v) => humanizeEnum(v.fuelType) },
  { label: "Transmission", render: (v) => humanizeEnum(v.transmission) },
  { label: "Body style", render: (v) => humanizeEnum(v.bodyStyle) },
  { label: "Drivetrain", render: (v) => humanizeEnum(v.driveType) },
  { label: "Engine", render: (v) => v.engine ?? "—" },
  { label: "Cylinders", render: (v) => (v.cylinders ? String(v.cylinders) : "—") },
  { label: "Damage", render: (v) => humanizeEnum(v.damageStatus) },
  { label: "Auction", render: (v) => v.auctionName ?? "—" },
  { label: "Location", render: (v) => v.location ?? "—" },
  { label: "Est. arrival", render: (v) => (v.estimatedArrivalDays ? `~${v.estimatedArrivalDays} days` : "—") },
];

export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<{ ids?: string }>;
}) {
  const { ids } = await searchParams;
  const idList = (ids ?? "").split(",").filter(Boolean).slice(0, 4);
  const vehicles = await getVehiclesByIds(idList);

  return (
    <Container className="py-12">
      <header className="mb-8">
        <h1 className="font-display text-4xl font-bold tracking-tight text-chrome-gradient">
          Compare Vehicles
        </h1>
        <p className="mt-2 text-silver-dim">Side-by-side specs and estimated landed cost.</p>
      </header>

      {vehicles.length === 0 ? (
        <GlassCard className="flex flex-col items-center gap-4 px-6 py-20 text-center">
          <span className="grid h-16 w-16 place-items-center rounded-2xl bg-white/5 text-silver-dim">
            <GitCompareArrows className="h-8 w-8" />
          </span>
          <div>
            <h2 className="font-display text-lg font-semibold text-chrome">Nothing to compare yet</h2>
            <p className="mt-1 text-sm text-silver-dim">
              Add vehicles using the compare button on any listing, then return here.
            </p>
          </div>
          <ButtonLink href="/cars">Browse cars</ButtonLink>
        </GlassCard>
      ) : (
        <GlassCard className="overflow-x-auto p-0">
          <table className="w-full min-w-[640px] border-collapse">
            <thead>
              <tr>
                <th className="sticky left-0 z-10 bg-graphite/80 p-4 text-left text-xs uppercase tracking-wider text-silver-dim backdrop-blur">
                  Vehicle
                </th>
                {vehicles.map((v) => {
                  const img = v.images.find((i) => i.isPrimary) ?? v.images[0];
                  return (
                    <th key={v.id} className="min-w-52 p-4 align-top">
                      <div className="flex flex-col gap-3">
                        <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-graphite">
                          {img && <Image src={img.url} alt="" fill sizes="220px" className="object-cover" />}
                          <div className="absolute right-2 top-2">
                            <CompareButton vehicleId={v.id} />
                          </div>
                        </div>
                        <Link href={`/cars/${v.slug}`} className="text-left font-display text-sm font-semibold text-chrome hover:text-accent">
                          {v.year} {v.make} {v.model}
                        </Link>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, i) => (
                <tr key={row.label} className={i % 2 ? "bg-white/[0.015]" : ""}>
                  <td className="sticky left-0 z-10 bg-graphite/80 p-4 text-xs uppercase tracking-wider text-silver-dim backdrop-blur">
                    {row.label}
                  </td>
                  {vehicles.map((v) => (
                    <td key={v.id} className="p-4 text-sm text-chrome">
                      {row.render(v)}
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td className="sticky left-0 bg-graphite/80 p-4 backdrop-blur" />
                {vehicles.map((v) => (
                  <td key={v.id} className="p-4">
                    <ButtonLink href={`/cars/${v.slug}`} size="sm" variant="outline">
                      View
                    </ButtonLink>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </GlassCard>
      )}
    </Container>
  );
}
