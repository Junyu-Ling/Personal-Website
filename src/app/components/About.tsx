import { motion } from "motion/react";
import { Mail, MapPin, Briefcase, Music } from "lucide-react";
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
      className="min-h-screen py-32 px-6 bg-gradient-to-b from-white via-slate-50/50 to-white"
      ref={ref}
    >
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-5xl md:text-7xl mb-16 tracking-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={transition({ duration: 0.8 })}
        >
          {t.about.title}
        </motion.h2>

        <motion.div
          className="flex flex-col sm:flex-row items-center sm:items-start gap-8 sm:gap-10 mb-16 pb-16 border-b border-gray-200/70"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={transition({ duration: 0.8, delay: 0.1 })}
        >
          <motion.img
            src={profileImage}
            alt={t.about.profileAlt}
            className="w-36 h-36 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-white shadow-lg shadow-gray-200/60 shrink-0"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
          />

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
          className="space-y-8"
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
