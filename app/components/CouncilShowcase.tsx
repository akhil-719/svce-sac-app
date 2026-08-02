"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";

const councils = [
  {
    name: "Technical",
    href: "/technical",
    tagline: "Build. Break. Ship.",
    description: "Hackathons, coding contests, and tech talks that turn curiosity into real projects.",
    gradient: "from-blue-500 via-cyan-400 to-teal-300",
    glow: "rgba(56,189,248,0.5)",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    name: "Cultural",
    href: "/cultural",
    tagline: "Create. Perform. Celebrate.",
    description: "Fests, dance, music, and drama that bring SVCE's creative spirit to the stage.",
    gradient: "from-pink-500 via-rose-400 to-orange-300",
    glow: "rgba(244,114,182,0.5)",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
  },
  {
    name: "Sports",
    href: "/sports",
    tagline: "Train. Compete. Win.",
    description: "Tournaments, fitness drives, and inter-college matches fueling SVCE's competitive edge.",
    gradient: "from-emerald-500 via-green-400 to-lime-300",
    glow: "rgba(74,222,128,0.5)",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z" />
        <path d="M2 12h20" />
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

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 250, damping: 22 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 250, damping: 22 });

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
        className="relative rounded-[2rem] overflow-hidden min-h-[360px] p-7 flex flex-col justify-between cursor-pointer bg-gray-950 group"
      >
        {/* Glowing border that appears on hover */}
        <div
          className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            padding: 1.5,
            background: `linear-gradient(135deg, ${council.glow}, transparent 60%)`,
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />

        {/* Cursor-tracking spotlight */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: useTransform(
              [spotlightX, spotlightY],
              ([sx, sy]) => `radial-gradient(circle at ${sx}% ${sy}%, ${council.glow}, transparent 45%)`
            ),
          }}
        />

        {/* Base gradient blob */}
        <motion.div
          variants={{ initial: { scale: 1, opacity: 0.4 }, hover: { scale: 1.3, opacity: 0.7 } }}
          initial="initial"
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`absolute -top-10 -right-10 w-56 h-56 bg-gradient-to-br ${council.gradient} rounded-full blur-3xl`}
        />

        <div className="relative z-10" style={{ transform: "translateZ(40px)" }}>
          <motion.div
            variants={{ initial: { y: 0, rotate: 0 }, hover: { y: -4, rotate: -6 } }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${council.gradient} flex items-center justify-center text-white mb-6 shadow-lg`}
          >
            {council.icon}
          </motion.div>

          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-white/50 mb-2">
            {council.tagline}
          </p>
          <h3 className="text-2xl font-bold text-white tracking-tight mb-3">{council.name}</h3>
          <p className="text-sm text-white/60 leading-relaxed">{council.description}</p>
        </div>

        <motion.div
          variants={{ initial: { x: 0 }, hover: { x: 6 } }}
          transition={{ duration: 0.3 }}
          className="relative z-10 flex items-center gap-2 text-white text-sm font-medium mt-6"
          style={{ transform: "translateZ(40px)" }}
        >
          Explore
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </motion.div>
      </motion.div>
    </Link>
  );
}

export default function CouncilShowcase() {
  return (
    <div className="mt-28 w-full max-w-5xl px-6">
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

      <div className="grid sm:grid-cols-3 gap-6" style={{ perspective: 1200 }}>
        {councils.map((council, index) => (
          <motion.div
            key={council.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <TiltCard council={council} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}