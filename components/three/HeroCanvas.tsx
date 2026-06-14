"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useState, useEffect, useMemo } from "react";
import * as THREE from "three";
import { Float, Center, Sparkles } from "@react-three/drei";

// 1. Custom 3D Rounded Die Component with 21 Pips (Dots)
interface DieProps {
  color: string;
  pipColor: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale?: number;
}

function Die({ color, pipColor, position, rotation, scale = 1 }: DieProps) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      // Gentle constant tumble
      groupRef.current.rotation.x = rotation[0] + t * 0.2;
      groupRef.current.rotation.y = rotation[1] + t * 0.15;
      groupRef.current.rotation.z = rotation[2] + t * 0.1;
    }
  });

  const pipMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: pipColor,
    roughness: 0.2,
    metalness: 0.1
  }), [pipColor]);

  // Position coordinates for die faces (assuming box size is 0.8 x 0.8 x 0.8)
  const d = 0.402; // Offset from center for pips
  const r = 0.05;  // Sphere radius for pips

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Die body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial color={color} roughness={0.1} metalness={0.1} />
      </mesh>
      
      {/* Face 1 (Front: z = +d) */}
      <mesh position={[0, 0, d]} material={pipMaterial}>
        <sphereGeometry args={[r, 16, 16]} />
      </mesh>
      
      {/* Face 6 (Back: z = -d) */}
      <group position={[0, 0, -d]}>
        <mesh position={[-0.2, 0.2, 0]} material={pipMaterial}><sphereGeometry args={[r, 16, 16]} /></mesh>
        <mesh position={[-0.2, 0, 0]} material={pipMaterial}><sphereGeometry args={[r, 16, 16]} /></mesh>
        <mesh position={[-0.2, -0.2, 0]} material={pipMaterial}><sphereGeometry args={[r, 16, 16]} /></mesh>
        <mesh position={[0.2, 0.2, 0]} material={pipMaterial}><sphereGeometry args={[r, 16, 16]} /></mesh>
        <mesh position={[0.2, 0, 0]} material={pipMaterial}><sphereGeometry args={[r, 16, 16]} /></mesh>
        <mesh position={[0.2, -0.2, 0]} material={pipMaterial}><sphereGeometry args={[r, 16, 16]} /></mesh>
      </group>

      {/* Face 3 (Top: y = +d) */}
      <group position={[0, d, 0]}>
        <mesh position={[-0.2, 0, -0.2]} material={pipMaterial}><sphereGeometry args={[r, 16, 16]} /></mesh>
        <mesh position={[0, 0, 0]} material={pipMaterial}><sphereGeometry args={[r, 16, 16]} /></mesh>
        <mesh position={[0.2, 0, 0.2]} material={pipMaterial}><sphereGeometry args={[r, 16, 16]} /></mesh>
      </group>

      {/* Face 4 (Bottom: y = -d) */}
      <group position={[0, -d, 0]}>
        <mesh position={[-0.2, 0, -0.2]} material={pipMaterial}><sphereGeometry args={[r, 16, 16]} /></mesh>
        <mesh position={[-0.2, 0, 0.2]} material={pipMaterial}><sphereGeometry args={[r, 16, 16]} /></mesh>
        <mesh position={[0.2, 0, -0.2]} material={pipMaterial}><sphereGeometry args={[r, 16, 16]} /></mesh>
        <mesh position={[0.2, 0, 0.2]} material={pipMaterial}><sphereGeometry args={[r, 16, 16]} /></mesh>
      </group>

      {/* Face 2 (Left: x = -d) */}
      <group position={[-d, 0, 0]}>
        <mesh position={[0, -0.2, -0.2]} material={pipMaterial}><sphereGeometry args={[r, 16, 16]} /></mesh>
        <mesh position={[0, 0.2, 0.2]} material={pipMaterial}><sphereGeometry args={[r, 16, 16]} /></mesh>
      </group>

      {/* Face 5 (Right: x = +d) */}
      <group position={[d, 0, 0]}>
        <mesh position={[0, -0.2, -0.2]} material={pipMaterial}><sphereGeometry args={[r, 16, 16]} /></mesh>
        <mesh position={[0, 0.2, 0.2]} material={pipMaterial}><sphereGeometry args={[r, 16, 16]} /></mesh>
        <mesh position={[0, -0.2, 0.2]} material={pipMaterial}><sphereGeometry args={[r, 16, 16]} /></mesh>
        <mesh position={[0, 0.2, -0.2]} material={pipMaterial}><sphereGeometry args={[r, 16, 16]} /></mesh>
        <mesh position={[0, 0, 0]} material={pipMaterial}><sphereGeometry args={[r, 16, 16]} /></mesh>
      </group>
    </group>
  );
}

