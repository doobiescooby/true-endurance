import { Check } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import logo from "@/assets/Copy of Stamina Rocket Brand Logo 2.svg";

export function OnboardingShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="px-6 pt-6 md:px-10">
        <Link to="/" className="inline-flex items-center gap-2">
          <img src={logo} alt="Stamina Rocket" className="h-8 w-8 object-contain" />
          <span className="font-serif text-lg">Stamina Rocket</span>
        </Link>
      </header>
      <main className="flex flex-1 flex-col px-6 pb-10 pt-6 md:px-10">
        <div className="mx-auto flex w-full max-w-xl flex-1 flex-col">{children}</div>
      </main>
    </div>
  );
}

export function ProgressIndicator({ current, total }: { current: number; total: number }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>
          Question {current} of {total}
        </span>
        <span>{pct}%</span>
      </div>
      <div
        className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted"
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-label="Onboarding progress"
      >
        <div
          className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export function OptionButton({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`flex w-full items-center justify-between gap-4 rounded-2xl border px-5 py-4 text-left text-base transition-all hover:-translate-y-0.5 hover:shadow-soft ${
        selected
          ? "border-primary bg-primary/8 text-foreground"
          : "border-border bg-card text-foreground"
      }`}
    >
      <span>{label}</span>
      <span
        className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border transition-colors ${
          selected ? "border-primary bg-primary text-primary-foreground" : "border-border"
        }`}
      >
        {selected ? <Check className="h-3.5 w-3.5" /> : null}
      </span>
    </button>
  );
}

export function QuestionScreen({
  title,
  hint,
  options,
  value,
  onSelect,
}: {
  title: string;
  hint?: string;
  options: string[];
  value?: string;
  onSelect: (option: string) => void;
}) {
  return (
    <div className="fade-in-up">
      <h1 className="text-2xl leading-snug md:text-3xl">{title}</h1>
      {hint ? <p className="mt-2 text-sm text-muted-foreground">{hint}</p> : null}
      <div className="mt-8 grid gap-3">
        {options.map((option) => (
          <OptionButton
            key={option}
            label={option}
            selected={value === option}
            onClick={() => onSelect(option)}
          />
        ))}
      </div>
    </div>
  );
}

export function ChecklistItem({ label, done }: { label: string; done: boolean }) {
  return (
    <li
      className={`flex items-center gap-3 text-sm transition-all duration-500 ${
        done ? "text-foreground opacity-100" : "text-muted-foreground opacity-40"
      }`}
    >
      <span
        className={`grid h-6 w-6 place-items-center rounded-full border transition-colors ${
          done ? "border-primary bg-primary text-primary-foreground" : "border-border"
        }`}
      >
        {done ? <Check className="h-3.5 w-3.5" /> : null}
      </span>
      {label}
    </li>
  );
}
