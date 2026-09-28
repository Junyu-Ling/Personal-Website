import { motion, useInView } from "motion/react";
import { useRef } from "react";
import {
  Code2,
  Terminal,
  Cpu,
  Globe,
  Layout,
  Laptop,
  Sparkles,
} from "lucide-react";
import { useInViewOnScrollDown } from "@/app/components/ui/use-in-view-scroll-down";
import { useLanguage } from "@/i18n/LanguageContext";
import { SectionHeader } from "@/app/components/SectionHeader";

const journeyIcons = [Laptop, Terminal, Code2, Cpu, Layout, Globe];

type JourneyItemProps = {
  index: number;
  year: string;
  title: string;
  description: string;
  icon: typeof Laptop;
  isLast: boolean;
};

function JourneyTimelineItem({
  index,
  year,
  title,
  description,
  icon: Icon,
  isLast,
}: JourneyItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });
  const step = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      ref={ref}
      className={`relative pl-16 md:pl-20 ${isLast ? "" : "pb-10 md:pb-12"}`}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      {!isLast && (
        <motion.div
          className="absolute left-[1.65rem] md:left-[1.9rem] top-14 w-px bg-border origin-top"
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 0.5, delay: 0.12, ease: [0.21, 0.47, 0.32, 0.98] }}
          style={{ height: "calc(100% + 2.5rem)" }}
        />
      )}

      <motion.div
        className="absolute left-0 top-1 z-10 flex h-14 w-14 items-center justify-center rounded-[12px] border border-border bg-card"
        style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
        transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        <div className="rounded-[10px] p-2.5 bg-secondary text-foreground">
          <Icon size={20} strokeWidth={1.75} />
        </div>
      </motion.div>

      <motion.article
        className="group relative overflow-hidden rounded-[12px] border border-border bg-card p-6 md:p-7 transition-all duration-300 hover:-translate-y-0.5"
        style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        <span
          className="pointer-events-none absolute -right-1 -top-3 text-7xl md:text-8xl font-semibold leading-none select-none text-foreground/[0.04]"
          aria-hidden="true"
        >
          {step}
        </span>

        <div className="relative z-10 flex flex-wrap items-center gap-2 mb-4">
          <span className="inline-flex items-center rounded-[8px] border border-border bg-secondary px-3 py-1 text-xs font-medium tracking-wide uppercase text-foreground">
            {year}
          </span>
          <span className="text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
            Step {step}
          </span>
        </div>

        <h3 className="relative z-10 text-xl md:text-2xl font-semibold text-foreground mb-3 tracking-tight">
          {title}
        </h3>
        <p className="relative z-10 text-base text-muted-foreground leading-[1.6]">
          {description}
        </p>
      </motion.article>
    </motion.div>
  );
}

export function CodingJourney() {
  const { t } = useLanguage();
  const { ref, isVisible } = useInViewOnScrollDown({
    margin: "-100px",
  });

  return (
    <section
      id="journey"
      className="section-shell relative overflow-hidden section-divide bg-background"
      ref={ref}
    >
      <div className="container-site relative z-10">
        <SectionHeader
          badge={t.journey.badge}
          title={t.journey.title}
          subtitle={t.journey.subtitle}
          icon={Sparkles}
          isVisible={isVisible}
        />

        <div className="relative w-full">
          <div className="absolute left-[1.65rem] md:left-[1.9rem] top-3 bottom-3 w-px bg-border pointer-events-none" />

          <div>
            {t.journey.items.map((item, index) => (
              <JourneyTimelineItem
                key={index}
                index={index}
                year={item.year}
                title={item.title}
                description={item.description}
                icon={journeyIcons[index] ?? Laptop}
                isLast={index === t.journey.items.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
