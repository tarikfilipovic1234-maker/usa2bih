import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CompareBar } from "@/components/compare/CompareBar";
import { getHeaderUser } from "@/lib/auth";

// The header reads the auth session cookie, so these routes render dynamically.
export const dynamic = "force-dynamic";

export default async function MarketingLayout({ children }: { children: React.ReactNode }) {
  const user = await getHeaderUser();
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-accent-deep focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to content
      </a>
      <Header user={user} />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
      <CompareBar />
    </div>
  );
}
