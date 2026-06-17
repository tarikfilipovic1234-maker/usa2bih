import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { VehicleForm } from "@/components/admin/VehicleForm";
import { createVehicle } from "@/app/actions/admin";

export const metadata = { title: "Add Vehicle" };

export default function NewVehiclePage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link href="/admin/vehicles" className="inline-flex items-center gap-1.5 text-sm text-silver-dim hover:text-accent">
          <ChevronLeft className="h-4 w-4" /> Back to vehicles
        </Link>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-chrome-gradient">Add Vehicle</h1>
        <p className="mt-1 text-silver-dim">Create the listing first — you can add images on the next step.</p>
      </div>

      <VehicleForm action={createVehicle} submitLabel="Create vehicle" />
    </div>
  );
}
