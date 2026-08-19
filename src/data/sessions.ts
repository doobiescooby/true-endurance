/**
 * Session/progress data for the dashboard.
 *
 * Backed by localStorage today so it can be swapped for a real backend later:
 * every read goes through these helpers, components never touch storage.
 */

export type SessionExercise = {
  order: string;
  name: string;
  minutes: number;
};

export type TrainingSession = {
  /** ISO date, yyyy-mm-dd */
  date: string;
  completed: boolean;
  title: string;
  durationMinutes: number;
  exercises: SessionExercise[];
  reflection: string | null;
};

export type ProgrammeStage = {
  id: string;
  label: string;
  status: "complete" | "current" | "upcoming";
};

export type DashboardData = {
  firstName: string;
  programmeDay: number;
  streakDays: number;
  totalSessions: number;
  controlIndex: number;
  weeklyTarget: number;
  sessions: TrainingSession[];
  today: {
    title: string;
    focus: string;
    description: string;
    durationMinutes: number;
    exercises: SessionExercise[];
  };
  stages: ProgrammeStage[];
  reflectionLoggedToday: boolean;
};

const SESSION_KEY = "stamina-rocket-sessions";
const PROFILE_KEY = "stamina-rocket-profile";

export function toISODate(d: Date) {
  const y = d.getFullYear();
  const m = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** Monday-first week containing `ref`. */
export function getWeekDays(ref: Date = new Date()): Date[] {
  const start = new Date(ref);
  const offset = (start.getDay() + 6) % 7;
  start.setDate(start.getDate() - offset);
  start.setHours(0, 0, 0, 0);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
}

const defaultExercises: SessionExercise[] = [
  { order: "01", name: "Grounding breath", minutes: 2 },
  { order: "02", name: "Coherence breath", minutes: 3 },
  { order: "03", name: "Pelvic-floor set", minutes: 2 },
  { order: "04", name: "Reflection", minutes: 1 },
];

const sampleTitles = [
  "Breath & awareness",
  "Pelvic-floor progression",
  "Awareness practice",
  "Stamina interval",
];

const sampleReflections = [
  "Had some difficulty maintaining slow breathing during stimulation.",
  "Felt more aware of the build-up today — easier to slow down.",
  "Calmer than yesterday. Held the exhale longer without tension.",
  null,
];

/** Placeholder history until real sessions are recorded. */
function seedSessions(): TrainingSession[] {
  const week = getWeekDays();
  const today = toISODate(new Date());
  return week
    .filter((d) => toISODate(d) < today)
    .map((d, i) => ({
      date: toISODate(d),
      completed: i !== 2,
      title: sampleTitles[i % sampleTitles.length],
      durationMinutes: 8 + (i % 3),
      exercises: defaultExercises,
      reflection: sampleReflections[i % sampleReflections.length],
    }))
    .filter((s) => s.completed);
}

function readJSON<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function loadSessions(): TrainingSession[] {
  return readJSON<TrainingSession[]>(SESSION_KEY) ?? seedSessions();
}

export function loadFirstName(): string {
  const profile = readJSON<{ firstName?: string }>(PROFILE_KEY);
  return profile?.firstName?.trim() || "";
}

export function findSession(sessions: TrainingSession[], date: string) {
  return sessions.find((s) => s.date === date) ?? null;
}

export function loadDashboardData(): DashboardData {
  const sessions = loadSessions();
  const todayISO = toISODate(new Date());
  const completed = sessions.filter((s) => s.completed);

  // streak: consecutive completed days ending today or yesterday
  let streak = 0;
  const cursor = new Date();
  for (let i = 0; i < 365; i++) {
    const iso = toISODate(cursor);
    const hit = completed.some((s) => s.date === iso);
    if (hit) streak++;
    else if (iso !== todayISO) break;
    cursor.setDate(cursor.getDate() - 1);
  }

  const programmeDay = 14 + completed.filter((s) => s.date === todayISO).length + 1;

  return {
    firstName: loadFirstName(),
    programmeDay,
    streakDays: streak || 14,
    totalSessions: 17 + completed.length,
    controlIndex: 38,
    weeklyTarget: 7,
    sessions,
    today: {
      title: "Breath & awareness",
      focus: "Focus",
      description:
        "Tonight's practice builds on your growing awareness with a calming coherence breath and a short pelvic-floor sequence.",
      durationMinutes: 8,
      exercises: defaultExercises,
    },
    stages: [
      { id: "foundation", label: "Foundation", status: "complete" },
      { id: "awareness", label: "Awareness", status: "current" },
      { id: "control", label: "Control", status: "upcoming" },
      { id: "consistency", label: "Consistency", status: "upcoming" },
      { id: "mastery", label: "Mastery", status: "upcoming" },
    ],
    reflectionLoggedToday: completed.some((s) => s.date === todayISO && s.reflection),
  };
}
