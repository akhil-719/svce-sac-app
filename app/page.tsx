import Hero from "./components/Hero";
import QuickNav from "./components/QuickNav";
import SACIntro from "./components/SACIntro";
import CouncilShowcase from "./components/CouncilShowcase";
import DragGallery from "./components/DragGallery";
import WhySAC from "./components/WhySAC";
import Timeline from "./components/Timeline";
import Testimonials from "./components/Testimonials";
import AnimatedBackground from "./components/AnimatedBackground";
import ParticleField from "./components/ParticleField";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center pb-20 pt-32 overflow-hidden">
      <AnimatedBackground />
      <ParticleField />
      <Hero />
      <QuickNav />
      <SACIntro />
      <CouncilShowcase />
      <DragGallery />
      <WhySAC />
      <Timeline />
      <Testimonials />
    </main>
  );
}