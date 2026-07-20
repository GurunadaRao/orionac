"use client";

import Navbar from "@/features/navigation/components/Navbar";
import ScrollJourney from "@/features/storytelling/components/ScrollJourney";
import Footer from "@/features/navigation/components/Footer";

export default function Home() {
  return (
    <div className="relative w-full min-h-screen bg-travertine text-charcoal select-none overflow-x-hidden">
      {/* Sticky Capsule Navigation */}
      <Navbar />

      {/* Narrative Scroll Journey acts */}
      <ScrollJourney />

      {/* Structured Footer Layer */}
      <Footer />
    </div>
  );
}
