"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { cn } from "@/lib/utils";

function NeuralNetwork() {
  const ref = useRef<THREE.Points>(null!);
  
  const positions = useMemo(() => {
    const count = 2000;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#a0a0a0"
          size={0.02}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

interface HeroProps {
  children?: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
  badgeText?: string;
  badgeLabel?: string;
  ctaButtons?: Array<{ text: string; href: string; primary?: boolean }>;
  microDetails?: string[];
}

export default function Hero({ children, className, ...props }: HeroProps) {
  return (
    <div className={cn("relative w-full h-full overflow-hidden bg-black", className)}>
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <color attach="background" args={["#000000"]} />
          <NeuralNetwork />
        </Canvas>
      </div>
      <div className="relative z-10 w-full h-full pointer-events-none">
        <div className="pointer-events-auto w-full h-full">
           {children}
        </div>
      </div>
    </div>
  );
}
