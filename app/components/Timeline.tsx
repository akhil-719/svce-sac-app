"use client";

import { motion } from "framer-motion";

const milestones = [
  { year: "1985", title: "SVCE Founded", description: "Sri Venkateswara College of Engineering established." },
  { year: "2005", title: "SAC Formalized", description: "Student Activity Center recognized as the official student body." },
  { year: "2015", title: "Councils Expanded", description: "Grew from 3 to 6 active councils across every major interest." },
  { year: "2026", title: "Digital Home Launched", description: "SVCE SAC goes online — one platform for every council." },
  { year: "2026",title: "council clubs expanded",description:"New Councils and clubs has be added in svce SAC"}
];

export default function Timeline() {
  return (
    <div className="mt-28 w-full max-w-3xl px-6">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400">
          Our Journey
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mt-3">
          Four Decades of Legacy
        </h2>
      </motion.div>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[7px] sm:left-1/2 top-0 bottom-0 w-px bg-gray-200 sm:-translate-x-1/2" />

        <div className="flex flex-col gap-10">
          {milestones.map((milestone, index) => {
            const isLeft = index % 2 === 0;
            return (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className={`relative flex sm:items-center gap-5 sm:gap-0 ${
                  isLeft ? "sm:flex-row" : "sm:flex-row-reverse"
                }`}
              >
                {/* Dot on the line */}
                <div className="absolute left-0 sm:left-1/2 top-1 sm:top-1/2 w-4 h-4 -translate-x-1/2 sm:-translate-y-1/2 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 border-4 border-white shadow-md z-10" />

                <div className={`pl-8 sm:pl-0 sm:w-1/2 ${isLeft ? "sm:pr-10 sm:text-right" : "sm:pl-10"}`}>
                  <span className="inline-block text-xs font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full mb-2">
                    {milestone.year}
                  </span>
                  <h3 className="font-bold text-gray-900 mb-1">{milestone.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{milestone.description}</p>
                </div>

                <div className="hidden sm:block sm:w-1/2" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}