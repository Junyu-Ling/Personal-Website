import { motion } from "motion/react";
import { useInViewOnScrollDown } from "@/app/components/ui/use-in-view-scroll-down";
import {
  Award,
  Trophy,
  Star,
  Presentation,
  Video,
  Palette,
  Globe,
  Zap,
  Calculator,
  Sparkles,
  Rocket,
} from "lucide-react";
import immcOAwardCertificate from "@/assets/immc-o-award-certificate.png";
import immcMAwardCertificate from "@/assets/immc-m-award-certificate.png";
import himcmHonorableMentionCertificate from "@/assets/himcm-honorable-mention-certificate.png";
import amc12Certificate from "@/assets/amc12-certificate.png";
import dukeParticipationCertificate from "@/assets/duke-participation-certificate.png";
import dukeBestVisualDesign from "@/assets/duke-best-visual-design.png";
import dukeBestVisualDesignSchools from "@/assets/duke-best-visual-design-schools.png";
import dukeFourierPoster from "@/assets/duke-fourier-poster.png";
import { useLanguage } from "@/i18n/LanguageContext";

const awardMeta = [
  {
    icon: Globe,
    year: "2026",
    featured: true,
    certificate: immcOAwardCertificate,
  },
  { icon: Zap, year: "2026", featured: true },
  { icon: Trophy, year: "2025", featured: true },
  {
    icon: Calculator,
    year: "2026",
    certificate: immcMAwardCertificate,
  },
  {
    icon: Award,
    year: "2025",
    certificate: amc12Certificate,
  },
  { icon: Palette, year: "2025" },
  { icon: Video, year: "2025" },
  {
    icon: Rocket,
    year: "2025",
    certificate: himcmHonorableMentionCertificate,
  },
  {
    icon: Presentation,
    year: "2025",
    certificates: [
      { src: dukeParticipationCertificate },
      { src: dukeBestVisualDesign },
      { src: dukeBestVisualDesignSchools },
      { src: dukeFourierPoster },
    ],
  },
];

