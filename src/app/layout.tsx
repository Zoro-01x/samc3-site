import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Sam — AI Systems Architect",
  description:
    "I build AI systems that don't need me to explain them. A site that documents how it was built, while I use it.",
  keywords: [
    "AI Systems Architect",
    "Sam",
    "Surat Textile OS",
    "AI Handover Kit",
    "Founder's OS",
    "systems thinking",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen antialiased flex flex-col">
        <Nav />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
