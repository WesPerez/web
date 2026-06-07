"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useReducedMotion, useInView } from "motion/react";

export function RevealOnScroll({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function CountUp({ target, suffix = "", duration = 2 }: { target: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const reduce = useReducedMotion();

  return (
    <motion.span
      ref={ref}
      className="tabular-nums"
      initial={reduce ? false : { opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
    >
      {reduce ? (
        `${target}${suffix}`
      ) : (
        <CounterInner target={target} suffix={suffix} duration={duration} isInView={isInView} />
      )}
    </motion.span>
  );
}

function CounterInner({ target, suffix, duration, isInView }: { target: number; suffix: string; duration: number; isInView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = target / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return <>{count}{suffix}</>;
}

export function ParallaxFloat({ children, className, offset = 20 }: { children: React.ReactNode; className?: string; offset?: number }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      animate={{ y: [-offset, offset, -offset] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
