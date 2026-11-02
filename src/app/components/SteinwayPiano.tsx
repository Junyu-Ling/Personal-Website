import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, OrbitControls, useCursor } from "@react-three/drei";
import * as THREE from "three";
import { pianoSynth } from "@/lib/pianoAudio";
import {
  buildPianoKeys,
  COMPUTER_KEY_MAP,
  type PianoKeyDef,
} from "@/lib/pianoLayout";

const KEYS = buildPianoKeys();

const LEG_H = 0.64;
const RIM_H = 0.3;
const RIM_TOP = LEG_H + RIM_H;
const KEYBED_Y = LEG_H + 0.205;

const lacquer = {
  color: "#16161a",
  metalness: 0.18,
  roughness: 0.22,
  clearcoat: 1,
  clearcoatRoughness: 0.08,
} as const;

const gold = {
  color: "#c9a44a",
  metalness: 0.92,
  roughness: 0.28,
} as const;

const noRay = () => {};

function makeGrandOutline(inset = 0) {
  const w = 0.64 - inset;
  const s = new THREE.Shape();
  const yFront = 0.012 + inset * 0.2;
  s.moveTo(-w, yFront);
  s.lineTo(w, yFront);
  s.lineTo(w, 0.08 + inset);
  s.bezierCurveTo(w + 0.012, 0.5, 0.5 - inset, 1.02, 0.3 - inset * 0.45, 1.42);
  s.bezierCurveTo(0.14, 1.76, 0.04, 2.02, -0.07, 2.12 - inset);
  s.bezierCurveTo(-0.24, 2.2 - inset, -0.48, 2.15, -0.55 + inset * 0.25, 1.95);
  s.bezierCurveTo(-0.64, 1.54, -w, 0.94, -w, 0.42);
  s.lineTo(-w, yFront);
  return s;
}

function makePlateShape() {
  const s = makeGrandOutline(0.075);
  const bass = new THREE.Path();
  bass.absellipse(-0.22, 1.22, 0.15, 0.36, 0, Math.PI * 2, true);
  s.holes.push(bass);
  const mid = new THREE.Path();
  mid.absellipse(0.06, 0.62, 0.17, 0.24, 0, Math.PI * 2, true);
  s.holes.push(mid);
  return s;
}

function extruded(
  shape: THREE.Shape,
  depth: number,
  bevel = false
) {
  return new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: bevel,
    bevelThickness: bevel ? 0.01 : 0,
    bevelSize: bevel ? 0.008 : 0,
    bevelSegments: bevel ? 2 : 1,
    curveSegments: 48,
  });
}

function PianoKey({
  def,
  pressed,
  onPress,
  onRelease,
}: {
  def: PianoKeyDef;
  pressed: boolean;
  onPress: (midi: number) => void;
  onRelease: (midi: number) => void;
}) {
  const group = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  useFrame((_, dt) => {
    if (!group.current) return;
    const target = pressed ? -0.09 : 0;
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      target,
      22,
      dt
    );
  });

  return (
    <group ref={group} position={[def.x, 0, 0]}>
      <mesh
        position={[
          0,
          def.h / 2 + (def.black ? 0.007 : 0),
          def.d / 2 + (def.black ? 0.006 : 0),
        ]}
        castShadow={false}
        receiveShadow={false}
        onPointerDown={(event) => {
          event.stopPropagation();
          onPress(def.midi);
        }}
        onPointerUp={(event) => {
          event.stopPropagation();
          onRelease(def.midi);
        }}
        onPointerOver={(event) => {
          setHovered(true);
          if (event.buttons) onPress(def.midi);
        }}
        onPointerOut={() => {
          setHovered(false);
          onRelease(def.midi);
        }}
      >
        <boxGeometry args={[def.w * (def.black ? 0.96 : 0.97), def.h, def.d]} />
        <meshStandardMaterial
          color={
            pressed
              ? def.black
                ? "#3a3a40"
                : "#e2d7c4"
              : def.black
                ? "#1a1a1d"
                : "#f8f3e8"
          }
          roughness={def.black ? 0.38 : 0.42}
          metalness={0}
          emissive={def.black ? "#000000" : "#f2ead8"}
          emissiveIntensity={def.black ? 0 : 0.22}
        />
      </mesh>
    </group>
  );
}

