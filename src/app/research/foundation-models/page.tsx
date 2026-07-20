"use client";

import PageWrapper from "@/features/navigation/components/PageWrapper";
import SectionWrapper from "@/features/storytelling/components/SectionWrapper";
import { BlurFade } from "@/components/ui/blur-fade";
import { RESEARCH } from "@/core/context";

const metrics = [
  { label: "Base Weights Size", value: "7.3 Billion" },
  { label: "Active Inference Path", value: "1.8 Billion" },
  { label: "Local Memory Footprint", value: "3.2 GB" },
  { label: "Edge Latency Target", value: "< 22ms" }
];

export default function FoundationModelsPage() {
  return (
    <PageWrapper>
      <SectionWrapper id="foundation-models-header" className="relative min-h-[70vh] justify-center text-center">
        <div className="max-w-3xl flex flex-col items-center gap-4">
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold font-semibold">
            Research Core
          </span>
          <h1 className="font-sans text-4xl md:text-5xl font-light tracking-tight text-carbon">
            Foundation Models
          </h1>
          <p className="font-sans text-sm text-stone max-w-xl leading-relaxed font-light mt-2">
            {RESEARCH.summary}
          </p>
        </div>
      </SectionWrapper>

      {/* Upcoming Release Callout */}
      <section className="w-full bg-gold/5 border-y border-gold/10 py-8 px-6 md:px-12 text-center">
        <p className="font-sans text-xs text-stone tracking-wide">
          <span className="font-semibold text-gold uppercase tracking-widest">{RESEARCH.upcomingRelease.name}</span>
          {" — "}{RESEARCH.upcomingRelease.status}
        </p>
      </section>

      {/* Grid Specs */}
      <section className="w-full bg-silk/30 py-24 border-b border-carbon/5 px-6 md:px-12">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-4 text-left">
            <span className="font-sans text-[10px] tracking-widest text-stone uppercase font-semibold">Spec Sheet</span>
            <h2 className="font-sans text-2xl md:text-3xl font-light tracking-tight text-carbon">
              Weight Sparsification
            </h2>
            <p className="font-sans text-xs md:text-sm text-stone leading-relaxed font-light">
              {RESEARCH.principles[1].description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {metrics.map((m, idx) => (
              <BlurFade key={m.label} delay={idx * 0.15} duration={0.8} className="flex flex-col gap-1 p-6 bg-white/40 border border-carbon/5 rounded-2xl text-left">
                <span className="font-serif text-3xl font-extralight text-gold">{m.value}</span>
                <span className="font-sans text-[10px] tracking-wider uppercase text-stone mt-2 font-medium">{m.label}</span>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Technical Paragraphs */}
      <section className="w-full py-28 px-6 md:px-12 bg-travertine text-charcoal">
        <div className="max-w-3xl mx-auto flex flex-col gap-8 text-left">
          <h3 className="font-sans text-xl md:text-2xl font-light tracking-tight text-carbon">
            Localized Foundation Architectures
          </h3>
          <p className="font-sans text-xs md:text-sm text-stone leading-relaxed font-light">
            Our models are engineered with localized device bounds in mind. Rather than feeding parameters into massive data centers, we restrict core operations to the physical GPU limits of mobile chipsets and laptop architectures. This shifts the compute paradigm from continuous server request cycles to local, private device calculations.
          </p>
          <p className="font-sans text-xs md:text-sm text-stone leading-relaxed font-light">
            {RESEARCH.upcomingRelease.significance}
          </p>
        </div>
      </section>
    </PageWrapper>
  );
}
