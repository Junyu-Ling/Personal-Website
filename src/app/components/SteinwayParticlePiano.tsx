import { useEffect, useRef } from "react";

type Point = { x: number; y: number };

type Particle = Point & {
  baseX: number;
  baseY: number;
  size: number;
  alpha: number;
  phase: number;
  speed: number;
};

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function sampleLine(a: Point, b: Point, count: number, jitter = 0.4): Point[] {
  const points: Point[] = [];
  for (let i = 0; i < count; i++) {
    const t = count === 1 ? 0 : i / (count - 1);
    points.push({
      x: lerp(a.x, b.x, t) + (Math.random() - 0.5) * jitter,
      y: lerp(a.y, b.y, t) + (Math.random() - 0.5) * jitter,
    });
  }
  return points;
}

function sampleQuadratic(
  p0: Point,
  p1: Point,
  p2: Point,
  count: number,
  jitter = 0.35
): Point[] {
  const points: Point[] = [];
  for (let i = 0; i < count; i++) {
    const t = count === 1 ? 0 : i / (count - 1);
    const u = 1 - t;
    points.push({
      x:
        u * u * p0.x +
        2 * u * t * p1.x +
        t * t * p2.x +
        (Math.random() - 0.5) * jitter,
      y:
        u * u * p0.y +
        2 * u * t * p1.y +
        t * t * p2.y +
        (Math.random() - 0.5) * jitter,
    });
  }
  return points;
}

function sampleCubic(
  p0: Point,
  p1: Point,
  p2: Point,
  p3: Point,
  count: number,
  jitter = 0.3
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
        t * t * t * p3.x +
        (Math.random() - 0.5) * jitter,
      y:
        u * u * u * p0.y +
        3 * u * u * t * p1.y +
        3 * u * t * t * p2.y +
        t * t * t * p3.y +
        (Math.random() - 0.5) * jitter,
    });
  }
  return points;
}

function fillRegion(
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  count: number
): Point[] {
  const points: Point[] = [];
  for (let i = 0; i < count; i++) {
    points.push({
      x: lerp(x0, x1, Math.random()),
      y: lerp(y0, y1, Math.random()),
    });
  }
  return points;
}

function buildGrandPianoSilhouette(): Point[] {
  const points: Point[] = [];

  // Keyboard & fallboard
  points.push(...fillRegion(14, 49, 36, 54, 90));
  for (let i = 0; i < 26; i++) {
    const x = 14.5 + i * 0.82;
    points.push({ x, y: 51.5 + (Math.random() - 0.5) * 0.25 });
    if (i % 3 !== 2 && i < 25) {
      points.push({ x: x + 0.45, y: 50.2 + (Math.random() - 0.5) * 0.15 });
    }
  }

  // Case rim — front to tail
  points.push(
    ...sampleCubic(
      { x: 12, y: 54 },
      { x: 8, y: 58 },
      { x: 18, y: 63 },
      { x: 34, y: 61 },
      28
    )
  );
  points.push(
    ...sampleCubic(
      { x: 34, y: 61 },
      { x: 58, y: 64 },
      { x: 82, y: 58 },
      { x: 94, y: 46 },
      42
    )
  );
  points.push(
    ...sampleQuadratic(
      { x: 94, y: 46 },
      { x: 98, y: 34 },
      { x: 86, y: 24 },
      24
    )
  );
  points.push(
    ...sampleCubic(
      { x: 86, y: 24 },
      { x: 68, y: 18 },
      { x: 42, y: 22 },
      { x: 24, y: 34 },
      34
    )
  );
  points.push(...sampleLine({ x: 24, y: 34 }, { x: 12, y: 54 }, 18));

  // Inner rim / soundboard hint
  points.push(
    ...sampleCubic(
      { x: 28, y: 38 },
      { x: 48, y: 30 },
      { x: 72, y: 32 },
      { x: 84, y: 42 },
      30,
      0.25
    )
  );

  // Open lid — Steinway signature curve
  points.push(
    ...sampleCubic(
      { x: 30, y: 35 },
      { x: 52, y: 18 },
      { x: 78, y: 14 },
      { x: 92, y: 22 },
      36
    )
  );
  points.push(
    ...sampleCubic(
      { x: 30, y: 35 },
      { x: 34, y: 30 },
      { x: 58, y: 24 },
      { x: 88, y: 26 },
      22,
      0.2
    )
  );

  // Lid prop stick
  points.push(...sampleLine({ x: 54, y: 28 }, { x: 58, y: 42 }, 10, 0.15));

  // Legs
  for (const x of [22, 48, 76]) {
    points.push(...sampleLine({ x, y: 61 }, { x, y: 70 }, 14, 0.12));
    points.push(...fillRegion(x - 1.2, 69.5, x + 1.2, 71.2, 8));
  }

  // Pedal lyre
  points.push(...sampleLine({ x: 24, y: 61 }, { x: 22, y: 68 }, 8, 0.1));
  points.push(...sampleLine({ x: 28, y: 61 }, { x: 30, y: 68 }, 8, 0.1));
  points.push(...sampleLine({ x: 22, y: 68 }, { x: 30, y: 68 }, 10, 0.1));
  points.push(...fillRegion(23, 67.5, 29, 69.5, 12));

  // Music desk
  points.push(...sampleLine({ x: 16, y: 47 }, { x: 16, y: 42 }, 8, 0.1));
  points.push(...sampleLine({ x: 16, y: 42 }, { x: 24, y: 41 }, 8, 0.1));

  // Subtle interior sparkle
  points.push(...fillRegion(38, 36, 78, 52, 55));

  return points;
}

function createParticles(template: Point[]): Particle[] {
  return template.map((point) => ({
    x: point.x,
    y: point.y,
    baseX: point.x,
    baseY: point.y,
    size: 0.55 + Math.random() * 1.15,
    alpha: 0.12 + Math.random() * 0.28,
    phase: Math.random() * Math.PI * 2,
    speed: 0.35 + Math.random() * 0.9,
  }));
}

type SteinwayParticlePianoProps = {
  className?: string;
};

export function SteinwayParticlePiano({ className = "" }: SteinwayParticlePianoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>(createParticles(buildGrandPianoSilhouette()));
  const frameRef = useRef(0);
  const rafRef = useRef<number>(0);

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

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      const scale = Math.min(width / 100, height / 74) * 0.92;
      const offsetX = width * 0.5 - 50 * scale;
      const offsetY = height * 0.52 - 37 * scale;

      for (const particle of particlesRef.current) {
        const drift = reducedMotion
          ? 0
          : Math.sin(time * 0.001 * particle.speed + particle.phase) * 0.35;
        const lift = reducedMotion
          ? 0
          : Math.cos(time * 0.0008 * particle.speed + particle.phase) * 0.25;
        const pulse = reducedMotion
          ? 1
          : 0.72 + Math.sin(time * 0.0014 * particle.speed + particle.phase) * 0.28;

        const x = offsetX + (particle.baseX + drift) * scale;
        const y = offsetY + (particle.baseY + lift) * scale;
        const alpha = particle.alpha * pulse;

        ctx.beginPath();
        ctx.fillStyle = `rgba(38, 36, 34, ${alpha})`;
        ctx.arc(x, y, particle.size * scale * 0.11, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = `rgba(120, 98, 72, ${alpha * 0.35})`;
        ctx.arc(x, y, particle.size * scale * 0.05, 0, Math.PI * 2);
        ctx.fill();
      }

      frameRef.current = requestAnimationFrame(draw);
    };

    resize();
    frameRef.current = requestAnimationFrame(draw);

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(frameRef.current);
      observer.disconnect();
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
