type ProcedureDiagramProps =
  | { src: string; alt: string; children?: never; caption?: never; ariaLabel?: never }
  | {
      src?: never;
      alt?: never;
      children: React.ReactNode;
      caption?: string;
      ariaLabel?: string;
    };

export default function ProcedureDiagram({ src, alt, children, caption, ariaLabel }: ProcedureDiagramProps) {
  const content = src ? (
    <object
      data={src}
      type="image/svg+xml"
      aria-label={alt}
      className="procedure-diagram h-auto"
    />
  ) : (
    <figure
      className="m-0"
      aria-label={ariaLabel}
      {...(ariaLabel && { role: 'figure' })}
    >
      {children}
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-gray-400 px-4">
          {caption}
        </figcaption>
      )}
    </figure>
  );

  return (
    <div className="my-8 w-full border border-surface-border rounded-3xl overflow-hidden bg-surface">
      {content}
    </div>
  );
}
