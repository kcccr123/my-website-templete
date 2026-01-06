"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PageTransition from "./components/PageTransition";
import TypedText from "./components/TypedText";
import SocialLinks from "./components/SocialLinks";
import GitHubContributions from "./components/GitHubContributions";
import SlideIn from "./components/SlideIn";
import ExpandArrow from "./components/ExpandArrow";
import AboutMeMarkdown from "./components/AboutMeMarkdown";

export default function Home() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const aboutMeContent = `
I'm Kevin Chen, a developer who likes building clean, expressive interfaces and dependable systems.
I focus on thoughtful design, strong fundamentals, and shipping polished experiences.

- Full-stack and UI engineering
- Curious about systems and developer tooling
- Always iterating and learning
`;

  return (
    <PageTransition>
      <div className="min-h-screen font-sans pt-64 pb-12 page-gutters">
        {/* Centered container that maintains shape */}
        <div className="page-container flex flex-col gap-10">
          {/* Top row */}
          <div>
            <SlideIn direction="top" delay={0.1} className="flex items-start">
              <TypedText 
                text="Hi There!🫡" 
                typingSpeed={80}
                className="w-full"
                textClassName="hero-text font-sans"
              />
            </SlideIn>
          </div>

          {/* Bottom row */}
          <div>
            <div className="grid w-full grid-cols-1 md:grid-cols-[minmax(320px,440px)_minmax(0,1fr)] gap-8 items-start">
              {/* Left: Social Links - narrow column */}
              <SlideIn direction="left" delay={0.3}>
                <SocialLinks 
                  github="https://github.com/kcccr123"
                  linkedin="https://www.linkedin.com/in/kevin-chen-095702262/"
                  email="kevinz.chen@mail.utoronto.ca"
                  title="Links"
                  minHeight="260px"
                />
              </SlideIn>

              {/* Right: GitHub Contributions - wider column */}
              <SlideIn direction="right" delay={0.5}>
                <GitHubContributions 
                  username="kcccr123" 
                  title="GitHub Activity Tracker"
                  minHeight="320px"
                  maxWidth="100%"
                />
              </SlideIn>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 pt-2">
            <button
              type="button"
              onClick={() => setIsAboutOpen((prev) => !prev)}
              aria-expanded={isAboutOpen}
              aria-controls="about-me-section"
              className="group inline-flex items-center gap-3 rounded-full border border-[var(--color-glass-border)] bg-[var(--color-glass)] px-6 py-3 text-[clamp(0.95rem,1.4vw,1.1rem)] font-medium text-white/90 transition-all duration-300 hover:border-[var(--color-glass-border-hover)] hover:text-white"
            >
              <span>{isAboutOpen ? "Hide About Me" : "About Me"}</span>
              <ExpandArrow
                isOpen={isAboutOpen}
                className="text-white/80 group-hover:text-white transition-colors duration-300"
              />
            </button>

            <AnimatePresence initial={false}>
              {isAboutOpen && (
                <motion.div
                  id="about-me-section"
                  role="region"
                  initial={{ height: 0, opacity: 0, y: -8 }}
                  animate={{ height: "auto", opacity: 1, y: 0 }}
                  exit={{ height: 0, opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="w-full overflow-hidden"
                >
                  <AboutMeMarkdown title="About Me" content={aboutMeContent} className="w-full" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
