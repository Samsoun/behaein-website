"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  ChevronRight, 
  Lock, 
  RefreshCw, 
  Search, 
  MapPin, 
  User, 
  Award, 
  Sliders, 
  Check, 
  Layers 
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

// Component 1: SmartphoneMockup (Barande)
export const SmartphoneMockup: React.FC = () => {
  return (
    <motion.div
      whileHover={{ 
        rotateY: 8, 
        rotateX: -4,
        scale: 1.02,
        z: 30
      }}
      transition={{ type: "spring", stiffness: 150, damping: 20 }}
      className="relative w-[280px] h-[550px] rounded-[42px] bg-slate-900 border-[8px] border-slate-800 shadow-[0_20px_50px_rgba(0,240,255,0.15)] flex flex-col overflow-hidden [transformStyle:preserve-3d] select-none"
      style={{
        transform: "rotateY(-15deg) rotateX(12deg) rotateZ(-3deg)",
      }}
    >
      {/* Glossy overlay sheen */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-white/10 z-30" />

      {/* Screen Container */}
      <div className="absolute inset-0 bg-[#0A0D14] overflow-hidden rounded-[34px]">
        <img 
          src="/barande.jpg" 
          alt="Barande App Screenshot" 
          className="w-full h-full object-cover object-top animate-fade-in"
          draggable={false}
        />
      </div>

      {/* Screen Home Indicator Bar */}
      <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-24 h-1 bg-black/30 rounded-full z-40" />
    </motion.div>
  );
};

// Component 2: BrowserMockup (Sheen Berlin)
export const BrowserMockup: React.FC = () => {
  const { t, isRtl } = useLanguage();
  const [seoTab, setSeoTab] = useState<"preview" | "metrics">("preview");

  return (
    <motion.div
      whileHover={{ 
        rotateY: -8, 
        rotateX: -4,
        scale: 1.02,
        z: 30
      }}
      transition={{ type: "spring", stiffness: 150, damping: 20 }}
      className="w-full max-w-lg h-[340px] rounded-2xl glass-panel relative overflow-hidden flex flex-col border border-white/10 shadow-[0_20px_50px_rgba(0,240,255,0.08)] [transformStyle:preserve-3d] select-none"
      style={{
        transform: "rotateY(10deg) rotateX(8deg) rotateZ(1deg)",
      }}
    >
      {/* Browser Bar */}
      <div className="h-10 border-b border-slate-800/80 bg-slate-950/80 flex items-center justify-between px-4 z-20">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>

        {/* Address Bar */}
        <div className="flex items-center gap-2 px-3 py-1 rounded bg-slate-900 border border-slate-800 w-[240px] md:w-[280px] h-6 justify-center">
          <Lock className="w-3 h-3 text-[#00F0FF]" />
          <span className="text-[10px] text-slate-300 font-mono tracking-tight font-sans">https://sheen.berlin</span>
          <RefreshCw className="w-2.5 h-2.5 text-slate-500 animate-spin-slow ml-2" />
        </div>

        {/* Action controls */}
        <div className="flex gap-2">
          <button 
            onClick={() => setSeoTab("preview")}
            className={`px-2 py-0.5 rounded text-[8px] font-bold tracking-wide uppercase transition-all ${
              seoTab === "preview" ? "bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/25" : "text-slate-500"
            }`}
          >
            {t("mockupBrowserTabSite")}
          </button>
          <button 
            onClick={() => setSeoTab("metrics")}
            className={`px-2 py-0.5 rounded text-[8px] font-bold tracking-wide uppercase transition-all ${
              seoTab === "metrics" ? "bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/25" : "text-slate-500"
            }`}
          >
            {t("mockupBrowserTabLighthouse")}
          </button>
        </div>
      </div>

      {/* Screen Body */}
      <div className="flex-1 bg-[#090C12] relative overflow-hidden">
        {seoTab === "preview" ? (
          <div className="absolute inset-0">
            <img 
              src="/sheen.jpg" 
              alt="Sheen Berlin Screenshot" 
              className="w-full h-full object-cover object-top animate-fade-in"
              draggable={false}
            />
          </div>
        ) : (
          <div 
            dir={isRtl ? "rtl" : "ltr"}
            className="absolute inset-0 flex flex-col justify-between p-6 font-mono text-[9px] text-[#94A3B8] text-start"
          >
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <span className="font-bold text-[#00F0FF] uppercase flex items-center gap-1">
                <Award className="w-4 h-4" /> {t("mockupBrowserSeoTag")}
              </span>
              <span className="text-emerald-400 font-bold uppercase bg-emerald-400/10 px-1 rounded">{t("mockupBrowserRankText")}</span>
            </div>

            {/* Metas and Structured Data grid */}
            <div className="grid grid-cols-2 gap-4 flex-1 py-4">
              <div className="flex flex-col gap-2 bg-slate-950/50 p-2.5 rounded-lg border border-slate-800">
                <div className="text-[8px] font-bold uppercase tracking-wider text-slate-500">{isRtl ? "کدهای نشانه گذاری شده" : "Structured Schema"}</div>
                <div className="text-[7.5px] leading-relaxed text-cyan-400/90 font-mono whitespace-pre line-clamp-6">
{`{
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  "name": "Sheen Berlin",
  "url": "https://sheen.berlin",
  "areaServed": "Berlin",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9"
  }
}`}
                </div>
              </div>

              {/* Lighthouse Speed scores */}
              <div className="flex flex-col justify-between bg-slate-950/50 p-2.5 rounded-lg border border-slate-800">
                <div className="text-[8px] font-bold uppercase tracking-wider text-slate-500">{t("mockupBrowserAuditTag")}</div>
                
                <div className="flex flex-col gap-1.5 py-1">
                  <div className="flex justify-between items-center">
                    <span>{t("mockupBrowserPerformance")}</span>
                    <span className="text-emerald-400 font-bold">{isRtl ? "۱۰۰/۱۰۰" : "100/100"}</span>
                  </div>
                  <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                    <div className="w-full h-full bg-emerald-400" />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 py-1">
                  <div className="flex justify-between items-center">
                    <span>{t("mockupBrowserSeoPractices")}</span>
                    <span className="text-emerald-400 font-bold">{isRtl ? "۱۰۰/۱۰۰" : "100/100"}</span>
                  </div>
                  <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                    <div className="w-full h-full bg-emerald-400" />
                  </div>
                </div>

                <div className="text-[7.5px] text-slate-500 border-t border-slate-800 pt-1 mt-1 font-sans">
                  {t("mockupBrowserFooterNote")}
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </motion.div>
  );
};
