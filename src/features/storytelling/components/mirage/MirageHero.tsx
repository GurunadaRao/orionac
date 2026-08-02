"use client";

import { useRef } from "react";
import { GlyphMatrix } from "@/components/ui/glyph-matrix";
import { RESEARCH } from "@/core/context";
import { useGsapReveal } from "@/hooks/useGsapReveal";
import { gsap, EASE_PREMIUM, EASE_SILK, splitWordReveal } from "@/lib/gsap";

export default function MirageHero() {
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const typeRef = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const { ref: sectionRef } = useGsapReveal<HTMLElement>(
    (el) => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const targets = [eyebrowRef.current, typeRef.current, descRef.current, cueRef.current].filter(Boolean);
        gsap.set(targets, { opacity: 0, y: 28 });
        if (glowRef.current) gsap.set(glowRef.current, { opacity: 0, scale: 0.85 });
        if (titleRef.current) gsap.set(titleRef.current, { opacity: 0 });

        const tl = gsap.timeline({ delay: 0.1 });

        if (glowRef.current) {
          tl.to(glowRef.current, { opacity: 1, scale: 1, duration: 1.6, ease: EASE_SILK }, 0);
        }
        if (eyebrowRef.current) {
          tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.55, ease: EASE_PREMIUM }, 0.15);
        }
        tl.add(() => {
          if (!titleRef.current) return;
          gsap.set(titleRef.current, { opacity: 1 });
          splitWordReveal(titleRef.current, { duration: 0.9, stagger: 0.08, y: 70, ease: EASE_SILK });
        }, 0.3);
        if (typeRef.current) {
          tl.to(typeRef.current, { opacity: 1, y: 0, duration: 0.5, ease: EASE_PREMIUM }, 0.75);
        }
        if (descRef.current) {
          tl.to(descRef.current, { opacity: 1, y: 0, duration: 0.6, ease: EASE_PREMIUM }, 0.9);
        }
        if (cueRef.current) {
          tl.to(cueRef.current, { opacity: 1, y: 0, duration: 0.6, ease: EASE_PREMIUM }, 1.15);
        }

        return () => tl.kill();
      });

      mm.add("(max-width: 767px)", () => {
        const targets = [eyebrowRef.current, titleRef.current, typeRef.current, descRef.current, cueRef.current].filter(Boolean);
        gsap.set(targets, { opacity: 0, y: 22 });
        if (glowRef.current) gsap.set(glowRef.current, { opacity: 0, scale: 0.7 });

        const tl = gsap.timeline({ delay: 0.1 });
        if (glowRef.current) {
          tl.to(glowRef.current, { opacity: 1, scale: 1, duration: 1.0, ease: EASE_SILK }, 0);
        }
        tl.to(targets, { opacity: 1, y: 0, duration: 0.6, ease: EASE_PREMIUM, stagger: 0.08 }, 0.1);

        return () => tl.kill();
      });

      return () => mm.revert();
    },
    { respectMotion: true }
  );

  const release = RESEARCH.upcomingRelease;

  return (
    <section
      id="mirage-hero"
      ref={sectionRef}
      className="relative w-full min-h-[92vh] bg-carbon overflow-hidden flex flex-col items-center justify-center text-center py-32 px-6 md:px-12 select-none"
    >
      {/* Dynamic Background Matrix */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <GlyphMatrix color="#FAF9F6" cellSize={14} mutationRate={0.03} interval={100} fadeBottom={0.8} className="w-full h-full opacity-[0.06]" />
      </div>

      {/* Ambient Aura Glow */}
      <div
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[620px] rounded-full blur-[150px] pointer-events-none z-0 opacity-80"
        style={{
          background: "radial-gradient(ellipse at center, rgba(177,135,249,0.3) 0%, rgba(46,91,255,0.15) 45%, rgba(13,13,13,0) 80%)",
        }}
      />

      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center gap-5">
        <span ref={eyebrowRef} className="block font-sans text-xs tracking-[0.35em] uppercase text-violet font-bold">
          Signature Research Release
        </span>

        <h1
          ref={titleRef}
          className="font-serif text-[clamp(4.5rem,14vw,10.5rem)] font-normal leading-[0.92] tracking-tight text-travertine select-text"
        >
          {release.name}
        </h1>

        <span ref={typeRef} className="font-sans text-xs md:text-sm tracking-[0.3em] uppercase text-travertine/60 font-semibold">
          {release.type} · Sparse Dynamic Routing
        </span>

        <p ref={descRef} className="font-sans text-base md:text-lg text-travertine/70 max-w-xl leading-relaxed font-light select-text mt-2">
          {release.significance}
        </p>
      </div>

      {/* Scroll cue */}
      <div ref={cueRef} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-travertine/35 font-semibold">Scroll</span>
        <span className="w-[1px] h-8 bg-travertine/20" />
      </div>
    </section>
  );
}
