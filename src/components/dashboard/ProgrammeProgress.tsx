import { Check } from "lucide-react";
import type { ProgrammeStage } from "@/data/sessions";
import { cn } from "@/lib/utils";

export function ProgrammeProgress({ stages }: { stages: ProgrammeStage[] }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
      <h3 className="text-sm font-semibold">Programme</h3>
      <ol className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-4">
        {stages.map((stage, i) => (
          <li key={stage.id} className="flex items-center gap-3">
            <span
              className={cn(
                "flex items-center gap-2 rounded-full px-3 py-1.5 text-sm transition-colors duration-300",
                stage.status === "complete" && "bg-primary/8 text-primary",
                stage.status === "current" && "bg-gold/15 text-foreground",
                stage.status === "upcoming" && "text-muted-foreground/70",
              )}
            >
              {stage.status === "complete" ? (
                <Check className="h-3.5 w-3.5" />
              ) : (
                <span
                  className={cn(
                    "h-2 w-2 rounded-full",
                    stage.status === "current" ? "bg-gold" : "border border-border bg-transparent",
                  )}
                />
              )}
              {stage.label}
            </span>
            {i < stages.length - 1 && (
              <span aria-hidden className="hidden h-px w-5 bg-border sm:block" />
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
