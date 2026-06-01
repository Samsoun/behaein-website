"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertTriangle, Mail, ShieldAlert } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export const ContactForm: React.FC = () => {
  const { t, isRtl } = useLanguage();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    projectType: "Full-Stack Development",
    message: "",
    "bot-field": "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    // Serialize form data for Netlify Forms URLencoding
    const formBody = new URLSearchParams();
    formBody.append("form-name", "contact");
    Object.entries(formState).forEach(([key, value]) => {
      formBody.append(key, value);
    });

    try {
      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formBody.toString(),
      });

      if (response.ok) {
        setStatus("success");
        // Reset form
        setFormState({
          name: "",
          email: "",
          projectType: "Full-Stack Development",
          message: "",
          "bot-field": "",
        });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Netlify Form submission error:", error);
      setStatus("error");
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 select-none text-start">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="glass-panel rounded-2xl p-6 md:p-10 relative overflow-hidden"
      >
        {/* Floating gradient orb in background */}
        <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

        <div className="flex items-center gap-3.5 mb-6 border-b border-slate-800/80 pb-4">
          <div className="p-2.5 rounded-lg bg-[#00F0FF]/15 border border-[#00F0FF]/20">
            <Mail className="w-6 h-6 text-[#00F0FF]" />
          </div>
          <div>
            <h3 className="text-xl font-bold font-display text-white">{t("contactCardTitle")}</h3>
            <p className="text-xs text-slate-400">{t("contactCardSubtitle")}</p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="py-12 flex flex-col items-center justify-center text-center gap-4"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <CheckCircle className="w-16 h-16 text-emerald-400 shadow-inner" />
              </motion.div>
              <h4 className="text-xl font-bold text-white font-display">{t("contactSuccessTitle")}</h4>
              <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
                {t("contactSuccessDesc")}
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-6 px-5 py-2.5 rounded-lg border border-slate-800 hover:border-[#00F0FF]/40 text-xs font-bold text-slate-300 transition-colors"
              >
                {t("contactSuccessBtn")}
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="contact-form"
              name="contact"
              onSubmit={handleSubmit}
              className="flex flex-col gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Netlify Form identifier inputs */}
              <input type="hidden" name="form-name" value="contact" />
              
              {/* Spam Honeypot Protection */}
              <p className="hidden">
                <label>
                  Don't fill this out if you're human:{" "}
                  <input name="bot-field" value={formState["bot-field"]} onChange={handleChange} />
                </label>
              </p>

              {/* Name Field */}
              <div className="relative flex flex-col gap-1.5">
                <label 
                  htmlFor="name" 
                  className={`text-xs font-bold uppercase tracking-wider transition-colors duration-200 ${
                    focusedField === "name" ? "text-[#00F0FF]" : "text-slate-400"
                  }`}
                >
                  {t("contactNameLabel")}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formState.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  placeholder={t("contactNamePlaceholder")}
                  className="w-full px-4 py-3 rounded-lg bg-slate-950/60 border border-slate-800 hover:border-slate-700/80 focus:border-[#00F0FF]/60 outline-none text-sm text-white placeholder-slate-600 transition-colors"
                />
              </div>

              {/* Email Field */}
              <div className="relative flex flex-col gap-1.5">
                <label 
                  htmlFor="email" 
                  className={`text-xs font-bold uppercase tracking-wider transition-colors duration-200 ${
                    focusedField === "email" ? "text-[#00F0FF]" : "text-slate-400"
                  }`}
                >
                  {t("contactEmailLabel")}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formState.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  placeholder={t("contactEmailPlaceholder")}
                  className="w-full px-4 py-3 rounded-lg bg-slate-950/60 border border-slate-800 hover:border-slate-700/80 focus:border-[#00F0FF]/60 outline-none text-sm text-white placeholder-slate-600 transition-colors"
                />
              </div>

              {/* Project Type Selector */}
              <div className="relative flex flex-col gap-1.5">
                <label 
                  htmlFor="projectType" 
                  className={`text-xs font-bold uppercase tracking-wider transition-colors duration-200 ${
                    focusedField === "projectType" ? "text-[#00F0FF]" : "text-slate-400"
                  }`}
                >
                  {t("contactFocusLabel")}
                </label>
                <div className="relative">
                  <select
                    id="projectType"
                    name="projectType"
                    value={formState.projectType}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("projectType")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-3 rounded-lg bg-slate-950/60 border border-slate-800 hover:border-slate-700/80 focus:border-[#00F0FF]/60 outline-none text-sm text-white transition-colors cursor-pointer appearance-none"
                  >
                    <option className="bg-slate-950" value="Full-Stack Development">{t("contactFocusOption1")}</option>
                    <option className="bg-slate-950" value="Mobile App Dev (React Native)">{t("contactFocusOption2")}</option>
                    <option className="bg-slate-950" value="Premium UI/UX & SEO">{t("contactFocusOption3")}</option>
                    <option className="bg-slate-950" value="Custom Consultation">{t("contactFocusOption4")}</option>
                  </select>
                  <div className="absolute right-4 rtl:right-auto rtl:left-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 text-[10px] font-bold uppercase">
                    SELECT
                  </div>
                </div>
              </div>

              {/* Message Field */}
              <div className="relative flex flex-col gap-1.5">
                <label 
                  htmlFor="message" 
                  className={`text-xs font-bold uppercase tracking-wider transition-colors duration-200 ${
                    focusedField === "message" ? "text-[#00F0FF]" : "text-slate-400"
                  }`}
                >
                  {t("contactMessageLabel")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formState.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  placeholder={t("contactMessagePlaceholder")}
                  className="w-full px-4 py-3 rounded-lg bg-slate-950/60 border border-slate-800 hover:border-slate-700/80 focus:border-[#00F0FF]/60 outline-none text-sm text-white placeholder-slate-600 transition-colors resize-none"
                />
              </div>

              {/* Error Message if dynamic submit fails */}
              {status === "error" && (
                <div className="p-3 bg-red-500/10 border border-red-500/25 rounded-lg flex items-center gap-2.5 text-xs text-red-400 font-semibold font-mono">
                  <AlertTriangle className="w-4 h-4" /> 
                  <span>{t("contactErrorText")}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full relative px-6 py-3.5 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-[#00F0FF] hover:to-indigo-400 text-white font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer select-none active:scale-[0.98] disabled:opacity-50"
              >
                {status === "submitting" ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{t("contactSubmitEncrypting")}</span>
                  </>
                ) : (
                  <>
                    <Send className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} />
                    <span>{t("contactSubmitButton")}</span>
                  </>
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
