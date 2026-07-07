import { motion } from "motion/react";
import { useInViewOnScrollDown } from "@/app/components/ui/use-in-view-scroll-down";
import { ExternalLink, ArrowUpRight, FolderGit2 } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { FeaturedStar } from "@/app/components/FeaturedStar";
import type { ProjectItem } from "@/i18n/translations";

const projectLinks = [
  "https://ai-desmos.figma.site",
  "https://toefl-6666.vercel.app/",
  "https://gpa-calculator.figma.site/",
  "https://2048pro.figma.site",
  "https://dragon.figma.site",
  "https://pony.figma.site",
  "https://scs.figma.site",
  "https://wishrelay.figma.site",
  "https://api-check.figma.site",
  "https://echo-chamber-delta.vercel.app/",
];

const projectStyles = [
  {
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    cardHover:
      "has-[.project-cta:hover]:bg-emerald-50 has-[.project-cta:hover]:border-emerald-200/80",
    btnHover: "hover:bg-emerald-600 hover:border-emerald-600 hover:text-white",
  },
  {
    bg: "bg-amber-50",
    text: "text-amber-600",
    cardHover:
      "has-[.project-cta:hover]:bg-amber-50 has-[.project-cta:hover]:border-amber-200/80",
    btnHover: "hover:bg-amber-500 hover:border-amber-500 hover:text-white",
  },
  {
    bg: "bg-teal-50",
    text: "text-teal-600",
    cardHover:
      "has-[.project-cta:hover]:bg-teal-50 has-[.project-cta:hover]:border-teal-200/80",
    btnHover: "hover:bg-teal-600 hover:border-teal-600 hover:text-white",
  },
  {
    bg: "bg-blue-50",
    text: "text-blue-600",
    cardHover:
      "has-[.project-cta:hover]:bg-blue-50 has-[.project-cta:hover]:border-blue-200/80",
    btnHover: "hover:bg-blue-600 hover:border-blue-600 hover:text-white",
  },
  {
    bg: "bg-orange-50",
    text: "text-orange-600",
    cardHover:
      "has-[.project-cta:hover]:bg-orange-50 has-[.project-cta:hover]:border-orange-200/80",
    btnHover: "hover:bg-orange-500 hover:border-orange-500 hover:text-white",
  },
  {
    bg: "bg-violet-50",
    text: "text-violet-600",
    cardHover:
      "has-[.project-cta:hover]:bg-violet-50 has-[.project-cta:hover]:border-violet-200/80",
    btnHover: "hover:bg-violet-600 hover:border-violet-600 hover:text-white",
  },
  {
    bg: "bg-purple-50",
    text: "text-purple-600",
    cardHover:
      "has-[.project-cta:hover]:bg-purple-50 has-[.project-cta:hover]:border-purple-200/80",
    btnHover: "hover:bg-purple-600 hover:border-purple-600 hover:text-white",
  },
  {
    bg: "bg-rose-50",
    text: "text-rose-600",
    cardHover:
      "has-[.project-cta:hover]:bg-rose-50 has-[.project-cta:hover]:border-rose-200/80",
    btnHover: "hover:bg-rose-600 hover:border-rose-600 hover:text-white",
  },
  {
    bg: "bg-cyan-50",
    text: "text-cyan-600",
    cardHover:
      "has-[.project-cta:hover]:bg-cyan-50 has-[.project-cta:hover]:border-cyan-200/80",
    btnHover: "hover:bg-cyan-600 hover:border-cyan-600 hover:text-white",
  },
  {
    bg: "bg-indigo-50",
    text: "text-indigo-600",
    cardHover:
      "has-[.project-cta:hover]:bg-indigo-50 has-[.project-cta:hover]:border-indigo-200/80",
    btnHover: "hover:bg-indigo-600 hover:border-indigo-600 hover:text-white",
  },
];

const categoryOrder: ProjectItem["category"][] = [
  "aiLearning",
  "games",
  "webApps",
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

type ProjectCardProps = {
  project: ProjectItem;
  index: number;
  viewProjectLabel: string;
};

function ProjectCard({ project, index, viewProjectLabel }: ProjectCardProps) {
  const style = projectStyles[index];
  const isFeatured = Boolean(project.featured);

  return (
    <motion.div variants={cardVariants} className="group relative h-full">
      <motion.div
        className={`relative h-full bg-white rounded-2xl p-8 border shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col ${
          isFeatured
            ? "border-amber-200/70 ring-1 ring-amber-100/50"
            : "border-gray-200/70"
        } ${style.cardHover}`}
        whileHover={{ y: -6 }}
      >
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex justify-between items-start mb-6">
            <div
              className={`p-3 rounded-xl ${style.bg} ${style.text} group-hover:scale-110 transition-transform duration-300`}
            >
              <ExternalLink size={22} />
            </div>
            {isFeatured && <FeaturedStar />}
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
              className={`project-cta flex items-center justify-between w-full px-5 py-3 bg-gray-100 text-gray-800 rounded-full border border-gray-200/60 transition-all duration-300 group/btn ${style.btnHover}`}
              whileTap={{ scale: 0.98 }}
            >
              <span className="font-medium text-sm">{viewProjectLabel}</span>
              <ArrowUpRight className="w-4.5 h-4.5 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  const { t } = useLanguage();
  const { ref, isVisible, transition } = useInViewOnScrollDown({
    margin: "-100px",
  });

  const projectsWithIndex = t.projects.items.map((project, index) => ({
    project,
    index,
  }));

  return (
    <section
      id="projects"
      className="section-shell min-h-screen section-divide section-surface-alt overflow-hidden"
      ref={ref}
    >
      <div className="container-site">
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

          <h2 className="text-5xl md:text-7xl mb-6 text-gray-900 tracking-tight leading-[1.08] pb-[0.06em]">
            {t.projects.title}
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl">
            {t.projects.subtitle}
          </p>
        </motion.div>

        <div className="space-y-16">
          {categoryOrder.map((category) => {
            const categoryProjects = projectsWithIndex
              .filter(({ project }) => project.category === category)
              .sort(
                (a, b) =>
                  Number(Boolean(b.project.featured)) -
                  Number(Boolean(a.project.featured))
              );

            if (categoryProjects.length === 0) return null;

            return (
              <div key={category}>
                <motion.h3
                  className="text-2xl md:text-3xl font-semibold text-gray-900 mb-8 tracking-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={transition({ duration: 0.6 })}
                >
                  {t.projects.categories[category]}
                </motion.h3>

                <motion.div
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
                  variants={containerVariants}
                  initial="hidden"
                  animate={isVisible ? "show" : "hidden"}
                >
                  {categoryProjects.map(({ project, index }) => (
                    <ProjectCard
                      key={index}
                      project={project}
                      index={index}
                      viewProjectLabel={t.projects.viewProject}
                    />
                  ))}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
