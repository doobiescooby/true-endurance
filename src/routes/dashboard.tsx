import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/site/AppShell";
import { Flame, Clock, TrendingUp, Play } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
  head: () => ({ meta: [{ title: "Dashboard · Stamina Rocket" }] }),
});

function Dashboard() {
  return (
    <AppShell>
      <div className="fade-in-up">
        <p className="text-sm text-muted-foreground">Good evening</p>
        <h1 className="mt-1 text-3xl md:text-4xl">Ready for tonight's session?</h1>
      </div>

      {/* Today card */}
      <div className="fade-in-up mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Flame className="h-4 w-4 text-gold" /> Streak
          </div>
          <div className="mt-3 font-serif text-4xl">14 <span className="text-lg text-muted-foreground">days</span></div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Clock className="h-4 w-4 text-gold" /> This week
          </div>
          <div className="mt-3 font-serif text-4xl">42 <span className="text-lg text-muted-foreground">min</span></div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <TrendingUp className="h-4 w-4 text-gold" /> Control index
          </div>
          <div className="mt-3 font-serif text-4xl">+38%</div>
        </div>
      </div>

      {/* Session hero */}
      <div className="mt-6 overflow-hidden rounded-3xl bg-primary text-primary-foreground shadow-elevated">
        <div className="grid gap-8 p-8 md:grid-cols-[1.4fr_1fr] md:p-12">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-gold">Day 15 · Focus</p>
            <h2 className="mt-3 text-3xl md:text-4xl">Breath &amp; awareness</h2>
            <p className="mt-3 max-w-md text-primary-foreground/80">
              Tonight's practice builds on your growing awareness with a calming coherence
              breath and a short pelvic-floor sequence.
            </p>
            <Link
              to="/training"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-medium text-gold-foreground hover:brightness-105"
            >
              <Play className="h-4 w-4" fill="currentColor" />
              Begin 8-minute session
            </Link>
          </div>
          <div className="hidden rounded-2xl bg-primary-foreground/8 p-6 md:block">
            <p className="text-xs uppercase tracking-wider text-primary-foreground/70">Session plan</p>
            <ul className="mt-4 space-y-3 text-sm">
              {[
                ["01", "Grounding breath", "2 min"],
                ["02", "Coherence breath", "3 min"],
                ["03", "Pelvic-floor set", "2 min"],
                ["04", "Reflection", "1 min"],
              ].map(([n, t, d]) => (
                <li key={n} className="flex items-center justify-between border-b border-primary-foreground/10 pb-3 last:border-0">
                  <span className="flex items-center gap-3">
                    <span className="text-xs text-gold">{n}</span>
                    {t}
                  </span>
                  <span className="text-xs text-primary-foreground/70">{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Recent */}
      <h3 className="mt-12 text-lg font-semibold">This week</h3>
      <div className="mt-4 grid gap-3">
        {[
          ["Mon", "Coherence breath", "8 min"],
          ["Tue", "Pelvic-floor progression", "9 min"],
          ["Wed", "Awareness practice", "8 min"],
          ["Thu", "Stamina interval", "10 min"],
        ].map(([d, t, m]) => (
          <div key={d} className="flex items-center justify-between rounded-2xl border border-border bg-card p-5 shadow-soft">
            <div className="flex items-center gap-4">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/8 font-serif text-sm text-primary">{d}</div>
              <div>
                <div className="text-sm font-medium">{t}</div>
                <div className="text-xs text-muted-foreground">Completed</div>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">{m}</div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
