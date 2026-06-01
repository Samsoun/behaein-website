"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { User, Cpu, Sparkles } from "lucide-react";

export const PortraitFrame: React.FC = () => {
  const [imgExists, setImgExists] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Check if image exists in the public directory
  useEffect(() => {
    const img = new Image();
    img.src = "/samsoun.jpg";
    img.onload = () => setImgExists(true);
    img.onerror = () => setImgExists(false);
  }, []);

  // Motion values for 3D tilt
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const springConfig = { damping: 20, stiffness: 180, mass: 0.8 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // Tilt rotation ratios
  const rotateX = useTransform(springY, [0, 1], [15, -15]);
  const rotateY = useTransform(springX, [0, 1], [-15, 15]);

  // Spotlight coordinates
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);
  const springGlowX = useSpring(glowX, springConfig);
  const springGlowY = useSpring(glowY, springConfig);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    x.set(mouseX / width);
    y.set(mouseY / height);

    glowX.set(mouseX);
    glowY.set(mouseY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <div 
      className="relative w-[280px] h-[360px] md:w-[320px] md:h-[400px] [perspective:1000px] select-none cursor-grab active:cursor-grabbing"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Dynamic Backing Glow Glow */}
      <motion.div
        className="absolute -inset-4 bg-gradient-to-tr from-[#00F0FF]/20 to-indigo-500/10 rounded-[32px] blur-2xl opacity-40 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none -z-10"
        style={{
          rotateX: rotateX,
          rotateY: rotateY,
        }}
      />

      {/* Main 3D Card */}
      <motion.div
        style={{
          rotateX: rotateX,
          rotateY: rotateY,
          transformStyle: "preserve-3d",
        }}
        className="w-full h-full rounded-3xl border border-[#00F0FF]/15 bg-slate-950/40 backdrop-blur-md p-4 relative overflow-hidden flex flex-col items-center justify-center shadow-2xl"
      >
        {/* Inner glow spotlight mask */}
        <motion.div
          className="absolute -inset-px pointer-events-none rounded-3xl"
          style={{
            opacity: isHovered ? 1 : 0,
            background: useTransform(
              [springGlowX, springGlowY],
              ([latestX, latestY]) =>
                `radial-gradient(300px circle at ${latestX}px ${latestY}px, rgba(0, 240, 255, 0.15), transparent 80%)`
            ),
            transition: "opacity 0.3s ease",
          }}
        />

        {/* 3D Elevated Picture Slot */}
        <div 
          className="w-full h-full rounded-2xl overflow-hidden relative border border-slate-800 bg-slate-900/50 flex flex-col items-center justify-center"
          style={{
            transform: "translateZ(30px)",
            transformStyle: "preserve-3d",
          }}
        >
          {imgExists ? (
            /* User portrait */
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/samsoun.jpg" 
                alt="Samsoun Behaein"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              {/* Overlay styling elements */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-[10px] font-bold font-mono text-[#00F0FF] tracking-wider uppercase bg-slate-950/80 px-2 py-0.5 rounded border border-[#00F0FF]/20">
                <Sparkles className="w-3 h-3 text-[#00F0FF]" /> Samsoun Behaein
              </div>
            </>
          ) : (
            /* Graceful Fallback Creative Tech Avatar */
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative">
              {/* Animated visual meshes */}
              <div className="w-24 h-24 rounded-full border border-[#00F0FF]/20 flex items-center justify-center relative mb-4 shadow-[0_0_20px_rgba(0,240,255,0.05)]">
                <div className="absolute inset-1 rounded-full border border-dashed border-[#00F0FF]/10 animate-spin-slow" />
                <User className="w-10 h-10 text-[#00F0FF]/60" />
              </div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider font-display">Samsoun Behaein</h4>
              <p className="text-[10px] text-slate-500 mt-1 font-mono uppercase tracking-widest text-[#00F0FF]/80">CREATIVE TECHNOLOGIST</p>
              
              <div className="mt-4 p-2 bg-slate-950 rounded border border-slate-800 text-[9px] text-[#94A3B8] font-mono leading-normal">
                * Place <span className="text-[#00F0FF]">samsoun.jpg</span> inside <span className="text-slate-400">/public</span> folder to load photo dynamically.
              </div>

              {/* Small chip */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1 text-[8px] font-bold text-[#00F0FF]/60 uppercase font-mono bg-slate-950/50 px-2 py-0.5 rounded">
                <Cpu className="w-2.5 h-2.5" /> Core Simulator Active
              </div>
            </div>
          )}
        </div>

        {/* Faint corner glow highlight */}
        <div className="absolute inset-0 border border-[#00F0FF]/5 rounded-3xl pointer-events-none" />
      </motion.div>
    </div>
  );
};
