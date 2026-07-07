import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useInViewOnScrollDown } from "@/app/components/ui/use-in-view-scroll-down";
import {
  Award,
  Trophy,
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
import aiMeetsHeritageSugarSilkAward from "@/assets/ai-meets-heritage-sugar-silk-award.png";
import wechatMiniprogramCarbonFootprintAward from "@/assets/wechat-miniprogram-carbon-footprint-award.png";
import aigcShortVideoThirdPrize from "@/assets/aigc-short-video-third-prize.png";
import { useLanguage } from "@/i18n/LanguageContext";
import { FeaturedStar } from "@/app/components/FeaturedStar";
import { ImageLightbox } from "@/app/components/ImageLightbox";
import { SectionHeader } from "@/app/components/SectionHeader";
import type { AwardTranslation } from "@/i18n/translations";

type AwardMeta = {
  icon: LucideIcon;
  year: string;
  featured?: boolean;
  certificate?: string;
  certificates?: { src: string }[];
  iconClass: string;
  yearClass: string;
};

const schoolMeta: AwardMeta[] = [
  {
    icon: AppWindow,
    year: "2025",
    certificate: aiCampWishrelayAward,
    iconClass: "bg-sky-50 text-sky-600",
    yearClass: "bg-gray-100 text-gray-600 border-gray-200/60",
  },
  {
    icon: GraduationCap,
    year: "2026",
    certificate: apCalculusStarCertificate,
    iconClass: "bg-emerald-50 text-emerald-600",
    yearClass: "bg-gray-100 text-gray-600 border-gray-200/60",
  },
];

const offCampusMeta: AwardMeta[] = [
  {
    icon: Globe,
    year: "2026",
    featured: true,
    certificate: immcOAwardCertificate,
    iconClass: "bg-violet-50 text-violet-600",
    yearClass: "bg-gray-100 text-gray-600 border-gray-200/60",
  },
  {
    icon: Zap,
    year: "2026",
    featured: true,
    iconClass: "bg-amber-50 text-amber-600",
    yearClass: "bg-gray-100 text-gray-600 border-gray-200/60",
  },
  {
    icon: Trophy,
    year: "2025",
    featured: true,
    certificate: wechatMiniprogramCarbonFootprintAward,
    iconClass: "bg-emerald-50 text-emerald-600",
    yearClass: "bg-gray-100 text-gray-600 border-gray-200/60",
  },
  {
    icon: Calculator,
    year: "2026",
    certificate: immcMAwardCertificate,
    iconClass: "bg-indigo-50 text-indigo-600",
    yearClass: "bg-gray-100 text-gray-600 border-gray-200/60",
  },
  {
    icon: Award,
    year: "2025",
    certificate: amc12Certificate,
    iconClass: "bg-blue-50 text-blue-600",
    yearClass: "bg-gray-100 text-gray-600 border-gray-200/60",
  },
  {
    icon: Palette,
    year: "2025",
    certificate: aiMeetsHeritageSugarSilkAward,
    iconClass: "bg-rose-50 text-rose-600",
    yearClass: "bg-gray-100 text-gray-600 border-gray-200/60",
  },
  {
    icon: Video,
    year: "2025",
    certificate: aigcShortVideoThirdPrize,
    iconClass: "bg-cyan-50 text-cyan-600",
    yearClass: "bg-gray-100 text-gray-600 border-gray-200/60",
  },
  {
    icon: Rocket,
    year: "2025",
    certificate: himcmHonorableMentionCertificate,
    iconClass: "bg-orange-50 text-orange-600",
    yearClass: "bg-gray-100 text-gray-600 border-gray-200/60",
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
    iconClass: "bg-purple-50 text-purple-600",
    yearClass: "bg-gray-100 text-gray-600 border-gray-200/60",
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
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
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
        className={`bg-white p-4 sm:p-6 md:p-8 rounded-2xl border border-gray-200/70 shadow-sm hover:shadow-lg transition-shadow duration-300 relative overflow-hidden ${
          award.featured ? "ring-1 ring-amber-200/70" : ""
        }`}
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
              className={`p-3 rounded-xl ${award.iconClass}`}
              whileHover={{ rotate: 360, scale: 1.05 }}
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
                  {award.featured && <FeaturedStar />}
                </div>
                <p className="text-gray-600 text-base md:text-lg mb-2">
                  {award.organization}
                </p>
                <p className="text-sm text-gray-500 italic">{award.award}</p>
              </div>
              <span
                className={`shrink-0 px-3 py-1 rounded-full border text-sm font-medium ${award.yearClass}`}
              >
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
                        <button
                          key={imageIndex}
                          type="button"
                          onClick={() => setLightboxIndex(imageIndex)}
                          className="w-full rounded-xl overflow-hidden border border-gray-200/80 bg-gray-50 shadow-sm hover:ring-2 hover:ring-violet-300/50 transition-all text-left"
                        >
                          <img
                            src={image.src}
                            alt={image.alt}
                            className="block w-full h-auto max-w-full object-contain"
                          />
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                <ImageLightbox
                  images={images}
                  index={lightboxIndex}
                  onClose={() => setLightboxIndex(null)}
                  onChange={setLightboxIndex}
                />
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
  variant,
}: AwardSectionProps & { variant: "school" | "off-campus" }) {
  return (
    <div
      className={`mb-16 last:mb-0 ${
        variant === "school" ? "award-section-school" : "award-section-offcampus"
      }`}
    >
      <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-8 tracking-tight">
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
  const { t } = useLanguage();
  const { ref, isVisible, transition } = useInViewOnScrollDown({
    margin: "-100px",
  });

  const schoolAwards = resolveAwards(t.awards.schoolItems, schoolMeta);
  const offCampusAwards = resolveAwards(
    t.awards.offCampusItems,
    offCampusMeta,
    t.awards.dukeCerts
  );

  return (
    <section id="awards" className="section-shell bg-background section-divide" ref={ref}>
      <div className="container-site">
        <SectionHeader
          badge={t.awards.badge}
          title={t.awards.title}
          subtitle={t.awards.subtitle}
          icon={Sparkles}
          isVisible={isVisible}
        />

        <AwardSection
          title={t.awards.schoolSection}
          awards={schoolAwards}
          sectionKey="school"
          isVisible={isVisible}
          transition={transition}
          viewImagesLabel={t.awards.viewImages}
          hideImagesLabel={t.awards.hideImages}
          variant="school"
        />

        <AwardSection
          title={t.awards.offCampusSection}
          awards={offCampusAwards}
          sectionKey="off-campus"
          isVisible={isVisible}
          transition={transition}
          viewImagesLabel={t.awards.viewImages}
          hideImagesLabel={t.awards.hideImages}
          variant="off-campus"
        />
      </div>
    </section>
  );
}
