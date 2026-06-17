"use client";

import { useActionState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { submitContact, type ContactState } from "@/app/actions/contact";
import { Input, Label, Textarea } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [state, action, pending] = useActionState<ContactState, FormData>(submitContact, {});

  if (state.ok) {
    return (
      <div className="flex flex-col items-center gap-3 py-12 text-center">
        <CheckCircle2 className="h-12 w-12 text-positive" />
        <h3 className="font-display text-xl font-semibold text-chrome">Message sent</h3>
        <p className="text-sm text-silver-dim">Thanks for reaching out — we&apos;ll reply soon.</p>
      </div>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-4">
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
        <Label htmlFor="subject">Subject</Label>
        <Input id="subject" name="subject" required placeholder="How can we help?" />
        {state.fieldErrors?.subject && <p className="mt-1 text-xs text-danger">{state.fieldErrors.subject}</p>}
      </div>
      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" name="message" required placeholder="Tell us about the car you're after…" />
        {state.fieldErrors?.message && <p className="mt-1 text-xs text-danger">{state.fieldErrors.message}</p>}
      </div>
      {state.error && <p className="text-sm text-danger">{state.error}</p>}
      <Button type="submit" disabled={pending} className="w-full sm:w-auto">
        <Send className="h-4 w-4" /> {pending ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
