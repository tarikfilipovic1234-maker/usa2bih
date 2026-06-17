import { Container } from "@/components/ui/Container";

export default function CarsLoading() {
  return (
    <Container className="py-12">
      <div className="mb-8">
        <div className="h-9 w-48 animate-pulse rounded-lg bg-white/5" />
        <div className="mt-3 h-4 w-32 animate-pulse rounded bg-white/5" />
      </div>
      <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
        <div className="hidden h-96 animate-pulse rounded-2xl bg-white/5 lg:block" />
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="overflow-hidden rounded-2xl bg-white/[0.03]">
              <div className="aspect-[16/10] animate-pulse bg-white/5" />
              <div className="flex flex-col gap-3 p-5">
                <div className="h-5 w-3/4 animate-pulse rounded bg-white/5" />
                <div className="h-4 w-1/2 animate-pulse rounded bg-white/5" />
                <div className="h-10 w-full animate-pulse rounded-full bg-white/5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
