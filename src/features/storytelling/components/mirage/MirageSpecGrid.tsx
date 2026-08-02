"use client";

import { useRef } from "react";
import { MIRAGE } from "@/core/context";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { useGsapReveal } from "@/hooks/useGsapReveal";
import { gsap, revealFromBelow } from "@/lib/gsap";

export default function MirageSpecGrid() {
  const labelRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const { ref } = useGsapReveal<HTMLElement>((el) => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const st = { trigger: el, start: "top 78%", once: true };
      gsap.set(labelRef.current, { opacity: 0, y: 20 });
      revealFromBelow(labelRef.current, { duration: 0.6, scrollTrigger: st });
      const cards = el.querySelectorAll(".mirage-spec-card");
      gsap.set(cards, { opacity: 0, y: 24 });
      revealFromBelow(cards, { duration: 0.7, stagger: 0.1, delay: 0.1, scrollTrigger: st });
      return () => {};
    });

    mm.add("(max-width: 767px)", () => {
      const st = { trigger: el, start: "top 82%", once: true };
      const targets = [labelRef.current, ...Array.from(el.querySelectorAll(".mirage-spec-card"))];
      gsap.set(targets, { opacity: 0, y: 18 });
      revealFromBelow(targets, { duration: 0.55, stagger: 0.08, scrollTrigger: st });
      return () => {};
    });

    return () => mm.revert();
  });

  return (
    <section id="mirage-specs" ref={ref} className="relative w-full bg-carbon py-24 px-6 md:px-12 border-t border-travertine/5">
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col gap-10">
        <div ref={labelRef} className="flex flex-col gap-2">
          <span className="font-sans text-[10px] tracking-[0.35em] uppercase text-violet font-semibold">Spec Sheet</span>
          <h2 className="font-serif text-2xl md:text-3xl font-normal text-travertine tracking-tight">Parameters &amp; Targets</h2>
          <p className="font-sans text-[11px] text-travertine/40 font-light max-w-lg mt-1">{MIRAGE.disclaimer}</p>
        </div>

        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {MIRAGE.metrics.map((m) => (
            <SpotlightCard
              key={m.label}
              glowColor="rgba(177,135,249,0.22)"
              className="mirage-spec-card p-6 rounded-2xl border border-travertine/10 bg-travertine/[0.03] backdrop-blur-xl flex flex-col justify-between min-h-[150px] hover:border-violet/40 transition-colors"
            >
              <span className="text-[10px] font-sans tracking-widest text-travertine/40 uppercase font-semibold relative z-10">
                {m.label}
              </span>
              <div className="relative z-10">
                <div className="text-2xl md:text-3xl font-serif text-travertine">{m.value}</div>
                <p className="text-[11px] text-travertine/50 font-sans mt-1 leading-relaxed">{m.detail}</p>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
