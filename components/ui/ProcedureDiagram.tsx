type ProcedureDiagramProps =
  | { src: string; alt: string; children?: never }
  | { src?: never; alt?: never; children: React.ReactNode };

export default function ProcedureDiagram({ src, alt, children }: ProcedureDiagramProps) {
  return (
    <div className="my-8 w-full border border-surface-border rounded-3xl overflow-hidden bg-surface">
      {src ? (
        <object
          data={src}
          type="image/svg+xml"
          aria-label={alt}
          className="procedure-diagram h-auto"
        />
      ) : (
        children
      )}
    </div>
  );
}