export function Awards() {
  const { t, locale } = useLanguage();
  const { ref, isVisible, transition } = useInViewOnScrollDown({
    margin: "-100px",
  });

  const awards = t.awards.items.map((item, index) => {
    const meta = awardMeta[index];
    const copy = { ...item, ...meta };
    if (meta.certificates) {
      return {
        ...copy,
        certificates: meta.certificates.map((cert, i) => ({
          src: cert.src,
          alt: t.awards.dukeCerts[i],
        })),
      };
    }
    if (item.certificateAlt) {
      return { ...copy, certificateAlt: item.certificateAlt };
    }
    return copy;
  });

  const zhenfundLead =
    locale === "zh" ? (
      <>
        <strong className="text-white">AI Desmos</strong>
        {t.awards.zhenfundBody}
      </>
    ) : (
      <>
        <strong className="text-white">AI Desmos</strong> {t.awards.zhenfundBody}
      </>
    );

  return (
    <section id="awards" className="min-h-screen py-32 px-6 bg-gray-50" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-5xl md:text-7xl mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={transition({ duration: 0.8 })}
        >
          {t.awards.title}
        </motion.h2>

        <motion.div
          className="mb-12 p-6 md:p-8 bg-gray-900 text-white rounded-2xl border border-gray-800"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={transition({ duration: 0.8, delay: 0.1 })}
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/10 rounded-xl shrink-0">
              <Sparkles size={28} />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl mb-2">
                {t.awards.zhenfundTitle}
              </h3>
              <p className="text-gray-300 leading-relaxed">{zhenfundLead}</p>
              <p className="text-sm text-gray-400 mt-3 italic">
                {t.awards.zhenfundStatus}
              </p>
            </div>
          </div>
        </motion.div>

        <div className="space-y-8">
          {awards.map((award, index) => (
            <motion.div
              key={award.title}
              className="relative"
              initial={{ opacity: 0, x: -100, scale: 0.8 }}
              animate={
                isVisible
                  ? { opacity: 1, x: 0, scale: 1 }
                  : { opacity: 0, x: -100, scale: 0.8 }
              }
              transition={transition({
                duration: 0.8,
                delay: index * 0.15,
                type: "spring",
                bounce: 0.3,
              })}
            >
              <motion.div
                className="bg-white p-8 rounded-2xl hover:shadow-xl transition-all duration-300 border border-gray-100 relative overflow-hidden"
                whileHover={{ scale: 1.02, y: -5 }}
                initial={{ rotateY: -15 }}
                animate={isVisible ? { rotateY: 0 } : { rotateY: -15 }}
                transition={transition({ duration: 0.6, delay: index * 0.15 + 0.2 })}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-50 to-transparent opacity-0"
                  animate={
                    isVisible
                      ? {
                          opacity: [0, 0.5, 0],
                          x: ["-100%", "100%"],
                        }
                      : {}
                  }
                  transition={transition({
                    duration: 1.5,
                    delay: index * 0.15 + 0.5,
                    ease: "easeInOut",
                  })}
                />

                <div className="flex items-start gap-6 relative z-10">
                  <motion.div
                    initial={{ rotate: -180, scale: 0 }}
                    animate={
                      isVisible
                        ? { rotate: 0, scale: 1 }
                        : { rotate: -180, scale: 0 }
                    }
                    transition={transition({
                      duration: 0.6,
                      delay: index * 0.15 + 0.3,
                      type: "spring",
                      bounce: 0.5,
                    })}
                  >
                    <motion.div
                      className="p-4 bg-gray-900 text-white rounded-xl cursor-pointer"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                      <award.icon size={28} />
                    </motion.div>
                  </motion.div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <motion.div
                          className="flex items-center gap-2 mb-2"
                          initial={{ opacity: 0, y: -20 }}
                          animate={
                            isVisible
                              ? { opacity: 1, y: 0 }
                              : { opacity: 0, y: -20 }
                          }
                          transition={transition({
                            duration: 0.5,
                            delay: index * 0.15 + 0.4,
                          })}
                        >
                          <h3 className="text-2xl">{award.title}</h3>
                          {award.featured && (
                            <motion.div
                              initial={{
                                opacity: 0,
                                scale: 0,
                                rotate: -180,
                              }}
                              animate={
                                isVisible
                                  ? {
                                      opacity: 1,
                                      scale: 1,
                                      rotate: 0,
                                    }
                                  : {
                                      opacity: 0,
                                      scale: 0,
                                      rotate: -180,
                                    }
                              }
                              transition={transition({
                                delay: index * 0.15 + 0.6,
                                type: "spring",
                                bounce: 0.6,
                              })}
                            >
                              <Star
                                size={20}
                                className="fill-yellow-400 text-yellow-400"
                              />
                            </motion.div>
                          )}
                        </motion.div>
                        <motion.p
                          className="text-gray-600 text-lg mb-2"
                          initial={{ opacity: 0, x: -20 }}
                          animate={
                            isVisible
                              ? { opacity: 1, x: 0 }
                              : { opacity: 0, x: -20 }
                          }
                          transition={transition({
                            duration: 0.5,
                            delay: index * 0.15 + 0.5,
                          })}
                        >
                          {award.organization}
                        </motion.p>
                        <motion.p
                          className="text-sm text-gray-500 italic"
                          initial={{ opacity: 0 }}
                          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                          transition={transition({
                            duration: 0.5,
                            delay: index * 0.15 + 0.6,
                          })}
                        >
                          {award.award}
                        </motion.p>
                      </div>
                      <motion.span
                        className="text-3xl text-gray-300"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={
                          isVisible
                            ? { opacity: 1, scale: 1 }
                            : { opacity: 0, scale: 0 }
                        }
                        transition={transition({
                          duration: 0.5,
                          delay: index * 0.15 + 0.4,
                          type: "spring",
                        })}
                      >
                        {award.year}
                      </motion.span>
                    </div>
                    <motion.p
                      className="text-gray-500"
                      initial={{ opacity: 0, y: 20 }}
                      animate={
                        isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                      }
                      transition={transition({
                        duration: 0.6,
                        delay: index * 0.15 + 0.7,
                      })}
                    >
                      {award.description}
                    </motion.p>
                    {(() => {
                      const images =
                        "certificates" in award && award.certificates
                          ? award.certificates
                          : "certificate" in award && award.certificate
                            ? [
                                {
                                  src: award.certificate,
                                  alt: award.certificateAlt ?? "Award certificate",
                                },
                              ]
                            : [];

                      if (images.length === 0) return null;

                      return (
                        <div className="mt-6 space-y-4">
                          {images.map((image, imageIndex) => (
                            <motion.div
                              key={image.alt}
                              className="rounded-xl overflow-hidden border border-gray-200 bg-gray-50"
                              initial={{ opacity: 0, y: 16 }}
                              animate={
                                isVisible
                                  ? { opacity: 1, y: 0 }
                                  : { opacity: 0, y: 16 }
                              }
                              transition={transition({
                                duration: 0.6,
                                delay: index * 0.15 + 0.85 + imageIndex * 0.08,
                              })}
                            >
                              <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-auto object-contain"
                              />
                            </motion.div>
                          ))}
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </motion.div>

              {index < awards.length - 1 && (
                <motion.div
                  className="absolute left-10 top-full h-8 w-0.5 bg-gradient-to-b from-gray-300 to-gray-200"
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={
                    isVisible ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }
                  }
                  transition={transition({
                    duration: 0.4,
                    delay: index * 0.15 + 0.8,
                  })}
                  style={{ transformOrigin: "top" }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
