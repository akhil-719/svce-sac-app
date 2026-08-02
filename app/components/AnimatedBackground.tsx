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
    <div className="absolute inset-0 -z-20 overflow-hidden bg-white">
      {/* Cursor spotlight */}
      <motion.div
        animate={{ left: `${mouse.x * 100}%`, top: `${mouse.y * 100}%` }}
        transition={{ type: "spring", stiffness: 40, damping: 20 }}
        className="absolute w-[700px] h-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(168,85,247,0.18), rgba(236,72,153,0.1) 40%, transparent 70%)",
        }}
      />

      {/* Smooth drifting gradient blooms — no dots, no grid */}
      <motion.div
        animate={{ x: ["-6%", "6%", "-6%"], y: ["0%", "8%", "0%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-15%] left-[-10%] w-[700px] h-[700px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(168,85,247,0.30) 0%, rgba(236,72,153,0.15) 45%, transparent 75%)",
          filter: "blur(90px)",
        }}
      />
      <motion.div
        animate={{ x: ["6%", "-6%", "6%"], y: ["0%", "-8%", "0%"] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[5%] right-[-15%] w-[750px] h-[750px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.28) 0%, rgba(34,211,238,0.14) 45%, transparent 75%)",
          filter: "blur(90px)",
        }}
      />
      <motion.div
        animate={{ x: ["-5%", "6%", "-5%"], y: ["0%", "6%", "0%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-15%] left-[15%] w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(251,146,60,0.22) 0%, rgba(244,114,182,0.14) 45%, transparent 75%)",
          filter: "blur(90px)",
        }}
      />

      {/* Very subtle grain texture for a premium, non-flat feel */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.025]">
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
    </div>
  );
}