import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Beer,
  Check,
  CheckCircle2,
  CircleDot,
  ClipboardCopy,
  Cog,
  Cylinder,
  Disc3,
  Droplet,
  Factory,
  Fan,
  Flame,
  FlaskConical,
  Fuel,
  Gauge,
  Hourglass,
  Link2,
  Lightbulb,
  ListChecks,
  MessageCircle,
  Milk,
  Mountain,
  Pencil,
  Phone,
  Pill,
  Printer,
  Puzzle,
  RefreshCw,
  RotateCw,
  Send,
  ShieldCheck,
  Shirt,
  Sparkles,
  Thermometer,
  Truck,
  Wallet,
  Waves,
  Wind,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { getFinderProducts } from "@/lib/catalog";
import { sendContactEmail } from "@/lib/email";
import { EASE_OUT } from "@/lib/motion";
import {
  EMPTY_ANSWERS,
  EQUIPMENT,
  INDUSTRIES,
  MAX_PRIORITIES,
  MEDIA,
  PRESSURES,
  PRIORITIES,
  SPEEDS,
  TEMPERATURES,
  buildSpec,
  checklist,
  companionsFor,
  decodeAnswers,
  dutyRows,
  encodeAnswers,
  fitLabel,
  isComplete,
  rankProducts,
  specText,
  watchOuts,
  type Answers,
  type IndustryId,
  type Match,
  type Option,
} from "@/data/sealFinder";

type FinderSearch = { industry?: string; d?: string };

export const Route = createFileRoute("/wizard")({
  validateSearch: (search: Record<string, unknown>): FinderSearch => ({
    industry: typeof search.industry === "string" ? search.industry : undefined,
    d: typeof search.d === "string" ? search.d : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Find My Seal — Mechanical Seal Selector | AARRKKAA International" },
      {
        name: "description",
        content:
          "Answer six quick questions about your equipment, media, temperature and pressure. Get the right mechanical seal, face materials, elastomer and arrangement, then a quote from AARRKKAA International, Hosur.",
      },
      { property: "og:title", content: "Find My Seal — AARRKKAA International" },
    ],
  }),
  component: WizardPage,
});

/* ───────────── Icons & step meta ───────────── */

const ICONS: Record<string, LucideIcon> = {
  // equipment
  centrifugal: Fan,
  "oem-pump": Cylinder,
  agitator: RotateCw,
  rotary: Disc3,
  gearbox: Cog,
  static: CircleDot,
  // industry
  chemical: FlaskConical,
  food: Milk,
  pharma: Pill,
  water: Droplet,
  oilgas: Fuel,
  textile: Shirt,
  sugar: Beer,
  general: Factory,
  // media
  hotwater: Flame,
  slurry: Mountain,
  oil: Fuel,
  hygienic: Sparkles,
  air: Wind,
  // priorities
  "zero-leak": ShieldCheck,
  "long-life": Hourglass,
  "drop-in": Puzzle,
  fast: Truck,
  budget: Wallet,
};
const MEDIA_ICONS: Record<string, LucideIcon> = { water: Waves, chemical: FlaskConical };
const PRIORITY_ICONS: Record<string, LucideIcon> = { hygienic: BadgeCheck };

const STEPS = [
  {
    key: "equipment",
    short: "Equipment",
    title: "What are you sealing?",
    subtitle: "Pick the machine the seal goes on. This decides the seal family.",
  },
  {
    key: "industry",
    short: "Industry",
    title: "Which industry is it for?",
    subtitle: "Industry tells us which standards and materials usually apply.",
  },
  {
    key: "media",
    short: "Media",
    title: "What is being sealed?",
    subtitle:
      "The liquid or gas at the seal drives face and rubber choice more than anything else.",
  },
  {
    key: "conditions",
    short: "Conditions",
    title: "How hard does it run?",
    subtitle: "Rough numbers are fine. Pick “Not sure” and our engineers will confirm.",
  },
  {
    key: "priorities",
    short: "Priorities",
    title: "What matters most to you?",
    subtitle: `Choose up to ${MAX_PRIORITIES}. We weigh the shortlist to match.`,
  },
  {
    key: "details",
    short: "Details",
    title: "Anything else we should know?",
    subtitle: "Optional, but it lets us quote the exact part. Skip if you don't have it handy.",
  },
] as const;

const RESULTS = STEPS.length;
const STORAGE_KEY = "seal-finder:v1";
const WHATSAPP = "917806936475";
const PHONE = "+917806936475";

const inputBase =
  "w-full rounded-xl border border-hairline bg-background px-4 py-3 text-base sm:text-sm text-ink placeholder:text-muted-foreground/70 shadow-inner outline-none transition focus:border-ink/40 focus:ring-2 focus:ring-brass/30";
const labelBase = "text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground";

type Phase = "questions" | "matching" | "results";

/* ───────────── Page ───────────── */

function WizardPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/wizard" });
  const reduce = useReducedMotion();

  const [answers, setAnswers] = useState<Answers>(EMPTY_ANSWERS);
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState<Phase>("questions");
  const [resume, setResume] = useState<{ answers: Answers; step: number } | null>(null);
  const advancing = useRef<number | null>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const hydrated = useRef(false);

  // Restore from a share link, a home-page shortcut, or a saved session.
  useEffect(() => {
    if (search.d) {
      const a = decodeAnswers(search.d);
      if (a && isComplete(a)) {
        setAnswers(a);
        setStep(RESULTS);
        setPhase("results");
        hydrated.current = true;
        return;
      }
    }
    if (search.industry && INDUSTRIES.some((i) => i.id === search.industry)) {
      setAnswers((p) => ({ ...p, industry: search.industry as IndustryId }));
    } else {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const saved = JSON.parse(raw);
          const a = decodeAnswers(encodeAnswers(saved.answers ?? {}));
          if (a?.equipment && typeof saved.step === "number" && saved.step > 0)
            setResume({ answers: a, step: Math.min(saved.step, RESULTS - 1) });
        }
      } catch {
        /* storage unavailable */
      }
    }
    hydrated.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Save progress while answering.
  useEffect(() => {
    if (!hydrated.current || phase !== "questions" || !answers.equipment) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ answers, step }));
    } catch {
      /* ignore */
    }
  }, [answers, step, phase]);

  useEffect(
    () => () => {
      if (advancing.current) window.clearTimeout(advancing.current);
    },
    [],
  );

  const scrollTop = () => {
    const el = topRef.current;
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 96;
    if (window.scrollY > y + 40) window.scrollTo({ top: y, behavior: reduce ? "auto" : "smooth" });
  };

  const goTo = (s: number) => {
    setResume(null);
    setPhase("questions");
    setStep(s);
    scrollTop();
  };

  const finish = () => {
    setPhase("matching");
    setStep(RESULTS);
    scrollTop();
    window.setTimeout(
      () => {
        setPhase("results");
        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch {
          /* ignore */
        }
      },
      reduce ? 250 : 1500,
    );
  };

  useEffect(() => {
    if (phase === "results" && isComplete(answers)) {
      navigate({ search: { d: encodeAnswers(answers) }, replace: true, resetScroll: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const next = () => {
    if (step < RESULTS - 1) goTo(step + 1);
    else finish();
  };

  const answersRef = useRef(answers);
  answersRef.current = answers;
  const cameFromResults = useRef(false);

  const pick = <K extends "equipment" | "industry" | "media">(key: K, value: Answers[K]) => {
    const updated = { ...answersRef.current, [key]: value };
    answersRef.current = updated;
    setAnswers(updated);
    setResume(null);
    if (advancing.current) window.clearTimeout(advancing.current);
    advancing.current = window.setTimeout(() => {
      advancing.current = null;
      // When editing from results, jump straight back once the duty is complete.
      if (cameFromResults.current && isComplete(answersRef.current)) {
        cameFromResults.current = false;
        finish();
      } else next();
    }, 260);
  };

  const editStep = (s: number) => {
    cameFromResults.current = true;
    goTo(s);
  };

  const reset = () => {
    setAnswers(EMPTY_ANSWERS);
    setResume(null);
    cameFromResults.current = false;
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    navigate({ search: {}, replace: true, resetScroll: false });
    goTo(0);
  };

  const ranked = useMemo(() => (answers.equipment ? rankProducts(answers) : []), [answers]);

  return (
    <div className="min-h-screen bg-background text-ink">
      <div className="print:hidden">
        <Navbar />
      </div>

      <main className="overflow-x-clip pt-28 sm:pt-32">
        {/* Hero */}
        <section className="mx-auto max-w-7xl px-4 sm:px-8 print:hidden">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-brass" /> Find my seal
              </div>
              <h1 className="mt-4 font-display text-4xl font-black leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">
                The right seal for your duty,{" "}
                <span className="italic text-brass">in a minute.</span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Tell us about your equipment and what it pumps. You get the seal type, face
                materials, elastomer and arrangement our engineers would pick, ready to quote.
              </p>
            </div>
            <dl className="grid grid-cols-3 gap-2 sm:gap-3 max-w-md xl:w-[400px] xl:max-w-none xl:shrink-0">
              {[
                { k: "6", v: "quick questions" },
                { k: "60s", v: "to a full spec" },
                { k: "1 day", v: "quote turnaround" },
              ].map((s) => (
                <div
                  key={s.v}
                  className="rounded-2xl border border-hairline bg-surface px-3 py-3 sm:px-4 sm:py-4 shadow-soft"
                >
                  <dt className="font-display text-xl font-black tracking-tight sm:text-2xl">
                    {s.k}
                  </dt>
                  <dd className="mt-0.5 text-[11px] leading-tight text-muted-foreground sm:text-xs">
                    {s.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <div ref={topRef} className="mx-auto mt-10 max-w-7xl px-4 sm:mt-14 sm:px-8">
          {phase === "results" ? (
            <Results answers={answers} ranked={ranked} onEdit={editStep} onReset={reset} />
          ) : (
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-8 xl:grid-cols-[minmax(0,1fr)_340px]">
              <div className="min-w-0">
                {resume && step === 0 && (
                  <ResumeBanner
                    onResume={() => {
                      setAnswers(resume.answers);
                      goTo(resume.step);
                    }}
                    onDismiss={() => setResume(null)}
                  />
                )}
                <div className="relative overflow-hidden rounded-[28px] border border-hairline bg-surface shadow-lift">
                  {phase === "matching" ? (
                    <Matching />
                  ) : (
                    <QuestionCard
                      step={step}
                      answers={answers}
                      setAnswers={setAnswers}
                      pick={pick}
                      onBack={() => goTo(Math.max(0, step - 1))}
                      onNext={() => {
                        if (cameFromResults.current && isComplete(answers)) {
                          cameFromResults.current = false;
                          finish();
                        } else next();
                      }}
                      onFinish={finish}
                      onJump={goTo}
                    />
                  )}
                </div>
              </div>

              <aside className="lg:sticky lg:top-28 lg:self-start">
                <DutySheet answers={answers} step={step} onJump={goTo} />
                <LiveMatch top={ranked[0]} hasEquipment={!!answers.equipment} />
                <HelpBox />
              </aside>
            </div>
          )}
        </div>
      </main>

      <div className="mt-24 sm:mt-32 print:hidden">
        <Footer />
      </div>
    </div>
  );
}

/* ───────────── Question flow ───────────── */

function QuestionCard({
  step,
  answers,
  setAnswers,
  pick,
  onBack,
  onNext,
  onFinish,
  onJump,
}: {
  step: number;
  answers: Answers;
  setAnswers: React.Dispatch<React.SetStateAction<Answers>>;
  pick: <K extends "equipment" | "industry" | "media">(key: K, value: Answers[K]) => void;
  onBack: () => void;
  onNext: () => void;
  onFinish: () => void;
  onJump: (s: number) => void;
}) {
  const reduce = useReducedMotion();
  const meta = STEPS[step];
  const singleOptions: Option<string>[] | null =
    step === 0 ? EQUIPMENT : step === 1 ? INDUSTRIES : step === 2 ? MEDIA : null;
  const singleKey = step === 0 ? "equipment" : step === 1 ? "industry" : "media";

  const canContinue =
    step === 3
      ? !!answers.temperature && !!answers.pressure
      : step === 4
        ? true
        : step < 3
          ? !!answers[singleKey as "equipment"]
          : true;

  // Keyboard: number keys pick options, Enter continues.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (
        t &&
        (t.tagName === "INPUT" ||
          t.tagName === "TEXTAREA" ||
          t.tagName === "SELECT" ||
          t.isContentEditable)
      )
        return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (singleOptions) {
        const n = Number(e.key);
        if (n >= 1 && n <= singleOptions.length) {
          e.preventDefault();
          pick(singleKey as "equipment", singleOptions[n - 1].id as never);
        }
      }
      if (e.key === "Enter" && (step === 3 || step === 4) && canContinue) {
        e.preventDefault();
        onNext();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [singleOptions, singleKey, step, canContinue, pick, onNext]);

  return (
    <div className="p-5 sm:p-8 lg:p-10">
      {/* Progress */}
      <div className="flex items-center justify-between gap-4">
        <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Step {step + 1} of {STEPS.length} · <span className="text-brass">{meta.short}</span>
        </div>
        {step > 0 && (
          <button
            type="button"
            onClick={onBack}
            className="inline-flex min-h-10 items-center gap-1.5 rounded-full px-3 text-xs font-semibold text-muted-foreground transition hover:bg-muted hover:text-ink"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back
          </button>
        )}
      </div>
      <div className="mt-3 grid grid-cols-6 gap-1.5" aria-hidden>
        {STEPS.map((s, i) => (
          <button
            key={s.key}
            type="button"
            tabIndex={-1}
            onClick={() => i < step && onJump(i)}
            className={`h-1.5 rounded-full transition-colors duration-500 ${i < step ? "cursor-pointer bg-brass" : i === step ? "bg-brass/60" : "bg-hairline"}`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={step}
          initial={reduce ? { opacity: 0 } : { opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, x: -24 }}
          transition={{ duration: 0.32, ease: EASE_OUT }}
        >
          <h2 className="mt-7 font-display text-2xl font-black tracking-tight sm:text-3xl lg:text-4xl">
            {meta.title}
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {meta.subtitle}
          </p>

          <div className="mt-7">
            {singleOptions && (
              <OptionGrid
                options={singleOptions}
                selected={
                  answers[singleKey as "equipment"]
                    ? [answers[singleKey as "equipment"] as string]
                    : []
                }
                onToggle={(id) => pick(singleKey as "equipment", id as never)}
                iconFor={(id) =>
                  (step === 2 ? (MEDIA_ICONS[id] ?? ICONS[id]) : ICONS[id]) ?? CircleDot
                }
                numbered
              />
            )}

            {step === 3 && <ConditionsStep answers={answers} setAnswers={setAnswers} />}

            {step === 4 && (
              <>
                <OptionGrid
                  options={PRIORITIES}
                  selected={answers.priorities}
                  multi
                  onToggle={(id) =>
                    setAnswers((p) => {
                      const has = p.priorities.includes(id as never);
                      if (has) return { ...p, priorities: p.priorities.filter((x) => x !== id) };
                      if (p.priorities.length >= MAX_PRIORITIES) {
                        toast.info(`Pick up to ${MAX_PRIORITIES}. Remove one to swap.`);
                        return p;
                      }
                      return { ...p, priorities: [...p.priorities, id as never] };
                    })
                  }
                  iconFor={(id) => PRIORITY_ICONS[id] ?? ICONS[id] ?? CircleDot}
                />
                <p className="mt-4 text-xs text-muted-foreground">
                  {answers.priorities.length}/{MAX_PRIORITIES} selected
                  {answers.priorities.length === 0 &&
                    " · You can skip this and we'll balance cost and life."}
                </p>
              </>
            )}

            {step === 5 && <DetailsStep answers={answers} setAnswers={setAnswers} />}
          </div>

          {/* Footer actions */}
          <div className="mt-8 flex flex-col-reverse items-stretch gap-3 border-t border-hairline pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="hidden text-xs text-muted-foreground sm:block">
              {singleOptions ? (
                <>
                  Tip: press <Kbd>1</Kbd>–<Kbd>{singleOptions.length}</Kbd> to choose
                </>
              ) : step === 5 ? (
                "Your answers are saved on this device as you go."
              ) : (
                <>
                  Press <Kbd>Enter</Kbd> to continue
                </>
              )}
            </p>
            {step >= 3 && (
              <div className="flex flex-col-reverse gap-2 sm:flex-row">
                {step === 5 && (
                  <button
                    type="button"
                    onClick={onFinish}
                    className="inline-flex h-12 items-center justify-center rounded-full px-5 text-sm font-semibold text-muted-foreground transition hover:bg-muted hover:text-ink"
                  >
                    Skip details
                  </button>
                )}
                <button
                  type="button"
                  disabled={!canContinue}
                  onClick={step === 5 ? onFinish : onNext}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ink px-6 text-sm font-semibold text-white shadow-soft transition hover:bg-ink/90 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {step === 5
                    ? "Show my recommendation"
                    : step === 4 && answers.priorities.length === 0
                      ? "Skip"
                      : "Continue"}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd className="mx-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-md border border-hairline bg-background px-1 font-sans text-[10px] font-semibold text-ink">
      {children}
    </kbd>
  );
}

function OptionGrid({
  options,
  selected,
  onToggle,
  iconFor,
  multi,
  numbered,
}: {
  options: Option<string>[];
  selected: string[];
  onToggle: (id: string) => void;
  iconFor: (id: string) => LucideIcon;
  multi?: boolean;
  numbered?: boolean;
}) {
  return (
    <div role={multi ? "group" : "radiogroup"} className="grid gap-2.5 sm:grid-cols-2 sm:gap-3">
      {options.map((o, i) => {
        const Icon = iconFor(o.id);
        const on = selected.includes(o.id);
        return (
          <motion.button
            key={o.id}
            type="button"
            role={multi ? "checkbox" : "radio"}
            aria-checked={on}
            onClick={() => onToggle(o.id)}
            whileTap={{ scale: 0.985 }}
            className={`group relative flex min-h-[76px] items-center gap-4 rounded-2xl border px-4 py-3.5 text-left transition-all duration-200 sm:px-5 sm:py-4 ${
              on
                ? "border-brass bg-brass/[0.06] ring-1 ring-brass shadow-soft"
                : "border-hairline bg-background hover:-translate-y-0.5 hover:border-ink/20 hover:bg-surface hover:shadow-soft"
            }`}
          >
            <span
              className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl transition-colors ${
                on
                  ? "bg-brass text-white"
                  : "bg-surface text-ink/70 ring-1 ring-hairline group-hover:text-brass"
              }`}
            >
              <Icon className="h-5 w-5" strokeWidth={1.75} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[15px] font-semibold leading-snug text-ink">
                {o.label}
              </span>
              <span className="mt-0.5 block text-xs leading-snug text-muted-foreground sm:text-[13px]">
                {o.hint}
              </span>
            </span>
            {on ? (
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brass text-white">
                <Check className="h-3.5 w-3.5" strokeWidth={3} />
              </span>
            ) : numbered ? (
              <span className="hidden h-6 w-6 shrink-0 place-items-center rounded-md border border-hairline text-[11px] font-semibold text-muted-foreground sm:grid">
                {i + 1}
              </span>
            ) : multi ? (
              <span className="h-5 w-5 shrink-0 rounded-md border border-hairline" />
            ) : null}
          </motion.button>
        );
      })}
    </div>
  );
}

function ChipGroup<T extends string>({
  label,
  icon: Icon,
  options,
  value,
  onChange,
  optional,
}: {
  label: string;
  icon: LucideIcon;
  options: Option<T>[];
  value?: T;
  onChange: (v: T) => void;
  optional?: boolean;
}) {
  return (
    <fieldset>
      <legend className="flex items-center gap-2 text-sm font-semibold text-ink">
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-brass/10 text-brass">
          <Icon className="h-4 w-4" />
        </span>
        {label}
        {optional && <span className="text-xs font-normal text-muted-foreground">(optional)</span>}
      </legend>
      <div role="radiogroup" className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5">
        {options.map((o) => {
          const on = value === o.id;
          return (
            <button
              key={o.id}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => onChange(o.id)}
              className={`flex min-h-[60px] flex-col items-start justify-center rounded-xl border px-3 py-2 text-left transition-all ${
                on
                  ? "border-brass bg-brass/[0.06] ring-1 ring-brass"
                  : "border-hairline bg-background hover:border-ink/20 hover:bg-surface"
              } ${o.id === "unsure" ? "border-dashed" : ""}`}
            >
              <span className={`text-sm font-semibold ${on ? "text-brass" : "text-ink"}`}>
                {o.label}
              </span>
              <span className="text-[11px] text-muted-foreground">{o.hint}</span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function ConditionsStep({
  answers,
  setAnswers,
}: {
  answers: Answers;
  setAnswers: React.Dispatch<React.SetStateAction<Answers>>;
}) {
  return (
    <div className="grid gap-7">
      <ChipGroup
        label="Operating temperature"
        icon={Thermometer}
        options={TEMPERATURES}
        value={answers.temperature}
        onChange={(v) => setAnswers((p) => ({ ...p, temperature: v }))}
      />
      <ChipGroup
        label="Pressure at the seal"
        icon={Gauge}
        options={PRESSURES}
        value={answers.pressure}
        onChange={(v) => setAnswers((p) => ({ ...p, pressure: v }))}
      />
      {answers.equipment !== "static" && (
        <ChipGroup
          label="Shaft speed"
          icon={Zap}
          options={SPEEDS}
          value={answers.speed}
          onChange={(v) => setAnswers((p) => ({ ...p, speed: v }))}
          optional
        />
      )}
    </div>
  );
}

function DetailsStep({
  answers,
  setAnswers,
}: {
  answers: Answers;
  setAnswers: React.Dispatch<React.SetStateAction<Answers>>;
}) {
  const rotating = answers.equipment !== "static";
  const field = (
    key: "shaft" | "machine" | "existing" | "quantity",
    label: string,
    placeholder: string,
    extra?: React.InputHTMLAttributes<HTMLInputElement>,
  ) => (
    <label className="min-w-0">
      <span className={labelBase}>{label}</span>
      <input
        value={answers[key] ?? ""}
        onChange={(e) => setAnswers((p) => ({ ...p, [key]: e.target.value.slice(0, 80) }))}
        placeholder={placeholder}
        maxLength={80}
        className={`mt-2 ${inputBase}`}
        {...extra}
      />
    </label>
  );
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {field(
        "shaft",
        rotating ? "Shaft / sleeve diameter (mm)" : "Size or flange standard",
        rotating ? "e.g. 35" : 'e.g. 2" ASME 150, DN50',
        rotating ? { inputMode: "decimal" } : undefined,
      )}
      {field(
        "machine",
        rotating ? "Pump or machine make & model" : "Equipment",
        rotating ? "e.g. KSB Etanorm 50-200" : "e.g. Autoclave door, 600 mm",
      )}
      {field("existing", "Current seal brand / part no.", "e.g. John Crane Type 21")}
      {field("quantity", "Quantity", "e.g. 4 nos + 2 spares", { inputMode: "text" })}
      <div className="flex items-start gap-3 rounded-2xl border border-dashed border-hairline bg-background p-4 text-sm text-muted-foreground sm:col-span-2">
        <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-brass" />
        <span>
          Have a photo of the old seal or a drawing? You can attach it on WhatsApp or by email after
          you see your results. A photo next to a ruler is often all we need.
        </span>
      </div>
    </div>
  );
}

function ResumeBanner({ onResume, onDismiss }: { onResume: () => void; onDismiss: () => void }) {
  return (
    <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-brass/30 bg-brass/[0.06] p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3 text-sm">
        <RefreshCw className="h-4 w-4 shrink-0 text-brass" />
        <span className="font-medium text-ink">
          You have an unfinished seal search on this device.
        </span>
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={onDismiss}
          className="h-10 rounded-full px-4 text-xs font-semibold text-muted-foreground hover:text-ink"
        >
          Start fresh
        </button>
        <button
          type="button"
          onClick={onResume}
          className="h-10 rounded-full bg-ink px-4 text-xs font-semibold text-white hover:bg-ink/90"
        >
          Resume
        </button>
      </div>
    </div>
  );
}

function Matching() {
  const lines = [
    "Checking media compatibility",
    "Matching temperature and pressure limits",
    "Choosing faces, elastomer and arrangement",
  ];
  return (
    <div className="flex min-h-[460px] flex-col items-center justify-center p-8 text-center">
      <div className="relative h-20 w-20">
        <div className="absolute inset-0 rounded-full border-4 border-hairline" />
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-brass border-t-transparent" />
        <Cog className="absolute inset-0 m-auto h-8 w-8 animate-[spin_3s_linear_infinite_reverse] text-ink/70" />
      </div>
      <h2 className="mt-7 font-display text-2xl font-black tracking-tight sm:text-3xl">
        Matching your duty
      </h2>
      <ul className="mt-6 grid gap-2.5 text-left text-sm">
        {lines.map((l, i) => (
          <motion.li
            key={l}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.38, duration: 0.3 }}
            className="flex items-center gap-2.5 text-muted-foreground"
          >
            <CheckCircle2 className="h-4 w-4 text-brass" /> {l}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

/* ───────────── Sidebar ───────────── */

function DutySheet({
  answers,
  step,
  onJump,
}: {
  answers: Answers;
  step: number;
  onJump: (s: number) => void;
}) {
  const rows = dutyRows(answers);
  const answered = rows.filter((r) => r.value).length;
  return (
    <details
      open
      className="group rounded-[24px] border border-hairline bg-surface p-5 shadow-soft sm:p-6 [&_summary::-webkit-details-marker]:hidden"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between lg:cursor-default">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Your duty sheet
          </div>
          <div className="mt-1 text-sm font-semibold">
            {answered} of {rows.length} filled
          </div>
        </div>
        <ListChecks className="h-5 w-5 text-brass" />
      </summary>
      <ol className="mt-5 grid gap-1">
        {rows.map((r, i) => {
          const current = i === step;
          const reachable = !!r.value || i <= step;
          return (
            <li key={r.label}>
              <button
                type="button"
                disabled={!reachable}
                onClick={() => onJump(i)}
                className={`flex w-full items-start gap-3 rounded-xl px-2.5 py-2 text-left transition ${current ? "bg-brass/[0.07]" : reachable ? "hover:bg-muted" : "opacity-60"}`}
              >
                <span
                  className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10px] font-bold ${
                    r.value
                      ? "bg-brass text-white"
                      : current
                        ? "border-2 border-brass text-brass"
                        : "border border-hairline text-muted-foreground"
                  }`}
                >
                  {r.value ? <Check className="h-3 w-3" strokeWidth={3} /> : i + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-semibold text-muted-foreground">
                    {r.label}
                  </span>
                  <span
                    className={`block truncate text-sm ${r.value ? "font-medium text-ink" : "text-muted-foreground/70"}`}
                  >
                    {r.value || (i === 4 || i === 5 ? "Optional" : "—")}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </details>
  );
}

function LiveMatch({ top, hasEquipment }: { top?: Match; hasEquipment: boolean }) {
  return (
    <div
      className="mt-4 overflow-hidden rounded-[24px] p-5 text-white shadow-lift sm:p-6"
      style={{ background: "var(--gradient-brand)" }}
    >
      <div className="flex items-center justify-between">
        <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70">
          Live best match
        </div>
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/70 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
        </span>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={top?.product.slug ?? "none"}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
        >
          {hasEquipment && top ? (
            <>
              <div className="mt-3 font-display text-xl font-black tracking-tight">
                {top.product.name}
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/20">
                <motion.div
                  className="h-full rounded-full bg-white"
                  initial={false}
                  animate={{ width: `${top.percent}%` }}
                  transition={{ duration: 0.5, ease: EASE_OUT }}
                />
              </div>
              <div className="mt-2 text-xs text-white/80">
                {top.percent}% · {fitLabel(top.percent)} so far
              </div>
            </>
          ) : (
            <p className="mt-3 text-sm text-white/85">
              Choose your equipment and we'll start narrowing the catalog down.
            </p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function HelpBox() {
  return (
    <div className="mt-4 rounded-[24px] border border-hairline bg-surface p-5 shadow-soft">
      <div className="text-sm font-semibold">Rather talk to an engineer?</div>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
        Send a photo of your old seal. We'll identify it and reply within one working day.
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <a
          href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hi, I need help choosing a mechanical seal.")}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-11 items-center justify-center gap-1.5 rounded-full bg-[#25D366] text-xs font-semibold text-white transition hover:brightness-95"
        >
          <MessageCircle className="h-4 w-4" /> WhatsApp
        </a>
        <a
          href={`tel:${PHONE}`}
          className="inline-flex h-11 items-center justify-center gap-1.5 rounded-full border border-hairline text-xs font-semibold transition hover:bg-muted"
        >
          <Phone className="h-4 w-4" /> Call
        </a>
      </div>
    </div>
  );
}

/* ───────────── Results ───────────── */

type CardProduct = Awaited<ReturnType<typeof getFinderProducts>>[number];

function Results({
  answers,
  ranked,
  onEdit,
  onReset,
}: {
  answers: Answers;
  ranked: Match[];
  onEdit: (s: number) => void;
  onReset: () => void;
}) {
  const reduce = useReducedMotion();
  const [cards, setCards] = useState<Record<string, CardProduct> | null>(null);
  const [failed, setFailed] = useState(false);
  const shortlist = ranked.slice(0, 6);
  const companions = companionsFor(
    answers,
    shortlist.slice(0, 4).map((m) => m.product.slug),
  );

  useEffect(() => {
    let alive = true;
    const slugs = Array.from(
      new Set([...shortlist.map((m) => m.product.slug), ...companions.map((c) => c.slug)]),
    );
    getFinderProducts({ data: { slugs } })
      .then((rows) => {
        if (!alive) return;
        setCards(Object.fromEntries(rows.map((r) => [r.slug, r])));
      })
      .catch(() => alive && setFailed(true));
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answers]);

  // Drop anything the catalog no longer lists (once we know).
  const available = cards ? shortlist.filter((m) => cards[m.product.slug]) : shortlist;
  const top = available[0];
  const alternatives = available.slice(1, 4);
  const spec = buildSpec(answers);
  const tips = watchOuts(answers);
  const todo = checklist(answers);
  const shownCompanions = cards ? companions.filter((c) => cards[c.slug]) : companions;
  const [quoteFor, setQuoteFor] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const requestQuote = (name: string) => {
    setQuoteFor(name);
    formRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  const copySpec = async () => {
    try {
      await navigator.clipboard.writeText(specText(answers, top));
      toast.success("Spec copied. Paste it into an email or WhatsApp.");
    } catch {
      toast.error("Couldn't copy on this browser.");
    }
  };
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied. Anyone with it sees these results.");
    } catch {
      toast.error("Couldn't copy on this browser.");
    }
  };

  if (!top) {
    return (
      <div className="rounded-[28px] border border-hairline bg-surface p-10 text-center shadow-soft">
        <h2 className="font-display text-2xl font-black">We need a closer look at this one</h2>
        <p className="mx-auto mt-2 max-w-md text-muted-foreground">
          Your duty is unusual enough that we'd rather an engineer pick the seal. Send us the
          details below.
        </p>
        <button
          type="button"
          onClick={onReset}
          className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-white"
        >
          <RefreshCw className="h-4 w-4" /> Start over
        </button>
      </div>
    );
  }

  const fade = (delay = 0) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.45, ease: EASE_OUT, delay },
  });

  return (
    <div>
      {/* Summary bar */}
      <motion.div
        {...fade()}
        className="rounded-[28px] border border-hairline bg-surface p-5 shadow-soft sm:p-7"
      >
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-700">
              <CheckCircle2 className="h-3.5 w-3.5" /> Recommendation ready
            </div>
            <h2 className="mt-3 font-display text-2xl font-black tracking-tight sm:text-3xl">
              Here's what your duty needs
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {dutyRows(answers)
                .filter((r) => r.value)
                .map((r) => (
                  <button
                    key={r.label}
                    type="button"
                    onClick={() => onEdit(r.step)}
                    title={`Change ${r.label.toLowerCase()}`}
                    className="group inline-flex max-w-full items-center gap-1.5 rounded-full border border-hairline bg-background px-3 py-1.5 text-xs transition hover:border-brass print:pointer-events-none"
                  >
                    <span className="font-semibold text-muted-foreground">{r.label}:</span>
                    <span className="truncate font-medium text-ink">{r.value}</span>
                    <Pencil className="h-3 w-3 shrink-0 text-muted-foreground transition group-hover:text-brass print:hidden" />
                  </button>
                ))}
            </div>
          </div>
          <div className="grid shrink-0 grid-cols-2 gap-2 sm:flex sm:flex-wrap print:hidden">
            <ActionButton icon={ClipboardCopy} label="Copy spec" onClick={copySpec} />
            <ActionButton icon={Link2} label="Share link" onClick={copyLink} />
            <ActionButton icon={Printer} label="Print / PDF" onClick={() => window.print()} />
            <ActionButton icon={RefreshCw} label="Start over" onClick={onReset} />
          </div>
        </div>
      </motion.div>

      {/* Top match + spec */}
      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        <motion.article
          {...fade(0.08)}
          className="overflow-hidden rounded-[28px] border border-hairline bg-surface shadow-lift"
        >
          <div className="grid sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <ProductImage
              card={cards?.[top.product.slug]}
              loading={!cards && !failed}
              name={top.product.name}
              className="aspect-[4/3] sm:aspect-auto sm:min-h-full"
              big
            />
            <div className="flex flex-col p-6 sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-brass px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
                    <Sparkles className="h-3 w-3" /> Best match
                  </span>
                  <h3 className="mt-3 font-display text-2xl font-black leading-tight tracking-tight sm:text-3xl">
                    {top.product.name}
                  </h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    {cards?.[top.product.slug]?.category.name ?? "Mechanical Seals"}
                  </p>
                </div>
                <ScoreRing pct={top.percent} />
              </div>

              <ul className="mt-5 grid gap-2.5">
                {[...top.product.strengths.slice(0, 2), ...top.reasons.slice(0, 3)].map((r) => (
                  <li key={r} className="flex gap-2.5 text-sm leading-snug">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    <span>{r}</span>
                  </li>
                ))}
                {top.cautions.slice(0, 2).map((c) => (
                  <li key={c} className="flex gap-2.5 text-sm leading-snug text-amber-800">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex flex-col gap-2 pt-6 sm:flex-row print:hidden">
                <button
                  type="button"
                  onClick={() => requestQuote(top.product.name)}
                  className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-white transition hover:bg-ink/90"
                >
                  Get a quote <ArrowRight className="h-4 w-4" />
                </button>
                {cards?.[top.product.slug] && (
                  <Link
                    to="/products/$category/$item"
                    params={{
                      category: cards[top.product.slug].category.slug,
                      item: top.product.slug,
                    }}
                    className="inline-flex h-12 items-center justify-center rounded-full border border-hairline px-5 text-sm font-semibold transition hover:bg-muted"
                  >
                    View product
                  </Link>
                )}
              </div>
            </div>
          </div>
        </motion.article>

        <motion.section
          {...fade(0.14)}
          className="rounded-[28px] border border-hairline bg-surface p-6 shadow-soft sm:p-7"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Recommended specification
              </div>
              <h3 className="mt-1 font-display text-xl font-black tracking-tight">
                What to ask for
              </h3>
            </div>
            <ShieldCheck className="h-6 w-6 text-brass" />
          </div>
          <dl className="mt-5 divide-y divide-hairline">
            {spec.map((r) => (
              <div key={r.label} className="py-3.5 first:pt-0">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  {r.label}
                </dt>
                <dd className="mt-1 text-[15px] font-semibold text-ink">{r.value}</dd>
                <dd className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{r.note}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 rounded-xl bg-muted px-3.5 py-3 text-xs leading-relaxed text-muted-foreground">
            A guide, not a final selection. Our engineers confirm every seal against your drawing,
            old part or data sheet before quoting.
          </p>
        </motion.section>
      </div>

      {/* Alternatives */}
      {alternatives.length > 0 && (
        <motion.section {...fade(0.2)} className="mt-14">
          <SectionHead eyebrow="Shortlist" title="Also worth considering" />
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {alternatives.map((m, i) => {
              const card = cards?.[m.product.slug];
              return (
                <motion.article
                  key={m.product.slug}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.07, duration: 0.4, ease: EASE_OUT }}
                  className="group flex flex-col overflow-hidden rounded-[22px] border border-hairline bg-surface shadow-soft transition hover:-translate-y-0.5 hover:border-brass/40 hover:shadow-lift"
                >
                  <ProductImage
                    card={card}
                    loading={!cards && !failed}
                    name={m.product.name}
                    className="aspect-[16/10]"
                  />
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-baseline justify-between gap-3">
                      <h4 className="font-display text-lg font-black leading-tight tracking-tight">
                        {m.product.name}
                      </h4>
                      <span className="shrink-0 text-sm font-bold text-brass">{m.percent}%</span>
                    </div>
                    <div className="mt-2 h-1 overflow-hidden rounded-full bg-hairline">
                      <div
                        className="h-full rounded-full bg-brass"
                        style={{ width: `${m.percent}%` }}
                      />
                    </div>
                    <p className="mt-3 text-sm leading-snug text-muted-foreground">
                      {m.product.strengths[0]}
                    </p>
                    {m.cautions[0] && (
                      <p className="mt-2 flex gap-1.5 text-xs text-amber-800">
                        <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" />{" "}
                        {m.cautions[0]}
                      </p>
                    )}
                    <div className="mt-auto flex items-center gap-4 pt-4 text-sm font-semibold print:hidden">
                      <button
                        type="button"
                        onClick={() => requestQuote(m.product.name)}
                        className="text-ink underline-offset-4 hover:underline"
                      >
                        Quote this
                      </button>
                      {card && (
                        <Link
                          to="/products/$category/$item"
                          params={{ category: card.category.slug, item: m.product.slug }}
                          className="inline-flex items-center gap-1 text-brass"
                        >
                          Details{" "}
                          <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </motion.section>
      )}

      {/* Watch-outs + checklist */}
      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        <motion.section
          {...fade(0.24)}
          className="rounded-[28px] border border-amber-200/70 bg-amber-50/60 p-6 sm:p-7"
        >
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-amber-100 text-amber-700">
              <AlertTriangle className="h-4.5 w-4.5" />
            </span>
            <h3 className="font-display text-xl font-black tracking-tight">Watch out for</h3>
          </div>
          <ul className="mt-5 grid gap-3">
            {tips.map((t) => (
              <li key={t} className="flex gap-3 text-sm leading-relaxed text-ink/85">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                {t}
              </li>
            ))}
          </ul>
        </motion.section>

        <motion.section
          {...fade(0.28)}
          className="rounded-[28px] border border-hairline bg-surface p-6 shadow-soft sm:p-7"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-brass/10 text-brass">
                <ListChecks className="h-4.5 w-4.5" />
              </span>
              <h3 className="font-display text-xl font-black tracking-tight">For an exact quote</h3>
            </div>
            <span className="text-xs font-semibold text-muted-foreground">
              {todo.filter((t) => t.done).length}/{todo.length} ready
            </span>
          </div>
          <ul className="mt-5 grid gap-2.5">
            {todo.map((t) => (
              <li key={t.label} className="flex items-center gap-3 text-sm">
                <span
                  className={`grid h-5 w-5 shrink-0 place-items-center rounded-md ${t.done ? "bg-emerald-600 text-white" : "border border-hairline"}`}
                >
                  {t.done && <Check className="h-3 w-3" strokeWidth={3} />}
                </span>
                <span
                  className={
                    t.done ? "text-muted-foreground line-through decoration-hairline" : "text-ink"
                  }
                >
                  {t.label}
                </span>
              </li>
            ))}
          </ul>
          {todo.some((t) => !t.done) && (
            <button
              type="button"
              onClick={() => onEdit(5)}
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brass print:hidden"
            >
              Add missing details <ArrowRight className="h-3.5 w-3.5" />
            </button>
          )}
        </motion.section>
      </div>

      {/* Companions */}
      {shownCompanions.length > 0 && (
        <motion.section {...fade(0.3)} className="mt-14">
          <SectionHead eyebrow="Complete the job" title="Pair it with" />
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {shownCompanions.map((c) => {
              const card = cards?.[c.slug];
              return (
                <div
                  key={c.slug}
                  className="flex items-center gap-4 rounded-2xl border border-hairline bg-surface p-3 pr-4 shadow-soft"
                >
                  <ProductImage
                    card={card}
                    loading={!cards && !failed}
                    name={c.name}
                    className="h-16 w-16 shrink-0 rounded-xl"
                    small
                  />
                  <div className="min-w-0">
                    {card ? (
                      <Link
                        to="/products/$category/$item"
                        params={{ category: card.category.slug, item: c.slug }}
                        className="font-semibold leading-tight hover:text-brass"
                      >
                        {c.name}
                      </Link>
                    ) : (
                      <div className="font-semibold leading-tight">{c.name}</div>
                    )}
                    <p className="mt-0.5 text-xs leading-snug text-muted-foreground">{c.why}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.section>
      )}

      {/* Quote */}
      <div ref={formRef} className="scroll-mt-28">
        <QuoteSection
          answers={answers}
          top={top}
          options={available.slice(0, 4).map((m) => m.product.name)}
          quoteFor={quoteFor}
          setQuoteFor={setQuoteFor}
        />
      </div>
    </div>
  );
}

function SectionHead({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        {eyebrow}
      </div>
      <h3 className="mt-1 font-display text-2xl font-black tracking-tight sm:text-3xl">{title}</h3>
    </div>
  );
}

function ActionButton({
  icon: Icon,
  label,
  onClick,
}: {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-hairline bg-background px-4 text-xs font-semibold transition hover:border-ink/20 hover:bg-muted"
    >
      <Icon className="h-4 w-4" /> {label}
    </button>
  );
}

function ScoreRing({ pct }: { pct: number }) {
  const r = 26;
  const c = 2 * Math.PI * r;
  return (
    <div
      className="relative grid h-[68px] w-[68px] shrink-0 place-items-center"
      title={fitLabel(pct)}
    >
      <svg viewBox="0 0 64 64" className="absolute inset-0 -rotate-90">
        <circle cx="32" cy="32" r={r} fill="none" stroke="var(--hairline)" strokeWidth="6" />
        <motion.circle
          cx="32"
          cy="32"
          r={r}
          fill="none"
          stroke="var(--brass)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c * (1 - pct / 100) }}
          transition={{ duration: 1, ease: EASE_OUT, delay: 0.3 }}
        />
      </svg>
      <div className="text-center leading-none">
        <div className="text-base font-black">{pct}%</div>
        <div className="mt-0.5 text-[8px] font-bold uppercase tracking-wider text-muted-foreground">
          match
        </div>
      </div>
    </div>
  );
}

function ProductImage({
  card,
  loading,
  name,
  className = "",
  big,
  small,
}: {
  card?: CardProduct;
  loading: boolean;
  name: string;
  className?: string;
  big?: boolean;
  small?: boolean;
}) {
  if (loading) return <div className={`animate-pulse bg-muted ${className}`} />;
  if (card?.image)
    return (
      <div className={`relative overflow-hidden bg-zinc-100 ${className}`}>
        <img
          src={card.image}
          alt={name}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {big && (
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/10 to-transparent" />
        )}
      </div>
    );
  return (
    <div
      className={`grid place-items-center text-white ${className}`}
      style={{ background: "var(--gradient-brand)" }}
    >
      <Cog className={small ? "h-6 w-6 opacity-80" : "h-12 w-12 opacity-70"} strokeWidth={1.25} />
    </div>
  );
}

/* ───────────── Quote form ───────────── */

function QuoteSection({
  answers,
  top,
  options,
  quoteFor,
  setQuoteFor,
}: {
  answers: Answers;
  top: Match;
  options: string[];
  quoteFor: string | null;
  setQuoteFor: (v: string) => void;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState<string | null>(null);
  const product = quoteFor ?? top.product.name;
  const spec = specText(answers, top);
  const waText = `Hi AARRKKAA, I used Find My Seal on your website.\n\n${spec}\n\nPlease quote for: ${product}`;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const notes = String(data.get("notes") ?? "").trim();
    if (!name) return toast.error("Please enter your name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return toast.error("Please enter a valid email address.");

    const message = [
      `Quote request from Find My Seal`,
      `Product: ${product}`,
      company ? `Company: ${company}` : null,
      phone ? `Phone: ${phone}` : null,
      "",
      spec,
      notes ? `\nNOTES\n${notes}` : null,
    ]
      .filter((l): l is string => l !== null)
      .join("\n")
      .slice(0, 3000);

    setSubmitting(true);
    try {
      const res = await sendContactEmail({
        data: {
          name: name.slice(0, 100),
          email,
          category: "Mechanical Seals",
          subject: `Find My Seal: ${product}`.slice(0, 140),
          message,
        },
      });
      if (res.success) {
        setSent(email);
        toast.success(
          res.mock
            ? "Request logged (dev mode)."
            : "Request sent. We'll reply within one working day.",
        );
      } else toast.error(res.error || "Couldn't send. Please try WhatsApp instead.");
    } catch {
      toast.error("Couldn't send. Please try WhatsApp instead.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section
      className="relative mt-16 overflow-hidden rounded-[32px] p-6 text-white sm:p-10 lg:p-12 print:hidden"
      style={{ background: "var(--gradient-brand)" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/15 blur-3xl"
      />
      <div className="relative grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70">
            Next step
          </div>
          <h3 className="mt-3 font-display text-3xl font-black leading-[1.05] tracking-tight sm:text-4xl">
            Get a firm price on this spec
          </h3>
          <p className="mt-4 max-w-md text-base leading-relaxed text-white/85">
            Your duty sheet and recommendation go with the request, so you don't have to explain it
            twice. We reply within one working day, usually sooner.
          </p>
          <ul className="mt-6 grid gap-2.5 text-sm text-white/90">
            {[
              "Engineer-checked selection",
              "Common sizes ship from stock in Hosur",
              "Dispatch across India and export",
            ].map((t) => (
              <li key={t} className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-white" /> {t}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-2 sm:flex-row">
            <a
              href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(waText)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-ink transition hover:bg-white/90"
            >
              <MessageCircle className="h-4 w-4 text-[#25D366]" /> Send on WhatsApp
            </a>
            <a
              href={`tel:${PHONE}`}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/40 px-5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <Phone className="h-4 w-4" /> +91 78069 36475
            </a>
          </div>
        </div>

        <div className="rounded-[24px] bg-surface p-5 text-ink shadow-lift sm:p-7">
          {sent ? (
            <div className="flex min-h-[360px] flex-col items-center justify-center text-center">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-emerald-500/10 text-emerald-600">
                <CheckCircle2 className="h-7 w-7" />
              </span>
              <h4 className="mt-5 font-display text-2xl font-black tracking-tight">
                Request received
              </h4>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                We'll send the quote for <strong className="text-ink">{product}</strong> to {sent}.
                Got a photo of the old seal? Reply to our email with it.
              </p>
              <button
                type="button"
                onClick={() => setSent(null)}
                className="mt-6 text-sm font-semibold text-brass"
              >
                Send another request
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="grid gap-4">
              <div>
                <span className={labelBase}>Quote for</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {options.map((o) => (
                    <button
                      key={o}
                      type="button"
                      onClick={() => setQuoteFor(o)}
                      aria-pressed={product === o}
                      className={`rounded-full border px-3.5 py-2 text-xs font-semibold transition ${product === o ? "border-brass bg-brass text-white" : "border-hairline hover:border-ink/20"}`}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label>
                  <span className={labelBase}>Name *</span>
                  <input
                    name="name"
                    required
                    maxLength={100}
                    autoComplete="name"
                    placeholder="Full name"
                    className={`mt-2 ${inputBase}`}
                  />
                </label>
                <label>
                  <span className={labelBase}>Email *</span>
                  <input
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    inputMode="email"
                    autoCapitalize="none"
                    spellCheck={false}
                    placeholder="you@company.com"
                    className={`mt-2 ${inputBase}`}
                  />
                </label>
                <label>
                  <span className={labelBase}>Phone</span>
                  <input
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    maxLength={20}
                    placeholder="+91"
                    className={`mt-2 ${inputBase}`}
                  />
                </label>
                <label>
                  <span className={labelBase}>Company</span>
                  <input
                    name="company"
                    autoComplete="organization"
                    maxLength={100}
                    placeholder="Company name"
                    className={`mt-2 ${inputBase}`}
                  />
                </label>
              </div>
              <label>
                <span className={labelBase}>Anything to add?</span>
                <textarea
                  name="notes"
                  rows={3}
                  maxLength={1200}
                  placeholder="Delivery location, exact chemical, deadline…"
                  className={`mt-2 resize-none ${inputBase}`}
                />
              </label>
              <details className="rounded-xl border border-hairline bg-background px-4 py-3 text-xs">
                <summary className="cursor-pointer font-semibold text-muted-foreground">
                  Included with your request
                </summary>
                <pre className="mt-3 whitespace-pre-wrap font-sans leading-relaxed text-ink/80">
                  {spec}
                </pre>
              </details>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ink px-6 text-sm font-semibold text-white transition hover:bg-ink/90 disabled:opacity-60"
              >
                {submitting ? "Sending…" : "Request quote"} <Send className="h-4 w-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
