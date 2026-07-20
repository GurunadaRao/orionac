"use client";

import { useState } from "react";
import PageWrapper from "@/features/navigation/components/PageWrapper";
import SectionWrapper from "@/features/storytelling/components/SectionWrapper";
import { BlurFade } from "@/components/ui/blur-fade";
import { ICEBERG, RESEARCH, BRAND } from "@/core/context";

const programs = [
  { type: "Curriculum Integration", detail: "Embedding Orionac's practical AI course modules into university computer science programmes, moving students toward systems-level intelligence construction." },
  { type: "Joint Research Labs", detail: "Co-founding physical university laboratory testbeds focused on real-world AI deployment, edge inference, and open model development." },
  { type: "Academic Grants", detail: "Distributing computing access and research sponsorships directly to professors and departments pursuing hands-on AI education." }
];

// Keep select options in sync with programs array above
const partnershipTypes = programs.map((p) => p.type);

export default function PartnershipsPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <PageWrapper>
      <SectionWrapper id="partnerships-header" className="relative min-h-[70vh] justify-center text-center">
        <div className="max-w-3xl flex flex-col items-center gap-4">
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold font-semibold">
            Collaboration Desk
          </span>
          <h1 className="font-sans text-4xl md:text-5xl font-light tracking-tight text-carbon">
            Institutional Partnerships
          </h1>
          <p className="font-sans text-sm text-stone max-w-xl leading-relaxed font-light mt-2">
            Connecting global academic networks with practical AI education tools, sponsored research labs, and open curricula.
          </p>
        </div>
      </SectionWrapper>

      {/* Program Types */}
      <section className="w-full bg-silk/30 py-24 border-y border-carbon/5 px-6 md:px-12">
        <div className="max-w-4xl mx-auto flex flex-col gap-10 text-left">
          <div className="flex flex-col gap-2">
            <span className="font-sans text-[10px] tracking-widest text-gold uppercase font-semibold">Collaboration Frameworks</span>
            <h2 className="font-sans text-2xl md:text-3xl font-light text-carbon tracking-tight">Partnership Pathways</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {programs.map((p, idx) => (
              <BlurFade key={p.type} delay={idx * 0.15} duration={0.8} className="flex flex-col gap-3 p-6 bg-white/40 border border-carbon/5 rounded-2xl relative text-left">
                <span className="font-sans text-[9px] tracking-widest uppercase text-stone/50 font-bold">Model {idx + 1}</span>
                <h3 className="font-sans text-lg font-light text-carbon">{p.type}</h3>
                <p className="font-sans text-xs text-stone/85 leading-relaxed font-light">{p.detail}</p>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="w-full py-28 px-6 md:px-12 bg-travertine text-charcoal">
        <div className="max-w-lg mx-auto flex flex-col gap-8 text-left">
          <div className="flex flex-col gap-2">
            <span className="font-sans text-[10px] tracking-widest text-gold uppercase font-semibold">Application Form</span>
            <h3 className="font-sans text-2xl md:text-3xl font-light tracking-tight text-carbon">
              Register Partnership Inquiry
            </h3>
            <p className="font-sans text-xs text-stone font-light leading-relaxed">
              {RESEARCH.principles[2].description}
            </p>
          </div>

          {submitted ? (
            <BlurFade delay={0.1} className="p-6 bg-white border border-carbon/10 rounded-2xl text-center">
              <span className="font-sans text-xs text-stone font-semibold uppercase tracking-wider">Inquiry Received</span>
              <p className="font-sans text-xs text-stone/80 mt-2 font-light">
                Our academic relations team will reach out within 48 hours at{" "}
                <a href={`mailto:${BRAND.contact.email}`} className="text-carbon underline underline-offset-2">
                  {BRAND.contact.email}
                </a>
                .
              </p>
            </BlurFade>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 bg-white/50 border border-carbon/5 p-8 rounded-3xl backdrop-blur-md">
              <div className="flex flex-col gap-1.5">
                <label className="font-sans text-[9px] uppercase tracking-wider text-stone font-bold">Institution Name</label>
                <input required type="text" className="font-sans text-xs p-3 rounded-xl border border-carbon/5 bg-white/60 focus:outline-none focus:border-gold" placeholder="e.g. Stanford CS Department" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-sans text-[9px] uppercase tracking-wider text-stone font-bold">Point of Contact Email</label>
                <input required type="email" className="font-sans text-xs p-3 rounded-xl border border-carbon/5 bg-white/60 focus:outline-none focus:border-gold" placeholder="e.g. research@institution.edu" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-sans text-[9px] uppercase tracking-wider text-stone font-bold">Preferred Pathway</label>
                <select className="font-sans text-xs p-3 rounded-xl border border-carbon/5 bg-white/60 focus:outline-none focus:border-gold">
                  {partnershipTypes.map((pt) => (
                    <option key={pt}>{pt}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className="font-sans text-xs uppercase tracking-widest py-3 px-6 rounded-full bg-carbon text-white hover:bg-gold hover:text-carbon transition-colors duration-300 font-semibold mt-4">
                Submit Inquiry
              </button>
            </form>
          )}
        </div>
      </section>
    </PageWrapper>
  );
}
