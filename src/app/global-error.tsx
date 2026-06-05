"use client";

import React, { useEffect } from "react";
import { AlertOctagon, RotateCcw } from "lucide-react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalErrorBoundary({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error("Global application exception captured:", error);
  }, [error]);

  return (
    <html lang="de" className="h-full">
      <body className="font-body min-h-full flex flex-col bg-[#0B0F19] text-[#F8FAFC] antialiased">
        <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden bg-[#0B0F19]">
          {/* Background Radial Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#00F0FF]/[0.02] blur-[100px] pointer-events-none z-0" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-purple-500/[0.015] blur-[80px] pointer-events-none z-0" />

          {/* Glassmorphic Error Container */}
          <div className="w-full max-w-lg z-10 glass-panel rounded-3xl p-8 border border-red-500/20 bg-slate-950/85 backdrop-blur-xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_30px_rgba(239,68,68,0.05)] relative text-center flex flex-col items-center">
            
            {/* Neon corner accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-red-500/30 rounded-tl-2xl" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-red-500/30 rounded-tr-2xl" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-red-500/30 rounded-bl-2xl" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-red-500/30 rounded-br-2xl" />

            {/* Pulsing Warning Icon */}
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(239,68,68,0.15)] animate-pulse">
              <AlertOctagon className="w-8 h-8 text-red-500" />
            </div>

            {/* Localized Header & Subtitle */}
            <span className="font-body text-xs font-normal tracking-widest uppercase text-white/30 mb-2">
              System-Diagnose: Kritischer Ausnahmefehler
            </span>
            <h2 className="font-display text-2xl font-normal text-white tracking-tight mb-3">
              Kritischer System-Ausfall
            </h2>
            <p className="font-body text-base leading-relaxed font-normal text-white/50 mb-8 max-w-sm">
              Es ist ein schwerwiegender Kernfehler aufgetreten. Keine Sorge, wir können die Engine sofort neu starten.
            </p>

            {/* Reload button */}
            <button
              onClick={() => reset()}
              className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl font-body text-sm font-normal uppercase tracking-wider bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 hover:border-red-500/50 hover:text-white transition-all shadow-[0_0_15px_rgba(239,68,68,0.08)] active:scale-[0.98] cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Core neustarten</span>
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