// 2. Custom Extruded 3D Meeple (Pawn) Component
interface MeepleProps {
  color: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale?: number;
}

function Meeple({ color, position, rotation, scale = 1 }: MeepleProps) {
  const shape = useMemo(() => {
    const meepleShape = new THREE.Shape();
    // Start at bottom left leg
    meepleShape.moveTo(-0.3, -0.45);
    meepleShape.lineTo(-0.15, -0.45);
    // Inner crotch
    meepleShape.lineTo(0, -0.15);
    // Right leg
    meepleShape.lineTo(0.15, -0.45);
    meepleShape.lineTo(0.3, -0.45);
    // Side torso
    meepleShape.lineTo(0.25, -0.1);
    // Right arm
    meepleShape.lineTo(0.5, -0.1);
    meepleShape.lineTo(0.5, 0.1);
    meepleShape.lineTo(0.22, 0.12);
    // Neck
    meepleShape.lineTo(0.14, 0.2);
    // Head (arc circle)
    meepleShape.absarc(0, 0.38, 0.2, 0, Math.PI * 2, false);
    // Left arm
    meepleShape.lineTo(-0.14, 0.2);
    meepleShape.lineTo(-0.22, 0.12);
    meepleShape.lineTo(-0.5, 0.1);
    meepleShape.lineTo(-0.5, -0.1);
    // Left torso
    meepleShape.lineTo(-0.25, -0.1);
    meepleShape.lineTo(-0.3, -0.45);
    return meepleShape;
  }, []);

  const extrudeSettings = useMemo(() => ({
    depth: 0.15,
    bevelEnabled: true,
    bevelSegments: 4,
    steps: 1,
    bevelSize: 0.02,
    bevelThickness: 0.02
  }), []);

  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = rotation[1] + Math.sin(t * 0.8) * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      <mesh castShadow receiveShadow>
        <extrudeGeometry args={[shape, extrudeSettings]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} />
      </mesh>
    </group>
  );
}

// 3. Custom 3D Rubik's-style Mind Puzzle Cube Component
interface RubiksCubeProps {
  position: [number, number, number];
  rotation: [number, number, number];
  scale?: number;
}

