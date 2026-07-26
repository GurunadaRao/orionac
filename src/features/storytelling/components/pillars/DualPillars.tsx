"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { RESEARCH, ICEBERG } from "@/core/context";
import { BorderBeam } from "@/components/ui/border-beam";
import { GradientMesh } from "@/components/ui/gradient-mesh";
import { useGsapReveal } from "@/hooks/useGsapReveal";
import { gsap, EASE_PREMIUM, EASE_SILK, revealFromBelow, lineReveal } from "@/lib/gsap";

/* ─── Mouse-tracking spotlight glow ─────────────────────────── */
function SpotlightCard({
  children,
  className = "",
  glowColor = "rgba(46,91,255,0.18)",
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [spotlight, setSpotlight] = useState({ x: "50%", y: "50%" });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSpotlight({ x: `${x}%`, y: `${y}%` });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Mouse-tracking radial glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${spotlight.x} ${spotlight.y}, ${glowColor}, transparent 70%)`,
        }}
      />
      {children}
    </div>
  );
}

/* ─── Animated counter ───────────────────────────────────────── */
function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const step = Math.ceil(target / 40);
          const interval = setInterval(() => {
            start = Math.min(start + step, target);
            setDisplay(start);
            if (start >= target) clearInterval(interval);
          }, 30);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

/* ─── List item (plain — GSAP drives entrance) ───────────────── */
function ListItem({
  text,
  dot,
  light = false,
  className = "",
}: {
  text: string;
  dot: string;
  light?: boolean;
  className?: string;
}) {
  return (
    <li className={`gsap-list-item flex items-center gap-3 group/item ${className}`}>
      <span
        className={`flex-shrink-0 w-1.5 h-1.5 rounded-full ${dot} transition-transform duration-300 group-hover/item:scale-150`}
      />
      <span className={`font-sans text-xs leading-relaxed font-light ${
        light ? "text-travertine/55 group-hover/item:text-travertine/90" : "text-stone group-hover/item:text-carbon"
      } transition-colors duration-200`}>
        {text}
      </span>
    </li>
  );
}

/* ─── Main Component ─────────────────────────────────────────── */
export default function DualPillars() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const leftDividerRef = useRef<HTMLDivElement>(null);
  const rightDividerRef = useRef<HTMLDivElement>(null);
  const sectionLabelRef = useRef<HTMLDivElement>(null);

  const { ref } = useGsapReveal<HTMLElement>((el) => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const st: ScrollTrigger.Vars = { trigger: el, start: "top 75%", once: true };
      const stCards: ScrollTrigger.Vars = { trigger: el, start: "top 70%", once: true };

      // Set dividers to invisible initially
      gsap.set([leftDividerRef.current, rightDividerRef.current], { scaleX: 0, transformOrigin: "left center" });

      // Section label
      revealFromBelow(sectionLabelRef.current, { duration: 0.6, scrollTrigger: st });

      // Headline
      revealFromBelow(headlineRef.current, { duration: 0.8, delay: 0.08, scrollTrigger: st });

      // Left card — clip-path curtain reveal from bottom
      gsap.fromTo(
        leftCardRef.current,
        { clipPath: "inset(100% 0% 0% 0%)", opacity: 1 },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: EASE_SILK, scrollTrigger: stCards }
      );

      // Right card — clip-path curtain, 120ms stagger
      gsap.fromTo(
        rightCardRef.current,
        { clipPath: "inset(100% 0% 0% 0%)", opacity: 1 },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, delay: 0.12, ease: EASE_SILK, scrollTrigger: stCards }
      );

      // Divider lines
      lineReveal(leftDividerRef.current, { duration: 0.8, delay: 0.6, scrollTrigger: stCards });
      lineReveal(rightDividerRef.current, { duration: 0.8, delay: 0.72, scrollTrigger: stCards });

      // List items — stagger from left
      gsap.fromTo(
        el.querySelectorAll(".gsap-list-item"),
        { opacity: 0, x: -14 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.06, ease: EASE_PREMIUM,
          scrollTrigger: { trigger: el, start: "top 65%", once: true } }
      );

      return () => {};
    });

    mm.add("(max-width: 767px)", () => {
      const st: ScrollTrigger.Vars = { trigger: el, start: "top 80%", once: true };
      revealFromBelow(
        [sectionLabelRef.current, headlineRef.current, leftCardRef.current, rightCardRef.current],
        { duration: 0.7, stagger: 0.1, scrollTrigger: st }
      );
      gsap.fromTo(
        el.querySelectorAll(".gsap-list-item"),
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: EASE_PREMIUM,
          scrollTrigger: { trigger: el, start: "top 70%", once: true } }
      );
      return () => {};
    });

    return () => mm.revert();
  });

  return (
    <section
      id="research"
      ref={ref}
      className="relative w-full bg-travertine py-28 px-6 md:px-12 overflow-hidden"
    >
      <GradientMesh variant="cool" className="opacity-25 h-[70%]" />

      {/* ── Section header ── */}
      <div className="relative z-10 w-full max-w-5xl mx-auto mb-16">
        <div ref={sectionLabelRef} className="flex items-center gap-3 mb-5">
          <span className="w-6 h-[1px] bg-stone/30 block" />
          <span className="font-sans text-[9px] tracking-[0.35em] uppercase text-stone font-semibold">
            Our Verticals
          </span>
        </div>

        <h2
          ref={headlineRef}
          className="font-serif text-[clamp(2.25rem,5vw,4rem)] font-normal leading-[1.06] tracking-tight text-carbon max-w-xl"
        >
          Two divisions.<br />
          <span className="text-stone/40">One direction.</span>
        </h2>
      </div>

      {/* ── Pillar Grid ── */}
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* ── Research Pillar ── */}
        <div ref={leftCardRef}>
          <SpotlightCard
            glowColor="rgba(177,135,249,0.25)"
            className="group bg-carbon rounded-3xl p-10 flex flex-col min-h-[560px] transition-transform duration-500 hover:-translate-y-1 hover:shadow-[0_32px_80px_rgba(0,0,0,0.35)]"
          >
            <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full blur-[80px] pointer-events-none transition-all duration-700 group-hover:scale-125 group-hover:opacity-80" style={{ background: 'rgba(177,135,249,0.22)' }} />
            <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full blur-[60px] pointer-events-none" style={{ background: 'rgba(177,135,249,0.10)' }} />
            <BorderBeam size={300} duration={6} colorFrom="#B187F9" colorTo="#DEC4FF" borderWidth={1} className="opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-start justify-between mb-8">
                <span className="font-sans text-[9px] tracking-[0.35em] uppercase text-travertine/25 font-semibold">01 — Research</span>
                <span className="font-serif text-[2.5rem] font-normal text-travertine/10 leading-none tabular-nums">
                  <AnimatedNumber target={4} />
                </span>
              </div>

              <h3 className="font-serif text-[clamp(1.85rem,3.2vw,2.6rem)] font-normal leading-[1.1] text-travertine tracking-tight">
                Efficient AI,<br />built from<br />first principles.
              </h3>

              <div ref={leftDividerRef} className="mt-8 mb-6 h-[1px] bg-travertine/10" style={{ transformOrigin: 'left center' }} />

              <ul className="flex flex-col gap-3 flex-1">
                {RESEARCH.principles.map((p, i) => (
                  <ListItem key={i} text={p.label} dot="bg-[#B187F9]" light />
                ))}
              </ul>

              <a id="research-pillar-cta" href="/research" className="mt-10 group/cta inline-flex items-center gap-3 w-fit">
                <span className="font-sans text-[10px] tracking-widest uppercase text-travertine/40 group-hover/cta:text-travertine transition-colors duration-300 font-semibold">View Research</span>
                <span className="flex items-center justify-center w-7 h-7 rounded-full border border-travertine/15 group-hover/cta:border-[#B187F9] group-hover/cta:bg-[#B187F9] transition-all duration-300 text-travertine/40 group-hover/cta:text-white text-xs">→</span>
              </a>
            </div>
          </SpotlightCard>
        </div>

        {/* ── Iceberg Pillar ── */}
        <div ref={rightCardRef} id="iceberg">
          <SpotlightCard
            glowColor="rgba(194,162,124,0.25)"
            className="group bg-silk border border-carbon/6 rounded-3xl p-10 flex flex-col min-h-[560px] transition-transform duration-500 hover:-translate-y-1 hover:shadow-[0_32px_80px_rgba(28,28,30,0.08)]"
          >
            <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-gold/20 rounded-full blur-[80px] pointer-events-none transition-all duration-700 group-hover:scale-125 group-hover:opacity-80" />
            <div className="absolute top-0 right-0 w-40 h-40 bg-gold/8 rounded-full blur-[60px] pointer-events-none" />
            <BorderBeam size={300} duration={7} colorFrom="#C2A27C" colorTo="#E8D5C0" borderWidth={1} className="opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-start justify-between mb-8">
                <span className="font-sans text-[9px] tracking-[0.35em] uppercase text-stone font-semibold">02 — Iceberg</span>
                <span className="font-serif text-[2.5rem] font-normal text-carbon/8 leading-none tabular-nums">
                  <AnimatedNumber target={90} suffix="%" />
                </span>
              </div>

              <h3 className="font-serif text-[clamp(1.85rem,3.2vw,2.6rem)] font-normal leading-[1.1] text-carbon tracking-tight">
                90% of the<br />ecosystem is<br />below the surface.
              </h3>

              <div ref={rightDividerRef} className="mt-8 mb-6 h-[1px] bg-carbon/8" style={{ transformOrigin: 'left center' }} />

              <ul className="flex flex-col gap-3 flex-1">
                {ICEBERG.focusAreas.slice(0, 5).map((area, i) => (
                  <ListItem key={i} text={area} dot="bg-gold" />
                ))}
              </ul>

              <a id="iceberg-pillar-cta" href="/iceberg" className="mt-10 group/cta inline-flex items-center gap-3 w-fit">
                <span className="font-sans text-[10px] tracking-widest uppercase text-stone group-hover/cta:text-carbon transition-colors duration-300 font-semibold">Explore Iceberg</span>
                <span className="flex items-center justify-center w-7 h-7 rounded-full border border-carbon/15 group-hover/cta:border-gold group-hover/cta:bg-gold transition-all duration-300 text-stone group-hover/cta:text-travertine text-xs">→</span>
              </a>
            </div>
          </SpotlightCard>
        </div>

      </div>
    </section>
  );
}
