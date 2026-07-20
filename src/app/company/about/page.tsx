"use client";

import PageWrapper from "@/features/navigation/components/PageWrapper";
import SectionWrapper from "@/features/storytelling/components/SectionWrapper";
import { BlurFade } from "@/components/ui/blur-fade";
import { COMPANY } from "@/core/context";

export default function AboutPage() {
  return (
    <PageWrapper>
      <SectionWrapper id="about-header" className="relative min-h-[70vh] justify-center text-center">
        <div className="max-w-3xl flex flex-col items-center gap-4">
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold font-semibold">
            Our Story
          </span>
          <h1 className="font-sans text-4xl md:text-5xl font-light tracking-tight text-carbon">
            About Orionac
          </h1>
          <p className="font-sans text-sm text-stone max-w-xl leading-relaxed font-light mt-2">
            {COMPANY.summary}
          </p>
        </div>
      </SectionWrapper>

      {/* Mission Grid */}
      <section className="w-full bg-silk/30 py-24 border-y border-carbon/5 px-6 md:px-12">
        <div className="max-w-4xl mx-auto flex flex-col gap-10 text-left">
          <div className="flex flex-col gap-2">
            <span className="font-sans text-[10px] tracking-widest text-gold uppercase font-semibold">Founding Principles</span>
            <h2 className="font-sans text-2xl md:text-3xl font-light text-carbon tracking-tight">Our Mission</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {COMPANY.mission.map((item, idx) => (
              <BlurFade key={item.verb} delay={idx * 0.15} duration={0.8} className="flex flex-col gap-3 p-6 bg-white/40 border border-carbon/5 rounded-2xl relative text-left">
                <span className="font-sans text-[9px] tracking-widest uppercase text-stone/50 font-bold">{item.verb}</span>
                <p className="font-sans text-xs text-stone/85 leading-relaxed font-light">{item.description}</p>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="w-full py-28 px-6 md:px-12 bg-travertine text-charcoal">
        <div className="max-w-3xl mx-auto flex flex-col gap-8 text-left">
          <h3 className="font-sans text-xl md:text-2xl font-light tracking-tight text-carbon">
            A Research-First Institution
          </h3>
          <p className="font-sans text-xs md:text-sm text-stone leading-relaxed font-light">
            {COMPANY.philosophy}
          </p>
          <p className="font-sans text-xs md:text-sm text-stone leading-relaxed font-light">
            {COMPANY.positioning}
          </p>
        </div>
      </section>
    </PageWrapper>
  );
}
