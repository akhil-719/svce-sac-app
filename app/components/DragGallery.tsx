"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../../lib/supabaseClient";

type GalleryItem = { id: number; image_url: string; caption: string };

export default function DragGallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [index, setIndex] = useState(0);
  const [active, setActive] = useState<GalleryItem | null>(null);

  useEffect(() => {
    async function fetchGallery() {
      const { data } = await supabase.from("life_gallery").select("*").limit(10);
      setItems(data || []);
    }
    fetchGallery();
  }, []);

  if (items.length === 0) return null;

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
    <div className="mt-28 w-full max-w-5xl px-6">
      <div className="text-center mb-12">
        <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400">Moments</span>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mt-3">Life at SVCE SAC</h2>
      </div>

      <div className="relative h-[380px] sm:h-[440px] flex items-center justify-center" style={{ perspective: 1200 }}>
        {items.map((item, i) => {
          const offset = getOffset(i);
          if (Math.abs(offset) > 2) return null;
          return (
            <motion.div
              key={item.id}
              animate={{
                x: offset * 220,
                scale: offset === 0 ? 1 : 0.75,
                rotateY: offset * -35,
                opacity: Math.abs(offset) > 1 ? 0 : 1,
                zIndex: 10 - Math.abs(offset),
              }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => (offset === 0 ? setActive(item) : setIndex(i))}
              className="absolute w-64 sm:w-80 h-80 sm:h-96 rounded-3xl overflow-hidden cursor-pointer shadow-2xl"
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

      <div className="flex items-center justify-center gap-3 mt-8">
        <button onClick={prev} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <button onClick={next} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
        </button>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-6 cursor-zoom-out"
          >
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="max-w-2xl w-full">
              <img src={active.image_url} className="w-full rounded-2xl shadow-2xl" />
              <p className="text-white/80 text-sm mt-4">{active.caption}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}