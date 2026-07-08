import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { LanguageToggle } from "@/app/components/LanguageToggle";

const sectionIds = [
  "home",
  "about",
  "journey",
  "study-materials",
  "awards",
  "projects",
];

export function SiteNav() {
  const { t } = useLanguage();
  const activeId = useScrollSpy(sectionIds);
  const [scrolled, setScrolled] = useState(false);

  const links = [
    { id: "about", label: t.nav.about },
    { id: "journey", label: t.nav.journey },
    { id: "study-materials", label: t.nav.studyMaterials },
    { id: "awards", label: t.nav.awards },
    { id: "projects", label: t.nav.projects },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 72);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 inset-x-0 z-[90] transition-all duration-300 ${
        scrolled
          ? "bg-white/85 backdrop-blur-xl border-b border-gray-200/80 shadow-sm"
          : "bg-transparent"
      }`}
      initial={false}
      animate={{ y: 0 }}
    >
      <div className="container-site flex h-[4.25rem] items-center gap-4">
        <a
          href="#home"
          className="text-sm md:text-base font-semibold tracking-tight text-gray-900 shrink-0"
        >
          {t.nav.brand}
        </a>

        <div className="ml-auto flex items-center gap-3">
          <nav
            className="hidden lg:flex items-center gap-1"
            aria-label={t.nav.sections}
          >
            {links.map((link) => {
              const isActive = activeId === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className={`relative px-3.5 py-2 text-sm font-medium rounded-full transition-colors ${
                    isActive
                      ? "text-gray-900"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="site-nav-pill"
                      className="absolute inset-0 rounded-full bg-gray-100 border border-gray-200/80"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              );
            })}
          </nav>

          <LanguageToggle />
        </div>
      </div>
    </motion.header>
  );
}
