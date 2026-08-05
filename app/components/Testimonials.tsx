"use client";

import { motion } from "framer-motion";

// Replace with real student quotes once collected
const testimonials = [
  { name: "Priya S.", role: "TLC Member, 2nd Year", quote: "Ran my first hackathon logistics through SAC — learned more managing 200 people than any classroom ever taught me." },
  { name: "Arjun K.", role: "CLC President", quote: "SAC gave me a real budget, a real team, and a real stage. That's not something you get from a regular club." },
  { name: "Meera R.", role: "SPC Member, 3rd Year", quote: "Went from just playing intramurals to organizing the entire inter-college meet. Genuinely changed how I see leadership." },
  { name: "Rahul V.", role: "TLC Volunteer", quote: "The council system here actually works — you show up once, and suddenly you're running events by your second semester." },
];

export default function Testimonials() {
  return (
    <div className="mt-28 w-full">
      <div className="max-w-3xl mx-auto px-6 text-center mb-12">
        <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400">
          In Their Words
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mt-3">
          Students, Not Slogans
        </h2>
      </div>

      <div className="relative overflow-hidden py-2">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex gap-5 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 32, ease: "linear", repeat: Infinity }}
        >
          {[...testimonials, ...testimonials].map((t, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-80 bg-white border border-gray-100 rounded-3xl p-6 shadow-sm"
            >
              <svg width="28" height="22" viewBox="0 0 28 22" fill="none" className="text-gray-200 mb-3">
                <path
                  d="M0 22V13.5C0 9 1.5 5.4 4.5 2.7C6 1.35 7.8 0.45 9.9 0L11.4 3.15C9.6 3.75 8.25 4.65 7.35 5.85C6.45 7.05 6 8.4 6 9.9H10.5V22H0ZM16.5 22V13.5C16.5 9 18 5.4 21 2.7C22.5 1.35 24.3 0.45 26.4 0L27.9 3.15C26.1 3.75 24.75 4.65 23.85 5.85C22.95 7.05 22.5 8.4 22.5 9.9H27V22H16.5Z"
                  fill="currentColor"
                />
              </svg>
              <p className="text-sm text-gray-700 leading-relaxed mb-5">{t.quote}</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}