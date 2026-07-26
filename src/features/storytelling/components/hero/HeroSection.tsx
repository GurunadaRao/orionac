"use client";

import React, { useEffect, useRef } from "react";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { Globe } from "@/components/ui/globe";
import { COMPANY } from "@/core/context";
import { gsap, EASE_PREMIUM, EASE_SILK, splitWordReveal } from "@/lib/gsap";
import { useMagneticHover } from "@/hooks/useMagneticHover";

const geistDisplay = Geist({
  subsets: ["latin"],
  variable: "--font-sans-display",
  display: "block",
});

export default function HeroSection() {
  // Refs for animation targets
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowLineRef = useRef<HTMLSpanElement>(null);
  const eyebrowTextRef = useRef<HTMLSpanElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const visionRef = useRef<HTMLParagraphElement>(null);
  const ctaRowRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Magnetic hover on primary CTA
  const primaryCtaRef = useMagneticHover<HTMLAnchorElement>({ strength: 0.3 });
  const secondaryCtaRef = useMagneticHover<HTMLAnchorElement>({ strength: 0.2 });

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // If user prefers reduced motion, just show everything instantly
    if (prefersReduced) {
      gsap.set(
        [eyebrowLineRef.current, eyebrowTextRef.current, h1Ref.current,
         sublineRef.current, visionRef.current, ctaRowRef.current,
         globeRef.current],
        { opacity: 1, y: 0, scaleX: 1 }
      );
      return;
    }

    // Hide everything initially
    gsap.set(
      [eyebrowTextRef.current, sublineRef.current, visionRef.current,
       ctaRowRef.current],
      { opacity: 0, y: 20 }
    );
    gsap.set(eyebrowLineRef.current, { scaleX: 0, transformOrigin: "left center" });
    gsap.set(globeRef.current, { opacity: 0, scale: 0.88 });

    // Build master timeline
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({ delay: 0.1 });

        // 1. Eyebrow line draws in
        tl.to(eyebrowLineRef.current, {
          scaleX: 1,
          duration: 0.6,
          ease: EASE_PREMIUM,
        });

        // 2. Eyebrow text fades in
        tl.to(eyebrowTextRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: EASE_PREMIUM,
        }, "-=0.3");

        // 3. H1 word-split reveal
        const h1El = h1Ref.current;
        if (h1El) {
          tl.add(() => {
            splitWordReveal(h1El, {
              duration: 0.8,
              stagger: 0.05,
              y: 50,
              ease: EASE_SILK,
            });
          }, "-=0.1");
        }

        // 4. Sub-headline
        tl.to(sublineRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: EASE_PREMIUM,
        }, "-=0.3");

        // 5. Vision copy
        tl.to(visionRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: EASE_PREMIUM,
        }, "-=0.4");

        // 6. CTA row
        tl.to(ctaRowRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: EASE_PREMIUM,
        }, "-=0.3");

        // 7. Globe enters
        tl.to(globeRef.current, {
          opacity: 1,
          scale: 1,
          duration: 1.4,
          ease: EASE_SILK,
        }, 0.3); // starts alongside eyebrow, finishes with everything

        // Apple-style pinned zoom-out: hero content settles, then scales
        // down and fades as the user scrolls it away, globe holding a
        // slight zoom — the section stays pinned for the scrub distance.
        const scrubTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=70%",
            scrub: 1,
            pin: true,
            pinSpacing: true,
          },
        });
        scrubTl
          .fromTo(contentRef.current, { scale: 1, opacity: 1, y: 0 }, { scale: 0.92, opacity: 0.25, y: -40, ease: "none" }, 0)
          .fromTo(globeRef.current, { scale: 1 }, { scale: 1.08, ease: "none" }, 0);

        return () => { tl.kill(); scrubTl.kill(); };
      });

      // Mobile — simpler, faster
      mm.add("(max-width: 767px)", () => {
        const tl = gsap.timeline({ delay: 0.1 });

        tl.to(
          [eyebrowTextRef.current, h1Ref.current, sublineRef.current,
           visionRef.current, ctaRowRef.current],
          { opacity: 1, y: 0, duration: 0.6, ease: EASE_PREMIUM, stagger: 0.08 }
        );
        tl.to(eyebrowLineRef.current, { scaleX: 1, duration: 0.4 }, 0);
        tl.to(globeRef.current, { opacity: 1, scale: 1, duration: 0.8 }, 0.2);

        return () => tl.kill();
      });

      return () => mm.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className={cn(
        "relative w-full h-[100dvh] bg-travertine select-none overflow-hidden flex flex-col justify-center pt-16",
        geistDisplay.variable
      )}
      style={{ contentVisibility: "auto" }}
    >
      <noscript>
        <style>{`
          .hero-anim { opacity: 1 !important; transform: none !important; }
        `}</style>
      </noscript>

      <div ref={contentRef} className="w-full max-w-7xl mx-auto px-6 md:px-12 h-full grid grid-cols-12 items-center gap-8 md:gap-12">

        {/* Left: Typography + CTAs */}
        <div className="col-span-12 md:col-span-6 z-20 flex flex-col justify-center text-left">

          {/* Eyebrow */}
          <div className="mb-6 inline-flex items-center gap-3">
            <span
              ref={eyebrowLineRef}
              className="hero-anim w-8 h-[1px] bg-stone/40 block"
              style={{ opacity: 1 }}
            />
            <span
              ref={eyebrowTextRef}
              className="hero-anim font-sans text-xs md:text-sm tracking-[0.35em] uppercase text-stone font-semibold"
            >
              Research-First AI
            </span>
          </div>

          {/* H1 — GSAP word-split target */}
          <h1
            ref={h1Ref}
            className="hero-anim font-serif text-[clamp(4.5rem,10vw,8.5rem)] font-normal leading-[0.98] tracking-tight text-carbon select-text"
          >
            Orionac
          </h1>

          {/* Sub-headline */}
          <p
            ref={sublineRef}
            className="hero-anim mt-6 font-sans text-[clamp(1.25rem,2vw,1.6rem)] text-stone font-light leading-snug tracking-tight select-text"
          >
            Advancing AI research.{" "}
            <br className="hidden md:block" />
            Redefining how the world learns.
          </p>

          {/* Vision copy */}
          <p
            ref={visionRef}
            className="hero-anim mt-6 font-sans text-stone/70 text-base md:text-lg max-w-md leading-relaxed font-light select-text"
          >
            {COMPANY.vision}
          </p>

          {/* CTAs */}
          <div ref={ctaRowRef} className="hero-anim mt-10 flex items-center gap-6 flex-wrap">
            <a
              ref={primaryCtaRef}
              id="hero-primary-cta"
              href="#research"
              className="inline-flex items-center gap-2.5 font-sans text-xs md:text-sm tracking-widest uppercase px-8 py-4 rounded-full bg-carbon text-travertine hover:bg-cosmic-blue transition-colors duration-300 font-semibold shadow-md"
            >
              Explore Research
              <span>→</span>
            </a>
            <a
              ref={secondaryCtaRef}
              id="hero-secondary-cta"
              href="#iceberg"
              className="inline-flex items-center gap-2 font-sans text-xs md:text-sm tracking-widest uppercase text-stone hover:text-carbon transition-colors duration-300 font-semibold group"
            >
              Discover Iceberg
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
            </a>
          </div>
        </div>

        {/* Right: Globe */}
        <div className="col-span-12 md:col-span-6 relative flex items-center justify-center z-10 w-full h-full min-h-[400px] md:min-h-auto">
          <div
            ref={globeRef}
            className="hero-anim relative w-full aspect-square max-w-[500px] md:max-w-[620px] overflow-hidden rounded-full flex items-center justify-center"
          >
            <Globe className="w-full h-full" />
          </div>
        </div>

      </div>
    </section>
  );
}
