"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface SliderItem {
  id: number;
  number: string;
  title: string;
  description: string;
  image?: string;
  bgColor: string;
  textColor: string;
  accentColor: string;
}

export const sliderData: SliderItem[] = [
  {
    id: 1,
    number: "1",
    title: "Automated\nExpense\nManagement",
    description: "AI simplifies finance management, enhancing banking UX with automated support for wise spending and effective saving in-app.",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4a4bd797-4236-4bdf-9f89-b0e30f388317-ai-in-banking-ux-design-videinfra-com/assets/images/feature-1.avif",
    bgColor: "#F3F3F5",
    textColor: "#000000",
    accentColor: "#9DA5B4",
  },
  {
    id: 2,
    number: "2",
    title: "Seamless\nPayment\nExperience",
    description: "In addition to providing financial guidance, the AI simplifies the payment process, making it as seamless as possible.",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4a4bd797-4236-4bdf-9f89-b0e30f388317-ai-in-banking-ux-design-videinfra-com/assets/images/feature-2.avif",
    bgColor: "#E5E7EB",
    textColor: "#000000",
    accentColor: "#9DA5B4",
  },
  {
    id: 3,
    number: "3",
    title: "AI-Enhanced\nCost-Efficient\nShopping",
    description: "AI algorithms monitor real-time prices and analyze purchasing data, informing users about cost-effective deals.",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4a4bd797-4236-4bdf-9f89-b0e30f388317-ai-in-banking-ux-design-videinfra-com/assets/images/feature-3.avif",
    bgColor: "#F9FAFB",
    textColor: "#000000",
    accentColor: "#9DA5B4",
  },
  {
    id: 4,
    number: "4",
    title: "Health\nand\nLifestyle",
    description: "AI can analyze user behavior, such as travel bookings, significant purchases, or changes in family size, to proactively suggest insurance plans.",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4a4bd797-4236-4bdf-9f89-b0e30f388317-ai-in-banking-ux-design-videinfra-com/assets/images/feature-4.avif",
    bgColor: "#F3F4F6",
    textColor: "#000000",
    accentColor: "#9DA5B4",
  },
  {
    id: 5,
    number: "5",
    title: "Family Financial\nManagement",
    description: "Family Financial Management includes AI-powered features aimed at automating and optimizing the financial responsibilities of family life.",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4a4bd797-4236-4bdf-9f89-b0e30f388317-ai-in-banking-ux-design-videinfra-com/assets/images/feature-5.avif",
    bgColor: "#9B70AD",
    textColor: "#000000",
    accentColor: "#4B2C5E",
  },
  {
    id: 6,
    number: "6",
    title: "Localized\nCost-of-Living\nCalculators",
    description: "Localized Cost-of-Living Calculators feature AI-powered tools that offer localized budget suggestions tailored to the cost of living in specific regions or cities.",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4a4bd797-4236-4bdf-9f89-b0e30f388317-ai-in-banking-ux-design-videinfra-com/assets/images/feature-6.avif",
    bgColor: "#AF8CBF",
    textColor: "#000000",
    accentColor: "#5E3B6D",
  },
  {
    id: 7,
    number: "7",
    title: "Seamless\nIntegration\nwith IoT Devices",
    description: "AI bridges the gap by integrating with connected devices, offering real-time financial guidance in the app.",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4a4bd797-4236-4bdf-9f89-b0e30f388317-ai-in-banking-ux-design-videinfra-com/assets/images/feature-7.avif",
    bgColor: "#6BA587",
    textColor: "#000000",
    accentColor: "#2D4B3B",
  },
  {
    id: 8,
    number: "8",
    title: "Debt Management\nand Loan Options",
    description: "AI in banking apps assesses debt, forecasts the impact on credit scores, suggests tailored loans for future needs.",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4a4bd797-4236-4bdf-9f89-b0e30f388317-ai-in-banking-ux-design-videinfra-com/assets/images/feature-8.avif",
    bgColor: "#A7D8EA",
    textColor: "#000000",
    accentColor: "#3B6D7F",
  },
  {
    id: 9,
    number: "9",
    title: "Fully Personalized\nFinancial Strategies",
    description: "The AI simplifies investment by offering personalized strategies tailored to each user's unique profile.",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4a4bd797-4236-4bdf-9f89-b0e30f388317-ai-in-banking-ux-design-videinfra-com/assets/images/feature-9.avif",
    bgColor: "#BDD7EE",
    textColor: "#000000",
    accentColor: "#4B6E8F",
  },
  {
    id: 10,
    number: "10",
    title: "AI-driven\nFeatures",
    description: "A FRESH LOOK AT FINANCE UX WITH VIDE INFRA",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4a4bd797-4236-4bdf-9f89-b0e30f388317-ai-in-banking-ux-design-videinfra-com/assets/images/siri-11.avif",
    bgColor: "#42368C",
    textColor: "#FFFFFF",
    accentColor: "#9DA5B4",
  },
];

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => {
      const next = prev + 1;
      if (next >= sliderData.length) return prev;
      return next;
    });
    setTimeout(() => setIsAnimating(false), 1200);
  }, [isAnimating]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => {
      if (prev === sliderData.length - 1) return 0;
      const next = prev - 1;
      if (next < 0) return prev;
      return next;
    });
    setTimeout(() => setIsAnimating(false), 1200);
  }, [isAnimating]);

  // Handle scroll for navigation
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 30) return;
      const lastIndex = sliderData.length - 1;
      if (e.deltaY > 0) {
        if (activeIndex === lastIndex) return;
        nextSlide();
      } else {
        if (activeIndex === lastIndex) {
          if (isAnimating) return;
          setIsAnimating(true);
          setActiveIndex(0);
          setTimeout(() => setIsAnimating(false), 1200);
          return;
        }
        prevSlide();
      }
    };

    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, [activeIndex, nextSlide, prevSlide, isAnimating]);

  return (
    <section className="relative w-full h-[100vh] overflow-hidden bg-[#010107] select-none">
      {/* Dynamic Background Gradient */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-liquid-gradient opacity-40 transition-opacity duration-1000" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#010107] to-transparent pointer-events-none" />
      </div>

      {/* Main Slider Content */}
      <div className="relative z-10 w-full h-full flex items-center px-[20px] lg:px-[40px]">
        {sliderData.map((item, index) => {
          const isActive = index === activeIndex;
          
          return (
            <div
              key={item.id}
              className={cn(
                "absolute inset-0 w-full h-full flex flex-col md:flex-row items-center justify-between transition-cinematic px-[20px] lg:px-[40px] pt-[120px] lg:pt-[100px] pb-[60px]",
                isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[20px] pointer-events-none"
              )}
            >
              {/* Massive Background Number */}
              <div 
                className="huge-number absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white select-none"
                style={{ opacity: 0.05 }}
              >
                {item.number}
              </div>

              {/* Column 1: Description & Explore (Left on Desktop) */}
              <div className="w-full md:w-[30%] order-2 md:order-1 flex flex-col justify-end h-full">
                <div className={cn(
                  "transition-all duration-1000 delay-300 transform",
                  isActive ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                )}>
                  <p className="text-[18px] lg:text-[22px] leading-[1.6] text-[#9DA5B4] mb-8 max-w-[340px]">
                    {item.description}
                  </p>
                  
                  <a 
                    href={`#modal-popup-${item.id}`}
                    className="group inline-flex items-center gap-4 cursor-pointer"
                  >
                    <span className="mono-label text-white text-[12px] tracking-[0.2em]">EXPLORE</span>
                    <div className="w-[50px] h-[50px] border border-white/20 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:rotate-90 group-hover:bg-white group-hover:text-black">
                      <Plus size={20} />
                    </div>
                  </a>
                </div>
              </div>

              {/* Column 2: Spacer/Visual Center */}
              <div className="hidden md:flex flex-1 items-center justify-center" />

              {/* Column 3: Feature Title (Right on Desktop) */}
              <div className="w-full md:w-[45%] order-1 md:order-3 text-right">
                <h2 className={cn(
                  "font-display font-semibold text-[48px] md:text-[80px] lg:text-[100px] leading-[1.05] tracking-tight whitespace-pre-line transition-all duration-1000 transform",
                  isActive ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"
                )}>
                  {item.title}
                </h2>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Indicators (Fixed Bottom) */}
      <div className="absolute bottom-[40px] right-[40px] z-50 flex items-center gap-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={prevSlide}
            className="p-2 text-[#9DA5B4] hover:text-white transition-colors"
            title="Previous"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          
          <div className="flex items-center gap-2 mono-label text-[14px]">
            <span className="text-white">{(activeIndex + 1).toString().padStart(2, '0')}</span>
            <span className="text-[#9DA5B4]">/</span>
            <span className="text-[#9DA5B4]">{sliderData.length.toString().padStart(2, '0')}</span>
          </div>

          <button 
            onClick={nextSlide}
            className="p-2 text-[#9DA5B4] hover:text-white transition-colors"
            title="Next"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Side pagination dots */}
      <div className="absolute right-[40px] top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3">
        {sliderData.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              if (isAnimating) return;
              setIsAnimating(true);
              setActiveIndex(idx);
              setTimeout(() => setIsAnimating(false), 1200);
            }}
            className={cn(
              "w-[2px] h-[30px] transition-all duration-500",
              idx === activeIndex ? "bg-white scale-x-2" : "bg-white/20"
            )}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
