import { lazy, Suspense, useCallback, useState } from "react";
import { motion } from "motion/react";
import { Music2 } from "lucide-react";
import { useInViewOnScrollDown } from "@/app/components/ui/use-in-view-scroll-down";
import { useLanguage } from "@/i18n/LanguageContext";
import { SectionHeader } from "@/app/components/SectionHeader";

const SteinwayPiano = lazy(() =>
  import("@/app/components/SteinwayPiano").then((mod) => ({
    default: mod.SteinwayPiano,
  }))
);

export function Piano() {
  const { t } = useLanguage();
  const { ref, isVisible, transition } = useInViewOnScrollDown({
    margin: "-80px",
  });
  const [note, setNote] = useState("");

  const onNote = useCallback((name: string) => {
    setNote(name);
  }, []);

  return (
    <section
      id="piano"
      className="section-shell relative overflow-hidden section-divide"
      ref={ref}
    >
      <div className="container-site">
        <SectionHeader
          badge={t.piano.badge}
          title={t.piano.title}
          subtitle={t.piano.subtitle}
          icon={Music2}
          isVisible={isVisible}
        />

        <motion.div
          className="relative overflow-hidden rounded-3xl border border-gray-200 bg-[#1a1612] shadow-[0_24px_80px_-32px_rgba(20,12,8,0.55)]"
          initial={{ opacity: 0, y: 28 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={transition({
            duration: 0.75,
            ease: [0.21, 0.47, 0.32, 0.98],
          })}
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-4 p-4 md:p-5">
            <p className="rounded-full bg-black/35 px-3 py-1.5 text-xs text-white/80 backdrop-blur-sm">
              {t.piano.hint}
            </p>
            <p className="rounded-full bg-black/35 px-3 py-1.5 font-mono text-xs tracking-wide text-amber-200/90 backdrop-blur-sm">
              {t.piano.note}: {note || t.piano.idleNote}
            </p>
          </div>

          <div className="h-[28rem] w-full md:h-[36rem] lg:h-[42rem]">
            {isVisible ? (
              <Suspense
                fallback={
                  <div className="flex h-full items-center justify-center text-sm text-white/60">
                    {t.piano.loading}
                  </div>
                }
              >
                <SteinwayPiano onNote={onNote} />
              </Suspense>
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-white/60">
                {t.piano.loading}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
