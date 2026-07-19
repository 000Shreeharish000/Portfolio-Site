import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshWobbleMaterial, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";

function AnimatedShape() {
  const meshRef = useRef();
  const innerMeshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
    if (innerMeshRef.current) {
      innerMeshRef.current.rotation.x -= delta * 0.3;
      innerMeshRef.current.rotation.z += delta * 0.4;
    }
  });

  return (
    <group>
      {/* Outer Wireframe Icosahedron */}
      <mesh ref={meshRef} scale={1.8}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#3b82f6"
          wireframe
          emissive="#1d4ed8"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Inner Glowing Wobble Core */}
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        <mesh ref={innerMeshRef} scale={1}>
          <octahedronGeometry args={[1, 0]} />
          <MeshWobbleMaterial
            color="#8b5cf6"
            factor={0.4}
            speed={2}
            roughness={0.2}
            metalness={0.8}
            emissive="#6d28d9"
            emissiveIntensity={0.8}
          />
        </mesh>
      </Float>

      {/* Ambient particles surrounding the orb */}
      <mesh scale={2.4}>
        <torusGeometry args={[1, 0.02, 16, 100]} />
        <meshStandardMaterial color="#60a5fa" wireframe opacity={0.4} transparent />
      </mesh>
    </group>
  );
}

const Project3DOrb = ({ className = "w-full h-72" }) => {
  return (
    <div className={`relative ${className} flex items-center justify-center`}>
      <Canvas camera={{ position: [0, 0, 4.5], fov: 50 }}>
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#38bdf8" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#a855f7" />
        <Suspense fallback={null}>
          <AnimatedShape />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Project3DOrb;
