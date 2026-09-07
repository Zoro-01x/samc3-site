import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "AI Systems for Surat Textile & Diamond Businesses | Sam",
  description:
    "I build AI software for Surat businesses — textile shops, diamond traders, manufacturers. WhatsApp automation, inventory systems, AI tools that run your business while you sleep. Talk to me on WhatsApp or Instagram.",
  keywords: [
    "AI software Surat",
    "textile business software",
    "diamond trading software Surat",
    "WhatsApp automation",
    "AI systems Surat",
    "business software Gujarat",
    "inventory management Surat",
    "Sam AI architect",
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
