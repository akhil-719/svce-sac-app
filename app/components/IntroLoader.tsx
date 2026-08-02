"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const letters = "SVCE SAC".split("");

export default function IntroLoader({ children }: { children: React.ReactNode }) {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 2600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 z-[999] bg-gray-950 flex items-center justify-center"
            style={{ perspective: 800 }}
          >
            <div className="flex">
              {letters.map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, rotateX: -90, y: 30 }}
                  animate={{ opacity: 1, rotateX: 0, y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.3 + i * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`text-4xl sm:text-6xl font-bold tracking-tight ${
                    letter === " "
                      ? "w-4 sm:w-6"
                      : "bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent"
                  }`}
                  style={{ transformStyle: "preserve-3d", display: "inline-block" }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Underline sweep */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-[42%] sm:bottom-[38%] h-[2px] w-40 sm:w-56 bg-gradient-to-r from-transparent via-white to-transparent origin-center"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showIntro ? 0 : 1 }}
        transition={{ duration: 0.6 }}
      >
        {children}
      </motion.div>
    </>
  );
}