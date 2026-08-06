import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AppShell } from "@/components/site/AppShell";
import { Pause, Play, X } from "lucide-react";

const steps = [
  { name: "Grounding breath", seconds: 120, guide: "Inhale 4 · Hold 4 · Exhale 6" },
  { name: "Coherence breath", seconds: 180, guide: "Inhale 5 · Exhale 5, softly" },
  { name: "Pelvic-floor set", seconds: 120, guide: "Contract 3s · Release 5s" },
  { name: "Reflection", seconds: 60, guide: "Notice one calm sensation" },
];

export const Route = createFileRoute("/training")({
  component: Training,
  head: () => ({ meta: [{ title: "Today's session · Stamina Rocket" }] }),
});

function Training() {
  const navigate = useNavigate();
  const [stepIndex, setStepIndex] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [playing, setPlaying] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const step = steps[stepIndex];
  const totalElapsed = steps.slice(0, stepIndex).reduce((a, s) => a + s.seconds, 0) + elapsed;
  const totalDuration = steps.reduce((a, s) => a + s.seconds, 0);
  const overallPct = (totalElapsed / totalDuration) * 100;

  useEffect(() => {
    if (!playing) return;
    intervalRef.current = setInterval(() => {
      setElapsed((e) => e + 1);
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [playing, stepIndex]);

  useEffect(() => {
    if (elapsed >= step.seconds) {
      if (stepIndex < steps.length - 1) {
        setStepIndex((i) => i + 1);
        setElapsed(0);
      } else {
        setPlaying(false);
      }
    }
  }, [elapsed, stepIndex, step.seconds]);

  const complete = !playing && stepIndex === steps.length - 1 && elapsed >= step.seconds;

  return (
    <AppShell>
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-gold">Day 15 · Focus</p>
            <h1 className="mt-2 text-3xl md:text-4xl">Breath &amp; awareness</h1>
          </div>
          <button
            onClick={() => navigate({ to: "/dashboard" })}
            className="grid h-10 w-10 place-items-center rounded-full border border-border hover:bg-accent"
            aria-label="Exit"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Overall progress */}
        <div className="mt-6 h-1 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${overallPct}%` }}
          />
        </div>

        {complete ? (
          <div className="mt-16 text-center fade-in-up">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gold/20 text-gold">
              ✓
            </div>
            <h2 className="mt-6 text-3xl">Session complete.</h2>
            <p className="mt-3 text-muted-foreground">Quiet, meaningful progress. Well done.</p>
            <button
              onClick={() => navigate({ to: "/dashboard" })}
              className="mt-8 rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground shadow-soft"
            >
              Back to dashboard
            </button>
          </div>
        ) : (
          <>
            {/* Breathing orb */}
            <div className="mt-16 flex justify-center">
              <div className="relative grid h-64 w-64 place-items-center">
                <div
                  className={`absolute inset-0 rounded-full bg-primary/10 ${playing ? "breath" : ""}`}
                  style={{ animation: playing ? "breath 10s ease-in-out infinite" : "none" }}
                />
                <div className="relative text-center">
                  <div className="font-serif text-5xl text-primary">
                    {formatTime(step.seconds - elapsed)}
                  </div>
                  <div className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">
                    {step.name}
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-10 text-center font-serif text-xl italic text-foreground/80">
              {step.guide}
            </p>

            <div className="mt-10 flex justify-center">
              <button
                onClick={() => setPlaying((p) => !p)}
                className="grid h-16 w-16 place-items-center rounded-full bg-primary text-primary-foreground shadow-elevated transition-transform hover:scale-105"
                aria-label={playing ? "Pause" : "Play"}
              >
                {playing ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" fill="currentColor" />}
              </button>
            </div>

            {/* Step dots */}
            <div className="mt-10 flex justify-center gap-2">
              {steps.map((s, i) => (
                <div
                  key={s.name}
                  className={`h-1.5 w-8 rounded-full ${
                    i < stepIndex ? "bg-primary" : i === stepIndex ? "bg-gold" : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes breath {
          0%, 100% { transform: scale(0.85); }
          50% { transform: scale(1.05); }
        }
      `}</style>
    </AppShell>
  );
}

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${r.toString().padStart(2, "0")}`;
}
