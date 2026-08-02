"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative flex flex-col items-center text-center px-6 pt-12 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-full px-4 py-1.5 mb-10"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
        <span className="text-xs font-medium text-gray-600 tracking-wide">
          Student Activity Center · SVCE
        </span>
      </motion.div>

      {/* Two-tier oversized brand lockup */}
      <div className="flex flex-col items-center leading-none">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter text-gray-900"
        >
          SVCE
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter -mt-3 sm:-mt-6 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent"
        >
          SAC
        </motion.h1>
      </div>

      {/* Sharper, specific subheadline */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.55 }}
        className="mt-8 text-base sm:text-xl text-gray-600 max-w-2xl leading-relaxed font-medium"
      >
        6 councils. 100+ events a year. One place to lead, compete, perform,
        and build the college experience beyond the classroom.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
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
          className="bg-white border border-gray-200 text-gray-900 text-sm font-medium px-7 py-3.5 rounded-full hover:bg-gray-50 transition-all hover:scale-[1.03] active:scale-[0.98]"
        >
          Register for an Event
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.1 }}
        className="mt-16 flex flex-col items-center gap-2"
      >
        <span className="text-[11px] uppercase tracking-[0.2em] text-gray-400">Scroll</span>
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