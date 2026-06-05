"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertTriangle, Volume2, VolumeX, Lock, Unlock } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

// Synthesize retro-futuristic sound effects using the Web Audio API (Zero-dependency, zero loading lag)
const playSound = (type: "switch" | "click" | "slide" | "success" | "hover" | "alarm", muted: boolean) => {
  if (muted) return;
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    
    if (type === "switch") {
      // SNAPPY COCKPIT FLIP SWITCH
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(120, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } else if (type === "click") {
      // ANALOG DIAL CLICKS
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(900, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.015);
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.02);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.025);
    } else if (type === "slide") {
      // HYDRAULIC STRIPED LID FRICTION
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(50, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(120, ctx.currentTime + 0.25);
      
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(450, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.25);
      filter.Q.setValueAtTime(15, ctx.currentTime);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.25);
      
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.26);
    } else if (type === "success") {
      // ROCKET ENGINE INITIATING SWEEP
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc1.type = "sawtooth";
      osc1.frequency.setValueAtTime(80, ctx.currentTime);
      osc1.frequency.exponentialRampToValueAtTime(950, ctx.currentTime + 0.7);
      
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(85, ctx.currentTime);
      osc2.frequency.exponentialRampToValueAtTime(960, ctx.currentTime + 0.7);
      
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.5);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.7);
      
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);
      
      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 0.7);
      osc2.stop(ctx.currentTime + 0.7);
    } else if (type === "hover") {
      // SUBTLE RADAR BEEP
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(2200, ctx.currentTime);
      gain.gain.setValueAtTime(0.004, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } else if (type === "alarm") {
      // SAFETY WARN WARNING BEAT
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.setValueAtTime(280, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.16);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.18);
    }
  } catch (e) {
    console.warn("Web Audio API not allowed or initialized yet:", e);
  }
};

