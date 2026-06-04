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
  "badge-wm-ball": { xPct: 0.75, yPct: 0.72, zOffset: 0 },
  "badge-wm-trophy": { xPct: 0.88, yPct: 0.24, zOffset: -60 },
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

  // Shootout Mini-Game States
  const [shootState, setShootState] = useState<"idle" | "goal" | "miss">("idle");
  const shootStateRef = useRef<"idle" | "goal" | "miss">("idle");
  const ballWasKickedRef = useRef<boolean>(false);
  const [confetti, setConfetti] = useState<{ id: number; x: number; y: number; color: string; angle: number; size: number; delay: number }[]>([]);

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
    const processItem = (id: string, type: PhysicsItem["type"], mass: number, label?: string, defaultZ = 0) => {
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
        z: existing ? existing.z : defaultZ,
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
        targetZ: defaultZ,
      });
    };

    // 1. Process standard text & portrait content elements
    processItem("tagline", "tagline", 1.8);
    headlineWordObjects.forEach((word) => {
      processItem(word.id, "word", 1.0, word.text);
    });
    processItem("subline", "subline", 3.5);
    processItem("portrait-card", "portrait", 6.0);

    if (wmMode) {
      processItem("badge-wm-ball", "badge", 2.4, "WM Ball", 0);
      processItem("badge-wm-trophy", "badge", 3.5, "WM Trophy", -60);
    }

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
        mass: 1.2,
        isDragging: existing ? existing.isDragging : false,
        label: badge.label,
        targetZ: anchor.zOffset,
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

        // Determine if this specific item should snap to its grid position
        const itemShouldSnap = wmModeRef.current
          ? (item.id !== "badge-wm-ball") || isSnapping
          : isSnapping;

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
        } else if (itemShouldSnap) {
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

                  ballWasKickedRef.current = true;
                  shootStateRef.current = "idle";
                  setTimeout(() => setShootState("idle"), 0);
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

          let minX = 0;
          let maxX = containerWidth;
          let minY = 0;
          let maxY = containerHeight;

          if (wmModeRef.current && (item.id === "badge-wm-ball" || item.id === "badge-wm-trophy" || item.id === "portrait-card")) {
            if (containerWidth >= 1024) {
              // Desktop: Restrict game elements to the right column area
              minX = containerWidth * 0.45;
            } else {
              // Mobile/Tablet: Restrict game elements to the bottom column area
              minY = containerHeight * 0.42;
            }
          }

          // X border collisions
          if (absX - halfW < minX) {
            item.x = minX + halfW - item.baseX;
            item.vx = -item.vx * boundaryBounce;
            item.angularVelocity += (Math.random() - 0.5) * 1.5;
          } else if (absX + halfW > maxX) {
            item.x = maxX - item.baseX - halfW;
            item.vx = -item.vx * boundaryBounce;
            item.angularVelocity += (Math.random() - 0.5) * 1.5;
          }

          // Y border collisions
          if (absY - halfH < minY) {
            item.y = minY + halfH - item.baseY;
            item.vy = -item.vy * boundaryBounce;
            item.angularVelocity += (Math.random() - 0.5) * 1.5;
          } else if (absY + halfH > maxY) {
            item.y = maxY - item.baseY - halfH;
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

      // Goal Shooter Mini-Game Logic
      if (wmModeRef.current && shootStateRef.current === "idle" && ballWasKickedRef.current) {
        const ball = items.find(item => item.id === "badge-wm-ball");
        const goal = items.find(item => item.id === "portrait-card");

        if (ball && goal) {
          const ballX = ball.baseX + ball.x;
          const ballY = ball.baseY + ball.y;
          const goalX = goal.baseX + goal.x;
          const goalY = goal.baseY + goal.y;

          const ballSpeed = Math.hypot(ball.vx, ball.vy);

          // Goal posts and crossbar positioning relative to goal center
          const leftPostX = goalX - goal.width * 0.42;
          const rightPostX = goalX + goal.width * 0.42;
          const crossbarY = goalY - goal.height * 0.42;

          // 1. Goalpost and Crossbar Bouncing Physics
          const postThickness = 16;
          const distToLeftPost = Math.hypot(ballX - leftPostX, ballY - crossbarY);
          const distToRightPost = Math.hypot(ballX - rightPostX, ballY - crossbarY);

          if (distToLeftPost < postThickness + 24) {
            // Bounce off left post (elastic bounce back)
            ball.vx = -Math.abs(ball.vx) * 0.85;
            ball.vy = -ball.vy * 0.75 + (Math.random() - 0.5) * 3;
            ball.angularVelocity = (Math.random() - 0.5) * 15;
            ball.vz = 4 + Math.random() * 3; // pop up
          } else if (distToRightPost < postThickness + 24) {
            // Bounce off right post
            ball.vx = Math.abs(ball.vx) * 0.85;
            ball.vy = -ball.vy * 0.75 + (Math.random() - 0.5) * 3;
            ball.angularVelocity = (Math.random() - 0.5) * 15;
            ball.vz = 4 + Math.random() * 3;
          } else if (ballX > leftPostX && ballX < rightPostX && Math.abs(ballY - crossbarY) < 18) {
            // Bounce off crossbar
            ball.vy = Math.abs(ball.vy) * 0.8; // bounce downwards
            ball.vx += (Math.random() - 0.5) * 4;
            ball.angularVelocity = (Math.random() - 0.5) * 15;
            ball.vz = 3 + Math.random() * 3;
          }
          // 2. Goal scoring detection (ball is inside the posts and below the crossbar)
          else if (ballX > leftPostX + 15 && ballX < rightPostX - 15 && ballY < goalY + goal.height * 0.2 && ballY > crossbarY) {
            shootStateRef.current = "goal";
            setTimeout(() => setShootState("goal"), 0);

            // Goal Net Bulging Animation:
            // Dampen ball velocity to simulate hitting the net mesh
            ball.vx = ball.vx * 0.1;
            ball.vy = ball.vy * 0.1;
            // Pull the ball towards the center depth of the goal net
            ball.x = goalX - ball.baseX;
            ball.y = goalY - ball.baseY - goal.height * 0.05;
            ball.z = -120; // stretch net backwards in 3D depth!
            ball.angularVelocity = ball.angularVelocity * 0.15;

            // Reset ball after 3.5 seconds
            setTimeout(() => {
              ball.x = 0; ball.y = 0; ball.z = 0;
              ball.vx = 0; ball.vy = 0; ball.vz = 0;
              ball.angle = 0; ball.angularVelocity = 0;
              
              ballWasKickedRef.current = false;
              shootStateRef.current = "idle";
              setTimeout(() => setShootState("idle"), 0);
              setTimeout(() => setMode("ordnung"), 0);
            }, 3500);
          } else {
            // 3. Check for miss conditions
            const flewOverCrossbar = ballY < crossbarY - 20;
            const wentWideLeft = ballX < leftPostX - 35;
            const wentWideRight = ballX > rightPostX + 35;
            const stoppedMoving = ballSpeed < 0.25 && ballY > goalY + goal.height * 0.2;

            if (flewOverCrossbar || wentWideLeft || wentWideRight || stoppedMoving) {
              shootStateRef.current = "miss";
              setTimeout(() => setShootState("miss"), 0);

              // Reset ball after 3.5 seconds
              setTimeout(() => {
                ball.x = 0; ball.y = 0; ball.z = 0;
                ball.vx = 0; ball.vy = 0; ball.vz = 0;
                ball.angle = 0; ball.angularVelocity = 0;

                ballWasKickedRef.current = false;
                shootStateRef.current = "idle";
                setTimeout(() => setShootState("idle"), 0);
                setTimeout(() => setMode("ordnung"), 0);
              }, 3500);
            }
          }
        }
      } // 2. Circle-collision checks between floating components in Chaos Mode
      if (!isSnapping) {
        for (let i = 0; i < items.length; i++) {
          const a = items[i];
          const radiusA = (a.width + a.height) / 4.4; // average radius approximation

          for (let j = i + 1; j < items.length; j++) {
            const b = items[j];
            
            if (wmModeRef.current) {
              // In WM mode, only game elements (ball, trophy, goal) can collide with each other
              const isGameA = a.id === "badge-wm-ball" || a.id === "badge-wm-trophy" || a.id === "portrait-card";
              const isGameB = b.id === "badge-wm-ball" || b.id === "badge-wm-trophy" || b.id === "portrait-card";
              if (!isGameA || !isGameB) {
                continue;
              }
              // Skip giant circle collisions between the ball/trophy and the goal (portrait-card)
              // so the ball can actually go inside the net and trigger scoring correctly.
              const isGoalCollision = a.id === "portrait-card" || b.id === "portrait-card";
              if (isGoalCollision) {
                continue;
              }
            }

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

          let shakeX = 0;
          let shakeY = 0;
          if (item.id === "portrait-card" && shootStateRef.current === "goal") {
            const timeMs = performance.now();
            shakeX = Math.sin(timeMs * 0.08) * 5;
            shakeY = Math.cos(timeMs * 0.08) * 4;
          } else if (item.id === "badge-wm-trophy" && shootStateRef.current === "goal") {
            const timeMs = performance.now();
            shakeY = -Math.abs(Math.sin(timeMs * 0.015)) * 18;
          }

          const suffix = item.type === "badge" ? " translate(-50%, -50%)" : "";
          el.style.transform = `translate3d(${item.x + shakeX}px, ${item.y + shakeY}px, ${item.z}px) rotate(${item.angle}deg) scale(${scale})${suffix}`;
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
        if (id === "badge-wm-ball") {
          ballWasKickedRef.current = true;
          shootStateRef.current = "idle";
          setShootState("idle");
        }
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
      if (wmModeRef.current) {
        // Only game elements explode in WM mode
        const isGame = item.id === "badge-wm-ball" || item.id === "badge-wm-trophy" || item.id === "portrait-card";
        if (!isGame) return;
      }
      // Direct high velocity bursts
      item.vx = (Math.random() - 0.5) * 25;
      item.vy = (Math.random() - 0.5) * 25;
      item.vz = (Math.random() - 0.5) * 15;
      item.angularVelocity = (Math.random() - 0.5) * 12;
    });
  };

  useEffect(() => {
    if (shootState === "goal") {
      const colors = ["#00F0FF", "#818CF8", "#F472B6", "#FBBF24", "#34D399"];
      const newConfetti = Array.from({ length: 80 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: -10 - Math.random() * 20,
        color: colors[Math.floor(Math.random() * colors.length)],
        angle: Math.random() * 360,
        size: 6 + Math.random() * 8,
        delay: Math.random() * 0.6,
      }));
      setConfetti(newConfetti);
    } else {
      setConfetti([]);
    }
  }, [shootState]);

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative w-full min-h-[90vh] flex flex-col justify-center items-center overflow-hidden [perspective:1200px]"
    >
      <style>{`
        @keyframes fall {
          0% { transform: translateY(0px) rotate(0deg); opacity: 0.9; }
          100% { transform: translateY(105vh) rotate(720deg); opacity: 0; }
        }
        @keyframes scaleUp {
          0% { transform: scale(0.9) translate(-50%, -50%); opacity: 0; }
          100% { transform: scale(1) translate(-50%, -50%); opacity: 1; }
        }
        @keyframes overlayFadeIn {
          0% { opacity: 0; backdrop-filter: blur(0px); }
          100% { opacity: 1; backdrop-filter: blur(12px); }
        }
        @keyframes trophyZoom {
          0% { transform: scale(0.2) rotate(-20deg); }
          60% { transform: scale(1.15) rotate(5deg); }
          80% { transform: scale(0.97) rotate(0deg); }
          100% { transform: scale(1.0) translateY(-6px); }
        }
      `}</style>

      {/* Confetti Overlay */}
      {shootState === "goal" && confetti.map((p) => (
        <div
          key={p.id}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            backgroundColor: p.color,
            width: `${p.size}px`,
            height: `${p.size * 1.5}px`,
            transform: `rotate(${p.angle}deg)`,
            animation: `fall 3s linear infinite`,
            animationDelay: `${p.delay}s`,
            zIndex: 100,
          }}
          className="absolute rounded-sm pointer-events-none opacity-90"
        />
      ))}

      {/* Goal Fullscreen Celebration Overlay */}
      {shootState === "goal" && (
        <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex flex-col items-center justify-center pointer-events-none select-none text-center animate-[overlayFadeIn_0.4s_ease-out_forwards]">
          {/* Glowing background aura */}
          <div className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-gradient-to-r from-amber-500/25 to-yellow-500/20 blur-[80px] pointer-events-none -z-10 animate-pulse" />

          {/* Giant Trophy */}
          <div className="relative w-[180px] h-[220px] md:w-[280px] md:h-[350px] mb-8 animate-[trophyZoom_1.4s_cubic-bezier(0.34,1.56,0.64,1)_forwards]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/wm_trophy.png" 
              alt="WM Trophy"
              className="w-full h-full object-contain filter drop-shadow-[0_0_40px_rgba(251,191,36,0.6)]"
            />
          </div>

          {/* Text */}
          <h2 className="text-4xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 tracking-wider uppercase filter drop-shadow-[0_0_20px_rgba(251,191,36,0.3)] mb-4 px-4 leading-none">
            {locale === "fa" ? "قهرمان جهان! 🏆⚽" : locale === "de" ? "WELTMEISTERLICHER SCHUSS! 🏆⚽" : "WORLD CHAMPION SHOT! 🏆⚽"}
          </h2>
          <p className="text-slate-300 text-xs md:text-sm font-mono uppercase tracking-widest bg-amber-500/10 border border-amber-500/20 px-6 py-2 rounded-full backdrop-blur-sm shadow-[0_0_15px_rgba(245,158,11,0.15)] mx-4">
            {locale === "fa" 
              ? "جام جهانی ۲۰۲۶ در دستان شماست!" 
              : locale === "de" 
                ? "Du hast den goldenen Pokal erobert!" 
                : "You have captured the golden World Cup!"}
          </p>
        </div>
      )}


      {/* Background radial accent glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-radial-accent pointer-events-none -z-10 opacity-50" />

      {/* Main Responsive Grid Container */}
      <div className="max-w-6xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 pt-24 pb-16 z-10 px-4">
        
        {/* Left Column: Floating Typography & Bio */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-start select-none">
          
          {/* Tagline Badge */}
          <div
            id="tagline"
            ref={(el) => { refsMap.current["tagline"] = el; }}
            onPointerDown={wmMode ? undefined : (e) => handleDragStart(e, "tagline")}
            onPointerUp={wmMode ? undefined : (e) => handleDragEnd(e, "tagline")}
            className={`inline-block px-3.5 py-1.5 rounded-full bg-[#00F0FF]/5 border border-[#00F0FF]/15 text-xs font-mono font-bold tracking-widest uppercase text-[#00F0FF] transition-colors select-none mb-6 touch-none ${
              wmMode ? "pointer-events-none" : "cursor-grab active:cursor-grabbing hover:border-[#00F0FF]/40"
            }`}
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
                  onPointerDown={wmMode ? undefined : (e) => handleDragStart(e, word.id)}
                  onPointerUp={wmMode ? undefined : (e) => handleDragEnd(e, word.id)}
                  className={`inline-block select-none ${
                    isHighlight
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-indigo-400 font-extrabold"
                      : "text-white font-black"
                  } ${
                    wmMode ? "pointer-events-none" : "cursor-grab active:cursor-grabbing hover:text-[#00F0FF] transition-colors duration-150"
                  }`}
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
            onPointerDown={wmMode ? undefined : (e) => handleDragStart(e, "subline")}
            onPointerUp={wmMode ? undefined : (e) => handleDragEnd(e, "subline")}
            className={`text-slate-400 text-sm md:text-base leading-relaxed max-w-xl select-none mb-8 touch-none ${
              wmMode ? "pointer-events-none" : "cursor-grab active:cursor-grabbing hover:text-slate-300 transition-colors"
            }`}
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

        {/* Right Column: Floating Picture Card Frame / Soccer Goal */}
        <div className="flex-shrink-0 flex items-center justify-center w-full max-w-sm lg:max-w-none lg:w-auto relative [transform-style:preserve-3d]">
          {/* Miss Feedback Overlay (placed above the goal) */}
          {shootState === "miss" && (
            <div className="absolute top-[-75px] md:top-[-95px] left-1/2 -translate-x-1/2 z-30 pointer-events-none select-none text-center animate-[scaleUp_0.2s_ease-out_forwards] whitespace-nowrap">
              <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-red-500 tracking-wider uppercase filter drop-shadow-[0_0_15px_rgba(239,68,68,0.25)]">
                {locale === "fa" ? "خطا! 🔄" : locale === "de" ? "Knapp vorbei! 🔄" : "Missed! 🔄"}
              </h2>
              <p className="text-slate-400 text-[9px] md:text-[10px] font-mono uppercase tracking-widest mt-1 bg-slate-950/80 px-3 py-1 rounded-full border border-red-500/20 backdrop-blur-sm inline-block">
                {locale === "fa" ? "دوباره تلاش کن!" : locale === "de" ? "Nochmal versuchen!" : "Try again!"}
              </p>
            </div>
          )}
          <div
            id="portrait-card"
            ref={(el) => { refsMap.current["portrait-card"] = el; }}
            onPointerDown={wmMode ? undefined : (e) => handleDragStart(e, "portrait-card")}
            onPointerUp={wmMode ? undefined : (e) => handleDragEnd(e, "portrait-card")}
            className={`relative select-none touch-none transition-all ${
              wmMode
                ? "w-[340px] h-[250px] md:w-[460px] md:h-[345px] filter drop-shadow-[0_0_25px_rgba(0,240,255,0.2)] pointer-events-none"
                : "w-[280px] h-[360px] md:w-[320px] md:h-[400px] rounded-3xl overflow-hidden shadow-2xl cursor-grab active:cursor-grabbing"
            }`}
          >
            {wmMode ? (
              /* Soccer Goal Net Slot */
              <div className="w-full h-full relative flex items-center justify-center pointer-events-none">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="/wm_goal.png" 
                  alt="WM Goal"
                  className={`w-full h-full object-contain transition-all duration-300 ${
                    shootState === "goal"
                      ? "filter drop-shadow-[0_0_35px_rgba(0,240,255,0.55)] scale-[1.01]"
                      : "filter drop-shadow-[0_0_20px_rgba(0,240,255,0.25)]"
                  }`}
                />
                {/* Goal post overlay indicator lights */}
                <div className="absolute top-[8%] left-[7%] w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse shadow-[0_0_8px_#00F0FF]" />
                <div className="absolute top-[8%] right-[7%] w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse shadow-[0_0_8px_#00F0FF]" />
              </div>
            ) : (
              /* Card Content Shell (Portrait Card) */
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
            )}
          </div>

          {/* Render WM Ball and Trophy here, relative to this column! */}
          {wmMode && (
            <>
              {/* Ball */}
              <div
                id="badge-wm-ball"
                ref={(el) => { refsMap.current["badge-wm-ball"] = el; }}
                onPointerDown={(e) => handleDragStart(e, "badge-wm-ball")}
                onPointerUp={(e) => handleDragEnd(e, "badge-wm-ball")}
                className="absolute w-[64px] h-[64px] md:w-[72px] md:h-[72px] cursor-grab active:cursor-grabbing select-none z-20 touch-none left-1/2 bottom-[-60px] md:bottom-[-80px] -translate-x-1/2 translate-y-1/2"
              >
                {/* Pulsing indicator & tooltip helper for the ball to invite mouse touch */}
                {mode === "ordnung" && (
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
                  src="/wm_ball.png"
                  alt="WM Ball"
                  className="w-full h-full object-contain pointer-events-none"
                />
              </div>

              {/* Trophy */}
              <div
                id="badge-wm-trophy"
                ref={(el) => { refsMap.current["badge-wm-trophy"] = el; }}
                className="absolute w-[80px] h-[100px] md:w-[90px] md:h-[110px] select-none z-20 touch-none pointer-events-none right-[-70px] md:right-[-90px] top-[10%] -translate-y-1/2"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/wm_trophy.png"
                  alt="WM Trophy"
                  className="w-full h-full object-contain pointer-events-none"
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Render distributed background badges with CSS percentage coordinates */}
      {techBadges.map((badge) => {
        const anchor = badgeLayoutAnchors[badge.id] || { xPct: 0.5, yPct: 0.5 };
        const xPct = isRtl ? 1 - anchor.xPct : anchor.xPct;

        return (
          <div
            key={badge.id}
            id={badge.id}
            ref={(el) => { refsMap.current[badge.id] = el; }}
            onPointerDown={wmMode ? undefined : (e) => handleDragStart(e, badge.id)}
            onPointerUp={wmMode ? undefined : (e) => handleDragEnd(e, badge.id)}
            style={{
              left: `${xPct * 100}%`,
              top: `${anchor.yPct * 100}%`,
              transform: `translate(-50%, -50%)`,
            }}
            className={`absolute px-3.5 py-1.5 rounded-full glass-panel border border-[#00F0FF]/15 text-xs font-mono font-bold text-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.06)] select-none transition-colors z-20 touch-none ${
              wmMode ? "pointer-events-none" : "cursor-grab active:cursor-grabbing hover:border-[#00F0FF]/40"
            }`}
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
