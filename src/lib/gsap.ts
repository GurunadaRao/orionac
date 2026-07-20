/**
 * src/lib/gsap.ts
 * Central GSAP plugin registration and reusable animation presets.
 * Import this ONCE at the top of any component that uses GSAP.
 * ScrollTrigger is already registered in SmoothScroll.tsx for Lenis sync.
 */

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";

// Register all plugins in one place
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, Flip);
}

// ─── Premium easing constants ─────────────────────────────────────────────────
/** Apple/Framer-style spring feel */
export const EASE_PREMIUM = "power3.out";
/** Extra smooth for large elements */
export const EASE_SILK = "power4.out";
/** Sharp entry for small UI elements */
export const EASE_SNAP = "power2.out";
/** Gentle fade easings */
export const EASE_GENTLE = "power1.inOut";

// ─── Default ScrollTrigger config ─────────────────────────────────────────────
export const DEFAULT_ST_CONFIG: ScrollTrigger.Vars = {
  start: "top 82%",
  once: true,
  toggleActions: "play none none none",
};

// ─── Reveal presets ───────────────────────────────────────────────────────────

/**
 * Fade + slide up from below. The standard entrance.
 */
export function revealFromBelow(
  targets: gsap.TweenTarget,
  options: {
    duration?: number;
    y?: number;
    delay?: number;
    stagger?: number;
    ease?: string;
    scrollTrigger?: ScrollTrigger.Vars;
  } = {}
) {
  const {
    duration = 0.9,
    y = 28,
    delay = 0,
    stagger = 0,
    ease = EASE_PREMIUM,
    scrollTrigger,
  } = options;

  return gsap.fromTo(
    targets,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      stagger,
      ease,
      scrollTrigger,
    }
  );
}

/**
 * Horizontal line draw — for decorative rules and dividers.
 * Animates scaleX from 0 → 1, origin left.
 */
export function lineReveal(
  target: gsap.TweenTarget,
  options: { duration?: number; delay?: number; scrollTrigger?: ScrollTrigger.Vars } = {}
) {
  const { duration = 0.8, delay = 0, scrollTrigger } = options;
  return gsap.fromTo(
    target,
    { scaleX: 0, transformOrigin: "left center" },
    { scaleX: 1, duration, delay, ease: EASE_PREMIUM, scrollTrigger }
  );
}

/**
 * Clip-path curtain reveal — element rises up from behind a mask.
 * Works on cards, images, large blocks.
 */
export function clipReveal(
  target: gsap.TweenTarget,
  options: {
    duration?: number;
    delay?: number;
    direction?: "up" | "down" | "left" | "right";
    scrollTrigger?: ScrollTrigger.Vars;
  } = {}
) {
  const { duration = 1.0, delay = 0, direction = "up", scrollTrigger } = options;

  const clipStart: Record<string, string> = {
    up: "inset(100% 0% 0% 0%)",
    down: "inset(0% 0% 100% 0%)",
    left: "inset(0% 100% 0% 0%)",
    right: "inset(0% 0% 0% 100%)",
  };

  return gsap.fromTo(
    target,
    { clipPath: clipStart[direction], opacity: 1 },
    {
      clipPath: "inset(0% 0% 0% 0%)",
      duration,
      delay,
      ease: EASE_SILK,
      scrollTrigger,
    }
  );
}

/**
 * Character/word mask reveal — each word slides up from behind its own clip.
 * Manual SplitText equivalent (no Club GSAP required).
 *
 * @param element - The DOM element whose text should be split
 * @param options - Animation options
 * @returns GSAP timeline
 */
export function splitWordReveal(
  element: HTMLElement | null,
  options: {
    duration?: number;
    stagger?: number;
    delay?: number;
    y?: number;
    ease?: string;
    scrollTrigger?: ScrollTrigger.Vars;
  } = {}
): gsap.core.Timeline | null {
  if (!element) return null;

  const {
    duration = 0.75,
    stagger = 0.06,
    delay = 0,
    y = 40,
    ease = EASE_PREMIUM,
    scrollTrigger,
  } = options;

  // Split text into word spans wrapped in clip containers
  const originalHTML = element.innerHTML;
  const words = originalHTML.split(/(\s+)/);

  element.innerHTML = words
    .map((word) => {
      if (/^\s+$/.test(word)) return word;
      return `<span class="gsap-word-outer" style="display:inline-block;overflow:hidden;vertical-align:bottom;"><span class="gsap-word-inner" style="display:inline-block;">${word}</span></span>`;
    })
    .join("");

  const inners = element.querySelectorAll<HTMLElement>(".gsap-word-inner");

  const tl = gsap.timeline({ scrollTrigger, delay });
  tl.fromTo(
    inners,
    { y, opacity: 0 },
    { y: 0, opacity: 1, duration, stagger, ease }
  );

  return tl;
}

export { gsap, ScrollTrigger, Flip };
