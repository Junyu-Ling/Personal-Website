import { Hero } from "@/app/components/Hero";
import { About } from "@/app/components/About";
import { CodingJourney } from "@/app/components/CodingJourney";
import { AcademicAchievements } from "@/app/components/AcademicAchievements";
import { StudyMaterials } from "@/app/components/StudyMaterials";
import { Awards } from "@/app/components/Awards";
import { Projects } from "@/app/components/Projects";
import { Footer } from "@/app/components/Footer";
import { LanguageToggle } from "@/app/components/LanguageToggle";
import { LanguageProvider } from "@/i18n/LanguageContext";

export default function App() {
  return (
    <LanguageProvider>
      <LanguageToggle />
      <div className="min-h-screen bg-white text-gray-900">
        <Hero />
        <About />
        <CodingJourney />
        <AcademicAchievements />
        <StudyMaterials />
        <Awards />
        <Projects />
        <Footer />
      </div>
    </LanguageProvider>
  );
}
