import Link from "next/link";
import { Container, SectionHeader } from "@/components/ui/Container";
import { POPULAR_BRANDS } from "@/lib/constants";

export function PopularBrands() {
  return (
    <Container className="py-12">
      <SectionHeader title="Browse by manufacturer" />
      <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
        {POPULAR_BRANDS.map((brand) => (
          <li key={brand}>
            <Link
              href={`/cars?make=${encodeURIComponent(brand)}`}
              className="text-sm text-silver underline-offset-4 transition-colors hover:text-accent-bright hover:underline"
            >
              {brand}
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
