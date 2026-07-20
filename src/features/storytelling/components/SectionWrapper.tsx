"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface SectionWrapperProps {
  id: string;
  className?: string;
  children: ReactNode;
}

export default function SectionWrapper({ id, className = "", children }: SectionWrapperProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect user prefers-reduced-motion settings
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -10% 0px", // Trigger slightly before it enters full viewport
      }
    );

    const currentEl = elementRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      if (currentEl) {
        observer.unobserve(currentEl);
      }
    };
  }, []);

  return (
    <section
      id={id}
      ref={elementRef}
      className={`w-full min-h-screen flex flex-col items-center justify-center py-24 px-6 md:px-12 transition-all duration-1000 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
        {children}
      </div>
    </section>
  );
}
