"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const councils = [
  {
    name: "Technical",
    href: "/technical",
    bg: "bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-900",
    accent: "text-cyan-300",
    lines: [
      "Where curiosity turns into code, and code turns into something real.",
      "Hackathons that run through the night. Workshops that actually teach.",
      "Guest talks from engineers who've shipped products you've used.",
      "This is where SVCE's next builders get their start.",
    ],
  },
  {
    name: "Cultural",
    href: "/cultural",
    bg: "bg-gradient-to-br from-rose-950 via-pink-900 to-orange-900",
    accent: "text-orange-300",
    lines: [
      "Where the stage belongs to whoever's brave enough to take it.",
      "Fests that take over campus for days at a time.",
      "Dance, music, and drama teams that rehearse like it's a career.",
      "This is where SVCE's creative spirit gets loud.",
    ],
  },
  {
    name: "Sports",
    href: "/sports",
    bg: "bg-gradient-to-br from-emerald-950 via-green-900 to-lime-900",
    accent: "text-lime-300",
    lines: [
      "Where discipline meets rivalry, every single season.",
      "Tournaments that pack the ground and the stands alike.",
      "Fitness culture that pushes you past your own expectations.",
      "This is where SVCE's competitive edge gets sharpened.",
    ],
  },
];

export default function CouncilSlider() {
  return (
    <div className="mt-28 w-full">
      {councils.map((council, index) => (
        <motion.div
          key={council.name}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`sticky top-16 ${council.bg} min-h-[420px] flex items-center overflow-hidden`}
          style={{ zIndex: index + 1 }}
        >
          <div className="max-w-3xl mx-auto px-6 py-20 text-center">
            <span className={`text-xs font-semibold tracking-[0.25em] uppercase ${council.accent} mb-4 block`}>
              Council {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-8">
              {council.name}
            </h3>
            <div className="flex flex-col gap-3 mb-10">
              {council.lines.map((line, i) => (
                <p key={i} className="text-white/70 text-sm sm:text-base leading-relaxed">
                  {line}
                </p>
              ))}
            </div>
            <Link
              href={council.href}
              className="inline-flex items-center gap-2 bg-white text-gray-900 text-sm font-semibold px-7 py-3.5 rounded-full hover:scale-[1.03] transition-transform"
            >
              Explore {council.name}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  );
}