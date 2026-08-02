"use client";

import { useRef } from "react";
import { MIRAGE } from "@/core/context";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { useGsapReveal } from "@/hooks/useGsapReveal";
import { gsap, revealFromBelow, lineReveal } from "@/lib/gsap";

const DOT_STYLE: Record<string, string> = {
  done: "bg-carbon border-carbon",
  active: "bg-violet border-violet",
  upcoming: "bg-transparent border-stone/40",
};

const LABEL_STYLE: Record<string, string> = {
  done: "text-carbon",
  active: "text-violet",
  upcoming: "text-stone/50",
};

export default function MirageRoadmap() {
  const headerRef = useRef<HTMLDivElement>(null);
  const doneCount = MIRAGE.roadmap.filter((m) => m.status === "done").length;

  const { ref } = useGsapReveal<HTMLElement>((el) => {
    const mm = gsap.matchMedia();
    const steps = () => Array.from(el.querySelectorAll(".mirage-roadmap-step"));
    const connector = el.querySelector<HTMLElement>(".mirage-roadmap-line");

    mm.add("(min-width: 768px)", () => {
      const st = { trigger: el, start: "top 78%", once: true };
      gsap.set([headerRef.current, ...steps()], { opacity: 0, y: 20 });
      if (connector) gsap.set(connector, { scaleX: 0, transformOrigin: "left center" });
      revealFromBelow(headerRef.current, { duration: 0.6, scrollTrigger: st });
      if (connector) lineReveal(connector, { duration: 1.0, delay: 0.2, scrollTrigger: st });
      revealFromBelow(steps(), { duration: 0.55, stagger: 0.1, delay: 0.3, scrollTrigger: st });
      return () => {};
    });

    mm.add("(max-width: 767px)", () => {
      const st = { trigger: el, start: "top 82%", once: true };
      const targets = [headerRef.current, ...steps()];
      gsap.set(targets, { opacity: 0, y: 16 });
      if (connector) gsap.set(connector, { scaleX: 1 });
      revealFromBelow(targets, { duration: 0.5, stagger: 0.07, scrollTrigger: st });
      return () => {};
    });

    return () => mm.revert();
  });

  return (
    <section id="mirage-roadmap" ref={ref} className="w-full bg-travertine py-28 px-6 md:px-12">
      <div className="max-w-5xl mx-auto flex flex-col gap-16">
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 text-left">
          <div className="flex flex-col gap-3 max-w-xl">
            <span className="font-sans text-[10px] tracking-widest text-gold uppercase font-semibold">Release Roadmap</span>
            <h2 className="font-sans text-2xl md:text-3xl font-light text-carbon tracking-tight">Building Toward Public Release</h2>
          </div>
          <div className="font-serif text-3xl md:text-4xl text-carbon/80 tabular-nums">
            <AnimatedNumber target={doneCount} /> <span className="text-lg text-stone font-sans">/ {MIRAGE.roadmap.length} milestones</span>
          </div>
        </div>

        <div className="relative flex flex-col md:flex-row md:items-start gap-8 md:gap-0">
          <div className="mirage-roadmap-line hidden md:block absolute top-[7px] left-0 right-0 h-[1px] bg-carbon/10" />
          {MIRAGE.roadmap.map((step) => (
            <div key={step.label} className="mirage-roadmap-step relative flex-1 flex flex-col items-start gap-3 md:pr-6">
              <span className={`w-3.5 h-3.5 rounded-full border-2 relative z-10 ${DOT_STYLE[step.status]}`} />
              <span className={`font-sans text-xs font-semibold tracking-wide ${LABEL_STYLE[step.status]}`}>{step.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
