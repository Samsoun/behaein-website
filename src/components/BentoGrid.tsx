"use client";

import React, { useState, useEffect } from "react";
import { TiltCard } from "./TiltCard";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Code2, 
  Smartphone, 
  Database, 
  Wrench, 
  Cpu, 
  Zap, 
  MapPin, 
  Lock, 
  Search, 
  Globe 
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const localTranslations = {
  en: {
    frontendTitle: "Frontend Core",
    frontendDesc: "I architect lightning-fast client interfaces with perfect layouts. Utilizing TypeScript and Next.js, my builds maintain 100/100 performance scores and seamless reactivity.",
    mobileTitle: "Mobile App Dev",
    mobileDesc: "Cross-platform React Native engineering with Expo. Delivering ultra-smooth 60fps Native interactions, biometric safety, and background sync.",
    backendTitle: "Backend & Cloud",
    backendDesc: "Highly secure Postgres architectures with Supabase. Building low-latency REST/GraphQL APIs, Realtime web sockets, and optimized caching flows.",
    toolsTitle: "Tools & Workflow",
    toolsDesc: "Bridging UI design directly into pixel-perfect production code. Advanced setup using Figma for components, Cursor AI for speed, and structured SEO schema integrations that rank on Google's top spots.",
    step1Title: "Escrow Locked",
    step1Info: "$140 locked in secure vault",
    step2Title: "Traveler Verified",
    step2Info: "Samsoun B. onboarded & checked",
    step3Title: "PIN Handshake",
    step3Info: "PIN: 8492 match on delivery",
    levelExpert: "Expert",
    levelHighlySkilled: "Highly Skilled",
    levelFluid: "Fluid Motion",
    levelSemantic: "Semantic HTML",
    queryCache: "Query Cache API",
    cachedLabel: "8ms (Cached)",
    dbLabel: "ms (DB)",
    seoStructured: "SEO Structured Data",
    cicdPipelines: "CI/CD Agile Pipelines",
    seoScore: "SEO Score",
  },
  de: {
    frontendTitle: "Frontend-Kern",
    frontendDesc: "Ich architektiére blitzschnelle Client-Schnittstellen mit perfekten Layouts. Unter Verwendung von TypeScript und Next.js behalten meine Builds 100/100 Performance-Scores und nahtlose Reaktivität bei.",
    mobileTitle: "Mobile App-Entwicklung",
    mobileDesc: "Plattformübergreifendes React-Native-Engineering mit Expo. Bereitstellung von ultra-flüssigen 60fps Native Interaktionen, biometrischer Sicherheit und Hintergrundsynchronisation.",
    backendTitle: "Backend & Cloud",
    backendDesc: "Hochsichere Postgres-Architekturen mit Supabase. Erstellung von REST/GraphQL-APIs mit geringer Latenz, Realtime Web Sockets und optimierten Caching-Flüssen.",
    toolsTitle: "Werkzeuge & Workflow",
    toolsDesc: "Übertragung von UI-Design direkt in pixelgenauen Produktionscode. Fortgeschrittenes Setup mit Figma für Komponenten, Cursor AI für Geschwindigkeit und strukturierten SEO-Schema-Integrationen auf den Top-Plätzen von Google.",
    step1Title: "Treuhand gesperrt",
    step1Info: "140 $ in sicherem Tresor gesperrt",
    step2Title: "Reisender verifiziert",
    step2Info: "Samsoun B. registriert & geprüft",
    step3Title: "PIN-Handshake",
    step3Info: "PIN: 8492 Match bei Übergabe",
    levelExpert: "Experte",
    levelHighlySkilled: "Sehr erfahren",
    levelFluid: "Flüssige Bewegung",
    levelSemantic: "Semantisches HTML",
    queryCache: "Abfrage-Cache-API",
    cachedLabel: "8ms (Cache)",
    dbLabel: "ms (DB)",
    seoStructured: "SEO-strukturierte Daten",
    cicdPipelines: "Agile CI/CD-Pipelines",
    seoScore: "SEO-Score",
  },
  fa: {
    frontendTitle: "هسته فرانت‌اند",
    frontendDesc: "من رابط‌های کاربری فوق‌سریع با ساختار بی‌نقص طراحی می‌کنم. با استفاده از تایپ‌اسکریپت و نکست‌جی‌اس، پروژه‌های من عملکرد ۱۰۰/۱۰۰ و پاسخ‌دهی آنی دارند.",
    mobileTitle: "توسعه اپلیکیشن موبایل",
    mobileDesc: "مهندسی چندپلتفرمه با ری‌اکت نیتیو و اکسپو. ارائه انیمیشن‌های روان ۶۰ فریم بر ثانیه، امنیت بیومتریک و همگام‌سازی پس‌زمینه.",
    backendTitle: "بک‌اند و سیستم ابری",
    backendDesc: "طراحی پایگاه‌داده‌های فوق‌امن پستگرس با سوپابیس. ساخت ای‌پی‌آی‌های کم‌تاخیر REST/GraphQL، وب‌سوکت‌های آنی و سیستم‌های حافظه پنهان بهینه‌شده.",
    toolsTitle: "ابزارها و روند کار",
    toolsDesc: "تبدیل مستقیم طرح‌های فیگما به کدهای تولیدی بی‌نقص. راه‌اندازی پیشرفته با ابزارهای نوین، سرعت بالا و ساختارهای بهینه‌شده سئو برای رتبه‌های برتر گوگل.",
    step1Title: "وجه امانی مسدود شد",
    step1Info: "$۱۴۰ در صندوق امن ذخیره شد",
    step2Title: "مسافر تایید شد",
    step2Info: "سامسون ب. ثبت‌نام و تایید هویت شد",
    step3Title: "پین‌کد تایید تحویل",
    step3Info: "پین‌کد: ۸۴۹۲ با موفقیت تطبیق یافت",
    levelExpert: "متخصص",
    levelHighlySkilled: "ارشد",
    levelFluid: "پویا و روان",
    levelSemantic: "اچ‌تی‌ام‌ال استاندارد",
    queryCache: "ای‌پی‌آی کش دیتابیس",
    cachedLabel: "۸ میلی‌ثانیه (کش شده)",
    dbLabel: "میلی‌ثانیه (دیتابیس)",
    seoStructured: "ساختارهای داده سئو",
    cicdPipelines: "خطوط لوله چابک CI/CD",
    seoScore: "امتیاز سئو",
  }
};

