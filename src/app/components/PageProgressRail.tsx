import { motion } from "motion/react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useScrollSpy } from "@/hooks/useScrollSpy";

const railSectionIds = [
  "about",
  "journey",
  "study-materials",
  "awards",
  "projects",
] as const;

type RailSectionId = (typeof railSectionIds)[number];

const scrollSpyIds = ["home", ...railSectionIds];

function getDotState(index: number, activeIndex: number) {
  if (activeIndex < 0) return "upcoming";
  if (index < activeIndex) return "passed";
  if (index === activeIndex) return "active";
  return "upcoming";
}

type DotState = "active" | "passed" | "upcoming";

const glassDotStyles: Record<
  DotState,
  {
    size: number;
    shell: string;
    highlight: string;
    core?: string;
    shadow: string;
  }
> = {
  active: {
    size: 22,
    shell:
      "border border-white/70 bg-white/35 shadow-[inset_0_1px_1px_rgba(255,255,255,0.85),0_8px_20px_rgba(15,23,42,0.18)]",
    highlight: "from-white/80 via-white/25 to-transparent",
    core: "h-2.5 w-2.5 rounded-full bg-gray-900/90 shadow-[0_1px_2px_rgba(0,0,0,0.35)]",
    shadow: "0 10px 24px rgba(15, 23, 42, 0.22)",
  },
  passed: {
    size: 16,
    shell:
      "border border-white/80 bg-white/72 shadow-[inset_0_1px_1px_rgba(255,255,255,0.95),0_4px_12px_rgba(15,23,42,0.1)]",
    highlight: "from-white/90 via-white/35 to-transparent",
    shadow: "0 6px 16px rgba(15, 23, 42, 0.12)",
  },
  upcoming: {
    size: 12,
    shell:
      "border border-white/55 bg-white/28 shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_2px_8px_rgba(15,23,42,0.06)]",
    highlight: "from-white/55 via-white/10 to-transparent",
    shadow: "0 3px 10px rgba(15, 23, 42, 0.06)",
  },
};

export function PageProgressRail() {
  const { t } = useLanguage();
  const activeId = useScrollSpy(scrollSpyIds);
  const activeIndex = railSectionIds.indexOf(activeId as RailSectionId);

  const labels: Record<RailSectionId, string> = {
    about: t.nav.about,
    journey: t.nav.journey,
    "study-materials": t.nav.studyMaterials,
    awards: t.nav.awards,
    projects: t.nav.projects,
  };

  return (
    <nav
      className="fixed right-5 xl:right-8 top-1/2 z-[85] hidden -translate-y-1/2 lg:block"
      aria-label={t.nav.sections}
    >
      <div className="relative h-72 w-7">
        <div
          className="absolute inset-y-0 right-0 w-px rounded-full bg-gradient-to-b from-white/20 via-white/55 to-white/20 shadow-[0_0_0_1px_rgba(255,255,255,0.35)] backdrop-blur-sm"
          aria-hidden="true"
        />

        {railSectionIds.map((id, index) => {
          const state = getDotState(index, activeIndex) as DotState;
          const isActive = state === "active";
          const glass = glassDotStyles[state];
          const topPercent =
            railSectionIds.length === 1
              ? 0
              : (index / (railSectionIds.length - 1)) * 100;

          return (
            <a
              key={id}
              href={`#${id}`}
              className="absolute right-0 flex h-7 w-7 -translate-y-1/2 translate-x-1/2 items-center justify-center"
              style={{ top: `${topPercent}%` }}
              aria-label={labels[id]}
              aria-current={isActive ? "true" : undefined}
              title={labels[id]}
            >
              <motion.span
                className={`relative flex items-center justify-center overflow-hidden rounded-full backdrop-blur-xl backdrop-saturate-150 ${glass.shell}`}
                animate={{
                  width: glass.size,
                  height: glass.size,
                  boxShadow: glass.shadow,
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.94 }}
                transition={{ type: "spring", stiffness: 380, damping: 28 }}
              >
                <span
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${glass.highlight}`}
                  aria-hidden="true"
                />
                {glass.core ? (
                  <motion.span
                    className={`relative ${glass.core}`}
                    initial={false}
                    animate={{ scale: isActive ? 1 : 0.6, opacity: isActive ? 1 : 0 }}
                    transition={{ type: "spring", stiffness: 460, damping: 30 }}
                  />
                ) : null}
              </motion.span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
