"use client";

import React, { useRef } from "react";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

interface FeatureSectionProps {
  item: {
    id: number;
    number: string;
    title: string;
    description: string;
    image?: string;
    bgColor: string;
    textColor: string;
    accentColor: string;
  };
}

export default function FeatureSection({ item }: FeatureSectionProps) {
  const touchStartY = useRef<number | null>(null);
  const wheelAccumulator = useRef(0);
  return (
    <div 
      className="relative w-screen h-screen flex flex-col md:flex-row items-center justify-between px-[20px] lg:px-[40px] pt-[120px] lg:pt-[100px] pb-[60px] flex-shrink-0 overflow-hidden transition-colors duration-1000"
      style={{ backgroundColor: item.bgColor }}
      onWheel={(e) => {
        if (item.id !== 1) return;
        
        // Reset accumulator if scrolling in opposite direction
        if (e.deltaY >= 0) {
          wheelAccumulator.current = 0;
          return;
        }

        wheelAccumulator.current += e.deltaY;

        if (wheelAccumulator.current < -50) {
          e.preventDefault();
          e.stopPropagation();
          window.dispatchEvent(new Event("preloader:show"));
          wheelAccumulator.current = 0;
        }
      }}
      onTouchStart={(e) => {
        if (item.id !== 1) return;
        touchStartY.current = e.changedTouches[0].clientY;
      }}
      onTouchEnd={(e) => {
        if (item.id !== 1) return;
        const endY = e.changedTouches[0].clientY;
        if (touchStartY.current !== null && endY - touchStartY.current > 30) {
          e.preventDefault();
          e.stopPropagation();
          window.dispatchEvent(new Event("preloader:show"));
        }
        touchStartY.current = null;
      }}
    >
      {/* Massive Background Number */}
      <motion.div 
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 0.1, x: 0 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 1.5, ease: [0.77, 0, 0.175, 1] }}
        className="huge-number absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none"
        style={{ color: item.textColor }}
      >
        {item.number}
      </motion.div>

      {/* Column 1: Description & Explore (Left on Desktop) */}
      <div className="w-full md:w-[30%] order-2 md:order-1 flex flex-col justify-end h-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <p 
            className="text-[18px] lg:text-[22px] leading-[1.6] mb-8 max-w-[340px]"
            style={{ color: item.textColor === "#FFFFFF" ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)" }}
          >
            {item.description}
          </p>
          
          <a 
            href={`#modal-popup-${item.id}`}
            className="group inline-flex items-center gap-4 cursor-pointer"
          >
            <span 
              className="mono-label text-[12px] tracking-[0.2em]"
              style={{ color: item.textColor }}
            >
              EXPLORE
            </span>
            <div 
              className="w-[50px] h-[50px] border rounded-full flex items-center justify-center transition-all duration-500 group-hover:rotate-90"
              style={{ 
                borderColor: item.textColor === "#FFFFFF" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)",
                color: item.textColor
              }}
            >
              <Plus size={20} />
            </div>
          </a>
        </motion.div>
      </div>

      {/* Column 2: Visual Center (3D Asset) */}
      <div className="flex-1 order-3 md:order-2 flex items-center justify-center relative z-20 h-full w-full max-w-[500px] md:max-w-none">
        {item.image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: 30 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 1.5, ease: [0.77, 0, 0.175, 1] }}
            className="relative w-full h-[60%] md:h-[80%] perspective-1000"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
              priority
            />
          </motion.div>
        )}
      </div>

      {/* Column 3: Feature Title (Right on Desktop) */}
      <div className="w-full md:w-[45%] order-1 md:order-3 text-right relative z-10">
        <motion.h2 
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-display font-semibold text-[48px] md:text-[80px] lg:text-[100px] leading-[1.05] tracking-tight whitespace-pre-line"
          style={{ color: item.textColor }}
        >
          {item.title}
        </motion.h2>
      </div>
    </div>
  );
}
