"use client";

import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, Environment, Text } from "@react-three/drei";
import { useSpring, a } from "@react-spring/three";
import { useRef, useState, Suspense } from "react";

interface CreditCardProps {
  brand?: string;
  variant?: string;
  cardHolder?: string;
  cardNumber?: string;
  expiry?: string;
  cvv?: string;
  className?: string;
}

function EMVChip() {
  const goldMaterial = (
    <meshPhysicalMaterial
      color="#f5c86b"
      metalness={1}
      roughness={0.25}
      clearcoat={0.4}
      clearcoatRoughness={0.2}
    />
  );

  return (
    <group position={[-1.1, 0.3, 0.046]}>
      {/* Base chip body */}
      <RoundedBox args={[0.42, 0.32, 0.02]} radius={0.04} smoothness={4}>
        {goldMaterial}
      </RoundedBox>

      {/* Inner border */}
      <RoundedBox
        args={[0.36, 0.26, 0.005]}
        radius={0.03}
        smoothness={4}
        position={[0, 0, 0.012]}
      >
        <meshStandardMaterial
          color="#eab308"
          metalness={0.9}
          roughness={0.3}
        />
      </RoundedBox>

      {/* Vertical contact lines */}
      {[-0.1, 0, 0.1].map((x, i) => (
        <mesh key={i} position={[x, 0, 0.015]}>
          <boxGeometry args={[0.03, 0.22, 0.002]} />
          <meshStandardMaterial
            color="#d97706"
            metalness={0.8}
            roughness={0.35}
          />
        </mesh>
      ))}

      {/* Horizontal contact line */}
      <mesh position={[0, 0, 0.016]}>
        <boxGeometry args={[0.26, 0.03, 0.002]} />
        <meshStandardMaterial
          color="#d97706"
          metalness={0.8}
          roughness={0.35}
        />
      </mesh>

      {/* Center contact square */}
      <mesh position={[0, 0, 0.018]}>
        <boxGeometry args={[0.07, 0.07, 0.003]} />
        <meshStandardMaterial
          color="#ca8a04"
          metalness={1}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}

function CardMesh({
  brand = "CredPass",
  variant = "black",
  cardHolder = "TRUST HOLDER",
  cardNumber = "CP-7820-9003-2410",
  expiry = "VALID THRU 12/25",
  cvv = "TRUST-123",
}: CreditCardProps) {
  const ref = useRef<THREE.Group>(null);

  const [hovered, setHovered] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getVariantColor = (v: string) => {
    switch (v) {
      case "platinum":
        return "#e2e8f0";
      case "rose-gold":
        return "#e11d48";
      case "gradient":
        return "#3b82f6";
      default:
        return "#0a0a0a";
    }
  };

  const baseColor = getVariantColor(variant);
  const textColor = variant === "platinum" ? "#000" : "#fff";

  const [{ rotX, rotY, scale, flipY }, api] = useSpring(() => ({
    rotX: 0,
    rotY: 0,
    flipY: 0,
    scale: 1,
    config: { mass: 4, tension: 320, friction: 32 },
  }));

  useFrame(({ pointer }) => {
    if (!hovered || flipped) return;

    api.start({
      rotX: pointer.y * 0.3,
      rotY: pointer.x * 0.5,
    });
  });

  return (
    <a.group
      ref={ref}
      rotation-x={rotX}
      rotation-y={rotY}
      scale={scale}
      onPointerEnter={() => {
        setHovered(true);
        api.start({ scale: 1.05 });

        if (settleTimer.current) {
          clearTimeout(settleTimer.current);
          settleTimer.current = null;
        }
      }}
      onPointerLeave={() => {
        setHovered(false);
        api.start({ scale: 1 });

        settleTimer.current = setTimeout(() => {
          api.start({
            rotX: 0,
            rotY: 0,
          });
        }, 700);
      }}
      onClick={() => {
        setFlipped((f) => !f);
        api.start({ flipY: flipped ? 0 : Math.PI });
      }}
    >
      <a.group rotation-y={flipY}>
        <RoundedBox args={[3.4, 2.2, 0.08]} radius={0.15}>
          <meshPhysicalMaterial
            color={baseColor}
            metalness={0.9}
            roughness={0.2}
            clearcoat={1}
          />
        </RoundedBox>

        <mesh position={[0, 0, 0.045]}>
          <planeGeometry args={[3.2, 2]} />
          <meshStandardMaterial color={baseColor} metalness={0.8} />

          <Text position={[1.2, 0.7, 0.001]} fontSize={0.18} color={textColor} anchorX="right">
            CREDPASS
          </Text>

          <Text position={[1.2, 0.5, 0.001]} fontSize={0.08} color={textColor} anchorX="right">
            TRUST CARD
          </Text>

          <EMVChip />

          <Text position={[-1.3, 0.05, 0.001]} fontSize={0.08} color={textColor} anchorX="left">
            TRUST PASSPORT ID
          </Text>

          <Text position={[-1.3, -0.1, 0.001]} fontSize={0.22} color={textColor} anchorX="left">
            {cardNumber}
          </Text>

          <Text position={[-1.3, -0.55, 0.001]} fontSize={0.08} color={textColor} anchorX="left">
            TRUST HOLDER
          </Text>

          <Text position={[-1.3, -0.7, 0.001]} fontSize={0.12} color={textColor} anchorX="left">
            {cardHolder.toUpperCase()}
          </Text>

          <Text position={[1.3, -0.55, 0.001]} fontSize={0.08} color={textColor} anchorX="right">
            TRUST VALIDITY
          </Text>

          <Text position={[1.3, -0.7, 0.001]} fontSize={0.12} color={textColor} anchorX="right">
            {expiry}
          </Text>
        </mesh>

        <mesh position={[0, 0, -0.045]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[3.2, 2]} />
          <meshStandardMaterial color={baseColor} metalness={0.7} />

          <mesh position={[0, 0.5, 0.001]}>
            <planeGeometry args={[3.4, 0.4]} />
            <meshBasicMaterial color="#000" />
          </mesh>

          <mesh position={[0, 0, 0.001]}>
            <planeGeometry args={[2.5, 0.3]} />
            <meshBasicMaterial color="#fff" />
          </mesh>

          <Text position={[1, 0.1, 0.002]} fontSize={0.09} color="#000">
            CREDPASS TRUST TOKEN
          </Text>

          <Text position={[1, -0.05, 0.002]} fontSize={0.12} color="#000">
            {cvv}
          </Text>
        </mesh>
      </a.group>
    </a.group>
  );
}

export function CreditCard(props: CreditCardProps) {
  return (
    <div className="w-[320px] h-[220px]">
      <Canvas
        shadows
        camera={{ position: [0, 0, 6], fov: 40 }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1.2}
          castShadow
        />
        <spotLight
          position={[-5, 5, 5]}
          intensity={0.6}
          angle={0.4}
          penumbra={1}
        />

        <Suspense fallback={<mesh><boxGeometry /><meshStandardMaterial color="red" /></mesh>}>
          <Environment preset="studio" />
          <CardMesh {...props} />
        </Suspense>
      </Canvas>
    </div>
  );
}
