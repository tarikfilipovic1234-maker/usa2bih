"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LayoutDashboard, Menu, Shield, X } from "lucide-react";
import { Logo } from "./Logo";
import { ButtonLink } from "@/components/ui/Button";
import { MAIN_NAV } from "@/lib/constants";
import { cn } from "@/lib/utils";

export type HeaderUser = { displayName: string | null; isAdmin: boolean } | null;

export function Header({ user }: { user: HeaderUser }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled ? "border-b border-white/5 bg-midnight/70 backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          {MAIN_NAV.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  active ? "text-chrome" : "text-silver-dim hover:text-chrome",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-white/5 ring-1 ring-white/10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          {user ? (
            <>
              {user.isAdmin && (
                <ButtonLink href="/admin" variant="ghost" size="sm">
                  <Shield className="h-4 w-4" /> Admin
                </ButtonLink>
              )}
              <ButtonLink href="/dashboard" variant="secondary" size="sm">
                <LayoutDashboard className="h-4 w-4" /> Dashboard
              </ButtonLink>
            </>
          ) : (
            <>
              <ButtonLink href="/auth/sign-in" variant="ghost" size="sm">
                Sign in
              </ButtonLink>
              <ButtonLink href="/auth/sign-up" variant="primary" size="sm">
                Get started
              </ButtonLink>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="grid h-10 w-10 place-items-center rounded-lg text-silver hover:bg-white/5 lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-white/5 bg-midnight/95 backdrop-blur-xl lg:hidden"
          >
            <nav className="flex flex-col gap-1 px-5 py-4">
              {MAIN_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-silver hover:bg-white/5 hover:text-chrome"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-3 flex flex-col gap-2 border-t border-white/5 pt-4">
                {user ? (
                  <>
                    {user.isAdmin && (
                      <ButtonLink href="/admin" variant="outline" size="sm">
                        <Shield className="h-4 w-4" /> Admin panel
                      </ButtonLink>
                    )}
                    <ButtonLink href="/dashboard" variant="primary" size="sm">
                      <LayoutDashboard className="h-4 w-4" /> Dashboard
                    </ButtonLink>
                  </>
                ) : (
                  <>
                    <ButtonLink href="/auth/sign-in" variant="outline" size="sm">
                      Sign in
                    </ButtonLink>
                    <ButtonLink href="/auth/sign-up" variant="primary" size="sm">
                      Get started
                    </ButtonLink>
                  </>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
