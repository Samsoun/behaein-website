"use client";

import React, { useEffect } from "react";
import { AlertOctagon, RotateCcw, Home } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to console or external monitoring
    console.error("Application runtime exception captured:", error);
  }, [error]);

  return (
    <div className="min-h-[80vh] w-full flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden bg-[#0B0F19]">
      {/* Decorative Grid Lines Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none z-0" />
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#00F0FF]/[0.02] blur-[100px] pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-purple-500/[0.015] blur-[80px] pointer-events-none z-0" />

      {/* Glassmorphic Error Container */}
      <div className="w-full max-w-lg z-10 glass-panel rounded-3xl p-8 border border-red-500/20 bg-slate-950/85 backdrop-blur-xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_30px_rgba(239,68,68,0.05)] relative text-center flex flex-col items-center">
        
        {/* Neon corner accents (Red/Crimson matching the error state) */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-red-500/30 rounded-tl-2xl" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-red-500/30 rounded-tr-2xl" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-red-500/30 rounded-bl-2xl" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-red-500/30 rounded-br-2xl" />

        {/* Pulsing Warning Icon */}
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(239,68,68,0.15)] animate-pulse">
          <AlertOctagon className="w-8 h-8 text-red-500" />
        </div>

        {/* Localized Header & Subtitle */}
        <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-red-500 uppercase mb-2">
          System-Diagnose: Fehler 500
        </span>
        <h2 className="text-2xl font-extrabold font-display text-white tracking-tight mb-3">
          Visuelle Engine hat Schluckauf
        </h2>
        <p className="text-slate-400 text-xs md:text-sm leading-relaxed mb-8 max-w-sm">
          Ein unerwarteter Laufzeitfehler ist aufgetreten. Keine Sorge, wir können das System sofort wiederherstellen.
        </p>

        {/* Buttons section */}
        <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full">
          <button
            onClick={() => reset()}
            className="flex items-center justify-center gap-2 w-full sm:w-auto flex-1 px-5 py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 hover:border-red-500/50 hover:text-white transition-all shadow-[0_0_15px_rgba(239,68,68,0.08)] active:scale-[0.98] cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Engine neustarten</span>
          </button>
          
          <a
            href="/"
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider bg-slate-900 border border-white/5 text-slate-400 hover:border-white/10 hover:text-white transition-all active:scale-[0.98]"
          >
            <Home className="w-4 h-4" />
            <span>Startseite</span>
          </a>
        </div>

        {/* Tech Details disclosure */}
        <div className="mt-8 pt-4 border-t border-white/5 w-full">
          <details className="group cursor-pointer">
            <summary className="text-[9.5px] font-mono font-bold text-slate-500 uppercase tracking-widest hover:text-slate-400 list-none flex items-center justify-center gap-1.5 transition-colors">
              <span>Fehlerprotokoll anzeigen</span>
              <span className="text-[8px] group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div className="mt-3 text-left bg-black/40 border border-white/5 rounded-xl p-3.5 max-h-24 overflow-y-auto text-[10px] font-mono text-red-400/80 leading-normal break-all">
              {error.message || "Unbekannter Rendering-Ausnahmefehler"}
              {error.digest && <div className="text-slate-600 mt-1">Digest: {error.digest}</div>}
            </div>
          </details>
        </div>

      </div>
    </div>
  );
}
