import { useEffect, useRef } from "react";
import steinwayReference from "@/assets/steinway-grand-reference.png";

type Point = { x: number; y: number };

type Particle = Point & {
  baseX: number;
  baseY: number;
  size: number;
  alpha: number;
  phase: number;
  speed: number;
  tint: "dark" | "gold" | "mid";
};

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function samplePianoFromReference(image: HTMLImageElement): Point[] {
  const canvas = document.createElement("canvas");
  const width = image.naturalWidth;
  const height = image.naturalHeight;
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) return [];

  ctx.drawImage(image, 0, 0, width, height);
  const { data } = ctx.getImageData(0, 0, width, height);

  const edgeStrength = new Float32Array(width * height);
  const darkness = new Float32Array(width * height);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = y * width + x;
      const offset = index * 4;
      const r = data[offset];
      const g = data[offset + 1];
      const b = data[offset + 2];
      const alpha = data[offset + 3];
      const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      const dark = alpha > 20 ? 1 - lum : 0;
      darkness[index] = dark;

      const left = x > 0 ? darkness[index - 1] : 0;
      const up = y > 0 ? darkness[index - width] : 0;
      edgeStrength[index] = Math.abs(dark - left) + Math.abs(dark - up);
    }
  }

  const candidates: Array<Point & { weight: number; tint: Particle["tint"] }> = [];

  for (let y = 1; y < height - 1; y += 2) {
    for (let x = 1; x < width - 1; x += 2) {
      const index = y * width + x;
      const dark = darkness[index];
      if (dark < 0.12) continue;

      const edge = edgeStrength[index];
      const offset = index * 4;
      const r = data[offset];
      const g = data[offset + 1];
      const b = data[offset + 2];
      const warmth = r - b;

      const tint: Particle["tint"] =
        warmth > 35 && dark > 0.2 ? "gold" : edge > 0.18 ? "dark" : "mid";

      const weight = dark * 1.8 + edge * 2.4 + (tint === "gold" ? 0.35 : 0);
      candidates.push({
        x: (x / width) * 100,
        y: (y / height) * 100,
        weight,
        tint,
      });
    }
  }

  const targetCount = 1500;
  const weighted = shuffle(candidates);
  const selected: Array<Point & { tint: Particle["tint"] }> = [];
  const totalWeight = weighted.reduce((sum, point) => sum + point.weight, 0);
  let cursor = 0;

  while (selected.length < targetCount && cursor < weighted.length) {
    const point = weighted[cursor++];
    const keepChance = Math.min(0.95, (point.weight / totalWeight) * targetCount * 2.2);
    if (Math.random() < keepChance) {
      selected.push({
        x: point.x + (Math.random() - 0.5) * 0.18,
        y: point.y + (Math.random() - 0.5) * 0.18,
        tint: point.tint,
      });
    }
  }

  if (selected.length < targetCount * 0.75) {
    for (const point of weighted) {
      if (selected.length >= targetCount) break;
      selected.push({
        x: point.x + (Math.random() - 0.5) * 0.15,
        y: point.y + (Math.random() - 0.5) * 0.15,
        tint: point.tint,
      });
    }
  }

  return selected;
}

function createParticles(
  template: Array<Point & { tint?: Particle["tint"] }>
): Particle[] {
  return template.map((point) => {
    const tint = point.tint ?? "mid";
    const alphaBase = tint === "dark" ? 0.34 : tint === "gold" ? 0.3 : 0.22;

    return {
      x: point.x,
      y: point.y,
      baseX: point.x,
      baseY: point.y,
      size: tint === "dark" ? 1 + Math.random() * 1.2 : 0.75 + Math.random() * 1.1,
      alpha: alphaBase + Math.random() * 0.28,
      phase: Math.random() * Math.PI * 2,
      speed: 0.3 + Math.random() * 0.85,
      tint,
    };
  });
}

type SteinwayParticlePianoProps = {
  className?: string;
};

export function SteinwayParticlePiano({ className = "" }: SteinwayParticlePianoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let disposed = false;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const media = window.matchMedia("(min-width: 768px)");

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time: number) => {
      if (disposed) return;

      if (width < 2 || height < 2 || particlesRef.current.length === 0) {
        frameRef.current = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      const scale = Math.min(width / 100, height / 100) * 0.94;
      const offsetX = width * 0.5 - 50 * scale;
      const offsetY = height * 0.5 - 50 * scale;

      for (const particle of particlesRef.current) {
        const drift = reducedMotion
          ? 0
          : Math.sin(time * 0.001 * particle.speed + particle.phase) * 0.22;
        const lift = reducedMotion
          ? 0
          : Math.cos(time * 0.0008 * particle.speed + particle.phase) * 0.18;
        const pulse = reducedMotion
          ? 1
          : 0.8 + Math.sin(time * 0.0014 * particle.speed + particle.phase) * 0.2;

        const x = offsetX + (particle.baseX + drift) * scale;
        const y = offsetY + (particle.baseY + lift) * scale;
        const alpha = particle.alpha * pulse;
        const radius = Math.max(
          1.2,
          particle.size * scale * (particle.tint === "dark" ? 0.34 : 0.28)
        );

        if (particle.tint === "gold") {
          ctx.beginPath();
          ctx.fillStyle = `rgba(168, 132, 72, ${alpha * 0.9})`;
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fill();
          continue;
        }

        ctx.beginPath();
        ctx.fillStyle = `rgba(24, 22, 20, ${alpha})`;
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();

        if (particle.tint === "dark") {
          ctx.beginPath();
          ctx.fillStyle = `rgba(120, 98, 72, ${alpha * 0.35})`;
          ctx.arc(x, y, radius * 0.45, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      frameRef.current = requestAnimationFrame(draw);
    };

    const handleResize = () => {
      resize();
    };

    const image = new Image();
    image.src = steinwayReference;
    image.onload = () => {
      if (disposed) return;
      particlesRef.current = createParticles(samplePianoFromReference(image));
      resize();
      frameRef.current = requestAnimationFrame(draw);
    };

    const observer = new ResizeObserver(handleResize);
    observer.observe(canvas);
    media.addEventListener("change", handleResize);
    window.addEventListener("resize", handleResize);

    return () => {
      disposed = true;
      cancelAnimationFrame(frameRef.current);
      observer.disconnect();
      media.removeEventListener("change", handleResize);
      window.removeEventListener("resize", handleResize);
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
