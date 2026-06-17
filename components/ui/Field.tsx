import { cn } from "@/lib/utils";
import type { ComponentProps, ReactNode } from "react";

const fieldBase =
  "w-full rounded-xl bg-midnight-2/80 border border-steel px-4 text-sm text-chrome placeholder:text-silver-dim/60 transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/40";

export function Label({ className, ...props }: ComponentProps<"label">) {
  return (
    <label
      className={cn("mb-1.5 block text-xs font-medium uppercase tracking-wider text-silver-dim", className)}
      {...props}
    />
  );
}

export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input className={cn(fieldBase, "h-11", className)} {...props} />;
}

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return <textarea className={cn(fieldBase, "py-3 min-h-28 resize-y", className)} {...props} />;
}

export function Select({ className, children, ...props }: ComponentProps<"select">) {
  return (
    <select
      className={cn(fieldBase, "h-11 appearance-none bg-[length:1rem] pr-9", className)}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%238a94a6' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 0.75rem center",
      }}
      {...props}
    >
      {children}
    </select>
  );
}

export function FormField({
  label,
  htmlFor,
  hint,
  children,
}: {
  label?: string;
  htmlFor?: string;
  hint?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div>
      {label && <Label htmlFor={htmlFor}>{label}</Label>}
      {children}
      {hint && <p className="mt-1 text-xs text-silver-dim/70">{hint}</p>}
    </div>
  );
}
