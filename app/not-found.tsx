import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center px-6">
      <div className="flex max-w-md flex-col items-start gap-6">
        <p className="font-mono text-sm font-medium text-accent">404</p>
        <div>
          <h1 className="font-display text-2xl font-semibold text-chrome">Page not found</h1>
          <p className="mt-2 leading-relaxed text-silver-dim">
            This address does not match anything on the site. A vehicle listing that has been sold
            or archived will also land here.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/cars"
            className="inline-flex h-10 items-center rounded-md border border-accent-deep bg-accent-deep px-5 text-sm font-medium text-white transition-colors hover:border-accent hover:bg-accent"
          >
            Browse cars
          </Link>
          <Link
            href="/"
            className="inline-flex h-10 items-center rounded-md border border-steel-2 px-5 text-sm font-medium text-silver transition-colors hover:border-silver-dim hover:text-chrome"
          >
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}
