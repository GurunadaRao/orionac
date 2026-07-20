"use client";

import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface InteractiveGridPatternProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: number;
  height?: number;
  strokeColor?: string;
  glowColor?: string;
  glowRadius?: number;
}

export function InteractiveGridPattern({
  width = 48,
  height = 48,
  strokeColor = "rgba(17, 17, 17, 0.05)", // Understated carbon lines
  glowColor = "rgba(46, 91, 255, 0.12)", // Cosmic Blue soft glow
  glowRadius = 160,
  className,
  ...props
}: InteractiveGridPatternProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => {
      setIsHovered(false);
      setMousePos({ x: -1000, y: -1000 });
    };

    container.addEventListener("mousemove", handleMouseMove, { passive: true });
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0", className)}
      {...props}
    >
      <svg className="w-full h-full">
        <defs>
          {/* Main Grid pattern */}
          <pattern
            id="grid-pattern"
            width={width}
            height={height}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${width} 0 L 0 0 0 ${height}`}
              fill="none"
              stroke={strokeColor}
              strokeWidth="0.75"
            />
          </pattern>

          {/* Mask tracking the cursor glow */}
          <radialGradient
            id="hover-glow-grad"
            cx={mousePos.x}
            cy={mousePos.y}
            r={glowRadius}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor={glowColor} stopOpacity={1} />
            <stop offset="50%" stopColor="rgba(236, 72, 153, 0.04)" stopOpacity={0.3} /> {/* Pink Nebula hint */}
            <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" stopOpacity={0} />
          </radialGradient>
        </defs>

        {/* 1. Base Grid Layer */}
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />

        {/* 2. Hover Glow Overlay (GPU accelerated opacity translation) */}
        {isHovered && (
          <rect
            width="100%"
            height="100%"
            fill="url(#hover-glow-grad)"
            className="transition-opacity duration-500 ease-out pointer-events-none"
            style={{ mixBlendMode: "multiply" }}
          />
        )}
      </svg>
    </div>
  );
}
