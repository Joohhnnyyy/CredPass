"use client";
import React from "react";
import { motion } from "framer-motion";

export function BubbleVis() {
  return (
    <div className="relative w-full h-[400px] flex items-center justify-center overflow-hidden">
      {/* Green Bubble */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute left-[10%] w-[320px] h-[320px] rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-center shadow-[0_0_60px_rgba(34,197,94,0.4)] z-10 mix-blend-screen"
      >
        <div className="bg-black/20 backdrop-blur-sm px-6 py-4 rounded-xl border border-white/10">
          <div className="text-[10px] uppercase tracking-wider font-semibold text-black/60 mb-1">Monitor Takedown</div>
          <div className="text-4xl font-bold text-black/80">1,954</div>
        </div>
      </motion.div>

      {/* Orange Bubble */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute right-[10%] w-[380px] h-[380px] rounded-full bg-gradient-to-br from-orange-400 via-red-400 to-pink-500 flex items-center justify-center text-center shadow-[0_0_60px_rgba(249,115,22,0.4)] z-20 mix-blend-screen"
      >
        <div className="bg-black/20 backdrop-blur-sm px-6 py-4 rounded-xl border border-white/10">
          <div className="text-[10px] uppercase tracking-wider font-semibold text-black/60 mb-1">Live Detections</div>
          <div className="text-4xl font-bold text-black/80">2,390</div>
        </div>
      </motion.div>

      {/* Bottom Purple Bubble (Partial) */}
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-gradient-to-t from-purple-600 to-pink-400 blur-md opacity-80 z-0"
      />
    </div>
  );
}
