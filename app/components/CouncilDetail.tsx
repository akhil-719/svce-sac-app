"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../../lib/supabaseClient";

type Info = { full_name: string; description: string };
type Member = { id: number; name: string; role: string; photo_url: string };
type GalleryItem = { id: number; image_url: string; caption: string };

export default function CouncilDetail({ councilCode }: { councilCode: string }) {
  const [info, setInfo] = useState<Info | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAll() {
      const [{ data: infoData }, { data: memberData }, { data: galleryData }] =
        await Promise.all([
          supabase
            .from("council_info")
            .select("full_name, description")
            .eq("council_code", councilCode)
            .single(),
          supabase
            .from("council_members")
            .select("*")
            .eq("council", councilCode),
          supabase
            .from("council_gallery")
            .select("*")
            .eq("council", councilCode),
        ]);

      setInfo(infoData);
      setMembers(memberData || []);
      setGallery(galleryData || []);
    }

    fetchAll();
  }, [councilCode]);

  return (
    <motion.div
      key={councilCode}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="mt-8 w-full"
    >
      {/* Council header */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <h3 className="text-2xl font-bold text-gray-900">
          {info?.full_name || councilCode}
        </h3>
        <p className="text-gray-600 mt-2 leading-relaxed">
          {info?.description}
        </p>
      </div>

      {/* Gallery */}
      {gallery.length > 0 && (
        <div className="mb-12">
          <p className="text-sm font-semibold text-gray-500 tracking-wide uppercase text-center mb-4">
            Gallery
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-3xl mx-auto px-6">
            {gallery.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => setLightboxImage(item.image_url)}
                initial={{ opacity: 0, scale: 0.9 }}
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
        </div>
      )}

      {/* Members */}
      {members.length > 0 && (
        <div>
          <p className="text-sm font-semibold text-gray-500 tracking-wide uppercase text-center mb-6">
            Meet the Team
          </p>
          <div className="flex flex-wrap justify-center gap-8 max-w-3xl mx-auto px-6">
            {members.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.08 }}
                className="flex flex-col items-center text-center w-28"
              >
                <div className="w-20 h-20 rounded-full overflow-hidden shadow-md ring-2 ring-white">
                  <img
                    src={member.photo_url}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="mt-3 text-sm font-semibold text-gray-900">
                  {member.name}
                </p>
                <p className="text-xs text-gray-500">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Lightbox for enlarged gallery image */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-6 cursor-pointer"
          >
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={lightboxImage}
              className="max-w-full max-h-full rounded-2xl shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}