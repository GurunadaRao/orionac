"use client";

import PageWrapper from "@/features/navigation/components/PageWrapper";
import SectionWrapper from "@/features/storytelling/components/SectionWrapper";
import { BlurFade } from "@/components/ui/blur-fade";
import { RESEARCH } from "@/core/context";

const steps = [
  { num: "01", title: "Path Routing", desc: "Dynamically select path connections per token to bypass redundant weights." },
  { num: "02", title: "Sparse Activation", desc: "Activate only the target sub-networks, saving on processing clock cycles." },
  { num: "03", title: "Weight Reduction", desc: "Compress unused connections to minimize system memory load." }
];

export default function EfficientArchitecturesPage() {
  return (
    <PageWrapper>
      <SectionWrapper id="efficient-arch-header" className="relative min-h-[70vh] justify-center text-center">
        <div className="max-w-3xl flex flex-col items-center gap-4">
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold font-semibold">
            Engineering Rigor
          </span>
          <h1 className="font-sans text-4xl md:text-5xl font-light tracking-tight text-carbon">
            Efficient Architectures
          </h1>
          <p className="font-sans text-sm text-stone max-w-xl leading-relaxed font-light mt-2">
            {RESEARCH.principles[1].description}
          </p>
        </div>
      </SectionWrapper>

      {/* Process list */}
      <section className="w-full bg-silk/30 py-24 border-y border-carbon/5 px-6 md:px-12">
        <div className="max-w-4xl mx-auto flex flex-col gap-12 text-left">
          <div className="flex flex-col gap-2">
            <span className="font-sans text-[10px] tracking-widest text-gold uppercase font-semibold">Process Flow</span>
            <h2 className="font-sans text-2xl md:text-3xl font-light text-carbon tracking-tight">Compute Path Reduction</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s, idx) => (
              <BlurFade key={s.num} delay={idx * 0.15} duration={0.8} className="flex flex-col gap-3 p-6 bg-white/40 border border-carbon/5 rounded-2xl relative">
                <span className="font-serif text-2xl text-gold">{s.num}</span>
                <h3 className="font-sans text-lg font-light text-carbon">{s.title}</h3>
                <p className="font-sans text-xs text-stone/85 leading-relaxed font-light">{s.desc}</p>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="w-full py-28 px-6 md:px-12 bg-travertine">
        <div className="max-w-3xl mx-auto flex flex-col gap-6 text-left">
          <h3 className="font-sans text-xl md:text-2xl font-light tracking-tight text-carbon">
            {RESEARCH.principles[1].label}
          </h3>
          <p className="font-sans text-xs md:text-sm text-stone leading-relaxed font-light">
            Brute-force scaling is a transient phase. Modern foundation models scale parameters exponentially, resulting in compute requirements that only global data centers can support. We challenge this paradigm by engineering routing pathways that dynamically isolate weights during execution.
          </p>
          <p className="font-sans text-xs md:text-sm text-stone leading-relaxed font-light">
            {RESEARCH.summary}
          </p>
        </div>
      </section>
    </PageWrapper>
  );
}
