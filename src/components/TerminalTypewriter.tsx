/* eslint-disable react-hooks/set-state-in-effect -- Typewriter animation requires timer-driven state updates */
"use client";

import { useState, useEffect } from "react";
import { useReducedMotion } from "motion/react";

const LINES = [
  "$ 正在教 AI 画一只会飞的企鹅",
  "$ 训练模型识别猫咪的心情",
  "$ 让 AI 给你讲一个冷笑话",
  "$ 生成一首关于下雨天的小诗",
  "$ 教 AI 理解「随便」是什么意思",
  "$ 正在用 AI 给多肉植物取名",
  "$ 让 AI 猜你今天想吃什么",
  "$ 训练 AI 学会安慰加班的你",
];

export function TerminalTypewriter() {
  const reduce = useReducedMotion();
  const [currentLine, setCurrentLine] = useState(0);
  const [displayed, setDisplayed] = useState(reduce ? LINES[0] : "");
  const [phase, setPhase] = useState<"typing" | "pausing" | "erasing">("typing");

  // Sync displayed text when reduce-motion preference changes
  useEffect(() => {
    if (reduce) {
      setDisplayed(LINES[currentLine]);
    }
  // Only react to reduce changes, not currentLine
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  useEffect(() => {
    if (reduce) return;

    const line = LINES[currentLine];

    if (phase === "typing") {
      if (displayed.length < line.length) {
        const t = setTimeout(() => setDisplayed(line.slice(0, displayed.length + 1)), 40 + Math.random() * 50);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase("pausing"), 2200);
        return () => clearTimeout(t);
      }
    }

    if (phase === "pausing") {
      const t = setTimeout(() => setPhase("erasing"), 0);
      return () => clearTimeout(t);
    }

    if (phase === "erasing") {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 15);
        return () => clearTimeout(t);
      } else {
        setCurrentLine((prev) => (prev + 1) % LINES.length);
        setPhase("typing");
      }
    }
  }, [displayed, phase, currentLine, reduce]);

  return (
    <div className="font-mono text-sm md:text-base text-accent-deep bg-white rounded-2xl px-5 py-3.5 border border-border shadow-sm inline-flex items-center gap-2 min-w-[340px] md:min-w-[560px]">
      <span className="text-accent select-none">✦</span>
      <span>{displayed}</span>
      <span className="animate-pulse text-accent-cute">✿</span>
    </div>
  );
}
