"use client";

import { useRef } from "react";
import { MIRAGE, RESEARCH } from "@/core/context";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { BorderBeam } from "@/components/ui/border-beam";
import { useGsapReveal } from "@/hooks/useGsapReveal";
import { gsap, revealFromBelow } from "@/lib/gsap";

export default function MirageArchitecture() {
  const headerRef = useRef<HTMLDivElement>(null);

  const { ref } = useGsapReveal<HTMLElement>((el) => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const st = { trigger: el, start: "top 75%", once: true };
      const cards = el.querySelectorAll(".mirage-arch-card");
      gsap.set([headerRef.current, ...Array.from(cards)], { opacity: 0, y: 24 });
      revealFromBelow(headerRef.current, { duration: 0.65, scrollTrigger: st });
      revealFromBelow(cards, { duration: 0.7, stagger: 0.12, delay: 0.15, scrollTrigger: st });
      return () => {};
    });

    mm.add("(max-width: 767px)", () => {
      const st = { trigger: el, start: "top 82%", once: true };
      const cards = el.querySelectorAll(".mirage-arch-card");
      const targets = [headerRef.current, ...Array.from(cards)];
      gsap.set(targets, { opacity: 0, y: 18 });
      revealFromBelow(targets, { duration: 0.55, stagger: 0.08, scrollTrigger: st });
      return () => {};
    });

    return () => mm.revert();
  });

  return (
    <section id="mirage-architecture" ref={ref} className="w-full bg-silk/30 border-y border-carbon/5 py-28 px-6 md:px-12">
      <div className="max-w-5xl mx-auto flex flex-col gap-12">
        <div ref={headerRef} className="flex flex-col gap-3 max-w-2xl text-left">
          <span className="font-sans text-[10px] tracking-widest text-gold uppercase font-semibold">How It Works</span>
          <h2 className="font-sans text-2xl md:text-3xl font-light text-carbon tracking-tight">The {RESEARCH.upcomingRelease.name} Architecture</h2>
          <p className="font-sans text-xs md:text-sm text-stone leading-relaxed font-light">
            Mirage shifts standard attention weight distributions into sparse, dynamically routed pathways —
            operating at high capacity bounds while preserving local device clock speeds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MIRAGE.architecture.map((step) => (
            <SpotlightCard
              key={step.num}
              glowColor="rgba(177,135,249,0.16)"
              className="mirage-arch-card group relative p-6 bg-white/40 border border-carbon/5 rounded-2xl flex flex-col gap-3 text-left"
            >
              <BorderBeam size={220} duration={7} colorFrom="var(--color-violet)" colorTo="#DEC4FF" borderWidth={1} className="opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="font-serif text-2xl text-gold relative z-10">{step.num}</span>
              <h3 className="font-sans text-lg font-light text-carbon relative z-10">{step.title}</h3>
              <p className="font-sans text-xs text-stone/85 leading-relaxed font-light relative z-10">{step.desc}</p>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
