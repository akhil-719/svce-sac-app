"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const councils = [
  { name: "TLC", desc: "Technical Leadership Council — hackathons, coding events, tech talks." },
  { name: "CLC", desc: "Cultural Leadership Council — fests, dance, music, drama." },
  { name: "SPC", desc: "Sports Council — tournaments, fitness events, inter-college matches." },
  { name: "SMC", desc: "Social Media Council — content, design, campus digital presence." },
  { name: "ALC", desc: "Alumni Leadership Council — mentorship, alumni meets, networking." },
  { name: "NSS", desc: "National Service Scheme — community service, outreach programs." },
];

export default function CouncilTabs() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="mt-16 w-full max-w-2xl px-6">
      <div className="flex flex-wrap justify-center gap-2">
        {councils.map((council, index) => (
          <button
            key={council.name}
            onClick={() => setActiveIndex(index)}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              activeIndex === index
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {council.name}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="mt-6 bg-gray-50 rounded-2xl p-6 text-center"
        >
          <p className="text-gray-700">{councils[activeIndex].desc}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}