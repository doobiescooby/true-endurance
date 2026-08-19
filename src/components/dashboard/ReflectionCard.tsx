import { NotebookPen } from "lucide-react";

export function ReflectionCard({
  logged,
  onAdd,
}: {
  logged: boolean;
  onAdd: () => void;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">
        <NotebookPen className="h-3.5 w-3.5 text-gold" />
        Daily reflection
      </div>
      <h3 className="mt-3 font-serif text-xl">How was today's control?</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Take a moment to record how today's session felt and help personalise your future training.
      </p>
      <button
        type="button"
        onClick={onAdd}
        className="mt-5 inline-flex items-center rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors duration-300 hover:bg-accent"
      >
        {logged ? "Edit reflection" : "Add reflection"}
      </button>
    </div>
  );
}
