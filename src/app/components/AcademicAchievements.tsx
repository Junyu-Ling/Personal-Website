import { motion } from "motion/react";
import { useInViewOnScrollDown } from "@/app/components/ui/use-in-view-scroll-down";
import { BookOpen, Calculator, Atom } from "lucide-react";
import apCsAScore from "@/assets/ap-cs-a-score.png";
import apPhysics1Score from "@/assets/ap-physics-1-score.png";
import apPrecalculusScore from "@/assets/ap-precalculus-score.png";
import { useLanguage } from "@/i18n/LanguageContext";

const apMeta = [
  {
    icon: <BookOpen size={28} />,
    color: "bg-blue-50 text-blue-600",
    scoreProof: apCsAScore,
  },
  {
    icon: <Atom size={28} />,
    color: "bg-purple-50 text-purple-600",
    scoreProof: apPhysics1Score,
  },
  {
    icon: <Calculator size={28} />,
    color: "bg-rose-50 text-rose-600",
    scoreProof: apPrecalculusScore,
  },
];

export function AcademicAchievements() {
  const { t } = useLanguage();
  const { ref, isVisible, transition } = useInViewOnScrollDown({
    margin: "-100px",
  });

  return (
    <section id="achievements" className="page-min-h py-32 px-6 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={transition({ duration: 0.8 })}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            {t.academics.title}
          </h2>
          <p className="text-xl text-gray-500">{t.academics.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {t.academics.items.map((item, index) => {
            const meta = apMeta[index];
            return (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-6 border border-gray-200/70 shadow-sm hover:shadow-lg transition-shadow duration-300 group flex flex-col h-full"
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={transition({ duration: 0.5, delay: index * 0.1 })}
                whileHover={{ y: -5 }}
              >
                <div className="flex justify-between items-start mb-6">
                  <div
                    className={`p-4 rounded-xl ${meta.color} group-hover:scale-110 transition-transform duration-300`}
                  >
                    {meta.icon}
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-4xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      5
                    </span>
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-wider mt-0.5">
                      {t.academics.score}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-1">{item.subject}</h3>
                <p className="text-sm text-gray-400 mb-3">{item.grade}</p>
                <p className="text-gray-500 leading-relaxed text-sm mb-5">
                  {item.description}
                </p>

                <div className="mt-auto rounded-xl overflow-hidden border border-gray-200/80 shadow-sm">
                  <img
                    src={meta.scoreProof}
                    alt={item.scoreProofAlt}
                    className="w-full h-auto block"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
