import immcOAwardCertificate from "@/assets/immc-o-award-certificate.jpg";
import immcMAwardCertificate from "@/assets/immc-m-award-certificate.jpg";
import himcmHonorableMentionCertificate from "@/assets/himcm-honorable-mention-certificate.jpg";
import amc12Certificate from "@/assets/amc12-certificate.jpg";
import dukeParticipationCertificate from "@/assets/duke-participation-certificate.jpg";
import dukeBestVisualDesign from "@/assets/duke-best-visual-design.jpg";
import dukeBestVisualDesignSchools from "@/assets/duke-best-visual-design-schools.jpg";
import dukeFourierPoster from "@/assets/duke-fourier-poster.jpg";
import apCalculusStarCertificate from "@/assets/ap-calculus-star-certificate.jpg";
import aiMeetsHeritageSugarSilkAward from "@/assets/ai-meets-heritage-sugar-silk-award.jpg";
import wechatMiniprogramCarbonFootprintAward from "@/assets/wechat-miniprogram-carbon-footprint-award.jpg";
import aigcMultimediaThirdPrize from "@/assets/aigc-multimedia-third-prize.jpg";
import physicsBowlCertificate from "@/assets/physicsbowl-2026-certificate.jpg";

export type AwardMedia = {
  year: string;
  featured?: boolean;
  certificates: string[];
};

export const schoolAwardMedia: AwardMedia[] = [
  {
    year: "2026",
    featured: true,
    certificates: [apCalculusStarCertificate],
  },
  {
    year: "2025",
    certificates: [],
  },
];

export const offCampusAwardMedia: AwardMedia[] = [
  {
    year: "2026",
    featured: true,
    certificates: [immcOAwardCertificate],
  },
  {
    year: "2026",
    featured: true,
    certificates: [physicsBowlCertificate],
  },
  {
    year: "2025",
    featured: true,
    certificates: [wechatMiniprogramCarbonFootprintAward],
  },
  {
    year: "2026",
    certificates: [immcMAwardCertificate],
  },
  {
    year: "2025",
    certificates: [amc12Certificate],
  },
  {
    year: "2025",
    certificates: [aiMeetsHeritageSugarSilkAward],
  },
  {
    year: "2025",
    certificates: [aigcMultimediaThirdPrize],
  },
  {
    year: "2025",
    certificates: [himcmHonorableMentionCertificate],
  },
  {
    year: "2025",
    certificates: [
      dukeParticipationCertificate,
      dukeBestVisualDesign,
      dukeBestVisualDesignSchools,
      dukeFourierPoster,
    ],
  },
];
