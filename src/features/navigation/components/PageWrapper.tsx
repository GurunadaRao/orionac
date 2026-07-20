"use client";

import Navbar from "./Navbar";
import Footer from "./Footer";

interface PageWrapperProps {
  children: React.ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  return (
    <div className="relative w-full min-h-screen bg-travertine text-charcoal select-none overflow-x-hidden flex flex-col justify-between">
      {/* Dynamic Capsule Sticky Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow w-full pt-28">
        {children}
      </main>

      {/* Shared Sitemap Index Footer */}
      <Footer />
    </div>
  );
}
