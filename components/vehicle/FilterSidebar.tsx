"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { RotateCcw, SlidersHorizontal } from "lucide-react";
import { Input, Label, Select } from "@/components/ui/Field";
import {
  BODY_STYLES,
  DAMAGE_STATUSES,
  DRIVE_TYPES,
  FUEL_TYPES,
  TRANSMISSIONS,
} from "@/lib/constants";
import { humanizeEnum } from "@/lib/utils";

function EnumSelect({
  name,
  label,
  options,
  value,
  onChange,
  placeholder,
}: {
  name: string;
  label: string;
  options: readonly string[];
  value: string;
  onChange: (name: string, value: string) => void;
  placeholder: string;
}) {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Select id={name} value={value} onChange={(e) => onChange(name, e.target.value)}>
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {humanizeEnum(opt)}
          </option>
        ))}
      </Select>
    </div>
  );
}

export function FilterSidebar({ makes }: { makes: string[] }) {
  const router = useRouter();
  const params = useSearchParams();

  const get = (k: string) => params.get(k) ?? "";

  const update = useCallback(
    (entries: Record<string, string>) => {
      const next = new URLSearchParams(params.toString());
      for (const [k, v] of Object.entries(entries)) {
        if (v) next.set(k, v);
        else next.delete(k);
      }
      next.delete("page"); // reset pagination on filter change
      router.push(`/cars?${next.toString()}`);
    },
    [params, router],
  );

  const onField = (name: string, value: string) => update({ [name]: value });

  return (
    <aside className="glass chrome-edge h-fit rounded-2xl p-5 lg:sticky lg:top-20">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wider text-chrome">
          <SlidersHorizontal className="h-4 w-4 text-accent" /> Filters
        </h2>
        <button
          type="button"
          onClick={() => router.push("/cars")}
          className="inline-flex items-center gap-1 text-xs text-silver-dim transition-colors hover:text-accent"
        >
          <RotateCcw className="h-3 w-3" /> Reset
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <Label htmlFor="q">Search</Label>
          <Input
            id="q"
            defaultValue={get("q")}
            placeholder="Make, model, VIN…"
            onKeyDown={(e) => {
              if (e.key === "Enter") update({ q: (e.target as HTMLInputElement).value });
            }}
            onBlur={(e) => update({ q: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="make">Manufacturer</Label>
          <Select id="make" value={get("make")} onChange={(e) => onField("make", e.target.value)}>
            <option value="">All makes</option>
            {makes.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </Select>
        </div>

        <EnumSelect name="fuelType" label="Fuel type" options={FUEL_TYPES} value={get("fuelType")} onChange={onField} placeholder="Any fuel" />
        <EnumSelect name="transmission" label="Transmission" options={TRANSMISSIONS} value={get("transmission")} onChange={onField} placeholder="Any" />
        <EnumSelect name="bodyStyle" label="Body style" options={BODY_STYLES} value={get("bodyStyle")} onChange={onField} placeholder="Any body" />
        <EnumSelect name="driveType" label="Drivetrain" options={DRIVE_TYPES} value={get("driveType")} onChange={onField} placeholder="Any drive" />
        <EnumSelect name="damageStatus" label="Damage status" options={DAMAGE_STATUSES} value={get("damageStatus")} onChange={onField} placeholder="Any condition" />

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="yearMin">Year from</Label>
            <Input id="yearMin" type="number" inputMode="numeric" defaultValue={get("yearMin")} placeholder="2010" onBlur={(e) => update({ yearMin: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="yearMax">Year to</Label>
            <Input id="yearMax" type="number" inputMode="numeric" defaultValue={get("yearMax")} placeholder="2024" onBlur={(e) => update({ yearMax: e.target.value })} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="priceMin">Price min $</Label>
            <Input id="priceMin" type="number" inputMode="numeric" defaultValue={get("priceMin")} placeholder="0" onBlur={(e) => update({ priceMin: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="priceMax">Price max $</Label>
            <Input id="priceMax" type="number" inputMode="numeric" defaultValue={get("priceMax")} placeholder="80000" onBlur={(e) => update({ priceMax: e.target.value })} />
          </div>
        </div>

        <div>
          <Label htmlFor="mileageMax">Max mileage (mi)</Label>
          <Input id="mileageMax" type="number" inputMode="numeric" defaultValue={get("mileageMax")} placeholder="100000" onBlur={(e) => update({ mileageMax: e.target.value })} />
        </div>
      </div>
    </aside>
  );
}
