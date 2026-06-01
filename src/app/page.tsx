"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
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
import { PortraitFrame } from "@/components/PortraitFrame";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageSelector } from "@/components/LanguageSelector";

export default function Home() {
  const { t, isRtl } = useLanguage();
  
  // Custom navigation handler for smooth section scrolling
  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
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
            className="flex items-center gap-2 cursor-pointer font-display font-extrabold tracking-tight group"
          >
            <span className="text-[#00F0FF] text-lg font-black group-hover:neon-text-glow transition-all">S</span>
            <span className="text-white text-sm tracking-widest uppercase hidden sm:inline">Behaein</span>
          </div>
          
          <div className="flex gap-3 sm:gap-6 md:gap-8 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">
            {[
              { id: "stack", key: "navStack" },
              { id: "projects", key: "navProjects" },
              { id: "process", key: "navProcess" },
              { id: "contact", key: "navContact" }
            ].map((section) => (
              <button
                key={section.id}
                onClick={() => handleScroll(section.id)}
                className="hover:text-[#00F0FF] cursor-pointer transition-colors duration-200"
              >
                {t(section.key as any)}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageSelector />
            <button
              onClick={() => handleScroll("contact")}
              className="px-3 sm:px-4 py-2 rounded-full bg-[#00F0FF]/10 hover:bg-[#00F0FF]/20 border border-[#00F0FF]/25 text-[10px] sm:text-xs font-black text-[#00F0FF] tracking-wider uppercase transition-all duration-300 shadow-[0_0_10px_rgba(0,240,255,0.05)] cursor-pointer active:scale-95"
            >
              {t("navLetsBuild")}
            </button>
          </div>
        </nav>
      </header>

      <main className="relative z-10 w-full overflow-x-hidden">
        
        {/* SECTION 1: HERO SECTION */}
        <section 
          id="hero" 
          className="min-h-screen flex flex-col justify-center items-center px-6 relative pt-24"
        >
          {/* Neon background lighting orbs */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-radial-accent pointer-events-none -z-10 opacity-60" />
          
          <div className="max-w-6xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 text-center lg:text-start">
            
            {/* Left Column: Text Content */}
            <div className="flex-1 flex flex-col items-center lg:items-start gap-6">
              {/* Tagline */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="px-3.5 py-1.5 rounded-full bg-[#00F0FF]/5 border border-[#00F0FF]/15 text-xs font-mono font-bold tracking-widest uppercase text-[#00F0FF]"
              >
                {t("heroTagline")}
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-black font-display tracking-tight text-white leading-[1.08] select-none"
              >
                {t("heroHeadlinePrefix")}<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-indigo-400">{t("heroHeadlineHighlight")}</span>{t("heroHeadlineSuffix")}
              </motion.h1>

              {/* Subline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-slate-400 text-sm md:text-lg leading-relaxed max-w-xl"
              >
                {t("heroSubline")}
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 mt-4"
              >
                <button
                  onClick={() => handleScroll("projects")}
                  className="px-7 py-3.5 rounded-lg bg-[#00F0FF] hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(0,240,255,0.25)] hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] cursor-pointer active:scale-95"
                >
                  {t("heroCtaWork")}
                </button>
                <button
                  onClick={() => handleScroll("contact")}
                  className="px-7 py-3.5 rounded-lg bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer active:scale-95"
                >
                  {t("heroCtaBuild")}
                </button>
              </motion.div>
            </div>

            {/* Right Column: 3D Portrait Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.2 }}
              className="flex-shrink-0 flex items-center justify-center w-full max-w-sm lg:max-w-none lg:w-auto"
            >
              <PortraitFrame />
            </motion.div>

          </div>

          {/* Mouse scroll affordance */}
          <div 
            onClick={() => handleScroll("stack")}
            className="absolute bottom-8 cursor-pointer animate-bounce flex flex-col items-center gap-1.5 text-slate-500 hover:text-[#00F0FF] transition-colors"
          >
            <span className="text-[10px] font-mono font-bold tracking-widest uppercase">{t("heroScrollDown")}</span>
            <div className="w-5 h-8 rounded-full border-2 border-current flex justify-center p-1.5">
              <div className="w-1 h-2 bg-current rounded-full" />
            </div>
          </div>
        </section>

        {/* SECTION 2: TECH-STACK BENTO GRID */}
        <section id="stack" className="py-24 relative">
          <div className="max-w-6xl mx-auto px-6 mb-16 text-center md:text-start">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#00F0FF]">{t("stackTagline")}</span>
            <h2 className="text-3xl md:text-4xl font-extrabold font-display text-white tracking-tight mt-2">
              {t("stackTitle")}
            </h2>
            <p className="text-slate-400 text-sm md:text-base max-w-xl mt-3 leading-relaxed">
              {t("stackSubtitle")}
            </p>
          </div>

          <BentoGrid />
        </section>

        {/* SECTION 3: FEATURED PROJECTS (DEEP CASE STUDIES) */}
        <section id="projects" className="py-24 relative overflow-hidden bg-slate-950/20">
          {/* Diagonal grid lines background */}
          <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
          
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="text-center mb-20">
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#00F0FF]">{t("portfolioTagline")}</span>
              <h2 className="text-3xl md:text-5xl font-black font-display text-white tracking-tight mt-2">
                {t("portfolioTitle")}
              </h2>
              <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto mt-4 leading-relaxed">
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
                      <span key={badge} className="px-2.5 py-1 rounded bg-[#00F0FF]/5 border border-[#00F0FF]/15 text-[10px] font-mono font-bold uppercase text-[#00F0FF]">
                        {badge}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-2xl md:text-4xl font-bold font-display text-white leading-tight">
                    {t("portfolioBarandeTitle")}
                  </h3>

                  <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                    {t("portfolioBarandeDesc")}
                  </p>

                  {/* Bullet points */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-900 pt-6 text-start">
                    <div className="flex gap-2.5 items-start">
                      <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wide">{t("portfolioEscrowTitle")}</h4>
                        <p className="text-[11px] text-slate-500 leading-normal mt-0.5">{t("portfolioEscrowDesc")}</p>
                      </div>
                    </div>

                    <div className="flex gap-2.5 items-start">
                      <Zap className="w-5 h-5 text-[#00F0FF] flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wide">{t("portfolioPinTitle")}</h4>
                        <p className="text-[11px] text-slate-500 leading-normal mt-0.5">{t("portfolioPinDesc")}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-center lg:justify-start">
                    <button 
                      onClick={() => handleScroll("contact")}
                      className="px-5 py-2.5 rounded-lg border border-slate-800 hover:border-[#00F0FF]/40 text-xs font-bold text-slate-300 transition-colors flex items-center gap-1.5"
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
                      <span key={badge} className="px-2.5 py-1 rounded bg-amber-500/5 border border-amber-500/25 text-[10px] font-mono font-bold uppercase text-amber-500">
                        {badge}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-2xl md:text-4xl font-bold font-display text-white leading-tight">
                    {t("portfolioSheenTitle")}
                  </h3>

                  <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                    {t("portfolioSheenDesc")}
                  </p>

                  {/* Bullet points */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-900 pt-6 text-start">
                    <div className="flex gap-2.5 items-start">
                      <Layers className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wide">{t("portfolioLcpTitle")}</h4>
                        <p className="text-[11px] text-slate-500 leading-normal mt-0.5">{t("portfolioLcpDesc")}</p>
                      </div>
                    </div>

                    <div className="flex gap-2.5 items-start">
                      <Globe className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wide">{t("portfolioSeoTitle")}</h4>
                        <p className="text-[11px] text-slate-500 leading-normal mt-0.5">{t("portfolioSeoDesc")}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-center lg:justify-start">
                    <button 
                      onClick={() => handleScroll("contact")}
                      className="px-5 py-2.5 rounded-lg border border-slate-800 hover:border-amber-500/40 text-xs font-bold text-slate-300 transition-colors flex items-center gap-1.5"
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
        <section id="process" className="py-24 relative">
          <div className="max-w-6xl mx-auto px-6 mb-16 text-center">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#00F0FF]">{t("processTagline")}</span>
            <h2 className="text-3xl md:text-5xl font-black font-display text-white tracking-tight mt-2">
              {t("processTitle")}
            </h2>
            <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto mt-4 leading-relaxed">
              {t("processSubtitle")}
            </p>
          </div>

          <ProcessTimeline />
        </section>

        {/* SECTION 5: CONTACT FORM */}
        <section id="contact" className="py-24 relative overflow-hidden">
          {/* Background decorative glow elements */}
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-radial-accent pointer-events-none -z-10 opacity-40" />

          <div className="max-w-6xl mx-auto px-6 text-center mb-12">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#00F0FF]">{t("contactTagline")}</span>
            <h2 className="text-3xl md:text-5xl font-black font-display text-white tracking-tight mt-2">
              {t("contactTitle")}
            </h2>
            <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto mt-4 leading-relaxed">
              {t("contactSubtitle")}
            </p>
          </div>

          <ContactForm />
        </section>

      </main>

      {/* FOOTER */}
      <footer className="relative border-t border-slate-900 bg-slate-950/80 py-12 z-20">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-start select-none">
          
          <div className="flex flex-col gap-2">
            <span className="text-white font-display font-extrabold text-lg tracking-tight flex items-center justify-center md:justify-start gap-1">
              Samsoun Behaein <ShieldCheck className="w-4 h-4 text-[#00F0FF]" />
            </span>
            <span className="text-slate-500 text-xs font-mono uppercase tracking-wider">
              {t("footerJobTitle")}
            </span>
          </div>

          {/* Social Links */}
          <div className="flex gap-6 text-slate-400">
            <a 
              href="https://github.com/samsoun" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-slate-800 hover:border-[#00F0FF]/40 hover:text-[#00F0FF] transition-all bg-slate-900/50"
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
              className="p-2 rounded-full border border-slate-800 hover:border-[#00F0FF]/40 hover:text-[#00F0FF] transition-all bg-slate-900/50"
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
              className="p-2 rounded-full border border-slate-800 hover:border-[#00F0FF]/40 hover:text-[#00F0FF] transition-all bg-slate-900/50"
              aria-label="Email Address"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          <div className="flex flex-col gap-1.5 items-center md:items-end text-xs text-slate-500">
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
          </div>

        </div>
      </footer>
    </>
  );
}
