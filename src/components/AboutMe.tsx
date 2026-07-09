"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  Terminal, 
  ChevronRight, 
  ChevronLeft, 
  Award, 
  BookOpen, 
  History,
  Rocket
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { TiltCard } from "./TiltCard";
import { PortraitFrame } from "./PortraitFrame";

const codeSnippet = [
  "const idea = new Idea('Barande');",
  "const product = compiler.build(idea);",
  "await product.optimize({ LCP: 100, SEO: 100 });",
];

export const AboutMe: React.FC = () => {
  const { t, isRtl } = useLanguage();
  
  // Custom navigation helper to scroll to contact section
  const handleContactScroll = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      const headerOffset = 90;
      const elementPosition = contactSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // State machine for the Magic Compiler Card
  const [compilerLines, setCompilerLines] = useState<string[]>([]);
  const [compilerState, setCompilerState] = useState<"typing" | "compiling" | "success">("typing");
  const compileTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (compilerState === "typing") {
      let lineIdx = 0;
      let charIdx = 0;
      let currentLine = "";
      
      const typeNextChar = () => {
        if (lineIdx < codeSnippet.length) {
          const fullLine = codeSnippet[lineIdx];
          if (charIdx < fullLine.length) {
            currentLine += fullLine[charIdx];
            setCompilerLines((prev) => {
              const next = [...prev];
              if (next[lineIdx] !== undefined) {
                next[lineIdx] = currentLine;
              } else {
                next.push(currentLine);
              }
              return next;
            });
            charIdx++;
            compileTimerRef.current = setTimeout(typeNextChar, 35);
          } else {
            // Line completed, move to next
            lineIdx++;
            charIdx = 0;
            currentLine = "";
            compileTimerRef.current = setTimeout(typeNextChar, 300);
          }
        } else {
          // Typing complete, trigger compilation
          setCompilerState("compiling");
        }
      };

      typeNextChar();
    } else if (compilerState === "compiling") {
      compileTimerRef.current = setTimeout(() => {
        setCompilerState("success");
      }, 1500);
    } else if (compilerState === "success") {
      compileTimerRef.current = setTimeout(() => {
        setCompilerLines([]);
        setCompilerState("typing");
      }, 4000);
    }

    return () => {
      if (compileTimerRef.current) {
        clearTimeout(compileTimerRef.current);
      }
    };
  }, [compilerState]);

  return (
    <section 
      id="about" 
      className="py-24 relative overflow-hidden"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Grid lines background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
      
      {/* Heading Section */}
      <div className="max-w-6xl mx-auto px-6 mb-16 text-center md:text-start relative z-10">
        <span className="font-body text-xs font-normal tracking-widest uppercase text-white/30">
          {t("aboutTagline")}
        </span>
        <h2 className="font-display text-4xl leading-[1.1] font-normal text-white mt-2">
          {t("aboutTitle")}
        </h2>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 relative z-10 items-stretch">
        
        {/* CARD 1: The Journey - Spans 2 columns on large screens */}
        <TiltCard maxRotation={0} className="lg:col-span-2 min-h-[380px] h-auto flex flex-col justify-between group">
          <div className="flex flex-col justify-between h-full">
            <div>
              {/* Badge & Icon */}
              <div className={`flex items-center gap-3 mb-4 ${isRtl ? "flex-row-reverse" : "flex-row"}`}>
                <div className="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800">
                  <History className="w-5 h-5 text-[#E6C17A]" />
                </div>
                <span className="px-2.5 py-1 rounded bg-zinc-900/80 border border-zinc-800 text-[10px] font-mono font-bold uppercase text-amber-100/90">
                  {t("aboutBadgeJourney")}
                </span>
              </div>
              
              {/* Content */}
              <p className={`font-body text-sm md:text-base leading-relaxed text-zinc-400 font-normal ${isRtl ? "text-right" : "text-left"}`}>
                {t("aboutParagraph1")}
              </p>
            </div>

            {/* Timeline Visualizer */}
            <div className="mt-8 border-t border-zinc-900 pt-6">
              <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${isRtl ? "sm:flex-row-reverse" : ""}`}>
                
                {/* Year 2000 Milestone */}
                <div className={`flex items-center gap-3 ${isRtl ? "flex-row-reverse" : "flex-row"}`}>
                  <div className="w-8 h-8 rounded-full border border-[#E6C17A]/25 flex items-center justify-center bg-zinc-900/80 text-[10px] font-mono text-[#E6C17A] font-bold">
                    00
                  </div>
                  <div className={`${isRtl ? "text-right" : "text-left"}`}>
                    <div className="text-xs font-bold text-zinc-200">HTML / CSS</div>
                    <div className="text-[10px] text-zinc-500">First Website built</div>
                  </div>
                </div>

                {/* Arrow Connector */}
                <div className="hidden sm:block flex-1 h-[1px] bg-gradient-to-r from-[#E6C17A]/20 via-zinc-800 to-[#E6C17A]/20 mx-4 relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-zinc-700" />
                </div>

                {/* Udemy Milestone */}
                <div className={`flex items-center gap-3 ${isRtl ? "flex-row-reverse" : "flex-row"}`}>
                  <div className="w-8 h-8 rounded-full border border-zinc-800 flex items-center justify-center bg-zinc-900/80 text-[10px] font-mono text-zinc-400 font-bold">
                    <BookOpen className="w-3.5 h-3.5" />
                  </div>
                  <div className={`${isRtl ? "text-right" : "text-left"}`}>
                    <div className="text-xs font-bold text-zinc-200">Udemy Deep Dive</div>
                    <div className="text-[10px] text-zinc-500">Self-Taught Scaling</div>
                  </div>
                </div>

                {/* Arrow Connector */}
                <div className="hidden sm:block flex-1 h-[1px] bg-gradient-to-r from-zinc-800 via-[#E6C17A]/20 to-[#E6C17A] mx-4 relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-zinc-700" />
                </div>

                {/* Present Day Milestone */}
                <div className={`flex items-center gap-3 ${isRtl ? "flex-row-reverse" : "flex-row"}`}>
                  <div className="w-8 h-8 rounded-full border border-[#E6C17A] flex items-center justify-center bg-amber-100/10 text-[10px] font-mono text-[#E6C17A] font-bold shadow-[0_0_10px_rgba(230,193,122,0.1)]">
                    26
                  </div>
                  <div className={`${isRtl ? "text-right" : "text-left"}`}>
                    <div className="text-xs font-bold text-[#E6C17A]">Next.js / TS</div>
                    <div className="text-[10px] text-amber-100/60 font-mono">Expert Mastery</div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </TiltCard>

        {/* CARD 2: Interactive Portrait Frame - Spans 1 column */}
        <div className="flex justify-center items-center py-2 h-full">
          <PortraitFrame maxRotation={0} />
        </div>

        {/* CARD 3: Magic & Philosophy - Spans 1 column */}
        <TiltCard maxRotation={0} className="min-h-[380px] h-auto flex flex-col justify-between group">
          <div className="flex flex-col justify-between h-full">
            <div>
              {/* Badge & Icon */}
              <div className={`flex items-center gap-3 mb-4 ${isRtl ? "flex-row-reverse" : "flex-row"}`}>
                <div className="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800">
                  <Terminal className="w-5 h-5 text-[#E6C17A]" />
                </div>
                <span className="px-2.5 py-1 rounded bg-zinc-900/80 border border-zinc-800 text-[10px] font-mono font-bold uppercase text-amber-100/90">
                  {t("aboutBadgePhilosophy")}
                </span>
              </div>

              {/* Content */}
              <p className={`font-body text-sm md:text-base leading-relaxed text-zinc-400 font-normal mb-6 ${isRtl ? "text-right" : "text-left"}`}>
                {t("aboutParagraph2")}
              </p>
            </div>

            {/* Magic Compiler Mock Editor */}
            <div className="rounded-xl border border-zinc-800/85 bg-black/50 p-4 font-mono text-[11px] leading-relaxed relative overflow-hidden shadow-inner h-[135px]">
              <div className="flex justify-between items-center pb-2 border-b border-zinc-900/80 mb-2">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-zinc-800" />
                  <span className="w-2 h-2 rounded-full bg-zinc-800" />
                  <span className="w-2 h-2 rounded-full bg-zinc-800" />
                </div>
                <span className="text-[9px] text-zinc-600 font-mono tracking-widest uppercase">magic_compiler.js</span>
              </div>

              <div className="text-zinc-500 font-mono text-[10px] select-none">
                {compilerLines.map((line, i) => (
                  <div key={i} className="text-zinc-300">
                    <span className="text-zinc-600 mr-2">{i + 1}</span> {line}
                    {i === compilerLines.length - 1 && compilerState === "typing" && (
                      <span className="w-1.5 h-3 bg-zinc-400 inline-block animate-pulse ml-0.5" />
                    )}
                  </div>
                ))}
              </div>

              <AnimatePresence>
                {compilerState === "compiling" && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/80 flex flex-col justify-center items-center gap-2"
                  >
                    <div className="w-4 h-4 border border-t-[#E6C17A] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" />
                    <span className="text-[10px] text-amber-100/80 uppercase tracking-widest">Compiling Magic...</span>
                  </motion.div>
                )}

                {compilerState === "success" && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/85 flex flex-col justify-center items-center gap-1.5 text-center px-4"
                  >
                    <div className="p-1 rounded bg-amber-100/10 border border-[#E6C17A]/30 mb-0.5">
                      <Sparkles className="w-4 h-4 text-[#E6C17A] animate-pulse" />
                    </div>
                    <span className="text-[10px] text-[#E6C17A] font-bold uppercase tracking-widest">Build Successful</span>
                    <span className="text-[9px] text-zinc-500 font-mono">Output: 100% Tactile Masterpiece</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </TiltCard>

        {/* CARD 4: Masterpiece & CTA - Spans 2 columns on large screens */}
        <TiltCard maxRotation={0} className="lg:col-span-2 min-h-[380px] h-auto flex flex-col justify-between group">
          <div className="flex flex-col justify-between h-full w-full">
            
            {/* Top Part: Content */}
            <div>
              {/* Badge & Icon */}
              <div className={`flex items-center gap-3 mb-4 ${isRtl ? "flex-row-reverse" : "flex-row"}`}>
                <div className="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800">
                  <Award className="w-5 h-5 text-[#E6C17A]" />
                </div>
                <span className="px-2.5 py-1 rounded bg-zinc-900/80 border border-zinc-800 text-[10px] font-mono font-bold uppercase text-amber-100/90">
                  {t("aboutBadgeAchievement")}
                </span>
              </div>

              {/* Content */}
              <p className={`font-body text-sm md:text-base leading-relaxed text-zinc-400 font-normal ${isRtl ? "text-right" : "text-left"}`}>
                {t("aboutParagraph3")}
              </p>
            </div>

            {/* Middle Part: App Logo Link (centered below text) */}
            <div className="flex justify-center items-center my-6 w-full">
              <a 
                href="https://www.barande.app" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-[90%] max-w-[500px] block hover:scale-[1.02] active:scale-[0.99] transition-all duration-300 relative group/logo cursor-pointer"
                aria-label="Visit Barande App"
              >
                <div className="w-full h-[120px] sm:h-[150px] rounded-2xl overflow-hidden border border-zinc-800 bg-white/95 p-4 shadow-2xl flex items-center justify-center relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src="/barande_logo.jpg" 
                    alt="Barande Logo" 
                    className="w-[90%] h-[90%] object-contain select-none pointer-events-none"
                  />
                  <div className="absolute inset-0 border border-black/5 rounded-2xl pointer-events-none" />
                </div>
              </a>
            </div>

            {/* Bottom Part: CTA Interaction Block */}
            <div className="mt-4 border-t border-zinc-900 pt-6">
              <div className={`flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 ${isRtl ? "sm:flex-row-reverse" : ""}`}>
                <div className={`flex flex-col ${isRtl ? "items-start sm:items-end text-right" : "items-start text-left"}`}>
                  <span className="text-xs font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
                    <Rocket className="w-3.5 h-3.5 text-[#E6C17A] animate-pulse" /> Barande Full-Stack App
                  </span>
                  <span className="text-[10px] text-zinc-500 font-mono mt-0.5">Secure Escrow • Realtime Matching • Mobile & Web UI</span>
                </div>

                <button
                  onClick={handleContactScroll}
                  className="relative z-50 pointer-events-auto px-6 py-3 rounded-xl bg-amber-100/10 hover:bg-amber-100/20 border border-amber-100/25 hover:border-[#E6C17A]/50 font-body text-sm font-normal text-amber-100 tracking-wider uppercase transition-all duration-300 shadow-[0_0_15px_rgba(230,193,122,0.05)] cursor-pointer active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>{t("navLetsBuild")}</span>
                  {isRtl ? (
                    <ChevronLeft className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </TiltCard>

      </div>
    </section>
  );
};
