"use client";

import PageWrapper from "@/features/navigation/components/PageWrapper";
import SectionWrapper from "@/features/storytelling/components/SectionWrapper";
import { BlurFade } from "@/components/ui/blur-fade";
import { RESEARCH } from "@/core/context";

const hardware = [
  { name: "Apple Silicon M-Series", latency: "14ms", status: "Optimized" },
  { name: "Snapdragon Elite", latency: "22ms", status: "Stable" },
  { name: "Intel Core Ultra", latency: "26ms", status: "Optimized" },
  { name: "WebGPU Browser WASM", latency: "38ms", status: "In Development" }
];

export default function EdgeAIPage() {
  return (
    <PageWrapper>
      <SectionWrapper id="edge-ai-header" className="relative min-h-[70vh] justify-center text-center">
        <div className="max-w-3xl flex flex-col items-center gap-4">
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold font-semibold">
            Target Execution
          </span>
          <h1 className="font-sans text-4xl md:text-5xl font-light tracking-tight text-carbon">
            Edge AI
          </h1>
          <p className="font-sans text-sm text-stone max-w-xl leading-relaxed font-light mt-2">
            Running foundational intelligence locally — a core research pillar at Orionac, enabling absolute user privacy and zero-trust device boundaries.
          </p>
        </div>
      </SectionWrapper>

      {/* Latency Benchmarks */}
      <section className="w-full bg-silk/30 py-24 border-y border-carbon/5 px-6 md:px-12">
        <div className="max-w-4xl mx-auto flex flex-col gap-8 text-left">
          <span className="font-sans text-[10px] tracking-widest text-gold uppercase font-semibold">Benchmarks Matrix</span>
          <h2 className="font-sans text-2xl md:text-3xl font-light text-carbon tracking-tight">On-Device Latency</h2>

          <div className="flex flex-col border border-carbon/5 rounded-2xl bg-white/40 overflow-hidden mt-2">
            {hardware.map((hw, idx) => (
              <BlurFade key={hw.name} delay={idx * 0.1} className="flex items-center justify-between border-b border-carbon/5 last:border-0 py-4 px-6">
                <div className="flex flex-col gap-0.5">
                  <span className="font-sans text-xs md:text-sm text-carbon font-semibold">{hw.name}</span>
                  <span className="font-sans text-[10px] text-stone font-light">{hw.status}</span>
                </div>
                <span className="font-serif text-lg text-gold">{hw.latency}</span>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Edge Privacy + Focus Area Context */}
      <section className="w-full py-28 px-6 md:px-12 bg-travertine">
        <div className="max-w-3xl mx-auto flex flex-col gap-6 text-left">
          <h3 className="font-sans text-xl md:text-2xl font-light tracking-tight text-carbon">
            Zero-Trust Device Boundaries
          </h3>
          <p className="font-sans text-xs md:text-sm text-stone leading-relaxed font-light">
            When calculations happen locally, data never exits the device. Our native compilation pipelines leverage on-device hardware directly, executing matrix multiplication inside isolated contexts or local compiler layers.
          </p>
          <p className="font-sans text-xs md:text-sm text-stone leading-relaxed font-light">
            Edge AI is one of Orionac&apos;s core research focus areas alongside{" "}
            {RESEARCH.focusAreas
              .filter((f) => f !== "Edge AI")
              .join(", ")}
            . {RESEARCH.principles[1].description}
          </p>
        </div>
      </section>
    </PageWrapper>
  );
}
