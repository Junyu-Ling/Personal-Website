import { motion } from "motion/react";
import { Star } from "lucide-react";

export function FeaturedStar({ size = 20 }: { size?: number }) {
  return (
    <motion.div
      className="relative shrink-0"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 18 }}
    >
      <motion.span
        className="absolute inset-0 rounded-full bg-amber-300/30 blur-md"
        animate={{ opacity: [0.35, 0.7, 0.35], scale: [0.9, 1.15, 0.9] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <Star
        size={size}
        className="relative fill-amber-400 text-amber-500 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]"
        strokeWidth={1.5}
      />
    </motion.div>
  );
}
