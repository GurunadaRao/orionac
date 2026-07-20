"use client";

import PageWrapper from "@/features/navigation/components/PageWrapper";
import SectionWrapper from "@/features/storytelling/components/SectionWrapper";
import { BlurFade } from "@/components/ui/blur-fade";
import { ICEBERG, BRAND } from "@/core/context";

const tools = [
  { title: "Curriculum Grants", desc: "Financial sponsorships for professors designing active, project-based AI systems courses aligned with Iceberg's education standards." },
  { title: "Open Toolkits", desc: "Pre-compiled slides, local inference coding benchmarks, and testbed platforms built directly from our research pipelines." },
  { title: "Computing Access", desc: "Allocations on Orionac computing resources to support academic research, model testing, and classroom deployments." }
];

export default function FacultyDevelopmentPage() {
  return (
    <PageWrapper>
      <SectionWrapper id="faculty-header" className="relative min-h-[70vh] justify-center text-center">
        <div className="max-w-3xl flex flex-col items-center gap-4">
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold font-semibold">
            Educator Resources
          </span>
          <h1 className="font-sans text-4xl md:text-5xl font-light tracking-tight text-carbon">
            Faculty Development
          </h1>
          <p className="font-sans text-sm text-stone max-w-xl leading-relaxed font-light mt-2">
            Empowering professors, curriculum designers, and academic directors to build hands-on AI education programmes.
          </p>
        </div>
      </SectionWrapper>

      {/* Grid of tools */}
      <section className="w-full bg-silk/30 py-24 border-y border-carbon/5 px-6 md:px-12">
        <div className="max-w-4xl mx-auto flex flex-col gap-10 text-left">
          <div className="flex flex-col gap-2">
            <span className="font-sans text-[10px] tracking-widest text-gold uppercase font-semibold">Support Kits</span>
            <h2 className="font-sans text-2xl md:text-3xl font-light text-carbon tracking-tight">Faculty Resources</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tools.map((t, idx) => (
              <BlurFade key={t.title} delay={idx * 0.15} duration={0.8} className="flex flex-col gap-3 p-6 bg-white/40 border border-carbon/5 rounded-2xl relative text-left">
                <span className="font-sans text-[9px] tracking-widest uppercase text-stone/50 font-bold">Resource {idx + 1}</span>
                <h3 className="font-sans text-lg font-light text-carbon">{t.title}</h3>
                <p className="font-sans text-xs text-stone/85 leading-relaxed font-light">{t.desc}</p>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Summary section */}
      <section className="w-full py-28 px-6 md:px-12 bg-travertine">
        <div className="max-w-3xl mx-auto flex flex-col gap-6 text-left">
          <h3 className="font-sans text-xl md:text-2xl font-light tracking-tight text-carbon">
            Supporting the Frontlines of Education
          </h3>
          <p className="font-sans text-xs md:text-sm text-stone leading-relaxed font-light">
            {ICEBERG.academicPartnership}
          </p>
          <p className="font-sans text-xs md:text-sm text-stone leading-relaxed font-light">
            Through academic sponsorships and research grants, we maintain a close, active loop with departments globally to advance AI curriculum standards. For grant inquiries, reach us at{" "}
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
