import { Check } from "lucide-react";
import type { TrainingSession } from "@/data/sessions";

export function DayWorkoutDetails({ date, session }: { date: Date; session: TrainingSession | null }) {
  const label = date.toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" });

  return (
    <div className="fade-in rounded-2xl border border-border bg-card p-6 shadow-soft">
      <p className="text-sm text-muted-foreground">{label}</p>

      {session?.completed ? (
        <>
          <div className="mt-2 flex items-center gap-2 text-sm text-primary">
            <Check className="h-4 w-4" /> Completed
          </div>
          <h3 className="mt-3 font-serif text-xl">{session.title}</h3>
          <p className="text-sm text-muted-foreground">{session.durationMinutes} minutes</p>

          <ul className="mt-5 space-y-2 text-sm">
            {session.exercises.map((ex) => (
              <li
                key={ex.order}
                className="flex items-center justify-between border-b border-border pb-2 last:border-0"
              >
                <span className="flex items-center gap-3">
                  <span className="text-xs text-gold">{ex.order}</span>
                  {ex.name}
                </span>
                <span className="text-xs text-muted-foreground">{ex.minutes} min</span>
              </li>
            ))}
          </ul>

          {session.reflection && (
            <div className="mt-5 rounded-xl bg-secondary/50 p-4">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Reflection</p>
              <p className="mt-2 font-serif text-base leading-relaxed">“{session.reflection}”</p>
            </div>
          )}
        </>
      ) : (
        <p className="mt-3 text-sm text-muted-foreground">No session completed.</p>
      )}
    </div>
  );
}
