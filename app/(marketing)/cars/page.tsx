import type { Metadata } from "next";
import { Suspense } from "react";
import { CarFront } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { VehicleCard } from "@/components/vehicle/VehicleCard";
import { FilterSidebar } from "@/components/vehicle/FilterSidebar";
import { SortSelect } from "@/components/vehicle/SortSelect";
import { Pagination } from "@/components/vehicle/Pagination";
import { getAvailableMakes, getVehicles, type VehicleFilters } from "@/lib/queries";
import { getFavoritedIds } from "@/app/actions/favorites";

export const metadata: Metadata = {
  title: "Browse US Auction Cars",
  description:
    "Filter thousands of US auction vehicles by make, model, year, price, fuel, transmission and more — with transparent landed-cost estimates for Bosnia.",
};

type RawParams = Record<string, string | string[] | undefined>;

function str(v: string | string[] | undefined) {
  return Array.isArray(v) ? v[0] : v;
}
function num(v: string | string[] | undefined) {
  const s = str(v);
  const n = s ? Number(s) : NaN;
  return Number.isFinite(n) ? n : undefined;
}

function parseFilters(sp: RawParams): VehicleFilters {
  return {
    q: str(sp.q),
    make: str(sp.make),
    model: str(sp.model),
    fuelType: str(sp.fuelType),
    transmission: str(sp.transmission),
    bodyStyle: str(sp.bodyStyle),
    driveType: str(sp.driveType),
    damageStatus: str(sp.damageStatus),
    yearMin: num(sp.yearMin),
    yearMax: num(sp.yearMax),
    priceMin: num(sp.priceMin),
    priceMax: num(sp.priceMax),
    mileageMax: num(sp.mileageMax),
    sort: str(sp.sort),
    page: num(sp.page) ?? 1,
  };
}

export default async function CarsPage({
  searchParams,
}: {
  searchParams: Promise<RawParams>;
}) {
  const sp = await searchParams;
  const filters = parseFilters(sp);

  const [{ vehicles, total, page, pageCount }, makes, favorited] = await Promise.all([
    getVehicles(filters),
    getAvailableMakes(),
    getFavoritedIds(),
  ]);

  const flatParams = Object.fromEntries(
    Object.entries(sp).map(([k, v]) => [k, str(v)]),
  ) as Record<string, string | undefined>;

  return (
    <Container className="py-12">
      <header className="mb-8">
        <h1 className="font-display text-4xl font-bold tracking-tight text-chrome-gradient">
          Browse Cars
        </h1>
        <p className="mt-2 text-silver-dim">
          {total} {total === 1 ? "vehicle" : "vehicles"} available for import
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
        <Suspense fallback={<div className="glass h-96 rounded-2xl" />}>
          <FilterSidebar makes={makes} />
        </Suspense>

        <div>
          <div className="mb-6 flex items-center justify-between gap-4">
            <p className="text-sm text-silver-dim">
              Page {page} of {pageCount}
            </p>
            <Suspense fallback={null}>
              <SortSelect />
            </Suspense>
          </div>

          {vehicles.length === 0 ? (
            <GlassCard className="flex flex-col items-center gap-4 px-6 py-20 text-center">
              <span className="grid h-16 w-16 place-items-center rounded-2xl bg-white/5 text-silver-dim">
                <CarFront className="h-8 w-8" />
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold text-chrome">No vehicles found</h3>
                <p className="mt-1 text-sm text-silver-dim">
                  Try widening your filters or resetting the search.
                </p>
              </div>
            </GlassCard>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {vehicles.map((v, i) => (
                <VehicleCard
                  key={v.id}
                  vehicle={v}
                  favorited={favorited.has(v.id)}
                  priority={i < 3}
                />
              ))}
            </div>
          )}

          <div className="mt-10">
            <Pagination page={page} pageCount={pageCount} searchParams={flatParams} />
          </div>
        </div>
      </div>
    </Container>
  );
}
