"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const councils = [
    {
        name: "Technical",
        href: "/technical",
        accentText: "text-blue-600",
        accentGrad: "from-blue-500 via-cyan-400 to-teal-300",
        iconColor: "text-blue-200",
        tagline: "Build. Break. Ship.",
        statement: "Where curiosity turns into code, and code turns into",
        statementAccent: "something real",
        supporting:
            "Hackathons that run through the night, workshops that actually teach, and guest talks from engineers who've shipped products you've used.",
        icon: (
            <svg width="380" height="380" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
            </svg>
        ),
    },
    {
        name: "Cultural",
        href: "/cultural",
        accentText: "text-pink-600",
        accentGrad: "from-pink-500 via-rose-400 to-orange-300",
        iconColor: "text-pink-200",
        tagline: "Create. Perform. Celebrate.",
        statement: "Where the stage belongs to whoever's brave enough to",
        statementAccent: "take it",
        supporting:
            "Fests that take over campus for days, dance and music teams that rehearse like it's a career, and drama that brings SVCE's creative spirit to life.",
        icon: (
            <svg width="380" height="380" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
                <path d="M9 18V5l12-2v13" />
                <circle cx="6" cy="18" r="3" />
                <circle cx="18" cy="16" r="3" />
            </svg>
        ),
    },
    {
        name: "Sports",
        href: "/sports",
        accentText: "text-emerald-600",
        accentGrad: "from-emerald-500 via-green-400 to-lime-300",
        iconColor: "text-emerald-200",
        tagline: "Train. Compete. Win.",
        statement: "Where discipline meets rivalry, every single",
        statementAccent: "season",
        supporting:
            "Tournaments that pack the ground and the stands alike, fitness culture that pushes you past your limits, and a team that shows up for each other.",
        icon: (
            <svg width="380" height="380" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z" />
                <path d="M2 12h20" />
            </svg>
        ),
    },
      {
    name: "Social Media & Design",
    href: "/social-media",
    accentText: "text-fuchsia-600",
    accentGrad: "from-fuchsia-500 via-purple-400 to-indigo-300",
    iconColor: "text-fuchsia-100",
    tagline: "Create. Post. Amplify.",
    statement: "Where every event gets a story, and every story gets",
    statementAccent: "seen",
    supporting:
      "From event posters to campus-wide social campaigns, this council shapes how SVCE SAC looks and sounds online — design, content, and visibility for every other council.",
    icon: (
      <svg width="380" height="380" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    name: "NSS",
    href: "/nss",
    accentText: "text-amber-600",
    accentGrad: "from-amber-500 via-yellow-400 to-orange-300",
    iconColor: "text-amber-100",
    tagline: "Serve. Uplift. Connect.",
    statement: "Where campus energy turns outward, into work that actually",
    statementAccent: "matters",
    supporting:
      "Community service, social outreach, and volunteer drives that take SVCE's student energy beyond the campus gates and into the neighborhoods around it.",
    icon: (
      <svg width="380" height="380" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    name: "Health & Wellness",
    href: "/wellness",
    accentText: "text-teal-600",
    accentGrad: "from-teal-500 via-cyan-400 to-sky-300",
    iconColor: "text-teal-100",
    tagline: "Breathe. Balance. Belong.",
    statement: "Where taking care of yourself is treated like it actually",
    statementAccent: "matters",
    supporting:
      "Mental health support, fitness initiatives, and wellbeing programs built for the whole student body — because a good college experience needs more than just events.",
    icon: (
      <svg width="380" height="380" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    name: "Alumni",
    href: "/alumni",
    accentText: "text-indigo-600",
    accentGrad: "from-indigo-500 via-blue-400 to-cyan-300",
    iconColor: "text-indigo-100",
    tagline: "Connect. Guide. Give Back.",
    statement: "Where the students who came before you become the ones",
    statementAccent: "guiding you now",
    supporting:
      "Mentorship, networking, and alumni meets that connect current students with SVCE graduates working across every industry imaginable.",
    icon: (
      <svg width="380" height="380" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
        <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z" />
        <path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5" />
      </svg>
    ),
  },
];

export default function CouncilSlider() {
    return (
        <div className="relative w-full">
            <div className="text-center pt-8 pb-4">
                <span className="text-xs font-semibold tracking-[0.25em] uppercase text-gray-400">
                    Know Your Councils
                </span>
            </div>

            {councils.map((council, index) => (
                <div
                    key={council.name}
                    className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden bg-white"
                    style={{ zIndex: index + 1 }}
                >
                    {/* Giant watermark icon, tinted per council */}
                    <div className={`absolute inset-0 flex items-center justify-center ${council.iconColor} pointer-events-none`}>
                        {council.icon}
                    </div>

                    {/* Soft ambient glow behind text */}
                    <div className={`absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-br ${council.accentGrad} opacity-[0.08] blur-[130px] rounded-full`} />

                    <motion.div
                        initial={{ opacity: 0, y: 40, scale: 0.92 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: false, amount: 0.6 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="relative z-10 max-w-3xl mx-auto px-8 text-center"
                    >
                        <span className={`inline-block text-xs font-bold tracking-[0.3em] uppercase ${council.accentText} mb-5`}>
                            {council.tagline}
                        </span>

                        <h3 className={`text-6xl sm:text-8xl font-black tracking-tighter mb-8 bg-gradient-to-r ${council.accentGrad} bg-clip-text text-transparent`}>
                            {council.name}
                        </h3>

                        <div className="max-w-2xl mx-auto mb-10">
                            <p className="text-xl sm:text-2xl text-gray-900 leading-tight font-medium">
                                {council.statement}{" "}
                                <span className={`italic font-serif bg-gradient-to-r ${council.accentGrad} bg-clip-text text-transparent`}>
                                    {council.statementAccent}
                                </span>
                                .
                            </p>
                            <p className="mt-5 text-base sm:text-lg text-gray-500 leading-relaxed max-w-xl mx-auto">
                                {council.supporting}
                            </p>
                        </div>

                        <Link
                            href={council.href}
                            className="inline-flex items-center gap-2 bg-gray-950 text-white text-sm font-semibold px-8 py-4 rounded-full hover:scale-[1.05] transition-transform shadow-xl"
                        >
                            Explore {council.name}
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </motion.div>

                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                        {councils.map((_, i) => (
                            <span
                                key={i}
                                className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? `w-8 bg-gradient-to-r ${council.accentGrad}` : "w-1.5 bg-gray-200"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}