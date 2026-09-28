import { motion } from "motion/react";
import { useInViewOnScrollDown } from "@/app/components/ui/use-in-view-scroll-down";
import {
  ArrowUpRight,
  BookOpen,
  Calculator,
  FolderGit2,
  Gamepad2,
  Gift,
  Grid3x3,
  LineChart,
  Puzzle,
  Store,
  Webhook,
} from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { FeaturedStar } from "@/app/components/FeaturedStar";
import { SectionHeader } from "@/app/components/SectionHeader";
import type { ProjectItem } from "@/i18n/translations";

const projectLinks = [
  "https://ai-desmos.online",
  "https://toefl-6666.vercel.app/",
  "https://gpa-calculator.figma.site/",
  "https://2048pro.online",
  "https://dragon.figma.site",
  "https://pony.figma.site",
  "https://scs.figma.site",
  "https://wishrelay.figma.site",
  "https://api-check.figma.site",
];

const projectIcons = [
  LineChart,
  BookOpen,
  Calculator,
  Grid3x3,
  Puzzle,
  Gamepad2,
  Store,
  Gift,
  Webhook,
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
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

type ProjectCardProps = {
  project: ProjectItem;
  index: number;
  viewProjectLabel: string;
};

function ProjectCard({ project, index, viewProjectLabel }: ProjectCardProps) {
  const Icon = projectIcons[index] ?? FolderGit2;
  const isFeatured = Boolean(project.featured);

  return (
    <motion.div variants={cardVariants} className="group relative h-full">
      <motion.div
        className={`relative h-full bg-card rounded-[12px] p-7 border border-border transition-all duration-300 overflow-hidden flex flex-col group-hover:bg-secondary ${
          isFeatured ? "border-foreground/20" : ""
        }`}
        style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}
        whileHover={{ y: -4 }}
      >
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 rounded-[10px] bg-secondary text-foreground group-hover:bg-card transition-colors duration-300">
              <Icon size={20} strokeWidth={1.75} />
            </div>
            {isFeatured && <FeaturedStar />}
          </div>

          <h3 className="text-xl font-semibold mb-3 text-foreground tracking-tight">
            {project.title}
          </h3>

          <p className="text-muted-foreground mb-8 leading-[1.6] flex-grow">
            {project.description}
          </p>

          <div className="space-y-5 mt-auto">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 bg-secondary rounded-[8px] text-xs font-medium text-muted-foreground border border-border"
                >
                  {tag}
                </span>
              ))}
            </div>

            <motion.a
              href={projectLinks[index]}
              target="_blank"
              rel="noopener noreferrer"
              className="project-cta flex items-center justify-between w-full px-4 py-2.5 bg-foreground text-background rounded-[10px] transition-opacity duration-300 group/btn hover:opacity-90"
              whileTap={{ scale: 0.98 }}
            >
              <span className="font-medium text-sm">{viewProjectLabel}</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
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
        <SectionHeader
          badge={t.projects.badge}
          title={t.projects.title}
          subtitle={t.projects.subtitle}
          icon={FolderGit2}
          isVisible={isVisible}
        />

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
                  className="text-2xl md:text-3xl font-semibold text-foreground mb-8 tracking-tight"
                  initial={{ opacity: 0, y: 16 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={transition({ duration: 0.5 })}
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
