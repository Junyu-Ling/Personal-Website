import { useState } from "react";
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import { motion } from "motion/react";
import { Mail, Github, FileDown } from "lucide-react";
import { useInViewOnScrollDown } from "@/app/components/ui/use-in-view-scroll-down";
import { useLanguage } from "@/i18n/LanguageContext";
import { EMAIL, GITHUB_LABEL, GITHUB_URL, MAILTO_URL } from "@/data/site";

export function Footer() {
  const { t, locale } = useLanguage();
  const currentYear = new Date().getFullYear();
  const [exporting, setExporting] = useState(false);
  const { ref, isVisible, transition } = useInViewOnScrollDown({
    margin: "-50px",
  });

  const handleExportCv = async () => {
    if (exporting) return;
    setExporting(true);
    const host = document.createElement("div");
    host.style.cssText =
      "position:fixed;left:0;top:0;width:794px;background:#ffffff;z-index:-1;pointer-events:none;";
    document.body.appendChild(host);
    const root = createRoot(host);
    try {
      const [{ CvDocument }, { exportElementToPdf }] = await Promise.all([
        import("@/app/components/CvDocument"),
        import("@/lib/exportCvPdf"),
      ]);
      flushSync(() => {
        root.render(<CvDocument t={t} />);
      });
      const element = host.querySelector("[data-cv-root]");
      if (!(element instanceof HTMLElement)) {
        throw new Error("CV document did not render");
      }
      const filename =
        locale === "zh" ? "灵俊宇-简历.pdf" : "Junyu-Ling-CV.pdf";
      await exportElementToPdf(element, filename);
    } catch (error) {
      console.error("Failed to export CV", error);
    } finally {
      root.unmount();
      host.remove();
      setExporting(false);
    }
  };

  return (
    <footer
      ref={ref}
      className="section-shell bg-gray-900 text-white border-t border-gray-800"
    >
      <div className="container-site">
        <div className="flex flex-col items-center text-center mb-12">
          <motion.h3
            className="text-4xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={transition({ duration: 0.6 })}
          >
            {t.footer.contact}
          </motion.h3>

          <motion.div
            className="flex justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={transition({ duration: 0.6, delay: 0.2 })}
          >
            <motion.a
              href={MAILTO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              aria-label={t.footer.emailAria}
            >
              <Mail size={28} />
            </motion.a>
            <motion.a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
              aria-label={t.footer.githubAria}
            >
              <Github size={28} />
            </motion.a>
          </motion.div>

          <motion.div
            className="mt-5 space-y-1 text-sm text-gray-400"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={transition({ duration: 0.6, delay: 0.25 })}
          >
            <p>{EMAIL}</p>
            <p>{GITHUB_LABEL}</p>
          </motion.div>

          <motion.button
            type="button"
            onClick={handleExportCv}
            disabled={exporting}
            aria-label={t.footer.exportCvAria}
            className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-violet-500 via-sky-500 to-emerald-500 text-white font-medium shadow-lg shadow-violet-500/20 hover:brightness-110 disabled:opacity-70 disabled:cursor-wait transition"
            initial={{ opacity: 0, y: 12 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={transition({ duration: 0.6, delay: 0.3 })}
            whileTap={{ scale: exporting ? 1 : 0.98 }}
          >
            <FileDown size={18} />
            {exporting ? t.footer.exportingCv : t.footer.exportCv}
          </motion.button>
        </div>

        <motion.div
          className="pt-8 border-t border-gray-800 text-center text-gray-400"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={transition({ duration: 0.6, delay: 0.4 })}
        >
          <p>
            © {currentYear} {t.footer.copyrightName}. {t.footer.rights}
          </p>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-3 text-gray-400 hover:text-white transition-colors"
          >
            <Github size={16} />
            <span>{GITHUB_LABEL}</span>
          </a>
        </motion.div>
      </div>
    </footer>
  );
}
