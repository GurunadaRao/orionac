"use client";

import PageWrapper from "@/features/navigation/components/PageWrapper";
import SectionWrapper from "@/features/storytelling/components/SectionWrapper";
import { BlurFade } from "@/components/ui/blur-fade";
import { COMPANY, BRAND } from "@/core/context";

export default function VisionPage() {
  return (
    <PageWrapper>
      <SectionWrapper id="vision-header" className="relative min-h-[70vh] justify-center text-center">
        <div className="max-w-3xl flex flex-col items-center gap-4">
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold font-semibold">
            Trajectory
          </span>
          <h1 className="font-sans text-4xl md:text-5xl font-light tracking-tight text-carbon">
            Vision &amp; Mission
          </h1>
          <p className="font-sans text-sm text-stone max-w-xl leading-relaxed font-light mt-2">
            Ensuring intelligence remains open, practical, and aligned with human progress.
          </p>
        </div>
      </SectionWrapper>

      {/* Vision Statement */}
      <section className="w-full bg-silk/30 py-24 border-y border-carbon/5 px-6 md:px-12 text-left">
        <div className="max-w-3xl mx-auto flex flex-col gap-10">
          <BlurFade delay={0.2} duration={0.8} className="flex flex-col gap-3">
            <span className="font-sans text-[10px] tracking-widest text-gold uppercase font-semibold">Vision</span>
            <h2 className="font-sans text-2xl md:text-3xl font-light text-carbon tracking-tight">
              Beyond Intelligence
            </h2>
            <p className="font-sans text-xs md:text-sm text-stone leading-relaxed font-light mt-2">
              {COMPANY.vision}
            </p>
          </BlurFade>

          <BlurFade delay={0.4} duration={0.8} className="flex flex-col gap-4">
            <span className="font-sans text-[10px] tracking-widest text-gold uppercase font-semibold">Mission</span>
            <h2 className="font-sans text-2xl md:text-3xl font-light text-carbon tracking-tight">
              Four Core Commitments
            </h2>
            <ul className="flex flex-col gap-4 mt-2">
              {COMPANY.mission.map((item) => (
                <li key={item.verb} className="flex items-start gap-4">
                  <span className="font-sans text-[10px] tracking-widest uppercase text-gold font-bold pt-0.5 w-20 shrink-0">
                    {item.verb}
                  </span>
                  <p className="font-sans text-xs md:text-sm text-stone leading-relaxed font-light">
                    {item.description}
                  </p>
                </li>
              ))}
            </ul>
          </BlurFade>
        </div>
      </section>

      {/* Closing Thought */}
      <section className="w-full py-32 px-6 md:px-12 bg-travertine text-center">
        <div className="max-w-2xl mx-auto flex flex-col gap-6">
          <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-stone/50 font-bold">
            {BRAND.name} · Founded {BRAND.founded}
          </span>
          <p className="font-sans text-xl md:text-2xl font-light text-stone leading-relaxed italic">
            &ldquo;{BRAND.tagline}.&rdquo;
          </p>
        </div>
      </section>
    </PageWrapper>
  );
}
