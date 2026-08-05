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
        className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-1.5 mb-8 shadow-sm"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
        <span className="text-xs font-semibold text-gray-600 tracking-[0.1em] uppercase">
          Official Student Activity Center · SVCE
        </span>
      </motion.div>

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

      {/* Ornamental divider */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center gap-3 mt-8 mb-6 w-full max-w-xs"
      >
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gray-300" />
        <span className="w-1.5 h-1.5 rotate-45 bg-gray-400" />
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gray-300" />
      </motion.div>

      {/* Description — about the councils/student experience, styled distinctly */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="max-w-3xl"
      >
        <p className="text-2xl sm:text-4xl text-gray-900 leading-tight font-medium">
          Empowering student life at SVCE with passion and purpose through{" "}
          <span className="italic font-serif bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
            creativity and collaboration
          </span>
          .
        </p>
        <p className="mt-5 text-base sm:text-lg text-gray-500 leading-relaxed max-w-xl mx-auto">
          One home for every council, every event, and every student leader —
          Technical, Cultural, and Sports, all in one place.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-10 flex flex-wrap items-center justify-center gap-4"
      >
        <Link
          href="/technical"
          className="bg-gray-950 text-white text-sm font-semibold px-7 py-3.5 rounded-full hover:bg-gray-800 transition-all hover:scale-[1.03] active:scale-[0.98] shadow-lg shadow-gray-900/20"
        >
          Explore Councils
        </Link>
        <Link
          href="/registration"
          className="bg-white border border-gray-200 text-gray-900 text-sm font-semibold px-7 py-3.5 rounded-full hover:bg-gray-50 transition-all hover:scale-[1.03] active:scale-[0.98]"
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