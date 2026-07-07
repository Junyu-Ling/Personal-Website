import { motion } from "motion/react";
import { Star } from "lucide-react";

const particles = [
  { x: -14, y: -10, delay: 0 },
  { x: 16, y: -8, delay: 0.4 },
  { x: -10, y: 12, delay: 0.8 },
  { x: 14, y: 10, delay: 1.2 },
  { x: 0, y: -16, delay: 0.6 },
  { x: -16, y: 4, delay: 1.0 },
];

export function FeaturedStars() {
  return (
    <div className="relative flex items-center gap-0.5 p-2" aria-hidden>
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-100/80 via-yellow-50/60 to-orange-100/70 blur-md" />

      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="absolute w-1 h-1 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.9)]"
          style={{ left: "50%", top: "50%" }}
          animate={{
            x: [p.x, p.x * 1.3, p.x],
            y: [p.y, p.y * 1.3, p.y],
            opacity: [0.2, 1, 0.2],
            scale: [0.6, 1.2, 0.6],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="relative"
          initial={{ opacity: 0, scale: 0, rotate: -30 }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: 0,
            y: [0, -2, 0],
          }}
          transition={{
            opacity: { duration: 0.4, delay: i * 0.1 },
            scale: { type: "spring", stiffness: 320, damping: 16, delay: i * 0.1 },
            rotate: { duration: 0.5, delay: i * 0.1 },
            y: { duration: 2.5, repeat: Infinity, delay: i * 0.35, ease: "easeInOut" },
          }}
          style={{ perspective: 400 }}
        >
          <motion.div
            animate={{ rotateY: [0, 18, 0, -18, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
          >
            <Star
              size={16}
              className="fill-amber-400 text-amber-500 drop-shadow-[0_2px_8px_rgba(251,191,36,0.55)]"
              strokeWidth={1.5}
            />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
