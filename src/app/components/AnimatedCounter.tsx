import { useEffect, useState } from "react";

type AnimatedCounterProps = {
  value: number;
  suffix?: string;
  active: boolean;
  className?: string;
};

export function AnimatedCounter({
  value,
  suffix = "",
  active,
  className = "",
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) {
      setCount(0);
      return;
    }

    let frame = 0;
    const duration = 1100;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * value));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, value]);

  return (
    <span className={`font-mono tabular-nums ${className}`}>
      {count}
      {suffix}
    </span>
  );
}
