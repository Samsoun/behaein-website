"use client";

import React, { useRef, useEffect, useState, useCallback, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Smartphone, Layers, Database, ShieldCheck, Play } from "lucide-react";
import { useLanguage, getBulletsForLocale } from "@/context/LanguageContext";

const TOTAL_FRAMES = 90; // Optimized frame count for background GPU pre-decoding

interface Phase {
  id: number;
  icon: React.ReactNode;
  titleKey: "videoScrollPhase1Title" | "videoScrollPhase2Title" | "videoScrollPhase3Title" | "videoScrollPhase4Title";
  descKey: "videoScrollPhase1Desc" | "videoScrollPhase2Desc" | "videoScrollPhase3Desc" | "videoScrollPhase4Desc";
  bulletsKey: "videoScrollPhase1Bullets" | "videoScrollPhase2Bullets" | "videoScrollPhase3Bullets" | "videoScrollPhase4Bullets";
}

export const BarandeVideoScroll: React.FC = () => {
  const { locale, t, isRtl } = useLanguage();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isMounted, setIsMounted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [extractedFrames, setExtractedFrames] = useState<ImageBitmap[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  
  // Custom, bulletproof pinning engine states (independent of parent overflow-x hidden rules)
  const [pinState, setPinState] = useState<"before" | "sticky" | "after">("before");
  
  // Active phase index tracking for the floating glassmorphic information card
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);

  // Mobile Stories-style autoplay states & visibility observer tracking
  const [inView, setInView] = useState(false);
  const [autoplayProgress, setAutoplayProgress] = useState(0);
  const [autoplayKey, setAutoplayKey] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentFrameRef = useRef(0);

  const resetAutoplay = useCallback(() => {
    setAutoplayProgress(0);
    setAutoplayKey((k) => k + 1);
  }, []);

  const phases: Phase[] = useMemo(() => [
    {
      id: 0,
      icon: <Smartphone className="w-5 h-5 text-[#E6C17A]" />,
      titleKey: "videoScrollPhase1Title",
      descKey: "videoScrollPhase1Desc",
      bulletsKey: "videoScrollPhase1Bullets",
    },
    {
      id: 1,
      icon: <Layers className="w-5 h-5 text-[#E6C17A]" />,
      titleKey: "videoScrollPhase2Title",
      descKey: "videoScrollPhase2Desc",
      bulletsKey: "videoScrollPhase2Bullets",
    },
    {
      id: 2,
      icon: <Database className="w-5 h-5 text-[#E6C17A]" />,
      titleKey: "videoScrollPhase3Title",
      descKey: "videoScrollPhase3Desc",
      bulletsKey: "videoScrollPhase3Bullets",
    },
    {
      id: 3,
      icon: <ShieldCheck className="w-5 h-5 text-[#E6C17A]" />,
      titleKey: "videoScrollPhase4Title",
      descKey: "videoScrollPhase4Desc",
      bulletsKey: "videoScrollPhase4Bullets",
    },
  ], []);

  // Framer Motion useScroll for tracking this section's progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Apply a smooth spring to capture scroll inertia and prevent sudden jumps
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 24,
    restDelta: 0.0001,
  });

  // Map progress (0-1) directly to frame indices (0 to 89)
  const frameIndex = useTransform(smoothProgress, [0, 1], [0, TOTAL_FRAMES - 1]);

  // Map right scroll progress bar scale
  const progressScaleY = useTransform(smoothProgress, [0, 1], [0, 1]);

  // Fade out down arrow scroll helper after 8% scroll
  const scrollHelperOpacity = useTransform(smoothProgress, [0, 0.08], [0.65, 0]);

  // Monitor scroll progress to update custom pinning and active text index states
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (isMobile) {
      // Bypassed on mobile - mobile relies strictly on direct tap triggers, no pinning/scrolling changes
      return;
    }

    // 1. Update pinning state
    if (latest <= 0) {
      setPinState("before");
    } else if (latest >= 1) {
      setPinState("after");
    } else {
      setPinState("sticky");
    }

    // 2. Update active phase index dynamically based on scroll progression brackets
    let index = Math.floor(latest * 4);
    if (index < 0) index = 0;
    if (index > 3) index = 3;
    setActivePhaseIndex(index);
  });

  // Aspect-ratio cover drawing logic with a premium 15% zoom-out scale factor
  const drawFrame = useCallback((idx: number, frames: ImageBitmap[]) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const img = frames[idx];
    if (!img) return;

    const canvasW = canvas.width;
    const canvasH = canvas.height;
    const imgW = img.width;
    const imgH = img.height;

    // Standard cover calculation
    let scale = Math.max(canvasW / imgW, canvasH / imgH);
    
    // Zoom-out scaling: Reduce scale slightly to zoom out the frame details beautifully
    // This allows the full design details to be seen without aggressive cropping on vertical/horizontal screens
    scale = scale * 0.94;

    const scaledW = imgW * scale;
    const scaledH = imgH * scale;
    const offsetX = (canvasW - scaledW) / 2;
    const offsetY = (canvasH - scaledH) / 2;

    context.clearRect(0, 0, canvasW, canvasH);
    context.drawImage(img, offsetX, offsetY, scaledW, scaledH);
  }, []);

  // Resize canvas to match the cinematic viewport wrapper and support retina crispness
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    
    if (extractedFrames.length > 0) {
      drawFrame(currentFrameRef.current, extractedFrames);
    }
  }, [extractedFrames, drawFrame]);

  // Perform highly-optimized on-the-fly GPU-backed frame extraction on mount
  const extractVideoFrames = async (video: HTMLVideoElement, checkCancelled: () => boolean) => {
    const duration = video.duration;
    if (!duration || isNaN(duration)) return;

    const frameList: ImageBitmap[] = [];
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = video.videoWidth;
    tempCanvas.height = video.videoHeight;
    const tempCtx = tempCanvas.getContext("2d");
    if (!tempCtx) return;

    // Sequentially extract frames using seek triggers
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      if (checkCancelled()) {
        frameList.forEach((bitmap) => bitmap.close());
        return;
      }

      const targetTime = (i / (TOTAL_FRAMES - 1)) * duration;
      video.currentTime = targetTime;

      // Promise wait for the decoder's seeked event
      await new Promise<void>((resolve) => {
        const onSeeked = () => {
          video.removeEventListener("seeked", onSeeked);
          resolve();
        };
        video.addEventListener("seeked", onSeeked);
      });

      if (checkCancelled()) {
        frameList.forEach((bitmap) => bitmap.close());
        return;
      }

      // Capture frame to highly-performant, GPU-backed ImageBitmap
      try {
        const bitmap = await createImageBitmap(video);
        frameList.push(bitmap);
      } catch (err) {
        // Fallback drawing context
        tempCtx.drawImage(video, 0, 0);
        try {
          const bitmap = await createImageBitmap(tempCanvas);
          frameList.push(bitmap);
        } catch (e) {
          console.error("Frame decoding failed", e);
        }
      }

      setLoadingProgress(Math.round(((i + 1) / TOTAL_FRAMES) * 100));
    }

    if (checkCancelled()) {
      frameList.forEach((bitmap) => bitmap.close());
      return;
    }

    setExtractedFrames(frameList);
    setIsLoaded(true);
    
    // Draw the initial frame
    drawFrame(0, frameList);
  };

  // Synchronize canvas painting or video seeking directly on scroll changes (0 lag / 60fps)
  useMotionValueEvent(frameIndex, "change", (latestIdx) => {
    const idx = Math.round(latestIdx);
    if (isMobile) {
      // Mobile relies on smooth native autoplay + looping background video
      // No scroll scrubbing of video currentTime to preserve perfect smoothness
    } else {
      if (idx !== currentFrameRef.current && extractedFrames.length > 0) {
        currentFrameRef.current = idx;
        requestAnimationFrame(() => drawFrame(idx, extractedFrames));
      }
    }
  });

  // Setup video loading and triggers
  useEffect(() => {
    if (!isMounted) return;

    const video = videoRef.current;
    if (!video) return;

    video.preload = "auto";
    video.playsInline = true;
    video.muted = true;
    video.controls = false;

    let isCancelled = false;

    const handleLoadedMetadata = () => {
      if (isMobile) {
        setIsLoaded(true);
        setLoadingProgress(100);
        // Playback will be managed strictly by the IntersectionObserver once scrolled to
      } else {
        extractVideoFrames(video, () => isCancelled);
      }
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.load();

    return () => {
      isCancelled = true;
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [isMounted, isMobile]);

  // Window resize observer and mobile state checker on mount
  useEffect(() => {
    setIsMounted(true);

    const checkMobile = () => {
      const hasMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isTouchDevice = typeof navigator !== "undefined" && (
        navigator.maxTouchPoints > 0 || 
        "ontouchstart" in window
      );
      // Treat all touch devices (like iPads, tablets, and mobile UA) as mobile for ultra-smooth rendering & zero OOM crashes
      setIsMobile(hasMobileUA || isTouchDevice || window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Separate effect to handle canvas resize strictly on desktop when mounted
  useEffect(() => {
    if (!isMounted || isMobile) return;

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [isMounted, isMobile, resizeCanvas]);

  // Clean up extracted high-res frames from GPU/CPU memory on unmount
  useEffect(() => {
    return () => {
      extractedFrames.forEach((bitmap) => bitmap.close());
    };
  }, [extractedFrames]);

  // IntersectionObserver to pause/play the mobile video when in/out of viewport
  useEffect(() => {
    if (!isMounted || !isMobile) return;

    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            // Reset to beginning and play exactly when scrolled to
            video.currentTime = 0;
            video.play().catch((e) => console.log("Playback prevented:", e));
          } else {
            setInView(false);
            setAutoplayProgress(0);
            setActivePhaseIndex(0);
            // Pause and reset when scrolled away
            video.pause();
            video.currentTime = 0;
          }
        });
      },
      { threshold: 0.15 } // Sightly higher threshold for stable viewport entry detection
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [isMounted, isMobile]);

  // Mobile Stories-style autoplay logic when in viewport
  useEffect(() => {
    if (!isMobile || !inView || isPaused) return;

    const intervalTime = 50; // Update every 50ms for smooth progress bar updates
    const totalTime = 5000; // 5 seconds per phase (User request: 5 seconds)
    const increment = (intervalTime / totalTime) * 100;

    const timer = setInterval(() => {
      setAutoplayProgress((prev) => {
        if (prev >= 100) {
          return 100;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isMobile, inView, isPaused, autoplayKey]);

  // Synchronize phase advancement and progress reset in a single React batch commit to avoid out-of-sync jumps
  useEffect(() => {
    if (isMobile && autoplayProgress >= 100) {
      setActivePhaseIndex((prev) => (prev + 1) % 4);
      setAutoplayProgress(0);
    }
  }, [autoplayProgress, isMobile]);

  // Swipe / Tap gesture handlers for Mobile Cards
  const handleDragEnd = useCallback((info: { offset: { x: number } }) => {
    const swipeThreshold = 40;
    if (info.offset.x < -swipeThreshold) {
      // Swipe left -> next phase (respecting RTL)
      if (isRtl) {
        setActivePhaseIndex((prev) => (prev - 1 + 4) % 4);
      } else {
        setActivePhaseIndex((prev) => (prev + 1) % 4);
      }
      resetAutoplay();
    } else if (info.offset.x > swipeThreshold) {
      // Swipe right -> prev phase (respecting RTL)
      if (isRtl) {
        setActivePhaseIndex((prev) => (prev + 1) % 4);
      } else {
        setActivePhaseIndex((prev) => (prev - 1 + 4) % 4);
      }
      resetAutoplay();
    }
  }, [isRtl, resetAutoplay]);

  const handleCardTap = useCallback(() => {
    if (isMobile) {
      setActivePhaseIndex((prev) => (prev + 1) % 4);
      resetAutoplay();
    }
  }, [isMobile, resetAutoplay]);

  // Derived index of the phase text and stepper node state to display on mobile
  const displayPhaseIndex = useMemo(() => {
    if (!isMobile) {
      return activePhaseIndex;
    }
    // On mobile, transition the UI elements early (at 90% of progress) when the line touches the next circle
    if (autoplayProgress >= 90) {
      return (activePhaseIndex + 1) % 4;
    }
    return activePhaseIndex;
  }, [isMobile, activePhaseIndex, autoplayProgress]);

  // Retrieve active bullets list for current phase
  const activePhase = phases[displayPhaseIndex];
  const activeBullets = useMemo(() => {
    if (!isLoaded) return [];
    return getBulletsForLocale(locale, activePhase.bulletsKey);
  }, [locale, displayPhaseIndex, isLoaded, activePhase.bulletsKey]);

  // Compute active connector line width dynamically based on active phase and autoplay progress
  const activeLineWidth = useMemo(() => {
    if (!isMobile) {
      return `${(activePhaseIndex / 3) * 100}%`;
    }
    if (activePhaseIndex === 3) {
      return "100%";
    }
    const baseProgress = activePhaseIndex / 3;
    const stepProgress = (autoplayProgress / 100) * (1 / 3);
    return `${(baseProgress + stepProgress) * 100}%`;
  }, [isMobile, activePhaseIndex, autoplayProgress]);

  // Compute remaining phases count dynamically for ultra-clear user scrollytelling progress guidance
  const remainingText = useMemo(() => {
    const remaining = 3 - displayPhaseIndex;
    if (locale === "fa") {
      if (remaining === 3) return "۳ فاز باقی‌مانده";
      if (remaining === 2) return "۲ فاز باقی‌مانده";
      if (remaining === 1) return "۱ فاز باقی‌مانده";
      return "گام نهایی";
    }
    if (locale === "de") {
      if (remaining === 3) return "noch 3 Phasen";
      if (remaining === 2) return "noch 2 Phasen";
      if (remaining === 1) return "noch 1 Phase";
      return "Letzter Schritt";
    }
    // English default fallback
    if (remaining === 3) return "3 phases remaining";
    if (remaining === 2) return "2 phases remaining";
    if (remaining === 1) return "1 phase remaining";
    return "Final step";
  }, [locale, displayPhaseIndex]);

  return (
    <div 
      ref={containerRef} 
      className={`relative w-full bg-slate-950/20 overflow-hidden transition-all duration-300 ${
        isMounted && isMobile 
          ? "h-auto py-12 md:py-20" 
          : "h-auto py-12 md:py-20 lg:h-[500vh] lg:py-0"
      }`}
      id="barande-interactive"
    >
      {/* Grid lines background matching the portfolio showcase section */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none z-0" />

      {/* Invisible HTML5 video preloader (Desktop only - loaded after mount to save mobile bandwidth) */}
      {isMounted && !isMobile && (
        <video
          ref={videoRef}
          src="/videos/barande-full.mp4"
          style={{ display: "none" }}
          className="pointer-events-none absolute"
        />
      )}

      {/* Premium Circular Loading Screen Overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950/20">
          <div className="relative mb-6 flex items-center justify-center w-24 h-24">
            
            {/* Spinning background glowing track */}
            <div className="absolute inset-0 rounded-full border-2 border-slate-900" />
            
            {/* Active percentage progress circle */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="#E6C17A"
                strokeWidth="2.5"
                fill="transparent"
                strokeDasharray="251.2"
                strokeDashoffset={251.2 - (251.2 * loadingProgress) / 100}
                className="transition-all duration-300 drop-shadow-[0_0_6px_#E6C17A]"
              />
            </svg>

            {/* Inner pulsing particle */}
            <div className="absolute w-12 h-12 rounded-full bg-[#E6C17A]/5 border border-[#E6C17A]/20 flex items-center justify-center animate-pulse">
              <Play className="w-4.5 h-4.5 text-[#E6C17A]" />
            </div>
          </div>
          <p
            className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-[#E6C17A] animate-pulse"
          >
            Decoding Visual Engine · {loadingProgress}%
          </p>
        </div>
      )}

      {/* 
        Custom Pinning Engine Viewport
        Swaps from absolute (top-0) -> fixed (top-0) -> absolute (bottom-0)
        This sticks 100% reliably in all browsers, bypassing overflow limits!
      */}
      <div 
        className={`w-full select-none z-10 flex flex-col justify-center items-center px-4 md:px-8 py-4 ${
          isMounted && isMobile 
            ? "relative h-auto min-h-screen" 
            : `relative h-auto min-h-screen lg:h-screen lg:overflow-hidden ${
                isMounted && !isMobile 
                  ? (pinState === "sticky" 
                      ? "lg:fixed lg:top-0 lg:left-0" 
                      : pinState === "after" 
                        ? "lg:absolute lg:bottom-0 lg:left-0" 
                        : "lg:absolute lg:top-0 lg:left-0")
                  : "lg:absolute lg:top-0 lg:left-0"
              }`
        }`}
        style={{ backgroundColor: "transparent" }}
      >
        {/* Background Radial Glow decoration */}
        <div className="absolute inset-0 bg-[#E6C17A]/[0.015] z-0 pointer-events-none" />

        {/* 
          Section Title — placed inside the pinned container to guarantee
          the exact same background color as the scrolling demo below.
        */}
        <div className={`w-full max-w-4xl mb-5 md:mb-6 z-10 ${isRtl ? "text-right" : "text-center md:text-start"}`}>
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#E6C17A]">
            {t("videoScrollTagline")}
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold font-display text-white tracking-tight mt-1.5">
            {t("videoScrollTitle")}
          </h2>
          <p className="text-zinc-400 text-xs md:text-sm max-w-2xl mt-2 leading-relaxed">
            {t("videoScrollSubtitle")}
          </p>
        </div>

        {/* 
          1. Centered, Framed Cinematic Viewport (Apple-style "Zoomed-Out" look)
          Houses the canvas inside a clean, rounded, glowing viewport container 
        */}
        <div className="relative w-full max-w-4xl h-[38vh] md:h-[42vh] rounded-3xl border border-zinc-800/80 bg-[#09090b] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden z-10 flex items-center justify-center">
          
          {!isMounted ? (
            /* Premium static fallback image before mounting (instant LCP and zero layout shift) */
            <img
              src="/barande.jpg"
              alt="Barande"
              className="absolute inset-0 w-full h-full object-cover opacity-80"
            />
          ) : isMobile ? (
            /* Direct HTML5 video viewport (Mobile only - 100% memory-safe & instant loading) */
            <video
              ref={videoRef}
              src="/videos/barande-full.mp4"
              poster="/barande.jpg"
              playsInline
              muted
              controls={false}
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover bg-[#09090b]/20 pointer-events-none"
            />
          ) : (
            /* Visual Canvas Element (Desktop only) */
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full bg-[#09090b]/20"
            />
          )}

          {/* Cinematic Vignette inner overlay */}
          <div
            className="pointer-events-none absolute inset-0 z-[5]"
            style={{
              background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)",
            }}
          />
        </div>

        {/* 
          2. Floating Glassmorphic Information Card (UI-UX Pro Max legibility standard)
          Placed beautifully below the video framed viewport, with a solid high-contrast dark blur background 
        */}
        <motion.div 
          drag={isMobile ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={(_, info) => handleDragEnd(info)}
          onClick={handleCardTap}
          whileTap={isMobile ? { scale: 0.992 } : undefined}
          className={`w-full max-w-2xl min-h-[210px] md:min-h-[240px] mt-4 md:mt-5 glass-panel rounded-2xl p-5 md:p-6.5 border border-zinc-800 bg-[#09090b]/95 backdrop-blur-xl shadow-2xl relative z-20 flex flex-col justify-between overflow-hidden transition-shadow duration-300 ${
            isMobile ? "cursor-grab active:cursor-grabbing shadow-[0_0_20px_rgba(230,193,122,0.03)] hover:shadow-[0_0_30px_rgba(230,193,122,0.06)]" : ""
          }`}
        >
          {/* Stories-style Segmented Progress Bar (Mobile only) */}
          {isMobile && (
            <div className="absolute top-0 left-0 right-0 h-[3px] flex gap-1.5 z-30 px-3.5 pt-[3px] bg-[#09090b]/50">
              {phases.map((_, idx) => {
                const isCompleted = idx < activePhaseIndex;
                const isActive = idx === activePhaseIndex;
                return (
                  <div key={idx} className="flex-1 h-full bg-white/10 rounded-full overflow-hidden">
                    {isCompleted && (
                      <div className="w-full h-full bg-[#E6C17A] shadow-[0_0_4px_#E6C17A]" />
                    )}
                    {isActive && (
                      <div 
                        style={{ width: `${autoplayProgress}%` }}
                        className="h-full bg-[#E6C17A] shadow-[0_0_4px_#E6C17A] transition-all duration-75 ease-linear"
                      />
                    )}
                    {!isCompleted && !isActive && (
                      <div className="w-0 h-full bg-[#E6C17A]/20" />
                    )}
                  </div>
                );
              })}
            </div>
          )}
          
          {/* Subtle neon corner accents for tech premium detail */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#E6C17A]/30 rounded-tl-xl" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#E6C17A]/30 rounded-tr-xl" />
          
          {/* 
            Horizontal Premium Progress Stepper 
            Clearly communicates how many phases exist and which one is active
          */}
          <div dir="ltr" className="flex items-center justify-between w-full px-4 mb-5.5 relative">
            {/* Background track line spanning exactly between circle centers */}
            <div className="absolute left-[27px] right-[27px] top-[11px] h-[1px] bg-zinc-800/80 z-0">
              {/* Active fill line nested inside background track for perfect 1:1 pixel alignment */}
              <div 
                className={`absolute left-0 top-0 h-full bg-[#E6C17A] shadow-[0_0_8px_#E6C17A] z-0 ${
                  isMobile ? "transition-all duration-75 ease-linear" : "transition-all duration-300"
                }`}
                style={{
                  width: activeLineWidth
                }}
              />
            </div>

            {phases.map((phase, idx) => {
              const isCompleted = idx < displayPhaseIndex;
              const isActive = idx === displayPhaseIndex;
              const isUpcoming = idx > displayPhaseIndex;
              const isNextNode = idx === (displayPhaseIndex + 1) % 4;
              
              // Define short step descriptions
              const stepShortTitles = [
                locale === "fa" ? "هسته موبایل" : (locale === "de" ? "Mobile Core" : "Mobile Core"),
                locale === "fa" ? "طراحی UI" : (locale === "de" ? "UI-Aufbau" : "UI Breakdown"),
                locale === "fa" ? "بک‌اند" : (locale === "de" ? "Supabase" : "Supabase"),
                locale === "fa" ? "تایید نهایی" : (locale === "de" ? "Optimiert" : "Verification"),
              ];

              return (
                <div 
                  key={idx} 
                  className="flex flex-col items-center z-10 relative cursor-pointer group"
                  onClick={(e) => {
                    e.stopPropagation(); // Avoid triggering card click handler
                    if (isMobile) {
                      setActivePhaseIndex(idx);
                      resetAutoplay();
                    } else {
                      const container = containerRef.current;
                      if (container) {
                        const containerHeight = container.getBoundingClientRect().height;
                        const rect = container.getBoundingClientRect();
                        const scrollTop = window.scrollY + rect.top;
                        const targetScroll = scrollTop + (idx / 4) * containerHeight;
                        window.scrollTo({
                          top: targetScroll + 15,
                          behavior: "smooth"
                        });
                      }
                    }
                  }}
                >
                  {/* Step Circle Node with dynamic states (Checkmark for completed, Pulse for active, Dotted/Dashed for future) */}
                  <div 
                    className={`w-[22px] h-[22px] rounded-full flex items-center justify-center border font-mono text-[9px] font-black transition-all duration-300 relative ${
                      isActive 
                        ? "bg-zinc-950 border-[#E6C17A] text-[#E6C17A] shadow-[0_0_10px_rgba(230,193,122,0.45)] scale-110" 
                        : isNextNode && isMobile
                          ? "bg-zinc-950 border-[#E6C17A]/80 text-[#E6C17A]/80 shadow-[0_0_8px_rgba(230,193,122,0.25)] animate-pulse scale-105"
                          : isCompleted 
                            ? "bg-amber-100/10 border-amber-100/60 text-amber-100" 
                            : "bg-zinc-950/40 border-dashed border-zinc-700 text-zinc-600 hover:border-zinc-500 hover:text-zinc-400"
                    }`}
                  >
                    {isCompleted ? (
                      <span className="text-[10px] font-bold">✓</span>
                    ) : (
                      idx + 1
                    )}
                    {isNextNode && isMobile && (
                      <span className="absolute inset-0 rounded-full border border-[#E6C17A] animate-ping opacity-40 pointer-events-none" />
                    )}
                  </div>
                  
                  {/* Step Label Text (Desktop only) */}
                  <span 
                    className={`hidden sm:block text-[8.5px] mt-1.5 font-mono font-bold tracking-wider uppercase text-center transition-colors duration-300 ${
                      isActive 
                        ? "text-[#E6C17A]" 
                        : isCompleted 
                          ? "text-zinc-400" 
                          : "text-zinc-600 group-hover:text-zinc-400"
                    }`}
                  >
                    {stepShortTitles[idx]}
                  </span>

                  {/* Tiny upcoming slot subtitle */}
                  {isUpcoming && (
                    <span className="hidden sm:block text-[7.5px] text-zinc-700 font-mono tracking-wide font-normal lowercase mt-0.5 text-center">
                      {locale === "fa" ? "(بعدی)" : (locale === "de" ? "(ausstehend)" : "(upcoming)")}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
          
          <AnimatePresence mode="wait">
            {isLoaded && (
              <motion.div
                key={displayPhaseIndex}
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -3 }}
                transition={{ duration: 0.08, ease: "easeOut" }}
                className="flex flex-col h-full justify-between"
              >
                {/* Stepper Tag & Dynamic Remaining Badge */}
                <div className="flex justify-between items-center mb-2.5 gap-2">
                  <div className="flex flex-col gap-1 items-start">
                    <span className="text-[9px] font-mono font-bold tracking-[0.25em] text-[#E6C17A] uppercase">
                      Phase 0{displayPhaseIndex + 1} · {t("videoScrollTagline")}
                    </span>
                    
                    {/* Glowing localized badge communicating remaining phases left */}
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[8.5px] font-mono font-bold border bg-amber-100/5 border-amber-100/25 text-amber-100 shadow-[0_0_8px_rgba(230,193,122,0.12)]">
                        <span className="w-1 h-1 rounded-full bg-[#E6C17A] animate-ping" />
                        <span>{remainingText}</span>
                      </div>
                      {isMobile && (
                        <span className="text-[7.5px] font-mono font-black text-[#E6C17A]/60 uppercase tracking-widest animate-pulse">
                          {locale === "fa" 
                            ? "بکشید یا ضربه بزنید" 
                            : (locale === "de" 
                              ? "Wischen oder Tippen" 
                              : "Swipe or Tap")}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Phase Icon */}
                  <div className="w-6 h-6 rounded-lg bg-amber-100/10 border border-amber-100/15 flex items-center justify-center">
                    {activePhase.icon}
                  </div>
                </div>

                {/* Headline */}
                <h3 className="text-lg md:text-xl font-bold font-display text-white mb-1.5 text-start">
                  {t(activePhase.titleKey)}
                </h3>

                {/* Detailed description text */}
                <p className="text-zinc-300 text-xs md:text-[13px] leading-relaxed text-start mb-4.5 font-medium">
                  {t(activePhase.descKey)}
                </p>

                {/* Checklist bullets footer */}
                <div className="flex flex-wrap gap-x-5 gap-y-2 border-t border-white/5 pt-3.5 mt-auto">
                  {activeBullets.map((bullet, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-[10px] sm:text-xs font-bold text-zinc-500">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E6C17A] shadow-[0_0_3px_#E6C17A] flex-shrink-0" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>

                {/* Mobile-only Touch Navigation & Call-to-Action Bar */}
                {isMobile && (
                  <div 
                    onClick={(e) => {
                      e.stopPropagation(); // Avoid double triggers on card tap
                      setActivePhaseIndex((prev) => (prev + 1) % 4);
                      resetAutoplay();
                    }}
                    className="mt-4 flex items-center justify-between w-full border-t border-amber-100/15 pt-3.5 bg-gradient-to-r from-amber-100/0 to-amber-100/[0.03] rounded-b-xl px-1"
                  >
                    <div className="flex items-center gap-2">
                      <div className="relative flex items-center justify-center w-6 h-6 rounded-full bg-[#09090b] border border-amber-100/20">
                        <Smartphone className="w-3.5 h-3.5 text-amber-100/80 animate-pulse" />
                        <span className="absolute -right-0.5 -top-0.5 w-2 h-2 rounded-full bg-[#E6C17A] animate-ping" />
                      </div>
                      <span className="text-[10px] font-mono text-zinc-500 tracking-wider">
                        {locale === "fa" 
                          ? "بکشید یا ضربه بزنید" 
                          : (locale === "de" 
                            ? "Wischen oder Tippen" 
                            : "Swipe or Tap")}
                      </span>
                    </div>
                    
                    <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-[11px] font-bold font-mono tracking-wider text-amber-100 border border-amber-100/40 bg-amber-100/10 shadow-[0_0_12px_rgba(230,193,122,0.2)] active:scale-95 transition-transform duration-100">
                      <span>
                        {displayPhaseIndex === 3 
                          ? (isRtl ? "↺ فاز ۱" : "Phase 1 ↺") 
                          : isRtl 
                            ? `← فاز ۰${((displayPhaseIndex + 1) % 4) + 1}` 
                            : `${locale === "de" ? "Phase" : "Phase"} 0${((displayPhaseIndex + 1) % 4) + 1} →`}
                      </span>
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Vertical Scroll Progress Bar (Right side, identical to sheenberlin.de) */}
        <div className="absolute right-6 sm:right-8 top-1/2 z-30 hidden -translate-y-1/2 sm:block">
          <div className="h-24 w-[2px] overflow-hidden rounded-full bg-white/10">
            <motion.div
              style={{ scaleY: progressScaleY }}
              className="h-full w-full origin-top rounded-full bg-[#E6C17A] shadow-[0_0_6px_#E6C17A]"
            />
          </div>
        </div>

        {/* Scroll Hint Mouse Animation (Fades away once user scrolls, desktop only) */}
        {!isMobile && (
          <motion.div 
            style={{ opacity: scrollHelperOpacity }}
            className="absolute bottom-6 left-1/2 z-30 -translate-x-1/2 pointer-events-none"
          >
            <div className="flex flex-col items-center gap-2">
              <span
                className="text-[9px] uppercase tracking-[0.25em] text-zinc-500 font-mono font-bold"
              >
                Scroll to Explore
              </span>
              <svg
                width="16"
                height="24"
                viewBox="0 0 16 24"
                fill="none"
                className="text-[#E6C17A] opacity-60"
              >
                <rect
                  x="1"
                  y="1"
                  width="14"
                  height="22"
                  rx="7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <circle cx="8" cy="8" r="2" fill="currentColor">
                  <animate
                    attributeName="cy"
                    values="8;16;8"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                </circle>
              </svg>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
};
