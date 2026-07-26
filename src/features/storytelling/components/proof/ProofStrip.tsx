"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { GradientMesh } from "@/components/ui/gradient-mesh";

const STATS = [
  { value: "2025", label: "Founded" },
  { value: "Research-First", label: "Methodology" },
  { value: "1", label: "Foundation Model Incoming" },
  { value: "Chennai", label: "Headquarters" },
  { value: "Global", label: "Academic Reach" },
];

const MARQUEE_ITEMS = [
  "Foundation Models",
  "Efficient Architectures",
  "Edge AI",
  "Agentic Systems",
  "AI Literacy",
  "Academic Partnerships",
  "Project-Based Learning",
  "Open Research",
  "Mirage E-1.0",
  "Applied Intelligence",
];

export default function ProofStrip() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    const el = ref.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);

  return (
    <div
      ref={ref}
      className="relative w-full bg-silk border-y border-carbon/5 overflow-hidden"
    >
      <GradientMesh variant="spectrum" className="opacity-40" />

      {/* Stat Row */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 py-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-1 text-left"
          >
            <span className="font-serif text-xl md:text-2xl font-normal text-carbon tracking-tight">
              {stat.value}
            </span>
            <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-stone font-semibold">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Divider */}
      <div className="w-full border-t border-carbon/5" />

      {/* Marquee Strip — seamless full-height rectangular blocks */}
      <div className="relative w-full overflow-hidden h-12">
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-silk to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-silk to-transparent z-10" />

        <div className="flex h-full w-max animate-marquee">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => {
            const isDark = i % 2 === 0;
            return (
              <span
                key={i}
                className={`
                  flex h-full items-center px-8
                  font-sans text-[9px] tracking-[0.28em] uppercase font-semibold
                  whitespace-nowrap select-none
                  ${isDark
                    ? "bg-carbon text-travertine"
                    : "bg-travertine text-carbon border-x border-carbon/8"
                  }
                `}
              >
                {item}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
