"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Select } from "@/components/ui/Field";
import { SORT_OPTIONS } from "@/lib/constants";

export function SortSelect() {
  const router = useRouter();
  const params = useSearchParams();

  function onChange(value: string) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set("sort", value);
    else next.delete("sort");
    router.push(`/cars?${next.toString()}`);
  }

  return (
    <Select
      aria-label="Sort vehicles"
      className="h-10 w-48"
      value={params.get("sort") ?? "newest"}
      onChange={(e) => onChange(e.target.value)}
    >
      {SORT_OPTIONS.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </Select>
  );
}
