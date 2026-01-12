"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence, useSpring } from "framer-motion";

interface HorizontalScrollProps {
  children: React.ReactNode;
  sectionsCount: number;
  data?: { number: string }[];
}

export default function HorizontalScroll({ children, sectionsCount, data }: HorizontalScrollProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 35,
    mass: 1,
    restDelta: 0.001
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Calculate index based on scroll progress (0 to 1)
    // 0 -> index 0
    // 1 -> index sectionsCount - 1
    // We want discrete steps
    const index = Math.min(
      Math.floor(latest * (sectionsCount - 0.1)), // Use slightly less than 1 to catch the last item
      sectionsCount - 1
    );
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  });

  const translateX = useTransform(
    smoothProgress, 
    [0, 1], 
    ["0vw", `-${(sectionsCount - 1) * 100}vw`]
  );

  return (
    <section ref={targetRef} style={{ height: `${sectionsCount * 100}vh` }} className="relative bg-white">
      {/* Invisible Snap Points */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex flex-col">
        {Array.from({ length: sectionsCount }).map((_, i) => (
          <div key={i} className="h-screen w-full snap-start" />
        ))}
      </div>

      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* Global Fixed Number Counter */}
          {data && data[activeIndex] && (
            <div className="absolute top-10 left-10 z-50 pointer-events-none">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={activeIndex}
                  initial={{ y: "100%", clipPath: "inset(0 0 100% 0)" }}
                  animate={{ y: 0, clipPath: "inset(0 0 0% 0)" }}
                  exit={{ y: "-100%", clipPath: "inset(100% 0 0 0)" }}
                  transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
                  className="huge-number select-none text-black"
                  style={{ fontSize: "16rem", lineHeight: 1 }}
                >
                  {data[activeIndex].number}
                </motion.div>
              </AnimatePresence>
            </div>
          )}

          <motion.div style={{ x: translateX }} className="flex">
            {children}
          </motion.div>
        </div>
      </section>
    );
}
