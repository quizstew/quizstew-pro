import Link from 'next/link';
import { procedureList } from '@/content/procedures/registry';

export default function Sidebar() {
  return (
    <aside className="w-56 shrink-0 border-r border-gray-200 bg-gray-50/80 min-h-screen py-6 px-4">
      <Link href="/" className="block mb-6">
        <span className="font-bold text-gray-900 text-lg">RouterOS</span>
        <span className="font-semibold text-gray-600 text-lg"> Command Center</span>
      </Link>
      <nav className="space-y-1">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2">
          Site
        </p>
        <Link href="/" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition-colors">
          Home
        </Link>
        <Link href="/about" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition-colors">
          About
        </Link>
        <Link href="/contact" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition-colors">
          Contact
        </Link>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mt-4 mb-2">
          Procedures
        </p>
        {procedureList.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition-colors"
          >
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
