'use client';
import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import { MERMAID_THEME_INIT } from '@/lib/mermaid-theme';

export default function Mermaid({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mermaid.initialize({ startOnLoad: true, theme: 'neutral' });
    if (ref.current) {
      const id = 'mermaid-' + Math.random().toString(36).substr(2, 9);
      const themedChart = chart.includes('%%{init:') ? chart : `${MERMAID_THEME_INIT}\n${chart.trim()}`;
      mermaid.render(id, themedChart).then((result) => {
        ref.current!.innerHTML = result.svg;
      });
    }
  }, [chart]);

  return (
    <div className="w-full overflow-x-auto my-8 not-prose -mx-4 px-4 md:mx-0 md:px-0 touch-pan-x">
      <div ref={ref} className="min-w-[320px] max-w-full min-h-[200px] flex justify-center items-center py-2" />
    </div>
  );
}
