import { useEffect, useState } from "react";
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
  const [progress, setProgress] = useState(0);

  const labels: Record<(typeof sectionIds)[number], string> = {
    home: t.nav.home,
    about: t.nav.about,
    journey: t.nav.journey,
    "study-materials": t.nav.studyMaterials,
    awards: t.nav.awards,
    projects: t.nav.projects,
  };

  useEffect(() => {
    const updateProgress = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(maxScroll > 0 ? Math.min(1, window.scrollY / maxScroll) : 0);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <nav
      className="fixed right-5 xl:right-8 top-1/2 z-[85] hidden -translate-y-1/2 lg:block"
      aria-label={t.nav.sections}
    >
      <div className="relative rounded-full border border-gray-200/80 bg-white/90 px-2.5 py-3 shadow-sm backdrop-blur-md">
        <div
          className="absolute left-1/2 top-3 bottom-3 w-px -translate-x-1/2 overflow-hidden rounded-full bg-gray-200/90"
          aria-hidden="true"
        >
          <motion.div
            className="h-full w-full origin-top bg-gray-800"
            style={{ scaleY: progress }}
          />
        </div>

        <div className="relative flex flex-col items-center gap-2">
          {sectionIds.map((id) => {
            const isActive = activeId === id;

            return (
              <a
                key={id}
                href={`#${id}`}
                className="relative z-10 flex h-5 w-5 items-center justify-center"
                aria-label={labels[id]}
                aria-current={isActive ? "true" : undefined}
                title={labels[id]}
              >
                {isActive ? (
                  <motion.span
                    layoutId="page-progress-indicator"
                    className="block h-5 w-1.5 rounded-full bg-gray-900 ring-2 ring-white"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                ) : (
                  <span className="block h-1.5 w-1.5 rounded-full bg-white ring-1 ring-gray-300 transition-colors hover:ring-gray-500" />
                )}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
