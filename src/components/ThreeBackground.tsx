import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Pre-define code symbols for texture generation
const codeSymbols = ['<', '>', '{', '}', ';', '=', '(', ')', '/', '*', '0', '1'];

// Hook for tracking mouse securely
function useMousePosition() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
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
  return mouse;
}

// Generates text textures for particles
function createTextTexture(text: string, color: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.fillStyle = "transparent";
    ctx.fillRect(0, 0, 64, 64);
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "bold 40px 'JetBrains Mono', monospace";
    ctx.fillText(text, 32, 32);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

const NeuralNetwork = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const { viewport, camera } = useThree();

  // Configuration (fixed on mount to prevent buffer resize crashes)
  const [{ isMobile, numParticles, connectionDistance }] = useState(() => {
    const mobile = window.innerWidth < 768;
    return {
      isMobile: mobile,
      numParticles: mobile ? 40 : 120,
      connectionDistance: mobile ? 1.5 : 2.5,
    };
  });

  const { positions, velocities, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(numParticles * 3);
    const velocities = [];
    const colors = new Float32Array(numParticles * 3);
    const sizes = new Float32Array(numParticles);

    const themeColors = [
      new THREE.Color("hsl(185, 100%, 50%)"), // cyan
      new THREE.Color("hsl(270, 60%, 65%)"),  // purple
      new THREE.Color("hsl(142, 72%, 45%)"),  // green
    ];

    for (let i = 0; i < numParticles; i++) {
        // Spread across wider area than viewport
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5 - 2; // Z depth

      velocities.push({
        x: (Math.random() - 0.5) * 0.01,
        y: (Math.random() - 0.5) * 0.01,
        z: (Math.random() - 0.5) * 0.01,
      });

      const color = themeColors[Math.floor(Math.random() * themeColors.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = Math.random() * 2 + 0.5;
    }
    return { positions, velocities, colors, sizes };
  }, [numParticles]);

  const maxLines = (numParticles * (numParticles - 1)) / 2;
  const linePositions = useMemo(() => new Float32Array(maxLines * 6), [maxLines]);
  const lineColors = useMemo(() => new Float32Array(maxLines * 8), [maxLines]);

  const [lineGeometry] = useState(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(lineColors, 4));
    return geo;
  });

  const [lineMaterial] = useState(() => new THREE.LineBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.15,
    vertexColors: true,
    blending: THREE.AdditiveBlending
  }));

  useFrame((state) => {
    if (!pointsRef.current || !linesRef.current) return;

    const positionsArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    // Mouse repulsion in world coordinates using r3f native pointer
    const vector = new THREE.Vector3(state.pointer.x, state.pointer.y, 0.5);
    vector.unproject(camera);
    const dir = vector.sub(camera.position).normalize();
    const distance = -camera.position.z / dir.z;
    const mousePos = camera.position.clone().add(dir.multiplyScalar(distance));

    for (let i = 0; i < numParticles; i++) {
      let x = positionsArray[i * 3];
      let y = positionsArray[i * 3 + 1];
      let z = positionsArray[i * 3 + 2];

      x += velocities[i].x;
      y += velocities[i].y;
      z += velocities[i].z;

      // Mouse repulsion
      if (!isMobile) {
          const dx = mousePos.x - x;
          const dy = mousePos.y - y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 3) {
              const force = (3 - dist) * 0.02;
              x -= (dx / dist) * force;
              y -= (dy / dist) * force;
          }
      }

      // Wraparound bounds
      if (x < -12) x = 12;
      if (x > 12) x = -12;
      if (y < -12) y = 12;
      if (y > 12) y = -12;
      if (z < -8) z = 2;
      if (z > 2) z = -8;

      positionsArray[i * 3] = x;
      positionsArray[i * 3 + 1] = y;
      positionsArray[i * 3 + 2] = z;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Update lines
    let lineCount = 0;

    for (let i = 0; i < numParticles; i++) {
      for (let j = i + 1; j < numParticles; j++) {
        const dx = positionsArray[i * 3] - positionsArray[j * 3];
        const dy = positionsArray[i * 3 + 1] - positionsArray[j * 3 + 1];
        const dz = positionsArray[i * 3 + 2] - positionsArray[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < connectionDistance) {
          // Point A
          linePositions[lineCount * 6] = positionsArray[i * 3];
          linePositions[lineCount * 6 + 1] = positionsArray[i * 3 + 1];
          linePositions[lineCount * 6 + 2] = positionsArray[i * 3 + 2];
          
          // Point B
          linePositions[lineCount * 6 + 3] = positionsArray[j * 3];
          linePositions[lineCount * 6 + 4] = positionsArray[j * 3 + 1];
          linePositions[lineCount * 6 + 5] = positionsArray[j * 3 + 2];

          const alpha = 1.0 - dist / connectionDistance;

          // Color A
          lineColors[lineCount * 8] = colors[i * 3];
          lineColors[lineCount * 8 + 1] = colors[i * 3 + 1];
          lineColors[lineCount * 8 + 2] = colors[i * 3 + 2];
          lineColors[lineCount * 8 + 3] = alpha;
          
          // Color B
          lineColors[lineCount * 8 + 4] = colors[j * 3];
          lineColors[lineCount * 8 + 5] = colors[j * 3 + 1];
          lineColors[lineCount * 8 + 6] = colors[j * 3 + 2];
          lineColors[lineCount * 8 + 7] = alpha;

          lineCount++;
        }
      }
    }

    lineGeometry.setDrawRange(0, lineCount * 2);
    lineGeometry.attributes.position.needsUpdate = true;
    lineGeometry.attributes.color.needsUpdate = true;
  });

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={numParticles}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={numParticles}
            array={colors}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={numParticles}
            array={sizes}
            itemSize={1}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation={true}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <lineSegments ref={linesRef} geometry={lineGeometry} material={lineMaterial} />
    </>
  );
};

