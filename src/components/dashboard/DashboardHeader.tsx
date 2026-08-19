function greeting(hour: number) {
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export function DashboardHeader({ firstName, hour }: { firstName?: string; hour: number }) {
  const prompt = hour < 12 ? "Ready for this morning's session?" : hour < 18 ? "Ready for today's session?" : "Ready for tonight's session?";
  return (
    <header className="fade-in-up">
      <p className="text-sm text-muted-foreground">
        {greeting(hour)}
        {firstName ? `, ${firstName}` : ""}
      </p>
      <h1 className="mt-1 text-2xl md:text-3xl">{prompt}</h1>
    </header>
  );
}
