import { FileText } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { UploadDocumentForm } from "@/components/dashboard/UploadDocumentForm";
import { DeleteDocumentButton } from "@/components/dashboard/DeleteDocumentButton";
import { requireUser } from "@/lib/auth";
import { getUserDocuments } from "@/lib/dashboard";
import { formatDate, humanizeEnum } from "@/lib/utils";

export const metadata = { title: "Documents" };

export default async function DocumentsPage() {
  const { user } = await requireUser();
  const docs = await getUserDocuments(user.id);

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="font-display text-3xl font-bold tracking-tight text-chrome-gradient">Documents</h1>
        <p className="mt-1 text-silver-dim">Store invoices, titles and import paperwork securely.</p>
      </header>

      <GlassCard chrome className="p-6">
        <UploadDocumentForm />
      </GlassCard>

      {docs.length === 0 ? (
        <GlassCard className="flex flex-col items-center gap-3 px-6 py-14 text-center">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/5 text-silver-dim">
            <FileText className="h-7 w-7" />
          </span>
          <h2 className="font-display text-lg font-semibold text-chrome">No documents yet</h2>
          <p className="text-sm text-silver-dim">Upload your first document above.</p>
        </GlassCard>
      ) : (
        <GlassCard className="divide-y divide-white/5 p-0">
          {docs.map((doc) => (
            <div key={doc.id} className="flex items-center gap-4 px-5 py-3.5">
              <FileText className="h-5 w-5 shrink-0 text-accent" />
              <div className="min-w-0 flex-1">
                <a href={doc.url} target="_blank" rel="noopener noreferrer" className="truncate font-medium text-chrome hover:text-accent">
                  {doc.name}
                </a>
                <p className="text-xs text-silver-dim">
                  {doc.type ? humanizeEnum(doc.type) : "Document"}
                  {doc.importOrder ? ` · ${doc.importOrder.reference}` : ""} · {formatDate(doc.createdAt)}
                </p>
              </div>
              <DeleteDocumentButton id={doc.id} />
            </div>
          ))}
        </GlassCard>
      )}
    </div>
  );
}
