import { Check } from "lucide-react";
import { toISODate, type TrainingSession } from "@/data/sessions";
import { cn } from "@/lib/utils";

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function WeeklyTrainingCalendar({
  week,
  sessions,
  todayISO,
  selected,
  onSelect,
}: {
  week: Date[];
  sessions: TrainingSession[];
  todayISO: string;
  selected: string | null;
  onSelect: (iso: string) => void;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-3 shadow-soft sm:p-4">
      <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
        {week.map((day, i) => {
          const iso = toISODate(day);
          const done = sessions.some((s) => s.date === iso && s.completed);
          const isToday = iso === todayISO;
          const isFuture = iso > todayISO;
          const isSelected = selected === iso;

          return (
            <button
              key={iso}
              type="button"
              onClick={() => onSelect(iso)}
              aria-pressed={isSelected}
              aria-label={`${DAY_LABELS[i]} ${day.getDate()}${done ? ", completed" : ""}`}
              className={cn(
                "flex min-h-[74px] flex-col items-center justify-center gap-1 rounded-xl border px-1 py-3 transition-all duration-300",
                "border-transparent",
                done && "bg-primary/8 text-primary",
                isToday && "border-gold bg-gold/10",
                isFuture && !isToday && "text-muted-foreground/60",
                !done && !isToday && !isFuture && "text-muted-foreground",
                isSelected && "ring-2 ring-primary/25",
                "hover:bg-accent/60",
              )}
            >
              <span className="text-[10px] font-medium uppercase tracking-[0.12em] sm:text-[11px]">
                {DAY_LABELS[i]}
              </span>
              <span className={cn("font-serif text-lg sm:text-xl", isToday && "text-foreground")}>
                {day.getDate()}
              </span>
              <span className="grid h-4 place-items-center">
                {done ? (
                  <Check className="h-3.5 w-3.5 text-primary transition-opacity duration-300" />
                ) : isToday ? (
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                ) : (
                  <span className="h-1.5 w-1.5 rounded-full bg-border" />
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
