import { portfolioConfig } from './data/portfolio-config';
import HeroSection from './components/hero-section';
import AboutSection from './components/about-section';
import ExperienceSection from './components/experience-section';
import ProjectsSection from './components/projects-section';
import SkillsSection from './components/skills-section';
import EducationSection from './components/education-section';
import ContactSection from './components/contact-section';
import StickyHeader from './components/sticky-header';
import Footer from './components/footer';

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <StickyHeader />
      <HeroSection data={portfolioConfig?.hero} />
      <AboutSection data={portfolioConfig?.about} />
      <ExperienceSection data={portfolioConfig?.experience ?? []} />
      <ProjectsSection data={portfolioConfig?.projects ?? []} />
      <SkillsSection data={portfolioConfig?.skills ?? []} />
      <EducationSection
        education={portfolioConfig?.education ?? []}
        certifications={portfolioConfig?.certifications ?? []}
      />
      <ContactSection data={portfolioConfig?.contact} />
      <Footer easterEgg={portfolioConfig?.easterEgg} />
    </main>
  );
}
