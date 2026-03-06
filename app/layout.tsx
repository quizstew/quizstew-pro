import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import FooterDisclaimer from "@/components/FooterDisclaimer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RouterOS Command Center",
  description: "Professional recovery & diagnostic workflows for RouterOS.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden min-h-screen`} style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
        <Navbar />
        <main className="w-full px-4 md:px-8 lg:max-w-4xl mx-auto overflow-x-hidden">
          {children}
        </main>
        <footer className="p-4 md:p-6 border-t border-surface-border mt-10 text-center text-sm text-gray-400">
          <div className="flex flex-col sm:flex-row sm:justify-center sm:items-center gap-2">
            <span>© 2026 RouterOS Command Center</span>
            <span className="hidden sm:inline">|</span>
            <Link href="/legal/privacy" className="text-emerald-400 hover:underline">Privacy</Link>
          </div>
          <FooterDisclaimer />
        </footer>
      </body>
    </html>
  );
}