// Abstract Code Symbols drifting
const FloatingSymbols = () => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) return null; // Save performance on mobile
    
    const count = 30;
    const { elements } = useMemo(() => {
        const elements = [];
        const themeColors = ['hsl(185, 100%, 50%)', 'hsl(270, 60%, 65%)', 'hsl(142, 72%, 45%)'];
        
        for (let i = 0; i < count; i++) {
            const sym = codeSymbols[Math.floor(Math.random() * codeSymbols.length)];
            const col = themeColors[Math.floor(Math.random() * themeColors.length)];
            elements.push({
                position: [
                    (Math.random() - 0.5) * 20,
                    (Math.random() - 0.5) * 20,
                    (Math.random() - 0.5) * 10 - 2
                ] as [number, number, number],
                texture: createTextTexture(sym, col),
                speed: (Math.random() - 0.5) * 0.005,
                scale: Math.random() * 0.5 + 0.3
            });
        }
        return { elements };
    }, []);

    const groupRef = useRef<THREE.Group>(null);
    useFrame(() => {
        if(groupRef.current) {
            groupRef.current.rotation.y += 0.0005;
            groupRef.current.position.y = Math.sin(Date.now() * 0.0005) * 0.5;
        }
    });

    return (
        <group ref={groupRef}>
            {elements.map((el, i) => (
                <sprite key={i} position={el.position} scale={[el.scale, el.scale, 1]}>
                    <spriteMaterial map={el.texture} transparent opacity={0.4} blending={THREE.AdditiveBlending} depthWrite={false}/>
                </sprite>
            ))}
        </group>
    );
}

const ThreeBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 bg-[#0B0F14]">
      {/* Soft overlay gradient for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0B0F14_100%)] z-10 pointer-events-none" />
      
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
        dpr={[1, 1.5]} // Cap pixel ratio for performance
      >
        <fog attach="fog" args={["#0B0F14", 3, 15]} />
        <NeuralNetwork />
        <FloatingSymbols />
      </Canvas>
    </div>
  );
};

export default ThreeBackground;
