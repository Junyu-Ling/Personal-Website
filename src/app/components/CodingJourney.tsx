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

const journeyMeta = [
  {
    icon: Laptop,
    iconWrap: "bg-violet-50 text-violet-600",
    card: "from-violet-500/10 via-white to-white",
    chip: "bg-violet-50 text-violet-700 border-violet-100",
    line: "bg-violet-400",
    watermark: "text-violet-100",
  },
  {
    icon: Terminal,
    iconWrap: "bg-indigo-50 text-indigo-600",
    card: "from-indigo-500/10 via-white to-white",
    chip: "bg-indigo-50 text-indigo-700 border-indigo-100",
    line: "bg-indigo-400",
    watermark: "text-indigo-100",
  },
  {
    icon: Code2,
    iconWrap: "bg-sky-50 text-sky-600",
    card: "from-sky-500/10 via-white to-white",
    chip: "bg-sky-50 text-sky-700 border-sky-100",
    line: "bg-sky-400",
    watermark: "text-sky-100",
  },
  {
    icon: Cpu,
    iconWrap: "bg-cyan-50 text-cyan-600",
    card: "from-cyan-500/10 via-white to-white",
    chip: "bg-cyan-50 text-cyan-700 border-cyan-100",
    line: "bg-cyan-400",
    watermark: "text-cyan-100",
  },
  {
    icon: Layout,
    iconWrap: "bg-emerald-50 text-emerald-600",
    card: "from-emerald-500/10 via-white to-white",
    chip: "bg-emerald-50 text-emerald-700 border-emerald-100",
    line: "bg-emerald-400",
    watermark: "text-emerald-100",
  },
  {
    icon: Globe,
    iconWrap: "bg-amber-50 text-amber-600",
    card: "from-amber-500/10 via-white to-white",
    chip: "bg-amber-50 text-amber-700 border-amber-100",
    line: "bg-amber-400",
    watermark: "text-amber-100",
  },
];

type JourneyItemProps = {
  index: number;
  year: string;
  title: string;
  description: string;
  icon: typeof Laptop;
  iconWrap: string;
  card: string;
  chip: string;
  line: string;
  watermark: string;
  isLast: boolean;
};

function JourneyTimelineItem({
  index,
  year,
  title,
  description,
  icon: Icon,
  iconWrap,
  card,
  chip,
  line,
  watermark,
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
      transition={{ duration: 0.4 }}
    >
      {!isLast && (
        <motion.div
          className={`absolute left-[1.65rem] md:left-[1.9rem] top-14 w-px ${line} opacity-35 origin-top`}
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 0.55, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
          style={{ height: "calc(100% + 2.5rem)" }}
        />
      )}

      <motion.div
        className="absolute left-0 top-1 z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-gray-200/80 bg-white shadow-sm"
        initial={{ opacity: 0, scale: 0.65 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.65 }}
        transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
        whileHover={{ scale: 1.05 }}
      >
        <div className={`rounded-xl p-2.5 ${iconWrap}`}>
          <Icon size={22} strokeWidth={1.75} />
        </div>
      </motion.div>

      <motion.article
        className={`group relative overflow-hidden rounded-3xl border border-gray-200/80 bg-gradient-to-br ${card} p-6 md:p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gray-300/90 hover:shadow-lg hover:shadow-gray-200/60`}
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.55, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        <span
          className={`pointer-events-none absolute -right-2 -top-4 text-7xl md:text-8xl font-bold leading-none select-none ${watermark}`}
          aria-hidden="true"
        >
          {step}
        </span>

        <div className="relative z-10 flex flex-wrap items-center gap-2 mb-4">
          <span
            className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-wide uppercase ${chip}`}
          >
            {year}
          </span>
          <span className="text-[11px] font-mono tracking-[0.2em] text-gray-400 uppercase">
            Step {step}
          </span>
        </div>

        <h3 className="relative z-10 text-xl md:text-2xl font-semibold text-gray-900 mb-3 tracking-tight">
          {title}
        </h3>
        <p className="relative z-10 text-base md:text-[1.05rem] text-gray-500 leading-relaxed">
          {description}
        </p>
      </motion.article>
    </motion.div>
  );
}

export function CodingJourney() {
  const { t } = useLanguage();
  const { ref, isVisible, transition } = useInViewOnScrollDown({
    margin: "-100px",
  });

  return (
    <section
      id="journey"
      className="section-shell relative overflow-hidden section-divide section-surface-alt"
      ref={ref}
    >
      <div className="absolute inset-0 opacity-[0.22] pointer-events-none section-dots" />
      <div className="absolute top-28 -right-24 w-72 h-72 rounded-full bg-violet-100/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 -left-20 w-64 h-64 rounded-full bg-sky-100/25 blur-3xl pointer-events-none" />

      <div className="absolute top-32 left-6 w-14 h-14 border-t border-l border-gray-200/80 pointer-events-none hidden md:block" />
      <div className="absolute top-32 right-6 w-14 h-14 border-t border-r border-gray-200/80 pointer-events-none hidden md:block" />

      <div className="container-site relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={transition({ duration: 0.8 })}
          className="mb-16 md:mb-20 text-left"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 border border-gray-200/70 shadow-sm backdrop-blur-sm mb-6">
            <Sparkles className="text-amber-500 w-4 h-4" />
            <span className="text-sm font-medium text-gray-600">
              {t.journey.badge}
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl mb-4 text-gray-900 tracking-tight text-left leading-[1.08] pb-[0.06em]">
            {t.journey.title}
          </h2>
          <p className="text-lg md:text-xl text-gray-500 leading-relaxed max-w-2xl text-left">
            {t.journey.subtitle}
          </p>
        </motion.div>

        <div className="relative w-full">
          <div className="absolute left-[1.65rem] md:left-[1.9rem] top-3 bottom-3 w-px bg-gradient-to-b from-gray-200 via-gray-300/70 to-gray-200 pointer-events-none" />

          <div>
            {t.journey.items.map((item, index) => {
              const meta = journeyMeta[index];

              return (
                <JourneyTimelineItem
                  key={index}
                  index={index}
                  year={item.year}
                  title={item.title}
                  description={item.description}
                  icon={meta.icon}
                  iconWrap={meta.iconWrap}
                  card={meta.card}
                  chip={meta.chip}
                  line={meta.line}
                  watermark={meta.watermark}
                  isLast={index === t.journey.items.length - 1}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
