"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Compass, Cpu, Rocket } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface Step {
  num: string;
  title: string;
  icon: React.ReactNode;
  desc: string;
  bullets: string[];
}

export const ProcessTimeline: React.FC = () => {
  const { locale, isRtl } = useLanguage();
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
      title: locale === "fa" ? "تحقیق و طراحی UI/UX" : (locale === "de" ? "Konzeption & UI/UX Design" : "Discovery & UI/UX Design"),
      icon: <Compass className="w-6 h-6 text-[#00F0FF]" />,
      desc: locale === "fa" 
        ? "پایه‌ریزی مستحکم با تبدیل ایده‌های خام به طرح‌های تعاملی و وایرفریم‌های دقیق. خلق زبان زیبایی‌شناسی برند، پالت‌های رنگی اختصاصی و ساختارهای واکنش‌گرا در فیگما."
        : (locale === "de" 
          ? "Schaffung solider Grundlagen, indem abstrakte Ideen in interaktive Layouts und maßgeschneiderte Wireframes übersetzt werden. Gestaltung der Markenästhetik, Auswahl harmonischer Paletten und Aufbau responsiver Strukturen in Figma."
          : "Laying solid groundworks by converting abstract ideas into interactive layouts and highly tailored wireframes. Designing the brand's aesthetic language, choosing harmonies, and building responsive structures in Figma."),
      bullets: locale === "fa" 
        ? ["پروتوتایپ‌های تعاملی با دقت بالا", "خلق پالت رنگی اختصاصی و هماهنگ", "وایرفریمینگ واکنش‌گرا و موبایل‌محور", "نقشه‌های جریان کاربر و دسترسی‌پذیری"]
        : (locale === "de" 
          ? ["Interaktive High-Fidelity-Prototypen", "Erstellung harmonischer Farbpaletten", "Mobile-First responsive Wireframes", "User Flows & Barrierefreiheit-Checkliste"]
          : ["Interactive high-fidelity prototypes", "Harmonious custom color palette creation", "Mobile-first responsive wireframing", "User flow maps & accessibility checklist"])
    },
    {
      num: "02",
      title: locale === "fa" ? "مهندسی چابک (Agile)" : (locale === "de" ? "Agile Entwicklung" : "Agile Engineering"),
      icon: <Cpu className="w-6 h-6 text-[#00F0FF]" />,
      desc: locale === "fa"
        ? "ترجمه وایرفریم‌ها به کدهای ماژولار، تمیز و استاندارد ری‌اکت و ری‌اکت نیتیو. پیاده‌سازی دیتابیس‌ها، سیستم‌های بیومتریک و خطوط مالی امن در یک ساختار مهندسی مدرن."
        : (locale === "de"
          ? "Übersetzung pixelperfekter Wireframes in sauberen, standardkonformen, modularen React- und React-Native-Code. Entwicklung sicherer APIs, Treuhand-Workflows, Datenbanken und biometrischer nativer Ebenen in modernen Ausführungssystemen."
          : "Translating pixel-perfect wireframes into clean, standard-compliant, modular React and React Native code. Developing secure APIs, escrow workflows, databases, and biometric native layers inside modern execution systems."),
      bullets: locale === "fa"
        ? ["مخازن کد تمیز نکست‌جی‌اس و تایپ‌اسکریپت", "اپلیکیشن‌های چندپلتفرمه اکسپو و ری‌اکت نیتیو", "پایگاه‌داده‌های سوپابیس با قوانین دسترسی امن", "پوشش کامل ساختارهای ایمنی تایپ (Type-safety)"]
        : (locale === "de"
          ? ["Modulare Next.js / TypeScript-Codebases", "React Native & Expo Apps für iOS & Android", "Supabase-Schemata & sichere Zeilenregeln", "Vollständige Typsicherheitsstrukturen"]
          : ["Modular Next.js / TypeScript codebases", "React Native & Expo cross-platform apps", "Supabase schemas & secure row-level rules", "Fully covered type-safety structures"])
    },
    {
      num: "03",
      title: locale === "fa" ? "بهینه‌سازی و راه‌اندازی" : (locale === "de" ? "Optimierung & Launch" : "Optimization & Launch"),
      icon: <Rocket className="w-6 h-6 text-[#00F0FF]" />,
      desc: locale === "fa"
        ? "تیونینگ کامل قطعات برای سرعت فوق‌العاده و کسب امتیاز کامل ۱۰۰/۱۰۰ در ابزار بررسی Lighthouse گوگل. استقرار روی سرورهای ابری با دامنه‌های اختصاصی، نقشه‌های سایت خودکار و پروتکل‌های امنیتی SSL."
        : (locale === "de"
          ? "Tuning von Komponenten für extreme Leistung, Ladeprioritäten und semantische Konformität, um ein makelloses 100/100 Lighthouse-Audit zu sichern. Deployment auf Netlify mit benutzerdefinierten Routen, automatischen Sitemaps und SSL."
          : "Tuning components for extreme performance, loading priorities, and semantic compliance to secure a flawless 100/100 Lighthouse audit. Deploying onto Netlify with custom domain routes, automated sitemaps, and SSL configs."),
      bullets: locale === "fa"
        ? ["امتیاز ۱۰۰/۱۰۰ عملکرد در سنجش Lighthouse", "نشانه‌گذاری‌های استاندارد Google JSON-LD Schema", "سیستم‌های پیشرفته حافظه پنهان و بارگذاری سرور", "توسعه نهایی روی هاستینگ‌های تولیدی و فرم‌ها"]
        : (locale === "de"
          ? ["100/100 Lighthouse Performance-Audit", "JSON-LD strukturierte Google-Schemas", "Fortgeschrittenes Client-Preloading & Cache", "Netlify Production Deployments & Formulare"]
          : ["100/100 Lighthouse performance audit", "JSON-LD structured Google Schema markup", "Advanced client preloading & server caching", "Netlify production deployments & forms"])
    }
  ];

  return (
    <div ref={containerRef} className="relative max-w-5xl mx-auto px-6 py-12 select-none">
      
      {/* Central Glowing vertical timeline connector line (Desktop Only) */}
      <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-1 bg-slate-900 rounded-full hidden md:block overflow-hidden">
        {/* Fill animation indicator */}
        <motion.div
          style={{ scaleY: scaleY, originY: 0 }}
          className="w-full h-full bg-gradient-to-b from-[#00F0FF] via-cyan-500 to-indigo-500 shadow-[0_0_8px_#00F0FF]"
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
              <div className="absolute left-1/2 -translate-x-1/2 top-0 -mt-1 w-10 h-10 rounded-full bg-slate-950 border-2 border-[#00F0FF]/30 hidden md:flex items-center justify-center z-10 shadow-[0_0_15px_rgba(0,240,255,0.15)] group">
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
                <div className="absolute inset-0 rounded-2xl bg-cyan-500/0 group-hover:bg-[#00F0FF]/2 transition-all duration-300 pointer-events-none" />

                {/* Big Step Number indicator */}
                <div className="absolute top-4 right-6 rtl:right-auto rtl:left-6 text-4xl md:text-5xl font-black font-mono tracking-tighter text-slate-800/40 select-none group-hover:text-[#00F0FF]/10 transition-colors">
                  {step.num}
                </div>

                <div className="flex items-center gap-3.5 mb-4 border-b border-slate-800/80 pb-3">
                  <div className="p-2.5 rounded-lg bg-[#00F0FF]/15 border border-[#00F0FF]/20 md:hidden">
                    {step.icon}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold font-display text-white">{step.title}</h3>
                </div>

                <p className="text-[#94A3B8] text-sm leading-relaxed mb-6">
                  {step.desc}
                </p>

                {/* List items */}
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {step.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2 text-xs font-semibold text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] mt-1.5 shadow-[0_0_4px_#00F0FF] flex-shrink-0" />
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
