import { Check } from "lucide-react";
import { IMPORT_STAGES, type ImportStageKey } from "@/lib/constants";
import { cn } from "@/lib/utils";

/** Visual progress tracker through the import stages. */
export function ImportStageTracker({
  currentStage,
  orientation = "horizontal",
}: {
  currentStage: ImportStageKey;
  orientation?: "horizontal" | "vertical";
}) {
  const currentIndex = IMPORT_STAGES.findIndex((s) => s.key === currentStage);

  if (orientation === "vertical") {
    return (
      <ol className="relative flex flex-col gap-5">
        <span className="absolute bottom-3 left-[15px] top-3 w-px bg-steel-2" />
        {IMPORT_STAGES.map((stage, i) => {
          const done = i < currentIndex;
          const active = i === currentIndex;
          return (
            <li key={stage.key} className="relative flex items-center gap-4">
              <span
                className={cn(
                  "relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full ring-4 ring-midnight transition-colors",
                  done && "bg-positive text-midnight",
                  active && "bg-accent text-midnight animate-pulse-glow",
                  !done && !active && "bg-graphite-2 text-silver-dim",
                )}
              >
                {done ? <Check className="h-4 w-4" /> : <span className="text-xs font-bold">{i + 1}</span>}
              </span>
              <span
                className={cn(
                  "text-sm font-medium",
                  active ? "text-chrome" : done ? "text-silver" : "text-silver-dim",
                )}
              >
                {stage.label}
              </span>
            </li>
          );
        })}
      </ol>
    );
  }

  return (
    <div className="flex items-center">
      {IMPORT_STAGES.map((stage, i) => {
        const done = i < currentIndex;
        const active = i === currentIndex;
        return (
          <div key={stage.key} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-2">
              <span
                className={cn(
                  "grid h-9 w-9 place-items-center rounded-full transition-colors",
                  done && "bg-positive text-midnight",
                  active && "bg-accent text-midnight animate-pulse-glow",
                  !done && !active && "bg-graphite-2 text-silver-dim",
                )}
              >
                {done ? <Check className="h-4 w-4" /> : <span className="text-xs font-bold">{i + 1}</span>}
              </span>
              <span
                className={cn(
                  "hidden max-w-20 text-center text-[10px] leading-tight sm:block",
                  active ? "text-chrome" : "text-silver-dim",
                )}
              >
                {stage.label}
              </span>
            </div>
            {i < IMPORT_STAGES.length - 1 && (
              <span className={cn("mx-1 h-px flex-1", i < currentIndex ? "bg-positive" : "bg-steel-2")} />
            )}
          </div>
        );
      })}
    </div>
  );
}
