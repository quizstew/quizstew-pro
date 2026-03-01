import Link from 'next/link';
import { directory } from '@/content/procedures/registry';

export default function Home() {
  return (
    <div className="prose prose-invert lg:prose-xl py-8">
      <h1>Mikrotik Command Center</h1>
      <p>
        Professional recovery &amp; diagnostic workflows.{' '}
        <Link href="/about" className="text-emerald-400 hover:underline">
          Why this exists
        </Link>
        .
      </p>

      <h2>Procedures</h2>
      <Link href="/procedures/netinstall" className="text-emerald-400 font-bold block">
        Netinstall Recovery Protocol →
      </Link>
      <ul className="space-y-2 mt-4">
        {directory.map((proc) => (
          <li key={proc.slug}>
            <span className="text-gray-500 mr-2">[{proc.category}]</span>
            <Link
              href={`/procedures/${proc.slug}`}
              className="text-emerald-400 hover:underline"
            >
              {proc.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
