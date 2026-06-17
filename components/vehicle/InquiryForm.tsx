"use client";

import { useActionState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { submitInquiry, type FormState } from "@/app/actions/inquiries";
import { Input, Label, Textarea } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";

export function InquiryForm({
  vehicleId,
  vehicleName,
}: {
  vehicleId?: string;
  vehicleName?: string;
}) {
  const [state, action, pending] = useActionState<FormState, FormData>(submitInquiry, {});

  if (state.ok) {
    return (
      <div className="flex flex-col items-center gap-3 py-8 text-center">
        <CheckCircle2 className="h-12 w-12 text-positive" />
        <h3 className="font-display text-lg font-semibold text-chrome">Inquiry sent</h3>
        <p className="text-sm text-silver-dim">
          Thanks — our team will get back to you shortly about{" "}
          {vehicleName ? <span className="text-chrome">{vehicleName}</span> : "your request"}.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-4">
      {vehicleId && <input type="hidden" name="vehicleId" value={vehicleId} />}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" required placeholder="Your name" />
          {state.fieldErrors?.name && <p className="mt-1 text-xs text-danger">{state.fieldErrors.name}</p>}
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required placeholder="you@email.com" />
          {state.fieldErrors?.email && <p className="mt-1 text-xs text-danger">{state.fieldErrors.email}</p>}
        </div>
      </div>
      <div>
        <Label htmlFor="phone">Phone (optional)</Label>
        <Input id="phone" name="phone" placeholder="+387 …" />
      </div>
      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          required
          defaultValue={vehicleName ? `I'm interested in the ${vehicleName}. Please send me more details.` : ""}
        />
        {state.fieldErrors?.message && <p className="mt-1 text-xs text-danger">{state.fieldErrors.message}</p>}
      </div>
      {state.error && <p className="text-sm text-danger">{state.error}</p>}
      <Button type="submit" disabled={pending} className="w-full">
        <Send className="h-4 w-4" /> {pending ? "Sending…" : "Send inquiry"}
      </Button>
    </form>
  );
}
