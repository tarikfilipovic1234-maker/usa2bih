import { Heart } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { ButtonLink } from "@/components/ui/Button";
import { VehicleCard } from "@/components/vehicle/VehicleCard";
import { requireUser } from "@/lib/auth";
import { getUserFavorites } from "@/lib/dashboard";

export const metadata = { title: "Saved Vehicles" };

export default async function FavoritesPage() {
  const { user } = await requireUser();
  const vehicles = await getUserFavorites(user.id);

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="font-display text-3xl font-bold tracking-tight text-chrome-gradient">
          Saved Vehicles
        </h1>
        <p className="mt-1 text-silver-dim">{vehicles.length} saved</p>
      </header>

      {vehicles.length === 0 ? (
        <GlassCard className="flex flex-col items-center gap-4 px-6 py-16 text-center">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/5 text-silver-dim">
            <Heart className="h-7 w-7" />
          </span>
          <div>
            <h2 className="font-display text-lg font-semibold text-chrome">No saved vehicles yet</h2>
            <p className="mt-1 text-sm text-silver-dim">Tap the heart on any listing to save it here.</p>
          </div>
          <ButtonLink href="/cars">Browse cars</ButtonLink>
        </GlassCard>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {vehicles.map((v) => (
            <VehicleCard key={v.id} vehicle={v} favorited />
          ))}
        </div>
      )}
    </div>
  );
}
