import { useLanguage } from "@/i18n/LanguageContext";

type LanguageToggleProps = {
  className?: string;
};

export function LanguageToggle({ className = "" }: LanguageToggleProps) {
  const { locale, setLocale, t } = useLanguage();

  return (
    <div
      className={`flex rounded-[10px] border border-border bg-card p-1 shrink-0 ${className}`}
      role="group"
      aria-label={locale === "en" ? "Language" : "语言"}
    >
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={`px-3 py-1.5 text-sm font-medium rounded-[8px] transition-colors ${
          locale === "en"
            ? "bg-foreground text-background"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        {t.lang.en}
      </button>
      <button
        type="button"
        onClick={() => setLocale("zh")}
        className={`px-3 py-1.5 text-sm font-medium rounded-[8px] transition-colors ${
          locale === "zh"
            ? "bg-foreground text-background"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        {t.lang.zh}
      </button>
    </div>
  );
}
