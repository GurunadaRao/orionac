"use client";

import PageWrapper from "@/features/navigation/components/PageWrapper";
import SectionWrapper from "@/features/storytelling/components/SectionWrapper";
import { BlurFade } from "@/components/ui/blur-fade";
import { RESEARCH, BRAND, COMPANY } from "@/core/context";

export default function CollaborationsPage() {
  // Placeholder publications — to be replaced with real data
  const papers = [
    { title: "Localized Weight Sparsification via Sparse Path Routing", journal: "Journal of Edge Computing (2025)" },
    { title: "Browser-based WebGL/WebGPU Inference Latency Metrics", journal: "IEEE Systems Journal (2025)" },
    { title: "Quantization Bounds of 4-bit Foundational Network Nodes", journal: "Academic AI Review (2026)" }
  ];

  return (
    <PageWrapper>
      <SectionWrapper id="collaborations-header" className="relative min-h-[70vh] justify-center text-center">
        <div className="max-w-3xl flex flex-col items-center gap-4">
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold font-semibold">
            Academic Network
          </span>
          <h1 className="font-sans text-4xl md:text-5xl font-light tracking-tight text-carbon">
            Academic Collaborations
          </h1>
          <p className="font-sans text-sm text-stone max-w-xl leading-relaxed font-light mt-2">
            Partnering with universities worldwide to advance AI research through open frameworks and joint curriculum development.
          </p>
        </div>
      </SectionWrapper>

      {/* Publications Grid */}
      <section className="w-full bg-silk/30 py-24 border-y border-carbon/5 px-6 md:px-12 text-left">
        <div className="max-w-4xl mx-auto flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <span className="font-sans text-[10px] tracking-widest text-gold uppercase font-semibold">Scientific Log</span>
            <h2 className="font-sans text-2xl md:text-3xl font-light text-carbon tracking-tight">Co-Authored Publications</h2>
          </div>

          <div className="flex flex-col gap-6">
            {papers.map((p, idx) => (
              <BlurFade key={p.title} delay={idx * 0.15} duration={0.8} className="flex flex-col md:flex-row gap-4 p-6 bg-white/40 border border-carbon/5 rounded-2xl items-center justify-between">
                <div className="flex flex-col gap-1">
                  <h3 className="font-sans text-base font-light text-carbon">{p.title}</h3>
                  <span className="font-sans text-xs text-stone mt-1 font-light">{p.journal}</span>
                </div>
                <span className="font-sans text-[10px] tracking-wider uppercase text-gold font-semibold">PDF Download</span>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Open Collaboration Principle */}
      <section className="w-full py-28 px-6 md:px-12 bg-travertine text-left">
        <div className="max-w-3xl mx-auto flex flex-col gap-6">
          <h3 className="font-sans text-xl md:text-2xl font-light tracking-tight text-carbon">
            Open-Source Research Loop
          </h3>
          <p className="font-sans text-xs md:text-sm text-stone leading-relaxed font-light">
            {RESEARCH.principles[2].description} {COMPANY.globalObjectives[3]}
          </p>
          <p className="font-sans text-xs md:text-sm text-stone leading-relaxed font-light">
            This collaborative model ensures research remains peer-reviewed, reproducible, and ready for deployment in academic curriculums worldwide. For partnership inquiries, reach us at{" "}
            <a
              href={`mailto:${BRAND.contact.email}`}
              className="text-carbon underline underline-offset-2 hover:text-gold transition-colors duration-300"
            >
              {BRAND.contact.email}
            </a>
            .
          </p>
        </div>
      </section>
    </PageWrapper>
  );
}
