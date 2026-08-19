"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home", grad: "from-purple-500 to-pink-500" },
  { href: "/technical", label: "Technical", grad: "from-blue-500 to-cyan-400" },
  { href: "/cultural", label: "Cultural", grad: "from-pink-500 to-orange-400" },
  { href: "/sports", label: "Sports", grad: "from-emerald-500 to-lime-400" },
  { href: "/social-media", label: "Social Media", grad: "from-fuchsia-500 to-purple-400" },
  { href: "/nss", label: "NSS", grad: "from-amber-500 to-yellow-400" },
  { href: "/wellness", label: "Wellness", grad: "from-teal-500 to-cyan-400" },
  { href: "/alumni", label: "Alumni", grad: "from-indigo-500 to-blue-400" },
];

function MenuIcon({ open }: { open: boolean }) {
  return (
    <div className="relative w-5 h-4 flex flex-col justify-between">
      <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 7 : 0 }} transition={{ duration: 0.25 }} className="w-full h-0.5 bg-gray-900 rounded-full origin-center" />
      <motion.span animate={{ opacity: open ? 0 : 1 }} transition={{ duration: 0.15 }} className="w-full h-0.5 bg-gray-900 rounded-full" />
      <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -7 : 0 }} transition={{ duration: 0.25 }} className="w-full h-0.5 bg-gray-900 rounded-full origin-center" />
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0, grad: "from-purple-500 to-pink-500" });

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 40);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const activeHref = hoveredHref || pathname;
    const link = navLinks.find((l) => l.href === activeHref);
    const el = linkRefs.current[activeHref];
    const container = containerRef.current;
    if (el && container) {
      const elRect = el.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      setIndicator({
        left: elRect.left - containerRect.left,
        width: elRect.width,
        opacity: 1,
        grad: link?.grad || "from-purple-500 to-pink-500",
      });
    } else {
      setIndicator((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [hoveredHref, pathname]);

  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] sm:w-auto"
      >
        <motion.nav
          animate={{
            paddingTop: scrolled ? 6 : 8,
            paddingBottom: scrolled ? 6 : 8,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative flex items-center gap-1 px-2 rounded-full justify-between sm:justify-start"
        >
          {/* Gradient border ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400/40 via-pink-400/40 to-orange-300/40" />
          {/* Glass fill, inset to leave a thin visible border */}
          <div
            className="absolute inset-[1.5px] rounded-full bg-white/80 backdrop-blur-xl"
            style={{ boxShadow: scrolled ? "0 12px 40px rgba(0,0,0,0.12)" : "0 4px 20px rgba(0,0,0,0.06)" }}
          />

          <Link href="/" className="relative flex items-center gap-2 pl-4 pr-3 py-2">
            <span className="relative w-6 h-6 rounded-full flex-shrink-0">
              <span className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400" />
              <span className="absolute inset-[3px] rounded-full bg-white" />
            </span>
            <span className="font-bold text-gray-900 text-[15px] tracking-tight whitespace-nowrap">
              SVCE <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">SAC</span>
            </span>
          </Link>

          <div
            ref={containerRef}
            className="relative hidden sm:flex items-center gap-1"
            onMouseLeave={() => setHoveredHref(null)}
          >
            <motion.div
              animate={{ left: indicator.left, width: indicator.width, opacity: indicator.opacity }}
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
              className={`absolute top-1 h-[calc(100%-8px)] rounded-full bg-gradient-to-r ${indicator.grad} -z-0`}
            />
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  ref={(el) => {
                    linkRefs.current[link.href] = el;
                  }}
                  onMouseEnter={() => setHoveredHref(link.href)}
                  className={`relative z-10 px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${
                    isActive || hoveredHref === link.href ? "text-white" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <Link
            href="/registration"
            className="relative hidden sm:flex items-center gap-1.5 ml-1 mr-1 bg-gray-950 text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-gray-800 transition-all hover:scale-[1.03] active:scale-[0.98] shadow-lg shadow-gray-900/20"
          >
            Register
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>

          <button
            onClick={() => setMobileOpen((p) => !p)}
            className="relative sm:hidden flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100/50 transition-colors flex-shrink-0 mr-1"
            aria-label="Toggle menu"
          >
            <MenuIcon open={mobileOpen} />
          </button>
        </motion.nav>
      </motion.div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-40 bg-gray-950/98 backdrop-blur-lg flex flex-col items-center justify-center sm:hidden"
        >
          <div className="flex flex-col items-center gap-2">
            {navLinks.map((link, i) => {
              const isActive = pathname === link.href;
              return (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
                >
                  <Link href={link.href} className={`text-3xl font-bold tracking-tight transition-colors px-6 py-3 ${isActive ? "text-white" : "text-white/50 hover:text-white"}`}>
                    {link.label}
                  </Link>
                </motion.div>
              );
            })}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.35 }} className="mt-6">
              <Link href="/registration" className="bg-white text-gray-900 text-sm font-semibold px-7 py-3.5 rounded-full inline-block">
                Registration
              </Link>
            </motion.div>
          </div>
        </motion.div>
      )}
    </>
  );
}