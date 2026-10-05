import { cn } from "@/lib/utils";
import { pad2 } from "@/lib/utils";

/**
 * Label de sección: número + nombre + línea amarilla que crece al entrar.
 * Es el mismo componente en toda la web, eso es lo que da unidad visual.
 */
export function SectionLabel({
  number,
  children,
  className,
  tone = "light",
}: {
  /** Número de sección. Omitir si no aplica. */
  number?: number | string;
  children: React.ReactNode;
  className?: string;
  /** `light` = texto claro sobre oscuro. `muted` = para bloques de acento. */
  tone?: "light" | "muted" | "dark";
}) {
  const tones = {
    light: "text-chalk",
    muted: "text-chalk/55",
    dark: "text-ink",
  } as const;

  const lineTones = {
    light: "bg-accent",
    muted: "bg-accent/60",
    dark: "bg-ink/30",
  } as const;

  return (
    <div className={cn("flex items-center gap-4", className)}>
      {number !== undefined ? (
        <span
          className={cn(
            "font-display text-xs tracking-[0.2em]",
            number === 0 ? "text-accent" : "text-chalk/40",
          )}
        >
          {typeof number === "number" ? pad2(number) : number}
        </span>
      ) : null}
      <span
        className={cn(
          "font-display text-[0.68rem] uppercase tracking-[0.3em]",
          tones[tone],
        )}
      >
        {children}
      </span>
      <span
        aria-hidden="true"
        className={cn("reveal-line h-px flex-1", lineTones[tone])}
      />
    </div>
  );
}