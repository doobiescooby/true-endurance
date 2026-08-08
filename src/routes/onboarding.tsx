import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Play, Sparkles } from "lucide-react";
import {
  ChecklistItem,
  OnboardingShell,
  ProgressIndicator,
  QuestionScreen,
} from "@/components/onboarding/OnboardingUI";
import {
  loadOnboardingProfile,
  onboardingQuestions,
  saveOnboardingProfile,
  type OnboardingAnswers,
} from "@/data/onboarding";

export const Route = createFileRoute("/onboarding")({
  component: OnboardingPage,
  head: () => ({
    meta: [
      { title: "Build your programme · Stamina Rocket" },
      {
        name: "description",
        content:
          "Answer a few quick questions so Stamina Rocket can personalise your daily training programme.",
      },
      { property: "og:title", content: "Build your programme · Stamina Rocket" },
      {
        property: "og:description",
        content: "A two-minute questionnaire that shapes your personalised training plan.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
});

type Stage = "welcome" | "questions" | "building" | "ready";

const buildingSteps = [
  "Analysing your answers",
  "Selecting your starting exercises",
  "Personalising your first week",
  "Preparing your dashboard",
];

function OnboardingPage() {
  const navigate = useNavigate();
  const [hydrated, setHydrated] = useState(false);
  const [stage, setStage] = useState<Stage>("welcome");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<OnboardingAnswers>({});
  const [buildingStep, setBuildingStep] = useState(0);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Restore any in-progress answers; completed users never see onboarding again.
  useEffect(() => {
    const profile = loadOnboardingProfile();
    if (profile.completed) {
      navigate({ to: "/dashboard", replace: true });
      return;
    }
    setAnswers(profile.answers);
    const firstUnanswered = onboardingQuestions.findIndex((q) => !profile.answers[q.id]);
    if (Object.keys(profile.answers).length > 0) {
      setIndex(firstUnanswered === -1 ? onboardingQuestions.length - 1 : firstUnanswered);
    }
    setHydrated(true);
  }, [navigate]);

  useEffect(() => () => {
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
  }, []);

  // Loading checklist, then the completion screen.
  useEffect(() => {
    if (stage !== "building") return;
    const timers = buildingSteps.map((_, i) =>
      setTimeout(() => setBuildingStep(i + 1), 400 + i * 550),
    );
    const done = setTimeout(() => setStage("ready"), 2700);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(done);
    };
  }, [stage]);

  function persist(next: OnboardingAnswers, completed = false) {
    saveOnboardingProfile({
      answers: next,
      completed,
      completedAt: completed ? new Date().toISOString() : null,
    });
  }

  function handleSelect(option: string) {
    const question = onboardingQuestions[index];
    const next = { ...answers, [question.id]: option };
    setAnswers(next);
    const isLast = index === onboardingQuestions.length - 1;
    persist(next, isLast);
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    advanceTimer.current = setTimeout(() => {
      if (isLast) setStage("building");
      else setIndex((i) => i + 1);
    }, 260);
  }

  function handleBack() {
    if (index === 0) {
      setStage("welcome");
      return;
    }
    setIndex((i) => i - 1);
  }

  if (!hydrated) {
    return (
      <OnboardingShell>
        <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
          Loading…
        </div>
      </OnboardingShell>
    );
  }

  if (stage === "welcome") {
    return (
      <OnboardingShell>
        <div className="fade-in-up flex flex-1 flex-col justify-center">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/8 px-3 py-1 text-xs text-primary">
            <Sparkles className="h-3.5 w-3.5 text-gold" /> About 2 minutes
          </span>
          <h1 className="mt-5 text-3xl leading-tight md:text-4xl">
            Let's build your personalised programme
          </h1>
          <p className="mt-4 max-w-md text-muted-foreground">
            This takes about 2 minutes. Every answer helps personalise your training.
          </p>
          <button
            type="button"
            onClick={() => setStage("questions")}
            className="mt-10 w-full rounded-full bg-primary py-4 text-sm font-medium text-primary-foreground shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-elevated sm:w-auto sm:px-10"
          >
            Let's begin
          </button>
        </div>
      </OnboardingShell>
    );
  }

  if (stage === "building") {
    return (
      <OnboardingShell>
        <div className="fade-in flex flex-1 flex-col justify-center">
          <h1 className="text-2xl md:text-3xl">Building your personalised programme…</h1>
          <ul className="mt-8 space-y-4">
            {buildingSteps.map((label, i) => (
              <ChecklistItem key={label} label={label} done={i < buildingStep} />
            ))}
          </ul>
        </div>
      </OnboardingShell>
    );
  }

  if (stage === "ready") {
    return (
      <OnboardingShell>
        <div className="fade-in-up flex flex-1 flex-col justify-center">
          <h1 className="text-3xl md:text-4xl">Your programme is ready.</h1>
          <p className="mt-4 max-w-md text-muted-foreground">
            Your personalised plan has been created based on your responses. You can update your
            answers at any time from Settings.
          </p>
          <button
            type="button"
            onClick={() => navigate({ to: "/dashboard" })}
            className="mt-10 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary py-4 text-sm font-medium text-primary-foreground shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-elevated sm:w-auto sm:px-10"
          >
            <Play className="h-4 w-4" fill="currentColor" />
            Start today's session
          </button>
        </div>
      </OnboardingShell>
    );
  }

  const question = onboardingQuestions[index];

  return (
    <OnboardingShell>
      <ProgressIndicator current={index + 1} total={onboardingQuestions.length} />
      <button
        type="button"
        onClick={handleBack}
        className="mt-6 inline-flex w-fit items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </button>
      <div className="mt-6" key={question.id}>
        <QuestionScreen
          title={question.title}
          hint={question.hint}
          options={question.options}
          value={answers[question.id]}
          onSelect={handleSelect}
        />
      </div>
    </OnboardingShell>
  );
}
