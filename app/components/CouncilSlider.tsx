"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const councils = [
  {
    name: "Technical",
    href: "/technical",
    bg: "bg-gradient-to-br from-[#040810] via-[#0a1a2e] to-[#0d2438]",
    accentText: "text-cyan-300",
    accentGrad: "from-blue-400 via-cyan-300 to-teal-200",
    tagline: "Build. Break. Ship.",
    description:
      "Where curiosity turns into code, and code turns into something real. Hackathons that run through the night, workshops that actually teach, and guest talks from engineers who've shipped products you've used.",
    icon: (
      <svg width="420" height="420" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.4">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    name: "Cultural",
    href: "/cultural",
    bg: "bg-gradient-to-br from-[#14040c] via-[#2e0a1a] to-[#38150d]",
    accentText: "text-orange-300",
    accentGrad: "from-pink-400 via-rose-300 to-orange-200",
    tagline: "Create. Perform. Celebrate.",
    description:
      "Where the stage belongs to whoever's brave enough to take it. Fests that take over campus for days, dance and music teams that rehearse like it's a career, and drama that brings SVCE's creative spirit to life.",
    icon: (
      <svg width="420" height="420" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.4">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
  },
  {
    name: "Sports",
    href: "/sports",
    bg: "bg-gradient-to-br from-[#020f08] via-[#052e17] to-[#0d3820]",
    accentText: "text-lime-300",
    accentGrad: "from-emerald-400 via-green-300 to-lime-200",
    tagline: "Train. Compete. Win.",
    description:
      "Where discipline meets rivalry, every single season. Tournaments that pack the ground and the stands alike, fitness culture that pushes you past your limits, and a team that trains together and shows up for each other.",
    icon: (
      <svg width="420" height="420" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.4">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z" />
        <path d="M2 12h20" />
      </svg>
    ),
  },
];

export default function CouncilSlider() {
  return (
    <div className="relative w-full">
      {councils.map((council, index) => (
        <div
          key={council.name}
          className={`sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden ${council.bg}`}
          style={{ zIndex: index + 1 }}
        >
          {/* Giant centered watermark icon */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.05] text-white pointer-events-none">
            {council.icon}
          </div>

          {/* Ambient glow */}
          <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br ${council.accentGrad} opacity-[0.12] blur-[120px] rounded-full`} />

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.6 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 max-w-2xl mx-auto px-8 text-center"
          >
            <span className={`inline-block text-xs font-bold tracking-[0.3em] uppercase ${council.accentText} mb-5`}>
              {council.tagline}
            </span>

            <h3 className={`text-6xl sm:text-8xl font-black tracking-tighter mb-8 bg-gradient-to-r ${council.accentGrad} bg-clip-text text-transparent`}>
              {council.name}
            </h3>

            <p className="text-white/55 text-base sm:text-lg leading-relaxed mb-10 max-w-lg mx-auto">
              {council.description}
            </p>

            <Link
              href={council.href}
              className="inline-flex items-center gap-2 bg-white text-gray-900 text-sm font-semibold px-8 py-4 rounded-full hover:scale-[1.05] transition-transform shadow-xl"
            >
              Explore {council.name}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>

          {/* Progress dots */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {councils.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-8 bg-white" : "w-1.5 bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}