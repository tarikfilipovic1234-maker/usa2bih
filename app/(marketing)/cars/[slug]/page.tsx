import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CalendarClock,
  ChevronLeft,
  Gauge,
  MapPin,
  Palette,
  Settings2,
  ShieldAlert,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { VehicleGallery } from "@/components/vehicle/VehicleGallery";
import { FavoriteButton } from "@/components/vehicle/FavoriteButton";
import { InquiryForm } from "@/components/vehicle/InquiryForm";
import { RecordView } from "@/components/vehicle/RecordView";
import { VehicleCard } from "@/components/vehicle/VehicleCard";
import { CostBreakdown } from "@/components/CostBreakdown";
import { getRelatedVehicles, getVehicleBySlug } from "@/lib/queries";
import { getFavoritedIds } from "@/app/actions/favorites";
import { estimateLandedTotal } from "@/lib/calculator";
import { formatDate, formatMiles, formatUSD, humanizeEnum } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = await getVehicleBySlug(slug);
  if (!vehicle) return { title: "Vehicle not found" };

  const name = `${vehicle.year} ${vehicle.make} ${vehicle.model}`;
  const image = vehicle.images.find((i) => i.isPrimary)?.url ?? vehicle.images[0]?.url;
  return {
    title: name,
    description:
      vehicle.description ??
      `Import this ${name} from the US to Bosnia. ${formatMiles(vehicle.mileage)}, ${humanizeEnum(vehicle.fuelType)}.`,
    openGraph: image
      ? { images: [{ url: image, width: 1200, height: 630, alt: name }] }
      : undefined,
  };
}

const damageTone = {
  CLEAN: "positive",
  MINOR: "default",
  MODERATE: "warning",
  SEVERE: "danger",
  SALVAGE: "danger",
} as const;

