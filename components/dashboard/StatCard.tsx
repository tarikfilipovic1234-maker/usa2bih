import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";

export function StatCard({
  label,
  value,
  icon,
  href,
}: {
  label: string;
  value: number | string;
  icon: string;
  href?: string;
}) {
  const inner = (
    <Card interactive={!!href} className="flex items-center gap-4 p-5">
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent-bright">
        <Icon name={icon} className="h-6 w-6" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-display text-2xl font-bold text-chrome">{value}</p>
        <p className="truncate text-xs uppercase tracking-wider text-silver-dim">{label}</p>
      </div>
      {href && <ArrowUpRight className="h-4 w-4 shrink-0 text-silver-dim" />}
    </Card>
  );

  return href ? <Link href={href}>{inner}</Link> : inner;
}
