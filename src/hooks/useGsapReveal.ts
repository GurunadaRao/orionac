/**
 * useGsapReveal.ts
 * Drop-in ScrollTrigger entrance hook. Replaces all IntersectionObserver
 * patterns throughout the codebase with Lenis-synchronized GSAP reveals.
 *
 * Usage:
 *   const { ref } = useGsapReveal((el) => {
 *     gsap.from(el.querySelector("h2"), { opacity: 0, y: 24,
 *       scrollTrigger: { trigger: el, start: "top 80%", once: true }
 *     });
 *   });
 */

"use client";

import { useEffect, useRef, useCallback } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

// Callback receives only the element — ctx is managed internally by the hook
type RevealCallback = (element: HTMLElement) => void;

interface UseGsapRevealOptions {
  /** Respect prefers-reduced-motion. Default: true */
  respectMotion?: boolean;
  /** ScrollTrigger start. Default: "top 82%" */
  start?: string;
}

export function useGsapReveal<T extends HTMLElement = HTMLElement>(
  callback: RevealCallback,
  options: UseGsapRevealOptions = {}
) {
  const { respectMotion = true, start = "top 82%" } = options;
  const ref = useRef<T>(null);
  const ctxRef = useRef<gsap.Context | null>(null);

  const stableCallback = useCallback(callback, []); // eslint-disable-line

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Honor prefers-reduced-motion
    if (respectMotion) {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (mq.matches) return;
    }

    // Wait one frame so Lenis has initialized scroll position
    const raf = requestAnimationFrame(() => {
      // Create context first, then invoke callback inside it.
      // Passing ctx into the callback caused a TDZ error because
      // `const ctx` hadn't been assigned when the inner function ran.
      const ctx = gsap.context(() => {
        stableCallback(el);
        ScrollTrigger.refresh();
      }, el);

      ctxRef.current = ctx;
    });

    return () => {
      cancelAnimationFrame(raf);
      ctxRef.current?.revert();
      ctxRef.current = null;
    };
  }, [stableCallback, respectMotion, start]);

  return { ref };
}
