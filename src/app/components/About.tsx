import { motion } from "motion/react";
import { Mail, MapPin, Briefcase, Music, Sparkles } from "lucide-react";
import profileImage from "@/assets/profile.png";
import { useInViewOnScrollDown } from "@/app/components/ui/use-in-view-scroll-down";
import { useLanguage } from "@/i18n/LanguageContext";

const contactMeta = [
  { icon: Mail, color: "text-violet-600" },
  { icon: MapPin, color: "text-sky-600" },
  { icon: Briefcase, color: "text-amber-600" },
  { icon: Music, color: "text-rose-600" },
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
      className="min-h-screen py-32 px-6 relative overflow-hidden bg-white section-divide"
      ref={ref}
    >
      {/* background */}
      <div
        className="absolute inset-0 opacity-[0.22] pointer-events-none section-dots"
      />

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

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={transition({ duration: 0.8 })}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-gray-200/70 shadow-sm backdrop-blur-sm mb-6">
            <Sparkles className="text-violet-500 w-4 h-4" />
            <span className="text-sm font-medium text-gray-600">
              {t.about.badge}
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl mb-4 tracking-tight">
            {t.about.title}
          </h2>
          <p className="text-lg md:text-xl text-gray-500 leading-relaxed max-w-2xl">
            {t.about.subtitle}
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row items-center sm:items-start gap-8 sm:gap-10 mb-16 pb-16 border-b border-gray-200/60"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={transition({ duration: 0.8, delay: 0.1 })}
        >
          <div className="relative shrink-0">
            <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-violet-100/60 via-sky-50/40 to-emerald-50/40 blur-sm pointer-events-none" />
            <motion.img
              src={profileImage}
              alt={t.about.profileAlt}
              className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-white shadow-lg shadow-gray-200/60"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className="min-w-0 flex-1 text-center sm:text-left">
            <h3 className="text-3xl font-semibold mb-2">{t.hero.name}</h3>
            <p className="text-gray-400 mb-8">{t.hero.role}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
              {contactItems.map((item, index) => {
                const meta = contactMeta[index];
                const Icon = meta.icon;
                return (
                  <div key={item.label} className="flex items-start gap-3 min-w-0">
                    <Icon size={18} className={`${meta.color} shrink-0 mt-0.5`} />
                    <div className="min-w-0">
                      <p className="text-sm text-gray-400 mb-0.5">{item.label}</p>
                      <p
                        className={`text-gray-700 ${item.breakAll ? "break-all" : ""}`}
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

        <motion.div
          className="space-y-8 max-w-4xl mx-auto px-1 sm:px-2 md:px-0"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={transition({ duration: 0.8, delay: 0.25 })}
        >
          <p className="text-xl text-gray-600 leading-relaxed">{t.about.p1}</p>
          <p className="text-xl text-gray-600 leading-relaxed">{t.about.p2}</p>
          <p className="text-xl text-gray-600 leading-relaxed">{t.about.p3}</p>
        </motion.div>
      </div>
    </section>
  );
}
