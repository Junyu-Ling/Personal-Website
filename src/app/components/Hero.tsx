import { lazy, Suspense } from "react";
import { motion } from "motion/react";
import { useInViewOnScrollDown } from "@/app/components/ui/use-in-view-scroll-down";
import { ArrowDown, ChevronRight, MapPin } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const HeroEarthParticles = lazy(() =>
  import("@/app/components/HeroEarthParticles").then((module) => ({
    default: module.HeroEarthParticles,
  })),
);

const statValues = ["9+", "9+", "17"];

const quickLinkHrefs = [
  "#about",
  "#journey",
  "#achievements",
  "#awards",
  "#projects",
];

export function Hero() {
  const { t } = useLanguage();
  const { ref, isVisible, transition, shouldAnimate } = useInViewOnScrollDown({
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
      className="min-h-screen flex flex-col justify-center relative overflow-hidden"
      ref={ref}
    >
      {/* background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-100/80 via-white to-white" />
      <div
        className="absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* 3D particle earth */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        <div className="absolute top-[46%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(130vw,920px)] h-[min(130vw,920px)] md:top-[48%] md:left-[56%] md:-translate-x-1/2 md:-translate-y-1/2 md:w-[min(72vw,780px)] md:h-[min(72vw,780px)]">
          <Suspense fallback={null}>
            <HeroEarthParticles />
          </Suspense>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.15)_0%,rgba(255,255,255,0.55)_42%,rgba(255,255,255,0.92)_72%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/70" />
      </div>

      {/* corner accents */}
      <div className="absolute top-20 left-8 w-12 h-12 border-t border-l border-gray-200/80 pointer-events-none hidden md:block" />
      <div className="absolute top-20 right-8 w-12 h-12 border-t border-r border-gray-200/80 pointer-events-none hidden md:block" />
      <div className="absolute bottom-24 left-8 w-12 h-12 border-b border-l border-gray-200/80 pointer-events-none hidden md:block" />
      <div className="absolute bottom-24 right-8 w-12 h-12 border-b border-r border-gray-200/80 pointer-events-none hidden md:block" />

      {/* top status bar */}
      <motion.div
        className="relative z-10 flex justify-center pt-24 pb-0"
        initial={{ opacity: 0, y: -8 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={transition({ delay: 0.05, duration: 0.6 })}
      >
        <div className="flex items-center gap-4 px-5 py-2.5 rounded-full border border-gray-200/80 bg-white/80 backdrop-blur-md shadow-sm text-sm text-gray-600">
          <span className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
            </span>
            {t.hero.collaborate}
          </span>
          <span className="w-px h-3.5 bg-gray-200" />
          <span className="flex items-center gap-1.5 text-gray-500">
            <MapPin size={12} />
            {t.hero.location}
          </span>
        </div>
      </motion.div>

      {/* main content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col items-center text-center py-16">

        {/* role label */}
        <motion.div
          className="flex items-center gap-3 mb-8"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={transition({ delay: 0.15, duration: 0.7 })}
        >
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-gray-300" />
          <p className="text-xs tracking-[0.35em] uppercase text-gray-400 font-medium">
            {t.hero.role}
          </p>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-gray-300" />
        </motion.div>

        {/* name */}
        <h1 className="text-[clamp(4rem,14vw,10rem)] font-semibold tracking-[-0.03em] leading-[0.92] mb-10 text-gray-950">
          {nameChars.map((char, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={shouldAnimate ? { opacity: 0, y: 40 } : false}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={transition({ duration: 0.5, delay: 0.25 + i * 0.035 })}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </h1>

        {/* highlight tags */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0, y: 10 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={transition({ delay: 0.9, duration: 0.6 })}
        >
          {t.hero.highlights.map((label, i) => {
            const colors = [
              "border-violet-200 bg-violet-50/80 text-violet-700",
              "border-sky-200 bg-sky-50/80 text-sky-700",
              "border-emerald-200 bg-emerald-50/80 text-emerald-700",
            ];
            return (
              <span
                key={i}
                className={`px-4 py-1.5 text-sm border rounded-full backdrop-blur-sm ${colors[i]}`}
              >
                {label}
              </span>
            );
          })}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-16"
          initial={{ opacity: 0, y: 10 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={transition({ delay: 1.05, duration: 0.6 })}
        >
          <motion.a
            href="#projects"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-gray-950 text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors shadow-lg shadow-gray-900/15"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {t.hero.viewProjects}
            <ChevronRight size={15} />
          </motion.a>
          <motion.a
            href="#awards"
            className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium text-gray-700 rounded-full border border-gray-300 bg-white/80 hover:border-gray-900 hover:text-gray-900 transition-colors backdrop-blur-sm"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {t.hero.awardsHonors}
          </motion.a>
        </motion.div>

        {/* stats strip */}
        <motion.div
          className="flex items-center gap-0 rounded-2xl border border-gray-200/80 bg-white/70 backdrop-blur-md overflow-hidden shadow-sm"
          initial={{ opacity: 0, y: 16 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={transition({ delay: 1.2, duration: 0.6 })}
        >
          {statLabels.map((label, i) => (
            <div key={i} className="flex items-center">
              <div className="px-8 py-5 text-center">
                <p className="text-2xl md:text-3xl font-semibold text-gray-950 leading-none">
                  {statValues[i]}
                </p>
                <p className="text-xs text-gray-500 mt-1.5 uppercase tracking-wider font-medium">
                  {label}
                </p>
              </div>
              {i < statLabels.length - 1 && (
                <div className="w-px h-10 bg-gray-200 shrink-0" />
              )}
            </div>
          ))}
        </motion.div>
      </div>

      {/* nav quick links */}
      <motion.nav
        className="relative z-10 flex justify-center pb-10"
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : {}}
        transition={transition({ delay: 1.35, duration: 0.6 })}
        aria-label={t.nav.sections}
      >
        <div className="flex items-center gap-1 px-2 py-1.5 rounded-full border border-gray-200/80 bg-white/70 backdrop-blur-md shadow-sm">
          {navLabels.map((label, i) => (
            <a
              key={quickLinkHrefs[i]}
              href={quickLinkHrefs[i]}
              className="text-xs px-4 py-2 rounded-full text-gray-500 hover:bg-gray-950 hover:text-white transition-all duration-200 font-medium"
            >
              {label}
            </a>
          ))}
        </div>
      </motion.nav>

      {/* skills ticker */}
      <motion.div
        className="relative z-10 w-full max-w-5xl mx-auto px-6 pb-16"
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : {}}
        transition={transition({ delay: 1.5, duration: 0.7 })}
      >
        <div className="overflow-hidden border-t border-gray-100">
          <motion.div
            className="flex gap-10 pt-4 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
          >
            {[...t.hero.skills, ...t.hero.skills].map((skill, i) => (
              <span
                key={`${skill}-${i}`}
                className="text-xs text-gray-400 font-medium tracking-wide uppercase"
              >
                {skill}
                <span className="mx-5 text-gray-200">·</span>
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* scroll indicator */}
      <motion.button
        type="button"
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-300 hover:text-gray-600 transition-colors z-10"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        aria-label={t.nav.scrollAbout}
      >
        <ArrowDown size={20} strokeWidth={1.5} />
      </motion.button>
    </section>
  );
}
