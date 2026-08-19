import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/site/AppShell";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { WeeklyTrainingCalendar } from "@/components/dashboard/WeeklyTrainingCalendar";
import { DayWorkoutDetails } from "@/components/dashboard/DayWorkoutDetails";
import { StreakCard } from "@/components/dashboard/StreakCard";
import { TodaysSession } from "@/components/dashboard/TodaysSession";
import { QuickStats } from "@/components/dashboard/QuickStats";
import { WeeklyProgress } from "@/components/dashboard/WeeklyProgress";
import { ReflectionCard } from "@/components/dashboard/ReflectionCard";
import { ProgrammeProgress } from "@/components/dashboard/ProgrammeProgress";
import {
  findSession,
  getWeekDays,
  loadDashboardData,
  toISODate,
  type DashboardData,
} from "@/data/sessions";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
  head: () => ({
    meta: [
      { title: "Dashboard · Stamina Rocket" },
      {
        name: "description",
        content: "Your weekly training calendar, streak and today's Stamina Rocket session.",
      },
      { property: "og:title", content: "Dashboard · Stamina Rocket" },
      {
        property: "og:description",
        content: "Track your streak, weekly progress and today's session.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function Dashboard() {
  // client-only read of stored data — keeps SSR output stable
  const [data, setData] = useState<DashboardData | null>(null);
  const [hour, setHour] = useState(19);
  const [selected, setSelected] = useState<string | null>(null);
  const [reflectionNote, setReflectionNote] = useState(false);

  useEffect(() => {
    setData(loadDashboardData());
    setHour(new Date().getHours());
  }, []);

  const week = useMemo(() => getWeekDays(), []);
  const todayISO = useMemo(() => toISODate(new Date()), []);

  const sessions = data?.sessions ?? [];
  const weekCompleted = week.filter((d) =>
    sessions.some((s) => s.date === toISODate(d) && s.completed),
  ).length;

  const selectedDate = selected ? week.find((d) => toISODate(d) === selected) : undefined;

  return (
    <AppShell>
      <DashboardHeader firstName={data?.firstName} hour={hour} />

      <div className="fade-in-up mt-6 space-y-4">
        <WeeklyTrainingCalendar
          week={week}
          sessions={sessions}
          todayISO={todayISO}
          selected={selected}
          onSelect={(iso) => setSelected((prev) => (prev === iso ? null : iso))}
        />

        {selectedDate && (
          <DayWorkoutDetails date={selectedDate} session={findSession(sessions, selected!)} />
        )}

        <StreakCard days={data?.streakDays ?? 0} />
      </div>

      <div className="mt-6">
        <TodaysSession
          programmeDay={data?.programmeDay ?? 1}
          focus={data?.today.focus ?? "Focus"}
          title={data?.today.title ?? "Breath & awareness"}
          description={data?.today.description ?? ""}
          durationMinutes={data?.today.durationMinutes ?? 8}
          exercises={data?.today.exercises ?? []}
        />
      </div>

      <div className="mt-6 space-y-4">
        <QuickStats
          totalSessions={data?.totalSessions ?? 0}
          streakDays={data?.streakDays ?? 0}
          controlIndex={data?.controlIndex ?? 0}
        />

        <WeeklyProgress completed={weekCompleted} target={data?.weeklyTarget ?? 7} />

        <ReflectionCard
          logged={!!data?.reflectionLoggedToday}
          onAdd={() => setReflectionNote(true)}
          note={reflectionNote ? "Reflections are recorded at the end of today's session." : null}
        />

        <ProgrammeProgress stages={data?.stages ?? []} />
      </div>
    </AppShell>
  );
}
