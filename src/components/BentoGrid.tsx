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
    clientLabel: "Client",
    cacheLabel: "Query Cache",
    databaseLabel: "Postgres DB",
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
    clientLabel: "Client",
    cacheLabel: "Query-Cache",
    databaseLabel: "Postgres-DB",
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
    clientLabel: "کاربر",
    cacheLabel: "حافظه کش",
    databaseLabel: "پایگاه داده",
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
    { title: t.step1Title, info: t.step1Info, icon: <Lock className="w-4 h-4 text-[#E6C17A]" /> },
    { title: t.step2Title, info: t.step2Info, icon: <Smartphone className="w-4 h-4 text-[#E6C17A]" /> },
    { title: t.step3Title, info: t.step3Info, icon: <Zap className="w-4 h-4 text-[#E6C17A]" /> }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setSimulatorStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [steps.length]);

  // Database cache query simulation state machine
  const [packetState, setPacketState] = useState<"idle" | "to-cache" | "cache-hit" | "to-db" | "db-hit">("idle");
  const [latencyValue, setLatencyValue] = useState(8);
  const [isCached, setIsCached] = useState(true);

  useEffect(() => {
    let active = true;

    const runCycle = async () => {
      if (!active) return;

      // Determine cache hit (80% chance) vs DB query (20% chance)
      const hitCache = Math.random() > 0.20;
      setIsCached(hitCache);

      if (hitCache) {
        // --- Cache Hit Animation Flow ---
        setPacketState("to-cache");
        await new Promise((resolve) => setTimeout(resolve, 350));
        if (!active) return;

        setPacketState("cache-hit");
        setLatencyValue(8);
        await new Promise((resolve) => setTimeout(resolve, 350));
        if (!active) return;

        setPacketState("idle");
        await new Promise((resolve) => setTimeout(resolve, 1500));
      } else {
        // --- Cache Miss / DB Query Flow ---
        setPacketState("to-db");
        await new Promise((resolve) => setTimeout(resolve, 700));
        if (!active) return;

        setPacketState("db-hit");
        setLatencyValue(Math.floor(Math.random() * 30) + 85);
        await new Promise((resolve) => setTimeout(resolve, 500));
        if (!active) return;

        setPacketState("idle");
        await new Promise((resolve) => setTimeout(resolve, 1200));
      }

      if (active) {
        runCycle();
      }
    };

    // Run cycle with a small initial delay
    const initialTimer = setTimeout(() => {
      runCycle();
    }, 1000);

    return () => {
      active = false;
      clearTimeout(initialTimer);
    };
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
      {/* CARD 1: FRONTEND CORE - Large Bento Card (col-span-2) */}
      <TiltCard className="md:col-span-2 min-h-[340px] md:h-[340px] h-auto relative overflow-hidden group">
        <div className="flex flex-col justify-between h-full z-10 relative">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800">
                <Code2 className="w-6 h-6 text-[#E6C17A]" />
              </div>
              <h3 className="text-xl font-bold font-display text-zinc-50">{t.frontendTitle}</h3>
            </div>
            <p className="text-zinc-400 leading-relaxed max-w-lg text-sm md:text-base">
              {t.frontendDesc}
            </p>
          </div>

          {/* Floating tech chips */}
          <div className="flex flex-wrap gap-2.5 mt-6">
            {[
              { name: "Next.js 16" },
              { name: "React 19" },
              { name: "TypeScript" },
              { name: "Tailwind CSS v4" },
              { name: "Framer Motion" },
              { name: "HTML5/CSS3" },
            ].map((tech, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.06, y: -2 }}
                className="px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 cursor-default transition-colors bg-zinc-900/80 border-zinc-800 text-amber-100/90 hover:border-[#E6C17A]/30"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                {tech.name}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Abstract background mesh */}
        <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-15 pointer-events-none hidden md:block">
          <svg className="w-full h-full text-[#E6C17A]/40" viewBox="0 0 100 100" fill="none">
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
              <div className="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800">
                <Smartphone className="w-6 h-6 text-[#E6C17A]" />
              </div>
              <h3 className="text-xl font-bold font-display text-zinc-50">{t.mobileTitle}</h3>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed">
              {t.mobileDesc}
            </p>
          </div>

          {/* Mini Interactive Simulator Screen */}
          <div className="mt-4 p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80 relative h-[120px] overflow-hidden">
            <div className="absolute top-2 right-3 flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            </div>
            <div className="text-[10px] text-zinc-500 font-mono mb-2">expo-simulator://barande-app</div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={simulatorStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex items-start gap-2.5"
              >
                <div className="p-1.5 rounded bg-[#E6C17A]/10 border border-[#E6C17A]/25 mt-0.5">
                  {steps[simulatorStep].icon}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-50">{steps[simulatorStep].title}</h4>
                  <p className="text-[10px] text-zinc-400">{steps[simulatorStep].info}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* GPS coordinates trace overlay */}
            <div className="absolute bottom-2 right-3 text-[9px] font-mono text-[#E6C17A]/50">
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
              <div className="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800">
                <Database className="w-6 h-6 text-[#E6C17A]" />
              </div>
              <h3 className="text-xl font-bold font-display text-zinc-50">{t.backendTitle}</h3>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed">
              {t.backendDesc}
            </p>
          </div>

          {/* Caching/Latency SVG Graph */}
          <div className="mt-4 p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80 relative h-[120px] flex flex-col justify-between">
            <div className="flex justify-between items-center text-[10px]">
              <span className="font-mono text-zinc-500">{t.queryCache}</span>
              <motion.span 
                key={latencyValue}
                initial={{ opacity: 0, y: -2 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-center gap-1 font-mono font-semibold ${
                  isCached ? "text-[#E6C17A]" : "text-white"
                }`}
              >
                <Cpu className="w-3 h-3" /> 
                {isCached ? t.cachedLabel : `${latencyValue}${t.dbLabel}`}
              </motion.span>
            </div>

            {/* Futuristic Node connection graph */}
            <div className="flex justify-between items-center relative w-full h-[65px] px-6 mt-1">
              {/* Dash track path */}
              <div className="absolute left-[40px] right-[40px] top-1/2 -translate-y-1/2 h-[2px] border-t-2 border-dashed border-zinc-800/80 -z-10" />

              {/* Glowing active query path overlay */}
              <div className="absolute left-[40px] right-[40px] top-1/2 -translate-y-1/2 h-[2px] -z-10 overflow-hidden">
                <motion.div
                  initial={{ left: "-100%", right: "100%" }}
                  animate={
                    packetState === "to-cache" ? { left: "0%", right: "50%", backgroundColor: "#E6C17A", opacity: 0.8 } :
                    packetState === "cache-hit" ? { left: "0%", right: "50%", backgroundColor: "#E6C17A", opacity: 0.8 } :
                    packetState === "to-db" ? { left: "0%", right: "0%", backgroundColor: "#ffffff", opacity: 0.8 } :
                    packetState === "db-hit" ? { left: "0%", right: "0%", backgroundColor: "#ffffff", opacity: 0.8 } :
                    { left: "-100%", right: "100%", opacity: 0 }
                  }
                  transition={{ duration: 0.4 }}
                  className="absolute top-0 bottom-0 rounded-full"
                />
              </div>

              {/* CLIENT NODE */}
              <div className="flex flex-col items-center gap-1 relative">
                <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center relative shadow-inner">
                  <Smartphone className="w-4 h-4 text-zinc-400" />
                  {/* Green client signal status */}
                  <span className="absolute top-0 right-0 w-2 h-2 bg-emerald-500 rounded-full border border-zinc-950 animate-pulse" />
                </div>
                <span className="text-[8px] font-mono text-zinc-500 font-bold">{t.clientLabel}</span>
              </div>

              {/* QUERY CACHE NODE */}
              <div className="flex flex-col items-center gap-1 relative">
                <motion.div 
                  animate={packetState === "cache-hit" ? { scale: [1, 1.15, 1] } : {}}
                  transition={{ duration: 0.3 }}
                  className={`w-8 h-8 rounded-full bg-zinc-900 border ${
                    packetState === "cache-hit" ? "border-[#E6C17A] shadow-[0_0_8px_rgba(230,193,122,0.3)]" : "border-zinc-800"
                  } flex items-center justify-center relative shadow-inner`}
                >
                  <Cpu className={`w-4 h-4 ${packetState === "cache-hit" ? "text-[#E6C17A] animate-pulse" : "text-zinc-600"}`} />
                  
                  {/* Cache Shield Glow Pulse */}
                  <AnimatePresence>
                    {packetState === "cache-hit" && (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0.8 }}
                        animate={{ scale: 2.2, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="absolute inset-0 rounded-full border border-[#E6C17A] pointer-events-none"
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
                <span className={`text-[8px] font-mono font-bold ${packetState === "cache-hit" ? "text-[#E6C17A]" : "text-zinc-500"}`}>
                  {t.cacheLabel}
                </span>
              </div>

              {/* DATABASE NODE */}
              <div className="flex flex-col items-center gap-1 relative">
                <motion.div 
                  animate={packetState === "db-hit" ? { scale: [1, 1.15, 1] } : {}}
                  transition={{ duration: 0.3 }}
                  className={`w-8 h-8 rounded-lg bg-zinc-900 border ${
                    packetState === "db-hit" ? "border-white shadow-[0_0_8px_rgba(255,255,255,0.3)]" : "border-zinc-800"
                  } flex items-center justify-center relative shadow-inner`}
                >
                  <Database className={`w-4 h-4 ${packetState === "db-hit" ? "text-white animate-bounce" : "text-zinc-600"}`} />
                  
                  {/* Database Glow Pulse */}
                  <AnimatePresence>
                    {packetState === "db-hit" && (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0.8 }}
                        animate={{ scale: 2.2, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="absolute inset-0 rounded-lg border border-white pointer-events-none"
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
                <span className={`text-[8px] font-mono font-bold ${packetState === "db-hit" ? "text-white" : "text-zinc-500"}`}>
                  {t.databaseLabel}
                </span>
              </div>

              {/* GLOWING QUERY PACKET */}
              <div className="absolute left-[40px] right-[40px] top-1/2 -translate-y-1/2 h-[2px] -z-5 pointer-events-none">
                <motion.div
                  variants={{
                    idle: { left: "0%", scale: 0, opacity: 0, backgroundColor: "#E6C17A", boxShadow: "0 0 8px #E6C17A" },
                    "to-cache": { left: "50%", scale: 1.2, opacity: 1, backgroundColor: "#E6C17A", boxShadow: "0 0 12px #E6C17A" },
                    "cache-hit": { left: "0%", scale: 1, opacity: 1, backgroundColor: "#E6C17A", boxShadow: "0 0 8px #E6C17A" },
                    "to-db": { left: "100%", scale: 1.2, opacity: 1, backgroundColor: "#ffffff", boxShadow: "0 0 12px #ffffff" },
                    "db-hit": { left: "0%", scale: 1, opacity: 1, backgroundColor: "#ffffff", boxShadow: "0 0 8px #ffffff" }
                  }}
                  animate={packetState}
                  transition={
                    packetState === "to-cache" ? { duration: 0.35, ease: "easeOut" } :
                    packetState === "cache-hit" ? { duration: 0.35, ease: "easeIn" } :
                    packetState === "to-db" ? { duration: 0.7, ease: "easeInOut" } :
                    packetState === "db-hit" ? { duration: 0.9, ease: "easeInOut" } :
                    { duration: 0.2 }
                  }
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full"
                />
              </div>
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
                <div className="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800">
                  <Wrench className="w-6 h-6 text-[#E6C17A]" />
                </div>
                <h3 className="text-xl font-bold font-display text-zinc-50">{t.toolsTitle}</h3>
              </div>
              <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
                {t.toolsDesc}
              </p>
            </div>

            <div className="flex gap-4 mt-4">
              <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                <Globe className="w-4 h-4 text-[#E6C17A]" /> {t.seoStructured}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                <Cpu className="w-4 h-4 text-white" /> {t.cicdPipelines}
              </div>
            </div>
          </div>

          {/* Interactive circular SEO metric visualization */}
          <div className="w-[180px] h-[180px] flex-shrink-0 mx-auto md:my-auto rounded-full bg-zinc-950/40 border border-zinc-800/80 flex items-center justify-center relative shadow-inner">
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
                stroke="url(#goldGlowGrad)"
                strokeWidth="6"
                fill="none"
                strokeDasharray="251.2"
                initial={{ strokeDashoffset: 251.2 }}
                whileInView={{ strokeDashoffset: 25.12 }} // 90% fill
                transition={{ duration: 1.5, ease: "easeOut" }}
                viewport={{ once: true }}
              />
              <defs>
                <linearGradient id="goldGlowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#E6C17A" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-black font-display text-white tracking-tighter">100</span>
              <span className="text-[10px] uppercase font-bold text-[#E6C17A] tracking-wider flex items-center gap-0.5">
                <Search className="w-3 h-3" /> {t.seoScore}
              </span>
            </div>
          </div>
        </div>
      </TiltCard>
    </div>
  );
};
