import { useLanguage } from "@/i18n/LanguageContext";
import { PAGE_IDS, type PageId, useNavigation } from "@/app/navigation";

const navPages: PageId[] = PAGE_IDS;

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
    <header className="fixed top-0 inset-x-0 z-[100] border-b border-gray-200/80 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[4.25rem] flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate("home")}
          className="shrink-0 text-sm sm:text-base font-semibold text-gray-900 hover:text-gray-600 transition-colors"
        >
          {t.hero.name}
        </button>

        <nav
          className="flex-1 min-w-0 overflow-x-auto scrollbar-none"
          aria-label={t.nav.sections}
        >
          <div className="flex items-center gap-1 w-max mx-auto px-1">
            {navPages.map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => navigate(page)}
                className={`shrink-0 text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-full font-medium transition-all duration-200 whitespace-nowrap ${
                  activePage === page
                    ? "bg-gray-950 text-white shadow-sm"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {labels[page]}
              </button>
            ))}
          </div>
        </nav>

        <div
          className="shrink-0 flex rounded-full border border-gray-200 bg-white p-1"
          role="group"
          aria-label={locale === "en" ? "Language" : "语言"}
        >
          <button
            type="button"
            onClick={() => setLocale("en")}
            className={`px-2.5 sm:px-3 py-1 text-xs sm:text-sm font-medium rounded-full transition-colors ${
              locale === "en"
                ? "bg-gray-900 text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {t.lang.en}
          </button>
          <button
            type="button"
            onClick={() => setLocale("zh")}
            className={`px-2.5 sm:px-3 py-1 text-xs sm:text-sm font-medium rounded-full transition-colors ${
              locale === "zh"
                ? "bg-gray-900 text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {t.lang.zh}
          </button>
        </div>
      </div>
    </header>
  );
}
