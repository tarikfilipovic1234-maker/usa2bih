import type { Metadata } from "next";
import { Container, SectionHeading } from "@/components/ui/Container";
import { Calculator } from "@/components/calculator/Calculator";

export const metadata: Metadata = {
  title: "Import Cost Calculator",
  description:
    "Estimate the full landed cost of importing a US car to Bosnia & Herzegovina — purchase, shipping, customs duty, VAT, and fees in BAM and EUR.",
};

function num(v: string | string[] | undefined) {
  const s = Array.isArray(v) ? v[0] : v;
  const n = s ? Number(s) : NaN;
  return Number.isFinite(n) ? n : undefined;
}

export default async function CalculatorPage({
  searchParams,
}: {
  searchParams: Promise<{ price?: string | string[] }>;
}) {
  const { price } = await searchParams;

  return (
    <Container className="py-12">
      <SectionHeading
        align="left"
        eyebrow="Cost calculator"
        title="Estimate your landed cost"
        description="Adjust the figures below to see your full import cost in BAM and EUR, updated live."
      />
      <div className="mt-10">
        <Calculator initialPrice={num(price)} />
      </div>
    </Container>
  );
}
