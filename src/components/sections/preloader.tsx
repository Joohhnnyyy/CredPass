"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

/**
 * Preloader component for "10 AI-driven Features"
 * Features a full-screen WebGL-style animated gradient, 
 * counter sequence, and cinematic typography.
 */
export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Sequence of numbers for the preloader countdown from the content
  const numbers = ["2", "4", "6", "8", "10"];

    useEffect(() => {
      // Animate the counter index
      const interval = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev < numbers.length - 1) return prev + 1;
          clearInterval(interval);
          // Auto-hide after sequence finishes with a slight delay
          setTimeout(() => setIsVisible(false), 800);
          return prev;
        });
      }, 400);

      return () => {
        clearInterval(interval);
      };
    }, [numbers.length]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-stretch justify-between overflow-hidden bg-[#010107] transition-opacity duration-1000">
      {/* Dynamic WebGL Gradient Background Replacement */}
      <div className="absolute inset-0 z-0">
        <div className="bg-liquid-gradient absolute inset-0 opacity-80" />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-3xl" />
      </div>

      <div className="relative z-10 flex h-full flex-col px-10 py-10 lg:px-20 lg:py-16">
        {/* Top Header Section with Counter */}
        <div className="flex w-full items-start justify-between">
          <div className="relative h-[200px] w-full max-w-[400px]">
            <div className="overflow-hidden">
              <p className="huge-number text-white font-bold select-none leading-[0.8]">
                {numbers[currentIndex]}
              </p>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="flex flex-col items-end">
               {/* Skip Button Style from Design */}
               <button 
                onClick={() => setIsVisible(false)}
                className="group relative flex h-10 w-10 items-center justify-center border border-white/10 bg-transparent transition-all duration-500 hover:rotate-12"
               >
                 <ChevronDown className="h-4 w-4 text-white" />
               </button>
            </div>
          </div>
        </div>

        {/* Center Section with Small Siri-style Orb and Tip */}
        <div className="mt-[-40px] flex w-full flex-col items-start gap-8 lg:ml-[16.66%]">
          <div className="relative inline-flex items-center gap-6 rounded-[24px] bg-black/40 p-6 backdrop-blur-xl border border-white/5">
            <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-white/80 leading-relaxed">
              A fresh look <br /> at finance UX <br /> with <span className="text-white">vide infra</span>
            </p>
            <div className="relative h-[60px] w-[60px] overflow-hidden rounded-full sunset-gradient shadow-[0_0_30px_rgba(227,116,145,0.3)] animate-pulse">
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4a4bd797-4236-4bdf-9f89-b0e30f388317-ai-in-banking-ux-design-videinfra-com/assets/images/siri-11.avif"
                alt="AI Assistant Orb"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Bottom Section with Main Typography */}
        <div className="mt-auto w-full">
          <div className="flex flex-col gap-2">
            <h1 className="flex flex-col text-[clamp(4rem,10vw,10rem)] font-semibold tracking-tighter text-white uppercase leading-[0.9]">
              <span className="text-left w-full translate-x-[-0.02em]">AI-driven</span>
              <span className="text-right w-full lg:pr-[15%]">Features</span>
            </h1>
            
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between px-1">
              <p className="max-w-[180px] font-mono text-[11px] leading-relaxed tracking-wider text-[#9DA5B4] uppercase lg:ml-auto lg:mr-[10%] mt-8 lg:mt-0">
                Revolutionizing<br />Banking UX
              </p>
              
              {/* Mobile Swipe Indicator */}
              <div className="mt-8 flex items-center gap-3 lg:hidden">
                <span className="font-mono text-[11px] uppercase tracking-widest text-[#9DA5B4]">swipe</span>
                <div className="flex gap-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-white opacity-20" />
                  <div className="h-1.5 w-1.5 rounded-full bg-white opacity-40" />
                  <div className="h-1.5 w-1.5 rounded-full bg-white opacity-100" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Global Indicator */}
        <div className="fixed bottom-10 right-10 flex items-center gap-4 lg:bottom-16 lg:right-20">
          <div className="flex items-end gap-1 pb-1">
            <span className="h-1 w-1 bg-white animate-[bounce_1s_infinite_0ms]" />
            <span className="h-1 w-1 bg-white animate-[bounce_1s_infinite_200ms]" />
            <span className="h-1 w-1 bg-white animate-[bounce_1s_infinite_400ms]" />
          </div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#9DA5B4]">
            Loading Features
          </p>
        </div>
      </div>
    </div>
  );
}
