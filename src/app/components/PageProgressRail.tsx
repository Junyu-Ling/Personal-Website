import { useEffect, useState } from "react";
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

export function PageProgressRail() {
  const { t } = useLanguage();
  const activeId = useScrollSpy(scrollSpyIds);
  const [progress, setProgress] = useState(0);

  const labels: Record<RailSectionId, string> = {
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
      <div className="relative h-64 w-4">
        <div
          className="absolute inset-y-0 right-0 w-px rounded-full bg-gray-200/80"
          aria-hidden="true"
        />
        <div
          className="absolute inset-y-0 right-0 w-px overflow-hidden rounded-full"
          aria-hidden="true"
        >
          <motion.div
            className="h-full w-full origin-top rounded-full bg-gray-900/80"
            style={{ scaleY: progress }}
            transition={{ duration: 0.12, ease: "easeOut" }}
          />
        </div>

        {railSectionIds.map((id, index) => {
          const isActive = activeId === id;
          const topPercent =
            railSectionIds.length === 1
              ? 0
              : (index / (railSectionIds.length - 1)) * 100;

          return (
            <a
              key={id}
              href={`#${id}`}
              className="absolute right-0 flex h-4 w-4 -translate-y-1/2 translate-x-1/2 items-center justify-center"
              style={{ top: `${topPercent}%` }}
              aria-label={labels[id]}
              aria-current={isActive ? "true" : undefined}
              title={labels[id]}
            >
              <motion.span
                className={`block rounded-full transition-colors ${
                  isActive
                    ? "bg-gray-900"
                    : "border border-gray-300/90 bg-white/90"
                }`}
                animate={{
                  width: isActive ? 10 : 6,
                  height: isActive ? 10 : 6,
                }}
                whileHover={!isActive ? { scale: 1.12 } : undefined}
                transition={{ type: "spring", stiffness: 420, damping: 30 }}
              />
            </a>
          );
        })}
      </div>
    </nav>
  );
}
