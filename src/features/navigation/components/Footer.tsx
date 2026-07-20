"use client";

import { NAVIGATION_LINKS } from "../config/links";
import { Github, Linkedin, Twitter, Youtube } from "lucide-react";
import { Dock, DockIcon } from "@/components/ui/dock";
import { BRAND } from "@/core/context";

const DiscordIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 127.14 96.36" fill="currentColor" {...props}>
    <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,53.22,6.83,77.19,77.19,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C3.66,31.58-1.86,54.65,1,77.53A105.73,105.73,0,0,0,32,96.36a77.7,77.7,0,0,0,6.63-10.85,68.43,68.43,0,0,1-10.5-5A52,52,0,0,0,31.42,78a75.14,75.14,0,0,0,64.3,0,52,52,0,0,0,3.27,2.48,68.43,68.43,0,0,1-10.5,5,77.7,77.7,0,0,0,6.63,10.85,105.73,105.73,0,0,0,31-18.83C129,54.65,122.64,31.58,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.83,46,53.83,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.07,46,96.07,53,91,65.69,84.69,65.69Z" />
  </svg>
);

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialChannels = [
    { name: "GitHub", icon: Github, href: "https://github.com", color: "#181717", rgb: "24, 23, 23" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com", color: "#0077B5", rgb: "0, 119, 181" },
    { name: "X", icon: Twitter, href: "https://x.com", color: "#000000", rgb: "0, 0, 0" },
    { name: "Discord", icon: DiscordIcon, href: "https://discord.gg", color: "#5865F2", rgb: "88, 101, 242" },
    { name: "YouTube", icon: Youtube, href: "https://youtube.com", color: "#FF0000", rgb: "255, 0, 0" }
  ];

  return (
    <footer 
      role="contentinfo" 
      aria-label="Site Footer Index" 
      className="w-full bg-travertine text-charcoal py-16 px-6 md:px-12 border-t border-carbon/5 relative overflow-hidden"
    >
      {/* Cosmic Nebula Pink/Violet Backdrop Glow */}
      <div className="absolute right-[-10%] bottom-[-10%] w-[350px] md:w-[600px] h-[250px] md:h-[400px] rounded-full bg-gradient-to-tr from-pink-500/10 via-purple-500/5 to-transparent blur-3xl pointer-events-none z-0" />

      {/* Giant Background Wordmark Text */}
      <div className="absolute bottom-[-6%] left-0 w-full text-center text-[12vw] md:text-[14vw] font-bold tracking-[0.15em] text-transparent bg-gradient-to-tr from-pink-500/5 via-violet-600/5 to-transparent bg-clip-text select-none pointer-events-none z-0 uppercase">
        Orionac
      </div>

      <div className="w-full max-w-5xl mx-auto flex flex-col gap-10 relative z-10">
        
        {/* Row 1: Split Socials (Left Half) & Wide Email Input (Right Half) */}
        <div className="flex flex-col md:flex-row justify-between gap-12 pb-12 border-b border-carbon/5">
          
          {/* Left Half: 5 Social Channels with Custom Brand Color Glows inside MagicUI Dock */}
          <div className="md:w-1/2 flex flex-col gap-4 text-left justify-center">
            <h4 className="font-sans text-[10px] tracking-[0.25em] uppercase text-stone font-semibold">
              Connect
            </h4>
            <p className="font-sans text-xs text-stone/85 font-light">
              Follow our research publications, repository logs, and developer updates.
            </p>
            <div className="flex items-center mt-1">
              <Dock className="mx-0 mt-0 flex h-[48px] w-max items-center justify-center gap-3 rounded-full border border-carbon/5 bg-carbon/5 p-1 backdrop-blur-sm pointer-events-auto">
                {socialChannels.map((ch) => {
                  const IconComp = ch.icon;
                  return (
                    <DockIcon
                      key={ch.name}
                      className="rounded-full flex items-center justify-center bg-white border border-carbon/5 transition-all duration-300 shadow-sm"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = `0 0 15px rgba(${ch.rgb}, 0.55)`;
                        e.currentTarget.style.color = ch.color;
                        e.currentTarget.style.backgroundColor = "#ffffff";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = "none";
                        e.currentTarget.style.color = "";
                        e.currentTarget.style.backgroundColor = "";
                      }}
                      onClick={() => window.open(ch.href, "_blank", "noopener,noreferrer")}
                    >
                      <IconComp className="w-4 h-4" />
                    </DockIcon>
                  );
                })}
              </Dock>
            </div>
          </div>

          {/* Right Half: Wide Email Box Subscription */}
          <div className="md:w-1/2 flex flex-col gap-3 w-full text-left items-start">
            <h4 className="font-sans text-[10px] tracking-[0.25em] uppercase text-stone font-semibold">
              Newsletter
            </h4>
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                alert("Subscription registered.");
              }} 
              className="flex flex-col sm:flex-row gap-2 w-full max-w-xl"
            >
              <input 
                type="email" 
                required 
                placeholder="Enter your email address" 
                className="font-sans text-xs bg-carbon/5 border border-carbon/10 rounded-full px-5 py-3 text-carbon flex-grow focus:outline-none focus:border-cosmic-blue transition-colors placeholder:text-stone/40 w-full"
              />
              <button 
                type="submit"
                className="font-sans text-[10px] tracking-widest uppercase px-6 py-3 rounded-full bg-carbon text-travertine hover:bg-cosmic-blue hover:text-white transition-all duration-300 font-semibold cursor-pointer whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
            <p className="font-sans text-[10px] text-stone/60 font-light">
              Receive parameter release notices and research updates from {BRAND.name}.
            </p>
          </div>

        </div>

        {/* Row 2: Link Grid (Sourced from shared configuration) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-b border-carbon/5">
          {(Object.keys(NAVIGATION_LINKS) as Array<keyof typeof NAVIGATION_LINKS>).map((key) => {
            const column = NAVIGATION_LINKS[key];
            return (
              <nav 
                key={key} 
                aria-label={`${column.title} links`} 
                className="flex flex-col gap-4 text-left"
              >
                <h4 className="font-sans text-[10px] tracking-[0.25em] uppercase text-stone font-semibold">
                  {column.title}
                </h4>
                <ul className="flex flex-col gap-2.5 font-serif text-sm font-light">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        aria-label={
                          link.href.startsWith("mailto:")
                            ? `Email Orionac at ${link.label}`
                            : `Navigate to ${link.label}`
                        }
                        className="text-carbon hover:text-cosmic-blue hover:underline transition-colors duration-300 block py-0.5"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            );
          })}
        </div>

        {/* Row 3: Meta & Identity Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 text-sm md:text-base text-stone/85 font-light pt-6 border-t border-carbon/5">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <span className="font-sans text-xs md:text-sm tracking-[0.2em] uppercase font-bold text-carbon">Orionac</span>
            <span className="hidden sm:inline text-carbon/10">|</span>
            <span>&copy; {new Date().getFullYear()} All rights reserved.</span>
            <span className="hidden sm:inline text-carbon/10">|</span>
            <address className="not-italic select-text text-stone/70">
              {BRAND.hq.address}
            </address>
          </div>

          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-cosmic-blue hover:underline transition-colors duration-300 font-medium">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-cosmic-blue hover:underline transition-colors duration-300 font-medium">
              Terms of Service
            </a>
            <button
              onClick={handleScrollToTop}
              className="font-sans text-[10px] md:text-xs tracking-widest uppercase text-stone hover:text-cosmic-blue hover:underline cursor-pointer transition-all duration-300 font-semibold"
              aria-label="Scroll back to top of the page"
            >
              Back to top
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
