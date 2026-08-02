"use client";

import { useRef } from "react";
import { useGsapReveal } from "@/hooks/useGsapReveal";
import { useMagneticHover } from "@/hooks/useMagneticHover";
import { gsap, revealFromBelow, splitWordReveal } from "@/lib/gsap";

export default function MirageCTA() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const ctaRef = useMagneticHover<HTMLAnchorElement>({ strength: 0.3 });

  const { ref } = useGsapReveal<HTMLElement>((el) => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const st = { trigger: el, start: "top 75%", once: true };
      if (rowRef.current) gsap.set(rowRef.current, { opacity: 0, y: 20 });
      if (headlineRef.current) gsap.set(headlineRef.current, { opacity: 1 });
      const tl = gsap.timeline({ scrollTrigger: st });
      tl.add(() => {
        if (headlineRef.current) splitWordReveal(headlineRef.current, { duration: 0.8, stagger: 0.06, y: 40 });
      }, 0);
      if (rowRef.current) tl.to(rowRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0.4);
      return () => tl.kill();
    });

    mm.add("(max-width: 767px)", () => {
      const st = { trigger: el, start: "top 82%", once: true };
      const targets = [headlineRef.current, rowRef.current];
      gsap.set(targets, { opacity: 0, y: 16 });
      revealFromBelow(targets, { duration: 0.55, stagger: 0.1, scrollTrigger: st });
      return () => {};
    });

    return () => mm.revert();
  });

  return (
    <section id="mirage-cta" ref={ref} className="w-full bg-carbon py-32 px-6 md:px-12 text-center">
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-8">
        <h2 ref={headlineRef} className="font-serif text-[clamp(2.25rem,5vw,4rem)] font-normal leading-[1.05] tracking-tight text-travertine">
          Be first to run Mirage E-1.0.
        </h2>

        <div ref={rowRef} className="flex items-center gap-6 flex-wrap justify-center">
          <a
            ref={ctaRef}
            id="mirage-cta-waitlist"
            href="/#join"
            className="inline-flex items-center gap-3 font-sans text-xs md:text-sm tracking-widest uppercase px-8 py-4 rounded-full bg-travertine text-carbon hover:bg-violet hover:text-white transition-all duration-300 font-bold shadow-lg hover:shadow-violet/30"
          >
            Join the waitlist
            <span className="text-base">→</span>
          </a>
          <a
            id="mirage-cta-home"
            href="/"
            className="inline-flex items-center gap-2 font-sans text-xs md:text-sm tracking-widest uppercase text-travertine/50 hover:text-travertine transition-colors duration-300 font-semibold group border-b border-travertine/10 pb-0.5 hover:border-travertine"
          >
            Back to Orionac
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
