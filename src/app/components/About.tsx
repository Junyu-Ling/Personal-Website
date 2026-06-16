import { motion } from "motion/react";
import {
  Mail,
  MapPin,
  Briefcase,
  Music,
  Code2,
  Mic2,
  Sparkles,
} from "lucide-react";
import profileImage from "@/assets/profile.png";
import { useInViewOnScrollDown } from "@/app/components/ui/use-in-view-scroll-down";
import { useLanguage } from "@/i18n/LanguageContext";

const pillarMeta = [
  {
    icon: Code2,
    bg: "bg-violet-50",
    text: "text-violet-600",
    border: "border-violet-100/80",
    accent: "from-violet-100/40 to-transparent",
  },
  {
    icon: Music,
    bg: "bg-rose-50",
    text: "text-rose-600",
    border: "border-rose-100/80",
    accent: "from-rose-100/40 to-transparent",
  },
  {
    icon: Mic2,
    bg: "bg-sky-50",
    text: "text-sky-600",
    border: "border-sky-100/80",
    accent: "from-sky-100/40 to-transparent",
  },
];

const contactMeta = [
  { icon: Mail, bg: "bg-violet-50", text: "text-violet-600" },
  { icon: MapPin, bg: "bg-sky-50", text: "text-sky-600" },
  { icon: Briefcase, bg: "bg-amber-50", text: "text-amber-600" },
  { icon: Music, bg: "bg-rose-50", text: "text-rose-600" },
];

const highlightColors = [
  "border-violet-200 bg-violet-50/80 text-violet-700",
  "border-sky-200 bg-sky-50/80 text-sky-700",
  "border-emerald-200 bg-emerald-50/80 text-emerald-700",
];

export function About() {
  const { t } = useLanguage();
  const { ref, isVisible, transition } = useInViewOnScrollDown({
    margin: "-100px",
  });

  const paragraphs = [t.about.p1, t.about.p2, t.about.p3];
  const contactItems = [
    { label: t.about.email, value: "LingJunYu20081201@gmail.com", breakAll: true },
    { label: t.about.age, value: t.about.ageValue },
    { label: t.about.status, value: t.about.statusValue },
    { label: t.about.music, value: t.about.musicValue },
  ];

  return (
    <section
      id="about"
      className="min-h-screen py-32 px-6 relative overflow-hidden bg-gradient-to-b from-white via-slate-50/70 to-white"
      ref={ref}
    >
      <div
        className="absolute inset-0 opacity-[0.25] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />
      <div className="absolute top-24 -left-20 w-72 h-72 rounded-full bg-violet-100/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 -right-16 w-64 h-64 rounded-full bg-sky-100/35 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={transition({ duration: 0.8 })}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200/70 shadow-sm mb-6">
            <Sparkles className="text-violet-500 w-4 h-4" />
            <span className="text-sm font-medium text-gray-600">
              {t.about.badge}
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl mb-4 tracking-tight">
            {t.about.title}
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl leading-relaxed">
            {t.about.subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-12">
          <div className="lg:col-span-3 space-y-5">
            {paragraphs.map((text, index) => {
              const meta = pillarMeta[index];
              const Icon = meta.icon;
              return (
                <motion.div
                  key={index}
                  className={`group relative rounded-2xl border ${meta.border} bg-white/80 backdrop-blur-sm p-6 md:p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden`}
                  initial={{ opacity: 0, x: -40 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={transition({ duration: 0.7, delay: 0.15 + index * 0.12 })}
                  whileHover={{ y: -4 }}
                >
                  <div
                    className={`absolute inset-y-0 left-0 w-1 bg-gradient-to-b ${meta.accent} opacity-80`}
                  />
                  <div
                    className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${meta.accent} rounded-bl-full opacity-60 pointer-events-none`}
                  />
                  <div className="relative z-10 flex items-start gap-4">
                    <div
                      className={`p-3 ${meta.bg} ${meta.text} rounded-xl shrink-0`}
                    >
                      <Icon size={22} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
                          0{index + 1}
                        </span>
                        <span className="h-px flex-1 bg-gray-100" />
                        <span
                          className={`text-xs font-medium px-2.5 py-1 rounded-full ${meta.bg} ${meta.text}`}
                        >
                          {t.about.pillars[index]}
                        </span>
                      </div>
                      <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                        {text}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            className="lg:col-span-2 min-w-0"
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={transition({ duration: 0.8, delay: 0.35 })}
          >
            <div className="lg:sticky lg:top-28 rounded-2xl border border-gray-200/70 bg-white/85 backdrop-blur-md shadow-sm overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-violet-200 via-sky-200 to-emerald-200" />

              <div className="p-6 md:p-8">
                <motion.div
                  className="flex justify-center mb-6"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                  transition={transition({ duration: 0.8, delay: 0.45 })}
                >
                  <div className="relative">
                    <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-violet-100 via-sky-50 to-emerald-50 blur-sm" />
                    <div className="absolute -inset-1.5 rounded-full border border-gray-200/80" />
                    <motion.img
                      src={profileImage}
                      alt={t.about.profileAlt}
                      className="relative w-40 h-40 md:w-44 md:h-44 rounded-full object-cover border-4 border-white shadow-xl shadow-violet-100/50"
                      whileHover={{ scale: 1.04 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>

                <h3 className="text-2xl font-semibold text-center mb-1">
                  {t.hero.name}
                </h3>
                <p className="text-sm text-gray-400 text-center tracking-wider uppercase mb-5">
                  {t.hero.role}
                </p>

                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {t.hero.highlights.map((label, i) => (
                    <span
                      key={i}
                      className={`px-3 py-1 text-xs border rounded-full ${highlightColors[i]}`}
                    >
                      {label}
                    </span>
                  ))}
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-6" />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                  {contactItems.map((item, index) => {
                    const meta = contactMeta[index];
                    const Icon = meta.icon;
                    return (
                      <motion.div
                        key={item.label}
                        className="flex items-start gap-3 min-w-0 p-3.5 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-gray-200/80 hover:shadow-sm transition-all duration-200"
                        initial={{ opacity: 0, y: 12 }}
                        animate={isVisible ? { opacity: 1, y: 0 } : {}}
                        transition={transition({
                          duration: 0.5,
                          delay: 0.55 + index * 0.08,
                        })}
                      >
                        <div
                          className={`p-2.5 ${meta.bg} ${meta.text} rounded-lg shrink-0`}
                        >
                          <Icon size={18} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm font-medium text-gray-900 mb-0.5">
                            {item.label}
                          </h4>
                          <p
                            className={`text-gray-600 text-sm leading-snug ${item.breakAll ? "break-all" : ""}`}
                          >
                            {item.value}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
