import { motion } from "motion/react";
import { ArrowUpRight, Mail, MapPin, Briefcase, Music, Sparkles } from "lucide-react";
import profileImage from "@/assets/profile.png";
import steinwayPianoLineart from "@/assets/steinway-piano-lineart.png";
import { useInViewOnScrollDown } from "@/app/components/ui/use-in-view-scroll-down";
import { useLanguage } from "@/i18n/LanguageContext";
import { aboutIntroLayoutParagraphs } from "@/i18n/translations";
import { SectionHeader } from "@/app/components/SectionHeader";
import { AboutTypewriterBody } from "@/app/components/AboutTypewriterBody";

const contactMeta = [
  { icon: Mail, color: "text-slate-500" },
  { icon: MapPin, color: "text-slate-500" },
  { icon: Briefcase, color: "text-slate-500" },
  { icon: Music, color: "text-slate-500" },
];

export function About() {
  const { t } = useLanguage();
  const { ref, isVisible, transition } = useInViewOnScrollDown({
    margin: "-100px",
  });

  const contactItems = [
    { label: t.about.email, value: "LingJunYu20081201@gmail.com", breakAll: true },
    { label: t.about.age, value: t.about.ageValue },
    { label: t.about.status, value: t.about.statusValue },
    { label: t.about.music, value: t.about.musicValue },
  ];

  return (
    <section
      id="about"
      className="section-shell relative overflow-hidden section-divide section-surface-alt min-h-[58rem] md:min-h-[62rem]"
      ref={ref}
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-[0.22] section-dots" />
        <div className="about-piano-backdrop hidden md:block" aria-hidden>
          <img
            src={steinwayPianoLineart}
            alt=""
            width={1024}
            height={890}
            decoding="async"
            loading="eager"
          />
        </div>
      </div>

      <div className="absolute top-24 left-6 w-14 h-14 border-t border-l border-gray-200/80 pointer-events-none hidden md:block" />
      <div className="absolute top-24 right-6 w-14 h-14 border-t border-r border-gray-200/80 pointer-events-none hidden md:block" />
      <div className="absolute bottom-20 left-6 w-14 h-14 border-b border-l border-gray-200/80 pointer-events-none hidden md:block" />
      <div className="absolute bottom-20 right-6 w-14 h-14 border-b border-r border-gray-200/80 pointer-events-none hidden md:block" />

      <div className="absolute top-40 right-[12%] w-24 h-24 rounded-full border border-gray-200/50 pointer-events-none hidden lg:block" />
      <div className="absolute bottom-40 left-[10%] w-16 h-16 rounded-full border border-gray-200/45 pointer-events-none hidden lg:block" />
      <div className="absolute top-[55%] left-[5%] w-2 h-2 rounded-full bg-gray-300/40 pointer-events-none hidden md:block" />
      <div className="absolute top-[35%] right-[8%] w-1.5 h-1.5 rounded-full bg-gray-300/40 pointer-events-none hidden md:block" />

      <div className="container-site relative z-10">
        <SectionHeader
          badge={t.about.badge}
          title={t.about.title}
          subtitle={t.about.subtitle}
          icon={Sparkles}
          isVisible={isVisible}
        />

        <motion.div
          className="relative mb-12 flex flex-col items-start gap-10 border-b border-border/80 pb-12 sm:mb-14 sm:flex-row sm:gap-12 sm:pb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={transition({ duration: 0.8, delay: 0.1 })}
        >
          <div className="relative shrink-0">
            <motion.img
              src={profileImage}
              alt={t.about.profileAlt}
              className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full object-cover shadow-[0_12px_40px_rgba(15,23,42,0.14)] ring-1 ring-black/5"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className="min-w-0 flex-1 text-left">
            <h3 className="overflow-visible text-3xl font-semibold tracking-tight mb-2">
              {t.hero.name}
            </h3>
            <p className="mb-8 text-muted-foreground">{t.hero.role}</p>

            <div className="grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2">
              {contactItems.map((item, index) => {
                const meta = contactMeta[index];
                const Icon = meta.icon;
                return (
                  <div key={item.label} className="flex min-w-0 items-start gap-3">
                    <Icon size={18} className={`${meta.color} mt-0.5 shrink-0`} />
                    <div className="min-w-0">
                      <p className="mb-0.5 text-sm text-muted-foreground">{item.label}</p>
                      <p className={`text-foreground ${item.breakAll ? "break-all" : ""}`}>
                        {item.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#projects" className="btn-primary">
                {t.about.viewProjects}
                <ArrowUpRight size={16} />
              </a>
              <a href="mailto:LingJunYu20081201@gmail.com" className="btn-ghost">
                {t.about.contactMe}
                <Mail size={16} />
              </a>
            </div>
          </div>
        </motion.div>

        <div className="about-intro-panel mx-auto max-w-[50rem]">
          <AboutTypewriterBody
            paragraphs={[t.about.p1, t.about.p2, t.about.p3]}
            layoutParagraphs={aboutIntroLayoutParagraphs}
            highlights={t.about.highlights}
            active={isVisible}
            className="space-y-10 text-left"
          />
        </div>
      </div>
    </section>
  );
}
