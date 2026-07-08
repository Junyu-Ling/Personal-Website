import { useEffect, useRef } from "react";

type Vec3 = { x: number; y: number; z: number };

function normalize(point: Vec3): Vec3 {
  const length = Math.hypot(point.x, point.y, point.z) || 1;
  return { x: point.x / length, y: point.y / length, z: point.z / length };
}

function midpoint(a: Vec3, b: Vec3): Vec3 {
  return normalize({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2, z: (a.z + b.z) / 2 });
}

function rotateY(point: Vec3, angle: number): Vec3 {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    x: point.x * cos + point.z * sin,
    y: point.y,
    z: -point.x * sin + point.z * cos,
  };
}

function rotateX(point: Vec3, angle: number): Vec3 {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    x: point.x,
    y: point.y * cos - point.z * sin,
    z: point.y * sin + point.z * cos,
  };
}

function buildIcoSphere(subdivisions: number): { vertices: Vec3[]; edges: Array<[number, number]> } {
  const phi = (1 + Math.sqrt(5)) / 2;
  let vertices: Vec3[] = [
    { x: -1, y: phi, z: 0 },
    { x: 1, y: phi, z: 0 },
    { x: -1, y: -phi, z: 0 },
    { x: 1, y: -phi, z: 0 },
    { x: 0, y: -1, z: phi },
    { x: 0, y: 1, z: phi },
    { x: 0, y: -1, z: -phi },
    { x: 0, y: 1, z: -phi },
    { x: phi, y: 0, z: -1 },
    { x: phi, y: 0, z: 1 },
    { x: -phi, y: 0, z: -1 },
    { x: -phi, y: 0, z: 1 },
  ].map(normalize);

  let faces: Array<[number, number, number]> = [
    [0, 11, 5],
    [0, 5, 1],
    [0, 1, 7],
    [0, 7, 10],
    [0, 10, 11],
    [1, 5, 9],
    [5, 11, 4],
    [11, 10, 2],
    [10, 7, 6],
    [7, 1, 8],
    [3, 9, 4],
    [3, 4, 2],
    [3, 2, 6],
    [3, 6, 8],
    [3, 8, 9],
    [4, 9, 5],
    [2, 4, 11],
    [6, 2, 10],
    [8, 6, 7],
    [9, 8, 1],
  ];

  const midpointCache = new Map<string, number>();

  const getMidpointIndex = (i0: number, i1: number): number => {
    const key = i0 < i1 ? `${i0}_${i1}` : `${i1}_${i0}`;
    const cached = midpointCache.get(key);
    if (cached !== undefined) return cached;

    const index = vertices.length;
    vertices.push(midpoint(vertices[i0], vertices[i1]));
    midpointCache.set(key, index);
    return index;
  };

  for (let level = 0; level < subdivisions; level++) {
    const nextFaces: Array<[number, number, number]> = [];
    for (const [a, b, c] of faces) {
      const ab = getMidpointIndex(a, b);
      const bc = getMidpointIndex(b, c);
      const ca = getMidpointIndex(c, a);
      nextFaces.push([a, ab, ca], [b, bc, ab], [c, ca, bc], [ab, bc, ca]);
    }
    faces = nextFaces;
  }

  const edgeSet = new Set<string>();
  const edges: Array<[number, number]> = [];

  const addEdge = (a: number, b: number) => {
    const key = a < b ? `${a}_${b}` : `${b}_${a}`;
    if (edgeSet.has(key)) return;
    edgeSet.add(key);
    edges.push([a, b]);
  };

  for (const [a, b, c] of faces) {
    addEdge(a, b);
    addEdge(b, c);
    addEdge(c, a);
  }

  return { vertices, edges };
}

type TransparentGlobeProps = {
  className?: string;
};

export function TransparentGlobe({ className = "" }: TransparentGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const meshRef = useRef(buildIcoSphere(3));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const project = (
      point: Vec3,
      cx: number,
      cy: number,
      radius: number,
      rotY: number,
      tiltX: number
    ) => {
      let rotated = rotateY(point, rotY);
      rotated = rotateX(rotated, tiltX);
      const perspective = 1.12 / (1.12 - rotated.z * 0.28);
      return {
        x: cx + rotated.x * radius * perspective,
        y: cy + rotated.y * radius * perspective,
        z: rotated.z,
        scale: perspective,
      };
    };

    const draw = (time: number) => {
      if (width < 2 || height < 2) {
        frameRef.current = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(width, height) * 0.42;
      const rotY = reducedMotion ? 0.45 : time * 0.00016;
      const tiltX = -0.18;

      const { vertices, edges } = meshRef.current;
      const projected = vertices.map((vertex) =>
        project(vertex, cx, cy, radius, rotY, tiltX)
      );

      const sortedEdges = [...edges].sort((edgeA, edgeB) => {
        const depthA = (projected[edgeA[0]].z + projected[edgeA[1]].z) / 2;
        const depthB = (projected[edgeB[0]].z + projected[edgeB[1]].z) / 2;
        return depthA - depthB;
      });

      for (const [start, end] of sortedEdges) {
        const from = projected[start];
        const to = projected[end];
        const depth = (from.z + to.z) / 2;
        const frontness = (depth + 1) / 2;
        const alpha = 0.08 + frontness * 0.34;

        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.strokeStyle =
          depth > 0
            ? `rgba(37, 99, 235, ${alpha})`
            : `rgba(96, 165, 250, ${alpha * 0.45})`;
        ctx.lineWidth = (depth > 0 ? 1.05 : 0.75) * ((from.scale + to.scale) / 2);
        ctx.stroke();
      }

      frameRef.current = requestAnimationFrame(draw);
    };

    resize();
    frameRef.current = requestAnimationFrame(draw);

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(frameRef.current);
      observer.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`block h-full w-full ${className}`}
      aria-hidden="true"
    />
  );
}
