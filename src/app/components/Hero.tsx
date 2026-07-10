import { motion } from "motion/react";
import { useInViewOnScrollDown } from "@/app/components/ui/use-in-view-scroll-down";
import { ArrowDown, ChevronRight, MapPin } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { HeroTypewriterName } from "@/app/components/HeroTypewriterName";
import { RotatingTagline } from "@/app/components/RotatingTagline";
import { AnimatedCounter } from "@/app/components/AnimatedCounter";
import { TransparentGlobe } from "@/app/components/TransparentGlobe";

const statValues = [
  { value: 10, suffix: "+" },
  { value: 10, suffix: "+" },
  { value: 17, suffix: "" },
];

export function Hero() {
  const { t, locale } = useLanguage();
  const { ref, isVisible, transition } = useInViewOnScrollDown({
    margin: "-100px",
  });

  const scrollToNext = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  const statLabels = [t.hero.stats.awards, t.hero.stats.projects, t.hero.stats.age];

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-20"
      ref={ref}
    >
      {/* background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/40 via-white to-white" />
      <div className="absolute inset-0 bg-gradient-to-tr from-violet-50/35 via-transparent to-sky-50/25 pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.045) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.6) 1px, transparent 1px)`,
          backgroundSize: "72px 72px",
        }}
      />

      <div className="absolute inset-0 pointer-events-none">
        <TransparentGlobe className="h-full w-full" />
      </div>

      {/* ambient orbs */}
      <motion.div
        className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-violet-200/30 blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.06, 1], opacity: [0.55, 0.75, 0.55] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-16 -left-16 w-[360px] h-[360px] rounded-full bg-sky-200/35 blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />
      <motion.div
        className="absolute top-[18%] left-[8%] w-48 h-48 rounded-full bg-emerald-100/35 blur-3xl pointer-events-none hidden md:block"
        animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      />

      {/* decorative rings & dots */}
      <div className="absolute top-28 right-[14%] w-28 h-28 rounded-full border border-violet-200/50 pointer-events-none hidden lg:block" />
      <div className="absolute top-32 right-[calc(14%+6px)] w-[88px] h-[88px] rounded-full border border-violet-100/40 pointer-events-none hidden lg:block" />
      <div className="absolute bottom-36 left-[10%] w-20 h-20 rounded-full border border-sky-200/55 pointer-events-none hidden lg:block" />
      <div className="absolute top-[42%] right-[6%] w-2.5 h-2.5 rounded-full bg-violet-300/50 pointer-events-none hidden md:block" />
      <div className="absolute top-[38%] left-[7%] w-2 h-2 rounded-full bg-sky-300/50 pointer-events-none hidden md:block" />
      <div className="absolute bottom-[32%] right-[18%] w-1.5 h-1.5 rounded-full bg-emerald-300/50 pointer-events-none hidden md:block" />

      {/* corner accents */}
      <div className="absolute top-20 left-8 w-16 h-16 border-t border-l border-gray-300/70 pointer-events-none hidden md:block" />
      <div className="absolute top-[84px] left-[36px] w-10 h-10 border-t border-l border-gray-200/50 pointer-events-none hidden md:block" />
      <div className="absolute top-20 right-8 w-16 h-16 border-t border-r border-gray-300/70 pointer-events-none hidden md:block" />
      <div className="absolute top-[84px] right-[36px] w-10 h-10 border-t border-r border-gray-200/50 pointer-events-none hidden md:block" />
      <div className="absolute bottom-24 left-8 w-16 h-16 border-b border-l border-gray-300/70 pointer-events-none hidden md:block" />
      <div className="absolute bottom-[92px] left-[36px] w-10 h-10 border-b border-l border-gray-200/50 pointer-events-none hidden md:block" />
      <div className="absolute bottom-24 right-8 w-16 h-16 border-b border-r border-gray-300/70 pointer-events-none hidden md:block" />
      <div className="absolute bottom-[92px] right-[36px] w-10 h-10 border-b border-r border-gray-200/50 pointer-events-none hidden md:block" />

      {/* side guide lines */}
      <div className="absolute left-1/2 -translate-x-[min(44vw,340px)] top-[22%] bottom-[22%] w-px bg-gradient-to-b from-transparent via-gray-200/70 to-transparent pointer-events-none hidden xl:block" />
      <div className="absolute left-1/2 translate-x-[min(44vw,340px)] top-[22%] bottom-[22%] w-px bg-gradient-to-b from-transparent via-gray-200/70 to-transparent pointer-events-none hidden xl:block" />

      {/* soft color glow behind name */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[320px] rounded-full bg-gradient-to-br from-violet-100/40 via-sky-50/25 to-emerald-50/25 blur-3xl pointer-events-none" />

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
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-violet-200" />
          <span className="w-1 h-1 rotate-45 bg-violet-300/60 shrink-0" />
          <p className="text-xs tracking-[0.35em] uppercase text-gray-400 font-medium">
            {t.hero.role}
          </p>
          <span className="w-1 h-1 rotate-45 bg-sky-300/60 shrink-0" />
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-sky-200" />
        </motion.div>

        {/* name */}
        <div className="w-full overflow-visible mb-2">
          <HeroTypewriterName
            key={locale}
            text={t.hero.name}
            active={isVisible}
            className="!text-[clamp(4rem,14vw,10rem)] pb-[0.08em] mb-6"
          />
        </div>

        <RotatingTagline lines={t.hero.taglines} active={isVisible} />

        <motion.div
          className="flex items-center gap-3 mb-10"
          initial={{ opacity: 0, scaleX: 0.6 }}
          animate={isVisible ? { opacity: 1, scaleX: 1 } : {}}
          transition={transition({ delay: 0.85, duration: 0.7 })}
        >
          <span className="h-px w-16 bg-gradient-to-r from-transparent via-violet-200 to-sky-200" />
          <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-violet-300 to-sky-300" />
          <span className="h-px w-16 bg-gradient-to-l from-transparent via-sky-200 to-emerald-200" />
        </motion.div>

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
            className="btn-primary"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {t.hero.viewProjects}
            <ChevronRight size={15} />
          </motion.a>
          <motion.a
            href="#awards"
            className="btn-ghost"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {t.hero.awardsHonors}
          </motion.a>
        </motion.div>

        {/* stats strip */}
        <motion.div
          className="relative flex items-center gap-0 rounded-2xl border border-border bg-card/80 backdrop-blur-md overflow-hidden shadow-sm"
          initial={{ opacity: 0, y: 16 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={transition({ delay: 1.2, duration: 0.6 })}
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-300/80 to-transparent dark:via-violet-500/40" />
          {statLabels.map((label, i) => (
            <div key={i} className="flex items-center">
              <div className="px-8 py-5 text-center">
                <p className="text-2xl md:text-3xl font-semibold text-foreground leading-none">
                  <AnimatedCounter
                    value={statValues[i].value}
                    suffix={statValues[i].suffix}
                    active={isVisible}
                  />
                </p>
                <p className="text-xs text-muted-foreground mt-1.5 uppercase tracking-wider font-medium">
                  {label}
                </p>
              </div>
              {i < statLabels.length - 1 && (
                <div className="w-px h-10 bg-border shrink-0" />
              )}
            </div>
          ))}
        </motion.div>
      </div>

      {/* skills ticker */}
      <motion.div
        className="relative z-10 w-full max-w-5xl mx-auto px-6 pb-16"
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : {}}
        transition={transition({ delay: 1.5, duration: 0.7 })}
      >
        <div className="relative overflow-hidden border-t border-gray-100">
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
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
