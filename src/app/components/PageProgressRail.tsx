import { useCallback, useEffect, useState } from "react";
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

type SectionId = (typeof sectionIds)[number];

function getMaxScroll() {
  return Math.max(
    0,
    document.documentElement.scrollHeight - window.innerHeight
  );
}

function getSectionAnchor(id: SectionId) {
  const element = document.getElementById(id);
  const maxScroll = getMaxScroll();
  if (!element || maxScroll <= 0) return 0;

  const top = element.getBoundingClientRect().top + window.scrollY;
  return Math.min(1, Math.max(0, top / maxScroll));
}

function buildEvenAnchors() {
  return Object.fromEntries(
    sectionIds.map((id, index) => [
      id,
      sectionIds.length === 1 ? 0 : index / (sectionIds.length - 1),
    ])
  ) as Record<SectionId, number>;
}

export function PageProgressRail() {
  const { t, locale } = useLanguage();
  const activeId = useScrollSpy([...sectionIds]);
  const [progress, setProgress] = useState(0);
  const [anchors, setAnchors] = useState<Record<SectionId, number>>(buildEvenAnchors);

  const labels: Record<SectionId, string> = {
    home: t.nav.home,
    about: t.nav.about,
    journey: t.nav.journey,
    "study-materials": t.nav.studyMaterials,
    awards: t.nav.awards,
    projects: t.nav.projects,
  };

  const measure = useCallback(() => {
    const maxScroll = getMaxScroll();
    setProgress(maxScroll > 0 ? Math.min(1, window.scrollY / maxScroll) : 0);
    setAnchors(
      Object.fromEntries(
        sectionIds.map((id) => [id, getSectionAnchor(id)])
      ) as Record<SectionId, number>
    );
  }, []);

  useEffect(() => {
    measure();

    const onScroll = () => {
      const maxScroll = getMaxScroll();
      setProgress(maxScroll > 0 ? Math.min(1, window.scrollY / maxScroll) : 0);
    };

    const delayedMeasure = window.setTimeout(measure, 300);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    window.addEventListener("load", measure);

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(document.documentElement);

    return () => {
      window.clearTimeout(delayedMeasure);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      window.removeEventListener("load", measure);
      resizeObserver.disconnect();
    };
  }, [locale, measure]);

  return (
    <nav
      className="fixed right-5 xl:right-8 top-1/2 z-[85] hidden -translate-y-1/2 lg:block"
      aria-label={t.nav.sections}
    >
      <div className="rounded-full border border-gray-200/80 bg-white/90 px-2 py-3 shadow-sm backdrop-blur-md">
        <div className="relative h-[min(56vh,24rem)] w-5">
          <div
            className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 overflow-hidden rounded-full bg-gray-200/90"
            aria-hidden="true"
          >
            <motion.div
              className="h-full w-full origin-top bg-gray-800"
              style={{ scaleY: progress }}
            />
          </div>

          {sectionIds.map((id) => {
            const isActive = activeId === id;
            const anchor = anchors[id] ?? 0;

            return (
              <a
                key={id}
                href={`#${id}`}
                className="absolute left-1/2 z-10 flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
                style={{ top: `${anchor * 100}%` }}
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
