import { ArrowRight, Calculator } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export function CTA() {
  return (
    <Container className="py-20">
      <div className="glass chrome-edge noise relative overflow-hidden rounded-3xl px-6 py-16 text-center sm:px-12">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent/20 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-accent-deep/15 blur-[100px]" />

        <div className="relative mx-auto max-w-2xl">
          <h2 className="font-display text-3xl font-bold tracking-tight text-chrome-gradient sm:text-5xl">
            Ready to import your dream car?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-silver-dim">
            Browse live listings or estimate your full landed cost in seconds. No account needed to
            get started.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href="/cars" size="lg">
              Browse cars <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href="/calculator" variant="secondary" size="lg">
              <Calculator className="h-4 w-4" /> Open calculator
            </ButtonLink>
          </div>
        </div>
      </div>
    </Container>
  );
}
