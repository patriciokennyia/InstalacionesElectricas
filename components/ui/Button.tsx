import Link from "next/link";
import { ArrowRight, ArrowUpRight, MessageCircle, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2.5 font-display uppercase tracking-[0.12em] transition-all duration-300 ease-[var(--ease-out-expo)] disabled:opacity-60 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  // Amarillo sobre fondo oscuro: el acento nunca se usa sobre blanco.
  primary:
    "bg-accent text-ink hover:bg-accent-soft active:bg-accent-deep shadow-[0_0_0_0_rgba(245,179,1,0)] hover:shadow-[0_10px_30px_-12px_rgba(245,179,1,0.55)]",
  secondary:
    "border border-chalk/25 text-chalk hover:border-accent hover:text-accent",
  ghost: "text-chalk/70 hover:text-accent",
};

const sizes: Record<Size, string> = {
  md: "px-6 py-3 text-[0.7rem]",
  lg: "px-8 py-4 text-[0.78rem]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

function inner({ children, withArrow = true }: { children: React.ReactNode; withArrow?: boolean }) {
  return (
    <>
      <span>{children}</span>
      {withArrow ? (
        <ArrowUpRight
          className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      ) : null}
    </>
  );
}

/** CTA interno (usa Link). */
export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  withArrow = true,
}: CommonProps & { href: string; withArrow?: boolean }) {
  const isInternal = href.startsWith("/") || href.startsWith("#");
  const classes = cn(base, variants[variant], sizes[size], className);

  if (isInternal) {
    return (
      <Link href={href} className={classes}>
        {inner({ children, withArrow })}
      </Link>
    );
  }

  return (
    <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
      {inner({ children, withArrow })}
    </a>
  );
}

/** Botón de acción (envío de formulario, acciones in-page). */
export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  type = "button",
  withArrow = false,
  disabled,
}: CommonProps & {
  type?: "button" | "submit";
  withArrow?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(base, variants[variant], sizes[size], className)}
    >
      {inner({ children, withArrow })}
    </button>
  );
}

/** CTA de WhatsApp: siempre externo y con el ícono de la plataforma. */
export function WhatsappButton({
  href,
  className,
  label = "Hablar por WhatsApp",
  withArrow = false,
}: {
  href: string;
  className?: string;
  label?: string;
  withArrow?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={cn(
        base,
        "border border-chalk/25 text-chalk hover:border-accent hover:text-accent",
        sizes.md,
        className,
      )}
    >
      {withArrow ? null : <MessageCircle className="size-4 shrink-0" aria-hidden="true" />}
      <span>{label}</span>
      {withArrow ? (
        <ArrowUpRight
          className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      ) : null}
    </a>
  );
}

/** Link de teléfono. */
export function PhoneButton({
  href,
  className,
  label,
  showIcon = true,
}: {
  href: string;
  className?: string;
  label: string;
  showIcon?: boolean;
}) {
  return (
    <a href={href} className={cn(base, "text-chalk hover:text-accent", className)}>
      {showIcon ? <Phone className="size-4 shrink-0" aria-hidden="true" /> : null}
      <span>{label}</span>
    </a>
  );
}

/** Enlace de texto con subrayado amarillo que crece. */
export function TextLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const classes = cn("link-accent font-display uppercase tracking-[0.1em] text-sm", className);
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
      {children}
    </a>
  );
}

/** Flecha para listas de enlaces internos. */
export function RowArrow({ className }: { className?: string }) {
  return (
    <ArrowRight
      className={cn(
        "size-5 shrink-0 text-accent transition-transform duration-300 group-hover:translate-x-1",
        className,
      )}
      aria-hidden="true"
    />
  );
}