export default async function VehicleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vehicle = await getVehicleBySlug(slug);
  if (!vehicle || vehicle.status !== "ACTIVE") notFound();

  const [favorited, related] = await Promise.all([
    getFavoritedIds(),
    getRelatedVehicles({ id: vehicle.id, make: vehicle.make, bodyStyle: vehicle.bodyStyle }),
  ]);

  const name = `${vehicle.year} ${vehicle.make} ${vehicle.model}`;
  const cost = estimateLandedTotal(vehicle.price);

  const specs: { label: string; value: string; icon?: React.ReactNode }[] = [
    { label: "Mileage", value: formatMiles(vehicle.mileage), icon: <Gauge className="h-4 w-4" /> },
    { label: "Fuel type", value: humanizeEnum(vehicle.fuelType) },
    { label: "Transmission", value: humanizeEnum(vehicle.transmission), icon: <Settings2 className="h-4 w-4" /> },
    { label: "Drivetrain", value: humanizeEnum(vehicle.driveType) },
    { label: "Body style", value: humanizeEnum(vehicle.bodyStyle) },
    { label: "Engine", value: vehicle.engine ?? "—" },
    { label: "Cylinders", value: vehicle.cylinders ? String(vehicle.cylinders) : "—" },
    { label: "Exterior", value: vehicle.exteriorColor ?? "—", icon: <Palette className="h-4 w-4" /> },
    { label: "VIN", value: vehicle.vin ?? "—" },
    { label: "Condition", value: vehicle.condition ?? humanizeEnum(vehicle.damageStatus) },
  ];

  return (
    <Container className="py-8">
      <RecordView vehicleId={vehicle.id} />

      <Link
        href="/cars"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-silver-dim transition-colors hover:text-accent"
      >
        <ChevronLeft className="h-4 w-4" /> Back to browse
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        {/* Left: gallery + details */}
        <div className="flex flex-col gap-8">
          <VehicleGallery images={vehicle.images} name={name} />

          <section>
            <h2 className="mb-4 font-display text-xl font-semibold text-chrome">Specifications</h2>
            <GlassCard className="grid grid-cols-2 gap-px overflow-hidden p-0 sm:grid-cols-3">
              {specs.map((s) => (
                <div key={s.label} className="bg-graphite/40 px-4 py-4">
                  <p className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-silver-dim">
                    {s.icon} {s.label}
                  </p>
                  <p className="mt-1 truncate font-medium text-chrome" title={s.value}>
                    {s.value}
                  </p>
                </div>
              ))}
            </GlassCard>
          </section>

          {vehicle.description && (
            <section>
              <h2 className="mb-3 font-display text-xl font-semibold text-chrome">Overview</h2>
              <p className="leading-relaxed text-silver">{vehicle.description}</p>
            </section>
          )}

          <section>
            <h2 className="mb-4 font-display text-xl font-semibold text-chrome">
              Auction &amp; condition
            </h2>
            <GlassCard className="flex flex-col gap-4 p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <Info label="Auction" value={vehicle.auctionName ?? "—"} />
                <Info label="Lot number" value={vehicle.lotNumber ?? "—"} />
                <Info
                  label="Location"
                  value={vehicle.location ?? "—"}
                  icon={<MapPin className="h-4 w-4" />}
                />
                <Info
                  label="Auction date"
                  value={vehicle.auctionDate ? formatDate(vehicle.auctionDate) : "—"}
                />
              </div>
              {vehicle.damageNotes && (
                <div className="flex items-start gap-3 rounded-xl border border-warning/20 bg-warning/5 p-4">
                  <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-warning" />
                  <div>
                    <p className="text-sm font-medium text-chrome">Damage notes</p>
                    <p className="text-sm text-silver-dim">{vehicle.damageNotes}</p>
                  </div>
                </div>
              )}
            </GlassCard>
          </section>
        </div>

        {/* Right: sticky purchase rail */}
        <div className="flex flex-col gap-6 lg:sticky lg:top-20 lg:h-fit">
          <GlassCard chrome className="flex flex-col gap-4 p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-accent">
                  {vehicle.year}
                </p>
                <h1 className="font-display text-2xl font-bold tracking-tight text-chrome">{name}</h1>
                {vehicle.trim && <p className="text-silver-dim">{vehicle.trim}</p>}
              </div>
              <Badge tone={damageTone[vehicle.damageStatus]}>
                {humanizeEnum(vehicle.damageStatus)}
              </Badge>
            </div>

            <div className="flex items-end justify-between border-y border-white/5 py-4">
              <div>
                <p className="text-xs text-silver-dim">Auction price</p>
                <p className="font-display text-3xl font-bold text-chrome">
                  {formatUSD(vehicle.price)}
                </p>
              </div>
              {vehicle.estimatedArrivalDays && (
                <div className="text-right">
                  <p className="flex items-center justify-end gap-1 text-xs text-silver-dim">
                    <CalendarClock className="h-3.5 w-3.5" /> Est. arrival
                  </p>
                  <p className="font-medium text-chrome">~{vehicle.estimatedArrivalDays} days</p>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <FavoriteButton vehicleId={vehicle.id} initial={favorited.has(vehicle.id)} variant="full" />
              <Link
                href={`/calculator?price=${vehicle.price}`}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-steel-2 text-sm font-medium text-silver transition-all hover:border-accent hover:text-chrome"
              >
                Open in calculator
              </Link>
            </div>
          </GlassCard>

          <CostBreakdown result={cost} />

          <GlassCard chrome className="p-6">
            <h3 className="mb-1 font-display text-lg font-semibold text-chrome">Interested?</h3>
            <p className="mb-4 text-sm text-silver-dim">
              Send us a message and we&apos;ll walk you through importing this vehicle.
            </p>
            <InquiryForm vehicleId={vehicle.id} vehicleName={name} />
          </GlassCard>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 font-display text-2xl font-bold text-chrome">Similar vehicles</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((v) => (
              <VehicleCard key={v.id} vehicle={v} favorited={favorited.has(v.id)} />
            ))}
          </div>
        </section>
      )}
    </Container>
  );
}

function Info({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div>
      <p className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-silver-dim">
        {icon} {label}
      </p>
      <p className="mt-0.5 font-medium text-chrome">{value}</p>
    </div>
  );
}
