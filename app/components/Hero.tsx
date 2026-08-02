"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const headlineWords = ["Powering", "Student", "Life", "at", "SVCE"];

export default function Hero() {
  return (
    <div className="relative flex flex-col items-center text-center px-6 pt-12 pb-20">
      {/* Eyebrow badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-full px-4 py-1.5 mb-8"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
        <span className="text-xs font-medium text-gray-600 tracking-wide">
          Student Activity Center · SVCE
        </span>
      </motion.div>

      {/* Big staggered headline */}
      <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-gray-900 leading-[1.05] max-w-4xl">
        {headlineWords.map((word, i) => (
          <motion.span
            key={word}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.15 + i * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`inline-block mr-3 ${
              word === "Life"
                ? "bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent"
                : ""
            }`}
          >
            {word}
          </motion.span>
        ))}
      </h1>

      {/* Subheadline */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="mt-6 text-base sm:text-lg text-gray-500 max-w-xl leading-relaxed"
      >
        One home for every council, every council event, and every student
        leader — Technical, Cultural, and Sports, all in one place.
      </motion.p>

      {/* CTA buttons */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.85 }}
        className="mt-10 flex flex-wrap items-center justify-center gap-4"
      >
        <Link
          href="/technical"
          className="bg-black text-white text-sm font-medium px-7 py-3.5 rounded-full hover:bg-gray-800 transition-all hover:scale-[1.03] active:scale-[0.98]"
        >
          Explore Councils
        </Link>
        <Link
          href="/registration"
          className="bg-gray-100 text-gray-900 text-sm font-medium px-7 py-3.5 rounded-full hover:bg-gray-200 transition-all hover:scale-[1.03] active:scale-[0.98]"
        >
          Register for an Event
        </Link>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="mt-16 flex flex-col items-center gap-2"
      >
        <span className="text-[11px] uppercase tracking-[0.2em] text-gray-400">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-gray-300 flex justify-center pt-1.5"
        >
          <span className="w-1 h-1.5 rounded-full bg-gray-400" />
        </motion.div>
      </motion.div>
    </div>
  );
}