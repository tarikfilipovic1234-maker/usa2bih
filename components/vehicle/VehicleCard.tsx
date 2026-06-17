import Image from "next/image";
import Link from "next/link";
import { Fuel, Gauge, Settings2 } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { FavoriteButton } from "./FavoriteButton";
import { CompareButton } from "@/components/compare/CompareButton";
import { estimateLandedTotal } from "@/lib/calculator";
import { formatBAM, formatMiles, formatUSD, humanizeEnum } from "@/lib/utils";
import type { VehicleWithImages } from "@/lib/queries";

const damageTone = {
  CLEAN: "positive",
  MINOR: "default",
  MODERATE: "warning",
  SEVERE: "danger",
  SALVAGE: "danger",
} as const;

export function VehicleCard({
  vehicle,
  favorited = false,
  priority = false,
}: {
  vehicle: VehicleWithImages;
  favorited?: boolean;
  priority?: boolean;
}) {
  const primary = vehicle.images.find((i) => i.isPrimary) ?? vehicle.images[0];
  const landedBAM = estimateLandedTotal(vehicle.price).totalBAM;

  return (
    <GlassCard interactive className="group flex flex-col overflow-hidden p-0">
      <div className="relative aspect-[16/10] overflow-hidden">
        {primary ? (
          <Image
            src={primary.url}
            alt={primary.alt ?? `${vehicle.year} ${vehicle.make} ${vehicle.model}`}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full place-items-center bg-graphite text-silver-dim">No image</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-transparent to-transparent" />

        <div className="absolute left-3 top-3 flex gap-2">
          {vehicle.featured && <Badge tone="accent">Featured</Badge>}
          <Badge tone={damageTone[vehicle.damageStatus]}>{humanizeEnum(vehicle.damageStatus)}</Badge>
        </div>
        <div className="absolute right-3 top-3 flex gap-2">
          <CompareButton vehicleId={vehicle.id} />
          <FavoriteButton vehicleId={vehicle.id} initial={favorited} />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-accent">{vehicle.year}</p>
          <Link href={`/cars/${vehicle.slug}`} className="block">
            <h3 className="font-display text-lg font-semibold tracking-tight text-chrome transition-colors group-hover:text-accent-bright">
              {vehicle.make} {vehicle.model}
            </h3>
          </Link>
          {vehicle.trim && <p className="text-sm text-silver-dim">{vehicle.trim}</p>}
        </div>

        <div className="grid grid-cols-3 gap-2 border-y border-white/5 py-3 text-xs text-silver">
          <span className="flex items-center gap-1.5">
            <Gauge className="h-3.5 w-3.5 text-silver-dim" /> {formatMiles(vehicle.mileage)}
          </span>
          <span className="flex items-center gap-1.5">
            <Settings2 className="h-3.5 w-3.5 text-silver-dim" /> {humanizeEnum(vehicle.driveType)}
          </span>
          <span className="flex items-center gap-1.5">
            <Fuel className="h-3.5 w-3.5 text-silver-dim" /> {humanizeEnum(vehicle.fuelType)}
          </span>
        </div>

        <div className="mt-auto flex items-end justify-between">
          <div>
            <p className="text-xs text-silver-dim">Auction price</p>
            <p className="font-display text-xl font-bold text-chrome">{formatUSD(vehicle.price)}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-silver-dim">Est. landed</p>
            <p className="font-mono text-sm font-semibold text-accent-bright">~{formatBAM(landedBAM)}</p>
          </div>
        </div>

        <Link
          href={`/cars/${vehicle.slug}`}
          className="inline-flex h-10 items-center justify-center rounded-full border border-steel-2 text-sm font-medium text-silver transition-all hover:border-accent hover:bg-accent/5 hover:text-chrome"
        >
          View details
        </Link>
      </div>
    </GlassCard>
  );
}
