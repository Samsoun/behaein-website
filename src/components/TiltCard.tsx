"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxRotation?: number; // Maximum tilt angle in degrees
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = "",
  maxRotation = 12,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for tilt
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  // Springs for buttery smooth movements
  const springConfig = { damping: 25, stiffness: 220, mass: 0.6 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // Map mouse coordinate ratios (0 to 1) to tilt degree range (-maxRotation to maxRotation)
  const rotateX = useTransform(springY, [0, 1], [maxRotation, -maxRotation]);
  const rotateY = useTransform(springX, [0, 1], [-maxRotation, maxRotation]);

  // Spotlight mouse position tracking
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);
  const springGlowX = useSpring(glowX, springConfig);
  const springGlowY = useSpring(glowY, springConfig);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Relative mouse cursor coordinates inside card
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // Ratio between 0.0 and 1.0
    x.set(mouseX / width);
    y.set(mouseY / height);

    // Glow position in pixels
    glowX.set(mouseX);
    glowY.set(mouseY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Reset back to center
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-2xl transition-transform duration-200 [perspective:1000px] select-none ${className}`}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        style={{
          rotateX: rotateX,
          rotateY: rotateY,
          transformStyle: "preserve-3d",
        }}
        className="w-full h-full glass-panel rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between"
      >
        {/* Cursor Spotlight Radial Mask Glow */}
        <motion.div
          className="absolute -inset-px pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
          style={{
            opacity: isHovered ? 1 : 0,
            background: useTransform(
              [springGlowX, springGlowY],
              ([latestX, latestY]) =>
                `radial-gradient(400px circle at ${latestX}px ${latestY}px, rgba(230, 193, 122, 0.12), transparent 80%)`
            ),
          }}
        />

        {/* Faint corner glow border */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            border: "1px solid rgba(230, 193, 122, 0.08)",
            boxShadow: isHovered 
              ? "inset 0 0 12px rgba(230, 193, 122, 0.05)" 
              : "inset 0 0 0px rgba(230, 193, 122, 0)",
            transition: "box-shadow 0.3s ease",
          }}
        />

        {/* Card Content - elevated in 3D space */}
        <div 
          className="w-full h-full flex flex-col justify-between"
          style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
};
