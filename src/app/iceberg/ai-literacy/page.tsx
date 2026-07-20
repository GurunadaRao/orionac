"use client";

import PageWrapper from "@/features/navigation/components/PageWrapper";
import SectionWrapper from "@/features/storytelling/components/SectionWrapper";
import { BlurFade } from "@/components/ui/blur-fade";
import { ICEBERG, RESEARCH } from "@/core/context";

// TODO: Replace with real course data when available
const modules = [
  { code: "AIL-101", title: "Local Inference Foundations", desc: "Understanding execution graphs, local browser WebGPU nodes, and quantization benchmarks." },
  { code: "AIL-201", title: "Model Sparsification", desc: "Pruning inactive paths, adjusting parameters, and compiling custom weights." },
  { code: "AIL-301", title: "Agentic Loop Architectures", desc: "Building planning algorithms, command execution loops, and local files sensory models." }
];

export default function AILiteracyPage() {
  return (
    <PageWrapper>
      <SectionWrapper id="ai-literacy-header" className="relative min-h-[70vh] justify-center text-center">
        <div className="max-w-3xl flex flex-col items-center gap-4">
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold font-semibold">
            Outreach Course
          </span>
          <h1 className="font-sans text-4xl md:text-5xl font-light tracking-tight text-carbon">
            AI Literacy
          </h1>
          <p className="font-sans text-sm text-stone max-w-xl leading-relaxed font-light mt-2">
            Making AI education accessible, practical, and industry-relevant — one system at a time.
          </p>
        </div>
      </SectionWrapper>

      {/* Syllabus Grid */}
      <section className="w-full bg-silk/30 py-24 border-y border-carbon/5 px-6 md:px-12">
        <div className="max-w-4xl mx-auto flex flex-col gap-10 text-left">
          <div className="flex flex-col gap-2">
            <span className="font-sans text-[10px] tracking-widest text-gold uppercase font-semibold">Syllabus Outline</span>
            <h2 className="font-sans text-2xl md:text-3xl font-light text-carbon tracking-tight">Academic Modules</h2>
          </div>

          <div className="flex flex-col gap-6">
            {modules.map((m, idx) => (
              <BlurFade key={m.code} delay={idx * 0.1} className="flex flex-col md:flex-row gap-4 p-6 bg-white/40 border border-carbon/5 rounded-2xl items-start justify-between">
                <div className="flex flex-col gap-1.5 md:w-2/3">
                  <span className="font-sans text-[10px] tracking-wider uppercase text-gold font-bold">{m.code}</span>
                  <h3 className="font-sans text-lg font-light text-carbon">{m.title}</h3>
                  <p className="font-sans text-xs text-stone/85 leading-relaxed font-light mt-1">{m.desc}</p>
                </div>
                <button className="font-sans text-[9px] tracking-widest uppercase px-4 py-2 rounded-full border border-carbon/25 text-stone hover:bg-carbon hover:text-white transition-colors duration-300 font-semibold mt-4 md:mt-0">
                  Syllabus Details
                </button>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="w-full py-28 px-6 md:px-12 bg-travertine">
        <div className="max-w-3xl mx-auto flex flex-col gap-6 text-left">
          <h3 className="font-sans text-xl md:text-2xl font-light tracking-tight text-carbon">
            Systems Over Consumer APIs
          </h3>
          <p className="font-sans text-xs md:text-sm text-stone leading-relaxed font-light">
            {ICEBERG.practicalSovereignty}
          </p>
          <p className="font-sans text-xs md:text-sm text-stone leading-relaxed font-light">
            Our curriculum is built on a single conviction: {RESEARCH.principles[0].label.toLowerCase()}. By guiding students through execution pipelines and on-device inference, we empower them to understand what AI is at a mathematical and structural layer — not just as a product to consume.
          </p>
        </div>
      </section>
    </PageWrapper>
  );
}
