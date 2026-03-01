'use client';
import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({ startOnLoad: true, theme: 'neutral' });

export default function Mermaid({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const id = 'mermaid-' + Math.random().toString(36).substr(2, 9);
      mermaid.render(id, chart).then(result => {
        ref.current!.innerHTML = result.svg;
      });
    }
  }, [chart]);

  return (
    <div className="w-full overflow-x-auto my-8 not-prose -mx-4 px-4 md:mx-0 md:px-0 touch-pan-x">
      <div ref={ref} className="min-w-[320px] max-w-full flex justify-center py-2" />
    </div>
  );
}
