import Link from "next/link";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/technical", label: "Technical" },
  { href: "/cultural", label: "Cultural" },
  { href: "/sports", label: "Sports" },
  { href: "/registration", label: "Registration" },
];

const councils = [
  { label: "Technical Leadership Council", href: "/technical" },
  { label: "Cultural Leadership Council", href: "/cultural" },
  { label: "Sports Council", href: "/sports" },
];

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 6l-10 7L2 6" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative bg-gray-950 text-gray-300 pt-16 pb-8 mt-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 rounded-full bg-white/10 inline-block" />
              <span className="text-white font-bold text-lg">SVCE SAC</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              The Student Activity Center at SVCE, coordinating Technical,
              Cultural, and Sports councils to build a vibrant campus life.
            </p>
          </div>

          <div>
            <p className="text-white font-semibold text-sm mb-4 tracking-wide uppercase">
              Quick Links
            </p>
            <ul className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-white font-semibold text-sm mb-4 tracking-wide uppercase">
              Councils
            </p>
            <ul className="flex flex-col gap-2">
              {councils.map((c) => (
                <li key={c.href}>
                  <Link href={c.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-white font-semibold text-sm mb-4 tracking-wide uppercase">
              Connect
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
              <MapPinIcon />
              <span>Sriperumbudur, Chennai</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
              <MailIcon />
              <span>sac@svce.ac.in</span>
            </div>
            <div className="flex gap-3">
              <a href="#" aria-label="Instagram" className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <InstagramIcon />
              </a>
              <a href="#" aria-label="LinkedIn" className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <LinkedinIcon />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} SVCE Student Activity Center. All rights reserved.
          </p>
          <p className="text-xs text-gray-500">
            Sri Venkateswara College of Engineering
          </p>
        </div>
      </div>
    </footer>
  );
}