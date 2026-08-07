import { Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import logo from "@/assets/Copy of Stamina Rocket Brand Logo 2.svg";
import { testimonials } from "@/data/testimonials";

const LAST_TESTIMONIAL_KEY = "stamina-rocket-last-testimonial";

function pickRandomTestimonial() {
  try {
    const lastIndexRaw = sessionStorage.getItem(LAST_TESTIMONIAL_KEY);
    const lastIndex = lastIndexRaw ? Number.parseInt(lastIndexRaw, 10) : -1;
    const indices = testimonials.map((_, i) => i);
    const available =
      testimonials.length > 1 && lastIndex >= 0 && lastIndex < testimonials.length
        ? indices.filter((i) => i !== lastIndex)
        : indices;
    const nextIndex = available[Math.floor(Math.random() * available.length)];
    sessionStorage.setItem(LAST_TESTIMONIAL_KEY, String(nextIndex));
    return testimonials[nextIndex];
  } catch {
    return testimonials[Math.floor(Math.random() * testimonials.length)];
  }
}

export function AuthLayout({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  const [testimonial, setTestimonial] = useState(testimonials[0]);
  const [showTestimonial, setShowTestimonial] = useState(false);

  useEffect(() => {
    setTestimonial(pickRandomTestimonial());
    setShowTestimonial(true);
  }, []);
  return (
    <div className="grid min-h-screen md:grid-cols-2">
      <div className="hidden bg-primary text-primary-foreground md:flex md:flex-col md:justify-between md:p-12">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-gold text-gold-foreground">
            <img src={logo} alt="Stamina Rocket" className="h-6 w-6 object-contain" />
          </span>
          <span className="font-serif text-lg">Stamina Rocket</span>
        </Link>
        <div className="max-w-md">
          <div className={showTestimonial ? "animate-fade-in" : "opacity-0"}>
            <p className="font-serif text-3xl leading-snug">
              “{testimonial.quote}”
            </p>
            <p className="mt-4 text-sm text-primary-foreground/70">— {testimonial.name}</p>
          </div>
        </div>
        <p className="text-xs text-primary-foreground/60">
          Private · Discreet · Evidence-based
        </p>
      </div>

      <div className="flex flex-col justify-center px-6 py-12 md:px-16">
        <div className="mx-auto w-full max-w-sm">
          <Link to="/" className="mb-8 flex items-center gap-2 md:hidden">
            <span className="grid h-8 w-8 place-items-center rounded-full">
              <img src={logo} alt="Stamina Rocket" className="h-8 w-8 object-contain" />
            </span>
            <span className="font-serif text-lg">Stamina Rocket</span>
          </Link>
          <h1 className="text-3xl md:text-4xl">{title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          <div className="mt-8">{children}</div>
          <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>
        </div>
      </div>
    </div>
  );
}

export function Field({
  label,
  type = "text",
  placeholder,
  autoComplete,
  defaultValue,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  defaultValue?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        className="mt-1.5 w-full rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </label>
  );
}
