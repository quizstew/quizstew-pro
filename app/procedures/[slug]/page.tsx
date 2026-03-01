// app/procedures/[slug]/page.tsx
import { notFound } from 'next/navigation';

type Props = { params: Promise<{ slug: string }> };

const guides = ['netinstall', 'vpn-tunnels', 'firewall-rules'];

export function generateStaticParams() {
  return guides.map((slug) => ({ slug }));
}

export default async function ProcedurePage({ params }: Props) {
  const { slug } = await params;

  if (!guides.includes(slug)) {
    notFound();
  }

  return (
    <article className="prose prose-invert lg:prose-xl py-8">
      <h1>Guide: {slug.replace(/-/g, ' ').toUpperCase()}</h1>
      <p>Detailed technical documentation and workflows for {slug}.</p>
      {/* You can add your Mermaid components here dynamically based on the slug */}
    </article>
  );
}
