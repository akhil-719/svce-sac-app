"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function AnimatedBackground() {
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    function handleMove(e: MouseEvent) {
      setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    }
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-20 overflow-hidden bg-white">
      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: "radial-gradient(circle, #d1d5db 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <motion.div
        animate={{
          left: `${mouse.x * 100}%`,
          top: `${mouse.y * 100}%`,
        }}
        transition={{ type: "spring", stiffness: 40, damping: 20 }}
        className="absolute w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(168,85,247,0.12), rgba(236,72,153,0.06) 40%, transparent 70%)",
        }}
      />

      <motion.div
        animate={{ x: ["-5%", "5%", "-5%"], y: ["0%", "8%", "0%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-15%] left-[-10%] w-[600px] h-[600px] bg-gradient-to-tr from-purple-500/15 via-pink-500/10 to-transparent blur-3xl rounded-full"
      />
      <motion.div
        animate={{ x: ["5%", "-5%", "5%"], y: ["0%", "-8%", "0%"] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[15%] right-[-15%] w-[650px] h-[650px] bg-gradient-to-tr from-blue-400/15 via-cyan-300/10 to-transparent blur-3xl rounded-full"
      />
      <motion.div
        animate={{ x: ["-4%", "6%", "-4%"], y: ["0%", "6%", "0%"] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-15%] left-[20%] w-[550px] h-[550px] bg-gradient-to-tr from-orange-400/10 via-pink-300/10 to-transparent blur-3xl rounded-full"
      />
    </div>
  );
}