"use client";

import { motion } from "framer-motion";

const features = [
  {
    title: "Lead Real Teams",
    description: "Run events, manage budgets, and lead student teams of 10-50 people.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "Build Your Resume",
    description: "Leadership roles and event ownership that stand out to recruiters.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <rect x="8" y="2" width="8" height="4" rx="1" />
      </svg>
    ),
  },
  {
    title: "Meet Your People",
    description: "Find your crowd across six councils spanning every interest on campus.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="8" r="5" />
        <path d="M20 21a8 8 0 1 0-16 0" />
      </svg>
    ),
  },
  {
    title: "Compete & Showcase",
    description: "Hackathons, fests, and tournaments to test what you've built and learned.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4z" />
        <path d="M5 4H3v2a4 4 0 0 0 4 4M19 4h2v2a4 4 0 0 1-4 4" />
      </svg>
    ),
  },
];

export default function WhySAC() {
  return (
    <div className="mt-28 w-full max-w-5xl px-6">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400">
          Why Join
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mt-3">
          More Than a Club List
        </h2>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6 }}
            className="bg-white/70 backdrop-blur-md border border-gray-100 rounded-3xl p-6 hover:shadow-xl hover:border-gray-200 transition-shadow"
          >
            <div className="w-11 h-11 rounded-2xl bg-gray-900 text-white flex items-center justify-center mb-5">
              {feature.icon}
            </div>
            <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-2">
              {feature.title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}