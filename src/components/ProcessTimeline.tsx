"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Compass, Cpu, Rocket } from "lucide-react";
import { useLanguage, getBulletsForLocale } from "@/context/LanguageContext";

interface Step {
  num: string;
  title: string;
  icon: React.ReactNode;
  desc: string;
  bullets: string[];
}

export const ProcessTimeline: React.FC = () => {
  const { t, locale, isRtl } = useLanguage();
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Track scrolling within this section to fill up the timeline track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const steps: Step[] = [
    {
      num: "01",
      title: t("processStep1Title"),
      icon: <Compass className="w-6 h-6 text-[#E6C17A]" />,
      desc: t("processStep1Desc"),
      bullets: getBulletsForLocale(locale, "processStep1Bullets"),
    },
    {
      num: "02",
      title: t("processStep2Title"),
      icon: <Cpu className="w-6 h-6 text-[#E6C17A]" />,
      desc: t("processStep2Desc"),
      bullets: getBulletsForLocale(locale, "processStep2Bullets"),
    },
    {
      num: "03",
      title: t("processStep3Title"),
      icon: <Rocket className="w-6 h-6 text-[#E6C17A]" />,
      desc: t("processStep3Desc"),
      bullets: getBulletsForLocale(locale, "processStep3Bullets"),
    },
  ];

  return (
    <div ref={containerRef} className="relative max-w-5xl mx-auto px-6 py-12 select-none">
      
      {/* Central Glowing vertical timeline connector line (Desktop Only) */}
      <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-1 bg-zinc-800 rounded-full hidden md:block overflow-hidden">
        {/* Fill animation indicator */}
        <motion.div
          style={{ scaleY: scaleY, originY: 0 }}
          className="w-full h-full bg-gradient-to-b from-white via-[#E6C17A] to-zinc-800 shadow-[0_0_8px_rgba(230,193,122,0.3)]"
        />
      </div>

      <div className="flex flex-col gap-16 md:gap-24 relative">
        {steps.map((step, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <div 
              key={idx}
              className={`flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0 relative ${
                isEven ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              
              {/* Central floating Icon nodes on timeline */}
              <div className="absolute left-1/2 -translate-x-1/2 top-0 -mt-1 w-10 h-10 rounded-full bg-slate-950 border-2 border-[#E6C17A]/30 hidden md:flex items-center justify-center z-10 shadow-[0_0_15px_rgba(230,193,122,0.15)] group">
                <motion.div 
                   initial={{ rotate: 0 }}
                   whileInView={{ rotate: 360 }}
                   transition={{ duration: 1, delay: 0.1 }}
                   viewport={{ once: true }}
                   className="p-1"
                >
                  {step.icon}
                </motion.div>
              </div>

              {/* Card Container */}
              <motion.div
                initial={{ opacity: 0, x: isRtl ? (isEven ? 50 : -50) : (isEven ? -50 : 50), y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
                className="w-full md:w-[45%] glass-panel rounded-2xl p-6 md:p-8 relative group text-start"
              >
                {/* Decorative glow backing */}
                <div className="absolute inset-0 rounded-2xl bg-amber-500/0 group-hover:bg-[#E6C17A]/2 transition-all duration-300 pointer-events-none" />

                {/* Big Step Number indicator */}
                <div className="absolute top-4 right-6 rtl:right-auto rtl:left-6 text-4xl md:text-5xl font-black font-mono tracking-tighter text-zinc-800/40 select-none group-hover:text-[#E6C17A]/10 transition-colors">
                  {step.num}
                </div>

                <div className="flex items-center gap-3.5 mb-4 border-b border-zinc-800/80 pb-3">
                  <div className="p-2.5 rounded-lg bg-[#E6C17A]/15 border border-[#E6C17A]/20 md:hidden">
                    {step.icon}
                  </div>
                  <h3 className="font-display text-2xl leading-[1.2] font-normal text-white">{step.title}</h3>
                </div>

                <p className="font-body text-base leading-relaxed font-normal text-white/50 mb-6">
                  {step.desc}
                </p>

                {/* List items */}
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {step.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2 text-xs font-normal text-zinc-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E6C17A] mt-1.5 shadow-[0_0_4px_#E6C17A] flex-shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Decorative spacer on the opposite side to balance timeline */}
              <div className="w-full md:w-[45%] hidden md:block" />
            </div>
          );
        })}
      </div>
    </div>
  );
};
