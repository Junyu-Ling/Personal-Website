import { useEffect, useRef } from "react";
import * as THREE from "three";

const EARTH_TEXTURE =
  "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg";

const GOLDEN_RATIO = (1 + Math.sqrt(5)) / 2;

function fibonacciSphere(count: number, radius: number) {
  const points: THREE.Vector3[] = [];
  for (let i = 0; i < count; i++) {
    const theta = (2 * Math.PI * i) / GOLDEN_RATIO;
    const y = 1 - (i / (count - 1)) * 2;
    const rAtY = Math.sqrt(Math.max(0, 1 - y * y));
    points.push(
      new THREE.Vector3(
        Math.cos(theta) * rAtY * radius,
        y * radius,
        Math.sin(theta) * rAtY * radius,
      ),
    );
  }
  return points;
}

function sphereUv(position: THREE.Vector3) {
  const n = position.clone().normalize();
  return {
    u: 0.5 + Math.atan2(n.z, n.x) / (2 * Math.PI),
    v: 0.5 - Math.asin(THREE.MathUtils.clamp(n.y, -1, 1)) / Math.PI,
  };
}

function sampleTextureColor(
  imageData: ImageData,
  u: number,
  v: number,
): THREE.Color {
  const { width, height, data } = imageData;
  const x = Math.min(width - 1, Math.max(0, Math.floor(u * width)));
  const y = Math.min(height - 1, Math.max(0, Math.floor(v * height)));
  const index = (y * width + x) * 4;
  const color = new THREE.Color();
  color.setRGB(data[index] / 255, data[index + 1] / 255, data[index + 2] / 255);
  return color;
}

function buildEarthParticles(
  positions: THREE.Vector3[],
  imageData: ImageData | null,
) {
  const geometry = new THREE.BufferGeometry();
  const posArray = new Float32Array(positions.length * 3);
  const colorArray = new Float32Array(positions.length * 3);
  const sizeArray = new Float32Array(positions.length);

  positions.forEach((point, i) => {
    posArray[i * 3] = point.x;
    posArray[i * 3 + 1] = point.y;
    posArray[i * 3 + 2] = point.z;

    let color: THREE.Color;
    if (imageData) {
      const { u, v } = sphereUv(point);
      color = sampleTextureColor(imageData, u, v);
      color.lerp(new THREE.Color("#38bdf8"), 0.08);
    } else {
      const { u, v } = sphereUv(point);
      const land =
        Math.sin(u * Math.PI * 6) * Math.cos(v * Math.PI * 4) > 0.15;
      color = land ? new THREE.Color("#22c55e") : new THREE.Color("#0284c7");
    }

    colorArray[i * 3] = color.r;
    colorArray[i * 3 + 1] = color.g;
    colorArray[i * 3 + 2] = color.b;

    const depth = 0.85 + point.z * 0.0015;
    sizeArray[i] = THREE.MathUtils.randFloat(1.4, 2.6) * depth;
  });

  geometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colorArray, 3));
  geometry.setAttribute("size", new THREE.BufferAttribute(sizeArray, 1));

  return geometry;
}

function buildAtmosphereParticles(radius: number, count: number) {
  const geometry = new THREE.BufferGeometry();
  const positions = fibonacciSphere(count, radius);
  const posArray = new Float32Array(count * 3);
  const colorArray = new Float32Array(count * 3);

  positions.forEach((point, i) => {
    posArray[i * 3] = point.x;
    posArray[i * 3 + 1] = point.y;
    posArray[i * 3 + 2] = point.z;

    const glow = new THREE.Color("#7dd3fc");
    glow.lerp(new THREE.Color("#ffffff"), 0.35);
    colorArray[i * 3] = glow.r;
    colorArray[i * 3 + 1] = glow.g;
    colorArray[i * 3 + 2] = glow.b;
  });

  geometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colorArray, 3));
  return geometry;
}

function buildOrbitRing(radius: number, count: number, tilt: number) {
  const geometry = new THREE.BufferGeometry();
  const posArray = new Float32Array(count * 3);
  const colorArray = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const y = Math.sin(angle * 3) * radius * 0.04;

    const point = new THREE.Vector3(x, y, z);
    point.applyAxisAngle(new THREE.Vector3(1, 0, 0.35), tilt);

    posArray[i * 3] = point.x;
    posArray[i * 3 + 1] = point.y;
    posArray[i * 3 + 2] = point.z;

    const color = new THREE.Color("#60a5fa");
    colorArray[i * 3] = color.r;
    colorArray[i * 3 + 1] = color.g;
    colorArray[i * 3 + 2] = color.b;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colorArray, 3));
  return geometry;
}

