import Hero from "./components/Hero";
import HeroCarousel from "./components/HeroCarousel";
import SACIntro from "./components/SACIntro";
import CouncilShowcase from "./components/CouncilShowcase";
import WhySAC from "./components/WhySAC";
import AboutCards from "./components/AboutCards";
import AnimatedBackground from "./components/AnimatedBackground";
import ParticleField from "./components/ParticleField";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center pb-20 pt-32 overflow-hidden">
      <AnimatedBackground />
      <ParticleField />
      <Hero />
      <HeroCarousel />
      <SACIntro />
      <CouncilShowcase />
      <WhySAC />
      <AboutCards />
    </main>
  );
}