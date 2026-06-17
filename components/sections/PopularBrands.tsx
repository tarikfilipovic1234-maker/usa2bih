import Link from "next/link";
import { Container, SectionHeading } from "@/components/ui/Container";
import { POPULAR_BRANDS } from "@/lib/constants";

export function PopularBrands() {
  return (
    <Container className="py-12">
      <SectionHeading eyebrow="Popular brands" title="Shop by manufacturer" />
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        {POPULAR_BRANDS.map((brand) => (
          <Link
            key={brand}
            href={`/cars?make=${encodeURIComponent(brand)}`}
            className="glass rounded-full px-5 py-2.5 text-sm font-medium text-silver transition-all hover:-translate-y-0.5 hover:text-accent-bright"
          >
            {brand}
          </Link>
        ))}
      </div>
    </Container>
  );
}
