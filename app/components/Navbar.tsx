"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home", color: "#111827" },
  { href: "/technical", label: "Technical", color: "#3b82f6" },
  { href: "/cultural", label: "Cultural", color: "#ec4899" },
  { href: "/sports", label: "Sports", color: "#10b981" },
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
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0, color: "#111827" });

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
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
        color: link?.color || "#111827",
      });
    } else {
      setIndicator((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [hoveredHref, pathname]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.nav
        animate={{
          paddingTop: scrolled ? 10 : 14,
          paddingBottom: scrolled ? 10 : 14,
          boxShadow: scrolled ? "0 8px 30px rgba(0,0,0,0.08)" : "0 1px 3px rgba(0,0,0,0.03)",
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-8 bg-white/85 backdrop-blur-xl px-6 rounded-full border border-gray-100 w-[92%] sm:w-auto justify-between sm:justify-start"
      >
        <Link href="/" className="flex items-center gap-2.5">
          <span className="relative w-6 h-6 rounded-full flex-shrink-0">
            <span className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400" />
            <span className="absolute inset-[3px] rounded-full bg-white" />
          </span>
          <span className="font-bold text-gray-900 text-[15px] tracking-tight whitespace-nowrap">
            SVCE <span className="text-gray-400 font-medium">SAC</span>
          </span>
        </Link>

        <div
          ref={containerRef}
          className="relative hidden sm:flex items-center gap-7"
          onMouseLeave={() => setHoveredHref(null)}
        >
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
                className={`relative text-sm font-medium py-1 transition-colors duration-200 ${
                  isActive ? "text-gray-900" : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <motion.div
            animate={{ left: indicator.left, width: indicator.width, opacity: indicator.opacity, backgroundColor: indicator.color }}
            transition={{ type: "spring", stiffness: 400, damping: 32 }}
            className="absolute -bottom-1 h-[2px] rounded-full"
          />
        </div>

        <Link
          href="/registration"
          className="hidden sm:flex items-center gap-1.5 bg-gray-950 text-white text-sm font-medium pl-5 pr-4 py-2.5 rounded-full hover:bg-gray-800 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          Register
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>

        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          className="sm:hidden flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-50 transition-colors flex-shrink-0"
          aria-label="Toggle menu"
        >
          <MenuIcon open={mobileOpen} />
        </button>
      </motion.nav>

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