import { motion } from "motion/react";
import { Mail, MapPin, Briefcase, Music } from "lucide-react";
import profileImage from "@/assets/profile.png";
import { useInViewOnScrollDown } from "@/app/components/ui/use-in-view-scroll-down";
import { useLanguage } from "@/i18n/LanguageContext";

export function About() {
  const { t } = useLanguage();
  const { ref, isVisible, transition } = useInViewOnScrollDown({
    margin: "-100px",
  });

  return (
    <section id="about" className="min-h-screen py-32 px-6 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={transition({ duration: 0.8 })}
        >
          <h2 className="text-5xl md:text-7xl mb-16">{t.about.title}</h2>

          <div className="grid md:grid-cols-5 gap-12">
            <motion.div
              className="md:col-span-3 md:pl-8"
              initial={{ opacity: 0, x: -50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={transition({ duration: 0.8, delay: 0.2 })}
            >
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                {t.about.p1}
              </p>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                {t.about.p2}
              </p>
              <p className="text-xl text-gray-600 leading-relaxed">
                {t.about.p3}
              </p>
            </motion.div>

            <motion.div
              className="md:col-span-2 flex flex-col gap-6 md:-mt-4"
              initial={{ opacity: 0, x: 50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={transition({ duration: 0.8, delay: 0.4 })}
            >
              <motion.div
                className="flex justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={transition({ duration: 0.8, delay: 0.5 })}
              >
                <div className="relative">
                  <motion.img
                    src={profileImage}
                    alt={t.about.profileAlt}
                    className="w-48 h-48 rounded-full object-cover border-4 border-gray-200 shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full border-4 border-gray-900"
                    initial={{ scale: 1, opacity: 0 }}
                    whileHover={{ scale: 1.1, opacity: 0.2 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>

              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-center md:text-left">
                  {t.hero.name}
                </h3>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-gray-100 rounded-lg">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="text-lg mb-1">{t.about.email}</h3>
                  <p className="text-gray-600">LingJunYu20081201@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-gray-100 rounded-lg">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-lg mb-1">{t.about.age}</h3>
                  <p className="text-gray-600">{t.about.ageValue}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-gray-100 rounded-lg">
                  <Briefcase size={24} />
                </div>
                <div>
                  <h3 className="text-lg mb-1">{t.about.status}</h3>
                  <p className="text-gray-600">{t.about.statusValue}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-gray-100 rounded-lg">
                  <Music size={24} />
                </div>
                <div>
                  <h3 className="text-lg mb-1">{t.about.music}</h3>
                  <p className="text-gray-600">{t.about.musicValue}</p>
                </div>
              </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
