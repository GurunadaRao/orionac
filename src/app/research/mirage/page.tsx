import type { Metadata } from "next";
import PageWrapper from "@/features/navigation/components/PageWrapper";
import MirageHero from "@/features/storytelling/components/mirage/MirageHero";
import MirageSpecGrid from "@/features/storytelling/components/mirage/MirageSpecGrid";
import MirageArchitecture from "@/features/storytelling/components/mirage/MirageArchitecture";
import MirageComparison from "@/features/storytelling/components/mirage/MirageComparison";
import MirageRoadmap from "@/features/storytelling/components/mirage/MirageRoadmap";
import MirageCTA from "@/features/storytelling/components/mirage/MirageCTA";

export const metadata: Metadata = {
  title: "Mirage E-1.0 — Orionac",
  description:
    "Orionac's flagship foundation model: sparse dynamic routing, quantized local inference, and open academic release.",
};

export default function MiragePage() {
  return (
    <PageWrapper>
      <MirageHero />
      <MirageSpecGrid />
      <MirageArchitecture />
      <MirageComparison />
      <MirageRoadmap />
      <MirageCTA />
    </PageWrapper>
  );
}
