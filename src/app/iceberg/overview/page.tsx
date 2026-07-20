"use client";

import PageWrapper from "@/features/navigation/components/PageWrapper";
import SectionWrapper from "@/features/storytelling/components/SectionWrapper";
import { BlurFade } from "@/components/ui/blur-fade";
import { ICEBERG } from "@/core/context";

export default function IcebergOverviewPage() {
  return (
    <PageWrapper>
      <SectionWrapper id="iceberg-overview-header" className="relative min-h-[70vh] justify-center text-center">
        <div className="max-w-3xl flex flex-col items-center gap-4">
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold font-semibold">
            Division Overview
          </span>
          <h1 className="font-sans text-4xl md:text-5xl font-light tracking-tight text-carbon">
            Iceberg Ecosystem
          </h1>
          <p className="font-sans text-sm text-stone max-w-xl leading-relaxed font-light mt-2">
            {ICEBERG.summary}
          </p>
        </div>
      </SectionWrapper>

      {/* Connection pipeline */}
      <section className="w-full bg-silk/30 py-24 border-y border-carbon/5 px-6 md:px-12">
        <div className="max-w-4xl mx-auto flex flex-col gap-12 text-left">
          <div className="flex flex-col gap-2">
            <span className="font-sans text-[10px] tracking-widest text-gold uppercase font-semibold">Ecosystem Blueprint</span>
            <h2 className="font-sans text-2xl md:text-3xl font-light text-carbon tracking-tight">Research to Classroom</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ICEBERG.pipeline.map((s, idx) => (
              <BlurFade key={s.num} delay={idx * 0.15} duration={0.8} className="flex flex-col gap-3 p-6 bg-white/40 border border-carbon/5 rounded-2xl relative">
                <span className="font-serif text-2xl text-gold">{s.num}</span>
                <h3 className="font-sans text-lg font-light text-carbon">{s.name}</h3>
                <p className="font-sans text-xs text-stone/85 leading-relaxed font-light">{s.description}</p>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Summary section */}
      <section className="w-full py-28 px-6 md:px-12 bg-travertine">
        <div className="max-w-3xl mx-auto flex flex-col gap-6 text-left">
          <h3 className="font-sans text-xl md:text-2xl font-light tracking-tight text-carbon">
            Practical AI Sovereignty
          </h3>
          <p className="font-sans text-xs md:text-sm text-stone leading-relaxed font-light">
            {ICEBERG.practicalSovereignty}
          </p>
          <p className="font-sans text-xs md:text-sm text-stone leading-relaxed font-light">
            {ICEBERG.academicPartnership}
          </p>
        </div>
      </section>
    </PageWrapper>
  );
}
