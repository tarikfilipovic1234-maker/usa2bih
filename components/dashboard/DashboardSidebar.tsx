"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Settings, X } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { SignOutButton } from "@/components/auth/SignOutButton";
import { resolveIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

export type NavItem = { href: string; label: string; icon: string };

export function DashboardSidebar({
  items,
  title,
  displayName,
}: {
  items: readonly NavItem[];
  title: string;
  displayName: string | null;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const nav = (
    <nav className="flex flex-col gap-1">
      {items.map((item) => {
        const active =
          pathname === item.href ||
          (item.href !== "/dashboard" && item.href !== "/admin" && pathname.startsWith(item.href));
        const Icon = resolveIcon(item.icon);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-accent/15 text-accent-bright ring-1 ring-accent/20"
                : "text-silver-dim hover:bg-white/5 hover:text-chrome",
            )}
          >
            <Icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  const footer = (
    <div className="mt-auto flex flex-col gap-1 border-t border-white/5 pt-4">
      <Link
        href="/dashboard/profile"
        className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-silver-dim transition-colors hover:bg-white/5 hover:text-chrome"
      >
        <Settings className="h-4 w-4" /> Account settings
      </Link>
      <SignOutButton className="w-full" />
    </div>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="flex items-center justify-between border-b border-white/5 px-5 py-3 lg:hidden">
        <Logo />
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          className="grid h-10 w-10 place-items-center rounded-lg text-silver hover:bg-white/5"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-b border-white/5 bg-midnight-2/80 p-4 lg:hidden">
          {nav}
          {footer}
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 flex-col gap-6 border-r border-white/5 bg-midnight-2/40 p-5 lg:flex">
        <Logo />
        <div>
          <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-[0.2em] text-silver-dim">
            {title}
          </p>
          {nav}
        </div>
        {footer}
      </aside>
    </>
  );
}
