import { createElement } from "react";
import { resolveIcon } from "@/lib/icons";

/**
 * Renders a Lucide glyph from a stored icon-name string (nav config, guide
 * content). Uses createElement so the resolved component is never bound to a
 * capitalised local, which keeps the icon identity stable across renders.
 */
export function Icon({ name, className }: { name?: string | null; className?: string }) {
  return createElement(resolveIcon(name), { className, "aria-hidden": true });
}
