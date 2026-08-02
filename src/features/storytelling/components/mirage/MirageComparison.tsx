"use client";

import { useRef } from "react";
import { MIRAGE } from "@/core/context";
import { useGsapReveal } from "@/hooks/useGsapReveal";
import { gsap, revealFromBelow, lineReveal } from "@/lib/gsap";

export default function MirageComparison() {
  const headerRef = useRef<HTMLDivElement>(null);

  const { ref } = useGsapReveal<HTMLElement>((el) => {
    const mm = gsap.matchMedia();
    const rows = () => Array.from(el.querySelectorAll(".mirage-cmp-row"));
    const dividers = () => Array.from(el.querySelectorAll(".mirage-cmp-divider"));

    mm.add("(min-width: 768px)", () => {
      const st = { trigger: el, start: "top 75%", once: true };
      gsap.set([headerRef.current, ...rows()], { opacity: 0, y: 20 });
      gsap.set(dividers(), { scaleX: 0, transformOrigin: "left center" });
      revealFromBelow(headerRef.current, { duration: 0.6, scrollTrigger: st });
      revealFromBelow(rows(), { duration: 0.55, stagger: 0.1, delay: 0.15, scrollTrigger: st });
      dividers().forEach((d, i) => lineReveal(d, { duration: 0.7, delay: 0.3 + i * 0.08, scrollTrigger: st }));
      return () => {};
    });

    mm.add("(max-width: 767px)", () => {
      const st = { trigger: el, start: "top 82%", once: true };
      const targets = [headerRef.current, ...rows()];
      gsap.set(targets, { opacity: 0, y: 16 });
      gsap.set(dividers(), { scaleX: 1 });
      revealFromBelow(targets, { duration: 0.5, stagger: 0.07, scrollTrigger: st });
      return () => {};
    });

    return () => mm.revert();
  });

  return (
    <section id="mirage-comparison" ref={ref} className="w-full bg-carbon py-28 px-6 md:px-12">
      <div className="max-w-4xl mx-auto flex flex-col gap-12">
        <div ref={headerRef} className="flex flex-col gap-3 text-left">
          <span className="font-sans text-[10px] tracking-widest text-violet uppercase font-semibold">Benchmark Positioning</span>
          <h2 className="font-serif text-2xl md:text-3xl font-normal text-travertine tracking-tight">Mirage vs. Standard Dense Transformer</h2>
        </div>

        <div className="flex flex-col border border-travertine/10 rounded-2xl overflow-hidden bg-travertine/[0.02]">
          {/* Column headers */}
          <div className="grid grid-cols-3 px-6 py-4 text-[10px] font-sans tracking-widest uppercase text-travertine/40 font-semibold border-b border-travertine/10">
            <span>Metric</span>
            <span className="text-violet">Mirage E-1.0</span>
            <span>Standard Dense</span>
          </div>

          {MIRAGE.comparison.map((row, idx) => (
            <div key={row.metric}>
              <div className="mirage-cmp-row grid grid-cols-3 items-center px-6 py-5">
                <span className="font-sans text-xs md:text-sm text-travertine/60 font-light">{row.metric}</span>
                <span className="font-serif text-base md:text-lg text-travertine">{row.mirage}</span>
                <span className="font-sans text-xs md:text-sm text-travertine/40 font-light">{row.baseline}</span>
              </div>
              {idx < MIRAGE.comparison.length - 1 && (
                <div className="mirage-cmp-divider h-[1px] bg-travertine/10" style={{ transformOrigin: "left center" }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
