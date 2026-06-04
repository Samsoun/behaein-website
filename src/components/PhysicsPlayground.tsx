"use client";

import React, { useEffect, useRef, useState } from "react";
import { Sparkles, Cpu, User, RefreshCw, Zap, Play, Grid } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface PhysicsItem {
  id: string;
  type: "tagline" | "word" | "subline" | "portrait" | "badge";
  x: number; // current dx offset
  y: number; // current dy offset
  z: number; // current dz offset
  vx: number; // velocity x
  vy: number; // velocity y
  vz: number; // velocity z
  angle: number; // current rotation angle
  angularVelocity: number;
  width: number;
  height: number;
  baseX: number; // default layout center X relative to parent
  baseY: number; // default layout center Y relative to parent
  mass: number;
  isDragging: boolean;
  label?: string; // For text/badge label rendering
  targetZ: number; // target depth during snap-back
  isImage?: boolean;
  imageUrl?: string;
}

// Layout anchors representing a beautiful scatter pattern behind the text and around the portrait
export const badgeLayoutAnchors: Record<string, { xPct: number; yPct: number; zOffset: number }> = {
  "badge-react": { xPct: 0.12, yPct: 0.22, zOffset: -80 },
  "badge-nextjs": { xPct: 0.38, yPct: 0.14, zOffset: -100 },
  "badge-ts": { xPct: 0.68, yPct: 0.16, zOffset: -80 },
  "badge-tailwind": { xPct: 0.08, yPct: 0.45, zOffset: -120 },
  "badge-supabase": { xPct: 0.45, yPct: 0.85, zOffset: -90 },
  "badge-native": { xPct: 0.88, yPct: 0.42, zOffset: -100 },
  "badge-framer": { xPct: 0.82, yPct: 0.84, zOffset: -90 },
  "badge-javascript": { xPct: 0.14, yPct: 0.88, zOffset: -110 },
  "badge-wm-ball": { xPct: 0.54, yPct: 0.68, zOffset: 0 },
  "badge-wm-trophy": { xPct: 0.76, yPct: 0.22, zOffset: -60 },
  // Flags anchors
  "flag-de": { xPct: 0.22, yPct: 0.72, zOffset: -70 },
  "flag-us": { xPct: 0.32, yPct: 0.88, zOffset: -90 },
  "flag-mx": { xPct: 0.62, yPct: 0.85, zOffset: -80 },
  "flag-ca": { xPct: 0.42, yPct: 0.25, zOffset: -110 },
  "flag-br": { xPct: 0.88, yPct: 0.18, zOffset: -90 },
  "flag-ir": { xPct: 0.90, yPct: 0.65, zOffset: -70 },
};

