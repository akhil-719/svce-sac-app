"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../../lib/supabaseClient";

type Event = {
  id: number;
  title: string;
  council: string;
  event_date: string;
  venue: string;
};

export default function EventsList() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("event_date", { ascending: true });

      if (error) {
        console.error("Error fetching events:", error.message);
      } else {
        setEvents(data);
      }
      setLoading(false);
    }

    fetchEvents();
  }, []);

  if (loading) {
    return <p className="mt-16 text-gray-500">Loading events...</p>;
  }

  return (
    <div className="mt-16 w-full max-w-2xl px-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Upcoming Events
      </h2>
      <div className="grid gap-4">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-gray-50 rounded-2xl p-5 shadow-sm"
          >
            <p className="font-semibold text-gray-900">{event.title}</p>
            <p className="text-sm text-gray-600 mt-1">
              {event.council} • {event.venue}
            </p>
            <p className="text-sm text-gray-400 mt-1">{event.event_date}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}