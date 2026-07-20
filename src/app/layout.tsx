import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Orionac — Beyond Intelligence",
  description: "A research-first AI organization building efficient foundation models and transforming modern education ecosystems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full antialiased", "font-sans", geist.variable)}>
      <body className="min-h-full flex flex-col relative">
        {/* Global tactile grain background filter */}
        <svg className="sr-only" aria-hidden="true">
          <filter id="noiseFilter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.6"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.035 0"
            />
          </filter>
        </svg>
        <div 
          className="pointer-events-none fixed inset-0 z-50 opacity-100 mix-blend-overlay noise-bg"
          aria-hidden="true"
        />
        
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
