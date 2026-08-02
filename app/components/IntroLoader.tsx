"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const letters = "SVCE SAC".split("");

function FloatingParticles() {
  const particles = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 4 + 3,
    delay: Math.random() * 2,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.6, 0], y: ["0%", "-40%"] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          className="rounded-full bg-white/40"
        />
      ))}
    </div>
  );
}

function OrbitRing({ size, duration, reverse = false }: { size: number; duration: number; reverse?: boolean }) {
  return (
    <motion.div
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
      style={{ width: size, height: size }}
      className="absolute rounded-full border border-white/10"
    >
      <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 shadow-[0_0_8px_2px_rgba(236,72,153,0.6)]" />
    </motion.div>
  );
}

export default function IntroLoader({ children }: { children: React.ReactNode }) {
  const [showIntro, setShowIntro] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress((p) => Math.min(p + Math.random() * 14, 100));
    }, 180);

    const exitTimer = setTimeout(() => {
      setProgress(100);
      setShowIntro(false);
    }, 3400);

    return () => {
      clearInterval(progressTimer);
      clearTimeout(exitTimer);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {showIntro && (
          <motion.div
            key="intro"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[999] overflow-hidden bg-gray-950"
            style={{ perspective: 1200 }}
          >
            {/* Radial ambient glow */}
            <motion.div
              animate={{
                background: [
                  "radial-gradient(circle at 50% 45%, rgba(168,85,247,0.25), transparent 60%)",
                  "radial-gradient(circle at 50% 55%, rgba(236,72,153,0.25), transparent 60%)",
                  "radial-gradient(circle at 50% 45%, rgba(168,85,247,0.25), transparent 60%)",
                ],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0"
            />

            {/* Split-panel exit wipe */}
            <motion.div
              initial={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="absolute inset-y-0 left-0 w-1/2 bg-gray-950"
            />
            <motion.div
              initial={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="absolute inset-y-0 right-0 w-1/2 bg-gray-950"
            />

            <div className="relative w-full h-full flex flex-col items-center justify-center">
              <FloatingParticles />

              {/* Logo + orbit rings, sitting BEHIND the text via z-index/layering */}
              <div className="absolute flex items-center justify-center">
                <OrbitRing size={280} duration={14} />
                <OrbitRing size={340} duration={20} reverse />

                <motion.div
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{
                    opacity: 0.9,
                    scale: 1,
                    rotate: [0, 360],
                  }}
                  transition={{
                    opacity: { duration: 1, delay: 0.2 },
                    scale: { duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] },
                    rotate: { duration: 40, repeat: Infinity, ease: "linear" },
                  }}
                  className="relative"
                >
                  {/* Glow behind the crest */}
                  <div className="absolute inset-0 blur-2xl bg-gradient-to-br from-amber-400/40 via-transparent to-transparent rounded-full scale-125" />
                  <Image
                    src="/svce-logo.png"
                    alt="SVCE Logo"
                    width={220}
                    height={220}
                    className="relative opacity-80"
                    priority
                  />
                </motion.div>
              </div>

              {/* Text sits ON TOP via higher z-index + glass backdrop */}
              <motion.div
                animate={{ rotateX: [2, -2, 2], rotateY: [-3, 3, -3] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                style={{ transformStyle: "preserve-3d" }}
                className="relative z-10 flex flex-col items-center px-10 py-8 rounded-[2rem] bg-gray-950/40 backdrop-blur-sm border border-white/5"
              >
                <div className="flex" style={{ transformStyle: "preserve-3d" }}>
                  {letters.map((letter, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, rotateX: -100, z: -80 }}
                      animate={{ opacity: 1, rotateX: 0, z: 0 }}
                      transition={{
                        duration: 0.8,
                        delay: 0.6 + i * 0.07,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className={`text-6xl sm:text-8xl font-bold tracking-tight ${
                        letter === " "
                          ? "w-4 sm:w-8"
                          : "bg-gradient-to-br from-white via-white to-amber-200 bg-clip-text text-transparent"
                      }`}
                      style={{
                        transformStyle: "preserve-3d",
                        display: "inline-block",
                        textShadow: "0 25px 50px rgba(0,0,0,0.6)",
                      }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </div>

                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
                  className="h-px w-40 sm:w-56 bg-gradient-to-r from-transparent via-amber-300/60 to-transparent my-4 origin-center"
                />

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.6 }}
                  className="text-white/50 text-sm sm:text-base tracking-[0.35em] uppercase font-medium"
                >
                  Student Activity Center
                </motion.p>
              </motion.div>

              {/* Progress bar */}
              <div className="absolute bottom-16 w-56 sm:w-72 z-10">
                <div className="h-[2px] bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-amber-300 via-pink-400 to-purple-400"
                  />
                </div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-white/30 text-[10px] tracking-widest mt-3 text-center tabular-nums"
                >
                  {Math.floor(progress)}%
                </motion.p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: showIntro ? 0 : 1, scale: showIntro ? 0.98 : 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}