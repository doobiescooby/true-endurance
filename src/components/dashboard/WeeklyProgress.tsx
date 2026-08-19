import { useEffect, useState } from "react";

export function WeeklyProgress({ completed, target }: { completed: number; target: number }) {
  const pct = target > 0 ? Math.min(100, Math.round((completed / target) * 100)) : 0;
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const t = window.setTimeout(() => setWidth(pct), 60);
    return () => window.clearTimeout(t);
  }, [pct]);

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-sm font-semibold">This week's progress</h3>
        <p className="text-sm text-muted-foreground">
          {completed} of {target} sessions completed
        </p>
      </div>
      <div
        className="mt-4 h-2 w-full overflow-hidden rounded-full bg-secondary"
        role="progressbar"
        aria-valuenow={completed}
        aria-valuemin={0}
        aria-valuemax={target}
      >
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-700 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}
