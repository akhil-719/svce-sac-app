import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import CouncilTabs from "./components/CouncilTabs";
import EventsList from "./components/EventsList";
import MemberDirectory from "./components/MemberDirectory";
import RegisterForm from "./components/RegisterForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white pb-20">
      <Navbar />
      <HeroSection />
      <CouncilTabs />
      <EventsList />
      <MemberDirectory />
      <RegisterForm />
    </main>
  );
}