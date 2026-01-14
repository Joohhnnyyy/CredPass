"use client";

import React, { useRef } from "react";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { AuroraBackground } from "@/components/ui/aurora-background";
import WorldMap from "@/components/ui/world-map";
import ColorBends from "@/components/ColorBends";

interface FeatureSectionProps {
  item: {
    id: number;
    number: string;
    title: string;
    description: string;
    image?: string;
    hasMap?: boolean;
    bgColor: string;
    textColor: string;
    accentColor: string;
  };
}

export default function FeatureSection({ item }: FeatureSectionProps) {
  const touchStartY = useRef<number | null>(null);
  const wheelAccumulator = useRef(0);
  const isAurora = item.id === 1;

  const content = (
    <>
      {/* Column 1: Description & Explore (Left on Desktop, Swapped to Right for Page 3, 4, 7, 8) */}
      <div className={`w-full md:w-[30%] order-2 ${[3, 4, 7, 8].includes(item.id) ? "md:order-3" : "md:order-1"} flex flex-col justify-center items-center h-full relative z-10`}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <p 
            className="text-[10px] leading-[1.6] mb-6 max-w-[192px] uppercase tracking-wide font-medium"
            style={{ color: item.textColor === "#FFFFFF" ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)" }}
          >
            {item.description}
          </p>
          
          <a 
            href={`#modal-popup-${item.id}`}
            className="group block relative w-[140px] h-[140px] bg-white rounded-[32px] shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
          >
            <span 
              className="absolute top-6 left-6 text-[12px] tracking-widest font-semibold text-black"
            >
              EXPLORE
            </span>
            <div 
              className="absolute bottom-6 right-6 w-[40px] h-[40px] bg-black text-white rounded-full flex items-center justify-center transition-transform duration-500 group-hover:rotate-90"
            >
              <Plus size={20} />
            </div>
          </a>
        </motion.div>
      </div>

      {/* Column 2: Visual Center (3D Asset) */}
      <div className="flex-1 order-3 md:order-2 flex items-center justify-center relative z-20 h-full w-full max-w-[500px] md:max-w-none">
        {item.image && !item.hasMap && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative w-full max-w-[400px] aspect-square"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-contain"
            />
          </motion.div>
        )}
      </div>

      {/* Column 3: Feature Title (Right on Desktop, Swapped to Left for Page 3, 4, 7, 8) */}
      <div className={`w-full md:w-[45%] order-1 ${[3, 4, 7, 8].includes(item.id) ? "md:order-1 items-start text-left" : "md:order-3 items-end text-right"} flex flex-col justify-end h-full relative z-10`}>
        <motion.h2 
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-[family-name:var(--font-pp-neue-montreal)] font-normal text-[24px] md:text-[40px] lg:text-[56px] leading-[1.05] tracking-tight whitespace-pre-line"
          style={{ color: item.textColor }}
        >
          {item.title}
        </motion.h2>

      </div>

      {item.hasMap && (
        <div className="absolute bottom-[5%] md:bottom-[150px] left-0 right-0 md:left-auto md:right-[100px] mx-auto md:mx-0 w-full md:w-[900px] h-[300px] md:h-[450px] z-0 opacity-50 pointer-events-none">
          <WorldMap
            lineColor={item.accentColor}
            dots={[
              {
                start: {
                  lat: 64.2008,
                  lng: -149.4937,
                }, // Alaska (Fairbanks)
                end: {
                  lat: 34.0522,
                  lng: -118.2437,
                }, // Los Angeles
              },
              {
                start: { lat: 64.2008, lng: -149.4937 }, // Alaska (Fairbanks)
                end: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
              },
              {
                start: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
                end: { lat: 38.7223, lng: -9.1393 }, // Lisbon
              },
              {
                start: { lat: 51.5074, lng: -0.1278 }, // London
                end: { lat: 28.6139, lng: 77.209 }, // New Delhi
              },
              {
                start: { lat: 28.6139, lng: 77.209 }, // New Delhi
                end: { lat: 43.1332, lng: 131.9113 }, // Vladivostok
              },
              {
                start: { lat: 28.6139, lng: 77.209 }, // New Delhi
                end: { lat: -1.2921, lng: 36.8219 }, // Nairobi
              },
            ]}
          />
        </div>
      )}
    </>
  );

  const containerClasses = "relative w-screen h-screen flex flex-col md:flex-row items-center justify-between px-[20px] lg:px-[40px] pt-[100px] md:pt-[120px] lg:pt-[100px] pb-[60px] flex-shrink-0 overflow-hidden transition-colors duration-1000";
  
  const handleWheel = (e: React.WheelEvent) => {
    if (item.id !== 1) return;
    
    // Reset accumulator if scrolling in opposite direction
    if (e.deltaY >= 0) {
      wheelAccumulator.current = 0;
      return;
    }

    wheelAccumulator.current += e.deltaY;

    if (wheelAccumulator.current < -50) {
      // e.preventDefault(); // Removed because it might interfere with passive event listeners in some browsers, but React's synthetic event might handle it.
      // e.stopPropagation();
      window.dispatchEvent(new Event("preloader:show"));
      wheelAccumulator.current = 0;
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (item.id !== 1) return;
    touchStartY.current = e.changedTouches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (item.id !== 1) return;
    const endY = e.changedTouches[0].clientY;
    if (touchStartY.current !== null && endY - touchStartY.current > 30) {
      // e.preventDefault();
      // e.stopPropagation();
      window.dispatchEvent(new Event("preloader:show"));
    }
    touchStartY.current = null;
  };

  if (isAurora) {
    return (
      <div className="w-screen h-screen flex-shrink-0" onWheel={handleWheel} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        <AuroraBackground className={containerClasses}>
          {content}
          {/* Gradient Blend to Page 2 */}
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-transparent to-[#E5E7EB] z-10 pointer-events-none" />
        </AuroraBackground>
      </div>
    );
  }

  return (
    <div 
      className={containerClasses}
      style={
        item.id === 3
          ? {
              backgroundColor: "#aca0b8",
            }
          : item.id === 4
          ? {
              backgroundColor: "#c3cbee",
            }
          : item.id === 5
          ? {
              backgroundColor: "#ffccfe",
            }
          : item.id === 7
          ? {
              backgroundColor: "#92bba8",
            }
          : item.id === 8
          ? {
              backgroundColor: "#b4e7e8",
            }
          : item.id === 9
          ? {
              backgroundColor: "#c7d8f1",
            }
          : item.id === 10
          ? {
              backgroundColor: "#f8cdfe",
            }
          : { backgroundColor: item.bgColor }
      }
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {item.id === 3 && (
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <ColorBends 
            className="w-full h-full opacity-70"
            rotation={45} 
            speed={0.2} 
            colors={["#e392fe","#c0c0c0","#606060","#e392fe","#e392fe","#d357fe"]} 
            transparent 
            autoRotate={0.6} 
            scale={3} 
            frequency={1} 
            warpStrength={1} 
            mouseInfluence={0.1} 
            parallax={0.8} 
            noise={0.05} 
          /> 
        </div>
      )}
      {item.id === 4 && (
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <ColorBends 
            className="w-full h-full opacity-80"
            rotation={50} 
            speed={0.2} 
            colors={["#99a7cd","#001cce","#909dc6","#63a1cf","#bac2ea","#bdc5ea"]} 
            transparent 
            autoRotate={0.6} 
            scale={3} 
            frequency={1} 
            warpStrength={1} 
            mouseInfluence={0.1} 
            parallax={0.8} 
            noise={0.05} 
          /> 
        </div>
      )}
      {item.id === 5 && (
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <ColorBends 
            className="w-full h-full"
            rotation={55} 
            speed={0.2} 
            colors={["#845cd0","#990e0e","#875cab","#f974c8","#a16fa3","#b27dab"]} 
            transparent 
            autoRotate={0.6} 
            scale={3} 
            frequency={1} 
            warpStrength={1} 
            mouseInfluence={0.1} 
            parallax={0.8} 
            noise={0.05} 
          /> 
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-[#E5E7EB] to-transparent z-10 pointer-events-none" />
        </div>
      )}
      {item.id === 2 && (
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <ColorBends 
            className="w-full h-full"
            rotation={45} 
            speed={0.2} 
            colors={["#ffffff","#919191","#444444"]} 
            transparent 
            autoRotate={0.6} 
            scale={3} 
            frequency={1} 
            warpStrength={1} 
            mouseInfluence={0.1} 
            parallax={0.8} 
            noise={0.05} 
          /> 
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-[#E5E7EB] to-transparent z-10 pointer-events-none" />
        </div>
      )}
      {item.id === 6 && (
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <ColorBends 
            className="w-full h-full"
            rotation={45} 
            speed={0.2} 
            colors={["#cd9ace","#003fad","#0061b9","#ff3456","#668d3f","#a877a8"]} 
            transparent 
            autoRotate={0.6} 
            scale={3} 
            frequency={1} 
            warpStrength={1} 
            mouseInfluence={0.1} 
            parallax={0.8} 
            noise={0.05} 
          /> 
        </div>
      )}
      {item.id === 7 && (
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <ColorBends 
            className="w-full h-full"
            rotation={45} 
            speed={0.2} 
            colors={["#76a48b","#00ef04","#ff0000","#499465","#668d3f","#489966"]} 
            transparent 
            autoRotate={0.6} 
            scale={3} 
            frequency={1} 
            warpStrength={1} 
            mouseInfluence={0.1} 
            parallax={0.8} 
            noise={0.05} 
          /> 
        </div>
      )}
      {item.id === 8 && (
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <ColorBends 
            className="w-full h-full"
            rotation={45} 
            speed={0.2} 
            colors={["#76a48b","#0058ff","#1400ff","#d55600","#5cd7ff","#b0eaff"]} 
            transparent 
            autoRotate={0.6} 
            scale={3} 
            frequency={1} 
            warpStrength={1} 
            mouseInfluence={0.1} 
            parallax={0.8} 
            noise={0.05} 
          /> 
        </div>
      )}
      {item.id === 9 && (
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <ColorBends 
            className="w-full h-full"
            rotation={45} 
            speed={0.2} 
            colors={["#aacaec","#4a7ec8","#00c4d5","#919500","#5cd7ff","#e6ecff"]} 
            transparent 
            autoRotate={0.6} 
            scale={3} 
            frequency={1} 
            warpStrength={1} 
            mouseInfluence={0.1} 
            parallax={0.8} 
            noise={0.05} 
          /> 
        </div>
      )}
      {item.id === 10 && (
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <ColorBends 
            className="w-full h-full"
            rotation={45} 
            speed={0.2} 
            colors={["#d8b4e7","#6d002e","#2f57ac","#ebbef7","#9776a1","#dd0000"]} 
            transparent 
            autoRotate={0.6} 
            scale={3} 
            frequency={1} 
            warpStrength={1} 
            mouseInfluence={0.1} 
            parallax={0.8} 
            noise={0.05} 
          /> 
        </div>
      )}
      {content}
    </div>
  );
}
