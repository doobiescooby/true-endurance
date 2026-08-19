import { Flame } from "lucide-react";

export function StreakCard({ days }: { days: number }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-border bg-card px-6 py-5 shadow-soft">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gold/15">
        <Flame className="h-5 w-5 text-gold" />
      </span>
      <div>
        <div className="font-serif text-2xl leading-none">
          {days} <span className="text-base text-muted-foreground">days</span>
        </div>
        <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">Streak</p>
      </div>
    </div>
  );
}
