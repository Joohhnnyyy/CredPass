"use client";

import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, Text, Plane, Environment, useTexture } from "@react-three/drei";
import { useSpring, a } from "@react-spring/three";
import { useRef, useState, Suspense } from "react";

export interface PassportCardProps {
  name?: string;
  nationality?: string;
  dob?: string;
  number?: string;
}

function PassportMesh({ 
  name = "TRUST HOLDER", 
  nationality = "TRUST REGION", 
  dob = "01 JAN 1990", 
  number = "CP-7X92-K4A1" 
}: PassportCardProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [open, setOpen] = useState(false);

  // Load textures safely
  // Removed external textures to prevent loading errors
  // const guilloche = useTexture("https://raw.githubusercontent.com/pmndrs/drei-assets/456060a26bbeb8fdf95809f80072ac7c7bca37a7/textures/wood/roughness.jpg"); 
  // const photo = useTexture("https://i.pravatar.cc/512?img=12");

  const { hinge } = useSpring({
    hinge: open ? -Math.PI / 1.55 : 0,
    config: { tension: 260, friction: 32 },
  });

  useFrame(({ pointer }) => {
    if (!groupRef.current || open) return;
    groupRef.current.rotation.x = pointer.y * 0.25;
    groupRef.current.rotation.y = pointer.x * 0.35;
  });

  return (
    <a.group ref={groupRef} scale={[0.7, 0.7, 0.7]} onClick={() => setOpen(!open)}>
      {/* ================= BACK COVER ================= */}
      <RoundedBox args={[2.45, 3.45, 0.14]} radius={0.16} position={[0, 0, -0.08]}>
        <meshPhysicalMaterial
          color="#0a1120"
          roughness={0.75}
          metalness={0.15}
          clearcoat={0.4}
        />
      </RoundedBox>

      {/* ================= PAGE STACK ================= */}
      {[...Array(16)].map((_, i) => (
        <mesh key={i} position={[0.035, 0, -0.02 - i * 0.004]}>
          <boxGeometry args={[2.32, 3.28, 0.01]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.9} />
        </mesh>
      ))}

      {/* ================= DATA PAGE ================= */} 
      <group position={[0.045, 0, 0.02]}> 
      
        {/* ===== BASE PAPER ===== */} 
        <RoundedBox args={[2.28, 3.24, 0.02]} radius={0.14}>
          <meshStandardMaterial color="#ffffff" roughness={0.95} /> 
        </RoundedBox>
      
        {/* Subtle security tint */} 
        <RoundedBox position={[0, 0, 0.011]} args={[2.22, 3.18, 0.004]} radius={0.12}>
          <meshStandardMaterial transparent opacity={0.06} color="#94a3b8" /> 
        </RoundedBox>
      
        {/* ===== HEADER ===== */} 
        <Text 
          position={[0, 1.38, 0.02]} 
          fontSize={0.085} 
          color="#020617" 
          anchorX="center" 
          letterSpacing={0.05} 
        > 
          CREDPASS TRUST PASSPORT 
        </Text> 
      
        {/* ===== LEFT COLUMN ===== */} 
        <group position={[-0.82, 0.55, 0]}> 
      
          {/* Photo */} 
          <RoundedBox args={[0.62, 0.82, 0.02]} position={[0, 0.18, 0.01]} radius={0.08}> 
            <meshStandardMaterial color="#cbd5e1" /> 
          </RoundedBox>
      
          {/* Hologram overlay */} 
          <RoundedBox args={[0.62, 0.82, 0.01]} position={[0, 0.18, 0.022]} radius={0.08}> 
            <meshPhysicalMaterial 
              transparent 
              opacity={0.18} 
              color="#60a5fa" 
              metalness={1} 
              roughness={0.15} 
            /> 
          </RoundedBox>

          <group position={[0, 0.18, 0.02]}>
            <mesh>
              <boxGeometry args={[0.46, 0.66, 0.01]} />
              <meshStandardMaterial color="#e2e8f0" />
            </mesh>
            <Text
              position={[0, 0, 0.02]}
              fontSize={0.18}
              color="#0f172a"
              anchorX="center"
              anchorY="middle"
            >
              TH
            </Text>
          </group>
      
          {/* Verification seal */} 
          <mesh position={[0, -0.6, 0.03]}> 
            <circleGeometry args={[0.16, 48]} /> 
            <meshPhysicalMaterial 
              color="#16a34a" 
              metalness={0.9} 
              roughness={0.3} 
              emissive="#16a34a" 
              emissiveIntensity={0.25} 
            /> 
          </mesh> 
      
          <Text 
            position={[0, -0.85, 0.03]} 
            fontSize={0.045} 
            color="#166534" 
            anchorX="center" 
          > 
            CREDPASS ZKP VERIFIED 
          </Text> 
        </group> 
      
        {/* ===== RIGHT COLUMN ===== */} 
        <group position={[-0.1, 0.95, 0.02]}> 
      
          {/* Helper function style rows */} 
          {[ 
            ["TRUST HOLDER", name.toUpperCase()], 
            ["NATIONALITY", nationality.toUpperCase()], 
            ["DATE OF BIRTH", dob], 
            ["TRUST PASSPORT ID", number], 
            ["WALLET DID", "did:credpass:cp-main-01"], 
          ].map(([label, value], i) => ( 
            <group key={label} position={[0, -i * 0.23, 0]}> 
              <Text 
                fontSize={0.045} 
                color="#475569" 
                anchorX="left" 
                letterSpacing={0.08} 
              > 
                {label} 
              </Text> 
              <Text 
                position={[0, -0.075, 0]} 
                fontSize={0.075} 
                color="#020617" 
                anchorX="left" 
              > 
                {value} 
              </Text> 
            </group> 
          ))} 
        </group> 
      
        {/* ===== TRUST CERTIFICATION BLOCK ===== */} 
        <group position={[0, -0.62, 0]}> 
      
          {/* Block background */} 
          <RoundedBox args={[2.05, 0.6, 0.01]} position={[0, 0, 0.01]} radius={0.12}> 
            <meshStandardMaterial color="#f0fdf4" /> 
          </RoundedBox> 
      
          <Text 
            position={[-0.95, 0.18, 0.02]} 
            fontSize={0.05} 
            color="#166534" 
            anchorX="left" 
            letterSpacing={0.08} 
          > 
            TRUST CERTIFICATION 
          </Text> 
      
          <Text position={[-0.95, 0.02, 0.02]} fontSize={0.06} color="#166534" anchorX="left"> 
            Global CredPass Trust Score: 782 / 900 
          </Text> 
      
          <Text position={[-0.95, -0.14, 0.02]} fontSize={0.055} color="#166534" anchorX="left"> 
            Repayment Reliability: 96.4% 
          </Text> 
      
          <Text position={[-0.95, -0.3, 0.02]} fontSize={0.055} color="#166534" anchorX="left"> 
            Trust Tier: LOW RISK 
          </Text> 
        </group> 
      
        {/* ===== MRZ ZONE ===== */} 
        <group position={[0, -1.22, 0]}> 
      
          <RoundedBox args={[2.28, 0.42, 0.01]} position={[0, 0, 0.01]} radius={0.12}> 
            <meshStandardMaterial color="#e5e7eb" /> 
          </RoundedBox> 
      
          <Text 
            position={[-1.12, 0.09, 0.02]} 
            fontSize={0.085} 
            color="#020617" 
            anchorX="left" 
            maxWidth={2.2} 
          > 
            CP&lt;CREDPASS{name.replace(" ", "&lt;&lt;").toUpperCase()}&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt; 
            {"\n"} 
            {number}CPASS9001019M3001012&lt;&lt;&lt;TRUST04 
          </Text> 
        </group> 
      
      </group>

      {/* ================= FRONT COVER ================= */}
      <a.group rotation-y={hinge} position={[-1.225, 0, 0]}>
        <group position={[1.225, 0, 0.08]}>
          <RoundedBox args={[2.45, 3.45, 0.14]} radius={0.16}>
            <meshPhysicalMaterial
              color="#0a1120"
              roughness={0.6}
              metalness={0.3}
              clearcoat={1}
              clearcoatRoughness={0.2}
            />
          </RoundedBox>

          {/* Gold Foil Title */}
          <Text position={[0, 0.85, 0.08]} fontSize={0.24} color="#d4af37">
            CREDIT PASS
          </Text>

          <Text position={[0, 0.45, 0.08]} fontSize={0.14} color="#ffd700">
            GLOBAL CREDIT PASSPORT
          </Text>

          {/* Gold Emblem */}
          <mesh position={[0, -0.4, 0.08]}>
            <circleGeometry args={[0.35, 64]} />
            <meshPhysicalMaterial
              color="#ffd700"
              metalness={1}
              roughness={0.25}
            />
          </mesh>

          {/* Spine Highlight */}
          <mesh position={[-1.18, 0, 0]}>
            <boxGeometry args={[0.04, 3.45, 0.15]} />
            <meshStandardMaterial
              color="#ffffff"
              transparent
              opacity={0.12}
            />
          </mesh>
        </group>
      </a.group>
    </a.group>
  );
}

export function PassportCard(props: PassportCardProps) {
  return (
    <div className="w-[820px] h-[920px]">
      <Canvas camera={{ position: [0, 0, 11], fov: 32 }}>
        <ambientLight intensity={0.8} color="#e5edf7" />
        <directionalLight position={[6, 8, 10]} intensity={0.9} color="#ffffff" />
        <spotLight position={[-6, 7, 4]} intensity={0.4} angle={0.45} penumbra={0.6} color="#e0e7ff" />
        <Suspense fallback={<mesh><boxGeometry /><meshStandardMaterial color="red" /></mesh>}>
          <Environment preset="apartment" />
          <PassportMesh {...props} />
        </Suspense>
      </Canvas>
    </div>
  );
}
