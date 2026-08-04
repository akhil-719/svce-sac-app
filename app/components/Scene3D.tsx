"use client";

/**
 * Scene3D — WebGL crystal/torus-knot scene for the intro loader.
 *
 * Why this file exists on its own:
 * React Three Fiber's <Canvas> touches the WebGL context as soon as it
 * mounts, which Next.js can't render on the server. We isolate it here so
 * IntroLoader.tsx can lazy-load it with `ssr: false` and never trip a
 * hydration mismatch.
 */

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment } from "@react-three/drei";
import * as THREE from "three";

// Brand palette pulled from IntroLoader's gradients (amber -> pink -> purple)
const CRYSTAL_COLOR = "#c084fc"; // purple-400
const ACCENT_COLOR = "#f472b6"; // pink-400
const GLOW_COLOR = "#fbbf24"; // amber-400

function TorusKnot() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.15;
    ref.current.rotation.y += delta * 0.22;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={ref} scale={1.15}>
        <torusKnotGeometry args={[1, 0.32, 220, 32]} />
        <MeshDistortMaterial
          color={CRYSTAL_COLOR}
          roughness={0.15}
          metalness={0.4}
          distort={0.25}
          speed={1.5}
          emissive={ACCENT_COLOR}
          emissiveIntensity={0.15}
        />
      </mesh>
    </Float>
  );
}

function Crystals() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.08;
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={1} floatIntensity={2} position={[-2.4, 0.8, -1]}>
        <mesh scale={0.4}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color={ACCENT_COLOR} roughness={0.2} metalness={0.6} />
        </mesh>
      </Float>
      <Float speed={1.6} rotationIntensity={1.2} floatIntensity={1.6} position={[2.2, -0.6, -0.8]}>
        <mesh scale={0.3}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color={GLOW_COLOR} roughness={0.25} metalness={0.5} />
        </mesh>
      </Float>
      <Float speed={1.8} rotationIntensity={0.9} floatIntensity={1.4} position={[1.6, 1.4, -1.2]}>
        <mesh scale={0.22}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color={CRYSTAL_COLOR} roughness={0.2} metalness={0.6} />
        </mesh>
      </Float>
    </group>
  );
}

export default function Scene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.75]}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 3, 4]} intensity={40} color={GLOW_COLOR} />
      <pointLight position={[-4, -2, 2]} intensity={25} color={ACCENT_COLOR} />

      <Suspense fallback={null}>
        <TorusKnot />
        <Crystals />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}