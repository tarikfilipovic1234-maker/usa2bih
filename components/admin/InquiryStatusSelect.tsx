"use client";

import { useTransition } from "react";
import { updateInquiryStatus } from "@/app/actions/admin";
import { INQUIRY_STATUSES } from "@/lib/constants";
import { humanizeEnum } from "@/lib/utils";

export function InquiryStatusSelect({ id, status }: { id: string; status: string }) {
  const [pending, startTransition] = useTransition();
  return (
    <select
      defaultValue={status}
      disabled={pending}
      onChange={(e) => startTransition(async () => void (await updateInquiryStatus(id, e.target.value)))}
      aria-label="Inquiry status"
      className="h-8 rounded-lg border border-steel bg-midnight-2 px-2 text-xs text-silver focus:border-accent focus:outline-none"
    >
      {INQUIRY_STATUSES.map((s) => (
        <option key={s} value={s}>
          {humanizeEnum(s)}
        </option>
      ))}
    </select>
  );
}
