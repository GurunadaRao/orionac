"use client";

import HeroSection from "./hero/HeroSection";
import ProofStrip from "./proof/ProofStrip";
import DualPillars from "./pillars/DualPillars";
import MirageSpotlight from "./mirage/MirageSpotlight";
import MissionGrid from "./mission/MissionGrid";
import JoinSection from "./join/JoinSection";

export default function ScrollJourney() {
  return (
    <div className="w-full relative flex flex-col bg-travertine text-charcoal">
      {/* Act 1 — Opening statement + CTAs */}
      <HeroSection />

      {/* Act 2 — Proof Strip: stats + marquee (social proof near the fold) */}
      <ProofStrip />

      {/* Act 3 — Dual Pillars: Research + Iceberg with individual CTAs */}
      <DualPillars />

      {/* Act 4 — Mirage Spotlight: upcoming model release */}
      <MirageSpotlight />

      {/* Act 5 — Mission Grid: 4 mission verb cards */}
      <MissionGrid />

      {/* Act 6 — Join / CTA: newsletter subscription */}
      <JoinSection />
    </div>
  );
}
