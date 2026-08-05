"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { supabase } from "../../lib/supabaseClient";

type GalleryItem = { id: number; image_url: string; caption: string };

export default function DragGallery() {
    const [items, setItems] = useState<GalleryItem[]>([]);
    const [active, setActive] = useState<GalleryItem | null>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);

    useEffect(() => {
        async function fetchGallery() {
            const { data } = await supabase
                .from("life_gallery")
                .select("*")
                .limit(12);
            setItems(data || []);
        }
        fetchGallery();
    }, []);

    if (items.length === 0) return null;

    return (
        <div className="mt-28 w-full">
            <div className="max-w-5xl mx-auto px-6 mb-10 flex items-end justify-between">
                <div>
                    <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400">
                        Moments
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mt-3">
                        Life at SVCE SAC
                    </h2>
                </div>
                <p className="hidden sm:block text-sm text-gray-400">Drag to explore →</p>
            </div>

            {/* Draggable horizontal track */}
            <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={trackRef}>
                <motion.div
                    drag="x"
                    dragConstraints={trackRef}
                    dragElastic={0.08}
                    style={{ x }}
                    className="flex gap-4 px-6 w-max"
                >
                    {items.map((item, i) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.5, delay: i * 0.05 }}
                            whileHover={{ scale: 1.02 }}
                            onClick={() => setActive(item)}
                            className={`relative flex-shrink-0 rounded-3xl overflow-hidden cursor-pointer ${i % 3 === 0 ? "w-72 h-96" : "w-72 h-72"
                                }`}
                        >
                            <img
                                src={item.image_url}
                                alt={item.caption}
                                className="w-full h-full object-cover pointer-events-none"
                                draggable={false}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                                <p className="text-white text-sm font-medium">{item.caption}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Expand-on-click lightbox */}
            <AnimatePresence>
                {active && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setActive(null)}
                        className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-6 cursor-zoom-out"
                    >
                        <motion.div
                            layoutId={`gallery-${active.id}`}
                            initial={{ scale: 0.85, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.85, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            className="max-w-3xl w-full"
                        >
                            <img src={active.image_url} className="w-full rounded-2xl shadow-2xl" />
                            <p className="text-white/80 text-sm mt-4">{active.caption}</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}