import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { InquiryStatusSelect } from "@/components/admin/InquiryStatusSelect";
import { getAdminInquiries } from "@/lib/admin";
import { formatDate } from "@/lib/utils";

export default async function AdminInquiriesPage() {
  const inquiries = await getAdminInquiries();

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="font-display text-3xl font-bold tracking-tight text-chrome-gradient">Inquiries</h1>
        <p className="mt-1 text-silver-dim">{inquiries.length} total</p>
      </header>

      {inquiries.length === 0 ? (
        <GlassCard className="px-6 py-12 text-center text-silver-dim">No inquiries yet.</GlassCard>
      ) : (
        <div className="flex flex-col gap-3">
          {inquiries.map((inq) => (
            <GlassCard key={inq.id} className="flex flex-col gap-3 p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-medium text-chrome">
                    {inq.name}{" "}
                    <a href={`mailto:${inq.email}`} className="text-sm font-normal text-accent hover:underline">
                      {inq.email}
                    </a>
                    {inq.phone && <span className="text-sm text-silver-dim"> · {inq.phone}</span>}
                  </p>
                  <p className="text-xs text-silver-dim">
                    {inq.vehicle ? (
                      <Link href={`/cars/${inq.vehicle.slug}`} className="hover:text-accent">
                        {inq.vehicle.year} {inq.vehicle.make} {inq.vehicle.model}
                      </Link>
                    ) : (
                      "General inquiry"
                    )}{" "}
                    · {formatDate(inq.createdAt)}
                  </p>
                </div>
                <InquiryStatusSelect id={inq.id} status={inq.status} />
              </div>
              <p className="rounded-xl bg-white/[0.02] p-3 text-sm text-silver">{inq.message}</p>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}
