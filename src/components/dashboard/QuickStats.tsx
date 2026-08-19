import { CalendarCheck, Flame, TrendingUp } from "lucide-react";

export function QuickStats({
  totalSessions,
  streakDays,
  controlIndex,
}: {
  totalSessions: number;
  streakDays: number;
  controlIndex: number;
}) {
  const stats = [
    { icon: CalendarCheck, label: "Sessions", value: `${totalSessions}` },
    { icon: Flame, label: "Streak", value: `${streakDays} days` },
    { icon: TrendingUp, label: "Control", value: `+${controlIndex}%` },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {stats.map(({ icon: Icon, label, value }) => (
        <div key={label} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-muted-foreground">
            <Icon className="h-3.5 w-3.5 text-gold" />
            {label}
          </div>
          <div className="mt-2 font-serif text-2xl">{value}</div>
        </div>
      ))}
    </div>
  );
}
