import Link from "next/link";
import { MessageSquare } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { requireUser } from "@/lib/auth";
import { getUserInquiries } from "@/lib/dashboard";
import { formatDate, humanizeEnum } from "@/lib/utils";

export const metadata = { title: "Inquiries" };

const statusTone = { NEW: "accent", IN_PROGRESS: "warning", CLOSED: "default" } as const;

export default async function InquiriesPage() {
  const { user } = await requireUser();
  const inquiries = await getUserInquiries(user.id);

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="font-display text-3xl font-bold tracking-tight text-chrome-gradient">Inquiries</h1>
        <p className="mt-1 text-silver-dim">Track conversations about vehicles you&apos;re interested in.</p>
      </header>

      {inquiries.length === 0 ? (
        <GlassCard className="flex flex-col items-center gap-4 px-6 py-16 text-center">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/5 text-silver-dim">
            <MessageSquare className="h-7 w-7" />
          </span>
          <h2 className="font-display text-lg font-semibold text-chrome">No inquiries yet</h2>
          <ButtonLink href="/cars">Browse cars</ButtonLink>
        </GlassCard>
      ) : (
        <div className="flex flex-col gap-3">
          {inquiries.map((inq) => (
            <GlassCard key={inq.id} className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <div className="flex items-center gap-3">
                  <h3 className="font-medium text-chrome">
                    {inq.vehicle ? (
                      <Link href={`/cars/${inq.vehicle.slug}`} className="hover:text-accent">
                        {inq.vehicle.year} {inq.vehicle.make} {inq.vehicle.model}
                      </Link>
                    ) : (
                      "General inquiry"
                    )}
                  </h3>
                  <Badge tone={statusTone[inq.status]}>{humanizeEnum(inq.status)}</Badge>
                </div>
                <p className="mt-1 line-clamp-2 text-sm text-silver-dim">{inq.message}</p>
              </div>
              <span className="shrink-0 text-xs text-silver-dim">{formatDate(inq.createdAt)}</span>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}
