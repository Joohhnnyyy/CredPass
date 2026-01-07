"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface HorizontalScrollProps {
  children: React.ReactNode;
  sectionsCount: number;
}

export default function HorizontalScroll({ children, sectionsCount }: HorizontalScrollProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const translateX = useTransform(
    scrollYProgress, 
    [0, 1], 
    ["0vw", `-${(sectionsCount - 1) * 100}vw`]
  );

    return (
      <section ref={targetRef} style={{ height: `${sectionsCount * 100}vh` }} className="relative bg-white">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div style={{ x: translateX }} className="flex">
            {children}
          </motion.div>
        </div>
      </section>
    );
}
