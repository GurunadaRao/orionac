"use client";

import { useState } from "react";

interface FocusItem {
  id: string;
  title: string;
  description: string;
}

interface FocusListProps {
  items: FocusItem[];
}

export default function FocusList({ items }: FocusListProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-6 text-left">
      {items.map((item) => {
        const isHovered = hoveredId === item.id;
        const isAnyHovered = hoveredId !== null;

        return (
          <div
            key={item.id}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="group relative border-b border-carbon/5 py-4 transition-all duration-300 cursor-pointer"
          >
            {/* Title Line */}
            <div className="flex items-center justify-between">
              <h3
                className={`font-sans text-lg md:text-xl font-light tracking-tight transition-all duration-300 ${
                  isHovered
                    ? "text-carbon translate-x-2 font-medium"
                    : isAnyHovered
                    ? "text-stone/40"
                    : "text-stone"
                }`}
              >
                {item.title}
              </h3>
              
              {/* Understated indicator arrow */}
              <span
                className={`font-sans text-xs transition-all duration-500 ${
                  isHovered ? "text-cosmic-blue translate-x-0 opacity-100" : "text-stone/20 -translate-x-2 opacity-0"
                }`}
              >
                →
              </span>
            </div>

            {/* Expandable/Inline Description Block */}
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                isHovered
                  ? "grid-rows-[1fr] opacity-100 mt-2"
                  : "grid-rows-[0fr] opacity-0 pointer-events-none"
              }`}
            >
              <div className="overflow-hidden">
                <p className="font-sans text-xs md:text-sm text-stone leading-relaxed font-light pl-2 border-l border-cosmic-blue/20">
                  {item.description}
                </p>
              </div>
            </div>

            {/* Mobile Fallback: Persistent details for touch viewports */}
            <div className="md:hidden block mt-1">
              <p className="font-sans text-[11px] text-stone/70 leading-relaxed font-light">
                {item.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
