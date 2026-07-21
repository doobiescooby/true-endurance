import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Section } from "@/components/site/Section";
import { FeatureCard, TestimonialCard, PricingCard } from "@/components/site/Cards";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Shield, Brain, Timer, HeartPulse, Waves, LineChart, ArrowRight, Lock } from "lucide-react";
import heroImage from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="container-page grid gap-14 pt-10 pb-20 md:grid-cols-2 md:items-center md:pt-16 md:pb-32">
          <div className="fade-in-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground shadow-soft">
              <Lock className="h-3 w-3 text-gold" />
              Private · Discreet · Judgement-free
            </div>
            <h1 className="mt-6 text-5xl leading-[1.02] md:text-6xl lg:text-7xl">
              Lasting control.
              <br />
              <span className="italic text-primary">Quietly earned.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
              A calm, science-based daily program that helps men naturally improve premature ejaculation — no pills, no
              gimmicks, just proven training.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/signup"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-soft transition-all hover:shadow-elevated hover:-translate-y-0.5"
              >
                Start your free week
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                href="#how"
                className="rounded-full border border-border bg-card px-7 py-3.5 text-sm font-medium hover:bg-accent"
              >
                How it works
              </a>
            </div>
            <dl className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-8">
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">Users</dt>
                <dd className="mt-1 font-serif text-2xl">12k+</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">Avg gain</dt>
                <dd className="mt-1 font-serif text-2xl">3.4×</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">Rating</dt>
                <dd className="mt-1 font-serif text-2xl">4.9</dd>
              </div>
            </dl>
          </div>

          <div className="fade-in relative">
            <div className="relative overflow-hidden rounded-[2rem] shadow-elevated">
              <img
                src={heroImage}
                alt="A calm man at sunrise practicing mindful breathing"
                width={1600}
                height={1200}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-6 -left-4 hidden max-w-[220px] rounded-2xl border border-border bg-card p-4 shadow-elevated sm:block">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-gold/20 text-gold">
                  <HeartPulse className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Today's session</div>
                  <div className="font-serif text-lg">8 minutes</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <Section
        id="benefits"
        eyebrow="Why StaminaRocket"
        title={
          <>
            Built on science.
            <br />
            Designed for real life.
          </>
        }
        description="Every part of StaminaRocket is grounded in evidence-based techniques used by clinicians — delivered in short daily sessions that fit around you."
      >
        <div className="grid gap-5 md:grid-cols-3">
          <FeatureCard
            icon={<Brain className="h-5 w-5" />}
            title="Mind & body training"
            description="Combine breath, awareness, and pelvic-floor exercises proven to build lasting control."
          />
          <FeatureCard
            icon={<Timer className="h-5 w-5" />}
            title="Just 10 minutes a day"
            description="Short, guided sessions that respect your time and build a sustainable habit."
          />
          <FeatureCard
            icon={<Shield className="h-5 w-5" />}
            title="Fully private"
            description="No social feed, no shared data. Your progress stays completely between you and StaminaRocket."
          />
        </div>
      </Section>

      {/* HOW IT WORKS */}
      <Section
        id="how"
        eyebrow="How it works"
        title="Three quiet steps to lasting change"
        description="A simple, structured path — no guesswork, no overwhelm."
        className="bg-secondary/40"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              n: "01",
              t: "Quick assessment",
              d: "A private 3-minute intake tailors your program to where you are today.",
            },
            {
              n: "02",
              t: "Daily 10-minute sessions",
              d: "Guided breath, pelvic-floor, and mindfulness practices delivered in a calm audio-first format.",
            },
            {
              n: "03",
              t: "Track quiet progress",
              d: "Weekly reflections show your gains in control, confidence, and calm — measured discreetly.",
            },
          ].map((s) => (
            <div key={s.n} className="rounded-2xl border border-border bg-card p-8 shadow-soft">
              <div className="font-serif text-4xl text-gold">{s.n}</div>
              <h3 className="mt-4 text-xl font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* FEATURES */}
      <Section id="features" eyebrow="What's inside" title="A complete practice in your pocket">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={<Waves className="h-5 w-5" />}
            title="Breath protocols"
            description="Guided box-breathing and coherence sessions that lower arousal spikes."
          />
          <FeatureCard
            icon={<HeartPulse className="h-5 w-5" />}
            title="Pelvic-floor training"
            description="Progressive Kegel and reverse-Kegel work with real-time pacing."
          />
          <FeatureCard
            icon={<Brain className="h-5 w-5" />}
            title="Awareness practice"
            description="Learn to recognize the point of no return — and stay in command."
          />
          <FeatureCard
            icon={<LineChart className="h-5 w-5" />}
            title="Weekly reflections"
            description="Private check-ins that reveal quiet, compounding progress."
          />
          <FeatureCard
            icon={<Timer className="h-5 w-5" />}
            title="Stamina intervals"
            description="Structured intervals that build endurance without pressure."
          />
          <FeatureCard
            icon={<Shield className="h-5 w-5" />}
            title="Discreet by design"
            description="Neutral name, private notifications, and encrypted storage."
          />
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <Section eyebrow="Real stories" title="Quiet wins, meaningful change" className="bg-secondary/40">
        <div className="grid gap-5 md:grid-cols-3">
          <TestimonialCard
            quote="After a month I stopped dreading intimacy. It's the calmest thing I've ever added to my day."
            name="Marcus, 34"
            meta="8 weeks with Apex"
          />
          <TestimonialCard
            quote="No pills, no pressure — just short sessions I actually stick to. My confidence has completely shifted."
            name="Jordan, 29"
            meta="12 weeks with Apex"
          />
          <TestimonialCard
            quote="The privacy matters. It never feels like an app about a problem — it feels like a practice."
            name="D., 41"
            meta="6 months with Apex"
          />
        </div>
      </Section>

      {/* PRICING */}
      <Section
        id="pricing"
        eyebrow="Pricing"
        title="One quiet investment in yourself"
        description="Cancel anytime. Every plan includes a 7-day free trial and a 30-day money-back guarantee."
        align="center"
      >
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          <PricingCard
            name="Monthly"
            price="$19"
            period="/ month"
            description="Full access, month to month."
            features={["Daily 8-minute sessions", "Full training library", "Progress tracking", "Cancel anytime"]}
            cta={
              <Link
                to="/signup"
                className="block w-full rounded-full border border-border bg-background py-3 text-center text-sm font-medium hover:bg-accent"
              >
                Start free trial
              </Link>
            }
          />
          <PricingCard
            featured
            name="Annual"
            price="$129"
            period="/ year"
            description="Best value — 45% off."
            features={[
              "Everything in Monthly",
              "Advanced protocols",
              "Weekly private reflections",
              "Priority coaching Q&A",
            ]}
            cta={
              <Link
                to="/signup"
                className="block w-full rounded-full bg-gold py-3 text-center text-sm font-medium text-gold-foreground hover:brightness-105"
              >
                Start free trial
              </Link>
            }
          />
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq" eyebrow="Questions" title="Frequently asked" className="bg-secondary/40">
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="space-y-3">
            {[
              {
                q: "Is Apex a medical treatment?",
                a: "No. Apex is an educational and training program based on techniques widely used by clinicians and therapists. It is not a substitute for medical care — if you have concerns, always consult a professional.",
              },
              {
                q: "How long until I see results?",
                a: "Most members notice meaningful changes within 3–4 weeks of consistent daily practice. Lasting change typically compounds over 8–12 weeks.",
              },
              {
                q: "How private is it?",
                a: "Very. Notifications are neutral, your data is encrypted, and nothing is ever shared. Apex is designed to feel like a private practice, not a public app.",
              },
              {
                q: "Do I need any equipment?",
                a: "None. Just headphones and a quiet 8 minutes a day.",
              },
              {
                q: "Can I cancel anytime?",
                a: "Yes — cancel in one tap from Settings. Every plan also includes a 30-day money-back guarantee.",
              },
            ].map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="overflow-hidden rounded-2xl border border-border bg-card px-6 shadow-soft"
              >
                <AccordionTrigger className="py-5 text-left text-base font-medium hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      {/* FINAL CTA */}
      <section className="py-20 md:py-28">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-[2rem] bg-primary px-8 py-16 text-center text-primary-foreground shadow-elevated md:px-16 md:py-24">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                background: "radial-gradient(ellipse at top, oklch(0.78 0.13 78) 0%, transparent 60%)",
              }}
            />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl text-4xl md:text-5xl">A calmer, more confident you — starts tonight.</h2>
              <p className="mx-auto mt-5 max-w-xl text-primary-foreground/80">
                Join 12,000+ men quietly transforming their control, confidence, and connection.
              </p>
              <Link
                to="/signup"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-sm font-medium text-gold-foreground shadow-soft hover:brightness-105"
              >
                Start your free week
                <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="mt-4 text-xs text-primary-foreground/70">No credit card required · Fully private</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
