import type { Metadata } from "next";
import { Suspense } from "react";
import RegistrationClient from "./RegistrationClient";

export const metadata: Metadata = {
  title: "Event Registration | SVCE SAC",
  description: "Register for upcoming Technical, Cultural, and Sports events at SVCE SAC.",
};

export default function RegistrationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <RegistrationClient />
    </Suspense>
  );
}