function buildStarField(count: number, spread: number) {
  const geometry = new THREE.BufferGeometry();
  const posArray = new Float32Array(count * 3);
  const colorArray = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    posArray[i * 3] = THREE.MathUtils.randFloatSpread(spread);
    posArray[i * 3 + 1] = THREE.MathUtils.randFloatSpread(spread);
    posArray[i * 3 + 2] = THREE.MathUtils.randFloatSpread(spread);

    const brightness = THREE.MathUtils.randFloat(0.35, 1);
    colorArray[i * 3] = brightness;
    colorArray[i * 3 + 1] = brightness;
    colorArray[i * 3 + 2] = brightness + 0.08;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colorArray, 3));
  return geometry;
}

export function HeroEarthParticles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isMobile = window.innerWidth < 768;
    const earthCount = isMobile ? 6000 : 14000;
    const earthRadius = isMobile ? 2.2 : 2.6;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0.35, 6.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    const stars = new THREE.Points(
      buildStarField(isMobile ? 500 : 900, 28),
      new THREE.PointsMaterial({
        size: 0.035,
        vertexColors: true,
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    scene.add(stars);

    let earthPoints: THREE.Points | null = null;
    let atmospherePoints: THREE.Points | null = null;
    let orbitPoints: THREE.Points | null = null;

    const createGlobe = (imageData: ImageData | null) => {
      if (earthPoints) globeGroup.remove(earthPoints);
      if (atmospherePoints) globeGroup.remove(atmospherePoints);
      if (orbitPoints) globeGroup.remove(orbitPoints);

      earthPoints?.geometry.dispose();
      (earthPoints?.material as THREE.Material)?.dispose();
      atmospherePoints?.geometry.dispose();
      (atmospherePoints?.material as THREE.Material)?.dispose();
      orbitPoints?.geometry.dispose();
      (orbitPoints?.material as THREE.Material)?.dispose();

      const earthPositions = fibonacciSphere(earthCount, earthRadius);
      earthPoints = new THREE.Points(
        buildEarthParticles(earthPositions, imageData),
        new THREE.PointsMaterial({
          size: isMobile ? 0.045 : 0.038,
          vertexColors: true,
          transparent: true,
          opacity: 0.92,
          depthWrite: false,
          blending: THREE.NormalBlending,
          sizeAttenuation: true,
        }),
      );
      globeGroup.add(earthPoints);

      atmospherePoints = new THREE.Points(
        buildAtmosphereParticles(earthRadius * 1.12, isMobile ? 1200 : 2200),
        new THREE.PointsMaterial({
          size: isMobile ? 0.05 : 0.042,
          vertexColors: true,
          transparent: true,
          opacity: 0.28,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          sizeAttenuation: true,
        }),
      );
      globeGroup.add(atmospherePoints);

      orbitPoints = new THREE.Points(
        buildOrbitRing(earthRadius * 1.55, isMobile ? 180 : 320, 0.65),
        new THREE.PointsMaterial({
          size: 0.05,
          vertexColors: true,
          transparent: true,
          opacity: 0.45,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          sizeAttenuation: true,
        }),
      );
      globeGroup.add(orbitPoints);
    };

    createGlobe(null);

    const textureLoader = new THREE.TextureLoader();
    textureLoader.setCrossOrigin("anonymous");
    textureLoader.load(
      EARTH_TEXTURE,
      (texture) => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = texture.image.width;
        canvas.height = texture.image.height;
        ctx.drawImage(texture.image, 0, 0);
        createGlobe(ctx.getImageData(0, 0, canvas.width, canvas.height));
        texture.dispose();
      },
      undefined,
      () => createGlobe(null),
    );

    const mouse = { x: 0, y: 0 };
    const targetRotation = { x: 0.18, y: 0 };

    const onMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    const onTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      mouse.x = (touch.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (touch.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    const resize = () => {
      const { clientWidth, clientHeight } = container;
      renderer.setSize(clientWidth, clientHeight);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    let frameId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        targetRotation.y = elapsed * 0.12 + mouse.x * 0.22;
        targetRotation.x = 0.18 + mouse.y * 0.12;
      }

      globeGroup.rotation.y = THREE.MathUtils.lerp(
        globeGroup.rotation.y,
        targetRotation.y,
        0.04,
      );
      globeGroup.rotation.x = THREE.MathUtils.lerp(
        globeGroup.rotation.x,
        targetRotation.x,
        0.04,
      );

      if (orbitPoints && !prefersReducedMotion) {
        orbitPoints.rotation.y = elapsed * 0.08;
      }

      stars.rotation.y = elapsed * 0.015;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      resizeObserver.disconnect();

      earthPoints?.geometry.dispose();
      (earthPoints?.material as THREE.Material)?.dispose();
      atmospherePoints?.geometry.dispose();
      (atmospherePoints?.material as THREE.Material)?.dispose();
      orbitPoints?.geometry.dispose();
      (orbitPoints?.material as THREE.Material)?.dispose();
      stars.geometry.dispose();
      (stars.material as THREE.Material).dispose();
      renderer.dispose();

      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden
    />
  );
}
