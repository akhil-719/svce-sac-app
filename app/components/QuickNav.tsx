"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const items = [
  { label: "Technical", href: "/technical", gradient: "from-blue-500 to-cyan-400" },
  { label: "Cultural", href: "/cultural", gradient: "from-pink-500 to-orange-400" },
  { label: "Sports", href: "/sports", gradient: "from-emerald-500 to-lime-400" },
];

export default function QuickNav() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.0 }}
      className="flex flex-wrap items-center justify-center gap-3 mt-4"
    >
      {items.map((item) => (
        <Link key={item.href} href={item.href}>
          <motion.div
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
            className="relative group px-6 py-3 rounded-full"
          >
            {/* Gradient border ring, glows on hover */}
            <div
              className={`absolute inset-0 rounded-full bg-gradient-to-r ${item.gradient} opacity-70 group-hover:opacity-100 transition-opacity duration-300`}
            />
            <div className="absolute inset-[1.5px] rounded-full bg-white" />
            <span
              className={`relative text-sm font-semibold bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}
            >
              {item.label}
            </span>
          </motion.div>
        </Link>
      ))}
    </motion.div>
  );
}