import Link from 'next/link';

export default function Terms() {
  return (
    <div className="prose prose-invert lg:prose-xl py-8">
      <h1>Terms of Service</h1>
      <p className="text-gray-400">Last updated: February 2025</p>

      <section>
        <h2>1. Acceptance</h2>
        <p>
          By using this site you agree to these terms. If you do not agree, do not use the
          site.
        </p>
      </section>
      <section>
        <h2>2. Use of Content</h2>
        <p>
          Procedures and guides are provided for informational use. You are responsible for
          how you apply them to your own equipment and networks. We are not liable for any
          damage or loss resulting from following instructions on this site.
        </p>
      </section>
      <section>
        <h2>3. Changes</h2>
        <p>
          We may update these terms from time to time. Continued use of the site after
          changes constitutes acceptance of the updated terms.
        </p>
      </section>
      <section>
        <h2>4. Contact</h2>
        <p>
          Questions about these terms? Use our{' '}
          <Link href="/contact" className="text-emerald-400 hover:underline">
            contact form
          </Link>
          .
        </p>
      </section>

      <p className="mt-10 text-sm text-gray-400">
        <Link href="/legal/privacy" className="text-emerald-400 hover:underline">
          Privacy &amp; Cookie Policy
        </Link>
      </p>
    </div>
  );
}
