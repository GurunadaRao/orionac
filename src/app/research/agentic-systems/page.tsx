"use client";

import PageWrapper from "@/features/navigation/components/PageWrapper";
import SectionWrapper from "@/features/storytelling/components/SectionWrapper";
import { BlurFade } from "@/components/ui/blur-fade";
import { RESEARCH } from "@/core/context";

const steps = [
  { title: "Sensory Integration", detail: "Read active local environment states and files directly inside zero-trust contexts." },
  { title: "Dynamic Planning", detail: "Formulate sub-task targets and paths without needing remote validation checks." },
  { title: "Execution Actions", detail: "Execute direct terminal commands, file alterations, or code refactoring loops." }
];

export default function AgenticSystemsPage() {
  return (
    <PageWrapper>
      <SectionWrapper id="agentic-systems-header" className="relative min-h-[70vh] justify-center text-center">
        <div className="max-w-3xl flex flex-col items-center gap-4">
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold font-semibold">
            Action Loop
          </span>
          <h1 className="font-sans text-4xl md:text-5xl font-light tracking-tight text-carbon">
            Agentic Systems
          </h1>
          <p className="font-sans text-sm text-stone max-w-xl leading-relaxed font-light mt-2">
            Developing autonomous AI execution pathways — a core research focus at Orionac, optimized for coding, scripting, and real-world system loops.
          </p>
        </div>
      </SectionWrapper>

      {/* Action Flow */}
      <section className="w-full bg-silk/30 py-24 border-y border-carbon/5 px-6 md:px-12">
        <div className="max-w-4xl mx-auto flex flex-col gap-12 text-left">
          <div className="flex flex-col gap-2">
            <span className="font-sans text-[10px] tracking-widest text-gold uppercase font-semibold">Timeline Pattern</span>
            <h2 className="font-sans text-2xl md:text-3xl font-light text-carbon tracking-tight">Active Execution Cycle</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s, idx) => (
              <BlurFade key={s.title} delay={idx * 0.15} duration={0.8} className="flex flex-col gap-3 p-6 bg-white/40 border border-carbon/5 rounded-2xl relative">
                <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-stone font-semibold">Step {idx + 1}</span>
                <h3 className="font-sans text-lg font-light text-carbon">{s.title}</h3>
                <p className="font-sans text-xs text-stone/85 leading-relaxed font-light">{s.detail}</p>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Autonomous Loops */}
      <section className="w-full py-28 px-6 md:px-12 bg-travertine">
        <div className="max-w-3xl mx-auto flex flex-col gap-6 text-left">
          <h3 className="font-sans text-xl md:text-2xl font-light tracking-tight text-carbon">
            Optimizing for Latency and Continuity
          </h3>
          <p className="font-sans text-xs md:text-sm text-stone leading-relaxed font-light">
            Centralized agentic loops are bottlenecked by API network latencies. A simple planning model executing 5 steps can take up to 20 seconds. By routing calculations to local hardware chipsets, our agent loops execute planning cycles in milliseconds.
          </p>
          <p className="font-sans text-xs md:text-sm text-stone leading-relaxed font-light">
            Agentic AI Systems is one of {RESEARCH.focusAreas.length} core research focus areas at Orionac. {RESEARCH.principles[1].description}
          </p>
        </div>
      </section>
    </PageWrapper>
  );
}
