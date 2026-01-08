"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

/**
 * Preloader component for "10 AI-driven Features"
 * Features a full-screen WebGL-style animated gradient, 
 * counter sequence, and cinematic typography.
 */
export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [isHiding, setIsHiding] = useState(false);
  const [buttonAnimating, setButtonAnimating] = useState(false);
  const dismiss = React.useCallback(() => {
    if (buttonAnimating) return;
    setButtonAnimating(true);
    setIsHiding(true);
    // Dispatch event to notify other components (like Header) that preloader is dismissing
    window.dispatchEvent(new Event("preloader:dismiss"));
    setTimeout(() => setIsVisible(false), 1000);
  }, [buttonAnimating]);
  
  useEffect(() => {
    const onShow = () => {
      setIsVisible(true);
      setIsHiding(false);
      setButtonAnimating(false);
    };
    window.addEventListener("preloader:show", onShow as EventListener);
    return () => {
      window.removeEventListener("preloader:show", onShow as EventListener);
    };
  }, []);

  // Handle bringing back the preloader when scrolling up at the top
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isVisible) return; // Already visible
      
      // If at the top of the page and scrolling up (negative deltaY)
      if (window.scrollY === 0 && e.deltaY < 0) {
        window.dispatchEvent(new Event("preloader:show"));
      }
    };

    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, [isVisible]);
  
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isVisible]);
  
  // Sequence of numbers for the preloader countdown from the content
  const numbers = ["2", "4", "6", "8", "10"];

    useEffect(() => {
      // Animate the counter index
      const interval = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev < numbers.length - 1) return prev + 1;
          clearInterval(interval);
          setIsComplete(true);
          return prev;
        });
      }, 400);

      return () => {
        clearInterval(interval);
      };
    }, [numbers.length]);

  return (
    <motion.div
      className={`fixed inset-0 z-[100] flex flex-col items-stretch justify-between overflow-hidden bg-[#010107] ${isVisible ? "pointer-events-auto" : "pointer-events-none"}`}
      initial={{ y: 0 }}
      animate={{ y: isVisible ? (isHiding ? "-100%" : 0) : "-100%" }}
      transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
      style={{ willChange: "transform", overscrollBehavior: "contain" }}
      onWheel={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isComplete) return;
        if (e.deltaY > 0) {
          dismiss();
        }
      }}
      onTouchMove={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onTouchStart={(e) => {
        const t = e.touches && e.touches[0] ? e.touches[0] : e.changedTouches[0];
        setTouchStartY(t.clientY);
      }}
      onTouchEnd={(e) => {
        const endY = e.changedTouches[0].clientY;
        const startY = touchStartY;
        const dy = startY !== null ? startY - endY : 0;
        if (dy > 50) {
          if (!isComplete) {
            setTouchStartY(null);
          } else {
            e.preventDefault();
            e.stopPropagation();
            dismiss();
            setTouchStartY(null);
          }
        }
        setTouchStartY(null);
      }}
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 z-0 bg-[#000000] overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#a855f7] rounded-full mix-blend-screen filter blur-[80px] opacity-70 animate-blob-1" />
        <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[#ff3e88] rounded-full mix-blend-screen filter blur-[80px] opacity-60 animate-blob-2" />
        <div className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] bg-[#3b82f6] rounded-full mix-blend-screen filter blur-[100px] opacity-60 animate-blob-3" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[#c084fc] rounded-full mix-blend-screen filter blur-[80px] opacity-70 animate-blob-4" />
        <div className="absolute top-[20%] left-[30%] w-[40vw] h-[40vw] bg-[#ec4899] rounded-full mix-blend-screen filter blur-[90px] opacity-50 animate-blob-5" />
        <div className="absolute bottom-[20%] right-[30%] w-[45vw] h-[45vw] bg-[#3d318c] rounded-full mix-blend-screen filter blur-[90px] opacity-50 animate-blob-6" />
        
        <div className={`absolute inset-0 bg-black/10 ${isHiding ? "" : "backdrop-blur-[2px]"}`} />
      </div>

      {/* Counter moved to root level */}
      <div className="absolute top-0 left-0 p-[14px] z-[5] pointer-events-none">
        <div>
          <p className="huge-number text-[clamp(8rem,25vw,30rem)] text-white font-normal select-none leading-[0.8] tracking-[-0.15em]">
            {numbers[currentIndex]}
          </p>
        </div>
      </div>

      <div className="relative z-10 flex h-full flex-col px-5 pt-10 pb-0 -mb-4 lg:px-10 lg:pt-16 lg:pb-0 lg:-mb-8">
        {/* Top Header Section with Counter - Empty now as button is removed */}
        <div className="flex w-full items-start justify-between pointer-events-none">
        </div>

        {/* Center Section with Small Siri-style Orb and Tip */}
        <div className="mt-[60px] flex w-full flex-col items-start gap-8 ml-[10vw] md:ml-[12vw] lg:ml-[11.5vw] relative z-10">
          <div className="relative flex flex-col justify-between w-[35vw] md:w-[20vw] lg:w-[11vw] h-[40vw] md:h-[22vw] lg:h-[12vw] min-w-[130px] min-h-[140px] rounded-[24px] bg-black p-5 backdrop-blur-xl border border-white/5">
            <p className="font-mono text-[10px] lg:text-[0.6vw] tracking-[0.05em] text-[#9DA5B4] leading-tight z-10 uppercase">
              A fresh look at<br />finance ux with<br /><span className="text-white font-bold tracking-widest">vide infra</span>
            </p>
            <div className="absolute bottom-4 right-4 h-[40px] w-[40px] lg:h-[3.5vw] lg:w-[3.5vw] overflow-hidden rounded-full shadow-[0_5px_15px_rgba(124,58,237,0.5)]">
              <img 
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4a4bd797-4236-4bdf-9f89-b0e30f388317-ai-in-banking-ux-design-videinfra-com/assets/images/siri-11.avif" 
                alt="Siri Orb" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Bottom Section with Main Typography */}
        <div className="mt-auto w-full">
          <div className="flex flex-col gap-2">
            <h1 className="flex flex-col text-[clamp(6rem,14vw,14rem)] font-normal tracking-tighter text-white leading-[0.9]">
              <span className="text-right w-full">AI-driven</span>
              <div className="flex items-center gap-8 w-full pl-[25vw]">
                <span className="text-left translate-x-[-0.02em]">Features</span>
                <p className="max-w-[180px] font-mono text-[11px] leading-relaxed tracking-wider text-white uppercase -mt-2">
                  Revolutionizing<br />Banking UX
                </p>
              </div>
            </h1>
            
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between px-1" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