function RubiksCube({ position, rotation, scale = 1 }: RubiksCubeProps) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      // Gentle constant rotation
      groupRef.current.rotation.x = rotation[0] + t * 0.15;
      groupRef.current.rotation.y = rotation[1] + t * 0.2;
      groupRef.current.rotation.z = rotation[2] + t * 0.1;
    }
  });

  const stickerColors = {
    front1: "#93C5FD",  // Light sky blue
    front2: "#3B82F6",  // Cobalt blue
    back1: "#A7F3D0",   // Light mint green
    back2: "#10B981",   // Forest/emerald green
    left1: "#FED7AA",   // Light peach
    left2: "#F97316",   // Burnt orange
    right1: "#FECDD3",  // Light pink
    right2: "#EF4444",  // Coral red
    top1: "#FEF08A",    // Light gold
    top2: "#F59E0B",    // Rich amber gold
    bottom1: "#FAF8F5", // Soft cream
    bottom2: "#E6DFD3", // Sand grey
  };

  const stickerSize = 0.23;
  const stickerThickness = 0.01;
  const gap = 0.26;
  const d = 0.405; // Offset from center

  const offsets = [-gap, 0, gap];

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Cube Light Sand Core */}
      <mesh>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial color="#EAE5DA" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Front Face (z = +d) - Blue stickers */}
      {offsets.map((x, i) =>
        offsets.map((y, j) => {
          const color = (i + j) % 2 === 0 ? stickerColors.front1 : stickerColors.front2;
          return (
            <mesh key={`f-${i}-${j}`} position={[x, y, d]}>
              <boxGeometry args={[stickerSize, stickerSize, stickerThickness]} />
              <meshStandardMaterial color={color} roughness={0.15} metalness={0.1} />
            </mesh>
          );
        })
      )}

      {/* Back Face (z = -d) - Green stickers */}
      {offsets.map((x, i) =>
        offsets.map((y, j) => {
          const color = (i + j) % 2 === 0 ? stickerColors.back1 : stickerColors.back2;
          return (
            <mesh key={`b-${i}-${j}`} position={[x, y, -d]}>
              <boxGeometry args={[stickerSize, stickerSize, stickerThickness]} />
              <meshStandardMaterial color={color} roughness={0.15} metalness={0.1} />
            </mesh>
          );
        })
      )}

      {/* Left Face (x = -d) - Orange stickers */}
      {offsets.map((y, i) =>
        offsets.map((z, j) => {
          const color = (i + j) % 2 === 0 ? stickerColors.left1 : stickerColors.left2;
          return (
            <mesh key={`l-${i}-${j}`} position={[-d, y, z]} rotation={[0, Math.PI / 2, 0]}>
              <boxGeometry args={[stickerSize, stickerSize, stickerThickness]} />
              <meshStandardMaterial color={color} roughness={0.15} metalness={0.1} />
            </mesh>
          );
        })
      )}

      {/* Right Face (x = +d) - Red stickers */}
      {offsets.map((y, i) =>
        offsets.map((z, j) => {
          const color = (i + j) % 2 === 0 ? stickerColors.right1 : stickerColors.right2;
          return (
            <mesh key={`r-${i}-${j}`} position={[d, y, z]} rotation={[0, Math.PI / 2, 0]}>
              <boxGeometry args={[stickerSize, stickerSize, stickerThickness]} />
              <meshStandardMaterial color={color} roughness={0.15} metalness={0.1} />
            </mesh>
          );
        })
      )}

      {/* Top Face (y = +d) - Gold stickers */}
      {offsets.map((x, i) =>
        offsets.map((z, j) => {
          const color = (i + j) % 2 === 0 ? stickerColors.top1 : stickerColors.top2;
          return (
            <mesh key={`t-${i}-${j}`} position={[x, d, z]} rotation={[Math.PI / 2, 0, 0]}>
              <boxGeometry args={[stickerSize, stickerSize, stickerThickness]} />
              <meshStandardMaterial color={color} roughness={0.15} metalness={0.2} />
            </mesh>
          );
        })
      )}

      {/* Bottom Face (y = -d) - White stickers */}
      {offsets.map((x, i) =>
        offsets.map((z, j) => {
          const color = (i + j) % 2 === 0 ? stickerColors.bottom1 : stickerColors.bottom2;
          return (
            <mesh key={`bt-${i}-${j}`} position={[x, -d, z]} rotation={[Math.PI / 2, 0, 0]}>
              <boxGeometry args={[stickerSize, stickerSize, stickerThickness]} />
              <meshStandardMaterial color={color} roughness={0.2} metalness={0.05} />
            </mesh>
          );
        })
      )}
    </group>
  );
}

// 4. Custom 3D Chess Pawn Component
interface ChessPieceProps {
  position: [number, number, number];
  rotation: [number, number, number];
  scale?: number;
}

