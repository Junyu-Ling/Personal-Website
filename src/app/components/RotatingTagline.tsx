import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

type RotatingTaglineProps = {
  lines: string[];
  active: boolean;
};

export function RotatingTagline({ lines, active }: RotatingTaglineProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!active || lines.length <= 1) return;

    const interval = setInterval(() => {
      setIndex((current) => (current + 1) % lines.length);
    }, 3600);

    return () => clearInterval(interval);
  }, [active, lines.length]);

  if (lines.length === 0) return null;

  return (
    <div className="h-8 md:h-9 mb-8 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.p
          key={lines[index]}
          className="text-sm md:text-base text-muted-foreground font-medium tracking-wide"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.45 }}
        >
          {lines[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
