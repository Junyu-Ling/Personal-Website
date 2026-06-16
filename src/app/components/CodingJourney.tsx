import { motion } from "motion/react";
import {
  Code2,
  Terminal,
  Cpu,
  Globe,
  Layout,
  Laptop,
  Sparkles,
} from "lucide-react";
import { useInViewOnScrollDown } from "@/app/components/ui/use-in-view-scroll-down";
import { useLanguage } from "@/i18n/LanguageContext";

const journeyMeta = [
  { icon: Laptop, bg: "bg-blue-50", text: "text-blue-600", ring: "ring-blue-100" },
  { icon: Terminal, bg: "bg-indigo-50", text: "text-indigo-600", ring: "ring-indigo-100" },
  { icon: Code2, bg: "bg-purple-50", text: "text-purple-600", ring: "ring-purple-100" },
  { icon: Cpu, bg: "bg-pink-50", text: "text-pink-600", ring: "ring-pink-100" },
  { icon: Layout, bg: "bg-rose-50", text: "text-rose-600", ring: "ring-rose-100" },
  { icon: Globe, bg: "bg-orange-50", text: "text-orange-600", ring: "ring-orange-100" },
];

export function CodingJourney() {
  const { t } = useLanguage();
  const { ref, isVisible, transition } = useInViewOnScrollDown({
    margin: "-100px",
  });

  return (
    <section
      id="journey"
      className="py-32 px-6 relative overflow-hidden bg-white"
      ref={ref}
    >
      <div className="absolute inset-0 opacity-[0.22] pointer-events-none section-dots" />

      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={transition({ duration: 0.8 })}
          className="mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-gray-200/70 shadow-sm backdrop-blur-sm mb-6">
            <Sparkles className="text-amber-500 w-4 h-4" />
            <span className="text-sm font-medium text-gray-600">
              {t.journey.badge}
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl mb-4 text-gray-900 tracking-tight">
            {t.journey.title}
          </h2>
          <p className="text-lg md:text-xl text-gray-500 leading-relaxed max-w-2xl">
            {t.journey.subtitle}
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-[23px] md:left-[27px] top-3 bottom-3 w-px bg-gradient-to-b from-gray-200 via-gray-300/80 to-gray-200 pointer-events-none" />

          <div className="space-y-14 md:space-y-16">
            {t.journey.items.map((item, index) => {
              const meta = journeyMeta[index];
              const Icon = meta.icon;

              return (
                <motion.div
                  key={index}
                  className="relative pl-16 md:pl-20"
                  initial={{ opacity: 0, x: -24 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={transition({
                    duration: 0.65,
                    delay: 0.15 + index * 0.1,
                  })}
                >
                  <div
                    className={`absolute left-0 top-1 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white border border-gray-200/80 shadow-sm flex items-center justify-center ring-4 ${meta.ring}`}
                  >
                    <div className={`p-2 rounded-lg ${meta.bg} ${meta.text}`}>
                      <Icon size={20} />
                    </div>
                  </div>

                  <div className="pt-0.5">
                    <span className="inline-block text-xs font-medium tracking-wider uppercase text-gray-400 mb-3">
                      {item.year}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-lg text-gray-500 leading-relaxed max-w-xl">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
