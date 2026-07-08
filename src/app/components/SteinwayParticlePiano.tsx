import { useEffect, useRef } from "react";
import steinwayReference from "@/assets/steinway-grand-reference.png";

type Segment = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  strength: number;
  phase: number;
};

function buildWireSegments(image: HTMLImageElement): Segment[] {
  const canvas = document.createElement("canvas");
  const width = image.naturalWidth;
  const height = image.naturalHeight;
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) return [];

  ctx.drawImage(image, 0, 0, width, height);
  const { data } = ctx.getImageData(0, 0, width, height);
  const edge = new Float32Array(width * height);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = y * width + x;
      const offset = index * 4;
      const lum =
        (0.299 * data[offset] + 0.587 * data[offset + 1] + 0.114 * data[offset + 2]) /
        255;
      const alpha = data[offset + 3] / 255;
      const dark = alpha > 0.2 ? 1 - lum : 0;

      const left = x > 0 ? 1 - (0.299 * data[(index - 1) * 4] + 0.587 * data[(index - 1) * 4 + 1] + 0.114 * data[(index - 1) * 4 + 2]) / 255 : dark;
      const up =
        y > 0
          ? 1 -
            (0.299 * data[(index - width) * 4] +
              0.587 * data[(index - width) * 4 + 1] +
              0.114 * data[(index - width) * 4 + 2]) /
              255
          : dark;

      edge[index] = Math.abs(dark - left) + Math.abs(dark - up);
    }
  }

  const segments: Segment[] = [];
  const step = 2;
  const threshold = 0.14;

  const toNorm = (x: number, y: number) => ({
    x: (x / width) * 100,
    y: (y / height) * 100,
  });

  for (let y = 0; y < height - step; y += step) {
    for (let x = 0; x < width - step; x += step) {
      const index = y * width + x;
      const strength = edge[index];
      if (strength < threshold) continue;

      const a = toNorm(x, y);
      const phase = Math.random() * Math.PI * 2;

      if (edge[index + step] >= threshold * 0.85) {
        const b = toNorm(x + step, y);
        segments.push({ x1: a.x, y1: a.y, x2: b.x, y2: b.y, strength, phase });
      }

      if (edge[index + width * step] >= threshold * 0.85) {
        const b = toNorm(x, y + step);
        segments.push({ x1: a.x, y1: a.y, x2: b.x, y2: b.y, strength, phase });
      }

      if (edge[index + width * step + step] >= threshold * 0.9) {
        const b = toNorm(x + step, y + step);
        segments.push({ x1: a.x, y1: a.y, x2: b.x, y2: b.y, strength: strength * 0.9, phase });
      }
    }
  }

  return segments;
}

type SteinwayParticlePianoProps = {
  className?: string;
};

export function SteinwayParticlePiano({ className = "" }: SteinwayParticlePianoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const segmentsRef = useRef<Segment[]>([]);
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

      if (width < 2 || height < 2 || segmentsRef.current.length === 0) {
        frameRef.current = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      const scale = Math.min(width / 100, height / 100) * 0.96;
      const offsetX = width * 0.54 - 50 * scale;
      const offsetY = height * 0.5 - 50 * scale;

      for (const segment of segmentsRef.current) {
        const pulse = reducedMotion
          ? 1
          : 0.88 + Math.sin(time * 0.0012 + segment.phase) * 0.12;
        const alpha = (0.05 + segment.strength * 0.22) * pulse;

        ctx.beginPath();
        ctx.moveTo(offsetX + segment.x1 * scale, offsetY + segment.y1 * scale);
        ctx.lineTo(offsetX + segment.x2 * scale, offsetY + segment.y2 * scale);
        ctx.strokeStyle = `rgba(70, 70, 70, ${alpha})`;
        ctx.lineWidth = 0.75 + segment.strength * 0.55;
        ctx.stroke();
      }

      frameRef.current = requestAnimationFrame(draw);
    };

    const handleResize = () => resize();

    const image = new Image();
    image.src = steinwayReference;
    image.onload = () => {
      if (disposed) return;
      segmentsRef.current = buildWireSegments(image);
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
