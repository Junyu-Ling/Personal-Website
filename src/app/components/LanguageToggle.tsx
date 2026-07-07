import { useLanguage } from "@/i18n/LanguageContext";

type LanguageToggleProps = {
  className?: string;
};

export function LanguageToggle({ className = "" }: LanguageToggleProps) {
  const { locale, setLocale, t } = useLanguage();

  return (
    <div
      className={`flex rounded-full border border-gray-200 bg-white/95 shadow-sm backdrop-blur-sm p-1 shrink-0 ${className}`}
      role="group"
      aria-label={locale === "en" ? "Language" : "语言"}
    >
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={`px-3.5 py-1.5 text-sm font-medium rounded-full transition-colors ${
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
        className={`px-3.5 py-1.5 text-sm font-medium rounded-full transition-colors ${
          locale === "zh"
            ? "bg-gray-900 text-white"
            : "text-gray-600 hover:text-gray-900"
        }`}
      >
        {t.lang.zh}
      </button>
    </div>
  );
}
