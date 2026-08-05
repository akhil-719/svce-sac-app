import Hero from "./components/Hero";
import CouncilSlider from "./components/CouncilSlider";
import DragGallery from "./components/DragGallery";
import CouncilShowcase from "./components/CouncilShowcase";
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
      <CouncilSlider />
      <DragGallery />
      <CouncilShowcase />
      <Timeline />
      <Testimonials />
    </main>
  );
}