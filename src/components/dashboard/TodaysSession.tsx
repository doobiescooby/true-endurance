import { Link } from "@tanstack/react-router";
import { Play } from "lucide-react";
import type { SessionExercise } from "@/data/sessions";

export function TodaysSession({
  programmeDay,
  focus,
  title,
  description,
  durationMinutes,
  exercises,
}: {
  programmeDay: number;
  focus: string;
  title: string;
  description: string;
  durationMinutes: number;
  exercises: SessionExercise[];
}) {
  return (
    <section className="overflow-hidden rounded-3xl bg-primary text-primary-foreground shadow-elevated">
      <div className="grid gap-8 p-8 md:grid-cols-[1.4fr_1fr] md:p-12">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-gold">
            Day {programmeDay} · {focus}
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl">{title}</h2>
          <p className="mt-3 max-w-md text-primary-foreground/80">{description}</p>
          <Link
            to="/training"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-medium text-gold-foreground transition-[filter,transform] duration-300 hover:brightness-105"
          >
            <Play className="h-4 w-4" fill="currentColor" />
            Begin {durationMinutes}-minute session
          </Link>
        </div>
        <div className="hidden rounded-2xl bg-primary-foreground/8 p-6 md:block">
          <p className="text-xs uppercase tracking-wider text-primary-foreground/70">Session plan</p>
          <ul className="mt-4 space-y-3 text-sm">
            {exercises.map((ex) => (
              <li
                key={ex.order}
                className="flex items-center justify-between border-b border-primary-foreground/10 pb-3 last:border-0"
              >
                <span className="flex items-center gap-3">
                  <span className="text-xs text-gold">{ex.order}</span>
                  {ex.name}
                </span>
                <span className="text-xs text-primary-foreground/70">{ex.minutes} min</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
