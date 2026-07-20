/**
 * useMagneticHover.ts
 * Magnetic cursor effect for CTA buttons.
 * The element gently pulls toward the cursor, snapping back on leave.
 *
 * Usage:
 *   const magneticRef = useMagneticHover<HTMLAnchorElement>();
 *   <a ref={magneticRef}>Click</a>
 */

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

interface MagneticOptions {
  /** Strength of pull. 0.3 = subtle, 0.6 = strong. Default: 0.35 */
  strength?: number;
  /** Spring-back duration in seconds. Default: 0.6 */
  returnDuration?: number;
}

export function useMagneticHover<T extends HTMLElement = HTMLElement>(
  options: MagneticOptions = {}
) {
  const { strength = 0.35, returnDuration = 0.6 } = options;
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Skip on touch/mobile devices
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (isTouch) return;

    // Skip if user prefers reduced motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = (e.clientX - centerX) * strength;
      const dy = (e.clientY - centerY) * strength;

      gsap.to(el, {
        x: dx,
        y: dy,
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const onLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: returnDuration,
        ease: "elastic.out(1, 0.4)",
        overwrite: "auto",
      });
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      gsap.set(el, { x: 0, y: 0 });
    };
  }, [strength, returnDuration]);

  return ref;
}
