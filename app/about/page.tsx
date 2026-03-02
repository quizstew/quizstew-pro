import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About | RouterOS Hub',
  description:
    'Why RouterOS Command Center exists. Field-tested recovery protocols and diagnostic workflows for RouterOS v7+.',
};

export default function About() {
  return (
    <div className="prose prose-invert lg:prose-xl py-8">
      <h1>Why This Exists</h1>
      <p className="text-emerald-400 font-medium">The Founder&apos;s Story</p>

      <p>
        This hub consolidates field-tested recovery protocols and diagnostic workflows that
        I&apos;ve used on RouterOS for years. The goal is simple: one place to go when a device
        is bricked, a VLAN is misbehaving, or a tunnel needs to come up fast.
      </p>
      <p>
        The procedures and diagrams here are optimized for RouterOS v7+. They&apos;re written
        for people who already have their hands on the hardware and need clear, repeatable steps—
        not marketing fluff.
      </p>
      <p>
        If you want to suggest a procedure or report an error, use the{' '}
        <Link href="/contact" className="text-emerald-400 hover:underline">
          contact form
        </Link>
        .
      </p>
    </div>
  );
}
