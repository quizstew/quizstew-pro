'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Search({ items }: { items: { title: string; desc: string; slug: string }[] }) {
  const [query, setQuery] = useState('');

  const filtered = items.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.desc.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="mb-10">
      <input
        type="text"
        placeholder="Search technical procedures..."
        className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {filtered.length === 0 ? (
        <p className="text-gray-400 text-sm mt-4">No procedures match &quot;{query}&quot;</p>
      ) : (
        <div className="grid gap-4 mt-6">
          {filtered.map((proc) => (
            <Link
              href={`/procedures/${proc.slug}`}
              key={proc.slug}
              className="block p-4 border border-gray-700 rounded hover:border-blue-500 transition"
            >
              <h3 className="text-blue-400 m-0">{proc.title}</h3>
              <p className="text-sm text-gray-400 m-0">{proc.desc}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
