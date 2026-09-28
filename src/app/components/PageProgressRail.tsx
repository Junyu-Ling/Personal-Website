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
      <div className="relative h-72 w-5">
        <div
          className="absolute inset-y-0 right-0 w-px rounded-full bg-border"
          aria-hidden="true"
        />

        {railSectionIds.map((id, index) => {
          const state = getDotState(index, activeIndex);
          const isActive = state === "active";
          const isPassed = state === "passed";
          const topPercent =
            railSectionIds.length === 1
              ? 0
              : (index / (railSectionIds.length - 1)) * 100;

          const dotClass = isActive
            ? "bg-foreground border border-foreground"
            : isPassed
              ? "bg-card border border-foreground/40"
              : "bg-secondary border border-border";

          return (
            <a
              key={id}
              href={`#${id}`}
              className="absolute right-0 flex h-5 w-5 -translate-y-1/2 translate-x-1/2 items-center justify-center"
              style={{ top: `${topPercent}%` }}
              aria-label={labels[id]}
              aria-current={isActive ? "true" : undefined}
              title={labels[id]}
            >
              <motion.span
                className={`block rounded-full ${dotClass}`}
                animate={{
                  width: isActive ? 14 : isPassed ? 10 : 8,
                  height: isActive ? 14 : isPassed ? 10 : 8,
                }}
                whileHover={{ scale: 1.08 }}
                transition={{ type: "spring", stiffness: 420, damping: 30 }}
              />
            </a>
          );
        })}
      </div>
    </nav>
  );
}
