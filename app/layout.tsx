import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import IntroLoader from "./components/IntroLoader";

export const metadata: Metadata = {
  title: "SVCE SAC | Student Activity Center - SVCE",
  description:
    "Official website of the Student Activity Center (SAC) at Sri Venkateswara College of Engineering (SVCE). Explore Technical, Cultural, and Sports councils, events, and registrations.",
  keywords: ["SVCE SAC", "SVCE Student Activity Center", "SVCE events", "SVCE college"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <IntroLoader>
          <Navbar />
          {children}
          <Footer />
        </IntroLoader>
      </body>
    </html>
  );
}