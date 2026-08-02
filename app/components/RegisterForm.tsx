"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../../lib/supabaseClient";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    const { error } = await supabase.from("registrations").insert({
      student_name: name,
      email: email,
      event_title: eventTitle,
    });

    if (error) {
      console.error(error.message);
      setStatus("error");
    } else {
      setStatus("success");
      setName("");
      setEmail("");
      setEventTitle("");
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mt-16 w-full max-w-md px-6"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Register for an Event
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
        />
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
        />
        <input
          type="text"
          placeholder="Event name (e.g. Hackathon 2026)"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
          required
          className="border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
        />

        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-black text-white rounded-xl py-2 mt-2 hover:bg-gray-800 disabled:opacity-50"
        >
          {status === "loading" ? "Submitting..." : "Register"}
        </button>

        {status === "success" && (
          <p className="text-green-600 text-sm text-center mt-2">
            Registered successfully!
          </p>
        )}
        {status === "error" && (
          <p className="text-red-600 text-sm text-center mt-2">
            Something went wrong. Try again.
          </p>
        )}
      </form>
    </motion.div>
  );
}