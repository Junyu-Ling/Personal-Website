import { useEffect, useRef } from "react";

type Point = { x: number; y: number };

type WireCurve = {
  samples: Point[];
  phase: number;
  weight?: number;
};

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function sampleLine(a: Point, b: Point, count: number): Point[] {
  const points: Point[] = [];
  for (let i = 0; i < count; i++) {
    const t = count === 1 ? 0 : i / (count - 1);
    points.push({ x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t) });
  }
  return points;
}

function sampleQuadratic(p0: Point, p1: Point, p2: Point, count: number): Point[] {
  const points: Point[] = [];
  for (let i = 0; i < count; i++) {
    const t = count === 1 ? 0 : i / (count - 1);
    const u = 1 - t;
    points.push({
      x: u * u * p0.x + 2 * u * t * p1.x + t * t * p2.x,
      y: u * u * p0.y + 2 * u * t * p1.y + t * t * p2.y,
    });
  }
  return points;
}

function sampleCubic(
  p0: Point,
  p1: Point,
  p2: Point,
  p3: Point,
  count: number
): Point[] {
  const points: Point[] = [];
  for (let i = 0; i < count; i++) {
    const t = count === 1 ? 0 : i / (count - 1);
    const u = 1 - t;
    points.push({
      x:
        u * u * u * p0.x +
        3 * u * u * t * p1.x +
        3 * u * t * t * p2.x +
        t * t * t * p3.x,
      y:
        u * u * u * p0.y +
        3 * u * u * t * p1.y +
        3 * u * t * t * p2.y +
        t * t * t * p3.y,
    });
  }
  return points;
}

function sampleArc(cx: number, cy: number, rx: number, ry: number, count: number): Point[] {
  const points: Point[] = [];
  for (let i = 0; i < count; i++) {
    const t = count === 1 ? 0 : i / (count - 1);
    const angle = t * Math.PI * 2;
    points.push({
      x: cx + Math.cos(angle) * rx,
      y: cy + Math.sin(angle) * ry,
    });
  }
  return points;
}

function addCurve(curves: WireCurve[], samples: Point[], weight = 1) {
  curves.push({ samples, phase: Math.random() * Math.PI * 2, weight });
}

function buildPianoWireframe(): WireCurve[] {
  const curves: WireCurve[] = [];

  addCurve(
    curves,
    sampleCubic(
      { x: 16, y: 54 },
      { x: 10, y: 58 },
      { x: 22, y: 63 },
      { x: 36, y: 61 },
      28
    ),
    1.15
  );
  addCurve(
    curves,
    sampleCubic(
      { x: 36, y: 61 },
      { x: 58, y: 64 },
      { x: 82, y: 58 },
      { x: 94, y: 46 },
      34
    ),
    1.15
  );
  addCurve(
    curves,
    sampleQuadratic({ x: 94, y: 46 }, { x: 98, y: 32 }, { x: 86, y: 22 }, 22),
    1.15
  );
  addCurve(
    curves,
    sampleCubic(
      { x: 86, y: 22 },
      { x: 66, y: 17 },
      { x: 40, y: 22 },
      { x: 24, y: 34 },
      30
    ),
    1.15
  );
  addCurve(curves, sampleLine({ x: 24, y: 34 }, { x: 16, y: 54 }, 16), 1.15);

  addCurve(
    curves,
    sampleCubic(
      { x: 28, y: 38 },
      { x: 48, y: 30 },
      { x: 72, y: 32 },
      { x: 84, y: 42 },
      26
    ),
    0.9
  );

  addCurve(
    curves,
    sampleCubic(
      { x: 30, y: 36 },
      { x: 52, y: 17 },
      { x: 78, y: 13 },
      { x: 92, y: 21 },
      30
    ),
    1.1
  );
  addCurve(
    curves,
    sampleCubic(
      { x: 30, y: 36 },
      { x: 36, y: 30 },
      { x: 58, y: 24 },
      { x: 88, y: 25 },
      24
    ),
    0.85
  );
  addCurve(curves, sampleLine({ x: 54, y: 27 }, { x: 58, y: 41 }, 10), 0.8);

  for (const y of [40, 45, 50, 55]) {
    const startX = y < 45 ? 26 : 18;
    addCurve(
      curves,
      sampleCubic(
        { x: startX, y },
        { x: 38 + (y - 40) * 0.4, y: y - 1.5 },
        { x: 62 + (y - 40) * 0.8, y: y + 0.5 },
        { x: 84 - (y - 40) * 0.6, y: y - 0.5 },
        22
      ),
      0.75
    );
  }

  for (let x = 20; x <= 34; x += 2.2) {
    addCurve(curves, sampleLine({ x, y: 49.5 }, { x, y: 53.8 }, 6), 0.7);
  }
  addCurve(curves, sampleLine({ x: 14, y: 51 }, { x: 36, y: 51 }, 14), 0.95);
  addCurve(curves, sampleLine({ x: 14, y: 53 }, { x: 36, y: 53 }, 14), 0.95);

  addCurve(curves, sampleLine({ x: 16, y: 47 }, { x: 16, y: 41 }, 8), 0.8);
  addCurve(curves, sampleLine({ x: 16, y: 41 }, { x: 24, y: 40 }, 8), 0.8);

  for (const x of [23, 49, 75]) {
    addCurve(curves, sampleLine({ x, y: 61 }, { x, y: 70.5 }, 12), 0.95);
    addCurve(curves, sampleArc(x, 71.2, 1.4, 0.55, 14), 0.75);
  }

  addCurve(curves, sampleLine({ x: 24, y: 61 }, { x: 22, y: 68 }, 8), 0.8);
  addCurve(curves, sampleLine({ x: 28, y: 61 }, { x: 30, y: 68 }, 8), 0.8);
  addCurve(curves, sampleLine({ x: 22, y: 68 }, { x: 30, y: 68 }, 10), 0.8);
  addCurve(curves, sampleLine({ x: 25, y: 68 }, { x: 25, y: 71 }, 5), 0.7);

  return curves;
}

type SteinwayParticlePianoProps = {
  className?: string;
};

export function SteinwayParticlePiano({ className = "" }: SteinwayParticlePianoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const frameworkRef = useRef(buildPianoWireframe());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const media = window.matchMedia("(min-width: 768px)");
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

    const draw = (time: number) => {
      if (width < 2 || height < 2) {
        frameRef.current = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      const scale = Math.min(width / 100, height / 74) * 1.14;
      const offsetX = width * 0.56 - 50 * scale;
      const offsetY = height * 0.52 - 37 * scale;

      for (const curve of frameworkRef.current) {
        const weight = curve.weight ?? 1;

        for (let i = 0; i < curve.samples.length - 1; i++) {
          const from = curve.samples[i];
          const to = curve.samples[i + 1];
          const pulse = reducedMotion
            ? 1
            : 0.88 + Math.sin(time * 0.0014 + curve.phase + i * 0.28) * 0.12;
          const alpha = (0.12 + weight * 0.1) * pulse;

          ctx.beginPath();
          ctx.moveTo(offsetX + from.x * scale, offsetY + from.y * scale);
          ctx.lineTo(offsetX + to.x * scale, offsetY + to.y * scale);
          ctx.strokeStyle = `rgba(55, 55, 55, ${alpha})`;
          ctx.lineWidth = 0.85 + weight * 0.35;
          ctx.stroke();
        }
      }

      frameRef.current = requestAnimationFrame(draw);
    };

    resize();
    frameRef.current = requestAnimationFrame(draw);

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    media.addEventListener("change", resize);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(frameRef.current);
      observer.disconnect();
      media.removeEventListener("change", resize);
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
