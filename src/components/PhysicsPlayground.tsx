"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import { 
  ChevronRight, 
  ExternalLink,
  ArrowRight
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export const PhysicsPlayground: React.FC = () => {
  const { locale, t, isRtl } = useLanguage();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // 3D Tilt Spring Physics for device mockup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothMouseX = useSpring(mouseX, { stiffness: 90, damping: 22 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 90, damping: 22 });

  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], isRtl ? [14, -14] : [-14, 14]);
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [12, -12]);
  const sheenTranslateX = useTransform(smoothMouseX, [-0.5, 0.5], [-100, 100]);
  const sheenTranslateY = useTransform(smoothMouseY, [-0.5, 0.5], [-100, 100]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isMobile || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handlePointerLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      dir={isRtl ? "rtl" : "ltr"}
      className="relative w-full min-h-[85vh] lg:min-h-[90vh] flex flex-col justify-center items-center overflow-hidden [perspective:1400px]"
    >
      {/* Soft, calm ambient background light */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-amber-500/10 blur-[130px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-blue-500/5 blur-[130px] pointer-events-none -z-10" />

      {/* Main Container */}
      <div className="max-w-6xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 pt-28 pb-16 lg:py-20 z-10 px-6">
        
        {/* ================= LEFT COLUMN: MINIMALIST STORY & STATS ================= */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-start select-none">
          
          {/* Top Tagline Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-xs font-mono tracking-wider uppercase text-zinc-300 mb-6 backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{t("heroTagline")}</span>
          </motion.div>

          {/* Display Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.08] font-normal text-white mb-6 tracking-tight"
          >
            <span>{t("heroHeadlinePrefix")}</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-[#E6C17A] to-amber-200 font-medium">
              {t("heroHeadlineHighlight")}
            </span>
            <span>{t("heroHeadlineSuffix")}</span>
          </motion.h1>

          {/* Subline Bio Paragraph */}
          <motion.p 
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-xl mb-8 font-body font-light"
          >
            {t("heroSubline")}
          </motion.p>

          {/* 3 Pillars Architectural Metrics Strip */}
          <motion.div 
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3 }}
            className="grid grid-cols-3 gap-4 py-3.5 px-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-sm w-full max-w-xl mb-8 text-start"
          >
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                {locale === "fa" ? "مسیر مستقیم" : locale === "de" ? "Strecke" : "Route"}
              </span>
              <span className="text-sm font-medium text-zinc-200 mt-1">
                {locale === "fa" ? "آلمان ⇄ ایران" : "DE ⇄ Iran"}
              </span>
              <span className="text-[11px] text-zinc-400 mt-0.5">
                {locale === "fa" ? "پرواز ۲۴-۴۸ ساعته" : locale === "de" ? "24–48h Express" : "24–48h Express"}
              </span>
            </div>

            <div className="flex flex-col border-x border-zinc-800/80 px-4">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                {locale === "fa" ? "امنیت مالی" : locale === "de" ? "Sicherheit" : "Security"}
              </span>
              <span className="text-sm font-medium text-emerald-400 mt-1">
                {locale === "fa" ? "حساب امانی ۱۰۰٪" : "100% Escrow"}
              </span>
              <span className="text-[11px] text-zinc-400 mt-0.5">
                {locale === "fa" ? "پین‌کد ۴ رقمی و RLS" : locale === "de" ? "PIN & Postgres RLS" : "PIN & Postgres RLS"}
              </span>
            </div>

            <div className="flex flex-col pl-2">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                {locale === "fa" ? "پشته نرم‌افزار" : locale === "de" ? "Tech Stack" : "Tech Stack"}
              </span>
              <span className="text-sm font-medium text-amber-100/90 mt-1">
                React Native
              </span>
              <span className="text-[11px] text-zinc-400 mt-0.5">
                Expo & Supabase
              </span>
            </div>
          </motion.div>

          {/* Action CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-auto"
          >
            <button
              onClick={() => handleScroll("barande-interactive")}
              className="px-6 py-3.5 rounded-xl bg-amber-100 hover:bg-white text-zinc-950 font-body text-sm font-semibold tracking-wide transition-all shadow-[0_0_20px_rgba(230,193,122,0.25)] hover:shadow-[0_0_30px_rgba(230,193,122,0.4)] cursor-pointer active:scale-95 flex items-center justify-center gap-2"
            >
              <span>{t("heroCtaWork")}</span>
              <ArrowRight className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} />
            </button>
            <button
              onClick={() => handleScroll("contact")}
              className="px-6 py-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/60 text-zinc-200 hover:text-white font-body text-sm font-normal tracking-wide transition-all duration-300 cursor-pointer active:scale-95 flex items-center justify-center gap-2"
            >
              <span>{t("heroCtaBuild")}</span>
              <ChevronRight className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} />
            </button>
          </motion.div>

        </div>

        {/* ================= RIGHT COLUMN: UNOBSTRUCTED 3D DEVICE SHOWCASE ================= */}
        <div className="flex-shrink-0 w-full max-w-sm lg:max-w-md relative flex flex-col items-center justify-center select-none pt-4 lg:pt-0">
          
          {/* Subtle warm backlight behind the phone */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[380px] h-[320px] sm:h-[380px] rounded-full bg-amber-500/10 blur-[100px] pointer-events-none -z-10" />

          {/* 3D Smartphone Device Mockup with Framer Motion Springs */}
          <motion.div
            style={{
              rotateX: isMobile ? 0 : rotateX,
              rotateY: isMobile ? 0 : rotateY,
              transformStyle: "preserve-3d",
            }}
            className="relative w-[280px] sm:w-[310px] h-[580px] sm:h-[630px] rounded-[48px] bg-zinc-950 border-[7px] border-zinc-800 shadow-[0_25px_70px_rgba(0,0,0,0.85),0_0_40px_rgba(230,193,122,0.12)] overflow-hidden flex flex-col transition-shadow duration-500"
          >
            {/* Dynamic glossy reflection sheen */}
            <motion.div 
              style={{
                x: sheenTranslateX,
                y: sheenTranslateY,
              }}
              className="absolute inset-[-50%] pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-white/10 z-40" 
            />

            {/* Speaker & Dynamic Island Notch */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-4 bg-zinc-900/95 rounded-full z-40 flex items-center justify-center gap-1.5 border border-zinc-800/60">
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-950 border border-zinc-800" />
              <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
            </div>

            {/* Screen Container with Unobstructed App View */}
            <div className="relative w-full h-full bg-[#07090E] overflow-hidden rounded-[38px]">
              {/* Barande App Screenshot */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/barande.jpg" 
                alt="Barande App Interface" 
                className="w-full h-full object-cover object-top"
                draggable={false}
              />

              {/* Home indicator bar */}
              <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/30 rounded-full z-40" />
            </div>
          </motion.div>

          {/* Discrete Live App Chip */}
          <a
            href="https://barande.app"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 px-4 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-xs font-mono text-zinc-400 hover:text-amber-100 hover:border-amber-100/40 transition-all flex items-center gap-2 group backdrop-blur-sm shadow-sm"
            aria-label="Open Barande Website"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>barande.app</span>
            <ExternalLink className="w-3 h-3 text-zinc-500 group-hover:text-amber-100 transition-colors" />
          </a>

        </div>

      </div>

    </div>
  );
};
