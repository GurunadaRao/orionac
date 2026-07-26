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
  const statsRef = useRef<HTMLDivElement>(null);

  const { ref: sectionRef } = useGsapReveal<HTMLElement>(
    (el) => {
      const mm = gsap.matchMedia();

      // ── Desktop ──────────────────────────────────────────────────────────
      mm.add("(min-width: 768px)", () => {
        const st = { trigger: el, start: "top 72%", once: true };

        const targets = [
          eyebrowRef.current,
          typeRef.current,
          descRef.current,
          ctaRef.current,
          statsRef.current,
        ].filter(Boolean);

        if (targets.length > 0) {
          gsap.set(targets, { opacity: 0, y: 32 });
        }
        if (glowRef.current) gsap.set(glowRef.current, { opacity: 0 });
        if (titleRef.current) gsap.set(titleRef.current, { opacity: 0 });

        const tl = gsap.timeline({ scrollTrigger: st });

        if (glowRef.current) {
          tl.to(glowRef.current, {
            opacity: 1,
            duration: 1.8,
            ease: EASE_SILK,
          }, 0);
        }

        if (eyebrowRef.current) {
          tl.to(eyebrowRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: EASE_PREMIUM,
          }, 0.2);
        }

        tl.add(() => {
          if (!titleRef.current) return;
          gsap.set(titleRef.current, { opacity: 1 });
          splitWordReveal(titleRef.current, {
            duration: 0.85,
            stagger: 0.08,
            y: 60,
            ease: EASE_SILK,
          });
        }, 0.35);

        if (typeRef.current) {
          tl.to(typeRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: EASE_PREMIUM,
          }, 0.75);
        }

        if (descRef.current) {
          tl.to(descRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: EASE_PREMIUM,
          }, 0.9);
        }

        if (statsRef.current) {
          tl.to(statsRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: EASE_PREMIUM,
          }, 1.05);
        }

        if (ctaRef.current) {
          tl.to(ctaRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: EASE_PREMIUM,
          }, 1.2);
        }

        const scrubTl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
        if (glowRef.current) {
          scrubTl.fromTo(
            glowRef.current,
            { scale: 0.8, y: -60 },
            { scale: 1.3, y: 60, ease: "none" }
          );
        }

        return () => { tl.kill(); scrubTl.kill(); };
      });

      // ── Mobile ────────────────────────────────────────────────────────────
      mm.add("(max-width: 767px)", () => {
        const targets = [
          eyebrowRef.current,
          titleRef.current,
          typeRef.current,
          descRef.current,
          statsRef.current,
          ctaRef.current,
        ].filter(Boolean);

        if (targets.length > 0) {
          gsap.set(targets, { opacity: 0, y: 24 });
        }
        if (glowRef.current) gsap.set(glowRef.current, { scale: 0.6, opacity: 0 });

        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: "top 80%", once: true },
        });

        if (glowRef.current) {
          tl.to(glowRef.current, { scale: 1, opacity: 1, duration: 1.0, ease: EASE_SILK }, 0);
        }
        if (targets.length > 0) {
          tl.to(
            targets,
            { opacity: 1, y: 0, duration: 0.6, ease: EASE_PREMIUM, stagger: 0.07 },
            0.1
          );
        }

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
      className="relative w-full bg-carbon overflow-hidden py-36 px-6 md:px-12 select-none"
    >
      {/* Dynamic Background Matrix */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <GlyphMatrix
          color="#FAF9F6"
          cellSize={14}
          mutationRate={0.03}
          interval={100}
          fadeBottom={0.8}
          className="w-full h-full opacity-[0.07]"
        />
      </div>

      {/* Ambient Multi-layer Aura Glow */}
      <div
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[580px] rounded-full blur-[140px] pointer-events-none z-0 opacity-80"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(177,135,249,0.28) 0%, rgba(46,91,255,0.15) 45%, rgba(13,13,13,0) 80%)",
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Model Spec & Vision */}
        <div className="col-span-12 lg:col-span-7 flex flex-col items-start gap-8">

          {/* Heading Block */}
          <div className="flex flex-col gap-3">
            <span
              ref={eyebrowRef}
              className="block font-sans text-xs tracking-[0.35em] uppercase text-[#B187F9] font-bold"
            >
              Flagship Architecture
            </span>

            <h2
              ref={titleRef}
              className="font-serif text-[clamp(5rem,12vw,10.5rem)] font-normal leading-[0.92] tracking-tight text-travertine select-text"
            >
              {release.name}
            </h2>

            <span
              ref={typeRef}
              className="font-sans text-xs md:text-sm tracking-[0.3em] uppercase text-travertine/60 font-semibold"
            >
              {release.type} · Sparse Dynamic Routing
            </span>
          </div>

          {/* Core Description */}
          <p
            ref={descRef}
            className="font-sans text-base md:text-lg text-travertine/70 max-w-xl leading-relaxed font-light select-text"
          >
            {release.significance}
          </p>

          {/* Action CTAs */}
          <div ref={ctaRef} className="flex items-center gap-6 flex-wrap pt-2">
            <a
              id="mirage-waitlist-cta"
              href="#join"
              className="inline-flex items-center gap-3 font-sans text-xs md:text-sm tracking-widest uppercase px-8 py-4 rounded-full bg-travertine text-carbon hover:bg-[#B187F9] hover:text-white transition-all duration-300 font-bold shadow-lg hover:shadow-[#B187F9]/30"
            >
              Join the waitlist
              <span className="text-base">→</span>
            </a>
            <a
              id="mirage-research-link"
              href="/research/mirage"
              className="inline-flex items-center gap-2 font-sans text-xs md:text-sm tracking-widest uppercase text-travertine/50 hover:text-travertine transition-colors duration-300 font-semibold group border-b border-travertine/10 pb-0.5 hover:border-travertine"
            >
              Read Architecture Paper
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>

        {/* Right Column: Spec Cards & Interactive Orb */}
        <div ref={statsRef} className="col-span-12 lg:col-span-5 grid grid-cols-2 gap-4 mt-6 lg:mt-0">
          
          {/* Card 1: Efficiency */}
          <div className="col-span-1 p-6 rounded-2xl border border-travertine/10 bg-travertine/[0.03] backdrop-blur-xl flex flex-col justify-between h-40 hover:border-[#B187F9]/40 transition-colors group">
            <span className="text-xs font-sans tracking-widest text-travertine/40 uppercase font-semibold">
              Latency Target
            </span>
            <div>
              <div className="text-3xl md:text-4xl font-serif text-travertine group-hover:text-[#B187F9] transition-colors">
                &lt; 14ms
              </div>
              <p className="text-xs text-travertine/50 font-sans mt-1">Real-time local inference</p>
            </div>
          </div>

          {/* Card 2: Memory */}
          <div className="col-span-1 p-6 rounded-2xl border border-travertine/10 bg-travertine/[0.03] backdrop-blur-xl flex flex-col justify-between h-40 hover:border-[#B187F9]/40 transition-colors group">
            <span className="text-xs font-sans tracking-widest text-travertine/40 uppercase font-semibold">
              VRAM Footprint
            </span>
            <div>
              <div className="text-3xl md:text-4xl font-serif text-travertine group-hover:text-[#B187F9] transition-colors">
                4.2 GB
              </div>
              <p className="text-xs text-travertine/50 font-sans mt-1">Quantized INT4 weights</p>
            </div>
          </div>

          {/* Card 3: Wide Highlight Card */}
          <div className="col-span-2 p-6 rounded-2xl border border-travertine/10 bg-gradient-to-r from-travertine/[0.05] via-travertine/[0.02] to-transparent backdrop-blur-xl flex flex-col justify-between hover:border-[#B187F9]/40 transition-colors group relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-32 h-32 rounded-full bg-[#B187F9]/10 blur-2xl group-hover:bg-[#B187F9]/20 transition-colors" />
            <span className="text-xs font-sans tracking-widest text-[#B187F9] uppercase font-bold">
              Core Benchmark Breakthrough
            </span>
            <div className="mt-3">
              <div className="text-2xl md:text-3xl font-serif text-travertine">
                3.8× Efficiency Ratio
              </div>
              <p className="text-xs md:text-sm text-travertine/60 font-sans mt-1 leading-relaxed">
                Outperforms standard dense transformers while consuming a fraction of compute overhead.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
