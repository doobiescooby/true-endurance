import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { LayoutDashboard, Dumbbell, LineChart, Settings, LogOut } from "lucide-react";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/training", label: "Today's session", icon: Dumbbell },
  { to: "/progress", label: "Progress", icon: LineChart },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-border bg-secondary/30 md:flex md:flex-col">
          <Link to="/dashboard" className="flex items-center gap-2 px-6 py-6">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground">
              <span className="font-serif text-sm">A</span>
            </span>
            <span className="font-serif text-lg">Stamina Rocket</span>
          </Link>
          <nav className="flex-1 space-y-1 px-3 py-4">
            {nav.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground/75 hover:bg-accent hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="border-t border-border p-3">
            <Link
              to="/"
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground/70 hover:bg-accent"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </Link>
          </div>
        </aside>

        <main className="flex-1">
          {/* mobile top bar */}
          <div className="flex items-center justify-between border-b border-border bg-background/80 px-5 py-4 backdrop-blur md:hidden">
            <Link to="/dashboard" className="flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-primary text-primary-foreground">
                <span className="font-serif text-xs">A</span>
              </span>
              <span className="font-serif">Stamina Rocket</span>
            </Link>
            <Link to="/settings" className="rounded-full border border-border p-2">
              <Settings className="h-4 w-4" />
            </Link>
          </div>

          <div className="mx-auto max-w-5xl px-5 py-8 md:px-10 md:py-12">
            {children}
          </div>

          {/* mobile bottom nav */}
          <nav className="sticky bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur md:hidden">
            <div className="grid grid-cols-4">
              {nav.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`flex flex-col items-center gap-1 py-3 text-[11px] ${
                      active ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label.split(" ")[0]}
                  </Link>
                );
              })}
            </div>
          </nav>
        </main>
      </div>
    </div>
  );
}