function Keyboard({
  onNote,
}: {
  onNote?: (name: string, midi: number) => void;
}) {
  const pressed = useRef(new Set<number>());
  const holding = useRef(false);
  const [, bump] = useState(0);

  const setKey = useCallback(
    (midi: number, down: boolean) => {
      if (down) {
        if (pressed.current.has(midi)) return;
        pressed.current.add(midi);
        const key = KEYS.find((item) => item.midi === midi);
        pianoSynth.play(midi);
        onNote?.(key?.name ?? String(midi), midi);
      } else {
        if (!pressed.current.has(midi)) return;
        pressed.current.delete(midi);
      }
      bump((value) => value + 1);
    },
    [onNote]
  );

  useEffect(() => {
    const up = () => {
      holding.current = false;
      if (pressed.current.size === 0) return;
      pressed.current.clear();
      bump((value) => value + 1);
    };
    const down = (event: PointerEvent) => {
      if (event.buttons) holding.current = true;
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.repeat) return;
      const target = event.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA"].includes(target.tagName)) return;
      const midi = COMPUTER_KEY_MAP[event.key.toLowerCase()];
      if (midi == null) return;
      event.preventDefault();
      setKey(midi, event.type === "keydown");
    };
    window.addEventListener("pointerup", up);
    window.addEventListener("pointerdown", down);
    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onKey);
    return () => {
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keyup", onKey);
    };
  }, [setKey]);

  const press = useCallback(
    (midi: number) => {
      holding.current = true;
      setKey(midi, true);
    },
    [setKey]
  );

  const release = useCallback(
    (midi: number) => {
      setKey(midi, false);
    },
    [setKey]
  );

  return (
    <group position={[0, KEYBED_Y, 0]}>
      {KEYS.map((def) => (
        <PianoKey
          key={def.midi}
          def={def}
          pressed={pressed.current.has(def.midi)}
          onPress={press}
          onRelease={release}
        />
      ))}
    </group>
  );
}

function BrandPlate() {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.fillStyle = "#c9a44a";
    ctx.fillRect(0, 0, 1024, 256);
    ctx.fillStyle = "#5a3d12";
    ctx.font = '600 78px "Times New Roman", "Noto Serif", serif';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("STEINWAY & SONS", 512, 118);
    ctx.font = '500 28px "Times New Roman", "Noto Serif", serif';
    ctx.fillText("NEW YORK · HAMBURG", 512, 186);
    const map = new THREE.CanvasTexture(canvas);
    map.anisotropy = 8;
    map.needsUpdate = true;
    return map;
  }, []);

  if (!texture) return null;

  return (
    <mesh
      position={[0, KEYBED_Y + 0.086, -0.028]}
      rotation={[-0.08, 0, 0]}
      castShadow
      raycast={noRay}
    >
      <boxGeometry args={[0.42, 0.034, 0.012]} />
      <meshStandardMaterial map={texture} metalness={0.55} roughness={0.32} />
    </mesh>
  );
}

function Strings() {
  const geometry = useMemo(() => {
    const positions: number[] = [];
    for (let i = 0; i < 56; i += 1) {
      const t = i / 55;
      const x0 = -0.54 + t * 1.08;
      const x1 = -0.46 + t * 0.82;
      const z0 = -0.1;
      const z1 = -0.42 - t * 1.38;
      positions.push(x0, 0, z0, x1, 0, z1);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, []);

  return (
    <lineSegments geometry={geometry} position={[0, RIM_TOP - 0.072, 0]}>
      <lineBasicMaterial color="#e0c878" transparent opacity={0.48} />
    </lineSegments>
  );
}

function Leg({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, LEG_H / 2, 0]} castShadow raycast={noRay}>
        <cylinderGeometry args={[0.026, 0.04, LEG_H, 18]} />
        <meshPhysicalMaterial {...lacquer} />
      </mesh>
      <mesh position={[0, 0.02, 0]} castShadow raycast={noRay}>
        <cylinderGeometry args={[0.044, 0.044, 0.04, 22]} />
        <meshStandardMaterial {...gold} />
      </mesh>
    </group>
  );
}

