"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col items-center text-center px-6"
    >
      <h1 className="text-5xl md:text-6xl font-bold text-gray-900 tracking-tight">
        Powering Student Affairs
        <br />
        at SVCE
      </h1>
      <p className="mt-6 text-lg text-gray-600 max-w-xl">
        One platform for every council, every event, every student leader.
      </p>
    </motion.div>
  );
}