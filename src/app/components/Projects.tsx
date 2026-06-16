import { motion } from "motion/react";
import { useInViewOnScrollDown } from "@/app/components/ui/use-in-view-scroll-down";
import { ExternalLink, Star, ArrowUpRight, FolderGit2 } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const projectLinks = [
  "https://2048pro.figma.site",
  "https://scs.figma.site",
  "https://ai-desmos.figma.site",
  "https://wishrelay.figma.site",
  "https://dragon.figma.site",
  "https://api-check.figma.site",
  "https://gpa-calculator.figma.site/",
  "https://pony.figma.site",
  "https://echo-chamber-delta.vercel.app/",
];

const projectStyles = [
  { bg: "bg-blue-50", text: "text-blue-600", featured: true },
  { bg: "bg-purple-50", text: "text-purple-600", featured: true },
  { bg: "bg-emerald-50", text: "text-emerald-600", featured: true },
  { bg: "bg-rose-50", text: "text-rose-600", featured: false },
  { bg: "bg-orange-50", text: "text-orange-600", featured: false },
  { bg: "bg-cyan-50", text: "text-cyan-600", featured: false },
  { bg: "bg-teal-50", text: "text-teal-600", featured: false },
  { bg: "bg-violet-50", text: "text-violet-600", featured: false },
  { bg: "bg-amber-50", text: "text-amber-600", featured: false },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  },
};

export function Projects() {
  const { t } = useLanguage();
  const { ref, isVisible, transition } = useInViewOnScrollDown({
    margin: "-100px",
  });

  return (
    <section
      id="projects"
      className="page-min-h py-32 px-6 bg-white overflow-hidden"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-20 flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={transition({ duration: 0.8 })}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200/70 shadow-sm mb-6">
            <FolderGit2 className="text-gray-600 w-4 h-4" />
            <span className="text-sm font-medium text-gray-600">
              {t.projects.badge}
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl mb-6 text-gray-900 tracking-tight pb-2">
            {t.projects.title}
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl">
            {t.projects.subtitle}
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "show" : "hidden"}
          transition={transition({ duration: 0.8 })}
        >
          {t.projects.items.map((project, index) => {
            const style = projectStyles[index];
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className="group relative h-full"
              >
                <motion.div
                  className="relative h-full bg-white rounded-2xl p-8 border border-gray-200/70 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col"
                  whileHover={{ y: -6 }}
                >
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-6">
                      <div
                        className={`p-3 rounded-xl ${style.bg} ${style.text} group-hover:scale-110 transition-transform duration-300`}
                      >
                        <ExternalLink size={22} />
                      </div>
                      {style.featured && (
                        <motion.div
                          className="p-2 bg-amber-50 rounded-full border border-amber-100"
                          initial={{ opacity: 0, scale: 0.6 }}
                          animate={
                            isVisible
                              ? { opacity: 1, scale: 1 }
                              : { opacity: 0, scale: 0.6 }
                          }
                          transition={transition({
                            delay: 0.5 + index * 0.1,
                            duration: 0.4,
                          })}
                        >
                          <Star
                            size={18}
                            className="fill-amber-400 text-amber-400"
                          />
                        </motion.div>
                      )}
                    </div>

                    <h3 className="text-2xl font-semibold mb-3 text-gray-900">
                      {project.title}
                    </h3>

                    <p className="text-gray-500 mb-8 leading-relaxed flex-grow group-hover:text-gray-600 transition-colors">
                      {project.description}
                    </p>

                    <div className="space-y-6 mt-auto">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-3 py-1 bg-gray-50 rounded-full text-xs font-medium text-gray-600 border border-gray-200/60"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <motion.a
                        href={projectLinks[index]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between w-full px-5 py-3 bg-gray-100 hover:bg-gray-900 text-gray-800 hover:text-white rounded-full border border-gray-200/60 transition-all duration-300 group/btn"
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="font-medium text-sm">
                          {t.projects.viewProject}
                        </span>
                        <ArrowUpRight className="w-4.5 h-4.5 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
