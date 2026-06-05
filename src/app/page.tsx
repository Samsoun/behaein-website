"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { 
  ArrowUpRight, 
  Mail, 
  Smartphone, 
  Globe, 
  ChevronRight, 
  ShieldCheck, 
  Zap, 
  Layers, 
  Heart 
} from "lucide-react";
import { GeometricBackground } from "@/components/GeometricBackground";
import { BentoGrid } from "@/components/BentoGrid";
import { SmartphoneMockup, BrowserMockup } from "@/components/DeviceMockup";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { ContactForm } from "@/components/ContactForm";
import { PhysicsPlayground } from "@/components/PhysicsPlayground";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageSelector } from "@/components/LanguageSelector";
import { Logo } from "@/components/Logo";
import { BarandeVideoScroll } from "@/components/BarandeVideoScroll";
import { TechTicker } from "@/components/TechTicker";


// Premium animated Hamburger Menu Icon component using Framer Motion
const HamburgerIcon: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="text-current overflow-visible">
      <motion.path
        animate={isOpen ? { d: "M 3 17 L 17 3" } : { d: "M 2 5 L 18 5" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <motion.path
        animate={isOpen ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        d="M 2 10 L 18 10"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <motion.path
        animate={isOpen ? { d: "M 3 3 L 17 17" } : { d: "M 2 15 L 18 15" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default function Home() {
  const { t, isRtl, locale } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showMobileBanner, setShowMobileBanner] = useState(false);

  useEffect(() => {
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 1024;
    if (isMobileDevice) {
      setShowMobileBanner(true);
      const timer = setTimeout(() => {
        setShowMobileBanner(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Buttery-smooth scroll progress setup for sidebar motion
  const { scrollYProgress } = useScroll();
  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001
  });

  // 1. Dynamic Parallax Elastic Translations for each social icon on scroll
  const githubY = useTransform(smoothScrollProgress, [0, 1], [0, -32]);
  const emailY = useTransform(smoothScrollProgress, [0, 1], [0, 32]);
  
  // 2. Continuous rotating effect on scroll (one full rotation across page)
  const iconRotate = useTransform(smoothScrollProgress, [0, 1], [0, 360]);

  // 3. Shifting border and glow colors during scroll (Gold -> White -> Zinc)
  const iconGlowColor = useTransform(
    smoothScrollProgress,
    [0, 0.5, 1],
    [
      "rgba(230, 193, 122, 0.12)",
      "rgba(255, 255, 255, 0.15)",
      "rgba(63, 63, 70, 0.15)"
    ]
  );
  const iconBorderColor = useTransform(
    smoothScrollProgress,
    [0, 0.5, 1],
    [
      "rgba(230, 193, 122, 0.25)",
      "rgba(255, 255, 255, 0.3)",
      "rgba(63, 63, 70, 0.3)"
    ]
  );
  
  // Custom navigation handler for smooth section scrolling (compensates for fixed header offset)
  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 90; // Fixed header height + spacing
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Dynamic Browser Tab Metadata Update
  useEffect(() => {
    document.title = t("metaTitle");
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", t("metaDesc"));
    }
  }, [t]);

  // Structured Data (JSON-LD) for Google Rich Snippets
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Samsoun Behaein",
    "jobTitle": t("footerJobTitle"),
    "url": "https://github.com/samsoun",
    "sameAs": [
      "https://github.com/samsoun",
      "https://linkedin.com/in/samsoun-behaein-a07aa933b"
    ],
    "description": t("metaDesc"),
    "knowsAbout": [
      "React",
      "Next.js",
      "TypeScript",
      "React Native",
      "Expo",
      "Supabase",
      "SEO Architecture",
      "Tailwind CSS"
    ]
  };

  return (
    <>
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      {/* Interactive 3D constellation canvas */}
      <GeometricBackground />

      {/* Floating Navbar */}
      <header className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl">
        <nav className="glass-panel rounded-full px-4 sm:px-6 py-3 flex justify-between items-center shadow-lg border border-white/5 backdrop-blur-md">
          <div 
            onClick={() => handleScroll("hero")} 
            className="cursor-pointer group"
          >
            <Logo size={28} />
          </div>
          
          <div className="hidden md:flex gap-3 sm:gap-6 md:gap-8 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">
            {[
              { id: "stack", key: "navStack" },
              { id: "projects", key: "navProjects" },
              { id: "process", key: "navProcess" },
              { id: "contact", key: "navContact" }
            ].map((section) => (
              <button
                key={section.id}
                onClick={() => handleScroll(section.id)}
                className="hover:text-[#E6C17A] cursor-pointer transition-colors duration-200"
              >
                {t(section.key as any)}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageSelector />
            <button
              onClick={() => handleScroll("contact")}
              className="hidden md:block px-3 sm:px-4 py-2 rounded-full bg-amber-100/10 hover:bg-amber-100/20 border border-amber-100/25 text-[10px] sm:text-xs font-black text-amber-100 tracking-wider uppercase transition-all duration-300 shadow-[0_0_10px_rgba(230,193,122,0.05)] cursor-pointer active:scale-95"
            >
              {t("navLetsBuild")}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex md:hidden p-2.5 rounded-full bg-slate-900/40 hover:bg-amber-100/15 border border-amber-100/25 text-slate-300 hover:text-amber-100 transition-all cursor-pointer active:scale-95"
              aria-label="Toggle mobile menu"
            >
              <HamburgerIcon isOpen={mobileMenuOpen} />
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute top-full left-0 right-0 mt-3 glass-panel rounded-3xl p-6 border border-white/10 bg-slate-950/95 backdrop-blur-xl shadow-2xl z-40 overflow-hidden flex flex-col gap-6 md:hidden"
            >
              <div className="flex flex-col gap-4 text-center">
                {[
                  { id: "stack", key: "navStack" },
                  { id: "projects", key: "navProjects" },
                  { id: "process", key: "navProcess" },
                  { id: "contact", key: "navContact" }
                ].map((section) => (
                  <button
                    key={section.id}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      // Slight delay to allow layout settlement before smooth scrolling is initiated
                      setTimeout(() => {
                        handleScroll(section.id);
                      }, 150);
                    }}
                    className="py-2.5 text-sm font-bold uppercase tracking-wider text-slate-300 hover:text-amber-100 transition-colors cursor-pointer border-b border-white/5 active:bg-amber-100/5 rounded-lg"
                  >
                    {t(section.key as any)}
                  </button>
                ))}
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setTimeout(() => {
                    handleScroll("contact");
                  }, 150);
                }}
                className="w-full py-3.5 rounded-xl bg-amber-100/10 hover:bg-amber-100/20 border border-amber-100/25 text-xs font-black text-amber-100 tracking-widest uppercase transition-all duration-300 shadow-[0_0_15px_rgba(230,193,122,0.1)] cursor-pointer active:scale-[0.98]"
              >
                {t("navLetsBuild")}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="relative z-10 w-full overflow-x-hidden">
        
        {/* SECTION 1: HERO SECTION */}
        <section 
          id="hero" 
          className="relative min-h-screen flex flex-col justify-center items-center"
        >
          {/* Dynamic Language-specific Flag Background with smooth blending */}
          <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden select-none">
            {locale === "de" && (
              /* German Flag */
              <div className="absolute inset-0 opacity-12 md:opacity-18 flex flex-col">
                <div className="h-1/3 w-full bg-[#000000]" />
                <div className="h-1/3 w-full bg-[#DD0000]" />
                <div className="h-1/3 w-full bg-[#FFCC00]" />
              </div>
            )}

            {locale === "en" && (
              /* USA Flag (ambient SVG) */
              <div className="absolute inset-0 opacity-10 md:opacity-15 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="/us_flag.svg" 
                  alt="US Flag Background" 
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {locale === "fa" && (
              /* Lion and Sun Flag (Iran historical flag) */
              <div className="absolute inset-0 opacity-12 md:opacity-18 flex flex-col justify-between">
                {/* Background stripes (Green, White, Red) */}
                <div className="absolute inset-0 flex flex-col">
                  <div className="h-1/3 w-full bg-[#008b3c]" />
                  <div className="h-1/3 w-full bg-[#ffffff]" />
                  <div className="h-1/3 w-full bg-[#da121a]" />
                </div>
                {/* Centered Lion & Sun Symbol */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src="/lion_and_sun.svg" 
                    alt="Lion and Sun Emblem" 
                    className="h-1/3 max-w-[40%] object-contain"
                  />
                </div>
              </div>
            )}

            {/* Smooth transition overlays */}
            {/* Radial vignette mask (soft edges on sides) */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#09090b_90%)]" />
            {/* Vertical linear mask (fade out at top and bottom boundaries) */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#09090b] via-transparent to-[#09090b]" />
          </div>

          <PhysicsPlayground />
        </section>

        {/* SECTION 2: TECH-STACK BENTO GRID */}
        <section id="stack" className="py-24 relative overflow-hidden">
          {/* Grid lines background */}
          <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
          
          <div className="max-w-6xl mx-auto px-6 mb-16 text-center md:text-start relative z-10">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#E6C17A]">{t("stackTagline")}</span>
            <h2 className="text-3xl md:text-4xl font-extrabold font-sans text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400 tracking-tight mt-2">
              {t("stackTitle")}
            </h2>
            <p className="text-zinc-400 text-sm md:text-base max-w-xl mt-3 leading-relaxed">
              {t("stackSubtitle")}
            </p>
          </div>

          <div className="relative z-10">
            <BentoGrid />
          </div>
        </section>

        {/* INTERACTIVE VIDEO SCROLL CASE STUDY (BARANDE) — Title is rendered inside the component */}
        <BarandeVideoScroll />

        {/* SECTION 3: FEATURED PROJECTS (DEEP CASE STUDIES) */}
        <section id="projects" className="py-24 relative overflow-hidden bg-zinc-950/20">
          {/* Diagonal grid lines background */}
          <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
          
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="text-center mb-20">
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#E6C17A]">{t("portfolioTagline")}</span>
              <h2 className="text-3xl md:text-5xl font-black font-sans text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400 tracking-tight mt-2">
                {t("portfolioTitle")}
              </h2>
              <p className="text-zinc-400 text-sm md:text-base max-w-xl mx-auto mt-4 leading-relaxed">
                {t("portfolioSubtitle")}
              </p>
            </div>

            <div className="flex flex-col gap-32">
              
              {/* Project 1: Barande */}
              <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
                {/* Details side */}
                <div className="flex-1 flex flex-col gap-6 text-center lg:text-start">
                  <div className="flex flex-wrap gap-2.5 justify-center lg:justify-start">
                    {["React Native", "Expo", "Next.js", "Supabase"].map((badge) => (
                      <span key={badge} className="px-2.5 py-1 rounded bg-zinc-900/80 border border-zinc-800 text-[10px] font-mono font-bold uppercase text-amber-100/90">
                        {badge}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-2xl md:text-4xl font-bold font-sans text-zinc-50 leading-tight">
                    {t("portfolioBarandeTitle")}
                  </h3>

                  <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                    {t("portfolioBarandeDesc")}
                  </p>

                  {/* Bullet points */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-zinc-900 pt-6 text-start">
                    <div className="flex gap-2.5 items-start">
                      <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wide">{t("portfolioEscrowTitle")}</h4>
                        <p className="text-[11px] text-zinc-500 leading-normal mt-0.5">{t("portfolioEscrowDesc")}</p>
                      </div>
                    </div>

                    <div className="flex gap-2.5 items-start">
                      <Zap className="w-5 h-5 text-[#E6C17A] flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wide">{t("portfolioPinTitle")}</h4>
                        <p className="text-[11px] text-zinc-500 leading-normal mt-0.5">{t("portfolioPinDesc")}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-center lg:justify-start">
                    <button 
                      onClick={() => handleScroll("contact")}
                      className="px-5 py-2.5 rounded-lg border border-slate-800 hover:border-[#E6C17A]/40 text-xs font-bold text-zinc-300 transition-colors flex items-center gap-1.5"
                    >
                      {t("portfolioInquireMobile")} <ChevronRight className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} />
                    </button>
                  </div>
                </div>

                {/* Smartphone Mockup side */}
                <div className="flex-1 flex justify-center items-center py-6 w-full max-w-sm lg:max-w-none">
                  <SmartphoneMockup />
                </div>
              </div>

              {/* Project 2: Sheen Berlin */}
              <div className="flex flex-col lg:flex-row-reverse items-center justify-between gap-12 lg:gap-16">
                {/* Details side */}
                <div className="flex-1 flex flex-col gap-6 text-center lg:text-start">
                  <div className="flex flex-wrap gap-2.5 justify-center lg:justify-start">
                    {["Next.js 16", "Tailwind CSS", "Framer Motion", "SEO Pro Max"].map((badge) => (
                      <span key={badge} className="px-2.5 py-1 rounded bg-zinc-900/80 border border-zinc-800 text-[10px] font-mono font-bold uppercase text-amber-100/90">
                        {badge}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-2xl md:text-4xl font-bold font-sans text-zinc-50 leading-tight">
                    {t("portfolioSheenTitle")}
                  </h3>

                  <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                    {t("portfolioSheenDesc")}
                  </p>

                  {/* Bullet points */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-zinc-900 pt-6 text-start">
                    <div className="flex gap-2.5 items-start">
                      <Layers className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wide">{t("portfolioLcpTitle")}</h4>
                        <p className="text-[11px] text-zinc-500 leading-normal mt-0.5">{t("portfolioLcpDesc")}</p>
                      </div>
                    </div>

                    <div className="flex gap-2.5 items-start">
                      <Globe className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wide">{t("portfolioSeoTitle")}</h4>
                        <p className="text-[11px] text-zinc-500 leading-normal mt-0.5">{t("portfolioSeoDesc")}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-center lg:justify-start">
                    <button 
                      onClick={() => handleScroll("contact")}
                      className="px-5 py-2.5 rounded-lg border border-slate-800 hover:border-[#E6C17A]/40 text-xs font-bold text-zinc-300 transition-colors flex items-center gap-1.5"
                    >
                      {t("portfolioInquireWeb")} <ChevronRight className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} />
                    </button>
                  </div>
                </div>

                {/* Browser Mockup side */}
                <div className="flex-1 flex justify-center items-center py-6 w-full max-w-md lg:max-w-none">
                  <BrowserMockup />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 4: THE PROCESS (TIMELINE) */}
        <section id="process" className="py-24 relative overflow-hidden">
          {/* Grid lines background */}
          <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
          
          <div className="max-w-6xl mx-auto px-6 mb-16 text-center relative z-10">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#E6C17A]">{t("processTagline")}</span>
            <h2 className="text-3xl md:text-5xl font-black font-sans text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400 tracking-tight mt-2">
              {t("processTitle")}
            </h2>
            <p className="text-zinc-400 text-sm md:text-base max-w-xl mx-auto mt-4 leading-relaxed">
              {t("processSubtitle")}
            </p>
          </div>

          <div className="relative z-10">
            <ProcessTimeline />
          </div>
        </section>

        {/* SECTION 5: CONTACT FORM */}
        <section id="contact" className="py-24 relative overflow-hidden">
          {/* Grid lines background */}
          <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
          {/* Background decorative glow elements */}
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-radial-accent pointer-events-none -z-10 opacity-40" />

          <div className="max-w-6xl mx-auto px-6 text-center mb-12 relative z-10">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#E6C17A]">{t("contactTagline")}</span>
            <h2 className="text-3xl md:text-5xl font-black font-sans text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400 tracking-tight mt-2">
              {t("contactTitle")}
            </h2>
            <p className="text-zinc-400 text-sm md:text-base max-w-xl mx-auto mt-4 leading-relaxed">
              {t("contactSubtitle")}
            </p>
          </div>

          <div className="relative z-10">
            <ContactForm />
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="relative border-t border-zinc-900/60 bg-zinc-950 py-12 z-20">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-start select-none">
          
          <div className="flex flex-col gap-2.5 items-center md:items-start">
            <div 
              onClick={() => handleScroll("hero")} 
              className="cursor-pointer"
            >
              <Logo size={26} />
            </div>
            <span className="text-zinc-500 text-xs font-mono uppercase tracking-wider">
              {t("footerJobTitle")}
            </span>
          </div>

          {/* Social Links */}
          <div className="flex gap-6 text-zinc-400">
            <a 
              href="https://github.com/samsoun" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-zinc-800 hover:border-amber-100/40 hover:text-amber-100 transition-all duration-300 bg-transparent text-zinc-400"
              aria-label="GitHub Profile"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
            <a 
              href="https://linkedin.com/in/samsoun-behaein-a07aa933b" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-zinc-800 hover:border-amber-100/40 hover:text-amber-100 transition-all duration-300 bg-transparent text-zinc-400"
              aria-label="LinkedIn Profile"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a 
              href="mailto:behaein@web.de"
              className="p-2 rounded-full border border-zinc-800 hover:border-amber-100/40 hover:text-amber-100 transition-all duration-300 bg-transparent text-zinc-400"
              aria-label="Email Address"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          <div className="flex flex-col gap-1.5 items-center md:items-end text-xs text-zinc-500">
            <span className="flex items-center gap-1.5">
              {(() => {
                const parts = t("footerMadeWith").split("{icon}");
                return (
                  <>
                    {parts[0]}
                    <Heart className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                    {parts[1]}
                  </>
                );
              })()}
            </span>
            <span className="font-mono text-[10px]">
              {t("footerRights", { year: new Date().getFullYear() })}
            </span>
            <div className="flex gap-3 mt-1.5 font-mono text-[10px]">
              <Link href="/impressum" className="hover:text-zinc-200 text-zinc-400 transition-colors duration-200">
                {t("footerImpressum")}
              </Link>
              <span className="text-zinc-800 select-none">|</span>
              <Link href="/datenschutz" className="hover:text-zinc-200 text-zinc-400 transition-colors duration-200">
                {t("footerDatenschutz")}
              </Link>
            </div>
          </div>

        </div>
      </footer>

      {/* Elegant Vertical Social Sidebar (Left side) */}
      <div className="fixed left-5 lg:left-8 bottom-0 z-40 hidden md:flex flex-col items-center gap-5">
        <div className="flex flex-col gap-4 text-slate-400">
          <motion.a 
            href="https://github.com/samsoun" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              y: githubY, 
              rotate: iconRotate, 
              borderColor: iconBorderColor, 
              backgroundColor: iconGlowColor 
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="group p-2 rounded-full border backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.5)] cursor-pointer hover:scale-110 active:scale-95 transition-transform duration-200"
            aria-label="GitHub Profile"
          >
            <svg className="w-4 h-4 group-hover:text-[#E6C17A] transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
          </motion.a>
          <motion.a 
            href="https://linkedin.com/in/samsoun-behaein-a07aa933b" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              rotate: useTransform(smoothScrollProgress, [0, 1], [0, -360]), 
              borderColor: iconBorderColor, 
              backgroundColor: iconGlowColor 
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="group p-2 rounded-full border backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.5)] cursor-pointer hover:scale-110 active:scale-95 transition-transform duration-200"
            aria-label="LinkedIn Profile"
          >
            <svg className="w-4 h-4 group-hover:text-[#E6C17A] transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </motion.a>
          <motion.a 
            href="mailto:behaein@web.de"
            style={{ 
              y: emailY, 
              rotate: iconRotate, 
              borderColor: iconBorderColor, 
              backgroundColor: iconGlowColor 
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="group p-2 rounded-full border backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.5)] cursor-pointer hover:scale-110 active:scale-95 transition-transform duration-200"
            aria-label="Email Address"
          >
            <Mail className="w-4 h-4 group-hover:text-[#E6C17A] transition-colors" />
          </motion.a>
        </div>
        
        {/* Elegant vertical neon line scroll progress bar */}
        <motion.div 
          initial={{ height: 0 }}
          animate={{ height: 96 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative w-[2px] bg-zinc-800/40 rounded-full overflow-hidden"
        >
          {/* Active progress indicator filled by scroll */}
          <motion.div 
            style={{ scaleY: smoothScrollProgress, transformOrigin: "top" }}
            className="absolute inset-0 bg-gradient-to-b from-white via-[#E6C17A] to-zinc-800 w-full h-full" 
          />
        </motion.div>
      </div>

      {/* Floating Interactive Tech Stack Loop Ticker */}
      <TechTicker />

      {/* Mobile Desktop Recommendation Banner */}
      <AnimatePresence>
        {showMobileBanner && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-md lg:hidden"
          >
            <div className={`glass-panel rounded-2xl p-4 border border-zinc-800 bg-slate-950/90 backdrop-blur-md shadow-2xl flex items-center justify-between gap-3 text-start ${isRtl ? "flex-row-reverse text-right" : "flex-row text-left"}`}>
              <div className={`flex items-start gap-3 ${isRtl ? "flex-row-reverse" : "flex-row"}`}>
                <span className="text-base flex-shrink-0 mt-0.5 select-none" role="img" aria-label="Desktop Computer">💻</span>
                <p className="text-[11px] text-zinc-300 font-sans leading-normal">
                  {t("mobileDesktopNotice")}
                </p>
              </div>
              <button
                onClick={() => {
                  setShowMobileBanner(false);
                }}
                className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer flex-shrink-0"
                aria-label="Dismiss banner"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

