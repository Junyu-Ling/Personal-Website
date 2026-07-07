import { Hero } from "@/app/components/Hero";
import { About } from "@/app/components/About";
import { CodingJourney } from "@/app/components/CodingJourney";
import { StudyMaterials } from "@/app/components/StudyMaterials";
import { Awards } from "@/app/components/Awards";
import { Projects } from "@/app/components/Projects";
import { Footer } from "@/app/components/Footer";
import { SiteNav } from "@/app/components/SiteNav";
import { LanguageProvider } from "@/i18n/LanguageContext";

export default function App() {
  return (
    <LanguageProvider>
      <SiteNav />
      <div className="grain-overlay" aria-hidden="true" />
      <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
        <Hero />
        <About />
        <CodingJourney />
        <StudyMaterials />
        <Awards />
        <Projects />
        <Footer />
      </div>
    </LanguageProvider>
  );
}
