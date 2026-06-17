"use client";

import { useActionState } from "react";
import { Check, Save } from "lucide-react";
import type { AdminFormState } from "@/app/actions/admin";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Input, Label, Select, Textarea } from "@/components/ui/Field";
import {
  BODY_STYLES,
  DAMAGE_STATUSES,
  DRIVE_TYPES,
  FUEL_TYPES,
  TRANSMISSIONS,
  VEHICLE_STATUSES,
} from "@/lib/constants";
import { humanizeEnum } from "@/lib/utils";

type Action = (state: AdminFormState, formData: FormData) => Promise<AdminFormState>;

export type VehicleDefaults = Partial<{
  make: string;
  model: string;
  year: number;
  trim: string | null;
  mileage: number;
  fuelType: string;
  transmission: string;
  bodyStyle: string;
  driveType: string;
  exteriorColor: string | null;
  interiorColor: string | null;
  price: number;
  vin: string | null;
  engine: string | null;
  cylinders: number | null;
  condition: string | null;
  damageStatus: string;
  damageNotes: string | null;
  auctionName: string | null;
  lotNumber: string | null;
  location: string | null;
  estimatedArrivalDays: number | null;
  description: string | null;
  featured: boolean;
  status: string;
}>;

function Err({ msg }: { msg?: string }) {
  return msg ? <p className="mt-1 text-xs text-danger">{msg}</p> : null;
}

export function VehicleForm({
  action,
  defaults = {},
  submitLabel = "Save vehicle",
}: {
  action: Action;
  defaults?: VehicleDefaults;
  submitLabel?: string;
}) {
  const [state, formAction, pending] = useActionState<AdminFormState, FormData>(action, {});
  const fe = state.fieldErrors ?? {};
  const v = (val: string | number | null | undefined) => (val ?? "") as string | number;

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <GlassCard chrome className="grid gap-5 p-6 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <Label htmlFor="make">Make *</Label>
          <Input id="make" name="make" defaultValue={v(defaults.make)} required />
          <Err msg={fe.make} />
        </div>
        <div>
          <Label htmlFor="model">Model *</Label>
          <Input id="model" name="model" defaultValue={v(defaults.model)} required />
          <Err msg={fe.model} />
        </div>
        <div>
          <Label htmlFor="trim">Trim</Label>
          <Input id="trim" name="trim" defaultValue={v(defaults.trim)} />
        </div>
        <div>
          <Label htmlFor="year">Year *</Label>
          <Input id="year" name="year" type="number" defaultValue={v(defaults.year)} required />
          <Err msg={fe.year} />
        </div>
        <div>
          <Label htmlFor="mileage">Mileage (mi) *</Label>
          <Input id="mileage" name="mileage" type="number" defaultValue={v(defaults.mileage)} required />
          <Err msg={fe.mileage} />
        </div>
        <div>
          <Label htmlFor="price">Auction price ($) *</Label>
          <Input id="price" name="price" type="number" defaultValue={v(defaults.price)} required />
          <Err msg={fe.price} />
        </div>

        <EnumField name="fuelType" label="Fuel type" options={FUEL_TYPES} value={defaults.fuelType} />
        <EnumField name="transmission" label="Transmission" options={TRANSMISSIONS} value={defaults.transmission} />
        <EnumField name="bodyStyle" label="Body style" options={BODY_STYLES} value={defaults.bodyStyle} />
        <EnumField name="driveType" label="Drivetrain" options={DRIVE_TYPES} value={defaults.driveType} />
        <EnumField name="damageStatus" label="Damage status" options={DAMAGE_STATUSES} value={defaults.damageStatus} />

        <div>
          <Label htmlFor="engine">Engine</Label>
          <Input id="engine" name="engine" defaultValue={v(defaults.engine)} placeholder="3.0L I6" />
        </div>
        <div>
          <Label htmlFor="cylinders">Cylinders</Label>
          <Input id="cylinders" name="cylinders" type="number" defaultValue={v(defaults.cylinders)} />
        </div>
        <div>
          <Label htmlFor="vin">VIN</Label>
          <Input id="vin" name="vin" defaultValue={v(defaults.vin)} />
        </div>
        <div>
          <Label htmlFor="exteriorColor">Exterior color</Label>
          <Input id="exteriorColor" name="exteriorColor" defaultValue={v(defaults.exteriorColor)} />
        </div>
        <div>
          <Label htmlFor="interiorColor">Interior color</Label>
          <Input id="interiorColor" name="interiorColor" defaultValue={v(defaults.interiorColor)} />
        </div>
      </GlassCard>

      <GlassCard className="grid gap-5 p-6 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <Label htmlFor="auctionName">Auction</Label>
          <Input id="auctionName" name="auctionName" defaultValue={v(defaults.auctionName)} placeholder="Copart" />
        </div>
        <div>
          <Label htmlFor="lotNumber">Lot number</Label>
          <Input id="lotNumber" name="lotNumber" defaultValue={v(defaults.lotNumber)} />
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <Input id="location" name="location" defaultValue={v(defaults.location)} placeholder="Newark, NJ" />
        </div>
        <div>
          <Label htmlFor="estimatedArrivalDays">Est. arrival (days)</Label>
          <Input id="estimatedArrivalDays" name="estimatedArrivalDays" type="number" defaultValue={v(defaults.estimatedArrivalDays)} />
        </div>
        <div>
          <Label htmlFor="condition">Condition</Label>
          <Input id="condition" name="condition" defaultValue={v(defaults.condition)} />
        </div>
        <div className="sm:col-span-2 lg:col-span-3">
          <Label htmlFor="damageNotes">Damage notes</Label>
          <Textarea id="damageNotes" name="damageNotes" defaultValue={v(defaults.damageNotes)} className="min-h-20" />
        </div>
        <div className="sm:col-span-2 lg:col-span-3">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" defaultValue={v(defaults.description)} />
        </div>
      </GlassCard>

      <GlassCard className="flex flex-wrap items-end gap-6 p-6">
        <div className="w-40">
          <Label htmlFor="status">Status</Label>
          <Select id="status" name="status" defaultValue={defaults.status ?? "DRAFT"}>
            {VEHICLE_STATUSES.map((s) => (
              <option key={s} value={s}>
                {humanizeEnum(s)}
              </option>
            ))}
          </Select>
        </div>
        <label className="flex cursor-pointer items-center gap-2.5 pb-2.5 text-sm text-silver">
          <input type="checkbox" name="featured" defaultChecked={defaults.featured} className="h-4 w-4 accent-[var(--color-accent)]" />
          Feature on homepage
        </label>

        <div className="ml-auto flex items-center gap-3">
          {state.error && <p className="text-sm text-danger">{state.error}</p>}
          {state.ok && (
            <span className="flex items-center gap-1 text-sm text-positive">
              <Check className="h-4 w-4" /> Saved
            </span>
          )}
          <Button type="submit" disabled={pending}>
            <Save className="h-4 w-4" /> {pending ? "Saving…" : submitLabel}
          </Button>
        </div>
      </GlassCard>
    </form>
  );
}

function EnumField({
  name,
  label,
  options,
  value,
}: {
  name: string;
  label: string;
  options: readonly string[];
  value?: string;
}) {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Select id={name} name={name} defaultValue={value ?? options[0]}>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {humanizeEnum(opt)}
          </option>
        ))}
      </Select>
    </div>
  );
}
