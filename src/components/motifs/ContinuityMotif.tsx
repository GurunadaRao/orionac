"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";

interface ContinuityMotifProps {
  className?: string;
  isAnimated?: boolean;
  style?: React.CSSProperties;
}

export default function ContinuityMotif({
  className = "",
  isAnimated = true,
  style = {},
}: ContinuityMotifProps) {
  const shouldReduceMotion = useReducedMotion();

  // Draw timing configuration
  const drawTransition = {
    duration: shouldReduceMotion ? 0 : 2.5,
    ease: [0.16, 1, 0.3, 1] as const, // Custom premium cubic-bezier
    delay: shouldReduceMotion ? 0 : 0.75, // Matches the sequence timing
  };

  // Idle animation config: extremely slow, low-frequency subtle drift
  const idleAnimation = shouldReduceMotion
    ? {}
    : {
        rotate: [0, 3, -3, 0],
        scale: [1, 1.04, 0.96, 1],
        y: [0, 4, -4, 0],
      };

  const idleTransition = shouldReduceMotion
    ? {}
    : {
        rotate: {
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut" as const,
        },
        scale: {
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut" as const,
        },
        y: {
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut" as const,
        },
      };

  return (
    <div
      className={`relative select-none pointer-events-none w-full h-full flex items-center justify-center ${className}`}
      style={style}
    >
      <motion.svg
        viewBox="0 0 400 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto overflow-visible"
        aria-hidden="true"
        animate={isAnimated ? idleAnimation : {}}
        transition={idleTransition}
      >
        <defs>
          <linearGradient id="gradient-carbon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#111111" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#1C1C1E" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="gradient-gold" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C2A27C" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#C2A27C" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Primary structural helix wave (Carbon/Charcoal gradient) */}
        <motion.path
          d="M 20,100 C 100,-10 140,210 200,100 C 260,-10 300,210 380,100"
          stroke="url(#gradient-carbon)"
          strokeWidth="1.75"
          strokeLinecap="round"
          initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
          animate={isAnimated ? { pathLength: 1 } : { pathLength: 0 }}
          transition={drawTransition}
        />

        {/* Intersecting secondary wave (Gold gradient) */}
        <motion.path
          d="M 20,100 C 100,210 140,-10 200,100 C 260,210 300,-10 380,100"
          stroke="url(#gradient-gold)"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeDasharray="4 6"
          initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
          animate={isAnimated ? { pathLength: 1 } : { pathLength: 0 }}
          transition={drawTransition}
        />

        {/* Central focal node (subtle core connection point) */}
        <motion.circle
          cx="200"
          cy="100"
          r="3"
          fill="#C2A27C"
          initial={{ scale: shouldReduceMotion ? 1 : 0, opacity: shouldReduceMotion ? 1 : 0 }}
          animate={isAnimated ? { scale: 1, opacity: 0.8 } : {}}
          transition={{
            delay: shouldReduceMotion ? 0 : 1.25,
            duration: 0.5,
            ease: "easeOut",
          }}
        />
      </motion.svg>
    </div>
  );
}
