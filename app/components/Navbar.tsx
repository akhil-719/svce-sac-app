"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/technical", label: "Technical" },
  { href: "/cultural", label: "Cultural" },
  { href: "/sports", label: "Sports" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      animate={{
        paddingTop: scrolled ? 8 : 12,
        paddingBottom: scrolled ? 8 : 12,
        boxShadow: scrolled
          ? "0 4px 20px rgba(0,0,0,0.08)"
          : "0 2px 8px rgba(0,0,0,0.04)",
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-6 bg-white/70 backdrop-blur-md px-6 rounded-full"
    >
      <span className="font-bold text-gray-900 flex items-center gap-2">
        {/* Logo placeholder — replace src with your real college logo later */}
        <span className="w-6 h-6 rounded-full bg-gray-300 inline-block" />
        SVCE SAC
      </span>

      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-sm text-gray-700 hover:text-black transition-colors"
        >
          {link.label}
        </Link>
      ))}

      <Link
        href="/registration"
        className="bg-black text-white text-sm px-4 py-2 rounded-full hover:bg-gray-800 transition-colors"
      >
        Registration
      </Link>
    </motion.nav>
  );
}