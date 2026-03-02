'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="flex flex-col border-b border-surface-border bg-surface">
      <div className="flex items-center justify-between p-4 md:p-6">
        <Link
          href="/"
          className="font-bold text-lg md:text-xl text-gray-100 shrink-0"
          onClick={() => setOpen(false)}
        >
          RouterOS Hub
        </Link>

        {/* Desktop: inline links */}
        <div className="hidden md:flex gap-4 text-sm md:text-base">
          <Link href="/procedures" className="text-gray-300 hover:text-emerald-400 hover:underline">
            Procedures
          </Link>
          <Link href="/about" className="text-gray-300 hover:text-emerald-400 hover:underline">
            About
          </Link>
          <Link href="/contact" className="text-gray-300 hover:text-emerald-400 hover:underline">
            Contact
          </Link>
        </div>

        {/* Mobile: hamburger */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="md:hidden p-2 -mr-2 text-gray-300 hover:text-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 rounded"
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          {open ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile: dropdown links */}
      {open && (
        <div className="md:hidden border-t border-surface-border px-4 py-3 flex flex-col gap-2">
          <Link
            href="/procedures"
            className="text-gray-300 hover:text-emerald-400 py-2"
            onClick={() => setOpen(false)}
          >
            Procedures
          </Link>
          <Link
            href="/about"
            className="text-gray-300 hover:text-emerald-400 py-2"
            onClick={() => setOpen(false)}
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-gray-300 hover:text-emerald-400 py-2"
            onClick={() => setOpen(false)}
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}
