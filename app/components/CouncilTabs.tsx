"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import CouncilDetail from "./CouncilDetail";

const councils = [
  { code: "TLC", name: "Technical" },
  { code: "CLC", name: "Cultural" },
  { code: "SPC", name: "Sports" },
  { code: "SMC", name: "Social Media" },
  { code: "ALC", name: "Alumni" },
  { code: "NSS", name: "NSS" },
];

export default function CouncilTabs() {
  const [activeCode, setActiveCode] = useState(councils[0].code);

  return (
    <div className="mt-16 w-full max-w-4xl px-6">
      <div className="flex flex-wrap justify-center gap-2">
        {councils.map((council) => (
          <button
            key={council.code}
            onClick={() => setActiveCode(council.code)}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              activeCode === council.code
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {council.name}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <CouncilDetail key={activeCode} councilCode={activeCode} />
      </AnimatePresence>
    </div>
  );
}