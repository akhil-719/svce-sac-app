"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const councils = [
  {
    name: "Technical",
    color: "text-blue-600",
    gradient: "from-blue-500 to-cyan-400",
    lines: [
      "Where curiosity turns into code, and code turns into something real.",
      "Hackathons that run through the night. Workshops that actually teach.",
      "Guest talks from engineers who've shipped products you've used.",
      "A team that treats every bug as a puzzle worth solving together.",
      "This is where SVCE's next builders get their start.",
    ],
  },
  {
    name: "Cultural",
    color: "text-pink-600",
    gradient: "from-pink-500 to-orange-400",
    lines: [
      "Where the stage belongs to whoever's brave enough to take it.",
      "Fests that take over campus for days at a time.",
      "Dance, music, and drama teams that rehearse like it's a career.",
      "A community that turns performance into genuine craft.",
      "This is where SVCE's creative spirit gets loud.",
    ],
  },
  {
    name: "Sports",
    color: "text-emerald-600",
    gradient: "from-emerald-500 to-lime-400",
    lines: [
      "Where discipline meets rivalry, every single season.",
      "Tournaments that pack the ground and the stands alike.",
      "Fitness culture that pushes you past your own expectations.",
      "A team that trains together and shows up for each other.",
      "This is where SVCE's competitive edge gets sharpened.",
    ],
  },
];

export default function CouncilSlider() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % councils.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  function goTo(i: number) {
    setDirection(i > index ? 1 : -1);
    setIndex(i);
  }

  const current = councils[index];

  return (
    <div className="mt-28 w-full max-w-3xl px-6">
      <div className="flex items-center justify-center gap-2 mb-10">
        {councils.map((c, i) => (
          <button
            key={c.name}
            onClick={() => goTo(i)}
            className={`text-xs font-semibold uppercase tracking-wide px-4 py-2 rounded-full border transition-all ${
              i === index ? `${c.color} border-current bg-white shadow-sm` : "text-gray-400 border-transparent hover:text-gray-600"
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="relative min-h-[220px] overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current.name}
            custom={direction}
            initial={{ opacity: 0, x: direction * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -60 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <h3 className={`text-2xl sm:text-3xl font-black tracking-tight mb-6 bg-gradient-to-r ${current.gradient} bg-clip-text text-transparent`}>
              {current.name} Council
            </h3>
            <div className="flex flex-col gap-2">
              {current.lines.map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
                  className="text-sm sm:text-base text-gray-600 leading-relaxed"
                >
                  {line}
                </motion.p>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}