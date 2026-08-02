"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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
      <motion.span
        animate={{ rotate: open ? 45 : 0, y: open ? 7 : 0 }}
        transition={{ duration: 0.25 }}
        className="w-full h-0.5 bg-gray-900 rounded-full origin-center"
      />
      <motion.span
        animate={{ opacity: open ? 0 : 1 }}
        transition={{ duration: 0.15 }}
        className="w-full h-0.5 bg-gray-900 rounded-full"
      />
      <motion.span
        animate={{ rotate: open ? -45 : 0, y: open ? -7 : 0 }}
        transition={{ duration: 0.25 }}
        className="w-full h-0.5 bg-gray-900 rounded-full origin-center"
      />
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
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 });

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const activeHref = hoveredHref || pathname;
    const el = linkRefs.current[activeHref];
    const container = containerRef.current;
    if (el && container) {
      const elRect = el.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      setIndicator({
        left: elRect.left - containerRect.left,
        width: elRect.width,
        opacity: 1,
      });
    } else {
      setIndicator((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [hoveredHref, pathname]);

  // Close mobile menu automatically if the page route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.nav
        animate={{
          paddingTop: scrolled ? 8 : 12,
          paddingBottom: scrolled ? 8 : 12,
          boxShadow: scrolled
            ? "0 8px 30px rgba(0,0,0,0.10)"
            : "0 2px 8px rgba(0,0,0,0.04)",
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-white/70 backdrop-blur-md px-3 rounded-full border border-white/40 w-[92%] sm:w-auto justify-between sm:justify-start"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 pr-3 sm:mr-1 sm:border-r border-gray-200">
          <motion.span
            whileHover={{ rotate: 12 }}
            transition={{ duration: 0.3 }}
            className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 inline-block flex-shrink-0"
          />
          <span className="font-bold text-gray-900 text-sm whitespace-nowrap">SVCE SAC</span>
        </Link>

        {/* Desktop links — hidden below sm breakpoint */}
        <div
          ref={containerRef}
          className="relative hidden sm:flex items-center gap-1"
          onMouseLeave={() => setHoveredHref(null)}
        >
          <motion.div
            animate={indicator}
            transition={{ type: "spring", stiffness: 400, damping: 32 }}
            className="absolute top-0 h-full bg-gray-900 rounded-full -z-10"
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
                className={`relative px-4 py-2 text-sm rounded-full transition-colors duration-200 ${
                  isActive || hoveredHref === link.href
                    ? "text-white"
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Desktop CTA — hidden below sm breakpoint */}
        <Link
          href="/registration"
          className="hidden sm:inline-block ml-2 bg-gray-100 text-gray-900 text-sm font-medium px-4 py-2 rounded-full hover:bg-gray-200 transition-all hover:scale-[1.03] active:scale-[0.97]"
        >
          Registration
        </Link>

        {/* Hamburger — only visible below sm breakpoint */}
        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          className="sm:hidden flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
          aria-label="Toggle menu"
        >
          <MenuIcon open={mobileOpen} />
        </button>
      </motion.nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
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
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={link.href}
                      className={`text-3xl font-bold tracking-tight transition-colors px-6 py-3 ${
                        isActive ? "text-white" : "text-white/50 hover:text-white"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + navLinks.length * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="mt-6"
              >
                <Link
                  href="/registration"
                  className="bg-white text-gray-900 text-sm font-semibold px-7 py-3.5 rounded-full inline-block"
                >
                  Registration
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}