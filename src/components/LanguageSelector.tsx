"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, ChevronDown } from "lucide-react";
import { useLanguage, Locale } from "@/context/LanguageContext";

const languages: { code: Locale; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "fa", label: "فارسی", flag: "🇮🇷" },
];

export const LanguageSelector: React.FC = () => {
  const { locale, setLocale, isRtl } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeLanguage = languages.find((lang) => lang.code === locale) || languages[0];

  return (
    <div ref={dropdownRef} className="relative z-50">
      {/* Dropdown Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-3.5 py-2.5 rounded-full bg-slate-900/40 hover:bg-[#00F0FF]/15 border border-[#00F0FF]/25 hover:border-[#00F0FF]/50 text-slate-300 hover:text-[#00F0FF] text-xs font-black tracking-wider flex items-center gap-2 transition-all duration-300 cursor-pointer select-none"
        aria-label="Select Language"
      >
        <Globe className="w-3.5 h-3.5 animate-pulse" />
        <span className="font-mono uppercase">{locale}</span>
        <ChevronDown 
          className={`w-3.5 h-3.5 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`} 
        />
      </button>

      {/* Dropdown Options */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`absolute top-full mt-2 w-32 glass-panel rounded-xl shadow-xl overflow-hidden py-1.5 backdrop-blur-md border border-[#00F0FF]/10 ${
              isRtl ? "left-0 origin-top-left" : "right-0 origin-top-right"
            }`}
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLocale(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2 text-xs flex items-center justify-between transition-colors text-left cursor-pointer ${
                  locale === lang.code
                    ? "bg-[#00F0FF]/10 text-[#00F0FF] font-black"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                } ${isRtl ? "flex-row-reverse text-right" : "flex-row"}`}
              >
                <span>{lang.label}</span>
                <span className="text-base select-none font-sans leading-none">{lang.flag}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
