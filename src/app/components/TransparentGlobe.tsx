import { useEffect, useRef } from "react";

type Vec3 = { x: number; y: number; z: number };

type Projected = { x: number; y: number; z: number; scale: number };

type GridParticle = {
  base: Vec3;
  phase: number;
  speed: number;
  curveId: number;
  index: number;
};

type GridCurve = {
  id: number;
  samples: Vec3[];
};

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

function spherePoint(lat: number, lon: number): Vec3 {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;
  return {
    x: -Math.sin(phi) * Math.cos(theta),
    y: Math.cos(phi),
    z: Math.sin(phi) * Math.sin(theta),
  };
}

function depthAlpha(z: number, front = 0.34, back = 0.07): number {
  const t = (z + 1) / 2;
  return back + t * (front - back);
}

function buildGlobeFramework(): { curves: GridCurve[]; particles: GridParticle[] } {
  const curves: GridCurve[] = [];
  const particles: GridParticle[] = [];
  let curveId = 0;

  const addCurve = (samples: Vec3[]) => {
    const id = curveId++;
    curves.push({ id, samples });
    samples.forEach((base, index) => {
      particles.push({
        base,
        phase: Math.random() * Math.PI * 2,
        speed: 0.35 + Math.random() * 0.75,
        curveId: id,
        index,
      });
    });
  };

  for (let lon = -180; lon < 180; lon += 15) {
    const samples: Vec3[] = [];
    for (let lat = -88; lat <= 88; lat += 2.2) {
      samples.push(spherePoint(lat, lon));
    }
    addCurve(samples);
  }

  for (let lat = -75; lat <= 75; lat += 15) {
    const samples: Vec3[] = [];
    for (let lon = -180; lon <= 180; lon += 2.4) {
      samples.push(spherePoint(lat, lon));
    }
    addCurve(samples);
  }

  return { curves, particles };
}

type TransparentGlobeProps = {
  className?: string;
};

export function TransparentGlobe({ className = "" }: TransparentGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const frameworkRef = useRef(buildGlobeFramework());

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
    ): Projected => {
      let rotated = rotateY(point, rotY);
      rotated = rotateX(rotated, tiltX);
      const perspective = 1.14 / (1.14 - rotated.z * 0.3);
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
      const rotY = reducedMotion ? 0.55 : time * 0.00018;
      const tiltX = -0.28;
      const { curves, particles } = frameworkRef.current;

      const projectedByCurve = curves.map((curve) =>
        curve.samples.map((sample) => project(sample, cx, cy, radius, rotY, tiltX))
      );

      for (const projected of projectedByCurve) {
        for (let i = 0; i < projected.length - 1; i++) {
          const from = projected[i];
          const to = projected[i + 1];
          const depth = (from.z + to.z) / 2;
          const alpha = depthAlpha(depth, 0.28, 0.06);
          const lineWidth = (depth > 0 ? 0.9 : 0.65) * ((from.scale + to.scale) / 2);

          ctx.beginPath();
          ctx.moveTo(from.x, from.y);
          ctx.lineTo(to.x, to.y);
          ctx.strokeStyle = `rgba(55, 55, 55, ${alpha})`;
          ctx.lineWidth = lineWidth;
          ctx.stroke();
        }
      }

      for (const particle of particles) {
        const drift = reducedMotion
          ? 0
          : Math.sin(time * 0.001 * particle.speed + particle.phase) * 0.012;
        const lift = reducedMotion
          ? 0
          : Math.cos(time * 0.00085 * particle.speed + particle.phase) * 0.01;

        const point = project(
          {
            x: particle.base.x + drift,
            y: particle.base.y + lift,
            z: particle.base.z,
          },
          cx,
          cy,
          radius,
          rotY,
          tiltX
        );

        const alpha = depthAlpha(point.z, 0.42, 0.1);
        const pulse = reducedMotion
          ? 1
          : 0.82 + Math.sin(time * 0.0016 * particle.speed + particle.phase) * 0.18;
        const size = Math.max(1.1, 1.35 * point.scale * (point.z > 0 ? 1 : 0.85));

        ctx.beginPath();
        ctx.fillStyle = `rgba(40, 40, 40, ${alpha * pulse})`;
        ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
        ctx.fill();
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
