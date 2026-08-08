export type OnboardingQuestion = {
  /** Stable key used as the profile field name. */
  id: string;
  title: string;
  hint?: string;
  options: string[];
};

export const onboardingQuestions: OnboardingQuestion[] = [
  {
    id: "goal",
    title: "What's your main goal?",
    hint: "Choose one.",
    options: [
      "Last longer during sex",
      "Improve ejaculation control",
      "Reduce performance anxiety",
      "Increase confidence",
      "Improve overall sexual wellness",
    ],
  },
  {
    id: "primaryStruggle",
    title: "What do you struggle with most?",
    options: [
      "Getting too excited",
      "Tensing up",
      "Breathing",
      "Pelvic floor control",
      "I'm not sure",
    ],
  },
  {
    id: "pointOfNoReturnAwareness",
    title: "Can you usually tell when you're approaching the point of no return?",
    options: ["Yes", "Sometimes", "No"],
  },
  {
    id: "anxietyLevel",
    title: "How anxious do you usually feel before sex?",
    options: ["No anxiety", "Mild anxiety", "Moderate anxiety", "Severe anxiety"],
  },
  {
    id: "kegelExperience",
    title: "Have you practiced Kegel exercises before?",
    options: ["Never", "A few times", "Regularly"],
  },
  {
    id: "pelvicStretchExperience",
    title: "Have you done pelvic floor stretches before?",
    options: ["Yes", "No", "I'm not sure what they are"],
  },
  {
    id: "pornFrequency",
    title: "How often do you watch pornography?",
    options: ["Never", "Less than once a week", "1–3 times a week", "4–6 times a week", "Daily"],
  },
  {
    id: "lifestyle",
    title: "Which best describes your lifestyle?",
    options: ["Mostly sedentary", "Lightly active", "Moderately active", "Very active"],
  },
  {
    id: "ageGroup",
    title: "How old are you?",
    options: ["Under 20", "20–29", "30–39", "40–49", "50+"],
  },
  {
    id: "dailyCommitment",
    title: "How much time can you realistically commit each day?",
    options: ["5 minutes", "10 minutes", "15 minutes"],
  },
  {
    id: "typicalDuration",
    title: "How long do you usually last before reaching ejaculation?",
    options: [
      "Less than 30 seconds",
      "30 seconds–1 minute",
      "1–3 minutes",
      "More than 3 minutes",
      "I'd rather not say",
    ],
  },
];

export type OnboardingAnswers = Record<string, string>;

export type OnboardingProfile = {
  answers: OnboardingAnswers;
  completed: boolean;
  completedAt: string | null;
};

const STORAGE_KEY = "stamina-rocket-onboarding";

const emptyProfile: OnboardingProfile = { answers: {}, completed: false, completedAt: null };

export function loadOnboardingProfile(): OnboardingProfile {
  if (typeof window === "undefined") return emptyProfile;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyProfile;
    const parsed = JSON.parse(raw) as Partial<OnboardingProfile>;
    return {
      answers: parsed.answers ?? {},
      completed: !!parsed.completed,
      completedAt: parsed.completedAt ?? null,
    };
  } catch {
    return emptyProfile;
  }
}

export function saveOnboardingProfile(profile: OnboardingProfile) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch {
    /* storage unavailable — answers stay in memory for this session */
  }
}

export function resetOnboardingProfile() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}
