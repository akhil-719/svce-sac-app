"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

type Info = { full_name: string; description: string };
type Member = { id: number; name: string; role: string; photo_url: string };
type GalleryItem = { id: number; image_url: string; caption: string; category: string };
type EventItem = { id: number; title: string; event_date: string; venue: string; poster_url: string };

type CouncilThemeData = {
  name: string;
  tagline: string;
  statement: string;
  statementAccent: string;
  accentText: string;
  accentGrad: string;
  iconColor: string;
  icon: React.ReactNode;
};

const councilTheme: Record<string, CouncilThemeData> = {
  TLC: {
    name: "Technical",
    tagline: "Build. Break. Ship.",
    statement: "Where curiosity turns into code, and code turns into",
    statementAccent: "something real",
    accentText: "text-blue-600",
    accentGrad: "from-blue-500 via-cyan-400 to-teal-300",
    iconColor: "text-blue-400",
    icon: (
      <svg width="420" height="420" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  CLC: {
    name: "Cultural",
    tagline: "Create. Perform. Celebrate.",
    statement: "Where the stage belongs to whoever's brave enough to",
    statementAccent: "take it",
    accentText: "text-pink-600",
    accentGrad: "from-pink-500 via-rose-400 to-orange-300",
    iconColor: "text-pink-400",
    icon: (
      <svg width="420" height="420" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
  },
  SPC: {
    name: "Sports",
    tagline: "Train. Compete. Win.",
    statement: "Where discipline meets rivalry, every single",
    statementAccent: "season",
    accentText: "text-emerald-600",
    accentGrad: "from-emerald-500 via-green-400 to-lime-300",
    iconColor: "text-emerald-400",
    icon: (
      <svg width="420" height="420" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z" />
        <path d="M2 12h20" />
      </svg>
    ),
  },
};

function CoverflowGallery({
  items,
  onSelect,
}: {
  items: GalleryItem[];
  onSelect: (item: GalleryItem) => void;
}) {
  const [index, setIndex] = useState(0);

  function next() {
    setIndex((i) => (i + 1) % items.length);
  }
  function prev() {
    setIndex((i) => (i - 1 + items.length) % items.length);
  }
  function getOffset(i: number) {
    let offset = i - index;
    if (offset > items.length / 2) offset -= items.length;
    if (offset < -items.length / 2) offset += items.length;
    return offset;
  }

  return (
    <div>
      <div className="relative h-[340px] sm:h-[400px] flex items-center justify-center" style={{ perspective: 1200 }}>
        {items.map((item, i) => {
          const offset = getOffset(i);
          if (Math.abs(offset) > 2) return null;
          return (
            <motion.div
              key={item.id}
              animate={{
                x: offset * 200,
                scale: offset === 0 ? 1 : 0.75,
                rotateY: offset * -35,
                opacity: Math.abs(offset) > 1 ? 0 : 1,
                zIndex: 10 - Math.abs(offset),
              }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => (offset === 0 ? onSelect(item) : setIndex(i))}
              className="absolute w-56 sm:w-72 h-72 sm:h-80 rounded-3xl overflow-hidden cursor-pointer shadow-2xl"
            >
              <img src={item.image_url} alt={item.caption} className="w-full h-full object-cover" draggable={false} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              {offset === 0 && (
                <p className="absolute bottom-4 left-4 right-4 text-white text-sm font-medium">{item.caption}</p>
              )}
            </motion.div>
          );
        })}
      </div>
      <div className="flex items-center justify-center gap-3 mt-6">
        <button onClick={prev} className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <button onClick={next} className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
        </button>
      </div>
    </div>
  );
}

export default function CategoryPage({ councilCode }: { councilCode: string }) {
  const [info, setInfo] = useState<Info | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [lightboxImage, setLightboxImage] = useState<GalleryItem | null>(null);

  const theme = councilTheme[councilCode] || councilTheme.TLC;

  useEffect(() => {
    async function fetchAll() {
      const [{ data: infoData }, { data: memberData }, { data: galleryData }, { data: eventData }] =
        await Promise.all([
          supabase.from("council_info").select("full_name, description").eq("council_code", councilCode).single(),
          supabase.from("council_members").select("*").eq("council", councilCode),
          supabase.from("council_gallery").select("*").eq("council", councilCode),
          supabase.from("events").select("*").eq("council", councilCode).order("event_date", { ascending: true }),
        ]);

      setInfo(infoData);
      setMembers(memberData || []);
      setGallery(galleryData || []);
      setEvents(eventData || []);
    }
    fetchAll();
  }, [councilCode]);

  const today = new Date().toISOString().split("T")[0];
  const upcomingEvents = events.filter((e) => e.event_date >= today);
  const recentEvents = events.filter((e) => e.event_date < today).reverse();

  return (
    <main className="relative min-h-screen bg-white overflow-hidden">
      {/* Watermark icon — fixed to viewport so it stays put while scrolling, but scoped correctly */}
      <div className={`pointer-events-none fixed inset-0 -z-10 flex items-center justify-center opacity-[0.12] ${theme.iconColor}`}>
        {theme.icon}
      </div>
      <div
        className={`pointer-events-none fixed top-1/4 left-1/2 -z-10 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-gradient-to-br ${theme.accentGrad} opacity-[0.08] blur-[130px]`}
      />

      {/* Hero header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-3xl mx-auto text-center px-6 pt-40 pb-20"
      >
        <span className={`inline-block text-xs font-bold tracking-[0.3em] uppercase ${theme.accentText} mb-5`}>
          {theme.tagline}
        </span>

        <h1 className={`text-6xl sm:text-8xl font-black tracking-tighter mb-8 bg-gradient-to-r ${theme.accentGrad} bg-clip-text text-transparent`}>
          {theme.name}
        </h1>

        <div className="max-w-2xl mx-auto">
          <p className="text-xl sm:text-2xl text-gray-900 leading-tight font-medium">
            {theme.statement}{" "}
            <span className={`italic font-serif bg-gradient-to-r ${theme.accentGrad} bg-clip-text text-transparent`}>
              {theme.statementAccent}
            </span>
            .
          </p>
          <p className="mt-5 text-base sm:text-lg text-gray-500 leading-relaxed">
            {info?.description}
          </p>
        </div>
      </motion.div>

      {/* Team members */}
      {members.length > 0 && (
        <div className="max-w-4xl mx-auto px-6 mb-24 relative">
          <p className="text-xs font-semibold text-gray-400 tracking-[0.25em] uppercase text-center mb-10">
            Meet the Team
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {members.map((member) => (
              <div
                key={member.id}
                className="relative bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-shadow border border-gray-50 group overflow-hidden"
              >
                <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${theme.accentGrad} opacity-0 group-hover:opacity-20 rounded-full blur-2xl transition-opacity duration-500`} />
                <div className="relative flex flex-col items-center text-center">
                  <div className={`relative w-24 h-24 rounded-full p-[3px] bg-gradient-to-br ${theme.accentGrad} mb-4`}>
                    <div className="w-full h-full rounded-full overflow-hidden bg-white p-[2px]">
                      <img src={member.photo_url} alt={member.name} className="w-full h-full object-cover rounded-full" />
                    </div>
                  </div>
                  <p className="font-bold text-gray-900 text-sm">{member.name}</p>
                  <span className={`text-xs font-semibold ${theme.accentText} mt-1`}>{member.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Gallery */}
      {gallery.length > 0 && (
        <div className="max-w-5xl mx-auto px-6 mb-24 relative">
          <p className="text-xs font-semibold text-gray-400 tracking-[0.25em] uppercase text-center mb-10">
            Gallery
          </p>
          <CoverflowGallery items={gallery} onSelect={setLightboxImage} />
        </div>
      )}

      {/* Events */}
      {events.length > 0 && (
        <div className="max-w-5xl mx-auto px-6 mb-24 relative">
          {upcomingEvents.length > 0 && (
            <div className="mb-16">
              <p className="text-xs font-semibold text-gray-400 tracking-[0.25em] uppercase text-center mb-10">
                Upcoming Events
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow bg-gray-950 group"
                  >
                    <div className="relative h-44">
                      <img src={event.poster_url} alt={event.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent" />
                      <span className={`absolute top-3 left-3 bg-gradient-to-r ${theme.accentGrad} text-gray-950 text-xs font-bold px-3 py-1 rounded-full shadow-lg`}>
                        {new Date(event.event_date).toLocaleDateString("en-US", { day: "numeric", month: "short" })}
                      </span>
                    </div>
                    <div className="p-6">
                      <p className="font-bold text-white text-lg">{event.title}</p>
                      <p className="text-sm text-white/50 mt-1">{event.venue}</p>
                      <Link
                        href={`/registration?event=${encodeURIComponent(event.title)}&council=${councilCode}`}
                        className="inline-flex items-center gap-1.5 mt-5 bg-white text-gray-900 text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-gray-100 hover:scale-[1.03] transition-all"
                      >
                        Register Now
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {recentEvents.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-400 tracking-[0.25em] uppercase text-center mb-10">
                Recent Events
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentEvents.map((event) => (
                  <div
                    key={event.id}
                    className="relative rounded-3xl overflow-hidden shadow-md bg-white border border-gray-100"
                  >
                    <div className="relative h-40">
                      <img src={event.poster_url} alt={event.title} className="w-full h-full object-cover grayscale-[40%]" />
                      <span className="absolute top-3 left-3 bg-white/90 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full">
                        {new Date(event.event_date).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}
                      </span>
                    </div>
                    <div className="p-5">
                      <p className="font-semibold text-gray-900">{event.title}</p>
                      <p className="text-sm text-gray-500 mt-1">{event.venue}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-6 cursor-zoom-out"
          >
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="max-w-2xl w-full">
              <img src={lightboxImage.image_url} className="w-full rounded-2xl shadow-2xl" />
              <p className="text-white/80 text-sm mt-4">{lightboxImage.caption}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}