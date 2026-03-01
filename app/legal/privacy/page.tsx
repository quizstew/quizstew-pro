import Link from 'next/link';

export default function Privacy() {
  return (
    <div className="prose prose-invert lg:prose-xl py-8">
      <h1>Privacy &amp; Cookie Policy</h1>
      <p className="text-gray-400">Last updated: February 2025</p>

      <section>
        <h2>1. Information We Collect</h2>
        <p>
          We may collect information you provide when contacting us (e.g. name, email,
          message). We do not sell this information to third parties.
        </p>
      </section>
      <section>
        <h2>2. Cookies</h2>
        <p>
          This site may use essential cookies for operation (e.g. session or preferences).
          We aim to keep use minimal and do not use third-party advertising cookies.
        </p>
      </section>
      <section>
        <h2>3. How We Use Information</h2>
        <p>
          Information you submit is used to respond to inquiries and improve the site. We
          do not use it for marketing unless you have opted in.
        </p>
      </section>
      <section>
        <h2>4. Your Rights</h2>
        <p>
          You may ask us what data we hold about you and request correction or deletion.
          Contact us via the contact page to do so.
        </p>
      </section>
      <section>
        <h2>5. Changes</h2>
        <p>
          We may update this policy from time to time. The &quot;Last updated&quot; date at
          the top reflects the latest version.
        </p>
      </section>

      <p className="mt-10 text-sm text-gray-400">
        <Link href="/legal/terms" className="text-emerald-400 hover:underline">
          Terms of Service
        </Link>
      </p>
    </div>
  );
}
