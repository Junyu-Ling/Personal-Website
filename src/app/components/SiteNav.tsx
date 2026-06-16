import { motion } from "motion/react";
import { useLanguage } from "@/i18n/LanguageContext";
import { PAGE_IDS, type PageId, useNavigation } from "@/app/navigation";

const navPages = PAGE_IDS.filter((page) => page !== "home");

export function SiteNav() {
  const { t, locale, setLocale } = useLanguage();
  const { activePage, navigate } = useNavigation();

  const labels: Record<PageId, string> = {
    home: t.nav.home,
    about: t.nav.about,
    journey: t.nav.journey,
    achievements: t.nav.achievements,
    "study-materials": t.nav.studyMaterials,
    awards: t.nav.awards,
    projects: t.nav.projects,
  };

  return (
    <header className="fixed top-0 inset-x-0 z-[100] px-4 sm:px-6 pt-3 pointer-events-none">
      <div className="max-w-5xl mx-auto pointer-events-auto">
        <div className="flex items-center gap-3 sm:gap-4 h-[3.25rem] sm:h-14 px-3 sm:px-4 rounded-2xl border border-gray-200/60 bg-white/80 backdrop-blur-xl shadow-[0_2px_24px_-4px_rgba(0,0,0,0.06)]">
          <button
            type="button"
            onClick={() => navigate("home")}
            className={`shrink-0 text-sm font-semibold tracking-tight transition-colors ${
              activePage === "home"
                ? "text-gray-950"
                : "text-gray-800 hover:text-gray-600"
            }`}
          >
            {t.hero.name}
          </button>

          <div className="hidden sm:block w-px h-5 bg-gray-200/90 shrink-0" />

          <nav
            className="relative flex-1 min-w-0 overflow-x-auto scrollbar-none"
            aria-label={t.nav.sections}
          >
            <div className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-white/90 to-transparent pointer-events-none z-10 sm:hidden" />
            <div className="absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-white/90 to-transparent pointer-events-none z-10 sm:hidden" />
            <div className="flex items-center gap-0.5 sm:gap-1 w-max sm:w-full sm:justify-center px-1">
              {navPages.map((page) => {
                const isActive = activePage === page;
                return (
                  <button
                    key={page}
                    type="button"
                    onClick={() => navigate(page)}
                    className={`relative shrink-0 px-2.5 sm:px-3.5 py-2 text-[11px] sm:text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                      isActive
                        ? "text-gray-950"
                        : "text-gray-400 hover:text-gray-700"
                    }`}
                  >
                    {labels[page]}
                    {isActive && (
                      <motion.span
                        layoutId="site-nav-indicator"
                        className="absolute left-2 right-2 sm:left-3 sm:right-3 -bottom-0.5 h-[2px] rounded-full bg-gray-900"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </nav>

          <div className="hidden sm:block w-px h-5 bg-gray-200/90 shrink-0" />

          <div
            className="shrink-0 flex items-center text-[11px] sm:text-xs font-medium"
            role="group"
            aria-label={locale === "en" ? "Language" : "语言"}
          >
            <button
              type="button"
              onClick={() => setLocale("en")}
              className={`px-1.5 py-1 transition-colors ${
                locale === "en"
                  ? "text-gray-950"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {t.lang.en}
            </button>
            <span className="text-gray-300 select-none">/</span>
            <button
              type="button"
              onClick={() => setLocale("zh")}
              className={`px-1.5 py-1 transition-colors ${
                locale === "zh"
                  ? "text-gray-950"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {t.lang.zh}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
