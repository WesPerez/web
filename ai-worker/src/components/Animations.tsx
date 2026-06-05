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

export function StaggerContainer({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={
        reduce
          ? { hidden: {}, visible: {} }
          : {
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
            }
      }
    >
      {children}
    </motion.div>
  );
}

export function HoverGlow({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ref.current.style.setProperty("--mouse-x", `${x}px`);
    ref.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden rounded-xl ${className ?? ""}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: "radial-gradient(320px circle at var(--mouse-x) var(--mouse-y), rgb(229 57 53 / 0.08), transparent 60%)",
        }}
      />
      {children}
    </div>
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
