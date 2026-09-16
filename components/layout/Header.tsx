"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LayoutDashboard, Menu, Shield, X } from "lucide-react";
import { Logo } from "./Logo";
import { ButtonLink } from "@/components/ui/Button";
import { MAIN_NAV } from "@/lib/constants";
import { cn } from "@/lib/utils";

export type HeaderUser = { displayName: string | null; isAdmin: boolean } | null;

export function Header({ user }: { user: HeaderUser }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="sticky top-0 z-50 border-b border-steel bg-midnight">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-6 lg:flex">
          {MAIN_NAV.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "border-b-2 py-[1.4rem] text-sm font-medium transition-colors",
                  active
                    ? "border-accent text-chrome"
                    : "border-transparent text-silver-dim hover:text-chrome",
                )}
              >
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
                  <Shield aria-hidden="true" className="h-4 w-4" /> Admin
                </ButtonLink>
              )}
              <ButtonLink href="/dashboard" variant="secondary" size="sm">
                <LayoutDashboard aria-hidden="true" className="h-4 w-4" /> Dashboard
              </ButtonLink>
            </>
          ) : (
            <>
              <ButtonLink href="/auth/sign-in" variant="ghost" size="sm">
                Sign in
              </ButtonLink>
              <ButtonLink href="/auth/sign-up" size="sm">
                Create account
              </ButtonLink>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="grid h-10 w-10 place-items-center rounded-md border border-steel text-silver hover:bg-graphite-2 hover:text-chrome lg:hidden"
        >
          {open ? (
            <X aria-hidden="true" className="h-5 w-5" />
          ) : (
            <Menu aria-hidden="true" className="h-5 w-5" />
          )}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Main"
          className="border-t border-steel bg-midnight lg:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col px-5 py-3 sm:px-8">
            {MAIN_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "rounded-md px-3 py-2.5 text-sm font-medium",
                  isActive(item.href)
                    ? "bg-graphite-2 text-chrome"
                    : "text-silver hover:bg-graphite-2 hover:text-chrome",
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2 border-t border-steel pt-3">
              {user ? (
                <>
                  {user.isAdmin && (
                    <ButtonLink href="/admin" variant="outline" size="sm" onClick={close}>
                      <Shield aria-hidden="true" className="h-4 w-4" /> Admin
                    </ButtonLink>
                  )}
                  <ButtonLink href="/dashboard" size="sm" onClick={close}>
                    <LayoutDashboard aria-hidden="true" className="h-4 w-4" /> Dashboard
                  </ButtonLink>
                </>
              ) : (
                <>
                  <ButtonLink href="/auth/sign-in" variant="outline" size="sm" onClick={close}>
                    Sign in
                  </ButtonLink>
                  <ButtonLink href="/auth/sign-up" size="sm" onClick={close}>
                    Create account
                  </ButtonLink>
                </>
              )}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
