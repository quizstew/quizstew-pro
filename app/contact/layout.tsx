import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | RouterOS Hub',
  description:
    'Contact RouterOS Command Center. Suggest procedures, report errors, or get in touch.',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
