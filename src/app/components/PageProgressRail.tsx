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
      className="fixed right-6 xl:right-10 top-1/2 z-[85] hidden -translate-y-1/2 lg:block"
      aria-label={t.nav.sections}
    >
      <div className="relative h-[min(58vh,26rem)] w-[7.5rem]">
        <div
          className="absolute right-0 top-0 bottom-0 w-px rounded-full bg-gray-200/70"
          aria-hidden="true"
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-px overflow-hidden rounded-full"
          aria-hidden="true"
        >
          <motion.div
            className="h-full w-full origin-top rounded-full bg-gray-900/75"
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
              className="group absolute right-0 flex -translate-y-1/2 items-center justify-end gap-2.5"
              style={{ top: `${anchor * 100}%` }}
              aria-label={labels[id]}
              aria-current={isActive ? "true" : undefined}
            >
              <span
                className={`max-w-[5.25rem] truncate text-right text-[11px] font-medium tracking-wide transition-all duration-200 ${
                  isActive
                    ? "translate-x-0 text-gray-900 opacity-100"
                    : "translate-x-1 text-gray-500 opacity-0 group-hover:translate-x-0 group-hover:opacity-75 group-focus-visible:translate-x-0 group-focus-visible:opacity-75"
                }`}
              >
                {labels[id]}
              </span>

              <span
                className={`shrink-0 rounded-full transition-all duration-200 ${
                  isActive
                    ? "h-2 w-2 bg-gray-900 shadow-[0_0_0_2px_rgba(255,255,255,1)]"
                    : "h-1.5 w-1.5 bg-gray-300 group-hover:bg-gray-500"
                }`}
              />
            </a>
          );
        })}
      </div>
    </nav>
  );
}
