import HeroCarousel from "./components/HeroCarousel";
import AboutCards from "./components/AboutCards";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-white pb-20 pt-32 overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-gradient-to-tr from-purple-500/20 via-pink-500/10 to-transparent blur-3xl rounded-full -z-10" />
      <div className="absolute top-[20%] right-[-15%] w-[600px] h-[600px] bg-gradient-to-tr from-blue-400/20 via-cyan-300/10 to-transparent blur-3xl rounded-full -z-10" />
      <div className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] bg-gradient-to-tr from-orange-400/10 via-pink-300/10 to-transparent blur-3xl rounded-full -z-10" />

      <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 text-center px-6 mb-10">
        Welcome to SVCE SAC
      </h1>

      <HeroCarousel />
      <AboutCards />
    </main>
  );
}