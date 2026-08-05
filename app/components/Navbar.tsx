"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/technical", label: "Technical" },
  { href: "/cultural", label: "Cultural" },
  { href: "/sports", label: "Sports" },
];

function MenuIcon({ open }: { open: boolean }) {
  return (
    <div className="relative w-5 h-4 flex flex-col justify-between">
      <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 7 : 0 }} className="w-full h-0.5 bg-gray-900 rounded-full" />
      <motion.span animate={{ opacity: open ? 0 : 1 }} className="w-full h-0.5 bg-gray-900 rounded-full" />
      <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -7 : 0 }} className="w-full h-0.5 bg-gray-900 rounded-full" />
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 30);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <>
      <motion.nav
        animate={{ boxShadow: scrolled ? "0 1px 0 rgba(0,0,0,0.08)" : "0 1px 0 rgba(0,0,0,0)" }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md"
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gradient-to-br from-purple-600 to-pink-500" />
            <span className="font-bold text-gray-900 text-[15px] tracking-tight">SVCE SAC</span>
          </Link>

          <div className="hidden sm:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href ? "text-gray-900" : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <Link
            href="/registration"
            className="hidden sm:inline-block bg-gray-950 text-white text-sm font-medium px-5 py-2 rounded-full hover:bg-gray-800 transition-colors"
          >
            Register
          </Link>

          <button onClick={() => setMobileOpen((p) => !p)} className="sm:hidden w-9 h-9 flex items-center justify-center" aria-label="Menu">
            <MenuIcon open={mobileOpen} />
          </button>
        </div>
      </motion.nav>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center sm:hidden"
        >
          <div className="flex flex-col items-center gap-6">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-3xl font-bold text-gray-900">
                {link.label}
              </Link>
            ))}
            <Link href="/registration" className="mt-4 bg-gray-950 text-white text-sm font-semibold px-7 py-3.5 rounded-full">
              Registration
            </Link>
          </div>
        </motion.div>
      )}
    </>
  );
}