"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

type Info = { full_name: string; description: string };
type Member = { id: number; name: string; role: string; photo_url: string };
type GalleryItem = { id: number; image_url: string; caption: string; category: string };
type EventItem = {
  id: number;
  title: string;
  event_date: string;
  venue: string;
  poster_url: string;
};

function GalleryMarquee({
  items,
  onSelect,
}: {
  items: GalleryItem[];
  onSelect: (item: GalleryItem) => void;
}) {
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
        transition={{
          duration: items.length * 4,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {looped.map((item, i) => (
          <button
            key={`${item.id}-${i}`}
            onClick={() => onSelect(item)}
            className="relative flex-shrink-0 w-56 h-40 rounded-2xl overflow-hidden group/item"
          >
            <img
              src={item.image_url}
              alt={item.caption}
              className="w-full h-full object-cover transition-transform duration-300 group-hover/item:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover/item:bg-black/30 transition-colors duration-300 flex items-end p-3">
              <p className="text-white text-xs opacity-0 group-hover/item:opacity-100 transition-opacity duration-300">
                {item.caption}
              </p>
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

  useEffect(() => {
    async function fetchAll() {
      const [{ data: infoData }, { data: memberData }, { data: galleryData }, { data: eventData }] =
        await Promise.all([
          supabase
            .from("council_info")
            .select("full_name, description")
            .eq("council_code", councilCode)
            .single(),
          supabase.from("council_members").select("*").eq("council", councilCode),
          supabase.from("council_gallery").select("*").eq("council", councilCode),
          supabase
            .from("events")
            .select("*")
            .eq("council", councilCode)
            .order("event_date", { ascending: true }),
        ]);

      setInfo(infoData);
      setMembers(memberData || []);
      setGallery(galleryData || []);
      setEvents(eventData || []);
      setActiveFilter("All");
    }
    fetchAll();
  }, [councilCode]);

  const categories = [
    "All",
    ...Array.from(new Set(gallery.map((g) => g.category).filter(Boolean))),
  ];
  const filteredGallery =
    activeFilter === "All" ? gallery : gallery.filter((g) => g.category === activeFilter);

  const today = new Date().toISOString().split("T")[0];
  const upcomingEvents = events.filter((e) => e.event_date >= today);
  const recentEvents = events.filter((e) => e.event_date < today).reverse();

  return (
    <main className="relative min-h-screen pt-32 pb-20 overflow-hidden bg-white">
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-gradient-to-tr from-purple-500/15 via-pink-500/10 to-transparent blur-3xl rounded-full -z-10" />
      <div className="absolute bottom-[10%] left-[-15%] w-[500px] h-[500px] bg-gradient-to-tr from-blue-400/15 via-cyan-300/10 to-transparent blur-3xl rounded-full -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-2xl mx-auto text-center px-6 mb-16"
      >
        <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400 mb-3 block">
          SVCE SAC
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
          {info?.full_name || councilCode}
        </h1>
        <p className="mt-4 text-gray-600 leading-relaxed">{info?.description}</p>
      </motion.div>

      {members.length > 0 && (
        <div className="max-w-4xl mx-auto px-6 mb-20">
          <p className="text-sm font-semibold text-gray-400 tracking-wide uppercase text-center mb-8">
            Meet the Team
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {members.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                whileHover={{ y: -4 }}
                className="flex flex-col items-center text-center bg-gray-50 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-20 h-20 rounded-full overflow-hidden shadow-md ring-2 ring-white">
                  <img
                    src={member.photo_url}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="mt-3 text-sm font-semibold text-gray-900">{member.name}</p>
                <p className="text-xs text-gray-500">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {gallery.length > 0 && (
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-sm font-semibold text-gray-400 tracking-wide uppercase text-center mb-6">
            Gallery
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
                  activeFilter === cat
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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
                  <img
                    src={item.image_url}
                    alt={item.caption}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-end p-3">
                    <p className="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {item.caption}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
          )}
        </div>
      )}

      {events.length > 0 && (
        <div className="max-w-5xl mx-auto px-6 mt-20">
          {upcomingEvents.length > 0 && (
            <div className="mb-16">
              <p className="text-sm font-semibold text-gray-400 tracking-wide uppercase text-center mb-8">
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
                    whileHover={{ y: -4 }}
                    className="relative rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow bg-gray-50"
                  >
                    <div className="relative h-40">
                      <img
                        src={event.poster_url}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-3 left-3 bg-black text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {new Date(event.event_date).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                        })}
                      </span>
                    </div>
                    <div className="p-5">
                      <p className="font-semibold text-gray-900">{event.title}</p>
                      <p className="text-sm text-gray-500 mt-1">{event.venue}</p>
                      <Link
                        href={`/registration?event=${encodeURIComponent(event.title)}&council=${councilCode}`}
                        className="inline-block mt-4 bg-black text-white text-sm px-4 py-2 rounded-full hover:bg-gray-800 transition-colors"
                      >
                        Register Now
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {recentEvents.length > 0 && (
            <div>
              <p className="text-sm font-semibold text-gray-400 tracking-wide uppercase text-center mb-8">
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
                    className="relative rounded-2xl overflow-hidden shadow-sm bg-gray-50 opacity-90"
                  >
                    <div className="relative h-40">
                      <img
                        src={event.poster_url}
                        alt={event.title}
                        className="w-full h-full object-cover grayscale-[30%]"
                      />
                      <span className="absolute top-3 left-3 bg-white/90 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full">
                        {new Date(event.event_date).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
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