import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import logo from "@/assets/Copy of Stamina Rocket Brand Logo 2.svg";

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
  return (
    <div className="grid min-h-screen md:grid-cols-2">
      <div className="hidden bg-primary text-primary-foreground md:flex md:flex-col md:justify-between md:p-12">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-gold text-gold-foreground">
            <span className="font-serif text-sm">A</span>
          </span>
          <span className="font-serif text-lg">Stamina Rocket</span>
        </Link>
        <div className="max-w-md">
          <p className="font-serif text-3xl leading-snug">
            “I stopped dreading intimacy. It's the calmest thing I've ever added to my day.”
          </p>
          <p className="mt-4 text-sm text-primary-foreground/70">— Marcus, 34</p>
        </div>
        <p className="text-xs text-primary-foreground/60">
          Private · Discreet · Evidence-based
        </p>
      </div>

      <div className="flex flex-col justify-center px-6 py-12 md:px-16">
        <div className="mx-auto w-full max-w-sm">
          <Link to="/" className="mb-8 flex items-center gap-2 md:hidden">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground">
              <span className="font-serif text-sm">A</span>
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
