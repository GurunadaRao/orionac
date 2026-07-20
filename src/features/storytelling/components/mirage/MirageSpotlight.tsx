"use client";

import { useRef } from "react";
import { GlyphMatrix } from "@/components/ui/glyph-matrix";
import { RESEARCH } from "@/core/context";
import { useGsapReveal } from "@/hooks/useGsapReveal";
import {
  gsap,
  EASE_PREMIUM,
  EASE_SILK,
  splitWordReveal,
  revealFromBelow,
} from "@/lib/gsap";

export default function MirageSpotlight() {
  const badgeRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const typeRef = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const { ref: sectionRef } = useGsapReveal<HTMLElement>(
    (el) => {
      const mm = gsap.matchMedia();

      // ── Desktop ──────────────────────────────────────────────────────────
      mm.add("(min-width: 768px)", () => {
        const st = { trigger: el, start: "top 72%", once: true };

        // Set initial hidden states
        gsap.set(
          [badgeRef.current, eyebrowRef.current, typeRef.current,
           descRef.current, ctaRef.current],
          { opacity: 0, y: 28 }
        );
        gsap.set(glowRef.current, { scale: 0.5, opacity: 0 });
        gsap.set(titleRef.current, { opacity: 0 });

        // Master timeline (scroll-triggered, no pinning)
        const tl = gsap.timeline({ scrollTrigger: st });

        // Glow blooms first
        tl.to(glowRef.current, {
          scale: 1,
          opacity: 1,
          duration: 1.6,
          ease: EASE_SILK,
        }, 0);

        // Badge slides in
        tl.to(badgeRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: EASE_PREMIUM,
        }, 0.1);

        // Eyebrow
        tl.to(eyebrowRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: EASE_PREMIUM,
        }, 0.25);

        // "Mirage E-1.0" — word-split reveal
        tl.add(() => {
          if (!titleRef.current) return;
          gsap.set(titleRef.current, { opacity: 1 });
          splitWordReveal(titleRef.current, {
            duration: 0.85,
            stagger: 0.08,
            y: 60,
            ease: EASE_SILK,
          });
        }, 0.4);

        // Type label
        tl.to(typeRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: EASE_PREMIUM,
        }, 0.85);

        // Description
        tl.to(descRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: EASE_PREMIUM,
        }, 1.0);

        // CTAs
        tl.to(ctaRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: EASE_PREMIUM,
        }, 1.15);

        return () => tl.kill();
      });

      // ── Mobile ────────────────────────────────────────────────────────────
      mm.add("(max-width: 767px)", () => {
        gsap.set(
          [badgeRef.current, eyebrowRef.current, titleRef.current,
           typeRef.current, descRef.current, ctaRef.current],
          { opacity: 0, y: 20 }
        );
        gsap.set(glowRef.current, { scale: 0.6, opacity: 0 });

        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: "top 80%", once: true },
        });

        tl.to(glowRef.current, { scale: 1, opacity: 1, duration: 1.0, ease: EASE_SILK }, 0);
        tl.to(
          [badgeRef.current, eyebrowRef.current, titleRef.current,
           typeRef.current, descRef.current, ctaRef.current],
          { opacity: 1, y: 0, duration: 0.6, ease: EASE_PREMIUM, stagger: 0.07 },
          0.1
        );

        return () => tl.kill();
      });

      return () => mm.revert();
    },
    { respectMotion: true }
  );

  const release = RESEARCH.upcomingRelease;

  return (
    <section
      id="mirage"
      ref={sectionRef}
      className="relative w-full bg-carbon overflow-hidden py-32 px-6 md:px-12"
    >
      {/* Glyph matrix */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <GlyphMatrix
          color="#FAF9F6"
          cellSize={16}
          mutationRate={0.025}
          interval={120}
          fadeBottom={0.75}
          className="w-full h-full opacity-[0.06]"
        />
      </div>

      {/* Animated radial glow */}
      <div
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-[120px] pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse, rgba(177,135,249,0.20) 0%, rgba(46,91,255,0.10) 50%, transparent 100%)",
        }}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-start gap-8">

        {/* Status badge */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-travertine/10 bg-travertine/5"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B187F9] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#B187F9]" />
          </span>
          <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-travertine/50 font-semibold">
            {release.status}
          </span>
        </div>

        {/* Editorial typemark */}
        <div className="flex flex-col gap-2">
          <span
            ref={eyebrowRef}
            className="block font-sans text-[9px] tracking-[0.35em] uppercase text-travertine/30 font-semibold"
          >
            Upcoming Release
          </span>

          {/* GSAP word-split target */}
          <h2
            ref={titleRef}
            className="font-serif text-[clamp(3.5rem,10vw,8rem)] font-normal leading-[0.95] tracking-tight text-travertine"
          >
            {release.name}
          </h2>

          <span
            ref={typeRef}
            className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#B187F9] font-semibold"
          >
            {release.type}
          </span>
        </div>

        {/* Description */}
        <p
          ref={descRef}
          className="font-sans text-sm md:text-base text-travertine/50 max-w-lg leading-relaxed font-light"
        >
          {release.significance}
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex items-center gap-5">
          <a
            id="mirage-waitlist-cta"
            href="#join"
            className="inline-flex items-center gap-2 font-sans text-[11px] tracking-widest uppercase px-7 py-3.5 rounded-full bg-travertine text-carbon hover:bg-[#B187F9] hover:text-white transition-all duration-300 font-semibold"
          >
            Join the waitlist
            <span>→</span>
          </a>
          <a
            id="mirage-research-link"
            href="/research/mirage"
            className="inline-flex items-center gap-1.5 font-sans text-[11px] tracking-widest uppercase text-travertine/30 hover:text-travertine transition-colors duration-300 font-medium group"
          >
            Learn more
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
          </a>
        </div>

      </div>
    </section>
  );
}
