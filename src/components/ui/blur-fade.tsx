"use client";

import React, { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface BlurFadeProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
}

export function BlurFade({
  children,
  className,
  delay = 0,
  duration = 0.8,
  yOffset = 12,
}: BlurFadeProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);

    const container = containerRef.current;
    if (!container) return;

    // Respect reduced-motion settings
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(container);
    return () => {
      observer.unobserve(container);
    };
  }, []);

  // Compute CSS translate style based on visibility
  const translateStyle = isInView ? "translate3d(0, 0, 0)" : `translate3d(0, ${yOffset}px, 0)`;
  const blurStyle = isInView ? "blur(0px)" : "blur(12px)";
  const opacityStyle = isInView ? "1" : "0";

  return (
    <div
      ref={containerRef}
      className={cn("transition-all ease-out transform-gpu", className)}
      style={{
        opacity: isMounted ? opacityStyle : "0",
        filter: isMounted ? blurStyle : "blur(12px)",
        transform: isMounted ? translateStyle : `translate3d(0, ${yOffset}px, 0)`,
        transitionDuration: `${duration * 1000}ms`,
        transitionDelay: `${delay * 1000}ms`,
        willChange: "transform, opacity, filter",
      }}
    >
      {children}
    </div>
  );
}
