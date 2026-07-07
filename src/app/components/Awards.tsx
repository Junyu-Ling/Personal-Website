import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
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
  AppWindow,
  GraduationCap,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";
import immcOAwardCertificate from "@/assets/immc-o-award-certificate.png";
import immcMAwardCertificate from "@/assets/immc-m-award-certificate.png";
import himcmHonorableMentionCertificate from "@/assets/himcm-honorable-mention-certificate.png";
import amc12Certificate from "@/assets/amc12-certificate.png";
import dukeParticipationCertificate from "@/assets/duke-participation-certificate.png";
import dukeBestVisualDesign from "@/assets/duke-best-visual-design.png";
import dukeBestVisualDesignSchools from "@/assets/duke-best-visual-design-schools.png";
import dukeFourierPoster from "@/assets/duke-fourier-poster.png";
import aiCampWishrelayAward from "@/assets/ai-camp-wishrelay-award.png";
import apCalculusStarCertificate from "@/assets/ap-calculus-star-certificate.png";
import { useLanguage } from "@/i18n/LanguageContext";
import type { AwardTranslation } from "@/i18n/translations";

type AwardMeta = {
  icon: LucideIcon;
  year: string;
  featured?: boolean;
  certificate?: string;
  certificates?: { src: string }[];
};

const schoolMeta: AwardMeta[] = [
  {
    icon: AppWindow,
    year: "2025",
    certificate: aiCampWishrelayAward,
  },
  {
    icon: GraduationCap,
    year: "2026",
    certificate: apCalculusStarCertificate,
  },
];

const offCampusMeta: AwardMeta[] = [
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

type ResolvedAward = AwardTranslation &
  AwardMeta & {
    certificates?: { src: string; alt: string }[];
    certificate?: string;
    certificateAlt?: string;
  };

function resolveAwards(
  items: AwardTranslation[],
  metaList: AwardMeta[],
  dukeCerts?: string[]
): ResolvedAward[] {
  return items.map((item, index) => {
    const meta = metaList[index];
    const copy = { ...item, ...meta };
    if (meta.certificates && dukeCerts) {
      return {
        ...copy,
        certificates: meta.certificates.map((cert, i) => ({
          src: cert.src,
          alt: dukeCerts[i],
        })),
      };
    }
    return copy;
  });
}

type AwardCardProps = {
  award: ResolvedAward;
  index: number;
  sectionKey: string;
  isVisible: boolean;
  transition: (base: object) => object;
  viewImagesLabel: string;
  hideImagesLabel: string;
};

function AwardCard({
  award,
  index,
  sectionKey,
  isVisible,
  transition,
  viewImagesLabel,
  hideImagesLabel,
}: AwardCardProps) {
  const [expanded, setExpanded] = useState(false);
  const Icon = award.icon;

  const images =
    award.certificates ??
    (award.certificate
      ? [{ src: award.certificate, alt: award.certificateAlt ?? "Award certificate" }]
      : []);

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 32 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={transition({
        duration: 0.6,
        delay: index * 0.08,
      })}
    >
      <motion.div
        className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl border border-gray-200/70 shadow-sm hover:shadow-lg transition-shadow duration-300 relative overflow-hidden"
        whileHover={{ y: -4 }}
      >
        <div className="flex items-start gap-4 sm:gap-6 relative z-10 min-w-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={
              isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }
            }
            transition={transition({
              duration: 0.5,
              delay: index * 0.08 + 0.15,
            })}
          >
            <motion.div
              className="p-4 bg-gray-900 text-white rounded-xl"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <Icon size={28} />
            </motion.div>
          </motion.div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-3 gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <h3 className="text-xl md:text-2xl">{award.title}</h3>
                  {award.featured && (
                    <Star
                      size={20}
                      className="fill-yellow-400 text-yellow-400 shrink-0"
                    />
                  )}
                </div>
                <p className="text-gray-600 text-base md:text-lg mb-2">
                  {award.organization}
                </p>
                <p className="text-sm text-gray-500 italic">{award.award}</p>
              </div>
              <span className="shrink-0 px-3 py-1 rounded-full bg-gray-100 border border-gray-200/60 text-sm font-medium text-gray-500">
                {award.year}
              </span>
            </div>

            <p className="text-gray-500 leading-relaxed">{award.description}</p>

            {images.length > 0 && (
              <div className="mt-5">
                <button
                  type="button"
                  onClick={() => setExpanded((open) => !open)}
                  className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 px-4 py-2 rounded-full border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors"
                  aria-expanded={expanded}
                  aria-controls={`${sectionKey}-images-${index}`}
                >
                  {expanded ? hideImagesLabel : viewImagesLabel}
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {expanded && (
                    <motion.div
                      id={`${sectionKey}-images-${index}`}
                      className="mt-4 space-y-3 w-full max-w-full md:max-w-xl lg:max-w-2xl xl:max-w-3xl overflow-hidden"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      {images.map((image, imageIndex) => (
                        <div
                          key={imageIndex}
                          className="w-full rounded-xl overflow-hidden border border-gray-200/80 bg-gray-50 shadow-sm"
                        >
                          <img
                            src={image.src}
                            alt={image.alt}
                            className="block w-full h-auto max-w-full object-contain"
                          />
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

type AwardSectionProps = {
  title: string;
  awards: ResolvedAward[];
  sectionKey: string;
  isVisible: boolean;
  transition: (base: object) => object;
  viewImagesLabel: string;
  hideImagesLabel: string;
};

function AwardSection({
  title,
  awards,
  sectionKey,
  isVisible,
  transition,
  viewImagesLabel,
  hideImagesLabel,
}: AwardSectionProps) {
  return (
    <div className="mb-16 last:mb-0">
      <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-8 tracking-tight">
        {title}
      </h3>
      <div className="space-y-6">
        {awards.map((award, index) => (
          <AwardCard
            key={`${sectionKey}-${index}`}
            award={award}
            index={index}
            sectionKey={sectionKey}
            isVisible={isVisible}
            transition={transition}
            viewImagesLabel={viewImagesLabel}
            hideImagesLabel={hideImagesLabel}
          />
        ))}
      </div>
    </div>
  );
}

export function Awards() {
  const { t, locale } = useLanguage();
  const { ref, isVisible, transition } = useInViewOnScrollDown({
    margin: "-100px",
  });

  const schoolAwards = resolveAwards(t.awards.schoolItems, schoolMeta);
  const offCampusAwards = resolveAwards(
    t.awards.offCampusItems,
    offCampusMeta,
    t.awards.dukeCerts
  );

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
    <section id="awards" className="min-h-screen py-32 px-6 bg-white section-divide" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-5xl md:text-7xl mb-20 tracking-tight"
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

        <AwardSection
          title={t.awards.schoolSection}
          awards={schoolAwards}
          sectionKey="school"
          isVisible={isVisible}
          transition={transition}
          viewImagesLabel={t.awards.viewImages}
          hideImagesLabel={t.awards.hideImages}
        />

        <AwardSection
          title={t.awards.offCampusSection}
          awards={offCampusAwards}
          sectionKey="off-campus"
          isVisible={isVisible}
          transition={transition}
          viewImagesLabel={t.awards.viewImages}
          hideImagesLabel={t.awards.hideImages}
        />
      </div>
    </section>
  );
}
