"use client";

import { useRef } from "react";
import { COMPANY } from "@/core/context";
import { useGsapReveal } from "@/hooks/useGsapReveal";
import { gsap, EASE_PREMIUM, revealFromBelow } from "@/lib/gsap";
import { GradientMesh } from "@/components/ui/gradient-mesh";

// Bento sizing per card index — first item is a featured 2x2 tile,
// second is a wide 2x1 tile, remaining two fill the row beneath it.
const BENTO_SPAN = [
  "sm:col-span-2 lg:row-span-2 min-h-[220px] sm:min-h-[460px] lg:min-h-0",
  "lg:col-span-2 min-h-[220px]",
  "min-h-[220px]",
  "min-h-[220px]",
];

const CARD_ACCENTS = [
  "hover:border-violet/40 hover:shadow-[0_0_40px_rgba(177,135,249,0.08)]",
  "hover:border-gold/40 hover:shadow-[0_0_40px_rgba(194,162,124,0.08)]",
  "hover:border-stone/30 hover:shadow-[0_0_40px_rgba(112,112,112,0.06)]",
  "hover:border-cosmic-blue/30 hover:shadow-[0_0_40px_rgba(46,91,255,0.06)]",
];

export default function MissionGrid() {
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const { ref: sectionRef } = useGsapReveal<HTMLElement>((el) => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Header: label + headline
      revealFromBelow(headerRef.current, {
        duration: 0.7,
        scrollTrigger: { trigger: el, start: "top 78%", once: true },
      });

      // Cards: stagger bottom-up reveal
      gsap.fromTo(
        cardsRef.current?.querySelectorAll(".mission-card") ?? [],
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: EASE_PREMIUM,
          scrollTrigger: { trigger: cardsRef.current, start: "top 80%", once: true },
        }
      );

      // Card verbs: slight upward nudge on scroll entry (storytelling beat)
      gsap.fromTo(
        cardsRef.current?.querySelectorAll(".mission-verb") ?? [],
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: EASE_PREMIUM,
          scrollTrigger: { trigger: cardsRef.current, start: "top 75%", once: true },
        }
      );

      return () => {};
    });

    mm.add("(max-width: 767px)", () => {
      revealFromBelow(
        [headerRef.current, ...(Array.from(cardsRef.current?.querySelectorAll(".mission-card") ?? []))],
        {
          duration: 0.6,
          stagger: 0.08,
          scrollTrigger: { trigger: el, start: "top 82%", once: true },
        }
      );
      return () => {};
    });

    return () => mm.revert();
  });

  return (
    <section
      id="mission"
      ref={sectionRef}
      className="relative w-full bg-travertine py-24 px-6 md:px-12 overflow-hidden"
    >
      <GradientMesh variant="warm" className="opacity-20" />

      <div className="relative w-full max-w-5xl mx-auto">

        {/* Section header */}
        <div ref={headerRef} className="flex flex-col gap-4 mb-14 text-left">
          <div className="flex items-center gap-3">
            <span className="w-6 h-[1px] bg-stone/30 block" />
            <span className="font-sans text-[9px] tracking-[0.35em] uppercase text-stone font-semibold">
              Our Mission
            </span>
          </div>
          <h2 className="font-serif text-[clamp(2rem,4vw,3.25rem)] font-normal leading-[1.1] text-carbon tracking-tight max-w-lg">
            Four verbs.<br />One direction.
          </h2>
        </div>

        {/* Bento grid — featured 2x2 tile + wide tile + two fillers */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-4">
          {COMPANY.mission.map((item, i) => (
            <div
              key={item.verb}
              className={`mission-card group relative flex flex-col justify-between bg-silk border border-carbon/5 rounded-2xl p-8 transition-all duration-500 cursor-default ${BENTO_SPAN[i]} ${CARD_ACCENTS[i]}`}
            >
              {/* Card number */}
              <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-stone/30 font-semibold">
                0{i + 1}
              </span>

              {/* Verb */}
              <div className="mt-auto">
                <h3 className={`mission-verb font-serif font-normal text-carbon leading-none tracking-tight group-hover:-translate-y-0.5 transition-transform duration-300 ${i === 0 ? "text-[clamp(2.25rem,4.5vw,3.25rem)]" : "text-[clamp(1.75rem,3.5vw,2.25rem)]"}`}>
                  {item.verb}
                </h3>
                <p className="mt-3 font-sans text-xs text-stone leading-relaxed font-light max-w-[280px]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
