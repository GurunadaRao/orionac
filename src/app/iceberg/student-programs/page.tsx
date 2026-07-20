"use client";

import PageWrapper from "@/features/navigation/components/PageWrapper";
import SectionWrapper from "@/features/storytelling/components/SectionWrapper";
import { BlurFade } from "@/components/ui/blur-fade";
import { ICEBERG, BRAND } from "@/core/context";

const opportunities = [
  { type: "Summer Fellowships", duration: "12 Weeks", stipend: "Sponsored", desc: "Work directly on foundation model research alongside core Orionac engineers, contributing to our open academic release pipeline." },
  { type: "Open Classroom Labs", duration: "Continuous", stipend: "Access-only", desc: "Utilize inference testing playgrounds and edge compilers to run localized models on your own hardware — no cloud required." },
  { type: "Hackathons & Challenges", duration: "Annual", stipend: "Prize Pool", desc: "Build optimized, practical AI systems targeting real-world hardware latency and efficiency targets set by our research team." }
];

export default function StudentProgramsPage() {
  return (
    <PageWrapper>
      <SectionWrapper id="students-header" className="relative min-h-[70vh] justify-center text-center">
        <div className="max-w-3xl flex flex-col items-center gap-4">
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold font-semibold">
            Active Outreach
          </span>
          <h1 className="font-sans text-4xl md:text-5xl font-light tracking-tight text-carbon">
            Student Programs
          </h1>
          <p className="font-sans text-sm text-stone max-w-xl leading-relaxed font-light mt-2">
            Providing computing resources, fellowships, and research mentorship to next-generation AI builders.
          </p>
        </div>
      </SectionWrapper>

      {/* Grid of opportunities */}
      <section className="w-full bg-silk/30 py-24 border-y border-carbon/5 px-6 md:px-12">
        <div className="max-w-4xl mx-auto flex flex-col gap-10 text-left">
          <div className="flex flex-col gap-2">
            <span className="font-sans text-[10px] tracking-widest text-gold uppercase font-semibold">Student Track</span>
            <h2 className="font-sans text-2xl md:text-3xl font-light text-carbon tracking-tight">Active Opportunities</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {opportunities.map((o, idx) => (
              <BlurFade key={o.type} delay={idx * 0.15} duration={0.8} className="flex flex-col gap-4 p-6 bg-white/40 border border-carbon/5 rounded-2xl relative text-left justify-between">
                <div className="flex flex-col gap-2">
                  <span className="font-sans text-[9px] tracking-widest uppercase text-gold font-bold">{o.stipend} · {o.duration}</span>
                  <h3 className="font-sans text-lg font-light text-carbon">{o.type}</h3>
                  <p className="font-sans text-xs text-stone/85 leading-relaxed font-light mt-1">{o.desc}</p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="w-full py-28 px-6 md:px-12 bg-travertine">
        <div className="max-w-3xl mx-auto flex flex-col gap-6 text-left">
          <h3 className="font-sans text-xl md:text-2xl font-light tracking-tight text-carbon">
            Open Scientific Cultivation
          </h3>
          <p className="font-sans text-xs md:text-sm text-stone leading-relaxed font-light">
            {ICEBERG.practicalSovereignty}
          </p>
          {/* Iceberg tagline */}
          <blockquote className="border-l-2 border-gold/40 pl-4">
            <p className="font-serif text-base md:text-lg text-stone/80 font-light italic leading-relaxed">
              &ldquo;{ICEBERG.tagline}&rdquo;
            </p>
          </blockquote>
          <p className="font-sans text-xs md:text-sm text-stone leading-relaxed font-light">
            Institutional barriers should not block promising research talent. Apply or reach out at{" "}
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
