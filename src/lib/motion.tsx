import { motion, useInView, useReducedMotion, animate, type Variants } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

/* Shared motion language for the public site.
   One easing curve and two springs, so every reveal, hover and transition feels like the same hand made it.
   Reduced motion is handled globally by <MotionConfig reducedMotion="user"> in __root.tsx:
   transforms are dropped and only opacity animates. */

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** Soft, settled spring for content entering the screen. */
export const SPRING_SOFT = { type: "spring", stiffness: 140, damping: 22, mass: 0.9 } as const;

/** Quick spring for hover and press feedback. */
export const SPRING_SNAPPY = { type: "spring", stiffness: 420, damping: 30 } as const;

export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      ...SPRING_SOFT,
      opacity: { duration: 0.5, ease: EASE_OUT },
      filter: { duration: 0.5, ease: EASE_OUT },
    },
  },
};

export const staggerParent = (stagger = 0.07, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
});

/** Fades, lifts and un-blurs its children once they scroll into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "header";
}) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      variants={revealVariants}
      transition={{ delay }}
    >
      {children}
    </Comp>
  );
}

/** Splits a heading into words that rise into place one after another. */
export function WordReveal({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");
  return (
    <motion.span
      className={className}
      initial="hidden"
      animate="show"
      variants={staggerParent(0.06, delay)}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span
          key={i}
          aria-hidden
          className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom"
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "105%", opacity: 0 },
              show: {
                y: "0%",
                opacity: 1,
                transition: { ...SPRING_SOFT, opacity: { duration: 0.35 } },
              },
            }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/** Counts up to `target` once visible, on the animation frame clock. */
export function CountUp({
  target,
  suffix = "",
  className,
}: {
  target: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setValue(target);
      return;
    }
    const controls = animate(0, target, {
      duration: 1.4,
      ease: EASE_OUT,
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, target, reduce]);

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  );
}
