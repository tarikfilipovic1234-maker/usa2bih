import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, ExternalLink } from "lucide-react";
import { VehicleForm } from "@/components/admin/VehicleForm";
import { ImageManager } from "@/components/admin/ImageManager";
import { getAdminVehicle } from "@/lib/admin";
import { updateVehicle } from "@/app/actions/admin";

export const metadata = { title: "Edit Vehicle" };

export default async function EditVehiclePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const vehicle = await getAdminVehicle(id);
  if (!vehicle) notFound();

  const updateAction = updateVehicle.bind(null, id);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link href="/admin/vehicles" className="inline-flex items-center gap-1.5 text-sm text-silver-dim hover:text-accent">
            <ChevronLeft className="h-4 w-4" /> Back to vehicles
          </Link>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-chrome-gradient">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </h1>
        </div>
        {vehicle.status === "ACTIVE" && (
          <Link
            href={`/cars/${vehicle.slug}`}
            target="_blank"
            className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline"
          >
            View live <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>

      <ImageManager vehicleId={vehicle.id} images={vehicle.images} />

      <VehicleForm action={updateAction} defaults={vehicle} submitLabel="Save changes" />
    </div>
  );
}
