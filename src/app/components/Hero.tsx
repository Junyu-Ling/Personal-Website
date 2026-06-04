import { motion } from "motion/react";
import { useInViewOnScrollDown } from "@/app/components/ui/use-in-view-scroll-down";
import {
  ArrowDown,
  Sparkles,
  Code2,
  Music2,
  MapPin,
  ChevronRight,
} from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const highlightIcons = [Sparkles, Code2, Music2];

const statValues = ["9+", "9+", "17"];

const quickLinkHrefs = [
  "#about",
  "#journey",
  "#achievements",
  "#awards",
  "#projects",
];

function FloatingOrb({
  className,
  delay = 0,
  duration = 18,
}: {
  className: string;
  delay?: number;
  duration?: number;
}) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
      animate={{
        x: [0, 40, -20, 0],
        y: [0, -30, 25, 0],
        scale: [1, 1.15, 0.95, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

export function Hero() {
  const { t } = useLanguage();
  const { ref, isVisible, transition } = useInViewOnScrollDown({
    margin: "-100px",
  });

  const scrollToNext = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  const nameChars = t.hero.name.split("");
  const statLabels = [t.hero.stats.awards, t.hero.stats.projects, t.hero.stats.age];
  const navLabels = [
    t.nav.about,
    t.nav.journey,
    t.nav.achievements,
    t.nav.awards,
    t.nav.projects,
  ];

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center relative overflow-hidden py-24"
      ref={ref}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-zinc-50" />

      <div
        className="absolute inset-0 opacity-[0.3]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
        }}
      />

      <FloatingOrb
        className="w-80 h-80 bg-violet-200/50 -top-24 left-1/2 -translate-x-1/2"
        delay={0}
      />
      <FloatingOrb
        className="w-72 h-72 bg-amber-100/60 -bottom-20 -left-20"
        delay={2}
        duration={22}
      />
      <FloatingOrb
        className="w-64 h-64 bg-sky-200/40 -bottom-10 -right-16"
        delay={4}
        duration={20}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center text-center">
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 mb-8"
          initial={{ opacity: 0, y: 12 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={transition({ delay: 0.1 })}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 border border-gray-200 shadow-sm backdrop-blur-sm text-sm text-gray-600">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            {t.hero.collaborate}
          </span>
          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/90 border border-gray-200 text-sm text-gray-600">
            <MapPin size={14} className="text-gray-400" />
            {t.hero.location}
          </span>
        </motion.div>

        <motion.p
          className="text-sm md:text-base text-gray-500 mb-4 tracking-[0.25em] uppercase"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={transition({ delay: 0.2 })}
        >
          {t.hero.role}
        </motion.p>

        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold tracking-tight leading-none mb-6">
          {nameChars.map((char, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ opacity: 0, y: 48 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
              transition={transition({ duration: 0.45, delay: 0.3 + i * 0.04 })}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </h1>

        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-10 max-w-3xl"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={transition({ delay: 0.75 })}
        >
          {t.hero.highlights.map((label, i) => {
            const Icon = highlightIcons[i];
            return (
              <motion.span
                key={label}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm bg-white border border-gray-200 rounded-full text-gray-700 shadow-sm"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={transition({ delay: 0.8 + i * 0.06 })}
              >
                <Icon size={14} className="text-gray-500 shrink-0" />
                {label}
              </motion.span>
            );
          })}
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-14"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={transition({ delay: 1.15 })}
        >
          <motion.a
            href="#projects"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors shadow-lg shadow-gray-900/10"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            {t.hero.viewProjects}
            <ChevronRight size={18} />
          </motion.a>
          <motion.a
            href="#awards"
            className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-gray-900 text-gray-900 rounded-full hover:bg-gray-900 hover:text-white transition-colors"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            {t.hero.awardsHonors}
          </motion.a>
        </motion.div>

        <motion.div
          className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-12 max-w-lg mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={transition({ delay: 1.3 })}
        >
          {statLabels.map((label, i) => (
            <div
              key={label}
              className="px-5 py-4 rounded-2xl bg-white/80 border border-gray-100 backdrop-blur-sm shadow-sm"
            >
              <p className="text-3xl md:text-4xl font-semibold text-gray-900">
                {statValues[i]}
              </p>
              <p className="text-sm text-gray-500 mt-1">{label}</p>
            </div>
          ))}
        </motion.div>

        <motion.nav
          className="flex flex-wrap justify-center gap-2 p-2 rounded-2xl bg-white/70 border border-gray-200 backdrop-blur-md shadow-sm"
          initial={{ opacity: 0, y: 16 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={transition({ delay: 1.45 })}
          aria-label={t.nav.sections}
        >
          {navLabels.map((label, i) => (
            <a
              key={quickLinkHrefs[i]}
              href={quickLinkHrefs[i]}
              className="text-sm px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-900 hover:text-white transition-colors"
            >
              {label}
            </a>
          ))}
        </motion.nav>
      </div>

      <motion.div
        className="relative z-10 w-full max-w-5xl mx-auto px-6 mt-12"
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : {}}
        transition={transition({ delay: 1.6 })}
      >
        <div className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white/60 backdrop-blur-sm">
          <motion.div
            className="flex gap-8 py-3.5 px-4 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          >
            {[...t.hero.skills, ...t.hero.skills].map((skill, i) => (
              <span
                key={`${skill}-${i}`}
                className="text-sm text-gray-500 font-medium"
              >
                {skill}
                <span className="mx-4 text-gray-300">·</span>
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <motion.button
        type="button"
        onClick={scrollToNext}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-400 hover:text-gray-900 transition-colors z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        aria-label={t.nav.scrollAbout}
      >
        <ArrowDown size={32} />
      </motion.button>
    </section>
  );
}
