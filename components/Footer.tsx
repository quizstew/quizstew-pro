import Link from 'next/link';
import FooterDisclaimer from './FooterDisclaimer';

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50/80 px-6 py-4 mt-auto">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 text-sm text-gray-500">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <span>© {year} RouterOS Command Center</span>
        <span className="flex items-center gap-6">
          <Link href="/legal/terms" className="hover:text-gray-900">
            Terms
          </Link>
          <Link href="/legal/privacy" className="hover:text-gray-900">
            Privacy
          </Link>
        </span>
        </div>
        <FooterDisclaimer />
      </div>
    </footer>
  );
}
