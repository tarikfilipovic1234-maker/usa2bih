import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export function CTA() {
  return (
    <Container className="py-12">
      <div className="panel flex flex-col gap-6 rounded-lg px-6 py-10 sm:px-10 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-chrome">
            Price an import before you commit to one
          </h2>
          <p className="mt-2 leading-relaxed text-silver-dim">
            Browse what is available now, or put your own figures through the calculator. Neither
            needs an account.
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <ButtonLink href="/cars">Browse cars</ButtonLink>
          <ButtonLink href="/calculator" variant="outline">
            Open calculator
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}
