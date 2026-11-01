import immcOAwardCertificate from "@/assets/immc-o-award-certificate.png";
import immcMAwardCertificate from "@/assets/immc-m-award-certificate.png";
import himcmHonorableMentionCertificate from "@/assets/himcm-honorable-mention-certificate.png";
import amc12Certificate from "@/assets/amc12-certificate.png";
import dukeParticipationCertificate from "@/assets/duke-participation-certificate.png";
import dukeBestVisualDesign from "@/assets/duke-best-visual-design.png";
import dukeBestVisualDesignSchools from "@/assets/duke-best-visual-design-schools.png";
import dukeFourierPoster from "@/assets/duke-fourier-poster.png";
import apCalculusStarCertificate from "@/assets/ap-calculus-star-certificate.png";
import aiMeetsHeritageSugarSilkAward from "@/assets/ai-meets-heritage-sugar-silk-award.jpg";
import wechatMiniprogramCarbonFootprintAward from "@/assets/wechat-miniprogram-carbon-footprint-award.png";
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
