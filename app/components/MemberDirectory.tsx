"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../../lib/supabaseClient";

type Member = {
  id: number;
  name: string;
  role: string;
  department: string;
  council: string;
};

export default function MemberDirectory() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMembers() {
      const { data, error } = await supabase
        .from("student_body")
        .select("*")
        .order("name", { ascending: true });

      if (error) {
        console.error("Error fetching members:", error.message);
      } else {
        setMembers(data);
      }
      setLoading(false);
    }

    fetchMembers();
  }, []);

  if (loading) {
    return <p className="mt-16 text-gray-500">Loading members...</p>;
  }

  return (
    <div className="mt-16 w-full max-w-3xl px-6">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="text-2xl font-bold text-gray-900 mb-6 text-center"
      >
        Leadership & Faculty
      </motion.h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {members.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="bg-white/70 backdrop-blur-md rounded-2xl p-5 shadow-sm border border-gray-100"
          >
            <p className="font-semibold text-gray-900">{member.name}</p>
            <p className="text-sm text-gray-600">{member.role} • {member.council}</p>
            <p className="text-xs text-gray-400 mt-1">{member.department}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}