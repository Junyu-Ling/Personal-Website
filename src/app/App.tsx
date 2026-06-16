import type { ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Hero } from "@/app/components/Hero";
import { About } from "@/app/components/About";
import { CodingJourney } from "@/app/components/CodingJourney";
import { AcademicAchievements } from "@/app/components/AcademicAchievements";
import { StudyMaterials } from "@/app/components/StudyMaterials";
import { Awards } from "@/app/components/Awards";
import { Projects } from "@/app/components/Projects";
import { Footer } from "@/app/components/Footer";
import { SiteNav } from "@/app/components/SiteNav";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { NavigationProvider, useNavigation, type PageId } from "@/app/navigation";

function PageContent() {
  const { activePage } = useNavigation();

  const pages: Record<PageId, ReactNode> = {
    home: <Hero />,
    about: <About />,
    journey: <CodingJourney />,
    achievements: <AcademicAchievements />,
    "study-materials": <StudyMaterials />,
    awards: <Awards />,
    projects: <Projects />,
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activePage}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
      >
        {pages[activePage]}
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <NavigationProvider>
        <SiteNav />
        <div className="min-h-screen bg-white text-gray-900 site-nav-offset">
          <PageContent />
          <Footer />
        </div>
      </NavigationProvider>
    </LanguageProvider>
  );
}
