import { motion } from "motion/react";
import { Mail, MapPin, Briefcase, Music, Sparkles } from "lucide-react";
import profileImage from "@/assets/profile.png";
import steinwayPianoLineart from "@/assets/steinway-piano-lineart.png";
import { useInViewOnScrollDown } from "@/app/components/ui/use-in-view-scroll-down";
import { useLanguage } from "@/i18n/LanguageContext";
import { SectionHeader } from "@/app/components/SectionHeader";
import { AboutTypewriterBody } from "@/app/components/AboutTypewriterBody";

const contactMeta = [
  { icon: Mail, color: "text-violet-600" },
  { icon: MapPin, color: "text-sky-600" },
  { icon: Briefcase, color: "text-amber-600" },
  { icon: Music, color: "text-rose-600" },
];

export function About() {
  const { t, locale } = useLanguage();
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
      className="section-shell relative overflow-hidden section-divide section-surface-alt"
      ref={ref}
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-[0.22] section-dots" />
      </div>

      {/* corner accents */}
      <div className="absolute top-24 left-6 w-14 h-14 border-t border-l border-gray-200/80 pointer-events-none hidden md:block" />
      <div className="absolute top-24 right-6 w-14 h-14 border-t border-r border-gray-200/80 pointer-events-none hidden md:block" />
      <div className="absolute bottom-20 left-6 w-14 h-14 border-b border-l border-gray-200/80 pointer-events-none hidden md:block" />
      <div className="absolute bottom-20 right-6 w-14 h-14 border-b border-r border-gray-200/80 pointer-events-none hidden md:block" />

      {/* rings & dots */}
      <div className="absolute top-40 right-[12%] w-24 h-24 rounded-full border border-gray-200/50 pointer-events-none hidden lg:block" />
      <div className="absolute bottom-40 left-[10%] w-16 h-16 rounded-full border border-gray-200/45 pointer-events-none hidden lg:block" />
      <div className="absolute top-[55%] left-[5%] w-2 h-2 rounded-full bg-gray-300/40 pointer-events-none hidden md:block" />
      <div className="absolute top-[35%] right-[8%] w-1.5 h-1.5 rounded-full bg-gray-300/40 pointer-events-none hidden md:block" />

      <div className="container-site relative z-10">
        <div className="relative">
          <div className="about-piano-backdrop hidden md:block" aria-hidden>
            <img src={steinwayPianoLineart} alt="" />
          </div>

          <div className="relative z-10">
            <SectionHeader
              badge={t.about.badge}
              title={t.about.title}
              subtitle={t.about.subtitle}
              icon={Sparkles}
              isVisible={isVisible}
            />

            <motion.div
              className="relative mb-16 flex flex-col items-start gap-8 border-b border-border pb-16 sm:flex-row sm:gap-10"
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={transition({ duration: 0.8, delay: 0.1 })}
            >
          <div className="relative shrink-0">
            <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-violet-100/60 via-sky-50/40 to-emerald-50/40 blur-sm pointer-events-none" />
            <motion.img
              src={profileImage}
              alt={t.about.profileAlt}
              className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-card shadow-lg"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className="min-w-0 flex-1 text-left">
            <h3 className="text-3xl font-semibold mb-2">{t.hero.name}</h3>
            <p className="text-muted-foreground mb-8">{t.hero.role}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
              {contactItems.map((item, index) => {
                const meta = contactMeta[index];
                const Icon = meta.icon;
                return (
                  <div key={item.label} className="flex items-start gap-3 min-w-0">
                    <Icon size={18} className={`${meta.color} shrink-0 mt-0.5`} />
                    <div className="min-w-0">
                      <p className="text-sm text-muted-foreground mb-0.5">{item.label}</p>
                      <p
                        className={`text-foreground ${item.breakAll ? "break-all" : ""}`}
                      >
                        {item.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
          </div>
        </div>

        <AboutTypewriterBody
          key={locale}
          paragraphs={[t.about.p1, t.about.p2, t.about.p3]}
          active={isVisible}
          className="space-y-8 max-w-4xl mx-auto text-left"
        />
      </div>
    </section>
  );
}
