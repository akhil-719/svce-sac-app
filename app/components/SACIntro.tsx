"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const cards = [
  {
    span: "full",
    title: "Official SVCE Student Body",
    description: "Recognized Student Activity Center at Sri Venkateswara College of Engineering",
  },
  {
    title: "6 Active Councils",
    description: "Technical, Cultural, Sports & more",
  },
  {
    title: "100+ Events",
    description: "Hackathons. Fests. Tournaments.",
  },
  {
    title: "Real Leadership",
    description: "Own a team, own an outcome",
  },
  {
    title: "Campus-Wide Network",
    description: "3500+ students, one community",
  },
];

export default function SACIntro() {
  return (
    <div className="mt-28 w-full max-w-6xl px-6">
      <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
        {/* Left: asymmetric card grid */}
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -3 }}
            className="col-span-2 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <span className="text-3xl mb-4 block"></span>
            <h3 className="font-bold text-gray-900 mb-1.5">{cards[0].title}</h3>
            <p className="text-sm text-gray-500">{cards[0].description}</p>
          </motion.div>

          {cards.slice(1).map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              whileHover={{ y: -3 }}
              className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="text-2xl mb-3 block"></span>
              <h3 className="font-bold text-gray-900 text-sm mb-1">{card.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{card.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Right: editorial copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-block text-xs font-semibold tracking-[0.15em] uppercase text-purple-600 bg-purple-50 px-3 py-1.5 rounded-full mb-5">
            About Us
          </span>

          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-gray-900 leading-[1.05] mb-6">
            Where Students Become
            <br />
            <span className="italic bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
              Campus Leaders
            </span>
          </h2>

          <p className="text-gray-600 leading-relaxed mb-4">
            We are the <span className="font-semibold text-gray-900">Student Activity Center at SVCE</span> —
            a student-run body dedicated to making campus life active, competitive,
            and genuinely worth being part of.
          </p>
          <p className="text-gray-600 leading-relaxed mb-8">
            From your first hackathon to running an entire fest, we provide the
            teams, the events, and the platform to help you build something real
            before you graduate.
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <Link
              href="/technical"
              className="bg-gray-950 text-white text-sm font-semibold px-7 py-3.5 rounded-full hover:bg-gray-800 transition-all hover:scale-[1.03] active:scale-[0.98] shadow-lg shadow-gray-900/20"
            >
              Join a Council
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}