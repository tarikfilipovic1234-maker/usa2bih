"use client";

import { useActionState } from "react";
import { Check, Save } from "lucide-react";
import { updateGuideSection, type AdminFormState } from "@/app/actions/admin";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Input, Label, Textarea } from "@/components/ui/Field";

export function GuideSectionEditor({
  id,
  order,
  title,
  body,
}: {
  id: string;
  order: number;
  title: string;
  body: string;
}) {
  const [state, action, pending] = useActionState<AdminFormState, FormData>(
    updateGuideSection.bind(null, id),
    {},
  );

  return (
    <GlassCard className="p-5">
      <form action={action} className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent/15 text-sm font-bold text-accent-bright">
            {order}
          </span>
          <div className="flex-1">
            <Label htmlFor={`title-${id}`} className="sr-only">
              Title
            </Label>
            <Input id={`title-${id}`} name="title" defaultValue={title} required />
          </div>
        </div>
        <div>
          <Label htmlFor={`body-${id}`} className="sr-only">
            Body
          </Label>
          <Textarea id={`body-${id}`} name="body" defaultValue={body} required />
        </div>
        <div className="flex items-center justify-end gap-3">
          {state.error && <p className="text-sm text-danger">{state.error}</p>}
          {state.ok && (
            <span className="flex items-center gap-1 text-sm text-positive">
              <Check className="h-4 w-4" /> Saved
            </span>
          )}
          <Button type="submit" size="sm" disabled={pending}>
            <Save className="h-4 w-4" /> {pending ? "Saving…" : "Save"}
          </Button>
        </div>
      </form>
    </GlassCard>
  );
}
