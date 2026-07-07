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
          className="absolute inset-y-0 right-0 w-0.5 rounded-full bg-gray-300/90"
          aria-hidden="true"
        />

        {railSectionIds.map((id, index) => {
          const state = getDotState(index, activeIndex);
          const isActive = state === "active";
          const topPercent =
            railSectionIds.length === 1
              ? 0
              : (index / (railSectionIds.length - 1)) * 100;

          const dotClass =
            state === "active"
              ? "bg-gray-900 border border-gray-900 shadow-sm"
              : state === "passed"
                ? "bg-white border border-gray-300 shadow-sm"
                : "bg-gray-200/80 border border-gray-300/70";

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
                className={`block rounded-full transition-colors ${dotClass}`}
                animate={{
                  width: isActive ? 12 : 8,
                  height: isActive ? 12 : 8,
                }}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 420, damping: 30 }}
              />
            </a>
          );
        })}
      </div>
    </nav>
  );
}
