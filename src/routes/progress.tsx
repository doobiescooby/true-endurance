import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/site/AppShell";

export const Route = createFileRoute("/progress")({
  component: ProgressPage,
  head: () => ({ meta: [{ title: "Progress · Stamina Rocket" }] }),
});

const weeks = [
  { w: "Wk 1", control: 20 },
  { w: "Wk 2", control: 34 },
  { w: "Wk 3", control: 45 },
  { w: "Wk 4", control: 58 },
  { w: "Wk 5", control: 66 },
  { w: "Wk 6", control: 72 },
  { w: "Wk 7", control: 78 },
];

const activity = Array.from({ length: 12 * 7 }, (_, i) => (i * 37) % 5);

function ProgressPage() {
  const max = Math.max(...weeks.map((w) => w.control));
  return (
    <AppShell>
      <div className="fade-in-up">
        <p className="text-sm text-muted-foreground">Your journey</p>
        <h1 className="mt-1 text-3xl md:text-4xl">Quiet, compounding progress</h1>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-4">
        {[
          ["Total sessions", "48"],
          ["Practice time", "6h 24m"],
          ["Current streak", "14 days"],
          ["Control index", "+38%"],
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
            <div className="mt-2 font-serif text-3xl">{value}</div>
          </div>
        ))}
      </div>

      {/* chart */}
      <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-soft md:p-8">
        <div className="flex items-baseline justify-between">
          <div>
            <h3 className="font-serif text-xl">Control index</h3>
            <p className="text-sm text-muted-foreground">Last 7 weeks</p>
          </div>
          <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-medium text-gold">+58 pts</span>
        </div>
        <div className="mt-8 flex h-56 items-end gap-3">
          {weeks.map((w) => (
            <div key={w.w} className="flex flex-1 flex-col items-center gap-2">
              <div
                className="w-full rounded-t-lg bg-gradient-to-t from-primary to-primary/70 transition-all"
                style={{ height: `${(w.control / max) * 100}%` }}
              />
              <div className="text-[10px] text-muted-foreground">{w.w}</div>
            </div>
          ))}
        </div>
      </div>

      {/* heatmap */}
      <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-soft md:p-8">
        <h3 className="font-serif text-xl">Practice consistency</h3>
        <p className="text-sm text-muted-foreground">Last 12 weeks</p>
        <div className="mt-6 grid grid-flow-col grid-rows-7 gap-1.5">
          {activity.map((v, i) => (
            <div
              key={i}
              className="h-3.5 w-3.5 rounded-[3px]"
              style={{ backgroundColor: `oklch(${0.94 - v * 0.11} ${0.02 + v * 0.02} ${70 - v * 8})` }}
              title={`Day ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </AppShell>
  );
}
