import { Container, SectionHeader } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { VehicleCard } from "@/components/vehicle/VehicleCard";
import { getFeaturedVehicles } from "@/lib/queries";
import { getFavoritedIds } from "@/app/actions/favorites";

export async function FeaturedCars() {
  const [vehicles, favorited] = await Promise.all([getFeaturedVehicles(4), getFavoritedIds()]);
  if (vehicles.length === 0) return null;

  return (
    <Container className="py-12">
      <SectionHeader
        title="Featured vehicles"
        description="Vehicles currently marked as available to import. Each price shown is the auction price, with the estimated landed cost beside it."
        action={
          <ButtonLink href="/cars" variant="outline">
            View all vehicles
          </ButtonLink>
        }
      />

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {vehicles.map((v, i) => (
          <VehicleCard key={v.id} vehicle={v} favorited={favorited.has(v.id)} eager={i < 2} />
        ))}
      </div>
    </Container>
  );
}
