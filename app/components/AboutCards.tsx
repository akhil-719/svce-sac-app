"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, animate } from "framer-motion";

const stats = [
  { value: 6, suffix: "", label: "Active Councils" },
  { value: 3500, suffix: "+", label: "Students" },
  { value: 40, suffix: "+", label: "Years of Legacy" },
  { value: 100, suffix: "+", label: "Events / Year" },
];

function useCountUp(target: number, shouldStart: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!shouldStart) return;
    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(Math.floor(v)),
    });
    return () => controls.stop();
  }, [shouldStart, target]);
  return value;
}

function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
    stiffness: 200,
    damping: 20,
  });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StatCard({ stat, delay }: { stat: (typeof stats)[number]; delay: number }) {
  const [inView, setInView] = useState(false);
  const count = useCountUp(stat.value, inView);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      onViewportEnter={() => setInView(true)}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="rounded-[1.5rem] bg-gray-50 border border-gray-100 p-6 flex flex-col justify-center hover:border-gray-300 hover:shadow-lg transition-shadow"
    >
      <span className="text-3xl font-bold text-gray-900 tabular-nums">
        {count.toLocaleString()}
        {stat.suffix}
      </span>
      <span className="text-xs text-gray-500 mt-1">{stat.label}</span>
    </motion.div>
  );
}

export default function AboutCards() {
  const marqueeWords = ["SVCE", "SAC", "Technical", "Cultural", "Sports", "Alumni", "NSS"];

  return (
    <div className="mt-28 w-full">
      {/* Scrolling marquee banner */}
      {/* Scrolling marquee banner — bold dark treatment */}
      <div className="relative w-full overflow-hidden py-8 mb-16 bg-gray-950">
        {/* Edge fade so text doesn't hard-cut at the container edges */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-gray-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-gray-950 to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex gap-12 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 22, ease: "linear", repeat: Infinity }}
        >
          {[...marqueeWords, ...marqueeWords, ...marqueeWords].map((word, i) => (
            <span
              key={i}
              className="text-2xl sm:text-3xl font-black tracking-tight uppercase flex items-center gap-12 bg-gradient-to-r from-white via-white to-gray-500 bg-clip-text text-transparent"
              style={{ WebkitTextStroke: "0.5px rgba(255,255,255,0.15)" }}
            >
              {word}
              <span className="w-2 h-2 rotate-45 bg-gradient-to-br from-purple-500 to-pink-500 flex-shrink-0" />
            </span>
          ))}
        </motion.div>
      </div>

      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400">
            Who We Are
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mt-3">
            One College. One Community.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Large tilt card — College */}
          <TiltCard className="sm:col-span-2 relative rounded-[2rem] bg-gray-950 text-white p-8 sm:p-10 overflow-hidden min-h-[320px] flex flex-col justify-between cursor-default">
            <motion.div
              animate={{
                background: [
                  "radial-gradient(circle at 30% 20%, rgba(168,85,247,0.35), transparent 50%)",
                  "radial-gradient(circle at 70% 60%, rgba(236,72,153,0.35), transparent 50%)",
                  "radial-gradient(circle at 30% 20%, rgba(168,85,247,0.35), transparent 50%)",
                ],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0"
            />
            <div className="relative z-10">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/50">
                Est. 1985
              </span>
              <h3 className="text-3xl font-bold mt-3 mb-4 tracking-tight">
                Sri Venkateswara College of Engineering
              </h3>
              <p className="text-white/70 leading-relaxed max-w-md">
                An autonomous, NAAC A+ accredited institution built on four decades
                of academic rigor — where engineering excellence meets a campus
                culture that pushes students to build, lead, and grow well beyond
                the classroom.
              </p>
            </div>
            <div className="relative z-10 flex flex-wrap gap-3 mt-8">
              <span className="text-xs bg-white/10 border border-white/20 rounded-full px-3 py-1.5">
                NAAC A+ Accredited
              </span>
              <span className="text-xs bg-white/10 border border-white/20 rounded-full px-3 py-1.5">
                JNTUA University Affiliated
              </span>
            </div>
          </TiltCard>

          <div className="grid grid-cols-2 sm:grid-cols-1 gap-4">
            <StatCard stat={stats[0]} delay={0.1} />
            <StatCard stat={stats[1]} delay={0.18} />
          </div>

          {/* Gradient tilt card — SAC */}
          <TiltCard className="sm:col-span-2 relative rounded-[2rem] bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 text-white p-8 sm:p-10 overflow-hidden min-h-[280px] flex flex-col justify-between cursor-default">
            <div className="relative z-10">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/70">
                Where Ideas Meet Action
              </span>
              <h3 className="text-3xl font-bold mt-3 mb-4 tracking-tight">
                Student Activity Center
              </h3>
              <p className="text-white/85 leading-relaxed max-w-md">
                SAC is the engine behind everything happening outside the
                classroom — coordinating six councils, hundreds of events, and
                thousands of students turning ideas into hackathons, fests,
                tournaments, and everything in between.
              </p>
            </div>
          </TiltCard>

          <div className="grid grid-cols-2 sm:grid-cols-1 gap-4">
            <StatCard stat={stats[2]} delay={0.26} />
            <StatCard stat={stats[3]} delay={0.34} />
          </div>
        </div>
      </div>
    </div>
  );
}