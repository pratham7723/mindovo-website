"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { Float, Center, Sparkles } from "@react-three/drei";

function Scene() {
  const { viewport } = useThree();
  const puzzleBoxRef = useRef<THREE.Mesh>(null);
  const cardBoxRef = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  // Mouse tracking listener
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates to [-1, 1]
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Smooth tilt effect based on mouse movement
    if (puzzleBoxRef.current) {
      puzzleBoxRef.current.rotation.y = THREE.MathUtils.lerp(
        puzzleBoxRef.current.rotation.y,
        mouse.x * 0.4 + t * 0.15,
        0.05
      );
      puzzleBoxRef.current.rotation.x = THREE.MathUtils.lerp(
        puzzleBoxRef.current.rotation.x,
        -mouse.y * 0.3 + 0.2,
        0.05
      );
    }

    if (cardBoxRef.current) {
      cardBoxRef.current.rotation.y = THREE.MathUtils.lerp(
        cardBoxRef.current.rotation.y,
        mouse.x * 0.4 - t * 0.12 - 0.5,
        0.05
      );
      cardBoxRef.current.rotation.x = THREE.MathUtils.lerp(
        cardBoxRef.current.rotation.x,
        mouse.y * 0.3 - 0.1,
        0.05
      );
    }

    // Dynamic light tracking mouse pointer
    if (lightRef.current) {
      lightRef.current.position.x = THREE.MathUtils.lerp(
        lightRef.current.position.x,
        mouse.x * 5,
        0.1
      );
      lightRef.current.position.y = THREE.MathUtils.lerp(
        lightRef.current.position.y,
        mouse.y * 5,
        0.1
      );
    }
  });

  return (
    <>
      {/* Cinematic Studio Lighting */}
      <ambientLight intensity={0.7} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
      <pointLight ref={lightRef} position={[0, 0, 5]} intensity={2} color="#F7F3EB" />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#1E40AF" />
      <pointLight position={[10, -10, 5]} intensity={0.8} color="#991B1B" />

      {/* Sparks/Dust particles for atmospheric depth */}
      <Sparkles count={40} scale={6} size={2} speed={0.4} color="#C2410C" />

      {/* Floating 3D Products */}
      <Center>
        {/* Mindovo Jigsaw Puzzle Box (Landscape Flat Layout) */}
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.6} position={[-1.2, 0.3, 0]}>
          <mesh ref={puzzleBoxRef} castShadow receiveShadow>
            <boxGeometry args={[2.5, 1.8, 0.32]} />
            <meshStandardMaterial
              color="#1E40AF"
              roughness={0.2}
              metalness={0.1}
            />
            {/* Inner Details / Label */}
            <mesh position={[0, 0, 0.161]}>
              <boxGeometry args={[2.1, 1.4, 0.01]} />
              <meshStandardMaterial
                color="#0C0A09"
                roughness={0.4}
                metalness={0.8}
                emissive="#1E40AF"
                emissiveIntensity={0.1}
              />
            </mesh>
            {/* Gold foil outline trim */}
            <mesh position={[0, 0, 0.162]}>
              <boxGeometry args={[2.2, 1.5, 0.002]} />
              <meshStandardMaterial color="#CA8A04" roughness={0.1} metalness={0.9} />
            </mesh>
          </mesh>
        </Float>

        {/* Bollywood Battle Card Game - Fanned Cards representing card decks */}
        <Float speed={2.5} rotationIntensity={0.6} floatIntensity={0.8} position={[1.4, -0.4, 0.5]}>
          <group ref={cardBoxRef}>
            {/* Card 1 (Back Left) */}
            <mesh position={[-0.2, 0, -0.1]} rotation={[0, 0, -0.15]} castShadow>
              <boxGeometry args={[1.2, 1.8, 0.02]} />
              <meshStandardMaterial color="#991B1B" roughness={0.3} metalness={0.1} />
              {/* Inner movie card borders */}
              <mesh position={[0, 0, 0.011]}>
                <boxGeometry args={[1.0, 1.6, 0.001]} />
                <meshStandardMaterial color="#111111" roughness={0.5} />
              </mesh>
            </mesh>

            {/* Card 2 (Back Right) */}
            <mesh position={[0.2, 0, -0.05]} rotation={[0, 0, 0.15]} castShadow>
              <boxGeometry args={[1.2, 1.8, 0.02]} />
              <meshStandardMaterial color="#991B1B" roughness={0.3} metalness={0.1} />
              {/* Gold border */}
              <mesh position={[0, 0, 0.011]}>
                <boxGeometry args={[1.0, 1.6, 0.001]} />
                <meshStandardMaterial color="#CA8A04" roughness={0.2} metalness={0.8} />
              </mesh>
            </mesh>

            {/* Card 3 (Featured Front Center) */}
            <mesh position={[0, 0, 0.1]} rotation={[0, 0, -0.02]} castShadow>
              <boxGeometry args={[1.2, 1.8, 0.02]} />
              <meshStandardMaterial color="#FAF8F5" roughness={0.4} />
              {/* Gold foil trim */}
              <mesh position={[0, 0, 0.011]}>
                <boxGeometry args={[1.1, 1.7, 0.002]} />
                <meshStandardMaterial color="#CA8A04" roughness={0.1} metalness={0.9} />
              </mesh>
              {/* Slate printed front */}
              <mesh position={[0, 0, 0.012]}>
                <boxGeometry args={[1.0, 1.6, 0.001]} />
                <meshStandardMaterial color="#0C0A09" roughness={0.5} />
              </mesh>
            </mesh>
          </group>
        </Float>
      </Center>

      {/* Floating ambient puzzle elements in background */}
      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={1.5} position={[-3, 2, -2]}>
        <mesh>
          <torusGeometry args={[0.3, 0.1, 8, 24]} />
          <meshStandardMaterial color="#065F46" opacity={0.6} transparent roughness={0.1} />
        </mesh>
      </Float>

      <Float speed={1.8} rotationIntensity={2} floatIntensity={2} position={[3, 2.5, -3]}>
        <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
          <boxGeometry args={[0.3, 0.3, 0.3]} />
          <meshStandardMaterial color="#C2410C" opacity={0.5} transparent roughness={0.2} />
        </mesh>
      </Float>

      <Float speed={1.2} rotationIntensity={1} floatIntensity={1.2} position={[0, -2, -1]}>
        <mesh>
          <octahedronGeometry args={[0.4]} />
          <meshStandardMaterial color="#1E40AF" opacity={0.4} transparent roughness={0.3} />
        </mesh>
      </Float>
    </>
  );
}

export default function HeroCanvas() {
  return (
    <div className="w-full h-full min-h-[450px] md:min-h-[600px] select-none">
      <Canvas
        shadows
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 5.5], fov: 50 }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
