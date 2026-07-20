"use client";

import { useState } from "react";
import PageWrapper from "@/features/navigation/components/PageWrapper";
import SectionWrapper from "@/features/storytelling/components/SectionWrapper";
import { BlurFade } from "@/components/ui/blur-fade";
import { GlyphMatrix } from "@/components/ui/glyph-matrix";
import { HIRING, BRAND } from "@/core/context";

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [inquiryType, setInquiryType] = useState("Academic Research Collaboration");
  const [message, setMessage] = useState("");

  const handleForm = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const roles = HIRING.openRoles;

  return (
    <PageWrapper>
      {/* 1. Header Section with Matrix Background */}
      <section className="relative w-full min-h-[50vh] flex flex-col items-center justify-center text-center overflow-hidden bg-travertine border-b border-carbon/5 pt-32 pb-16 px-6 md:px-12">
        {/* Shifting Matrix Overlay */}
        <div className="absolute inset-0 z-0 opacity-[0.12] pointer-events-none">
          <GlyphMatrix 
            glyphs="01·•+*/\<>=" 
            cellSize={15} 
            mutationRate={0.03} 
            interval={100} 
            fadeBottom={0.9} 
            color="#1C1C1E" 
          />
        </div>
        
        {/* Soft edge fade overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-travertine via-transparent to-travertine pointer-events-none z-10" />

        <div className="max-w-3xl flex flex-col items-center gap-5 relative z-20">
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold font-bold">
            Inquiries
          </span>
          <h1 className="font-serif text-[clamp(2.5rem,6vw,4.5rem)] font-normal leading-[1.08] tracking-tight text-carbon">
            Orionac Desk
          </h1>
          <p className="font-sans text-stone text-sm md:text-base max-w-xl leading-relaxed font-light mt-2">
            Get in touch for institutional sponsorships, faculty grants, fellowships, or explore open research opportunities at{" "}
            <a href={`mailto:${BRAND.contact.email}`} className="text-carbon underline underline-offset-2 hover:text-gold transition-colors duration-300">{BRAND.contact.email}</a>.
          </p>
        </div>
      </section>

      {/* 2. Main Layout (Interactive Inquiry Form & Careers) */}
      <section className="w-full bg-silk/15 py-24 px-6 md:px-12 text-left">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Side: Interactive Contact Form (7 columns) */}
          <div className="lg:col-span-7 flex flex-col gap-8 w-full">
            <div className="flex flex-col gap-2">
              <span className="font-sans text-[10px] tracking-widest text-gold uppercase font-bold">
                Inquiry Desk
              </span>
              <h2 className="font-serif text-3xl font-normal text-carbon tracking-tight">
                {HIRING.ctaCopy}
              </h2>
            </div>

            {formSubmitted ? (
              <BlurFade delay={0.1} className="p-10 bg-white border border-carbon/5 shadow-sm rounded-3xl text-center flex flex-col items-center justify-center gap-4 min-h-[350px]">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-2">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="font-sans text-xs text-carbon font-bold uppercase tracking-widest">
                  Message Dispatched
                </span>
                <p className="font-sans text-xs text-stone leading-relaxed max-w-sm font-light">
                  Thank you, <span className="font-medium text-carbon">{name}</span>. Your inquiry regarding <span className="font-medium text-carbon">{inquiryType}</span> at <span className="font-medium text-carbon">{org}</span> has been logged. A researcher will verify details and reach out.
                </p>
                <button 
                  onClick={() => {
                    setFormSubmitted(false);
                    setName("");
                    setOrg("");
                    setMessage("");
                  }}
                  className="font-sans text-[10px] uppercase tracking-wider font-semibold px-6 py-2.5 rounded-full border border-carbon/10 hover:border-carbon/30 text-stone hover:text-carbon transition-colors duration-300 mt-4"
                >
                  Submit Another Inquiry
                </button>
              </BlurFade>
            ) : (
              <form 
                onSubmit={handleForm} 
                className="flex flex-col gap-6 bg-white/50 border border-carbon/5 p-8 md:p-10 rounded-[32px] backdrop-blur-md shadow-sm"
              >
                {/* Name field */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="form-name" className="font-sans text-[9px] uppercase tracking-widest text-stone font-bold">
                    Your Name / Title
                  </label>
                  <input 
                    required 
                    id="form-name"
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="font-sans text-xs p-3.5 rounded-xl border border-carbon/10 bg-white/70 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all duration-300 placeholder:text-stone/40 text-carbon" 
                    placeholder="e.g. Dr. Sarah Vance" 
                  />
                </div>

                {/* Organization field */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="form-org" className="font-sans text-[9px] uppercase tracking-widest text-stone font-bold">
                    Organization / Lab
                  </label>
                  <input 
                    required 
                    id="form-org"
                    type="text" 
                    value={org}
                    onChange={(e) => setOrg(e.target.value)}
                    className="font-sans text-xs p-3.5 rounded-xl border border-carbon/10 bg-white/70 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all duration-300 placeholder:text-stone/40 text-carbon" 
                    placeholder="e.g. MIT CSAIL" 
                  />
                </div>

                {/* Inquiry dropdown */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="form-type" className="font-sans text-[9px] uppercase tracking-widest text-stone font-bold">
                    Inquiry Type
                  </label>
                  <div className="relative">
                    <select 
                      id="form-type"
                      value={inquiryType}
                      onChange={(e) => setInquiryType(e.target.value)}
                      className="w-full font-sans text-xs p-3.5 rounded-xl border border-carbon/10 bg-white/70 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all duration-300 appearance-none text-carbon cursor-pointer"
                    >
                      <option value="Academic Research Collaboration">Academic Research Collaboration</option>
                      <option value="Iceberg Curriculum Integration">Iceberg Curriculum Integration</option>
                      <option value="Fellowship Opportunities">Fellowship Opportunities</option>
                      <option value="Other Inquiries">Other Inquiries</option>
                    </select>
                    {/* Custom caret */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-stone">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Message details */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="form-message" className="font-sans text-[9px] uppercase tracking-widest text-stone font-bold">
                    Message Details
                  </label>
                  <textarea 
                    required 
                    id="form-message"
                    rows={4} 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="font-sans text-xs p-3.5 rounded-xl border border-carbon/10 bg-white/70 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all duration-300 resize-none placeholder:text-stone/40 text-carbon" 
                    placeholder="Provide background details of your project or proposal..." 
                  />
                </div>

                <button 
                  type="submit" 
                  className="font-sans text-[10px] uppercase tracking-[0.2em] py-4 px-8 rounded-full bg-carbon text-white hover:bg-gold hover:text-carbon active:scale-[0.98] transition-all duration-300 font-bold mt-4 shadow-sm cursor-pointer"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Right Side: Open Roles (5 columns) */}
          <div className="lg:col-span-5 flex flex-col gap-8 w-full">
            <div className="flex flex-col gap-2">
              <span className="font-sans text-[10px] tracking-widest text-gold uppercase font-bold">
                Join the Lab
              </span>
              <h2 className="font-serif text-3xl font-normal text-carbon tracking-tight">
                Open Opportunities
              </h2>
            </div>

            <address className="not-italic select-text text-stone/70">
              {BRAND.hq.address}
            </address>

            <div className="flex flex-col gap-6">
              {roles.map((r, idx) => (
                <BlurFade key={r.id} delay={idx * 0.15} className="flex flex-col gap-5 p-6 bg-white/40 border border-carbon/5 hover:border-carbon/15 rounded-3xl transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 group">
                  <div className="flex flex-col gap-1.5">
                    <span className="font-sans text-[9px] uppercase tracking-wider text-gold font-bold block">
                      {r.division} · {r.type} · {BRAND.hq.city}, India
                    </span>
                    <h3 className="font-sans text-lg font-medium text-carbon leading-snug group-hover:text-gold transition-colors duration-300">
                      {r.title}
                    </h3>
                    <p className="font-sans text-xs text-stone/80 font-light leading-relaxed mt-1">{r.description}</p>
                  </div>
                  
                  <div className="flex flex-col gap-2.5 border-t border-carbon/5 pt-4">
                    <span className="font-sans text-[9px] uppercase tracking-wider text-stone font-bold">
                      Key Responsibilities:
                    </span>
                    <ul className="flex flex-col gap-2 pl-1 select-text">
                      {r.responsibilities.map((resp, rIdx) => (
                        <li key={rIdx} className="font-sans text-xs text-stone/85 leading-relaxed font-light flex items-start gap-2">
                          <span className="text-gold mt-1.5 block w-1 h-1 rounded-full shrink-0 bg-gold" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>

        </div>
      </section>
    </PageWrapper>
  );
}
