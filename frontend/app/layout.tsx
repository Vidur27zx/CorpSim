import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/shared/providers";

export const metadata: Metadata = {
  title: "CorpSim AI — Experience Corporate Life Before Your First Day",
  description:
    "AI-powered corporate simulation platform. Practice real day-to-day work through immersive simulations with AI-generated emails, meetings, and stakeholder interactions.",
  keywords: [
    "corporate simulation",
    "career readiness",
    "AI interview",
    "business analyst training",
    "corporate readiness score",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-surface-darker antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
