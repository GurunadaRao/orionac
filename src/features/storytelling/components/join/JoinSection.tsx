"use client";

import { useRef, useState } from "react";
import { BRAND } from "@/core/context";
import { useGsapReveal } from "@/hooks/useGsapReveal";
import { useMagneticHover } from "@/hooks/useMagneticHover";
import { gsap, Flip, EASE_PREMIUM, EASE_SILK, revealFromBelow, lineReveal } from "@/lib/gsap";

export default function JoinSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const inputLineRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const submitBtnRef = useMagneticHover<HTMLButtonElement>({ strength: 0.25 });

  const { ref: sectionRef } = useGsapReveal<HTMLElement>((el) => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const st: ScrollTrigger.Vars = { trigger: el, start: "top 78%", once: true };

      // Set input line to zero initially
      gsap.set(inputLineRef.current, { scaleX: 0, transformOrigin: "left center" });

      // Glow expands
      gsap.fromTo(glowRef.current,
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.4, ease: EASE_SILK, scrollTrigger: st }
      );

      // Left col reveal
      revealFromBelow(leftColRef.current, { duration: 0.85, scrollTrigger: st });

      // Right col reveal — delayed
      revealFromBelow(rightColRef.current, {
        duration: 0.85,
        delay: 0.14,
        scrollTrigger: st,
      });

      // Input underline draws in
      lineReveal(inputLineRef.current, {
        duration: 0.7,
        delay: 0.5,
        scrollTrigger: st,
      });

      return () => {};
    });

    mm.add("(max-width: 767px)", () => {
      const st: ScrollTrigger.Vars = { trigger: el, start: "top 82%", once: true };
      revealFromBelow([leftColRef.current, rightColRef.current], {
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: st,
      });
      return () => {};
    });

    return () => mm.revert();
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // GSAP Flip for success state swap
    const state = Flip.getState([formRef.current, successRef.current]);
    setSubmitted(true);
    requestAnimationFrame(() => {
      Flip.from(state, {
        duration: 0.5,
        ease: EASE_PREMIUM,
        absolute: true,
      });
    });
  };

  return (
    <section
      id="join"
      ref={sectionRef}
      className="relative w-full bg-travertine overflow-hidden py-32 px-6 md:px-12"
    >
      {/* Radial background glow */}
      <div
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(46,91,255,0.06) 0%, rgba(177,135,249,0.04) 50%, transparent 100%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        {/* Left: Headline + body */}
        <div ref={leftColRef} className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="w-6 h-[1px] bg-stone/30 block" />
            <span className="font-sans text-[9px] tracking-[0.35em] uppercase text-stone font-semibold">
              Stay in the loop
            </span>
          </div>

          <h2
            ref={headlineRef}
            className="font-serif text-[clamp(2.25rem,4.5vw,3.5rem)] font-normal leading-[1.08] tracking-tight text-carbon"
          >
            Stay ahead of<br />the research.
          </h2>

          <p className="font-sans text-sm text-stone/70 leading-relaxed font-light max-w-sm">
            Receive Mirage E-1.0 parameter release notices, research dispatches, and Iceberg program updates from {BRAND.name}. No noise—only signal.
          </p>

          <a
            id="join-partner-cta"
            href="/contact"
            className="inline-flex items-center gap-2 font-sans text-[10px] tracking-widest uppercase text-stone hover:text-carbon transition-colors duration-300 font-semibold group w-fit"
          >
            Partner with us
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
          </a>
        </div>

        {/* Right: Email form */}
        <div ref={rightColRef} className="flex flex-col gap-5">
          {submitted ? (
            <div ref={successRef} className="flex flex-col gap-3 py-6 border-l-2 border-cosmic-blue pl-6">
              <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-cosmic-blue font-semibold">
                Registered
              </span>
              <p className="font-serif text-xl text-carbon font-light">
                You&apos;re on the list.
              </p>
              <p className="font-sans text-xs text-stone/70 font-light leading-relaxed">
                We&apos;ll reach you when Mirage E-1.0 parameters drop and when research milestones ship.
              </p>
            </div>
          ) : (
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="flex flex-col gap-3"
              aria-label="Research newsletter subscription"
            >
              <label htmlFor="join-email" className="font-sans text-[9px] tracking-[0.3em] uppercase text-stone font-semibold">
                Email address
              </label>

              {/* Input with animated underline */}
              <div className="relative pb-1">
                <input
                  id="join-email"
                  type="email"
                  required
                  suppressHydrationWarning
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@institution.edu"
                  className="font-sans text-sm bg-transparent py-3 text-carbon focus:outline-none w-full placeholder:text-stone/30"
                />
                {/* Static underline */}
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-carbon/15" />
                {/* Animated fill line */}
                <div
                  ref={inputLineRef}
                  className="absolute bottom-0 left-0 h-[1px] bg-carbon"
                  style={{ width: "100%", transformOrigin: "left center" }}
                />
              </div>

              <button
                ref={submitBtnRef}
                id="join-subscribe-btn"
                type="submit"
                suppressHydrationWarning
                className="mt-2 inline-flex items-center justify-center gap-2 font-sans text-[11px] tracking-widest uppercase px-7 py-3.5 rounded-full bg-carbon text-travertine hover:bg-cosmic-blue transition-all duration-300 font-semibold w-fit"
              >
                Subscribe to research
                <span>→</span>
              </button>
              <p className="font-sans text-[9px] text-stone/40 font-light leading-relaxed">
                No spam. Unsubscribe anytime. Research notices only.
              </p>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
