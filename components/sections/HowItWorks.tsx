import { Container, SectionHeader } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

const STEPS = [
  {
    title: "Price the import",
    body: "Put an auction price through the calculator and see duty, VAT, freight and fees as separate lines before you bid on anything.",
  },
  {
    title: "We bid for you",
    body: "Send an inquiry on a vehicle with the maximum you are willing to pay. We bid on your behalf and stop at your ceiling.",
  },
  {
    title: "Freight and clearance",
    body: "The car moves to the export port, crosses by sea, and clears customs in Bosnia. Each stage appears in your dashboard as it completes.",
  },
  {
    title: "Registration and handover",
    body: "Technical inspection and registration are completed, and the car is handed over with its full document set.",
  },
];

export function HowItWorks() {
  return (
    <Container className="py-12">
      <SectionHeader
        title="How an import runs"
        description="Four stages, each one visible to you while it is happening."
        action={
          <ButtonLink href="/guide" variant="outline">
            Read the full guide
          </ButtonLink>
        }
      />

      <ol className="mt-8 grid gap-px bg-steel sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, i) => (
          <li key={step.title} className="bg-midnight p-6 pt-8">
            <span className="font-mono text-xs font-medium tabular-nums text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 font-display text-base font-semibold text-chrome">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-silver-dim">{step.body}</p>
          </li>
        ))}
      </ol>

    </Container>
  );
}
