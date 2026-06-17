import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/motion/PageTransition";
import { CompareBar } from "@/components/compare/CompareBar";
import { getHeaderUser } from "@/lib/auth";

export default async function MarketingLayout({ children }: { children: React.ReactNode }) {
  const user = await getHeaderUser();
  return (
    <div className="flex min-h-dvh flex-col">
      <Header user={user} />
      <main className="flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <CompareBar />
    </div>
  );
}
