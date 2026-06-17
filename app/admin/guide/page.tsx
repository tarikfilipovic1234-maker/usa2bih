import { GlassCard } from "@/components/ui/GlassCard";
import { GuideSectionEditor } from "@/components/admin/GuideSectionEditor";
import { getAdminGuide } from "@/lib/admin";

export default async function AdminGuidePage() {
  const sections = await getAdminGuide();

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="font-display text-3xl font-bold tracking-tight text-chrome-gradient">Guide Content</h1>
        <p className="mt-1 text-silver-dim">Edit the steps shown on the public import guide.</p>
      </header>

      {sections.length === 0 ? (
        <GlassCard className="px-6 py-12 text-center text-silver-dim">
          No guide sections found. Run the database seed to create them.
        </GlassCard>
      ) : (
        <div className="flex flex-col gap-4">
          {sections.map((s) => (
            <GuideSectionEditor key={s.id} id={s.id} order={s.order} title={s.title} body={s.body} />
          ))}
        </div>
      )}
    </div>
  );
}
