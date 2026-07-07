import { motion } from "motion/react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useScrollSpy } from "@/hooks/useScrollSpy";

const sectionIds = [
  "home",
  "about",
  "journey",
  "study-materials",
  "awards",
  "projects",
] as const;

export function PageProgressRail() {
  const { t } = useLanguage();
  const activeId = useScrollSpy([...sectionIds]);

  const labels: Record<(typeof sectionIds)[number], string> = {
    home: t.nav.home,
    about: t.nav.about,
    journey: t.nav.journey,
    "study-materials": t.nav.studyMaterials,
    awards: t.nav.awards,
    projects: t.nav.projects,
  };

  return (
    <nav
      className="fixed right-5 xl:right-8 top-1/2 z-[85] hidden -translate-y-1/2 lg:flex flex-col items-center gap-2 rounded-full border border-gray-200/80 bg-white/90 px-2 py-3 shadow-sm backdrop-blur-md"
      aria-label={t.nav.sections}
    >
      {sectionIds.map((id) => {
        const isActive = activeId === id;

        return (
          <a
            key={id}
            href={`#${id}`}
            className="flex h-5 w-5 items-center justify-center"
            aria-label={labels[id]}
            aria-current={isActive ? "true" : undefined}
            title={labels[id]}
          >
            {isActive ? (
              <motion.span
                layoutId="page-progress-indicator"
                className="block h-5 w-1.5 rounded-full bg-gray-900"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            ) : (
              <span className="block h-1.5 w-1.5 rounded-full bg-gray-300 transition-colors hover:bg-gray-500" />
            )}
          </a>
        );
      })}
    </nav>
  );
}