export const ContactForm: React.FC = () => {
  const { t, isRtl, locale } = useLanguage();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    projectType: "Full-Stack Development",
    message: "",
    "bot-field": "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Custom Dashboard Control Panel states
  const [scopeSlider, setScopeSlider] = useState(50); // scope slider: 0-100
  const [muted, setMuted] = useState(false);
  const [isLidCoverOpen, setIsLidCoverOpen] = useState(false);
  const [isSubmittingDial, setIsSubmittingDial] = useState(false);

  // Set default sound volume settings (retrieve from localstorage if set)
  useEffect(() => {
    const savedMute = localStorage.getItem("preferred_contact_mute");
    if (savedMute) {
      setTimeout(() => {
        setMuted(savedMute === "true");
      }, 0);
    }
  }, []);

  const toggleMuted = () => {
    const newMute = !muted;
    setMuted(newMute);
    localStorage.setItem("preferred_contact_mute", String(newMute));
    if (!newMute) {
      playSound("hover", false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  // Maps index to contact project types
  const handleSwitchToggle = (type: string) => {
    setFormState(prev => ({
      ...prev,
      projectType: type
    }));
    playSound("switch", muted);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (status === "submitting") return;
    
    setIsSubmittingDial(true);
    setStatus("submitting");
    playSound("success", muted);

    // Serialize form data for Netlify Forms URLencoding
    const formBody = new URLSearchParams();
    formBody.append("form-name", "contact");
    
    // Custom scope description injected directly into form state message for submissions
    const finalMessage = `[PROJEKT-DIMENSION: ${scopeSlider}%]\n\n${formState.message}`;
    
    formBody.append("name", formState.name);
    formBody.append("email", formState.email);
    formBody.append("projectType", formState.projectType);
    formBody.append("message", finalMessage);
    formBody.append("bot-field", formState["bot-field"]);

    try {
      // In local development, simulate a successful transmission for testing
      const isLocal = typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");
      if (isLocal) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        setStatus("success");
        setIsLidCoverOpen(false);
        setFormState({
          name: "",
          email: "",
          projectType: "Full-Stack Development",
          message: "",
          "bot-field": "",
        });
        setIsSubmittingDial(false);
        return;
      }

      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formBody.toString(),
      });

      if (response.ok) {
        setStatus("success");
        setIsLidCoverOpen(false);
        // Reset states
        setFormState({
          name: "",
          email: "",
          projectType: "Full-Stack Development",
          message: "",
          "bot-field": "",
        });
      } else {
        setStatus("error");
        playSound("alarm", muted);
      }
    } catch (error) {
      console.error("Netlify Form submission error:", error);
      setStatus("error");
      playSound("alarm", muted);
    } finally {
      setIsSubmittingDial(false);
    }
  };

  // Maps values to scope display output text
  const getScopeDetails = (val: number) => {
    if (val < 25) {
      if (locale === "fa") {
        return { 
          title: "سریع (MVP)", 
          desc: "طراحی متمرکز بر عملکردهای اصلی و راه‌اندازی سریع"
        };
      }
      if (locale === "de") {
        return {
          title: "Kompakt (MVP)",
          desc: "Fokus auf Kernfunktionen, um Konzepte schnell zu testen."
        };
      }
      return { 
        title: "Compact (MVP)", 
        desc: "Focused on core features to test concepts quickly."
      };
    }
    if (val < 60) {
      if (locale === "fa") {
        return { 
          title: "کامل (Vollversion)", 
          desc: "طراحی بهینه، صفحات تعاملی کامل و انیمیشن‌های روان"
        };
      }
      if (locale === "de") {
        return {
          title: "Standard (Vollversion)",
          desc: "Optimiertes responsives Design, vollständiger Seitenumfang & flüssige Animationsübergänge."
        };
      }
      return { 
        title: "Standard (Full Product)", 
        desc: "Polished responsive design, complete page scope & smooth animation transitions."
      };
    }
    if (val < 85) {
      if (locale === "fa") {
        return { 
          title: "پیشرفته (High Polish)", 
          desc: "طراحی کاملاً سفارشی، جزئیات متحرک غنی و بهینه‌سازی پیشرفته سئو"
        };
      }
      if (locale === "de") {
        return {
          title: "Premium (High Polish & Motion)",
          desc: "Höchst individuelles visuelles Design, immersive Mikrointeraktionen & erstklassige organische Platzierungen."
        };
      }
      return { 
        title: "Premium (High Polish & Motion)", 
        desc: "Highly bespoke visual designs, immersive micro-interactions & top organic rankings."
      };
    }
    if (locale === "fa") {
      return { 
        title: "فوق پیشرفته (SEO Max)", 
        desc: "انیمیشن‌های بسیار پیچیده، سئوی حداکثری و اتوماسیون کامل کد"
      };
    }
    if (locale === "de") {
      return {
        title: "Enterprise (Skalierbar & SEO Max)",
        desc: "Benutzerdefinierte dynamische Funktionen, maximales SEO-Schema-Markup & komplexe Integrationsregeln."
      };
    }
    return { 
      title: "Enterprise (Scalable & SEO Max)", 
      desc: "Custom dynamic features, maximum SEO schema markup & complex integration rules."
    };
  };

  // Triggered when warning launch lid cover is dragged or clicked
  const handleLidToggle = () => {
    setIsLidCoverOpen(!isLidCoverOpen);
    playSound("slide", muted);
  };

  const projectFocusOptions = [
    { key: "contactFocusOption1" as const, submitVal: "Full-Stack Development" },
    { key: "contactFocusOption2" as const, submitVal: "Mobile App Dev (React Native)" },
    { key: "contactFocusOption3" as const, submitVal: "Premium UI/UX & SEO" },
    { key: "contactFocusOption4" as const, submitVal: "Custom Consultation" },
  ];

  const scopeMeta = getScopeDetails(scopeSlider);

  return (
    <div className="w-full max-w-3xl mx-auto px-4 select-none text-start">
      <motion.div
        className="glass-panel border border-zinc-800/80 rounded-3xl p-6 md:p-8 relative overflow-hidden bg-zinc-950/80 shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
      >
        {/* Futuristic Dashboard Face Overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-zinc-800/40 via-amber-100/30 to-zinc-800/40" />
        
        {/* Cockpit Status Header */}
        <div className="flex justify-between items-center border-b border-zinc-900 pb-4 mb-6">
          <div className="flex items-center gap-3">
            {/* Status Indicator LED */}
            <div className="relative flex h-2.5 w-2.5">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${status === "submitting" ? "bg-amber-300" : "bg-amber-100"}`}></span>
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${status === "submitting" ? "bg-amber-500" : "bg-[#E6C17A]"}`}></span>
            </div>
            <div>
              <h3 className="text-xs font-mono font-bold tracking-widest text-zinc-400 uppercase">
                {locale === "de" ? "SYS.VERBINDUNGS_PANEL // v1.2" : (isRtl ? "پنل اتصال // v1.2" : "SYS.CONNECT_PANEL // v1.2")}
              </h3>
              <p className="text-[10px] text-[#E6C17A] font-mono leading-none tracking-widest mt-1">
                {status === "submitting" 
                  ? (locale === "de" ? "ÜBERTRAGUNG LÄUFT..." : (isRtl ? "در حال ارسال..." : "TRANSMITTING...")) 
                  : (locale === "de" ? "ONLINE // SYSTEM BEREIT" : (isRtl ? "آنلاین // سیستم آماده" : "ONLINE // SYSTEM READY"))
                }
              </p>
            </div>
          </div>
          
          {/* Dashboard Control (Audio Mute Toggle) */}
          <button
            type="button"
            onClick={toggleMuted}
            className={`p-2 rounded-lg border transition-all duration-200 cursor-pointer ${
              muted 
                ? "border-zinc-800/80 text-zinc-600 bg-zinc-950/40 hover:text-zinc-500" 
                : "border-[#E6C17A]/25 text-[#E6C17A] bg-[#E6C17A]/5 hover:bg-[#E6C17A]/15"
            }`}
            title={
              locale === "de" 
                ? (muted ? "Sound einschalten" : "Sound ausschalten") 
                : (isRtl ? (muted ? "فعال کردن صدا" : "قطع صدا") : (muted ? "Enable sound" : "Mute sound"))
            }
            aria-label="Toggle Sound"
          >
            {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 animate-pulse" />}
          </button>
        </div>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              className="py-12 flex flex-col items-center justify-center text-center gap-5"
            >
              <div className="relative">
                {/* Glowing check ring */}
                <div className="absolute inset-0 bg-emerald-500/25 blur-xl rounded-full scale-125 pointer-events-none" />
                <motion.div
                  initial={{ rotate: -90, scale: 0.5 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 12 }}
                  className="relative z-10 p-4 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
                >
                  <CheckCircle className="w-12 h-12" />
                </motion.div>
              </div>
              <h4 className="text-xl font-bold font-display text-white">{t("contactSuccessTitle")}</h4>
              <p className="text-xs text-zinc-400 max-w-sm font-mono leading-relaxed bg-zinc-950/60 p-4 rounded-xl border border-zinc-900">
                {t("contactSuccessDesc")}
              </p>
              <button
                onClick={() => {
                  setStatus("idle");
                  setIsLidCoverOpen(false);
                  playSound("switch", muted);
                }}
                className="mt-4 px-6 py-2.5 rounded-lg border border-zinc-800 hover:border-[#E6C17A]/40 text-xs font-mono font-bold text-zinc-300 hover:text-white transition-colors cursor-pointer active:scale-95 duration-150"
              >
                &lt; {t("contactSuccessBtn")} /&gt;
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Spam Honeypot Protection */}
              <input type="hidden" name="form-name" value="contact" />
              <p className="hidden">
                <label>
                  Don&apos;t fill this out if you&apos;re human:{" "}
                  <input name="bot-field" value={formState["bot-field"]} onChange={handleChange} />
                </label>
              </p>

              {/* 1. INPUT DISPLAYS (Name & E-Mail) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name field */}
                <div className="flex flex-col gap-1.5">
                  <label 
                    htmlFor="name" 
                    className={`font-mono font-bold uppercase tracking-widest transition-colors duration-200 ${
                      isRtl ? "text-xs" : "text-[10px]"
                    } ${
                      focusedField === "name" ? "text-[#E6C17A]" : "text-zinc-400"
                    }`}
                  >
                    {t("contactNameLabel")}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formState.name}
                      onChange={handleChange}
                      onFocus={() => {
                        setFocusedField("name");
                        playSound("hover", muted);
                      }}
                      onBlur={() => setFocusedField(null)}
                      placeholder={t("contactNamePlaceholder")}
                      className="w-full px-4 py-3 rounded-lg bg-zinc-950 border border-zinc-800 hover:border-zinc-700/80 focus:border-[#E6C17A]/60 outline-none text-sm text-white placeholder-zinc-600 font-mono transition-colors shadow-inner"
                    />
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[8px] font-mono text-zinc-600 select-none">
                      [STR_VAL]
                    </div>
                  </div>
                </div>

                {/* Email field */}
                <div className="flex flex-col gap-1.5">
                  <label 
                    htmlFor="email" 
                    className={`font-mono font-bold uppercase tracking-widest transition-colors duration-200 ${
                      isRtl ? "text-xs" : "text-[10px]"
                    } ${
                      focusedField === "email" ? "text-[#E6C17A]" : "text-zinc-400"
                    }`}
                  >
                    {t("contactEmailLabel")}
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formState.email}
                      onChange={handleChange}
                      onFocus={() => {
                        setFocusedField("email");
                        playSound("hover", muted);
                      }}
                      onBlur={() => setFocusedField(null)}
                      placeholder={t("contactEmailPlaceholder")}
                      className="w-full px-4 py-3 rounded-lg bg-zinc-950 border border-zinc-800 hover:border-zinc-700/80 focus:border-[#E6C17A]/60 outline-none text-sm text-white placeholder-zinc-600 font-mono transition-colors shadow-inner"
                    />
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[8px] font-mono text-zinc-600 select-none">
                      [ADDR_VAL]
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. THE FLIP SWITCHBOARD (Project focus selections - 2-column grid layout to prevent text overflows) */}
              <div className="flex flex-col gap-2">
                <label className={`font-mono font-bold uppercase tracking-widest text-zinc-400 ${isRtl ? "text-xs" : "text-[10px]"}`}>
                  {t("contactFocusLabel")}
                </label>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-zinc-900/40 p-4 rounded-xl border border-zinc-900 shadow-inner">
                  {projectFocusOptions.map((opt) => {
                    const isSelected = formState.projectType === opt.submitVal;
                    return (
                      <div 
                        key={opt.submitVal}
                        onClick={() => handleSwitchToggle(opt.submitVal)}
                        className={`flex flex-row items-center justify-between p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
                          isSelected 
                            ? "bg-[#E6C17A]/5 border-[#E6C17A]/25 shadow-[0_0_15px_rgba(230,193,122,0.05)]" 
                            : "bg-zinc-900/10 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/30"
                        }`}
                      >
                        {/* Switchboard Text Label */}
                        <span className={`font-mono font-bold leading-tight ${
                          isRtl ? "text-xs" : "text-[10px]"
                        } ${
                          isSelected ? "text-[#E6C17A]" : "text-zinc-500"
                        }`}>
                          {t(opt.key)}
                        </span>
                        
                        {/* Snappy Spring Cockpit Flip Toggle Switch */}
                        <div className="relative w-12 h-6 rounded-full bg-zinc-950 border border-zinc-800 flex items-center p-0.5 flex-shrink-0">
                          <motion.div
                            animate={isSelected ? { x: isRtl ? -24 : 24, backgroundColor: "#E6C17A" } : { x: 0, backgroundColor: "#334155" }}
                            transition={{ type: "spring", stiffness: 350, damping: 14 }}
                            className="w-5 h-5 rounded-full shadow-md flex items-center justify-center cursor-pointer"
                          >
                            {/* Visual Toggle LED */}
                            <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? "bg-white animate-pulse" : "bg-zinc-600"}`} />
                          </motion.div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 3. HORIZONTAL RANGE INSTRUMENT: PROJECT SCOPE PARAMETER (Replacing circular dial knob) */}
              <div className="flex flex-col gap-3 p-4 rounded-xl border border-zinc-900 bg-zinc-950/40 relative overflow-hidden">
                <div className="flex justify-between items-center mb-1">
                  <span className={`font-mono font-bold uppercase tracking-widest text-zinc-400 ${isRtl ? "text-xs" : "text-[10px]"}`}>
                    {locale === "de" 
                      ? "PROJEKT-SCOPE // PARAMETER" 
                      : (isRtl ? "ابعاد پروژه // مقیاس کار" : "SYS.PROJECT_SCOPE // PARAMETER")
                    }
                  </span>
                  <span className={`font-mono font-bold text-[#E6C17A] ${isRtl ? "text-[13px]" : "text-[11px]"}`}>
                    &gt; {scopeMeta.title}
                  </span>
                </div>
                
                {/* Horizontal range slider */}
                <div className="relative py-4 flex flex-col gap-2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={scopeSlider}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      setScopeSlider(val);
                      if (Math.round(val / 5) !== Math.round(scopeSlider / 5)) {
                        playSound("click", muted);
                      }
                    }}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer focus:outline-none relative z-10"
                    style={{
                      background: `linear-gradient(${isRtl ? "to left" : "to right"}, #E6C17A 0%, #ffffff ${scopeSlider}%, #09090b ${scopeSlider}%, #09090b 100%)`,
                      border: "1px solid #27272a",
                    }}
                  />
                  
                  {/* CSS styles to overwrite browser range fader handles */}
                  <style dangerouslySetInnerHTML={{ __html: `
                    input[type="range"]::-webkit-slider-thumb {
                      -webkit-appearance: none;
                      appearance: none;
                      width: 24px;
                      height: 16px;
                      border-radius: 4px;
                      background: #1e293b;
                      border: 2px solid #E6C17A;
                      cursor: pointer;
                      box-shadow: 0 0 10px rgba(230, 193, 122, 0.6);
                      transition: background 0.15s ease;
                    }
                    input[type="range"]::-webkit-slider-thumb:hover {
                      background: #334155;
                    }
                    input[type="range"]::-moz-range-thumb {
                      width: 24px;
                      height: 16px;
                      border-radius: 4px;
                      background: #1e293b;
                      border: 2px solid #E6C17A;
                      cursor: pointer;
                      box-shadow: 0 0 10px rgba(230, 193, 122, 0.6);
                    }
                  `}} />

                  {/* Range indicators/ticks */}
                  <div className="flex justify-between text-[8px] font-mono text-zinc-500 px-1 select-none">
                    <span>[01 // MVP]</span>
                    <span>[02 // STANDARD]</span>
                    <span>[03 // PREMIUM]</span>
                    <span>[04 // ENTERPRISE]</span>
                  </div>
                </div>

                {/* Scope Description lcd display readout */}
                <div className={`font-mono text-zinc-400 bg-zinc-950/80 p-2.5 rounded border border-zinc-900/60 leading-normal ${isRtl ? "text-[12px] leading-relaxed" : "text-[10px]"}`}>
                  {scopeMeta.desc}
                </div>
              </div>

              {/* 4. TRANSMISSION LOG WINDOW: MESSAGE */}
              <div className="flex flex-col gap-1.5">
                <label 
                  htmlFor="message" 
                  className={`font-mono font-bold uppercase tracking-widest transition-colors duration-200 ${
                    isRtl ? "text-xs" : "text-[10px]"
                  } ${
                    focusedField === "message" ? "text-[#E6C17A]" : "text-zinc-400"
                  }`}
                >
                  {t("contactMessageLabel")}
                </label>
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formState.message}
                    onChange={handleChange}
                    onFocus={() => {
                      setFocusedField("message");
                      playSound("hover", muted);
                    }}
                    onBlur={() => setFocusedField(null)}
                    placeholder={t("contactMessagePlaceholder")}
                    className="w-full px-4 py-3 rounded-lg bg-zinc-950 border border-zinc-800 hover:border-zinc-700/80 focus:border-[#E6C17A]/60 outline-none text-sm text-white placeholder-zinc-600 font-mono transition-colors resize-none shadow-inner"
                  />
                  <div className="absolute left-3.5 bottom-2 text-[8px] font-mono text-zinc-700 select-none pointer-events-none">
                    [LOG_STREAM // MSG_BUFFER]
                  </div>
                </div>
              </div>

              {/* 5. COCKPIT SUBMIT BOARD: SAFETY COVERED BUTTON */}
              <div className="border-t border-zinc-900 pt-6 mt-2 relative flex flex-col items-center gap-4">
                
                {/* Warning message if submit fails */}
                {status === "error" && (
                  <div className="w-full p-3 bg-red-500/10 border border-red-500/25 rounded-lg flex items-center gap-2.5 text-xs text-red-400 font-mono">
                    <AlertTriangle className="w-4 h-4 animate-bounce" /> 
                    <span>{t("contactErrorText")}</span>
                  </div>
                )}
 
                {/* The Hydraulic Lift Lid Launch Panel */}
                <div className="relative w-full max-w-sm h-16 bg-zinc-950/60 rounded-xl border border-zinc-900 shadow-inner flex items-center justify-center overflow-hidden">
                  
                  {/* ABSENDEN / LAUNCH BUTTON (Sits securely underneath cover) */}
                  <button
                    type="submit"
                    disabled={status === "submitting" || !isLidCoverOpen}
                    className={`w-full h-full text-center relative px-6 flex items-center justify-center gap-2 font-mono font-extrabold uppercase tracking-widest transition-colors duration-200 select-none active:scale-[0.98] z-10 ${
                      isLidCoverOpen && status !== "submitting"
                        ? "text-red-500 hover:text-red-400 cursor-pointer"
                        : "text-zinc-700 cursor-not-allowed"
                    }`}
                  >
                    {isSubmittingDial ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                        <span className="text-red-400 animate-pulse text-xs tracking-wider">
                          {t("contactSubmitEncrypting")}
                        </span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 animate-pulse" />
                        <span className="text-xs tracking-widest">
                          {locale === "de" 
                            ? "ÜBERTRAGUNG STARTEN" 
                            : (isRtl ? "ارسال نهایی" : "LAUNCH TRANSMISSION")
                          }
                        </span>
                      </>
                    )}
                  </button>
                  
                  {/* LCD Display backing glow */}
                  {isLidCoverOpen && !isSubmittingDial && (
                    <div className="absolute inset-0 bg-red-500/5 animate-pulse pointer-events-none" />
                  )}

                  {/* ROTATING ROCKET LID COVER (Hydraulic drag panel) */}
                  <motion.div
                    drag="y"
                    dragConstraints={{ top: -64, bottom: 0 }}
                    dragElastic={0.08}
                    animate={isLidCoverOpen ? { y: -64 } : { y: 0 }}
                    transition={{ type: "spring", stiffness: 220, damping: 18 }}
                    onDragEnd={(event, info) => {
                      if (info.offset.y < -20) {
                        setIsLidCoverOpen(true);
                      } else {
                        setIsLidCoverOpen(false);
                      }
                      playSound("slide", muted);
                    }}
                    onClick={handleLidToggle}
                    className="absolute inset-0 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl flex items-center justify-between px-5 cursor-row-resize select-none z-20 group"
                  >
                    {/* Industry Safety Stripes */}
                    <div 
                      className="w-8 h-full opacity-20" 
                      style={{
                        backgroundImage: "repeating-linear-gradient(-45deg, #E6C17A, #E6C17A 6px, #18181b 6px, #18181b 12px)"
                      }}
                    />
                    
                    <div className="flex items-center gap-3">
                      {isLidCoverOpen ? <Unlock className="w-4 h-4 text-emerald-500" /> : <Lock className="w-4 h-4 text-zinc-500" />}
                      <span className={`font-mono font-bold uppercase tracking-widest ${
                        isRtl ? "text-xs" : "text-[10px]"
                      } ${isLidCoverOpen ? "text-emerald-500" : "text-zinc-400 group-hover:text-zinc-300"}`}>
                        {isLidCoverOpen 
                          ? (locale === "de" 
                              ? "ABDECKUNG OFFEN // STARTBEREIT" 
                              : (isRtl ? "پوشش باز شد - آماده پرتاب" : "LID OPEN // SAFE ARMED")
                            ) 
                          : (locale === "de" 
                              ? "ZUM STARTEN NACH OBEN ZIEHEN" 
                              : (isRtl ? "پوشش محافظ را بالا بکشید" : "DRAG UP TO LAUNCH")
                            )
                        }
                      </span>
                    </div>

                    <div 
                      className="w-8 h-full opacity-20" 
                      style={{
                        backgroundImage: "repeating-linear-gradient(-45deg, #E6C17A, #E6C17A 6px, #18181b 6px, #18181b 12px)"
                      }}
                    />
                  </motion.div>
                </div>
              </div>
            </form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
