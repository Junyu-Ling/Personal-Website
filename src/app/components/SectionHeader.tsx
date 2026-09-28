import type { LucideIcon } from "lucide-react";
import { motion } from "motion/react";

type SectionHeaderProps = {
  badge: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  isVisible: boolean;
};

export function SectionHeader({
  badge,
  title,
  subtitle,
  icon: Icon,
  isVisible,
}: SectionHeaderProps) {
  return (
    <motion.div
      className="mb-16 md:mb-20 flex w-full flex-col"
      initial={{ opacity: 0, y: 36 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <div className="badge-pill mb-6 self-center">
        <Icon className="w-4 h-4 text-violet-500" />
        <span>{badge}</span>
      </div>
      <h2 className="heading-display mb-4 overflow-visible text-center">{title}</h2>
      <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl self-center text-left">
        {subtitle}
      </p>
    </motion.div>
  );
}
