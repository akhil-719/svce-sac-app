"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const panels = [
  {
    eyebrow: "Est. Excellence",
    title: "SVCE College",
    text: "Sri Venkateswara College of Engineering is committed to academic excellence and holistic student development, blending strong technical education with a vibrant campus culture.",
    stat: { value: "20+", label: "Years of Legacy" },
    image: "https://wjoltpledptozzlexoqx.supabase.co/storage/v1/object/public/council-images/college.jpg",
    align: "left",
  },
  {
    eyebrow: "Where Ideas Meet Action",
    title: "Student Activity Center",
    text: "SAC coordinates all technical, cultural, and sports activities on campus — empowering students to lead, organize, and participate in events that shape their college journey.",
    stat: { value: "6", label: "Active Councils" },
    image: "https://wjoltpledptozzlexoqx.supabase.co/storage/v1/object/public/council-images/SAC.jpg",
    align: "right",
  },
];

function Panel({ panel }: { panel: (typeof panels)[number] }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Image moves slightly slower than the scroll — creates depth (parallax)
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 0.995 }}
      className={`relative rounded-[2.5rem] overflow-hidden min-h-[460px] flex items-center shadow-2xl shadow-black/10 ${
        panel.align === "right" ? "justify-end" : "justify-start"
      }`}
    >
      {/* Parallax background image */}
      <motion.img
        src={panel.image}
        alt={panel.title}
        style={{ y: imageY }}
        className="absolute inset-0 w-full h-[120%] -top-[10%] object-cover"
      />

      {/* Gradient scrim */}
      <div
        className={`absolute inset-0 ${
          panel.align === "right"
            ? "bg-gradient-to-l from-black/85 via-black/50 to-black/10"
            : "bg-gradient-to-r from-black/85 via-black/50 to-black/10"
        }`}
      />

      {/* Subtle top sheen for extra polish */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

      {/* Text content */}
      <div
        className={`relative z-10 max-w-md p-10 sm:p-14 ${
          panel.align === "right" ? "text-right items-end" : "text-left items-start"
        } flex flex-col`}
      >
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs font-semibold tracking-[0.2em] uppercase text-white/70 mb-3"
        >
          {panel.eyebrow}
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-[1.1]"
        >
          {panel.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-sm sm:text-base text-white/85 leading-relaxed"
        >
          {panel.text}
        </motion.p>

        {/* Floating stat badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 inline-flex items-baseline gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-3"
        >
          <span className="text-2xl font-bold text-white">{panel.stat.value}</span>
          <span className="text-xs text-white/70">{panel.stat.label}</span>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function AboutCards() {
  return (
    <div className="mt-24 w-full flex flex-col gap-20 max-w-5xl px-6">
      {panels.map((panel) => (
        <Panel key={panel.title} panel={panel} />
      ))}
    </div>
  );
}