import type { Metadata } from "next";
import RegistrationClient from "./RegistrationClient";

export const metadata: Metadata = {
  title: "Event Registration | SVCE SAC",
  description: "Register for upcoming Technical, Cultural, and Sports events at SVCE SAC.",
};

export default function RegistrationPage() {
  return <RegistrationClient />;
}