import { useLanguage } from "@/i18n/LanguageContext";

type LanguageToggleProps = {
  className?: string;
};

export function LanguageToggle({ className = "" }: LanguageToggleProps) {
  const { locale, setLocale, t } = useLanguage();

  return (
    <div
      className={`flex shrink-0 rounded-full border border-gray-200/60 bg-white/90 p-0.5 shadow-sm backdrop-blur-sm ${className}`}
      role="group"
      aria-label={locale === "en" ? "Language" : "语言"}
    >
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
          locale === "en"
            ? "bg-gray-800 text-white"
            : "text-gray-600 hover:text-gray-900"
        }`}
      >
        {t.lang.en}
      </button>
      <button
        type="button"
        onClick={() => setLocale("zh")}
        className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
          locale === "zh"
            ? "bg-gray-800 text-white"
            : "text-gray-600 hover:text-gray-900"
        }`}
      >
        {t.lang.zh}
      </button>
    </div>
  );
}
