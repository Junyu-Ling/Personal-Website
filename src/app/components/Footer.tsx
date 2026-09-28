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
              href="https://mail.google.com/mail/?view=cm&fs=1&to=LingJunYu20081201@gmail.com"
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
              href="https://github.com/Junyu-Ling"
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
            href="https://github.com/Junyu-Ling"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-3 text-gray-400 hover:text-white transition-colors"
          >
            <Github size={16} />
            <span>github.com/Junyu-Ling</span>
          </a>
        </motion.div>
      </div>
    </footer>
  );
}