function GrandBody() {
  const rimGeo = useMemo(() => {
    const outer = makeGrandOutline(0);
    const inner = makeGrandOutline(0.046);
    outer.holes.push(inner);
    return extruded(outer, RIM_H, true);
  }, []);
  const boardGeo = useMemo(
    () => extruded(makeGrandOutline(0.05), 0.018, false),
    []
  );
  const plateGeo = useMemo(
    () => extruded(makePlateShape(), 0.012, false),
    []
  );
  const lidGeo = useMemo(
    () => extruded(makeGrandOutline(0.03), 0.016, true),
    []
  );

  return (
    <group>
      <mesh
        geometry={rimGeo}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, LEG_H, 0]}
        castShadow
        receiveShadow
        raycast={noRay}
      >
        <meshPhysicalMaterial {...lacquer} />
      </mesh>

      <mesh
        geometry={boardGeo}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, LEG_H + 0.118, 0]}
        receiveShadow
        raycast={noRay}
      >
        <meshStandardMaterial color="#6b3d22" roughness={0.62} metalness={0.04} />
      </mesh>

      <mesh
        geometry={plateGeo}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, RIM_TOP - 0.086, 0]}
        castShadow
        raycast={noRay}
      >
        <meshStandardMaterial {...gold} />
      </mesh>

      <Strings />

      <mesh position={[0, KEYBED_Y - 0.014, 0.07]} receiveShadow raycast={noRay}>
        <boxGeometry args={[1.26, 0.028, 0.15]} />
        <meshPhysicalMaterial {...lacquer} />
      </mesh>

      <mesh position={[-0.632, KEYBED_Y + 0.04, 0.078]} castShadow raycast={noRay}>
        <boxGeometry args={[0.046, 0.086, 0.168]} />
        <meshPhysicalMaterial {...lacquer} />
      </mesh>
      <mesh position={[0.632, KEYBED_Y + 0.04, 0.078]} castShadow raycast={noRay}>
        <boxGeometry args={[0.046, 0.086, 0.168]} />
        <meshPhysicalMaterial {...lacquer} />
      </mesh>

      <mesh position={[0, KEYBED_Y + 0.046, -0.012]} castShadow raycast={noRay}>
        <boxGeometry args={[1.24, 0.09, 0.05]} />
        <meshPhysicalMaterial {...lacquer} />
      </mesh>

      <mesh position={[0, KEYBED_Y + 0.017, 0.004]} raycast={noRay}>
        <boxGeometry args={[1.2, 0.006, 0.012]} />
        <meshStandardMaterial color="#7a2430" roughness={0.8} />
      </mesh>

      <BrandPlate />

      <mesh
        position={[0, KEYBED_Y + 0.168, -0.12]}
        rotation={[-0.58, 0, 0]}
        castShadow
        raycast={noRay}
      >
        <boxGeometry args={[0.58, 0.01, 0.2]} />
        <meshPhysicalMaterial {...lacquer} />
      </mesh>

      <group position={[0.6, RIM_TOP, -0.08]} rotation={[0, 0, -1.12]}>
        <mesh
          geometry={lidGeo}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[-0.6, 0.01, 0]}
          castShadow={false}
          raycast={noRay}
        >
          <meshPhysicalMaterial {...lacquer} />
        </mesh>
      </group>

      <mesh
        position={[-0.42, RIM_TOP + 0.28, -0.85]}
        rotation={[0, 0.08, 0.42]}
        castShadow
        raycast={noRay}
      >
        <cylinderGeometry args={[0.007, 0.007, 0.72, 8]} />
        <meshPhysicalMaterial {...lacquer} />
      </mesh>

      <Leg position={[-0.52, 0, 0.04]} />
      <Leg position={[0.52, 0, 0.04]} />
      <Leg position={[-0.2, 0, -1.86]} />

      <group position={[0, 0, 0.06]}>
        <mesh position={[0, 0.22, 0]} castShadow raycast={noRay}>
          <boxGeometry args={[0.06, 0.44, 0.03]} />
          <meshPhysicalMaterial {...lacquer} />
        </mesh>
        <mesh position={[0, 0.12, 0.04]} castShadow raycast={noRay}>
          <boxGeometry args={[0.28, 0.03, 0.08]} />
          <meshPhysicalMaterial {...lacquer} />
        </mesh>
        {[-0.08, 0, 0.08].map((x) => (
          <mesh key={x} position={[x, 0.09, 0.09]} castShadow raycast={noRay}>
            <boxGeometry args={[0.05, 0.012, 0.09]} />
            <meshStandardMaterial {...gold} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function Scene({
  onNote,
}: {
  onNote?: (name: string, midi: number) => void;
}) {
  return (
    <>
      <color attach="background" args={["#1a1612"]} />
      <hemisphereLight args={["#fff6e8", "#4a3a2c", 0.9]} />
      <ambientLight intensity={0.7} />
      <directionalLight
        position={[1.6, 3.6, 3.2]}
        intensity={1.9}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={12}
        shadow-camera-left={-3}
        shadow-camera-right={3}
        shadow-camera-top={3}
        shadow-camera-bottom={-3}
      />
      <spotLight
        position={[0, 2.4, 2.2]}
        angle={0.7}
        penumbra={0.55}
        intensity={2.6}
        color="#fff6ea"
      />
      <pointLight position={[0, 1.55, 0.55]} intensity={2.4} color="#fff3e0" distance={4} />
      <pointLight position={[1.2, 1.3, 0.8]} intensity={0.9} color="#ffe7c8" />
      <pointLight position={[-1.4, 1.2, -1.2]} intensity={0.55} color="#ffd9a0" />

      <GrandBody />
      <Keyboard onNote={onNote} />

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, -0.55]}
        receiveShadow
        raycast={noRay}
      >
        <planeGeometry args={[14, 14]} />
        <meshStandardMaterial color="#14110f" roughness={0.95} />
      </mesh>
      <ContactShadows
        position={[0, 0.002, -0.5]}
        opacity={0.48}
        scale={8}
        blur={2.4}
        far={3.2}
      />
      <OrbitControls
        makeDefault
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        minDistance={1.8}
        maxDistance={5.2}
        minPolarAngle={0.42}
        maxPolarAngle={1.22}
        target={[0, 0.72, -0.2]}
      />
    </>
  );
}

type SteinwayPianoProps = {
  onNote?: (name: string, midi: number) => void;
};

export function SteinwayPiano({ onNote }: SteinwayPianoProps) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: false }}
      camera={{ position: [0.28, 1.42, 2.35], fov: 38, near: 0.08, far: 40 }}
      onCreated={({ gl }) => {
        gl.setClearColor("#1a1612");
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.35;
      }}
    >
      <Scene onNote={onNote} />
    </Canvas>
  );
}
