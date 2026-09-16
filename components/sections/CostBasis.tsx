import { ButtonLink } from "@/components/ui/Button";
import { Container, SectionHeader } from "@/components/ui/Container";
import { RATES } from "@/lib/calculator";
import { IMPORT_STAGES } from "@/lib/constants";

/**
 * The figures the landed-cost estimate is actually built from. Every value is
 * read from the live rate constants, so the page can never drift from the
 * numbers the calculator applies.
 */
const FACTS = [
  {
    value: `${Math.round(RATES.customsDutyRate * 100)}%`,
    label: "Customs duty",
    note: "Charged on the purchase price plus auction fees and shipping.",
  },
  {
    value: `${Math.round(RATES.vatRate * 100)}%`,
    label: "VAT (PDV)",
    note: "Charged on the customs value once duty has been added.",
  },
  {
    value: RATES.eurToBam.toFixed(5),
    label: "BAM per EUR",
    note: "The fixed peg used to convert every estimate into marks.",
  },
  {
    value: String(IMPORT_STAGES.length),
    label: "Tracked stages",
    note: "From vehicle found through customs clearance to delivery.",
  },
];

export function CostBasis() {
  return (
    <Container className="py-12">
      <SectionHeader
        title="What the estimate is based on"
        description="Import costs in Bosnia and Herzegovina are set by published rates, not by guesswork. These are the figures every estimate on this site applies."
        action={
          <ButtonLink href="/calculator" variant="outline">
            Run your own numbers
          </ButtonLink>
        }
      />

      <dl className="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
        {FACTS.map((fact) => (
          <div key={fact.label} className="flex flex-col gap-1">
            <dt className="font-display text-3xl font-semibold tabular-nums text-chrome">
              {fact.value}
            </dt>
            <dd className="text-sm font-medium text-silver">{fact.label}</dd>
            <p className="text-sm leading-relaxed text-silver-dim">{fact.note}</p>
          </div>
        ))}
      </dl>
    </Container>
  );
}
