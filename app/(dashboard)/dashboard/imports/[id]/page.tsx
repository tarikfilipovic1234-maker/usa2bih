import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, FileText } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { ImportStageTracker } from "@/components/dashboard/ImportStageTracker";
import { requireUser } from "@/lib/auth";
import { getImportOrder } from "@/lib/dashboard";
import { formatDate, humanizeEnum } from "@/lib/utils";

export const metadata = { title: "Import Details" };

export default async function ImportDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { user } = await requireUser();
  const imp = await getImportOrder(user.id, id);
  if (!imp) notFound();

  const img = imp.vehicle?.images[0];
  const name = imp.vehicle
    ? `${imp.vehicle.year} ${imp.vehicle.make} ${imp.vehicle.model}`
    : imp.reference;

  return (
    <div className="flex flex-col gap-6">
      <Link href="/dashboard/imports" className="inline-flex items-center gap-1.5 text-sm text-silver-dim hover:text-accent">
        <ChevronLeft className="h-4 w-4" /> Back to imports
      </Link>

      <GlassCard chrome className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center">
        <div className="relative h-28 w-full overflow-hidden rounded-xl bg-graphite sm:h-24 sm:w-40">
          {img && <Image src={img.url} alt="" fill sizes="160px" className="object-cover" />}
        </div>
        <div className="flex-1">
          <p className="font-mono text-xs text-silver-dim">{imp.reference}</p>
          <h1 className="font-display text-2xl font-bold text-chrome">{name}</h1>
          <Badge tone={imp.currentStage === "COMPLETED" ? "positive" : "accent"} className="mt-2">
            {humanizeEnum(imp.currentStage)}
          </Badge>
        </div>
      </GlassCard>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
        <GlassCard className="p-6">
          <h2 className="mb-5 font-display text-lg font-semibold text-chrome">Progress</h2>
          <ImportStageTracker currentStage={imp.currentStage} orientation="vertical" />
        </GlassCard>

        <div className="flex flex-col gap-6">
          <GlassCard className="p-6">
            <h2 className="mb-4 font-display text-lg font-semibold text-chrome">Timeline</h2>
            {imp.events.length === 0 ? (
              <p className="text-sm text-silver-dim">No updates logged yet.</p>
            ) : (
              <ul className="flex flex-col gap-4">
                {imp.events.map((ev) => (
                  <li key={ev.id} className="flex gap-3">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
                    <div>
                      <p className="text-sm font-medium text-chrome">{humanizeEnum(ev.stage)}</p>
                      {ev.note && <p className="text-sm text-silver-dim">{ev.note}</p>}
                      <p className="text-xs text-silver-dim">{formatDate(ev.occurredAt)}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </GlassCard>

          <GlassCard className="p-6">
            <h2 className="mb-4 font-display text-lg font-semibold text-chrome">Documents</h2>
            {imp.documents.length === 0 ? (
              <p className="text-sm text-silver-dim">No documents attached to this import yet.</p>
            ) : (
              <ul className="flex flex-col gap-2">
                {imp.documents.map((doc) => (
                  <li key={doc.id}>
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-lg border border-white/5 px-3 py-2.5 text-sm text-silver transition-colors hover:border-accent/30 hover:text-chrome"
                    >
                      <FileText className="h-4 w-4 text-accent" /> {doc.name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </GlassCard>

          {imp.notes && (
            <GlassCard className="p-6">
              <h2 className="mb-2 font-display text-lg font-semibold text-chrome">Notes</h2>
              <p className="text-sm leading-relaxed text-silver-dim">{imp.notes}</p>
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  );
}
