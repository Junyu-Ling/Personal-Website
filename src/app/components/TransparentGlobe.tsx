import { useEffect, useRef } from "react";

type Vec3 = { x: number; y: number; z: number };

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

function spherePoint(lat: number, lon: number, radius: number): Vec3 {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;
  return {
    x: -radius * Math.sin(phi) * Math.cos(theta),
    y: radius * Math.cos(phi),
    z: radius * Math.sin(phi) * Math.sin(theta),
  };
}

function isLandMass(lat: number, lon: number): boolean {
  const regions = [
    { lat: [15, 72], lon: [-168, -52] },
    { lat: [-56, 13], lon: [-82, -34] },
    { lat: [36, 71], lon: [-25, 45] },
    { lat: [-35, 37], lon: [-18, 52] },
    { lat: [-44, -10], lon: [112, 154] },
    { lat: [5, 55], lon: [68, 140] },
    { lat: [-48, -5], lon: [95, 180] },
    { lat: [60, 84], lon: [-45, 65] },
  ];

  return regions.some(
    (region) =>
      lat >= region.lat[0] &&
      lat <= region.lat[1] &&
      lon >= region.lon[0] &&
      lon <= region.lon[1]
  );
}

type TransparentGlobeProps = {
  className?: string;
};

export function TransparentGlobe({ className = "" }: TransparentGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const landDots: Vec3[] = [];
    for (let lat = -78; lat <= 78; lat += 3.2) {
      for (let lon = -180; lon < 180; lon += 3.2) {
        if (!isLandMass(lat, lon)) continue;
        if (Math.random() > 0.62) continue;
        landDots.push(spherePoint(lat, lon + (Math.random() - 0.5) * 1.2, 1));
      }
    }

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
      const perspective = 1.15 / (1.15 - rotated.z * 0.35);
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

      const cx = width * 0.5;
      const cy = height * 0.5;
      const radius = Math.min(width, height) * 0.38;
      const rotY = reducedMotion ? 0.55 : time * 0.00018;
      const tiltX = -0.28;

      const atmosphere = ctx.createRadialGradient(
        cx,
        cy,
        radius * 0.72,
        cx,
        cy,
        radius * 1.08
      );
      atmosphere.addColorStop(0, "rgba(56, 189, 248, 0)");
      atmosphere.addColorStop(0.55, "rgba(56, 189, 248, 0.05)");
      atmosphere.addColorStop(1, "rgba(99, 102, 241, 0.08)");
      ctx.fillStyle = atmosphere;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.08, 0, Math.PI * 2);
      ctx.fill();

      const drawArc = (
        latStart: number,
        latEnd: number,
        lon: number,
        steps: number,
        stroke: string,
        widthPx: number
      ) => {
        let started = false;
        for (let i = 0; i <= steps; i++) {
          const lat = latStart + ((latEnd - latStart) * i) / steps;
          const point = project(spherePoint(lat, lon, 1), cx, cy, radius, rotY, tiltX);
          if (point.z < -0.08) {
            started = false;
            continue;
          }
          const alpha = 0.12 + ((point.z + 1) / 2) * 0.28;
          ctx.strokeStyle = stroke.replace("ALPHA", alpha.toFixed(3));
          ctx.lineWidth = widthPx * point.scale;
          if (!started) {
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            started = true;
          } else {
            ctx.lineTo(point.x, point.y);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
          }
        }
        if (started) ctx.stroke();
      };

      const drawParallel = (
        lat: number,
        lonStart: number,
        lonEnd: number,
        steps: number,
        stroke: string,
        widthPx: number
      ) => {
        let started = false;
        for (let i = 0; i <= steps; i++) {
          const lon = lonStart + ((lonEnd - lonStart) * i) / steps;
          const point = project(spherePoint(lat, lon, 1), cx, cy, radius, rotY, tiltX);
          if (point.z < -0.08) {
            started = false;
            continue;
          }
          const alpha = 0.1 + ((point.z + 1) / 2) * 0.24;
          ctx.strokeStyle = stroke.replace("ALPHA", alpha.toFixed(3));
          ctx.lineWidth = widthPx * point.scale;
          if (!started) {
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            started = true;
          } else {
            ctx.lineTo(point.x, point.y);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
          }
        }
        if (started) ctx.stroke();
      };

      for (let lon = -180; lon < 180; lon += 18) {
        drawArc(-82, 82, lon, 48, "rgba(56, 189, 248, ALPHA)", 0.75);
      }

      for (let lat = -60; lat <= 60; lat += 15) {
        if (lat === 0) continue;
        drawParallel(lat, -180, 180, 72, "rgba(99, 102, 241, ALPHA)", 0.65);
      }

      drawParallel(0, -180, 180, 72, "rgba(56, 189, 248, ALPHA)", 0.95);

      for (const dot of landDots) {
        const point = project(dot, cx, cy, radius * 0.995, rotY, tiltX);
        if (point.z < 0.02) continue;
        const alpha = 0.08 + ((point.z + 1) / 2) * 0.34;
        const size = (0.8 + point.scale * 0.45) * (width / 420);
        ctx.beginPath();
        ctx.fillStyle = `rgba(16, 185, 129, ${alpha})`;
        ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      const shellSteps = 120;
      for (let i = 0; i < shellSteps; i++) {
        const angle = (i / shellSteps) * Math.PI * 2;
        const point = project(
          { x: Math.cos(angle), y: Math.sin(angle) * 0.12, z: Math.sin(angle) * 0.08 },
          cx,
          cy,
          radius * 1.01,
          rotY,
          tiltX
        );
        if (point.z < -0.2) continue;
        const alpha = 0.04 + ((point.z + 1) / 2) * 0.1;
        ctx.beginPath();
        ctx.fillStyle = `rgba(99, 102, 241, ${alpha})`;
        ctx.arc(point.x, point.y, 1.1 * point.scale, 0, Math.PI * 2);
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
