import { motion } from "motion/react";
import { useInViewOnScrollDown } from "@/app/components/ui/use-in-view-scroll-down";
import { ArrowDown, ChevronRight, MapPin } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { HeroTypewriterName } from "@/app/components/HeroTypewriterName";
import { RotatingTagline } from "@/app/components/RotatingTagline";
import { AnimatedCounter } from "@/app/components/AnimatedCounter";

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
      className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-20 bg-background"
      ref={ref}
    >
      <motion.div
        className="relative z-10 flex justify-center pt-24 pb-0"
        initial={{ opacity: 0, y: -8 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={transition({ delay: 0.05, duration: 0.5 })}
      >
        <div className="flex items-center gap-4 px-4 py-2 rounded-[10px] border border-border bg-card text-sm text-muted-foreground">
          <span className="flex items-center gap-2 text-foreground">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-foreground" />
            {t.hero.collaborate}
          </span>
          <span className="w-px h-3.5 bg-border" />
          <span className="flex items-center gap-1.5">
            <MapPin size={12} strokeWidth={1.75} />
            {t.hero.location}
          </span>
        </div>
      </motion.div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center text-center py-16">
        <motion.p
          className="mb-8 text-xs tracking-[0.28em] uppercase text-muted-foreground font-medium"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={transition({ delay: 0.12, duration: 0.5 })}
        >
          {t.hero.role}
        </motion.p>

        <div className="w-full overflow-visible mb-2">
          <HeroTypewriterName
            key={locale}
            text={t.hero.name}
            active={isVisible}
            className="!text-[clamp(3.5rem,12vw,8.5rem)] pb-[0.08em] mb-6"
          />
        </div>

        <RotatingTagline lines={t.hero.taglines} active={isVisible} />

        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-10"
          initial={{ opacity: 0, y: 8 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={transition({ delay: 0.75, duration: 0.5 })}
        >
          {t.hero.highlights.map((label) => (
            <span
              key={label}
              className="px-3.5 py-1.5 text-sm border border-border rounded-[10px] bg-secondary text-foreground"
            >
              {label}
            </span>
          ))}
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-14"
          initial={{ opacity: 0, y: 8 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={transition({ delay: 0.9, duration: 0.5 })}
        >
          <motion.a
            href="#projects"
            className="btn-primary"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            {t.hero.viewProjects}
            <ChevronRight size={15} strokeWidth={1.75} />
          </motion.a>
          <motion.a
            href="#awards"
            className="btn-ghost"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            {t.hero.awardsHonors}
          </motion.a>
        </motion.div>

        <motion.div
          className="flex items-center gap-0 rounded-[12px] border border-border bg-card overflow-hidden"
          initial={{ opacity: 0, y: 12 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={transition({ delay: 1.05, duration: 0.5 })}
          style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}
        >
          {statLabels.map((label, i) => (
            <div key={label} className="flex items-center">
              <div className="px-8 py-5 text-center">
                <p className="text-2xl md:text-3xl font-semibold text-foreground leading-none tracking-tight">
                  <AnimatedCounter
                    value={statValues[i].value}
                    suffix={statValues[i].suffix}
                    active={isVisible}
                  />
                </p>
                <p className="text-xs text-muted-foreground mt-2 uppercase tracking-wider font-medium">
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

      <motion.div
        className="relative z-10 w-full max-w-4xl mx-auto px-6 pb-16"
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : {}}
        transition={transition({ delay: 1.2, duration: 0.5 })}
      >
        <div className="relative overflow-hidden border-t border-border">
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          <motion.div
            className="flex gap-10 pt-5 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
          >
            {[...t.hero.skills, ...t.hero.skills].map((skill, i) => (
              <span
                key={`${skill}-${i}`}
                className="text-xs text-muted-foreground font-medium tracking-wide uppercase"
              >
                {skill}
                <span className="mx-5 text-border">·</span>
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <motion.button
        type="button"
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-foreground transition-colors z-10"
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        aria-label={t.nav.scrollAbout}
      >
        <ArrowDown size={18} strokeWidth={1.5} />
      </motion.button>
    </section>
  );
}
