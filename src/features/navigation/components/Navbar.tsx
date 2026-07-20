"use client";

import React, { useRef, useState, useCallback, useMemo, useEffect } from "react";

export default function Navbar() {
  const navContainerRef = useRef<HTMLDivElement>(null);
  const researchTabRef = useRef<HTMLAnchorElement>(null);
  const icebergTabRef = useRef<HTMLAnchorElement>(null);
  const companyTabRef = useRef<HTMLAnchorElement>(null);
  const contactTabRef = useRef<HTMLAnchorElement>(null);

  const [activeTab, setActiveTab] = useState<'research' | 'iceberg' | 'company' | 'contact' | null>(null);

  // Sliding hover pill states
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [hoverPosition, setHoverPosition] = useState<{ left: number; width: number; height: number; top: number } | null>(null);

  // Track visibility to fade in navigation chrome after initial load
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);


  // Optimized entry handler: avoids expensive offset recalculation during scroll/drag updates
  const handleMouseEnter = useCallback((
    e: React.MouseEvent<HTMLAnchorElement>,
    tab: 'research' | 'iceberg' | 'company' | 'contact'
  ) => {
    setActiveTab(tab);
    
    // Activate sliding hover pill coordinates
    const target = e.currentTarget;
    setHoveredTab(tab);
    setHoverPosition({
      left: target.offsetLeft,
      width: target.offsetWidth,
      height: target.offsetHeight,
      top: target.offsetTop,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setActiveTab(null);
    setHoveredTab(null);
  }, []);

  // Determine height of the Apple full-width dropdown based on content columns
  const dropdownHeight = useMemo(() => {
    if (!activeTab) return 0;
    return activeTab === 'research' || activeTab === 'iceberg' ? 250 : 220;
  }, [activeTab]);

  // Memoize sub-menus to prevent heavy DOM reconciliations on sliding pill re-renders
  const dropdownContent = useMemo(() => {
    if (!activeTab) return null;
    
    switch (activeTab) {
      case 'research':
        return (
          <div className="max-w-5xl mx-auto py-8 px-12 grid grid-cols-4 gap-8">
            <div className="animate-fade-in flex flex-col gap-3">
              <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-stone font-semibold">Explore</span>
              <div className="flex flex-col gap-2 font-serif text-sm">
                <a href="/research/foundation-models" className="text-carbon hover:text-cosmic-blue transition-colors font-medium">Foundation Models</a>
                <a href="/research/mirage" className="text-carbon hover:text-cosmic-blue transition-colors font-medium">Mirage E-1.0</a>
                <a href="/research/edge-ai" className="text-carbon hover:text-cosmic-blue transition-colors font-medium">Edge AI</a>
              </div>
            </div>
            <div className="animate-fade-in flex flex-col gap-3" style={{ animationDelay: '50ms' }}>
              <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-stone font-semibold">Architectures</span>
              <div className="flex flex-col gap-2 font-serif text-sm">
                <a href="/research/efficient-architectures" className="text-carbon hover:text-cosmic-blue transition-colors font-medium">Efficient Architectures</a>
                <a href="/research/agentic-systems" className="text-carbon hover:text-cosmic-blue transition-colors font-medium">Agentic Systems</a>
              </div>
            </div>
            <div className="animate-fade-in flex flex-col gap-3" style={{ animationDelay: '100ms' }}>
              <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-stone font-semibold">Resources</span>
              <div className="flex flex-col gap-2 font-serif text-sm">
                <a href="/research/foundation-models" className="text-carbon hover:text-cosmic-blue transition-colors font-medium">Research Papers</a>
                <a href="/research/efficient-architectures" className="text-carbon hover:text-cosmic-blue transition-colors font-medium">Technical Metrics</a>
              </div>
            </div>
            <div className="animate-fade-in flex flex-col gap-3" style={{ animationDelay: '150ms' }}>
              <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-stone font-semibold">Milestones</span>
              <p className="font-serif text-xs text-stone leading-relaxed">
                Mirage E-1.0 is targeted for public research parameters release within the next three months.
              </p>
            </div>
          </div>
        );
      case 'iceberg':
        return (
          <div className="max-w-5xl mx-auto py-8 px-12 grid grid-cols-4 gap-8">
            <div className="animate-fade-in flex flex-col gap-3">
              <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-stone font-semibold">Ecosystem</span>
              <div className="flex flex-col gap-2 font-serif text-sm">
                <a href="/iceberg/overview" className="text-carbon hover:text-cosmic-blue transition-colors font-medium">Overview</a>
                <a href="/iceberg/ai-literacy" className="text-carbon hover:text-cosmic-blue transition-colors font-medium">AI Literacy</a>
              </div>
            </div>
            <div className="animate-fade-in flex flex-col gap-3" style={{ animationDelay: '50ms' }}>
              <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-stone font-semibold">Networks</span>
              <div className="flex flex-col gap-2 font-serif text-sm">
                <a href="/iceberg/partnerships" className="text-carbon hover:text-cosmic-blue transition-colors font-medium">Institutional Partnerships</a>
                <a href="/iceberg/partnerships" className="text-carbon hover:text-cosmic-blue transition-colors font-medium">Academic Grants</a>
              </div>
            </div>
            <div className="animate-fade-in flex flex-col gap-3" style={{ animationDelay: '100ms' }}>
              <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-stone font-semibold">Programs</span>
              <div className="flex flex-col gap-2 font-serif text-sm">
                <a href="/iceberg/student-programs" className="text-carbon hover:text-cosmic-blue transition-colors font-medium">Student Programs</a>
                <a href="/iceberg/faculty-development" className="text-carbon hover:text-cosmic-blue transition-colors font-medium">Faculty Development</a>
              </div>
            </div>
            <div className="animate-fade-in flex flex-col gap-3" style={{ animationDelay: '150ms' }}>
              <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-stone font-semibold">Mission</span>
              <p className="font-serif text-xs text-stone leading-relaxed">
                Iceberg is designed to bridge cutting-edge research to real-world educational deployment.
              </p>
            </div>
          </div>
        );
      case 'company':
        return (
          <div className="max-w-5xl mx-auto py-8 px-12 grid grid-cols-4 gap-8">
            <div className="animate-fade-in flex flex-col gap-3">
              <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-stone font-semibold">About</span>
              <div className="flex flex-col gap-2 font-serif text-sm">
                <a href="/company/about" className="text-carbon hover:text-cosmic-blue transition-colors font-medium">About Orionac</a>
                <a href="/company/philosophy" className="text-carbon hover:text-cosmic-blue transition-colors font-medium">Research Philosophy</a>
              </div>
            </div>
            <div className="animate-fade-in flex flex-col gap-3" style={{ animationDelay: '50ms' }}>
              <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-stone font-semibold">Foundations</span>
              <div className="flex flex-col gap-2 font-serif text-sm">
                <a href="/company/vision" className="text-carbon hover:text-cosmic-blue transition-colors font-medium">Vision & Mission</a>
                <a href="/company/collaborations" className="text-carbon hover:text-cosmic-blue transition-colors font-medium">Academic Collaborations</a>
              </div>
            </div>
            <div className="animate-fade-in flex flex-col gap-3" style={{ animationDelay: '100ms' }}>
              <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-stone font-semibold">Headquarters</span>
              <p className="font-serif text-xs text-stone leading-relaxed">
                Chennai, India.<br />Sponsoring open academic partnerships globally.
              </p>
            </div>
          </div>
        );
      case 'contact':
        return (
          <div className="max-w-5xl mx-auto py-8 px-12 grid grid-cols-4 gap-8">
            <div className="animate-fade-in flex flex-col gap-3">
              <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-stone font-semibold">Inquiries</span>
              <div className="flex flex-col gap-2 font-serif text-sm">
                <a href="/contact" className="text-carbon hover:text-cosmic-blue transition-colors font-medium">Get in Touch</a>
                <a href="/contact" className="text-carbon hover:text-cosmic-blue transition-colors font-medium">Partner with Us</a>
              </div>
            </div>
            <div className="animate-fade-in flex flex-col gap-3" style={{ animationDelay: '50ms' }}>
              <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-stone font-semibold">Opportunities</span>
              <div className="flex flex-col gap-2 font-serif text-sm">
                <a href="/contact" className="text-carbon hover:text-cosmic-blue transition-colors font-medium">Open Roles</a>
              </div>
            </div>
            <div className="animate-fade-in flex flex-col gap-3" style={{ animationDelay: '100ms' }}>
              <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-stone font-semibold">Direct Email</span>
              <div className="flex flex-col gap-2">
                <a href="mailto:hello@orionac.io" className="font-sans text-xs text-carbon hover:text-cosmic-blue font-medium tracking-wider select-text normal-case transition-colors duration-300">
                  hello@orionac.io
                </a>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  }, [activeTab]);

  return (
    <div className="fixed top-6 left-0 w-full z-50 px-6 md:px-8 flex justify-center pointer-events-none">
      <nav 
        ref={navContainerRef}
        onMouseLeave={handleMouseLeave}
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translate3d(0, 0, 0) scale(1)' : 'translate3d(0, -16px, 0) scale(0.95)',
          pointerEvents: isVisible ? 'auto' : 'none',
        }}
        className={`w-full max-w-none glass-panel px-8 py-3.5 flex items-center justify-between pointer-events-auto border border-carbon/5 shadow-sm relative transition-all duration-500 ease-in-out will-change-[border-radius,transform,opacity] ${
          activeTab ? "rounded-t-[34px] rounded-b-none" : "rounded-[34px]"
        }`}
      >
        {/* Brand Logo Wrapper */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="cursor-pointer hover:opacity-75 transition-opacity flex items-center p-1 rounded-lg hover:bg-carbon/5 transition-all z-10"
        >
          <img src="https://orionac.io/logo.png" alt="Orionac Logo" className="h-10 w-auto object-contain rounded-md" />
        </div>
        
        {/* Nav Tabs */}
        <div className="flex items-center gap-2 font-sans text-xs tracking-widest uppercase relative py-1">
          
          {/* Hardware GPU-Accelerated Shared Sliding Hover Background Pill */}
          <div 
            style={{
              left: hoverPosition ? `${hoverPosition.left}px` : '0px',
              width: hoverPosition ? `${hoverPosition.width}px` : '0px',
              height: hoverPosition ? `${hoverPosition.height}px` : '0px',
              top: hoverPosition ? `${hoverPosition.top}px` : '0px',
              opacity: hoveredTab ? 1 : 0,
            }}
            className="absolute bg-carbon/5 rounded-full transition-all duration-300 ease-out pointer-events-none z-0 will-change-[left,width,opacity] transform-gpu"
          />

          <a 
            ref={researchTabRef}
            onMouseEnter={(e) => handleMouseEnter(e, 'research')}
            href="#research" 
            className="relative z-10 px-4 py-2 text-stone hover:text-carbon rounded-full transition-colors duration-300"
          >
            Research
          </a>
          <a 
            ref={icebergTabRef}
            onMouseEnter={(e) => handleMouseEnter(e, 'iceberg')}
            href="#iceberg" 
            className="relative z-10 px-4 py-2 text-stone hover:text-carbon rounded-full transition-colors duration-300"
          >
            Iceberg
          </a>
          <a 
            ref={companyTabRef}
            onMouseEnter={(e) => handleMouseEnter(e, 'company')}
            href="#company" 
            className="relative z-10 px-4 py-2 text-stone hover:text-carbon rounded-full transition-colors duration-300"
          >
            Company
          </a>
          <a 
            ref={contactTabRef}
            onMouseEnter={(e) => handleMouseEnter(e, 'contact')}
            href="#contact" 
            className="relative z-10 px-4 py-2 text-stone hover:text-carbon rounded-full transition-colors duration-300"
          >
            Contact
          </a>
        </div>

        {/* CTA: Get Started Button */}
        <div className="z-10">
          <a 
            href="#join"
            className="font-sans text-[11px] tracking-widest uppercase px-5 py-2.5 rounded-full border border-charcoal/10 hover:border-charcoal hover:bg-carbon hover:text-travertine transition-all duration-300 font-medium"
          >
            Get Started
          </a>
        </div>

        {/* Plain Apple-style Full-width Dropdown Panel with GPU Rasterization */}
        <div 
          style={{
            height: `${dropdownHeight}px`,
            opacity: activeTab ? 1 : 0,
            pointerEvents: activeTab ? 'auto' : 'none',
          }}
          className="absolute top-full left-0 w-full bg-silk/95 backdrop-blur-3xl border-t border-carbon/5 shadow-md transition-all duration-300 ease-out z-40 overflow-hidden rounded-b-3xl will-change-[height,opacity] transform-gpu"
        >
          {dropdownContent}
        </div>
      </nav>
    </div>
  );
}
