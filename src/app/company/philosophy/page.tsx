"use client";

import PageWrapper from "@/features/navigation/components/PageWrapper";
import SectionWrapper from "@/features/storytelling/components/SectionWrapper";
import { BlurFade } from "@/components/ui/blur-fade";
import { RESEARCH } from "@/core/context";

export default function PhilosophyPage() {
  return (
    <PageWrapper>
      <SectionWrapper id="philosophy-header" className="relative min-h-[70vh] justify-center text-center">
        <div className="max-w-3xl flex flex-col items-center gap-4">
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold font-semibold">
            Tenets
          </span>
          <h1 className="font-sans text-4xl md:text-5xl font-light tracking-tight text-carbon">
            Research Philosophy
          </h1>
          <p className="font-sans text-sm text-stone max-w-xl leading-relaxed font-light mt-2">
            The mathematical, structural, and cultural principles guiding every engineering decision we make.
          </p>
        </div>
      </SectionWrapper>

      {/* Principles List */}
      <section className="w-full bg-silk/30 py-24 border-y border-carbon/5 px-6 md:px-12">
        <div className="max-w-4xl mx-auto flex flex-col gap-10 text-left">
          <div className="flex flex-col gap-2">
            <span className="font-sans text-[10px] tracking-widest text-gold uppercase font-semibold">Operational Guide</span>
            <h2 className="font-sans text-2xl md:text-3xl font-light text-carbon tracking-tight">
              Our Four Principles
            </h2>
          </div>

          <div className="flex flex-col gap-6">
            {RESEARCH.principles.map((p, idx) => (
              <BlurFade
                key={p.label}
                delay={idx * 0.1}
                className="flex flex-col md:flex-row gap-4 p-6 bg-white/40 border border-carbon/5 rounded-2xl items-start"
              >
                <span className="font-serif text-2xl text-gold md:w-16">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-1 md:w-5/6">
                  <h3 className="font-sans text-lg font-light text-carbon">{p.label}</h3>
                  <p className="font-sans text-xs text-stone/85 leading-relaxed font-light mt-1">{p.description}</p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Research Summary */}
      <section className="w-full py-28 px-6 md:px-12 bg-travertine text-charcoal">
        <div className="max-w-3xl mx-auto flex flex-col gap-8 text-left">
          <h3 className="font-sans text-xl md:text-2xl font-light tracking-tight text-carbon">
            Algorithmic Restraint &amp; Academic Depth
          </h3>
          <p className="font-sans text-xs md:text-sm text-stone leading-relaxed font-light">
            {RESEARCH.summary}
          </p>
          <p className="font-sans text-xs md:text-sm text-stone leading-relaxed font-light">
            By shifting from parameter scaling to path optimization, we make advanced computation accessible on standard chipsets. Our principles are not just declarations — they represent our daily commitments to clean code and mathematical design.
          </p>
        </div>
      </section>
    </PageWrapper>
  );
}
