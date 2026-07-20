import type { ReactNode } from "react";

export function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="hover-lift group rounded-2xl border border-border bg-card p-7 shadow-soft">
      <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/8 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        {icon}
      </div>
      <h3 className="mt-5 text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
    </div>
  );
}

export function TestimonialCard({
  quote,
  name,
  meta,
}: {
  quote: string;
  name: string;
  meta: string;
}) {
  return (
    <figure className="hover-lift flex h-full flex-col rounded-2xl border border-border bg-card p-7 shadow-soft">
      <div className="mb-4 text-gold" aria-hidden>
        ★★★★★
      </div>
      <blockquote className="flex-1 font-serif text-lg leading-relaxed text-foreground">
        “{quote}”
      </blockquote>
      <figcaption className="mt-6 border-t border-border pt-4">
        <div className="text-sm font-semibold">{name}</div>
        <div className="text-xs text-muted-foreground">{meta}</div>
      </figcaption>
    </figure>
  );
}

export function PricingCard({
  name,
  price,
  period,
  description,
  features,
  featured,
  cta,
}: {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  featured?: boolean;
  cta: ReactNode;
}) {
  return (
    <div
      className={`relative rounded-3xl p-8 ${
        featured
          ? "bg-primary text-primary-foreground shadow-elevated"
          : "border border-border bg-card shadow-soft"
      }`}
    >
      {featured && (
        <span className="absolute -top-3 left-8 rounded-full bg-gold px-3 py-1 text-xs font-medium text-gold-foreground">
          Most popular
        </span>
      )}
      <h3 className={`font-serif text-2xl ${featured ? "" : "text-foreground"}`}>{name}</h3>
      <p className={`mt-1 text-sm ${featured ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
        {description}
      </p>
      <div className="mt-6 flex items-baseline gap-1">
        <span className="font-serif text-5xl">{price}</span>
        <span className={`text-sm ${featured ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
          {period}
        </span>
      </div>
      <ul className={`mt-6 space-y-3 text-sm ${featured ? "text-primary-foreground/90" : "text-foreground/85"}`}>
        {features.map((f) => (
          <li key={f} className="flex gap-2">
            <span className={`mt-1 grid h-4 w-4 place-items-center rounded-full ${
              featured ? "bg-gold text-gold-foreground" : "bg-primary/10 text-primary"
            }`}>
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                <path d="M2 6l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            {f}
          </li>
        ))}
      </ul>
      <div className="mt-8">{cta}</div>
    </div>
  );
}
