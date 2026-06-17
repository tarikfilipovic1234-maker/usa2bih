"use client";

import { useActionState } from "react";
import { Check, Save } from "lucide-react";
import { updateProfile, type ProfileState } from "@/app/actions/profile";
import { Input, Label, Select } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";

export function ProfileForm({
  defaults,
  email,
}: {
  defaults: { name: string; phone: string; locale: string };
  email: string;
}) {
  const [state, action, pending] = useActionState<ProfileState, FormData>(updateProfile, {});

  return (
    <form action={action} className="flex flex-col gap-5">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" value={email} disabled className="opacity-60" />
        <p className="mt-1 text-xs text-silver-dim/70">Managed by your account — change it in account settings.</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Full name</Label>
          <Input id="name" name="name" defaultValue={defaults.name} placeholder="Your name" />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" defaultValue={defaults.phone} placeholder="+387 …" />
        </div>
      </div>
      <div className="sm:w-48">
        <Label htmlFor="locale">Preferred language</Label>
        <Select id="locale" name="locale" defaultValue={defaults.locale}>
          <option value="bs">Bosnian</option>
          <option value="en">English</option>
        </Select>
      </div>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={pending}>
          {state.ok ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
          {state.ok ? "Saved" : pending ? "Saving…" : "Save changes"}
        </Button>
        {state.error && <p className="text-sm text-danger">{state.error}</p>}
      </div>
    </form>
  );
}
