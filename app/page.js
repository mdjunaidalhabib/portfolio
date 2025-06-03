import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import EmailSection from "./components/EmailSection";
import Footer from "./components/Footer";
import AchievementsSection from "./components/AchievementsSection";
import ScrollBackground from "./components/ScrollBackground";
import ScrollEffect from "./components/ScrollAnimation";

export default function Home() {
  return (
    <ScrollBackground>
      <main className="flex min-h-screen flex-col " id="home">
        <ScrollEffect />
        <Navbar />
        <div className="container mt-24 mx-auto px-12 py-4">
          <HeroSection />
          <AchievementsSection />
          <AboutSection />
          <ProjectsSection />
          <EmailSection />
        </div>
        <Footer />
      </main>
    </ScrollBackground>
  );
}
