"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../../lib/supabaseClient";

const categoryEvents: Record<string, string[]> = {
  Technical: ["Hackathon 2026", "Coding Contest", "Tech Talk Series"],
  Cultural: ["Annual Fest", "Dance Competition", "Music Night"],
  Sports: ["Inter-College Meet", "Cricket Tournament", "Athletics Day"],
};

const councilToCategory: Record<string, string> = {
  TLC: "Technical",
  CLC: "Cultural",
  SPC: "Sports",
};

type FormData = {
  studentName: string;
  rollNumber: string;
  branch: string;
  email: string;
  category: string;
  eventTitle: string;
};

type Errors = Partial<Record<keyof FormData, string>>;

function RegistrationForm() {
  const searchParams = useSearchParams();

  const [form, setForm] = useState<FormData>({
    studentName: "",
    rollNumber: "",
    branch: "",
    email: "",
    category: "",
    eventTitle: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  // Pre-fill from URL params (?event=...&council=...) coming from "Register Now" buttons
  useEffect(() => {
    const eventParam = searchParams.get("event");
    const councilParam = searchParams.get("council");
    const categoryFromCouncil = councilParam ? councilToCategory[councilParam] : "";

    if (eventParam || categoryFromCouncil) {
      setForm((prev) => ({
        ...prev,
        eventTitle: eventParam || prev.eventTitle,
        category: categoryFromCouncil || prev.category,
      }));
    }
  }, [searchParams]);

  function updateField(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Clear that field's error the moment the user starts fixing it
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  function validate(): boolean {
    const newErrors: Errors = {};

    if (!form.studentName.trim()) {
      newErrors.studentName = "Name is required";
    }

    if (!form.rollNumber.trim()) {
      newErrors.rollNumber = "Roll number is required";
    } else if (!/^[A-Za-z0-9]+$/.test(form.rollNumber.trim())) {
      newErrors.rollNumber = "Roll number should only contain letters and numbers";
    }

    if (!form.branch.trim()) {
      newErrors.branch = "Branch/Department is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      newErrors.email = "Enter a valid email address";
    }

    if (!form.category) {
      newErrors.category = "Please select a category";
    }

    if (!form.eventTitle) {
      newErrors.eventTitle = "Please select an event";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validate()) return;

    setStatus("loading");

    const { error } = await supabase.from("registrations").insert({
      student_name: form.studentName.trim(),
      roll_number: form.rollNumber.trim(),
      branch: form.branch.trim(),
      email: form.email.trim(),
      category: form.category,
      event_title: form.eventTitle,
    });

    if (error) {
      console.error(error.message);
      setStatus("error");
    } else {
      setStatus("success");
      setForm({
        studentName: "",
        rollNumber: "",
        branch: "",
        email: "",
        category: "",
        eventTitle: "",
      });
    }
  }

  const availableEvents = form.category ? categoryEvents[form.category] || [] : [];

  return (
    <main className="relative min-h-screen pt-32 pb-20 flex flex-col items-center overflow-hidden bg-white">
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-gradient-to-tr from-purple-500/15 via-pink-500/10 to-transparent blur-3xl rounded-full -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-gradient-to-tr from-blue-400/15 via-cyan-300/10 to-transparent blur-3xl rounded-full -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center px-6 mb-10"
      >
        <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400 mb-3 block">
          SVCE SAC
        </span>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Event Registration</h1>
        <p className="mt-3 text-gray-600 max-w-md mx-auto">
          Fill in your details below to register for an upcoming event.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="w-full max-w-md px-6"
      >
        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gray-50 rounded-2xl p-8 text-center"
            >
              <p className="text-lg font-semibold text-gray-900 mb-2">You're registered!</p>
              <p className="text-sm text-gray-600">
                A confirmation has been recorded. See you at the event!
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-6 text-sm text-gray-600 underline hover:text-black"
              >
                Register for another event
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col gap-4 bg-gray-50 rounded-2xl p-6 sm:p-8"
              noValidate
            >
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Student Name
                </label>
                <input
                  type="text"
                  value={form.studentName}
                  onChange={(e) => updateField("studentName", e.target.value)}
                  className={`w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 ${
                    errors.studentName
                      ? "border-red-400 focus:ring-red-300"
                      : "border-gray-200 focus:ring-black"
                  }`}
                  placeholder="Full name"
                />
                {errors.studentName && (
                  <p className="text-red-500 text-xs mt-1">{errors.studentName}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Roll Number
                </label>
                <input
                  type="text"
                  value={form.rollNumber}
                  onChange={(e) => updateField("rollNumber", e.target.value)}
                  className={`w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 ${
                    errors.rollNumber
                      ? "border-red-400 focus:ring-red-300"
                      : "border-gray-200 focus:ring-black"
                  }`}
                  placeholder="e.g. 21A91A0501"
                />
                {errors.rollNumber && (
                  <p className="text-red-500 text-xs mt-1">{errors.rollNumber}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Branch / Department
                </label>
                <input
                  type="text"
                  value={form.branch}
                  onChange={(e) => updateField("branch", e.target.value)}
                  className={`w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 ${
                    errors.branch
                      ? "border-red-400 focus:ring-red-300"
                      : "border-gray-200 focus:ring-black"
                  }`}
                  placeholder="e.g. CSE, ECE, IT"
                />
                {errors.branch && <p className="text-red-500 text-xs mt-1">{errors.branch}</p>}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className={`w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 ${
                    errors.email
                      ? "border-red-400 focus:ring-red-300"
                      : "border-gray-200 focus:ring-black"
                  }`}
                  placeholder="you@example.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => {
                    updateField("category", e.target.value);
                    updateField("eventTitle", ""); // reset event choice when category changes
                  }}
                  className={`w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 bg-white ${
                    errors.category
                      ? "border-red-400 focus:ring-red-300"
                      : "border-gray-200 focus:ring-black"
                  }`}
                >
                  <option value="">Select category</option>
                  <option value="Technical">Technical</option>
                  <option value="Cultural">Cultural</option>
                  <option value="Sports">Sports</option>
                </select>
                {errors.category && (
                  <p className="text-red-500 text-xs mt-1">{errors.category}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Event Selection
                </label>
                <select
                  value={form.eventTitle}
                  onChange={(e) => updateField("eventTitle", e.target.value)}
                  disabled={!form.category}
                  className={`w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 bg-white disabled:bg-gray-100 disabled:text-gray-400 ${
                    errors.eventTitle
                      ? "border-red-400 focus:ring-red-300"
                      : "border-gray-200 focus:ring-black"
                  }`}
                >
                  <option value="">
                    {form.category ? "Select event" : "Select a category first"}
                  </option>
                  {availableEvents.map((ev) => (
                    <option key={ev} value={ev}>
                      {ev}
                    </option>
                  ))}
                  {/* Keep a URL-prefilled event visible even if it's not in the static list */}
                  {form.eventTitle && !availableEvents.includes(form.eventTitle) && (
                    <option value={form.eventTitle}>{form.eventTitle}</option>
                  )}
                </select>
                {errors.eventTitle && (
                  <p className="text-red-500 text-xs mt-1">{errors.eventTitle}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-black text-white rounded-xl py-2.5 mt-2 hover:bg-gray-800 transition-colors disabled:opacity-50"
              >
                {status === "loading" ? "Submitting..." : "Register"}
              </button>

              {status === "error" && (
                <p className="text-red-600 text-sm text-center">
                  Something went wrong. Please try again.
                </p>
              )}
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </main>
  );
}

export default function RegistrationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <RegistrationForm />
    </Suspense>
  );
}