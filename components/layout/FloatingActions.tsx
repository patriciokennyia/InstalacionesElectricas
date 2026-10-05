"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ClipboardList, MessageCircle, Phone, X } from "lucide-react";
import { siteConfig } from "@/data/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

/**
 * Acciones de conversión.
 *
 * Desktop: botón flotante de WhatsApp que se despliega en dos opciones.
 * Mobile: barra fija inferior con WhatsApp · Llamar · Presupuesto.
 *
 * Ambas vías son el mismo helper `buildWhatsAppUrl`: sin código duplicado.
 */
export function FloatingActions() {
  return (
    <>
      <DesktopFab />
      <MobileActionBar />
    </>
  );
}

/** FAB de escritorio. */
function DesktopFab() {
  const [open, setOpen] = useState(false);

  // Se oculta cuando el usuario ya está en el formulario: ahí compite.
  useEffect(() => {
    const target = document.getElementById("formulario");
    if (!target) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) setOpen(!entry.isIntersecting);
      },
      { threshold: 0.15 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-40 hidden flex-col items-end gap-3 md:flex">
      {open ? (
        <div className="pointer-events-auto flex flex-col items-end gap-2">
          <span className="bg-carbon/95 px-3 py-1.5 font-display text-[0.6rem] uppercase tracking-[0.2em] text-chalk/70 backdrop-blur">
            ¿Necesitás ayuda?
          </span>
          <a
            href={siteConfig.phoneHref}
            className="flex items-center gap-3 bg-carbon/95 px-4 py-3 text-sm text-chalk backdrop-blur transition-colors hover:text-accent"
          >
            <Phone className="size-4 text-accent" aria-hidden="true" />
            {siteConfig.phoneDisplay}
          </a>
          <Link
            href="/contacto#formulario"
            className="flex items-center gap-3 bg-carbon/95 px-4 py-3 text-sm text-chalk backdrop-blur transition-colors hover:text-accent"
          >
            <ClipboardList className="size-4 text-accent" aria-hidden="true" />
            Solicitar evaluación
          </Link>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? "Cerrar acciones" : "Abrir acciones de contacto"}
        className="pointer-events-auto relative flex size-14 items-center justify-center bg-accent text-ink shadow-[0_14px_40px_-12px_rgba(245,179,1,0.6)] transition-colors hover:bg-accent-soft"
      >
        {open ? (
          <X className="size-6" aria-hidden="true" />
        ) : (
          <MessageCircle className="size-6" aria-hidden="true" />
        )}
        {!open ? (
          <span
            aria-hidden="true"
            className="absolute inset-0 border border-accent"
            style={{ animation: "pulse-line 3s ease-in-out infinite" }}
          />
        ) : null}
      </button>
    </div>
  );
}

/** Barra fija inferior en mobile. */
function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-chalk/15 bg-ink/95 backdrop-blur-xl md:hidden">
      <div
        className="grid grid-cols-3"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <BarAction
          href={buildWhatsAppUrl("general")}
          external
          icon={<MessageCircle className="size-4" aria-hidden="true" />}
          label="WhatsApp"
        />
        <BarAction
          href={siteConfig.phoneHref}
          icon={<Phone className="size-4" aria-hidden="true" />}
          label="Llamar"
        />
        <BarAction
          href="/contacto#formulario"
          icon={<ArrowUpRight className="size-4" aria-hidden="true" />}
          label="Presupuesto"
          highlight
        />
      </div>
    </div>
  );
}

function BarAction({
  href,
  icon,
  label,
  external = false,
  highlight = false,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  external?: boolean;
  highlight?: boolean;
}) {
  const classes = cn(
    "flex flex-col items-center justify-center gap-1 py-2.5 font-display text-[0.58rem] uppercase tracking-[0.14em] transition-colors",
    highlight
      ? "bg-accent text-ink"
      : "text-chalk/70 active:text-accent",
  );

  const content = (
    <>
      {icon}
      <span>{label}</span>
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        aria-label={label}
      >
        {content}
      </a>
    );
  }

  const isExternal = href.startsWith("http") || href.startsWith("tel");
  if (isExternal) {
    return (
      <a href={href} className={classes} aria-label={label}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} aria-label={label}>
      {content}
    </Link>
  );
}