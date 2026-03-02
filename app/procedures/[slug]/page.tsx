// app/procedures/[slug]/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProcedure, procedureSlugs } from '@/content/procedures/registry';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return procedureSlugs.map((slug) => ({ slug }));
}

const CANONICAL_BASE = 'https://quizstew-pro.vercel.app';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const procedure = getProcedure(slug);
  if (!procedure) return {};
  return {
    title: procedure.seo?.title ?? procedure.meta.title,
    description: procedure.seo?.description,
    alternates: {
      canonical: `${CANONICAL_BASE}/procedures/${slug}`,
    },
  };
}

export default async function ProcedurePage({ params }: Props) {
  const { slug } = await params;
  const procedure = getProcedure(slug);

  // If no procedure is found in the registry, return 404
  if (!procedure) {
    notFound();
  }

  const { meta, default: Content } = procedure;

  if (!Content) {
    throw new Error(`Content component is missing for slug: ${slug}`);
  }

  return (
    <article className="prose prose-invert lg:prose-xl py-8 px-4 mx-auto">
      <nav className="text-sm text-gray-400 mb-4 not-prose">
        <Link href="/procedures" className="hover:text-white">
          ← Procedures
        </Link>
      </nav>
      <h1>{meta.title}</h1>
      {meta.description && <p className="lead text-gray-400">{meta.description}</p>}
      <Content />
    </article>
  );
}
