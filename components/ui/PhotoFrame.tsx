import Image from "next/image";
import { ImageOff } from "lucide-react";
import { cn, pad2 } from "@/lib/utils";

export type FramePhoto = {
  src: string;
  alt: string;
};

/**
 * Placeholder diseñado.
 *
 * Mientras no haya fotografía curada, el slot muestra un plano técnico: reja,
 * marco, numeración y etiqueta. Nunca un cuadrado gris, nunca "IMAGE HERE".
 * Se lee como una decisión de diseño, no como un hueco.
 */
export function PhotoPlaceholder({
  label,
  index,
  className,
}: {
  label: string;
  index?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "technical-grid absolute inset-0 flex flex-col justify-between bg-carbon p-5",
        className,
      )}
      aria-hidden="true"
    >
      {/* Esquinas de plano técnico */}
      <span className="pointer-events-none absolute inset-3 border border-chalk/10" />

      <div className="flex items-start justify-between gap-4">
        <ImageOff className="size-4 text-accent/70" strokeWidth={1.5} />
        {index !== undefined ? (
          <span className="font-display text-[0.65rem] tracking-[0.25em] text-chalk/35">
            {pad2(index)}
          </span>
        ) : null}
      </div>

      <p className="max-w-[22ch] font-display text-[0.62rem] uppercase leading-[1.5] tracking-[0.22em] text-chalk/40">
        {label}
      </p>
    </div>
  );
}

/**
 * Marco fotográfico con filtro de unificación visual.
 *
 * `photo-grade` aplica contraste/saturación/vineta por CSS, sin requests
 * extra, y unifica fotos de distintos teléfonos y fechas en un mismo registro.
 */
export function PhotoFrame({
  photo,
  alt,
  className,
  imageClassName,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  placeholderLabel,
  placeholderIndex,
  overlay = true,
}: {
  photo?: FramePhoto | null;
  /** Requerido por accesibilidad: describe la imagen, no el diseño. */
  alt: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  placeholderLabel?: string;
  placeholderIndex?: number;
  /** Viñeta para asentar la foto sobre el negro. */
  overlay?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-carbon",
        className,
      )}
    >
      {photo ? (
        <>
          <Image
            src={photo.src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className={cn(
              "photo-grade photo-grade-hover object-cover",
              imageClassName,
            )}
          />
          {overlay ? <span aria-hidden="true" className="vignette absolute inset-0" /> : null}
        </>
      ) : (
        <>
          <PhotoPlaceholder
            label={placeholderLabel ?? alt}
            index={placeholderIndex}
          />
          <span className="sr-only">{alt}</span>
        </>
      )}
    </div>
  );
}

/**
 * Slot que ya no necesita placeholder: si no hay foto, no renderiza nada.
 * Para secciones donde una foto sin curar aportaría menos que el espacio en
 * blanco (ej. bloques de texto puro).
 */
export function OptionalPhoto({
  photo,
  alt,
  className,
  sizes,
  priority = false,
}: {
  photo?: FramePhoto | null;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  if (!photo) return null;
  return (
    <PhotoFrame
      photo={photo}
      alt={alt}
      className={className}
      sizes={sizes}
      priority={priority}
    />
  );
}