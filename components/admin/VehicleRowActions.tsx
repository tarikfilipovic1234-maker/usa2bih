"use client";

import Link from "next/link";
import { useTransition } from "react";
import { Pencil, Star, Trash2 } from "lucide-react";
import { deleteVehicle, setVehicleStatus, toggleVehicleFeatured } from "@/app/actions/admin";
import { VEHICLE_STATUSES } from "@/lib/constants";
import { humanizeEnum, cn } from "@/lib/utils";
import type { VehicleStatus } from "@/lib/generated/prisma/client";

export function VehicleRowActions({
  id,
  featured,
  status,
}: {
  id: string;
  featured: boolean;
  status: VehicleStatus;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex items-center justify-end gap-1.5">
      <select
        defaultValue={status}
        disabled={pending}
        onChange={(e) =>
          startTransition(async () => void (await setVehicleStatus(id, e.target.value as VehicleStatus)))
        }
        aria-label="Status"
        className="h-8 rounded-lg border border-steel bg-midnight-2 px-2 text-xs text-silver focus:border-accent focus:outline-none"
      >
        {VEHICLE_STATUSES.map((s) => (
          <option key={s} value={s}>
            {humanizeEnum(s)}
          </option>
        ))}
      </select>

      <button
        type="button"
        disabled={pending}
        onClick={() => startTransition(async () => void (await toggleVehicleFeatured(id, !featured)))}
        aria-label="Toggle featured"
        className={cn(
          "grid h-8 w-8 place-items-center rounded-lg text-silver-dim hover:bg-white/5",
          featured && "text-accent",
        )}
      >
        <Star className={cn("h-4 w-4", featured && "fill-current")} />
      </button>

      <Link
        href={`/admin/vehicles/${id}/edit`}
        aria-label="Edit"
        className="grid h-8 w-8 place-items-center rounded-lg text-silver-dim hover:bg-white/5 hover:text-chrome"
      >
        <Pencil className="h-4 w-4" />
      </Link>

      <button
        type="button"
        disabled={pending}
        onClick={() => {
          if (confirm("Delete this vehicle and its images? This cannot be undone.")) {
            startTransition(async () => void (await deleteVehicle(id)));
          }
        }}
        aria-label="Delete"
        className="grid h-8 w-8 place-items-center rounded-lg text-silver-dim hover:bg-danger/10 hover:text-danger"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}
