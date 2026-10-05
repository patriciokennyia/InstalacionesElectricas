import { cn } from "@/lib/utils";

/** Inyecta un bloque JSON-LD. */
export function JsonLd({ schema }: { schema: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/** Envoltura de sección con el ritmo vertical estándar del sitio. */
export function Section({
  className,
  children,
  id,
  "aria-labelledby": ariaLabelledBy,
}: {
  className?: string;
  children: React.ReactNode;
  id?: string;
  "aria-labelledby"?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={cn("py-20 md:py-28 lg:py-32", className)}
    >
      {children}
    </section>
  );
}