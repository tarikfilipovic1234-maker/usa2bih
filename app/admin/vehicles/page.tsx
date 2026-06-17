import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { VehicleRowActions } from "@/components/admin/VehicleRowActions";
import { getAdminVehicles } from "@/lib/admin";
import { formatUSD, humanizeEnum } from "@/lib/utils";

const statusTone = { ACTIVE: "positive", DRAFT: "default", SOLD: "accent", ARCHIVED: "danger" } as const;

export default async function AdminVehiclesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const vehicles = await getAdminVehicles(q);

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-chrome-gradient">Vehicles</h1>
          <p className="mt-1 text-silver-dim">{vehicles.length} total</p>
        </div>
        <div className="flex items-center gap-3">
          <form className="hidden sm:block">
            <input
              name="q"
              defaultValue={q}
              placeholder="Search make, model, VIN…"
              className="h-10 w-64 rounded-full border border-steel bg-midnight-2 px-4 text-sm text-chrome placeholder:text-silver-dim/60 focus:border-accent focus:outline-none"
            />
          </form>
          <ButtonLink href="/admin/vehicles/new">
            <Plus className="h-4 w-4" /> Add vehicle
          </ButtonLink>
        </div>
      </header>

      <GlassCard className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr className="border-b border-white/5 text-left text-xs uppercase tracking-wider text-silver-dim">
                <th className="px-5 py-3 font-medium">Vehicle</th>
                <th className="px-3 py-3 font-medium">Price</th>
                <th className="px-3 py-3 font-medium">Status</th>
                <th className="px-3 py-3 font-medium">Saves / Inq.</th>
                <th className="px-5 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {vehicles.map((v) => (
                <tr key={v.id} className="hover:bg-white/[0.02]">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-14 shrink-0 overflow-hidden rounded-md bg-graphite">
                        {v.images[0] && <Image src={v.images[0].url} alt="" fill sizes="56px" className="object-cover" />}
                      </div>
                      <div className="min-w-0">
                        <Link href={`/admin/vehicles/${v.id}/edit`} className="font-medium text-chrome hover:text-accent">
                          {v.year} {v.make} {v.model}
                        </Link>
                        <p className="text-xs text-silver-dim">{v.mileage.toLocaleString()} mi · {humanizeEnum(v.fuelType)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3 font-mono text-silver">{formatUSD(v.price)}</td>
                  <td className="px-3 py-3">
                    <Badge tone={statusTone[v.status]}>{humanizeEnum(v.status)}</Badge>
                  </td>
                  <td className="px-3 py-3 text-silver-dim">
                    {v._count.favorites} / {v._count.inquiries}
                  </td>
                  <td className="px-5 py-3">
                    <VehicleRowActions id={v.id} featured={v.featured} status={v.status} />
                  </td>
                </tr>
              ))}
              {vehicles.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-silver-dim">
                    No vehicles found.{" "}
                    <Link href="/admin/vehicles/new" className="text-accent">
                      Add one
                    </Link>
                    .
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
