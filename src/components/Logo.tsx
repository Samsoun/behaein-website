"use client";

import React from "react";
import { motion } from "framer-motion";

interface LogoProps {
  className?: string;
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({ className = "", size = 38 }) => {
  // Framer Motion Variants for "The Spatial Shift" 3D layered parallax effect
  const containerVariants = {
    rest: {
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    hover: {
      rotateX: 15,
      rotateY: -15,
      rotateZ: 2,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  } as const;

  // Back Layer (Deep shadow/foundation) - Drifts Down and Left
  const backLayerVariants = {
    rest: { x: 0, y: 0, opacity: 0.45, filter: "blur(0.5px)" },
    hover: { 
      x: -5, 
      y: 4, 
      opacity: 0.7,
      filter: "blur(0px)",
      transition: { duration: 0.4, ease: "backOut" } 
    }
  } as const;

  // Middle Layer (Hybrid Gold-White) - Remains stable as anchor point
  const middleLayerVariants = {
    rest: { x: 0, y: 0, opacity: 0.75 },
    hover: { 
      x: 0, 
      y: 0, 
      opacity: 0.9,
      transition: { duration: 0.4, ease: "backOut" } 
    }
  } as const;

  // Front Layer (Champagne Gold highlight) - Drifts Up and Right (towards the viewer)
  const frontLayerVariants = {
    rest: { x: 0, y: 0, opacity: 1, filter: "drop-shadow(0 0 0px rgba(230,193,122,0))" },
    hover: { 
      x: 5, 
      y: -4, 
      opacity: 1,
      filter: "drop-shadow(0 2px 8px rgba(230,193,122,0.45))",
      transition: { duration: 0.4, ease: "backOut" } 
    }
  } as const;

  // SVG Path for the abstract geometric modernist "B"
  const logoPath = "M 35 80 V 20 H 58 C 70 20 70 48 58 48 H 35 H 62 C 74 48 74 80 62 80 H 35";

  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      className={`flex items-center gap-2 sm:gap-3.5 select-none ${className}`}
      style={{ perspective: 600 }}
    >
      {/* Interactive 3D SVG Monogram */}
      <motion.div
        variants={containerVariants}
        style={{ transformStyle: "preserve-3d" }}
        className="relative flex items-center justify-center cursor-pointer"
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible"
        >
          <defs>
            {/* Main Gradient: White to Champagne Gold */}
            <linearGradient id="spatial-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#E6C17A" />
            </linearGradient>

            {/* Glowing radial back-glow */}
            <radialGradient id="spatial-back-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#E6C17A" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#27272a" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Ambient Glow Aura */}
          <circle cx="50%" cy="50%" r="48" fill="url(#spatial-back-glow)" className="pointer-events-none" />

          {/* LAYER 1: BACK (Deep Zinc Shadow Layer) */}
          <motion.path
            d={logoPath}
            variants={backLayerVariants}
            stroke="#27272a"
            strokeWidth="8.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* LAYER 2: MIDDLE (The blended gradient transition layer) */}
          <motion.path
            d={logoPath}
            variants={middleLayerVariants}
            stroke="url(#spatial-gradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* LAYER 3: FRONT (Gold Foreground highlight) */}
          <motion.path
            d={logoPath}
            variants={frontLayerVariants}
            stroke="#E6C17A"
            strokeWidth="7.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>

      {/* Brand-Typography Text */}
      <div className="flex flex-col justify-center">
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          dir="ltr"
          className="font-sans text-xs sm:text-base font-black tracking-[0.25em] text-white leading-none uppercase flex items-center"
        >
          BEHAEIN
          <motion.span 
            className="text-[#E6C17A]"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            .
          </motion.span>
          COM
        </motion.span>
      </div>
    </motion.div>
  );
};

export default Logo;
