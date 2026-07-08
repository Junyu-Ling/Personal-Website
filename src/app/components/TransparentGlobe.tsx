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

    const drawArc = (
      latStart: number,
      latEnd: number,
      lon: number,
      steps: number,
      stroke: string,
      widthPx: number,
      cx: number,
      cy: number,
      radius: number,
      rotY: number,
      tiltX: number
    ) => {
      let started = false;
      for (let i = 0; i <= steps; i++) {
        const lat = latStart + ((latEnd - latStart) * i) / steps;
        const point = project(spherePoint(lat, lon, 1), cx, cy, radius, rotY, tiltX);
        const alpha = 0.08 + ((point.z + 1) / 2) * 0.26;
        ctx.strokeStyle = stroke.replace("ALPHA", alpha.toFixed(3));
        ctx.lineWidth = widthPx * point.scale;

        if (point.z < -0.08) {
          started = false;
          continue;
        }

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
      widthPx: number,
      cx: number,
      cy: number,
      radius: number,
      rotY: number,
      tiltX: number
    ) => {
      let started = false;
      for (let i = 0; i <= steps; i++) {
        const lon = lonStart + ((lonEnd - lonStart) * i) / steps;
        const point = project(spherePoint(lat, lon, 1), cx, cy, radius, rotY, tiltX);
        const alpha = 0.07 + ((point.z + 1) / 2) * 0.22;
        ctx.strokeStyle = stroke.replace("ALPHA", alpha.toFixed(3));
        ctx.lineWidth = widthPx * point.scale;

        if (point.z < -0.08) {
          started = false;
          continue;
        }

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

      for (let lon = -180; lon < 180; lon += 18) {
        drawArc(
          -82,
          82,
          lon,
          48,
          "rgba(56, 189, 248, ALPHA)",
          0.75,
          cx,
          cy,
          radius,
          rotY,
          tiltX
        );
      }

      for (let lat = -60; lat <= 60; lat += 15) {
        if (lat === 0) continue;
        drawParallel(
          lat,
          -180,
          180,
          72,
          "rgba(99, 102, 241, ALPHA)",
          0.65,
          cx,
          cy,
          radius,
          rotY,
          tiltX
        );
      }

      drawParallel(
        0,
        -180,
        180,
        72,
        "rgba(56, 189, 248, ALPHA)",
        0.95,
        cx,
        cy,
        radius,
        rotY,
        tiltX
      );

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
