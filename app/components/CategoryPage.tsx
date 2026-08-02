"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";
import AnimatedBackground from "./AnimatedBackground";

type Info = { full_name: string; description: string };
type Member = { id: number; name: string; role: string; photo_url: string };
type GalleryItem = { id: number; image_url: string; caption: string; category: string };
type EventItem = { id: number; title: string; event_date: string; venue: string; poster_url: string };

const councilTheme: Record<string, { gradient: string; light: string; accent: string }> = {
  TLC: { gradient: "from-blue-500 via-cyan-400 to-teal-300", light: "bg-blue-50", accent: "text-blue-600" },
  CLC: { gradient: "from-pink-500 via-rose-400 to-orange-300", light: "bg-pink-50", accent: "text-pink-600" },
  SPC: { gradient: "from-emerald-500 via-green-400 to-lime-300", light: "bg-emerald-50", accent: "text-emerald-600" },
};

function GalleryMarquee({ items, onSelect }: { items: GalleryItem[]; onSelect: (item: GalleryItem) => void }) {
  const [isPaused, setIsPaused] = useState(false);
  const looped = [...items, ...items];

  return (
    <div
      className="relative w-full overflow-hidden py-2"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.div
        className="flex gap-4 w-max"
        animate={isPaused ? {} : { x: ["0%", "-50%"] }}
        transition={{ duration: items.length * 4, ease: "linear", repeat: Infinity }}
      >
        {looped.map((item, i) => (
          <button
            key={`${item.id}-${i}`}
            onClick={() => onSelect(item)}
            className="relative flex-shrink-0 w-56 h-40 rounded-2xl overflow-hidden group/item"
          >
            <img src={item.image_url} alt={item.caption} className="w-full h-full object-cover transition-transform duration-300 group-hover/item:scale-110" />
            <div className="absolute inset-0 bg-black/0 group-hover/item:bg-black/30 transition-colors duration-300 flex items-end p-3">
              <p className="text-white text-xs opacity-0 group-hover/item:opacity-100 transition-opacity duration-300">{item.caption}</p>
            </div>
          </button>
        ))}
      </motion.div>
    </div>
  );
}

export default function CategoryPage({ councilCode }: { councilCode: string }) {
  const [info, setInfo] = useState<Info | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [lightboxImage, setLightboxImage] = useState<GalleryItem | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");

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
      setActiveFilter("All");
    }
    fetchAll();
  }, [councilCode]);

  const categories = ["All", ...Array.from(new Set(gallery.map((g) => g.category).filter(Boolean)))];
  const filteredGallery = activeFilter === "All" ? gallery : gallery.filter((g) => g.category === activeFilter);

  const today = new Date().toISOString().split("T")[0];
  const upcomingEvents = events.filter((e) => e.event_date >= today);
  const recentEvents = events.filter((e) => e.event_date < today).reverse();

  return (
    <main className="relative min-h-screen pt-32 pb-20 overflow-hidden">
      <AnimatedBackground />

      {/* Elevated header, matching homepage hero language */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-2xl mx-auto text-center px-6 mb-8"
      >
        <span className={`inline-flex items-center gap-2 ${theme.light} ${theme.accent} text-xs font-semibold tracking-[0.15em] uppercase px-4 py-1.5 rounded-full mb-6`}>
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
          {councilCode} · SVCE SAC
        </span>

        <h1 className="text-5xl sm:text-6xl font-black tracking-tighter text-gray-900 leading-[1.05]">
          {(info?.full_name || councilCode).split(" ").map((word, i, arr) =>
            i === arr.length - 1 ? (
              <span key={i} className={`bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
                {word}
              </span>
            ) : (
              <span key={i}>{word} </span>
            )
          )}
        </h1>

        <div className="flex items-center gap-3 mt-6 mb-6 w-full max-w-xs mx-auto">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gray-300" />
          <span className="w-1.5 h-1.5 rotate-45 bg-gray-400" />
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gray-300" />
        </div>

        <div className="bg-white/70 backdrop-blur-md border border-white/80 shadow-sm rounded-2xl px-6 py-4">
          <p className="text-gray-700 leading-relaxed font-medium">{info?.description}</p>
        </div>
      </motion.div>

      {/* Team members */}
      {members.length > 0 && (
        <div className="max-w-4xl mx-auto px-6 mb-20 mt-16">
          <p className="text-xs font-semibold text-gray-400 tracking-[0.2em] uppercase text-center mb-8">
            Meet the Team
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
            {members.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                whileHover={{ y: -6 }}
                className="relative flex flex-col items-center text-center bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-shadow group"
              >
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${theme.gradient} opacity-0 group-hover:opacity-[0.06] transition-opacity duration-300`} />
                <div className="relative w-20 h-20 rounded-full overflow-hidden shadow-md ring-2 ring-white z-10">
                  <img src={member.photo_url} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <p className="relative z-10 mt-3 text-sm font-bold text-gray-900">{member.name}</p>
                <p className={`relative z-10 text-xs font-medium ${theme.accent}`}>{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Gallery */}
      {gallery.length > 0 && (
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs font-semibold text-gray-400 tracking-[0.2em] uppercase text-center mb-6">
            Gallery
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === cat
                    ? `bg-gradient-to-r ${theme.gradient} text-white`
                    : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {activeFilter === "All" ? (
            <GalleryMarquee items={gallery} onSelect={setLightboxImage} />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {filteredGallery.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => setLightboxImage(item)}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.06 }}
                  whileHover={{ scale: 1.03 }}
                  className="relative aspect-square overflow-hidden rounded-2xl group"
                >
                  <img src={item.image_url} alt={item.caption} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-end p-3">
                    <p className="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">{item.caption}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Events */}
      {events.length > 0 && (
        <div className="max-w-5xl mx-auto px-6 mt-20">
          {upcomingEvents.length > 0 && (
            <div className="mb-16">
              <p className="text-xs font-semibold text-gray-400 tracking-[0.2em] uppercase text-center mb-8">
                Upcoming Events
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    whileHover={{ y: -6 }}
                    className="relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow bg-gray-950 group"
                  >
                    <div className="relative h-40">
                      <img src={event.poster_url} alt={event.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent" />
                      <span className={`absolute top-3 left-3 bg-gradient-to-r ${theme.gradient} text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg`}>
                        {new Date(event.event_date).toLocaleDateString("en-US", { day: "numeric", month: "short" })}
                      </span>
                    </div>
                    <div className="p-5">
                      <p className="font-bold text-white">{event.title}</p>
                      <p className="text-sm text-white/50 mt-1">{event.venue}</p>
                      <Link
                        href={`/registration?event=${encodeURIComponent(event.title)}&council=${councilCode}`}
                        className="inline-flex items-center gap-1.5 mt-4 bg-white text-gray-900 text-sm font-semibold px-4 py-2 rounded-full hover:bg-gray-100 transition-all hover:scale-[1.03]"
                      >
                        Register Now
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {recentEvents.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-400 tracking-[0.2em] uppercase text-center mb-8">
                Recent Events
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    className="relative rounded-2xl overflow-hidden shadow-sm bg-white border border-gray-100"
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
                  </motion.div>
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
            className="fixed inset-0 bg-black/85 z-[100] flex items-center justify-center p-6 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="max-w-2xl w-full"
            >
              <img src={lightboxImage.image_url} className="w-full rounded-2xl shadow-2xl" />
              <p className="text-white/80 text-sm text-center mt-4">{lightboxImage.caption}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}