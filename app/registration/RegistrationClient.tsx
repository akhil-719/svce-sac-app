"use client";

import { useState, useEffect } from "react";
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

function FloatingInput({
  label,
  value,
  onChange,
  error,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
}) {
  const [focused, setFocused] = useState(false);
  const floated = focused || value.length > 0;

  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`peer w-full bg-white border rounded-xl px-4 pt-6 pb-2 text-gray-900 focus:outline-none transition-colors ${
          error
            ? "border-red-400 focus:border-red-500"
            : focused
            ? "border-gray-900"
            : "border-gray-200"
        }`}
      />
      <motion.label
        animate={{
          top: floated ? 8 : 18,
          fontSize: floated ? "0.7rem" : "0.95rem",
          color: error ? "#ef4444" : focused ? "#111827" : "#9ca3af",
        }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className="absolute left-4 pointer-events-none font-medium"
      >
        {label}
      </motion.label>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-red-500 text-xs mt-1 pl-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function FloatingSelect({
  label,
  value,
  onChange,
  options,
  error,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  error?: string;
  disabled?: boolean;
}) {
  const floated = value.length > 0;

  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`w-full bg-white border rounded-xl px-4 pt-6 pb-2 text-gray-900 focus:outline-none transition-colors appearance-none disabled:bg-gray-50 disabled:text-gray-400 ${
          error ? "border-red-400" : "border-gray-200 focus:border-gray-900"
        }`}
      >
        <option value="" />
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <motion.label
        animate={{
          top: floated ? 8 : 18,
          fontSize: floated ? "0.7rem" : "0.95rem",
          color: error ? "#ef4444" : "#9ca3af",
        }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className="absolute left-4 pointer-events-none font-medium"
      >
        {label}
      </motion.label>
      <svg
        className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-red-500 text-xs mt-1 pl-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function AnimatedCheckmark() {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
      <motion.circle
        cx="36"
        cy="36"
        r="34"
        stroke="#22c55e"
        strokeWidth="3"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />
      <motion.path
        d="M22 37l10 10 18-20"
        stroke="#22c55e"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 0.5, ease: "easeInOut" }}
      />
    </svg>
  );
}

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
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  function validate(): boolean {
    const newErrors: Errors = {};
    if (!form.studentName.trim()) newErrors.studentName = "Name is required";
    if (!form.rollNumber.trim()) newErrors.rollNumber = "Roll number is required";
    else if (!/^[A-Za-z0-9]+$/.test(form.rollNumber.trim()))
      newErrors.rollNumber = "Letters and numbers only";
    if (!form.branch.trim()) newErrors.branch = "Branch is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      newErrors.email = "Enter a valid email";
    if (!form.category) newErrors.category = "Select a category";
    if (!form.eventTitle) newErrors.eventTitle = "Select an event";

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
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="bg-gray-50 rounded-2xl p-10 text-center flex flex-col items-center"
            >
              <AnimatedCheckmark />
              <p className="text-lg font-semibold text-gray-900 mt-5 mb-2">
                You're registered!
              </p>
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
              exit={{ opacity: 0, scale: 0.98 }}
              className="flex flex-col gap-4 bg-gray-50 rounded-2xl p-6 sm:p-8"
              noValidate
            >
              <FloatingInput
                label="Student Name"
                value={form.studentName}
                onChange={(v) => updateField("studentName", v)}
                error={errors.studentName}
              />
              <FloatingInput
                label="Roll Number"
                value={form.rollNumber}
                onChange={(v) => updateField("rollNumber", v)}
                error={errors.rollNumber}
              />
              <FloatingInput
                label="Branch / Department"
                value={form.branch}
                onChange={(v) => updateField("branch", v)}
                error={errors.branch}
              />
              <FloatingInput
                label="Email"
                type="email"
                value={form.email}
                onChange={(v) => updateField("email", v)}
                error={errors.email}
              />
              <FloatingSelect
                label="Category"
                value={form.category}
                onChange={(v) => {
                  updateField("category", v);
                  updateField("eventTitle", "");
                }}
                options={["Technical", "Cultural", "Sports"]}
                error={errors.category}
              />
              <FloatingSelect
                label={form.category ? "Event Selection" : "Select a category first"}
                value={form.eventTitle}
                onChange={(v) => updateField("eventTitle", v)}
                options={availableEvents}
                error={errors.eventTitle}
                disabled={!form.category}
              />

              <motion.button
                type="submit"
                disabled={status === "loading"}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="bg-black text-white rounded-xl py-3 mt-2 hover:bg-gray-800 transition-colors disabled:opacity-50 relative overflow-hidden"
              >
                <AnimatePresence mode="wait">
                  {status === "loading" ? (
                    <motion.span
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Submitting
                    </motion.span>
                  ) : (
                    <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      Register
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

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

export default function RegistrationClient() {
  return <RegistrationForm />;
}