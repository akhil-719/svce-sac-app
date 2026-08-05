"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

type EventItem = { id: number; title: string; event_date: string; venue: string; poster_url: string; council: string };

export default function UpcomingEventsHome() {
  const [events, setEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    async function fetchEvents() {
      const today = new Date().toISOString().split("T")[0];
      const { data } = await supabase
        .from("events")
        .select("*")
        .gte("event_date", today)
        .order("event_date", { ascending: true })
        .limit(6);
      setEvents(data || []);
    }
    fetchEvents();
  }, []);

  if (events.length === 0) return null;

  return (
    <div className="mt-28 w-full max-w-5xl px-6">
      <div className="text-center mb-12">
        <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400">Don't Miss Out</span>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mt-3">Upcoming Events</h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            whileHover={{ y: -6 }}
            className="relative rounded-2xl overflow-hidden bg-gray-950 shadow-sm hover:shadow-xl transition-shadow group"
          >
            <div className="relative h-40">
              <img src={event.poster_url} alt={event.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent" />
              <span className="absolute top-3 left-3 bg-white text-gray-900 text-xs font-bold px-3 py-1 rounded-full">
                {new Date(event.event_date).toLocaleDateString("en-US", { day: "numeric", month: "short" })}
              </span>
              <span className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-full">
                {event.council}
              </span>
            </div>
            <div className="p-5">
              <p className="font-bold text-white">{event.title}</p>
              <p className="text-sm text-white/50 mt-1">{event.venue}</p>
              <Link
                href={`/registration?event=${encodeURIComponent(event.title)}&council=${event.council}`}
                className="inline-flex items-center gap-1.5 mt-4 bg-white text-gray-900 text-sm font-semibold px-4 py-2 rounded-full hover:bg-gray-100 transition-all"
              >
                Register Now
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}