function ChessPawn({ position, rotation, scale = 1 }: ChessPieceProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      // Gentle bobbing and tilt
      groupRef.current.position.y = position[1] + Math.sin(t * 1.2) * 0.04;
      groupRef.current.rotation.y = rotation[1] + t * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      {/* Base ring */}
      <mesh position={[0, -0.3, 0]}>
        <cylinderGeometry args={[0.26, 0.28, 0.06, 32]} />
        <meshStandardMaterial color="#FAF8F5" roughness={0.1} metalness={0.05} />
      </mesh>
      {/* Torso (tapered body) */}
      <mesh position={[0, -0.06, 0]}>
        <cylinderGeometry args={[0.08, 0.22, 0.44, 32]} />
        <meshStandardMaterial color="#FAF8F5" roughness={0.1} metalness={0.05} />
      </mesh>
      {/* Neck collar */}
      <mesh position={[0, 0.18, 0]}>
        <cylinderGeometry args={[0.13, 0.13, 0.05, 32]} />
        <meshStandardMaterial color="#FAF8F5" roughness={0.1} metalness={0.05} />
      </mesh>
      {/* Head ball */}
      <mesh position={[0, 0.35, 0]}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial color="#FAF8F5" roughness={0.1} metalness={0.05} />
      </mesh>
    </group>
  );
}

// 5. Custom 3D Hourglass Component
function Hourglass({ position, rotation, scale = 1 }: ChessPieceProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      // Gentle tilt and slow spin
      groupRef.current.rotation.y = rotation[1] + t * 0.15;
      groupRef.current.rotation.x = rotation[0] + Math.sin(t * 0.5) * 0.08;
    }
  });

  const brassMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#F5D0A9", // Soft polished gold/brass
    roughness: 0.15,
    metalness: 0.7,
  }), []);

  const glassMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#FFFFFF",
    transparent: true,
    opacity: 0.3,
    roughness: 0.05,
    metalness: 0.95,
  }), []);

  const sandMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#FFFFFF", // Pure white sand
    roughness: 0.8,
  }), []);

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      {/* Top Plate (Muted Walnut Wood) */}
      <mesh position={[0, 0.46, 0]}>
        <cylinderGeometry args={[0.26, 0.26, 0.04, 32]} />
        <meshStandardMaterial color="#6B4E3D" roughness={0.45} />
      </mesh>
      {/* Bottom Plate (Muted Walnut Wood) */}
      <mesh position={[0, -0.46, 0]}>
        <cylinderGeometry args={[0.26, 0.26, 0.04, 32]} />
        <meshStandardMaterial color="#6B4E3D" roughness={0.45} />
      </mesh>

      {/* Pillars (Brass) */}
      <group>
        <mesh position={[0.21, 0, 0]} material={brassMaterial}>
          <cylinderGeometry args={[0.015, 0.015, 0.9, 16]} />
        </mesh>
        <mesh position={[-0.105, 0, 0.18]} material={brassMaterial}>
          <cylinderGeometry args={[0.015, 0.015, 0.9, 16]} />
        </mesh>
        <mesh position={[-0.105, 0, -0.18]} material={brassMaterial}>
          <cylinderGeometry args={[0.015, 0.015, 0.9, 16]} />
        </mesh>
      </group>

      {/* Glass Bulbs (Translucent) */}
      <group>
        {/* Top Bulb */}
        <mesh position={[0, 0.2, 0]} rotation={[Math.PI, 0, 0]} material={glassMaterial}>
          <coneGeometry args={[0.18, 0.4, 32, 1, true]} />
        </mesh>
        {/* Bottom Bulb */}
        <mesh position={[0, -0.2, 0]} material={glassMaterial}>
          <coneGeometry args={[0.18, 0.4, 32, 1, true]} />
        </mesh>
      </group>

      {/* Sand */}
      <group>
        {/* Top Sand Heap */}
        <mesh position={[0, 0.15, 0]} rotation={[Math.PI, 0, 0]} material={sandMaterial}>
          <coneGeometry args={[0.14, 0.28, 16]} />
        </mesh>
        {/* Bottom Sand Heap */}
        <mesh position={[0, -0.3, 0]} material={sandMaterial}>
          <coneGeometry args={[0.16, 0.18, 16]} />
        </mesh>
        {/* Falling Sand Stream */}
        <mesh position={[0, -0.06, 0]} material={sandMaterial}>
          <cylinderGeometry args={[0.006, 0.006, 0.35, 8]} />
        </mesh>
      </group>
    </group>
  );
}

