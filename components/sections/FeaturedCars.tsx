import { ArrowRight } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { VehicleCard } from "@/components/vehicle/VehicleCard";
import { getFeaturedVehicles } from "@/lib/queries";
import { getFavoritedIds } from "@/app/actions/favorites";

export async function FeaturedCars() {
  const [vehicles, favorited] = await Promise.all([getFeaturedVehicles(4), getFavoritedIds()]);
  if (vehicles.length === 0) return null;

  return (
    <section className="py-20">
      <Container>
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeading
            align="left"
            eyebrow="Featured imports"
            title="Hand-picked vehicles"
            description="A curated selection of standout cars ready to import right now."
          />
          <ButtonLink href="/cars" variant="outline" className="shrink-0">
            View all <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {vehicles.map((v, i) => (
            <VehicleCard key={v.id} vehicle={v} favorited={favorited.has(v.id)} priority={i < 2} />
          ))}
        </div>
      </Container>
    </section>
  );
}
