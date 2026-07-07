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
    <aside
      className="fixed right-4 xl:right-6 top-1/2 -translate-y-1/2 z-[85] hidden lg:block"
      aria-label={t.nav.sections}
    >
      <div className="relative h-[min(58vh,26rem)] w-8">
        <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-gray-200/90" />

        <motion.div
          className="absolute top-0 left-1/2 w-0.5 -translate-x-1/2 h-full origin-top rounded-full bg-gradient-to-b from-violet-500 via-sky-500 to-emerald-500"
          style={{ scaleY: progress }}
          aria-hidden="true"
        />

        {sectionIds.map((id, index) => {
          const isActive = activeId === id;
          const topPercent =
            sectionIds.length === 1 ? 0 : (index / (sectionIds.length - 1)) * 100;

          return (
            <a
              key={id}
              href={`#${id}`}
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 group"
              style={{ top: `${topPercent}%` }}
              aria-label={labels[id]}
              title={labels[id]}
            >
              <motion.span
                className={`block rounded-full border transition-colors ${
                  isActive
                    ? "h-3 w-3 border-gray-900 bg-gray-900 shadow-sm"
                    : "h-2 w-2 border-gray-300 bg-white group-hover:border-gray-500"
                }`}
                animate={{ scale: isActive ? 1.15 : 1 }}
                transition={{ type: "spring", stiffness: 420, damping: 28 }}
              />
              <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md border border-gray-200/80 bg-white/95 px-2 py-1 text-[11px] font-medium text-gray-600 opacity-0 shadow-sm backdrop-blur-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                {labels[id]}
              </span>
            </a>
          );
        })}
      </div>
    </aside>
  );
}