export const BentoGrid: React.FC = () => {
  const { locale } = useLanguage();
  const t = localTranslations[locale];

  // Mobile Simulator demo steps
  const [simulatorStep, setSimulatorStep] = useState(0);
  const steps = [
    { title: t.step1Title, info: t.step1Info, icon: <Lock className="w-4 h-4 text-[#00F0FF]" /> },
    { title: t.step2Title, info: t.step2Info, icon: <Smartphone className="w-4 h-4 text-[#00F0FF]" /> },
    { title: t.step3Title, info: t.step3Info, icon: <Zap className="w-4 h-4 text-[#00F0FF]" /> }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setSimulatorStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [steps.length]);

  // Database cached query latency graph data
  const [latencyData, setLatencyData] = useState([110, 95, 120, 8, 8, 8, 8, 8]);
  useEffect(() => {
    const timer = setInterval(() => {
      // Simulate raw query vs cached query changes
      setLatencyData((prev) => {
        const next = [...prev.slice(1)];
        const isCached = Math.random() > 0.15;
        next.push(isCached ? 8 : Math.floor(Math.random() * 40) + 80);
        return next;
      });
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
      {/* CARD 1: FRONTEND CORE - Large Bento Card (col-span-2) */}
      <TiltCard className="md:col-span-2 min-h-[340px] md:h-[340px] h-auto relative overflow-hidden group">
        <div className="flex flex-col justify-between h-full z-10 relative">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <Code2 className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold font-display text-white">{t.frontendTitle}</h3>
            </div>
            <p className="text-[#94A3B8] leading-relaxed max-w-lg text-sm md:text-base">
              {t.frontendDesc}
            </p>
          </div>

          {/* Floating tech chips */}
          <div className="flex flex-wrap gap-2.5 mt-6">
            {[
              { name: "Next.js 16", level: t.levelExpert, color: "bg-white/10 text-white border-white/20" },
              { name: "React 19", level: t.levelExpert, color: "bg-cyan-500/10 text-[#00F0FF] border-[#00F0FF]/25" },
              { name: "TypeScript", level: t.levelHighlySkilled, color: "bg-blue-500/10 text-blue-400 border-blue-500/25" },
              { name: "Tailwind CSS v4", level: t.levelExpert, color: "bg-teal-500/10 text-teal-400 border-teal-500/25" },
              { name: "Framer Motion", level: t.levelFluid, color: "bg-purple-500/10 text-purple-400 border-purple-500/25" },
              { name: "HTML5/CSS3", level: t.levelSemantic, color: "bg-amber-500/10 text-amber-400 border-amber-500/25" },
            ].map((tech, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.06, y: -2 }}
                className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 cursor-default transition-colors ${tech.color}`}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                {tech.name}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Abstract background mesh */}
        <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-15 pointer-events-none hidden md:block">
          <svg className="w-full h-full text-[#00F0FF]" viewBox="0 0 100 100" fill="none">
            <path d="M10,90 Q50,10 90,90" stroke="currentColor" strokeWidth="0.5" />
            <path d="M10,70 Q50,30 90,70" stroke="currentColor" strokeWidth="0.5" />
            <path d="M10,50 Q50,50 90,50" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="1.5" fill="currentColor" />
            <circle cx="28" cy="42" r="1" fill="currentColor" />
            <circle cx="72" cy="42" r="1" fill="currentColor" />
          </svg>
        </div>
      </TiltCard>

      {/* CARD 2: MOBILE APP DEV - Tall Bento Card (row-span-1) */}
      <TiltCard className="col-span-1 min-h-[340px] md:h-[340px] h-auto overflow-hidden group">
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-lg bg-sky-500/10 border border-sky-500/20">
                <Smartphone className="w-6 h-6 text-sky-400" />
              </div>
              <h3 className="text-xl font-bold font-display text-white">{t.mobileTitle}</h3>
            </div>
            <p className="text-[#94A3B8] text-sm leading-relaxed">
              {t.mobileDesc}
            </p>
          </div>

          {/* Mini Interactive Simulator Screen */}
          <div className="mt-4 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 relative h-[120px] overflow-hidden">
            <div className="absolute top-2 right-3 flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            </div>
            <div className="text-[10px] text-slate-500 font-mono mb-2">expo-simulator://barande-app</div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={simulatorStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex items-start gap-2.5"
              >
                <div className="p-1.5 rounded bg-[#00F0FF]/10 border border-[#00F0FF]/25 mt-0.5">
                  {steps[simulatorStep].icon}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{steps[simulatorStep].title}</h4>
                  <p className="text-[10px] text-[#94A3B8]">{steps[simulatorStep].info}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* GPS coordinates trace overlay */}
            <div className="absolute bottom-2 right-3 text-[9px] font-mono text-[#00F0FF]/50">
              LAT: 52.5200° N | LON: 13.4050° E
            </div>
          </div>
        </div>
      </TiltCard>

      {/* CARD 3: BACKEND & CLOUD - Tall Bento Card */}
      <TiltCard className="col-span-1 min-h-[340px] md:h-[340px] h-auto overflow-hidden group">
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-lg bg-orange-500/10 border border-orange-500/20">
                <Database className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="text-xl font-bold font-display text-white">{t.backendTitle}</h3>
            </div>
            <p className="text-[#94A3B8] text-sm leading-relaxed">
              {t.backendDesc}
            </p>
          </div>

          {/* Caching/Latency SVG Graph */}
          <div className="mt-4 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 relative h-[120px] flex flex-col justify-between">
            <div className="flex justify-between items-center text-[10px]">
              <span className="font-mono text-slate-500">{t.queryCache}</span>
              <span className="flex items-center gap-1 font-mono font-semibold text-[#00F0FF]">
                <Cpu className="w-3 h-3" /> 
                {latencyData[latencyData.length - 1] === 8 ? t.cachedLabel : `${latencyData[latencyData.length - 1]}${t.dbLabel}`}
              </span>
            </div>

            {/* Latency Bars Graph */}
            <div className="flex items-end gap-1.5 h-[65px] pt-2">
              {latencyData.map((val, idx) => (
                <div key={idx} className="flex-1 flex flex-col justify-end h-full">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(val / 130) * 100}%` }}
                    transition={{ type: "spring", stiffness: 100 }}
                    className={`rounded-t-sm w-full ${
                      val <= 10 
                        ? "bg-gradient-to-t from-cyan-500 to-[#00F0FF] opacity-90 shadow-[0_0_8px_#00F0FF]" 
                        : "bg-slate-700"
                    }`}
                  />
                  <span className="text-[8px] text-center font-mono text-slate-600 mt-1">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </TiltCard>

      {/* CARD 4: TOOLS & WORKFLOW - Large Bento Card (col-span-2) */}
      <TiltCard className="md:col-span-2 min-h-[340px] md:h-[340px] h-auto overflow-hidden group">
        <div className="flex flex-col md:flex-row justify-between h-full gap-6">
          <div className="flex-1 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                  <Wrench className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold font-display text-white">{t.toolsTitle}</h3>
              </div>
              <p className="text-[#94A3B8] leading-relaxed text-sm md:text-base">
                {t.toolsDesc}
              </p>
            </div>

            <div className="flex gap-4 mt-4">
              <div className="flex items-center gap-1.5 text-xs text-[#94A3B8]">
                <Globe className="w-4 h-4 text-emerald-400" /> {t.seoStructured}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#94A3B8]">
                <Cpu className="w-4 h-4 text-cyan-400" /> {t.cicdPipelines}
              </div>
            </div>
          </div>

          {/* Interactive circular SEO metric visualization */}
          <div className="w-[180px] h-[180px] flex-shrink-0 mx-auto md:my-auto rounded-full bg-slate-950/40 border border-slate-800/80 flex items-center justify-center relative shadow-inner">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="rgba(255,255,255,0.03)"
                strokeWidth="6"
                fill="none"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="40"
                stroke="url(#cyanGlowGrad)"
                strokeWidth="6"
                fill="none"
                strokeDasharray="251.2"
                initial={{ strokeDashoffset: 251.2 }}
                whileInView={{ strokeDashoffset: 25.12 }} // 90% fill
                transition={{ duration: 1.5, ease: "easeOut" }}
                viewport={{ once: true }}
              />
              <defs>
                <linearGradient id="cyanGlowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00F0FF" />
                  <stop offset="100%" stopColor="#0ea5e9" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-black font-display text-white tracking-tighter">100</span>
              <span className="text-[10px] uppercase font-bold text-[#00F0FF] tracking-wider flex items-center gap-0.5">
                <Search className="w-3 h-3" /> {t.seoScore}
              </span>
            </div>
          </div>
        </div>
      </TiltCard>
    </div>
  );
};