export const PhysicsPlayground: React.FC = () => {
  const { t, locale, isRtl } = useLanguage();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const refsMap = useRef<Record<string, HTMLElement | null>>({});

  // Physics engine settings and state
  const [mode, setMode] = useState<"chaos" | "ordnung">("ordnung");
  const [isHoveringCTA, setIsHoveringCTA] = useState(false);
  const [imgExists, setImgExists] = useState(false);
  const [engineStats, setEngineStats] = useState({ fps: 60, collisions: 0 });
  const [wmMode, setWmMode] = useState<boolean>(true);

  // Refs for animation loop without trigger re-renders
  const itemsRef = useRef<PhysicsItem[]>([]);
  const isSnappingRef = useRef(true);
  const modeRef = useRef<"chaos" | "ordnung">("ordnung");
  const isHoveringCTARef = useRef(false);
  const wmModeRef = useRef(true);
  
  // Dragging states
  const activeDragIdRef = useRef<string | null>(null);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const mousePosRef = useRef({ rawX: -1000, rawY: -1000, prevX: 0, prevY: 0, vx: 0, vy: 0 });

  // Check if portrait image exists in public folder
  useEffect(() => {
    const img = new Image();
    img.src = "/samsoun.jpg";
    img.onload = () => setImgExists(true);
    img.onerror = () => setImgExists(false);
  }, []);

  // Synchronize component state to simulation refs
  useEffect(() => {
    isSnappingRef.current = mode === "ordnung" || isHoveringCTA;
    modeRef.current = mode;
    isHoveringCTARef.current = isHoveringCTA;
    wmModeRef.current = wmMode;
  }, [mode, isHoveringCTA, wmMode]);

  // Headline word splitting helper
  const prefixWords = t("heroHeadlinePrefix").trim().split(/\s+/);
  const highlightWords = t("heroHeadlineHighlight").trim().split(/\s+/);
  const suffixWords = t("heroHeadlineSuffix").trim().split(/\s+/);

  const headlineWordObjects = [
    ...prefixWords.map((text, idx) => ({ id: `word-prefix-${idx}`, text, type: "prefix" as const })),
    ...highlightWords.map((text, idx) => ({ id: `word-highlight-${idx}`, text, type: "highlight" as const })),
    ...suffixWords.map((text, idx) => ({ id: `word-suffix-${idx}`, text, type: "suffix" as const })),
  ];

  // Extra floating Tech Badges
  const techBadges = [
    { id: "badge-react", label: "React" },
    { id: "badge-nextjs", label: "Next.js 16" },
    { id: "badge-ts", label: "TypeScript" },
    { id: "badge-tailwind", label: "Tailwind CSS" },
    { id: "badge-supabase", label: "Supabase" },
    { id: "badge-native", label: "React Native" },
    { id: "badge-framer", label: "Framer Motion" },
    { id: "badge-javascript", label: "JavaScript" },
    ...(wmMode
      ? [
          { id: "badge-wm-ball", label: "WM Ball", isImage: true, imageUrl: "/wm_ball.png" },
          { id: "badge-wm-trophy", label: "WM Trophy", isImage: true, imageUrl: "/wm_trophy.png" },
          { id: "flag-de", label: "Germany", isImage: true, imageUrl: "https://flagcdn.com/w80/de.png" },
          { id: "flag-us", label: "USA", isImage: true, imageUrl: "https://flagcdn.com/w80/us.png" },
          { id: "flag-mx", label: "Mexico", isImage: true, imageUrl: "https://flagcdn.com/w80/mx.png" },
          { id: "flag-ca", label: "Canada", isImage: true, imageUrl: "https://flagcdn.com/w80/ca.png" },
          { id: "flag-br", label: "Brazil", isImage: true, imageUrl: "https://flagcdn.com/w80/br.png" },
          { id: "flag-ir", label: "Iran", isImage: true, imageUrl: "https://flagcdn.com/w80/ir.png" },
        ]
      : []),
  ];

  // Helper for scroll offset
  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Measuring original layout baseline coordinates
  const measureLayout = () => {
    const container = containerRef.current;
    if (!container) return;
    const parentRect = container.getBoundingClientRect();

    const updatedItems: PhysicsItem[] = [];

    // Helper to process standard layout items
    const processItem = (id: string, type: PhysicsItem["type"], mass: number, label?: string) => {
      const el = refsMap.current[id];
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Find existing coordinates to preserve offset if measuring during resize
      const existing = itemsRef.current.find(item => item.id === id);
      const currentDx = existing ? existing.x : 0;
      const currentDy = existing ? existing.y : 0;

      // Calculate absolute center position relative to parent container, subtracting current translations
      const baseX = (rect.left - parentRect.left + width / 2) - currentDx;
      const baseY = (rect.top - parentRect.top + height / 2) - currentDy;

      updatedItems.push({
        id,
        type,
        x: currentDx,
        y: currentDy,
        z: existing ? existing.z : 0,
        vx: existing ? existing.vx : 0,
        vy: existing ? existing.vy : 0,
        vz: existing ? existing.vz : 0,
        angle: existing ? existing.angle : 0,
        angularVelocity: existing ? existing.angularVelocity : 0,
        width,
        height,
        baseX,
        baseY,
        mass,
        isDragging: existing ? existing.isDragging : false,
        label,
        targetZ: 0,
      });
    };

    // 1. Process standard text & portrait content elements
    processItem("tagline", "tagline", 1.8);
    headlineWordObjects.forEach((word) => {
      processItem(word.id, "word", 1.0, word.text);
    });
    processItem("subline", "subline", 3.5);
    processItem("portrait-card", "portrait", 6.0);

    // 2. Process custom floating tech badges using pre-calculated percentage spots
    techBadges.forEach((badge) => {
      const el = refsMap.current[badge.id];
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      const existing = itemsRef.current.find(item => item.id === badge.id);
      const currentDx = existing ? existing.x : 0;
      const currentDy = existing ? existing.y : 0;

      // Layout anchors representing a beautiful scatter pattern around the hero workspace
      const anchor = badgeLayoutAnchors[badge.id] || { xPct: 0.5, yPct: 0.5, zOffset: -100 };
      const xPct = isRtl ? 1 - anchor.xPct : anchor.xPct;
      const baseX = xPct * parentRect.width;
      const baseY = anchor.yPct * parentRect.height;

      let mass = 1.2;
      if (badge.id === "badge-wm-ball") mass = 2.4;
      else if (badge.id === "badge-wm-trophy") mass = 3.5;
      else if (badge.id.startsWith("flag-")) mass = 0.8;

      updatedItems.push({
        id: badge.id,
        type: "badge",
        x: currentDx,
        y: currentDy,
        z: existing ? existing.z : anchor.zOffset,
        vx: existing ? existing.vx : 0,
        vy: existing ? existing.vy : 0,
        vz: existing ? existing.vz : 0,
        angle: existing ? existing.angle : 0,
        angularVelocity: existing ? existing.angularVelocity : 0,
        width,
        height,
        baseX,
        baseY,
        mass,
        isDragging: existing ? existing.isDragging : false,
        label: badge.label,
        targetZ: anchor.zOffset,
        isImage: 'imageUrl' in badge ? true : undefined,
        imageUrl: 'imageUrl' in badge ? (badge as any).imageUrl : undefined,
      });
    });

    itemsRef.current = updatedItems;
  };

  // Run measure after initial mount and setup resize handler
  useEffect(() => {
    // Wait briefly for layout paint and typeface loading
    const timer = setTimeout(() => {
      measureLayout();
      // If we start in "ordnung", snap them immediately to zero
      itemsRef.current.forEach(item => {
        item.x = 0; item.y = 0; item.z = 0; item.angle = 0;
        item.vx = 0; item.vy = 0; item.vz = 0; item.angularVelocity = 0;
      });
    }, 150);

    const handleResize = () => {
      measureLayout();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, [locale, wmMode]); // Remeasure on locale/wmMode shift

  // Simulation Loop setup
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();
    let frameCount = 0;
    let fpsInterval = performance.now();

    const loop = (time: number) => {
      frameCount++;
      if (time - fpsInterval >= 1000) {
        setEngineStats(prev => ({
          ...prev,
          fps: Math.round((frameCount * 1000) / (time - fpsInterval))
        }));
        frameCount = 0;
        fpsInterval = time;
      }

      const container = containerRef.current;
      if (!container) {
        animationFrameId = requestAnimationFrame(loop);
        return;
      }

      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;

      const items = itemsRef.current;
      const isSnapping = isSnappingRef.current;
      const activeDragId = activeDragIdRef.current;
      const mouse = mousePosRef.current;

      // Mouse drag speed calculations
      mouse.vx = mouse.rawX - mouse.prevX;
      mouse.vy = mouse.rawY - mouse.prevY;
      mouse.prevX = mouse.rawX;
      mouse.prevY = mouse.rawY;

      // Spring config parameters for Snapping back to baseline layout grid
      const springK = 0.14; // Snapping speed stiffness
      const damping = 0.78;  // Easing friction to avoid endless oscillation

      // Zero-G environment values (Chaos Mode)
      const maxSpeed = 12;
      const boundaryBounce = 0.65; // Coefficient of restitution for walls
      let localCollisionCount = 0;

      // 1. Update positions & apply physics forces
      for (let i = 0; i < items.length; i++) {
        const item = items[i];

        if (item.id === activeDragId) {
          // Dragging: Lock coordinate offset to scaled pointer position
          const targetX = mouse.rawX - item.baseX - dragOffsetRef.current.x;
          const targetY = mouse.rawY - item.baseY - dragOffsetRef.current.y;
          
          // Move physics values with mouse cursor
          item.x = targetX;
          item.y = targetY;
          item.z = 45; // bring closer in 3D perspective

          // Keep tracking momentum from drag movements
          item.vx = mouse.vx * 0.85;
          item.vy = mouse.vy * 0.85;
          item.vz = 0;
          item.angularVelocity = (mouse.vx * 0.15); // spin based on drag swipe
        } else if (isSnapping) {
          // A. Snap-back mode (Spring pull towards offset zero and target Z depth)
          const ax = (0 - item.x) * springK;
          const ay = (0 - item.y) * springK;
          const az = (item.targetZ - item.z) * springK;
          const aRot = (0 - item.angle) * springK;

          item.vx = (item.vx + ax) * damping;
          item.vy = (item.vy + ay) * damping;
          item.vz = (item.vz + az) * damping;
          item.angularVelocity = (item.angularVelocity + aRot) * damping;

          item.x += item.vx;
          item.y += item.vy;
          item.z += item.vz;
          item.angle += item.angularVelocity;

          // Lock to zero when velocities get tiny to save CPU
          if (Math.abs(item.x) < 0.02 && Math.abs(item.vx) < 0.02) {
            item.x = 0; item.vx = 0;
          }
          if (Math.abs(item.y) < 0.02 && Math.abs(item.vy) < 0.02) {
            item.y = 0; item.vy = 0;
          }
          if (Math.abs(item.z - item.targetZ) < 0.02 && Math.abs(item.vz) < 0.02) {
            item.z = item.targetZ; item.vz = 0;
          }
          if (Math.abs(item.angle) < 0.02 && Math.abs(item.angularVelocity) < 0.02) {
            item.angle = 0; item.angularVelocity = 0;
          }
        } else {
          // B. Chaos / Zero-Gravity mode
          // Floating free in space: apply minor gravity drift
          item.vx += (Math.random() - 0.5) * 0.07;
          item.vy += (Math.random() - 0.5) * 0.07;

          // Apply friction/drag resistance (very low in space)
          item.vx *= 0.985;
          item.vy *= 0.985;
          item.vz *= 0.97;
          item.angularVelocity *= 0.98;

          // An extremely light attraction pull to make sure they never escape the viewport boundaries completely over time
          const globalAttract = 0.0006;
          item.vx += (0 - item.x) * globalAttract;
          item.vy += (0 - item.y) * globalAttract;
          item.vz += (0 - item.z) * globalAttract;
          item.angularVelocity += (0 - item.angle) * globalAttract;

            // Mouse Repulsion / Kick Force
            if (mouse.rawX > -100) {
              const dx = (item.baseX + item.x) - mouse.rawX;
              const dy = (item.baseY + item.y) - mouse.rawY;
              const dist = Math.hypot(dx, dy);

              if (item.id === "badge-wm-ball") {
                // Kick logic for soccer ball
                const kickRadius = 60;
                const mouseSpeed = Math.hypot(mouse.vx, mouse.vy);
                if (dist < kickRadius && mouseSpeed > 1.5) {
                  if (modeRef.current === "ordnung") {
                    modeRef.current = "chaos";
                    isSnappingRef.current = false;
                    setTimeout(() => setMode("chaos"), 0);
                  }
                  item.vx += mouse.vx * 1.8;
                  item.vy += mouse.vy * 1.8;
                  item.angularVelocity += (mouse.vx - mouse.vy) * 0.4;
                  item.vz += (Math.random() - 0.5) * 6; // Pop into 3D space
                }
              } else if (!wmModeRef.current) {
                // Standard floaty repulsion ONLY when WM mode is inactive
                const repulsionRadius = 130;
                if (dist < repulsionRadius) {
                  const force = (repulsionRadius - dist) / repulsionRadius;
                  const pushX = (dx / (dist || 1)) * force * 1.6;
                  const pushY = (dy / (dist || 1)) * force * 1.6;

                  item.vx += pushX;
                  item.vy += pushY;
                  item.vz += (Math.random() - 0.5) * force * 4.5;
                  item.angularVelocity += (Math.random() - 0.5) * force * 2.5;
                }
              }
            }

            // Cap top speed to prevent extreme acceleration bugs
            const currentSpeed = Math.hypot(item.vx, item.vy);
            if (currentSpeed > maxSpeed) {
              item.vx = (item.vx / currentSpeed) * maxSpeed;
              item.vy = (item.vy / currentSpeed) * maxSpeed;
            }

            // Update position integration
            item.x += item.vx;
            item.y += item.vy;
            item.z += item.vz;
            item.angle += item.angularVelocity;
          }

          // Boundary bouncing off container edge limits
          const absX = item.baseX + item.x;
          const absY = item.baseY + item.y;
          const halfW = item.width / 2;
          const halfH = item.height / 2;

          // X border collisions
          if (absX - halfW < 0) {
            item.x = halfW - item.baseX;
            item.vx = -item.vx * boundaryBounce;
            item.angularVelocity += (Math.random() - 0.5) * 1.5;
          } else if (absX + halfW > containerWidth) {
            item.x = containerWidth - item.baseX - halfW;
            item.vx = -item.vx * boundaryBounce;
            item.angularVelocity += (Math.random() - 0.5) * 1.5;
          }

          // Y border collisions
          if (absY - halfH < 0) {
            item.y = halfH - item.baseY;
            item.vy = -item.vy * boundaryBounce;
            item.angularVelocity += (Math.random() - 0.5) * 1.5;
          } else if (absY + halfH > containerHeight) {
            item.y = containerHeight - item.baseY - halfH;
            item.vy = -item.vy * boundaryBounce;
            item.angularVelocity += (Math.random() - 0.5) * 1.5;
          }

          // Z depth boundary limits
          if (item.z < -180) {
            item.z = -180;
            item.vz = -item.vz * 0.5;
          } else if (item.z > 180) {
            item.z = 180;
            item.vz = -item.vz * 0.5;
          }
        }

      // 2. Circle-collision checks between floating components in Chaos Mode
      if (!isSnapping) {
        for (let i = 0; i < items.length; i++) {
          const a = items[i];
          const radiusA = (a.width + a.height) / 4.4; // average radius approximation

          for (let j = i + 1; j < items.length; j++) {
            const b = items[j];
            const radiusB = (b.width + b.height) / 4.4;

            const ax = a.baseX + a.x;
            const ay = a.baseY + a.y;
            const bx = b.baseX + b.x;
            const by = b.baseY + b.y;

            const dx = bx - ax;
            const dy = by - ay;
            const dist = Math.hypot(dx, dy);
            const minDist = radiusA + radiusB;

            if (dist < minDist) {
              localCollisionCount++;
              
              // Resolve overlapping contact point (push apart)
              const overlap = minDist - dist;
              const nx = dx / (dist || 1);
              const ny = dy / (dist || 1);
              
              const totalMass = a.mass + b.mass;
              const ratioA = b.mass / totalMass;
              const ratioB = a.mass / totalMass;

              // Do not displace elements if one is being dragged by user
              if (a.id !== activeDragId) {
                a.x -= nx * overlap * ratioA * 0.65;
                a.y -= ny * overlap * ratioA * 0.65;
              }
              if (b.id !== activeDragId) {
                b.x += nx * overlap * ratioB * 0.65;
                b.y += ny * overlap * ratioB * 0.65;
              }

              // Elastic impulse resolution for velocities
              const kx = a.vx - b.vx;
              const ky = a.vy - b.vy;
              const relativeNormalVel = kx * nx + ky * ny;

              // Only bounce if they are moving towards each other
              if (relativeNormalVel > 0) {
                const elasticity = 0.55;
                const impulseMag = ((1 + elasticity) * relativeNormalVel) / totalMass;
                
                if (a.id !== activeDragId) {
                  a.vx -= impulseMag * b.mass * nx;
                  a.vy -= impulseMag * b.mass * ny;
                  a.angularVelocity += (Math.random() - 0.5) * 1.2;
                }
                if (b.id !== activeDragId) {
                  b.vx += impulseMag * a.mass * nx;
                  b.vy += impulseMag * a.mass * ny;
                  b.angularVelocity += (Math.random() - 0.5) * 1.2;
                }
              }
            }
          }
        }
      }

      setEngineStats(prev => ({ ...prev, collisions: localCollisionCount }));

      // 3. Render and apply styles to DOM nodes directly for maximum frame rates
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const el = refsMap.current[item.id];
        if (el) {
          const scale = 1 + item.z / 650;
          // Apply depth blur (blur filters when items go deep in Z-axis)
          const blur = Math.max(0, -item.z / 40); // 2.5px blur at Z = -100
          const opacity = Math.max(0.2, Math.min(1.0, 1 + item.z / 280));

          const suffix = item.type === "badge" ? " translate(-50%, -50%)" : "";
          el.style.transform = `translate3d(${item.x}px, ${item.y}px, ${item.z}px) rotate(${item.angle}deg) scale(${scale})${suffix}`;
          el.style.filter = blur > 0.5 ? `blur(${blur}px)` : "none";
          el.style.opacity = String(opacity);
          
          // Layer index so closer elements render on top of deep ones
          el.style.zIndex = String(Math.round(100 + item.z));
          el.style.transformStyle = "preserve-3d";
        }
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Pointer position tracking inside container
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    
    // Track cursor coordinates relative to parent container
    mousePosRef.current.rawX = e.clientX - rect.left;
    mousePosRef.current.rawY = e.clientY - rect.top;
  };

  const handlePointerLeave = () => {
    mousePosRef.current.rawX = -1000;
    mousePosRef.current.rawY = -1000;
    
    // Release active drag item on exit
    if (activeDragIdRef.current) {
      activeDragIdRef.current = null;
    }
  };

  // Dragging event handlers
  const handleDragStart = (e: React.PointerEvent<HTMLOrSVGElement>, id: string) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const item = itemsRef.current.find(item => item.id === id);
    if (!item) return;

    // Prevent snapping back mid-drag
    if (mode === "ordnung") {
      if (!wmModeRef.current || id === "badge-wm-ball") {
        setMode("chaos");
      }
    }

    activeDragIdRef.current = id;
    item.isDragging = true;

    // Save click offset point relative to the element center to prevent visual jumping
    dragOffsetRef.current = {
      x: mouseX - (item.baseX + item.x),
      y: mouseY - (item.baseY + item.y)
    };

    // Grab pointer capture so drag works even if pointer wanders outside element limits
    const el = refsMap.current[id];
    if (el) {
      el.setPointerCapture(e.pointerId);
    }
    
    e.stopPropagation();
  };

  const handleDragEnd = (e: React.PointerEvent<HTMLOrSVGElement>, id: string) => {
    if (activeDragIdRef.current === id) {
      activeDragIdRef.current = null;
      const item = itemsRef.current.find(item => item.id === id);
      if (item) {
        item.isDragging = false;
      }
    }
    
    const el = refsMap.current[id];
    if (el) {
      el.releasePointerCapture(e.pointerId);
    }
  };

  // Impulse button triggers big explosion force outwards
  const triggerImpulse = () => {
    setMode("chaos");
    itemsRef.current.forEach((item) => {
      // Direct high velocity bursts
      item.vx = (Math.random() - 0.5) * 25;
      item.vy = (Math.random() - 0.5) * 25;
      item.vz = (Math.random() - 0.5) * 15;
      item.angularVelocity = (Math.random() - 0.5) * 12;
    });
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative w-full min-h-[90vh] flex flex-col justify-center items-center overflow-hidden [perspective:1200px]"
    >
      {/* Background radial accent glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-radial-accent pointer-events-none -z-10 opacity-50" />

      {/* Stadium Pitch markings when WM mode is active */}
      {wmMode && (
        <div className="absolute inset-0 pointer-events-none -z-20 opacity-30 select-none transition-opacity duration-500">
          <svg className="w-full h-full fill-none" stroke="#00F0FF" strokeWidth="1.2" strokeOpacity="0.08" xmlns="http://www.w3.org/2000/svg">
            {/* Outer boundary line */}
            <rect x="3%" y="3%" width="94%" height="94%" rx="24" />
            
            {/* Center line */}
            <line x1="50%" y1="3%" x2="50%" y2="97%" />
            
            {/* Center Circle */}
            <circle cx="50%" cy="50%" r="90" />
            <circle cx="50%" cy="50%" r="5" fill="#00F0FF" fillOpacity="0.15" />
            
            {/* Left Penalty Area */}
            <rect x="3%" y="22%" width="14%" height="56%" />
            <rect x="3%" y="33%" width="5%" height="34%" />
            <path d="M 17% 42% A 70 70 0 0 1 17% 58%" />
            
            {/* Right Penalty Area */}
            <rect x="83%" y="22%" width="14%" height="56%" />
            <rect x="92%" y="33%" width="5%" height="34%" />
            <path d="M 83% 42% A 70 70 0 0 0 83% 58%" />
          </svg>
        </div>
      )}

      {/* Main Responsive Grid Container */}
      <div className="max-w-6xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 pt-24 pb-16 z-10 px-4">
        
        {/* Left Column: Floating Typography & Bio */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-start select-none">
          
          {/* Tagline Badge */}
          <div
            id="tagline"
            ref={(el) => { refsMap.current["tagline"] = el; }}
            onPointerDown={(e) => handleDragStart(e, "tagline")}
            onPointerUp={(e) => handleDragEnd(e, "tagline")}
            className="inline-block px-3.5 py-1.5 rounded-full bg-[#00F0FF]/5 border border-[#00F0FF]/15 text-xs font-mono font-bold tracking-widest uppercase text-[#00F0FF] cursor-grab active:cursor-grabbing hover:border-[#00F0FF]/40 transition-colors select-none mb-6 touch-none"
          >
            {t("heroTagline")}
          </div>

          {/* Headline (Words split into physical spans) */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-display tracking-tight text-white leading-[1.12] mb-6 flex flex-wrap justify-center lg:justify-start gap-x-3 gap-y-1 sm:gap-y-2 select-none touch-none">
            {headlineWordObjects.map((word) => {
              const isHighlight = word.type === "highlight";
              return (
                <span
                  key={word.id}
                  id={word.id}
                  ref={(el) => { refsMap.current[word.id] = el; }}
                  onPointerDown={(e) => handleDragStart(e, word.id)}
                  onPointerUp={(e) => handleDragEnd(e, word.id)}
                  className={`inline-block cursor-grab active:cursor-grabbing select-none ${
                    isHighlight
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-indigo-400 font-extrabold"
                      : "text-white font-black"
                  } hover:text-[#00F0FF] transition-colors duration-150`}
                >
                  {word.text}
                </span>
              );
            })}
          </h1>

          {/* Subline Bio Paragraph */}
          <div
            id="subline"
            ref={(el) => { refsMap.current["subline"] = el; }}
            onPointerDown={(e) => handleDragStart(e, "subline")}
            onPointerUp={(e) => handleDragEnd(e, "subline")}
            className="text-slate-400 text-sm md:text-base leading-relaxed max-w-xl cursor-grab active:cursor-grabbing hover:text-slate-300 transition-colors select-none mb-8 touch-none"
          >
            {t("heroSubline")}
          </div>

          {/* CTAs (Anchored static trigger points) */}
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <button
              onMouseEnter={() => setIsHoveringCTA(true)}
              onMouseLeave={() => setIsHoveringCTA(false)}
              onClick={() => handleScroll("projects")}
              className="px-7 py-3.5 rounded-lg bg-[#00F0FF] hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(0,240,255,0.25)] hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] cursor-pointer active:scale-95 z-30"
            >
              {t("heroCtaWork")}
            </button>
            <button
              onMouseEnter={() => setIsHoveringCTA(true)}
              onMouseLeave={() => setIsHoveringCTA(false)}
              onClick={() => handleScroll("contact")}
              className="px-7 py-3.5 rounded-lg bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer active:scale-95 z-30"
            >
              {t("heroCtaBuild")}
            </button>
          </div>
        </div>

        {/* Right Column: Floating Picture Card Frame */}
        <div className="flex-shrink-0 flex items-center justify-center w-full max-w-sm lg:max-w-none lg:w-auto relative">
          <div
            id="portrait-card"
            ref={(el) => { refsMap.current["portrait-card"] = el; }}
            onPointerDown={(e) => handleDragStart(e, "portrait-card")}
            onPointerUp={(e) => handleDragEnd(e, "portrait-card")}
            className="relative w-[280px] h-[360px] md:w-[320px] md:h-[400px] select-none cursor-grab active:cursor-grabbing touch-none rounded-3xl overflow-hidden shadow-2xl"
          >
            {/* Card Content Shell */}
            <div className="w-full h-full rounded-3xl border border-[#00F0FF]/15 bg-slate-950/40 backdrop-blur-md p-4 relative flex flex-col items-center justify-center pointer-events-none">
              
              {/* Image slot */}
              <div className="w-full h-full rounded-2xl overflow-hidden relative border border-slate-800 bg-slate-900/50 flex flex-col items-center justify-center">
                {imgExists ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src="/samsoun.jpg" 
                      alt="Samsoun Behaein"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-[10px] font-bold font-mono text-[#00F0FF] tracking-wider uppercase bg-slate-950/80 px-2 py-0.5 rounded border border-[#00F0FF]/20">
                      <Sparkles className="w-3 h-3 text-[#00F0FF]" /> Samsoun Behaein
                    </div>
                  </>
                ) : (
                  /* Fallback Mock Avatar */
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative">
                    <div className="w-24 h-24 rounded-full border border-[#00F0FF]/20 flex items-center justify-center relative mb-4 shadow-[0_0_20px_rgba(0,240,255,0.05)]">
                      <div className="absolute inset-1 rounded-full border border-dashed border-[#00F0FF]/10 animate-spin-slow" />
                      <User className="w-10 h-10 text-[#00F0FF]/60" />
                    </div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider font-display">Samsoun Behaein</h4>
                    <p className="text-[10px] text-slate-500 mt-1 font-mono uppercase tracking-widest text-[#00F0FF]/80">CREATIVE TECHNOLOGIST</p>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1 text-[8px] font-bold text-[#00F0FF]/60 uppercase font-mono bg-slate-950/50 px-2 py-0.5 rounded">
                      <Cpu className="w-2.5 h-2.5" /> Core Simulator Active
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Render distributed background badges with CSS percentage coordinates */}
      {techBadges.map((badge) => {
        const anchor = badgeLayoutAnchors[badge.id] || { xPct: 0.5, yPct: 0.5 };
        const xPct = isRtl ? 1 - anchor.xPct : anchor.xPct;
        
        if ('imageUrl' in badge) {
          const isBall = badge.id === "badge-wm-ball";
          const isFlag = badge.id.startsWith("flag-");
          
          let dimsClass = "";
          if (isBall) {
            dimsClass = "w-[64px] h-[64px] md:w-[72px] md:h-[72px]";
          } else if (isFlag) {
            dimsClass = "w-[36px] h-[36px] md:w-[42px] md:h-[42px]";
          } else {
            dimsClass = "w-[80px] h-[100px] md:w-[90px] md:h-[110px]";
          }
          return (
            <div
              key={badge.id}
              id={badge.id}
              ref={(el) => { refsMap.current[badge.id] = el; }}
              onPointerDown={(e) => handleDragStart(e, badge.id)}
              onPointerUp={(e) => handleDragEnd(e, badge.id)}
              style={{
                left: `${xPct * 100}%`,
                top: `${anchor.yPct * 100}%`,
                transform: `translate(-50%, -50%)`,
              }}
              className={`absolute cursor-grab active:cursor-grabbing select-none z-20 touch-none ${dimsClass} ${
                isFlag ? "rounded-full overflow-hidden border border-[#00F0FF]/30 shadow-[0_0_12px_rgba(0,240,255,0.15)] bg-slate-950" : ""
              }`}
            >
              {/* Pulsing indicator & tooltip helper for the ball to invite mouse touch */}
              {isBall && mode === "ordnung" && (
                <>
                  <div className="absolute inset-0 rounded-full bg-[#00F0FF]/25 animate-ping pointer-events-none -z-10" />
                  <div className="absolute inset-[-4px] rounded-full border border-[#00F0FF]/30 animate-pulse pointer-events-none -z-10" />
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-slate-950/90 border border-[#00F0FF]/30 text-[9px] font-mono text-[#00F0FF] whitespace-nowrap tracking-wider pointer-events-none shadow-md uppercase flex items-center gap-1 select-none animate-bounce">
                    <span>⚽</span>
                    {locale === "fa" ? "شوت کن!" : locale === "de" ? "Kick mich!" : "Kick me!"}
                  </div>
                </>
              )}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={badge.imageUrl}
                alt={badge.label}
                className={`w-full h-full pointer-events-none ${isFlag ? "object-cover" : "object-contain"}`}
              />
            </div>
          );
        }

        return (
          <div
            key={badge.id}
            id={badge.id}
            ref={(el) => { refsMap.current[badge.id] = el; }}
            onPointerDown={(e) => handleDragStart(e, badge.id)}
            onPointerUp={(e) => handleDragEnd(e, badge.id)}
            style={{
              left: `${xPct * 100}%`,
              top: `${anchor.yPct * 100}%`,
              transform: `translate(-50%, -50%)`,
            }}
            className="absolute px-3.5 py-1.5 rounded-full glass-panel border border-[#00F0FF]/15 text-xs font-mono font-bold text-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.06)] cursor-grab active:cursor-grabbing select-none hover:border-[#00F0FF]/40 transition-colors z-20 touch-none"
          >
            {badge.label}
          </div>
        );
      })}

      {/* Control Console (Ordnung, Chaos & Explosion) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 max-w-[90%] md:max-w-md w-full">
        <div className="glass-panel w-full px-4 py-3 rounded-2xl border border-white/5 bg-slate-950/90 backdrop-blur-md flex flex-col md:flex-row justify-between items-center gap-3 shadow-xl">
          
          {/* Status Monitor */}
          <div className="flex flex-col text-[8px] md:text-[9px] font-mono text-slate-500 gap-0.5 tracking-wider select-none text-center md:text-start leading-none uppercase">
            <div>PLAYGROUND_ENGINE: <span className={mode === "chaos" ? "text-amber-500" : "text-emerald-500"}>{mode === "chaos" ? "CHAOS_DRIFT" : "GRID_LOCK"}</span></div>
            <div>PERFORMANCE: <span className="text-[#00F0FF]">{engineStats.fps} FPS</span> | COLS: <span className="text-pink-500">{engineStats.collisions}</span></div>
          </div>

          {/* Interactive buttons */}
          <div className="flex gap-1.5 md:gap-2 flex-wrap justify-center">
            
            {/* WM Mode switch */}
            <button
              onClick={() => setWmMode(prev => !prev)}
              className={`px-2.5 py-1.5 rounded-lg border text-[10px] font-mono font-bold uppercase tracking-wider cursor-pointer active:scale-[0.97] transition-all flex items-center gap-1 ${
                wmMode
                  ? "border-indigo-500/30 bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20"
                  : "border-slate-800 bg-slate-900/50 text-slate-400 hover:bg-slate-800"
              }`}
            >
              <span>🏆</span>
              {locale === "fa" ? "جام جهانی" : locale === "de" ? "WM 2026" : "WC 2026"}
            </button>

            {/* Mode switch */}
            <button
              onClick={() => setMode(prev => prev === "chaos" ? "ordnung" : "chaos")}
              className={`px-2.5 py-1.5 rounded-lg border text-[10px] font-mono font-bold uppercase tracking-wider cursor-pointer active:scale-[0.97] transition-all flex items-center gap-1 ${
                mode === "chaos"
                  ? "border-amber-500/30 bg-amber-500/10 text-amber-500"
                  : "border-emerald-500/30 bg-emerald-500/10 text-emerald-500"
              }`}
            >
              {mode === "chaos" ? (
                <>
                  <Grid className="w-3.5 h-3.5" />
                  {locale === "fa" ? "قفل شبکه" : locale === "de" ? "Ausrichten" : "Grid Lock"}
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  {locale === "fa" ? "حالت آشوب" : locale === "de" ? "Chaos-Modus" : "Chaos Mode"}
                </>
              )}
            </button>

            {/* Impulse trigger */}
            <button
              onClick={triggerImpulse}
              className="px-2.5 py-1.5 rounded-lg border border-pink-500/30 bg-pink-500/10 text-pink-500 hover:bg-pink-500/20 text-[10px] font-mono font-bold uppercase tracking-wider cursor-pointer active:scale-[0.97] transition-all flex items-center gap-1"
            >
              <Zap className="w-3.5 h-3.5" />
              {locale === "fa" ? "شلیک" : locale === "de" ? "Impuls" : "Burst"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
