"use client";

import PageWrapper from "@/features/navigation/components/PageWrapper";
import SectionWrapper from "@/features/storytelling/components/SectionWrapper";
import { BlurFade } from "@/components/ui/blur-fade";
import { RESEARCH } from "@/core/context";

const { upcomingRelease, principles } = RESEARCH;

const specs = [
  { label: "Target Model Class", val: `${upcomingRelease.name} (${upcomingRelease.type})` },
  { label: "Release Window", val: upcomingRelease.status },
  { label: "Inference Latency", val: "18 Tokens / Second" },
  { label: "License Profile", val: "Academic Open-Source Access" }
];

export default function MiragePage() {
  return (
    <PageWrapper>
      <SectionWrapper id="mirage-header" className="relative min-h-[70vh] justify-center text-center">
        <div className="max-w-3xl flex flex-col items-center gap-4">
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold font-semibold">
            Signature Project
          </span>
          <h1 className="font-sans text-4xl md:text-5xl font-light tracking-tight text-carbon">
            {upcomingRelease.name}
          </h1>
          <p className="font-sans text-sm text-stone max-w-xl leading-relaxed font-light mt-2">
            {upcomingRelease.significance}
          </p>
        </div>
      </SectionWrapper>

      {/* Model Spec Table */}
      <section className="w-full bg-silk/30 py-24 border-y border-carbon/5 px-6 md:px-12">
        <div className="max-w-4xl mx-auto flex flex-col gap-8 text-left">
          <span className="font-sans text-[10px] tracking-widest text-gold uppercase font-semibold">Parameters Matrix</span>
          <h2 className="font-sans text-2xl md:text-3xl font-light text-carbon tracking-tight">
            Release Configuration
          </h2>

          <div className="flex flex-col border border-carbon/5 rounded-2xl bg-white/40 overflow-hidden mt-2">
            {specs.map((s, idx) => (
              <BlurFade key={s.label} delay={idx * 0.1} className="flex items-center justify-between border-b border-carbon/5 last:border-0 py-4 px-6">
                <span className="font-sans text-xs md:text-sm text-stone font-light">{s.label}</span>
                <span className="font-sans text-xs md:text-sm text-carbon font-semibold tracking-tight">{s.val}</span>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Summary */}
      <section className="w-full py-28 px-6 md:px-12 bg-travertine">
        <div className="max-w-3xl mx-auto flex flex-col gap-6 text-left">
          <h3 className="font-sans text-xl md:text-2xl font-light tracking-tight text-carbon">
            The {upcomingRelease.name} Architecture
          </h3>
          <p className="font-sans text-xs md:text-sm text-stone leading-relaxed font-light">
            Mirage E-1.0 represents our first milestone research architecture. By shifting standard attention weight distributions into sparse, dynamically routed pathways, the model operates at high capacity bounds while preserving CPU clock speeds.
          </p>
          <p className="font-sans text-xs md:text-sm text-stone leading-relaxed font-light">
            It is designed specifically for researchers seeking local execution weights, eliminating dependency on API servers. Parameters will be released publicly under an open academic license model — fulfilling our core principle of{" "}
            <em>{principles[2].label.toLowerCase()}</em>.
          </p>
        </div>
      </section>
    </PageWrapper>
  );
}
