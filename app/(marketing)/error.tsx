"use client";

import { useEffect } from "react";
import { RotateCcw } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function MarketingError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="grid min-h-[60vh] place-items-center">
      <div className="flex max-w-md flex-col items-center gap-5 text-center">
        <h1 className="font-display text-3xl font-bold text-chrome">Something went wrong</h1>
        <p className="text-silver-dim">
          We hit a snag loading this page. Please try again — if it keeps happening, contact us.
        </p>
        <Button onClick={reset}>
          <RotateCcw className="h-4 w-4" /> Try again
        </Button>
      </div>
    </Container>
  );
}
