import { Container } from "@/components/ui/Container";

/**
 * Shared shell for the policy pages: one column, generous measure, and a
 * visible "last updated" date so readers can tell which version they are on.
 */
export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <Container className="py-12">
      <div className="max-w-3xl">
        <header className="border-b border-steel pb-6">
          <h1 className="font-display text-3xl font-semibold tracking-tight text-chrome">
            {title}
          </h1>
          <p className="mt-2 text-sm text-silver-dim">Last updated {updated}</p>
        </header>

        <div className="mt-8 flex flex-col gap-8">{children}</div>
      </div>
    </Container>
  );
}

export function LegalSection({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3 text-sm leading-relaxed text-silver-dim [&_a]:text-accent [&_a]:underline-offset-4 hover:[&_a]:underline [&_li]:ml-5 [&_li]:list-disc [&_strong]:font-medium [&_strong]:text-silver">
      <h2 className="font-display text-lg font-semibold text-chrome">{heading}</h2>
      {children}
    </section>
  );
}
