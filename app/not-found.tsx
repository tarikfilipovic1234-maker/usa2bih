import Link from "next/link";
import { Compass, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center px-6">
      <div className="flex max-w-md flex-col items-center gap-6 text-center">
        <span className="grid h-16 w-16 place-items-center rounded-2xl bg-accent/15 text-accent-bright">
          <Compass className="h-8 w-8" />
        </span>
        <div>
          <p className="font-display text-6xl font-extrabold text-chrome-gradient">404</p>
          <h1 className="mt-2 font-display text-2xl font-bold text-chrome">Page not found</h1>
          <p className="mt-2 text-silver-dim">
            The page you&apos;re looking for has driven off. Let&apos;s get you back on the road.
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-accent px-6 text-sm font-medium text-midnight transition-colors hover:bg-accent-bright"
          >
            <Home className="h-4 w-4" /> Home
          </Link>
          <Link
            href="/cars"
            className="inline-flex h-11 items-center gap-2 rounded-full border border-steel-2 px-6 text-sm font-medium text-silver transition-all hover:border-accent hover:text-chrome"
          >
            Browse cars
          </Link>
        </div>
      </div>
    </main>
  );
}
