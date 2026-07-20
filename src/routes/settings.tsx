import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/site/AppShell";
import { useState } from "react";

export const Route = createFileRoute("/settings")({
  component: SettingsPage,
  head: () => ({ meta: [{ title: "Settings · Apex" }] }),
});

function Toggle({ label, description, defaultOn }: { label: string; description: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(!!defaultOn);
  return (
    <div className="flex items-start justify-between gap-6 border-b border-border py-5 last:border-0">
      <div>
        <div className="text-sm font-medium">{label}</div>
        <div className="mt-0.5 text-xs text-muted-foreground">{description}</div>
      </div>
      <button
        onClick={() => setOn((v) => !v)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${on ? "bg-primary" : "bg-muted"}`}
        aria-pressed={on}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
            on ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}

function SettingsPage() {
  return (
    <AppShell>
      <div className="fade-in-up">
        <p className="text-sm text-muted-foreground">Preferences</p>
        <h1 className="mt-1 text-3xl md:text-4xl">Settings</h1>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <section className="rounded-2xl border border-border bg-card p-6 shadow-soft md:p-8">
          <h2 className="font-serif text-xl">Profile</h2>
          <div className="mt-5 space-y-4">
            <label className="block">
              <span className="text-sm font-medium">Display name</span>
              <input defaultValue="Alex" className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
            </label>
            <label className="block">
              <span className="text-sm font-medium">Email</span>
              <input defaultValue="alex@example.com" className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
            </label>
            <button className="mt-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-soft">
              Save changes
            </button>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6 shadow-soft md:p-8">
          <h2 className="font-serif text-xl">Session preferences</h2>
          <div className="mt-3">
            <Toggle label="Daily reminder" description="A quiet, neutral nudge at your chosen time." defaultOn />
            <Toggle label="Voice guidance" description="Calm audio through your session." defaultOn />
            <Toggle label="Haptic pacing" description="Gentle vibrations for breath timing." />
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6 shadow-soft md:col-span-2 md:p-8">
          <h2 className="font-serif text-xl">Privacy</h2>
          <div className="mt-3">
            <Toggle label="Neutral notifications" description="Reminders never mention Apex by name." defaultOn />
            <Toggle label="App lock" description="Require Face ID / passcode to open the app." defaultOn />
            <Toggle label="Analytics" description="Share anonymized usage to help improve Apex." />
          </div>
        </section>

        <section className="rounded-2xl border border-destructive/30 bg-card p-6 shadow-soft md:col-span-2 md:p-8">
          <h2 className="font-serif text-xl text-destructive">Danger zone</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Deleting your account is permanent and removes all training history.
          </p>
          <button className="mt-4 rounded-full border border-destructive/40 px-5 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/5">
            Delete account
          </button>
        </section>
      </div>
    </AppShell>
  );
}
