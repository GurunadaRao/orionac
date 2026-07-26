"use client";

import { cn } from "@/lib/utils";

const PALETTES = {
  cool: ["rgba(46,91,255,0.16)", "rgba(177,135,249,0.14)", "rgba(46,91,255,0.08)"],
  warm: ["rgba(194,162,124,0.18)", "rgba(177,135,249,0.10)", "rgba(194,162,124,0.08)"],
  spectrum: ["rgba(46,91,255,0.14)", "rgba(177,135,249,0.14)", "rgba(194,162,124,0.12)"],
} as const;

interface GradientMeshProps {
  className?: string;
  /** Color grouping — cool (blue/purple), warm (gold/purple), or spectrum (all three). */
  variant?: keyof typeof PALETTES;
}

/**
 * GradientMesh — a soft, slowly-drifting aurora of blurred color blobs.
 * Pure CSS (no canvas/WebGL). Drop it inside a `relative` container as a
 * background layer; it's `pointer-events-none` and `aria-hidden`.
 */
export function GradientMesh({ className, variant = "spectrum" }: GradientMeshProps) {
  const [a, b, c] = PALETTES[variant];

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}
    >
      <div
        className="absolute w-[55%] aspect-square rounded-full blur-[100px] animate-mesh-drift-a"
        style={{ background: a, top: "-10%", left: "-5%" }}
      />
      <div
        className="absolute w-[45%] aspect-square rounded-full blur-[100px] animate-mesh-drift-b"
        style={{ background: b, top: "10%", right: "-8%" }}
      />
      <div
        className="absolute w-[40%] aspect-square rounded-full blur-[90px] animate-mesh-drift-c"
        style={{ background: c, bottom: "-15%", left: "30%" }}
      />
    </div>
  );
}
