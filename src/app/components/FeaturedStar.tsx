import { motion } from "motion/react";
import { Star } from "lucide-react";

export function FeaturedStar({ size = 18 }: { size?: number }) {
  return (
    <motion.div
      className="relative shrink-0"
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
    >
      <Star
        size={size}
        className="fill-foreground/90 text-foreground"
        strokeWidth={1.5}
      />
    </motion.div>
  );
}
