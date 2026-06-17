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
    bg: "bg-blue-50",
    text: "text-blue-600",
    ring: "ring-blue-200/70",
    glow: "bg-blue-400/30",
    gradient: "from-blue-400 to-cyan-400",
    line: "from-blue-400 via-cyan-300 to-indigo-400",
    badge: "bg-blue-50 text-blue-600 border-blue-100",
  },
  {
    icon: Terminal,
    bg: "bg-indigo-50",
    text: "text-indigo-600",
    ring: "ring-indigo-200/70",
    glow: "bg-indigo-400/30",
    gradient: "from-indigo-400 to-violet-400",
    line: "from-indigo-400 via-violet-300 to-purple-400",
    badge: "bg-indigo-50 text-indigo-600 border-indigo-100",
  },
  {
    icon: Code2,
    bg: "bg-purple-50",
    text: "text-purple-600",
    ring: "ring-purple-200/70",
    glow: "bg-purple-400/30",
    gradient: "from-purple-400 to-fuchsia-400",
    line: "from-purple-400 via-fuchsia-300 to-pink-400",
    badge: "bg-purple-50 text-purple-600 border-purple-100",
  },
  {
    icon: Cpu,
    bg: "bg-pink-50",
    text: "text-pink-600",
    ring: "ring-pink-200/70",
    glow: "bg-pink-400/30",
    gradient: "from-pink-400 to-rose-400",
    line: "from-pink-400 via-rose-300 to-orange-400",
    badge: "bg-pink-50 text-pink-600 border-pink-100",
  },
  {
    icon: Layout,
    bg: "bg-rose-50",
    text: "text-rose-600",
    ring: "ring-rose-200/70",
    glow: "bg-rose-400/30",
    gradient: "from-rose-400 to-orange-400",
    line: "from-rose-400 via-orange-300 to-amber-400",
    badge: "bg-rose-50 text-rose-600 border-rose-100",
  },
  {
    icon: Globe,
    bg: "bg-orange-50",
    text: "text-orange-600",
    ring: "ring-orange-200/70",
    glow: "bg-orange-400/30",
    gradient: "from-orange-400 to-amber-400",
    line: "from-orange-400 via-amber-300 to-yellow-400",
    badge: "bg-orange-50 text-orange-600 border-orange-100",
  },
];

type JourneyItemProps = {
  year: string;
  title: string;
  description: string;
  icon: typeof Laptop;
  bg: string;
  text: string;
  ring: string;
  glow: string;
  gradient: string;
  line: string;
  badge: string;
  isLast: boolean;
};

function JourneyTimelineItem({
  year,
  title,
  description,
  icon: Icon,
  bg,
  text,
  ring,
  glow,
  gradient,
  line,
  badge,
  isLast,
}: JourneyItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-12% 0px -12% 0px" });

  return (
    <motion.div ref={ref} className="relative pl-16 md:pl-20 group">
      {!isLast && (
        <motion.div
          className={`absolute left-[23px] md:left-[27px] top-14 md:top-16 w-[2px] bg-gradient-to-b ${line} origin-top rounded-full`}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={
            isInView ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }
          }
          transition={{ duration: 0.7, delay: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
          style={{ height: "calc(100% + 3.5rem)" }}
        />
      )}

      <div className="absolute left-0 top-1">
        {isInView && (
          <motion.span
            className={`absolute inset-0 rounded-full ${glow} blur-xl`}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.55, 0.15, 0.55] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        <motion.div
          className={`relative w-12 h-12 md:w-14 md:h-14 rounded-full bg-white border border-gray-200/80 shadow-md flex items-center justify-center ring-4 ${ring}`}
          initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
          animate={
            isInView
              ? { opacity: 1, scale: 1, rotate: 0 }
              : { opacity: 0, scale: 0.5, rotate: -20 }
          }
          transition={{ duration: 0.55, type: "spring", stiffness: 260, damping: 18 }}
          whileHover={{ scale: 1.08, rotate: 8 }}
        >
          <div className={`p-2 rounded-lg ${bg} ${text}`}>
            <Icon size={20} />
          </div>
        </motion.div>
      </div>

      <motion.div
        className="relative pt-0.5"
        initial={{ opacity: 0, x: -28, filter: "blur(6px)" }}
        animate={
          isInView
            ? { opacity: 1, x: 0, filter: "blur(0px)" }
            : { opacity: 0, x: -28, filter: "blur(6px)" }
        }
        transition={{
          duration: 0.65,
          delay: 0.15,
          ease: [0.21, 0.47, 0.32, 0.98],
        }}
      >
        <div className="relative rounded-2xl border border-white/90 bg-white/70 backdrop-blur-md p-5 md:p-6 shadow-sm group-hover:shadow-lg group-hover:bg-white/90 transition-all duration-300 overflow-hidden">
          <div
            className={`absolute inset-y-3 left-0 w-1 rounded-full bg-gradient-to-b ${gradient}`}
          />
          <div
            className={`absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br ${gradient} opacity-[0.07] blur-2xl pointer-events-none`}
          />

          <span
            className={`relative inline-flex items-center text-xs font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full border mb-4 ${badge}`}
          >
            {year}
          </span>
          <h3 className="relative text-2xl md:text-3xl font-semibold text-gray-900 mb-3">
            {title}
          </h3>
          <p className="relative text-lg text-gray-500 leading-relaxed max-w-xl">
            {description}
          </p>
        </div>
      </motion.div>
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
      className="py-32 px-6 relative overflow-hidden section-divide section-surface-alt"
      ref={ref}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-slate-50/30 to-violet-50/40 pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.22] pointer-events-none section-dots" />
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none journey-grid"
      />

      <motion.div
        className="absolute -top-20 right-[8%] w-80 h-80 rounded-full bg-indigo-200/35 blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.08, 1], opacity: [0.45, 0.65, 0.45] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 -left-16 w-72 h-72 rounded-full bg-violet-200/30 blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
      />
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 right-[4%] w-48 h-48 rounded-full bg-cyan-100/35 blur-3xl pointer-events-none hidden lg:block"
        animate={{ scale: [1, 1.06, 1], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
      />

      <div className="absolute top-32 left-[6%] w-20 h-20 rounded-full border border-indigo-200/40 pointer-events-none hidden lg:block" />
      <div className="absolute bottom-40 right-[10%] w-14 h-14 rounded-full border border-violet-200/45 pointer-events-none hidden lg:block" />

      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={transition({ duration: 0.8 })}
          className="mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-indigo-100/80 shadow-sm backdrop-blur-sm mb-6">
            <motion.span
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="text-indigo-500 w-4 h-4" />
            </motion.span>
            <span className="text-sm font-medium text-gray-600">
              {t.journey.badge}
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl mb-4 tracking-tight bg-gradient-to-r from-gray-900 via-indigo-950 to-violet-900 bg-clip-text text-transparent">
            {t.journey.title}
          </h2>
          <p className="text-lg md:text-xl text-gray-500 leading-relaxed max-w-2xl">
            {t.journey.subtitle}
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-[23px] md:left-[27px] top-3 bottom-3 w-[2px] rounded-full journey-spine pointer-events-none" />

          <div className="space-y-14 md:space-y-16">
            {t.journey.items.map((item, index) => {
              const meta = journeyMeta[index];

              return (
                <JourneyTimelineItem
                  key={index}
                  year={item.year}
                  title={item.title}
                  description={item.description}
                  icon={meta.icon}
                  bg={meta.bg}
                  text={meta.text}
                  ring={meta.ring}
                  glow={meta.glow}
                  gradient={meta.gradient}
                  line={meta.line}
                  badge={meta.badge}
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
