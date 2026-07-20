import type { ReactNode } from "react";

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className = "",
  align = "left",
}: {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <section id={id} className={`py-20 md:py-28 ${className}`}>
      <div className="container-page">
        {(eyebrow || title || description) && (
          <div className={`mb-12 md:mb-16 ${align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}`}>
            {eyebrow && (
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-gold">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-3xl leading-[1.1] md:text-5xl">{title}</h2>
            )}
            {description && (
              <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
