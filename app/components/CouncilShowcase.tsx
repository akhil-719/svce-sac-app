"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";

const councils = [
  {
    code: "TLC",
    name: "Technical",
    href: "/technical",
    tagline: "Build. Break. Ship.",
    gradient: "from-blue-500 via-cyan-400 to-teal-300",
    glow: "rgba(56,189,248,0.5)",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    code: "CLC",
    name: "Cultural",
    href: "/cultural",
    tagline: "Create. Perform. Celebrate.",
    gradient: "from-pink-500 via-rose-400 to-orange-300",
    glow: "rgba(244,114,182,0.5)",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
  },
  {
    code: "SPC",
    name: "Sports",
    href: "/sports",
    tagline: "Train. Compete. Win.",
    gradient: "from-emerald-500 via-green-400 to-lime-300",
    glow: "rgba(74,222,128,0.5)",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z" />
        <path d="M2 12h20" />
      </svg>
    ),
  },
  {
    code: "SMD",
    name: "Social Media & Design",
    href: "/social-media",
    tagline: "Create. Post. Amplify.",
    gradient: "from-fuchsia-500 via-purple-400 to-indigo-300",
    glow: "rgba(217,70,239,0.5)",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    code: "NSS",
    name: "NSS",
    href: "/nss",
    tagline: "Serve. Uplift. Connect.",
    gradient: "from-amber-500 via-yellow-400 to-orange-300",
    glow: "rgba(245,158,11,0.5)",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    code: "HWC",
    name: "Health & Wellness",
    href: "/wellness",
    tagline: "Breathe. Balance. Belong.",
    gradient: "from-teal-500 via-cyan-400 to-sky-300",
    glow: "rgba(20,184,166,0.5)",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    code: "ALC",
    name: "Alumni",
    href: "/alumni",
    tagline: "Connect. Guide. Give Back.",
    gradient: "from-indigo-500 via-blue-400 to-cyan-300",
    glow: "rgba(99,102,241,0.5)",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z" />
        <path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5" />
      </svg>
    ),
  },
];

function TiltCard({ council }: { council: (typeof councils)[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spotlightX = useMotionValue(50);
  const spotlightY = useMotionValue(50);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 250, damping: 22 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 250, damping: 22 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    x.set(px - 0.5);
    y.set(py - 0.5);
    spotlightX.set(px * 100);
    spotlightY.set(py * 100);
  }
  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <Link href={council.href}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformPerspective: 900 }}
        whileHover="hover"
        className="relative rounded-[1.75rem] overflow-hidden min-h-[260px] p-6 flex flex-col justify-between cursor-pointer bg-gray-950 group"
      >
        <div className="absolute top-4 right-4 z-20 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-2.
        py-1">
          <span className="text-[10px] font-bold tracking-[0.1em] text-white/70 uppercase">
            {council.code}
          </span>
        </div>

        <div
          className="absolute inset-0 rounded-[1.75rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            padding: 1.5,
            background: `linear-gradient(135deg, ${council.glow}, transparent 60%)`,
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />

        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: useTransform(
              [spotlightX, spotlightY],
              ([sx, sy]) => `radial-gradient(circle at ${sx}% ${sy}%, ${council.glow}, transparent 45%)`
            ),
          }}
        />

        <motion.div
          variants={{ initial: { scale: 1, opacity: 0.35 }, hover: { scale: 1.3, opacity: 0.6 } }}
          initial="initial"
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`absolute -top-8 -right-8 w-40 h-40 bg-gradient-to-br ${council.gradient} rounded-full blur-3xl`}
        />

        <div className="relative z-10" style={{ transform: "translateZ(30px)" }}>
          <motion.div
            variants={{ initial: { y: 0, rotate: 0 }, hover: { y: -3, rotate: -6 } }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${council.gradient} flex items-center justify-center text-white mb-4 shadow-lg`}
          >
            {council.icon}
          </motion.div>

          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-white/45 mb-1.5">
            {council.tagline}
          </p>
          <h3 className="text-lg font-bold text-white tracking-tight">{council.name}</h3>
        </div>

        <motion.div
          variants={{ initial: { x: 0 }, hover: { x: 5 } }}
          transition={{ duration: 0.3 }}
          className="relative z-10 flex items-center gap-1.5 text-white text-xs font-medium mt-4"
          style={{ transform: "translateZ(30px)" }}
        >
          Explore
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </motion.div>
      </motion.div>
    </Link>
  );
}

export default function CouncilShowcase() {
  return (
    <div className="mt-28 w-full max-w-6xl px-6">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400">Explore</span>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mt-3">
          Find Your Council
        </h2>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5" style={{ perspective: 1200 }}>
        {councils.map((council, index) => (
          <motion.div
            key={council.code}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
          >
            <TiltCard council={council} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}