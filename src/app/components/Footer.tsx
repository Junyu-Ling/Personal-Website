import { motion } from "motion/react";
import { Mail, Github } from "lucide-react";
import { useInViewOnScrollDown } from "@/app/components/ui/use-in-view-scroll-down";
import { useLanguage } from "@/i18n/LanguageContext";

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  const { ref, isVisible, transition } = useInViewOnScrollDown({
    margin: "-50px",
  });

  return (
    <footer
      ref={ref}
      className="section-shell bg-[#111111] text-white border-t border-white/10"
    >
      <div className="container-site">
        <div className="flex flex-col items-center text-center mb-12">
          <motion.h3
            className="text-3xl md:text-4xl font-semibold tracking-tight mb-8"
            initial={{ opacity: 0, y: 16 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={transition({ duration: 0.5 })}
          >
            {t.footer.contact}
          </motion.h3>

          <motion.div
            className="flex justify-center gap-3"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={transition({ duration: 0.5, delay: 0.15 })}
          >
            <motion.a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=LingJunYu20081201@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 bg-white/5 border border-white/10 rounded-[10px] hover:bg-white/10 transition-colors"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              aria-label={t.footer.emailAria}
            >
              <Mail size={22} strokeWidth={1.75} />
            </motion.a>
            <motion.a
              href="https://github.com/Junyu-Ling"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 bg-white/5 border border-white/10 rounded-[10px] hover:bg-white/10 transition-colors"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              aria-label={t.footer.githubAria}
            >
              <Github size={22} strokeWidth={1.75} />
            </motion.a>
          </motion.div>
        </div>

        <motion.div
          className="pt-8 border-t border-white/10 text-center text-white/50"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={transition({ duration: 0.5, delay: 0.3 })}
        >
          <p>
            © {currentYear} {t.footer.copyrightName}. {t.footer.rights}
          </p>
          <a
            href="https://github.com/Junyu-Ling"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-3 text-white/50 hover:text-white transition-colors"
          >
            <Github size={15} strokeWidth={1.75} />
            <span>github.com/Junyu-Ling</span>
          </a>
        </motion.div>
      </div>
    </footer>
  );
}