// 6. Main Scene Manager
function Scene() {
  const { viewport } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  // Mouse tracking listener
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
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

    // Smooth tilt effect of the entire layout based on mouse movement
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mouse.x * 0.25,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -mouse.y * 0.15 + 0.1,
        0.05
      );
    }

    // Dynamic light tracking mouse pointer
    if (lightRef.current) {
      lightRef.current.position.x = THREE.MathUtils.lerp(
        lightRef.current.position.x,
        mouse.x * 4,
        0.1
      );
      lightRef.current.position.y = THREE.MathUtils.lerp(
        lightRef.current.position.y,
        mouse.y * 4,
        0.1
      );
    }
  });

  return (
    <>
      {/* Studio Quality Lighting */}
      <ambientLight intensity={0.9} />
      <directionalLight position={[6, 8, 4]} intensity={1.8} />
      <pointLight ref={lightRef} position={[0, 0, 4]} intensity={1.8} color="#FFFFFF" />
      <pointLight position={[-6, 5, -2]} intensity={0.8} color="#EBF8FF" /> {/* Light blue fill */}
      <pointLight position={[6, -4, 2]} intensity={1.0} color="#FFFBEB" />  {/* Soft warm gold rim */}

      {/* Ambient sparkle particles for visual depth */}
      <Sparkles count={35} scale={6.5} size={2.2} speed={0.4} color="#FBBF24" />

      {/* Floating 3D Tabletop Game Objects */}
      <Center>
        <group ref={groupRef}>
          
          {/* Main Rubik's Mind Cube (Center-Left) */}
          <Float speed={2} rotationIntensity={0.6} floatIntensity={0.7} position={[-1.4, 0.4, 0]}>
            <RubiksCube
              position={[0, 0, 0]}
              rotation={[0.1, -0.4, 0.35]}
              scale={1.35}
            />
          </Float>

          {/* Tumbling 3D Dice Pair (Center-Right) */}
          <Float speed={2.5} rotationIntensity={0.7} floatIntensity={0.9} position={[1.4, -0.4, 0.4]}>
            <group>
              {/* Die 1: Sage Green body with high-contrast Forest Green pips */}
              <Die
                color="#A7F3D0"
                pipColor="#0F766E"
                position={[-0.4, 0.4, 0]}
                rotation={[0.5, 0.2, -0.8]}
                scale={1.1}
              />
              {/* Die 2: Soft Peach body with high-contrast Burnt Orange pips */}
              <Die
                color="#FED7AA"
                pipColor="#C2410C"
                position={[0.4, -0.3, -0.2]}
                rotation={[-0.3, 0.8, 0.5]}
                scale={0.9}
              />
            </group>
          </Float>

          {/* Extruded Meeples (Pawn Game Pieces) (Bottom-Center) */}
          <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.6} position={[-0.3, -1.2, 0.5]}>
            <group>
              {/* Gold Meeple */}
              <Meeple
                color="#FCD34D"
                position={[-0.5, 0, 0]}
                rotation={[0.2, 0.4, 0]}
                scale={1.25}
              />
              {/* Red Meeple */}
              <Meeple
                color="#FCA5A5"
                position={[0.5, 0.1, 0.1]}
                rotation={[0.1, -0.4, 0]}
                scale={1.25}
              />
            </group>
          </Float>

          {/* Luxury Chess Pawn (Back Center-Right) */}
          <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4} position={[-0.1, 1.2, -0.6]}>
            <ChessPawn
              position={[0, 0, 0]}
              rotation={[0.1, 0.2, -0.1]}
              scale={1.15}
            />
          </Float>

          {/* Hourglass (Back Far-Right) */}
          <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.3} position={[1.1, 1.1, -1.1]}>
            <Hourglass
              position={[0, 0, 0]}
              rotation={[0.2, -0.3, 0.1]}
              scale={1.1}
            />
          </Float>

        </group>
      </Center>
    </>
  );
}

export default function HeroCanvas() {
  return (
    <div className="w-full h-full min-h-[450px] md:min-h-[600px] select-none">
      <Canvas
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 5.8], fov: 50 }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
