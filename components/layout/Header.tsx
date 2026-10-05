"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, X } from "lucide-react";
import { navLinks, siteConfig } from "@/data/site";
import { services } from "@/data/services";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

/**
 * Header sticky: transparente sobre el hero, sólido al hacer scroll.
 * Client porque necesita observar el scroll y manejar el drawer con foco.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Bloquea el scroll del body mientras el drawer está abierto.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[var(--ease-out-expo)]",
          scrolled
            ? "border-b border-chalk/10 bg-ink/92 backdrop-blur-xl"
            : "border-b border-transparent bg-gradient-to-b from-ink/70 to-transparent",
        )}
        style={{ height: "var(--spacing-header)" }}
      >
        <div className="container-page flex h-full items-center justify-between gap-6">
          <Link
            href="/"
            className="group flex items-center gap-3"
            aria-label={`${siteConfig.businessName} — inicio`}
          >
            <Mark />
            <span className="hidden font-display text-sm uppercase leading-none tracking-[0.18em] text-chalk sm:block">
              Instalaciones
              <span className="block text-accent">Eléctricas</span>
            </span>
          </Link>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => {
                const active =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative block px-4 py-2 font-display text-[0.7rem] uppercase tracking-[0.18em] transition-colors duration-300",
                        active ? "text-accent" : "text-chalk/70 hover:text-chalk",
                      )}
                    >
                      {link.label}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute inset-x-4 bottom-0 h-px origin-left bg-accent transition-transform duration-500 ease-[var(--ease-out-expo)]",
                          active ? "scale-x-100" : "scale-x-0",
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={siteConfig.phoneHref}
              className="hidden items-center gap-2 font-display text-xs tracking-[0.15em] text-chalk/70 transition-colors hover:text-accent xl:flex"
            >
              <Phone className="size-3.5" aria-hidden="true" />
              {siteConfig.phoneDisplay}
            </a>

            <Link
              href="/contacto#formulario"
              className="hidden bg-accent px-5 py-2.5 font-display text-[0.65rem] uppercase tracking-[0.15em] text-ink transition-colors hover:bg-accent-soft md:inline-block"
            >
              Solicitar presupuesto
            </Link>

            <a
              href={buildWhatsAppUrl("general")}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Hablar por WhatsApp"
              className="inline-flex size-10 items-center justify-center border border-chalk/20 text-chalk transition-colors hover:border-accent hover:text-accent md:hidden"
            >
              <Phone className="size-4" aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="menu-movil"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              className="inline-flex size-10 items-center justify-center border border-chalk/20 text-chalk transition-colors hover:border-accent hover:text-accent lg:hidden"
            >
              {open ? (
                <X className="size-5" aria-hidden="true" />
              ) : (
                <Menu className="size-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      <MobileDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}

/** Isotipo: rayo dentro de un cuadro técnico. */
function Mark() {
  return (
    <span className="relative flex size-9 shrink-0 items-center justify-center border border-accent/45">
      <svg
        viewBox="0 0 24 24"
        className="size-4 text-accent"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M13.2 2 4 13.4h5.6L9.3 22 20 10.1h-6.1L13.2 2Z" />
      </svg>
    </span>
  );
}

/** Drawer mobile con focus trap. */
function MobileDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      id="menu-movil"
      className="fixed inset-0 z-40 lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Menú"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar menú"
        className="absolute inset-0 h-full w-full cursor-default bg-ink/80 backdrop-blur-sm"
      />

      <div className="absolute inset-x-0 top-0 max-h-dvh overflow-y-auto border-b border-chalk/10 bg-carbon pb-8 pt-[calc(var(--spacing-header)+1.5rem)]">
        <nav aria-label="Menú móvil" className="container-page">
          <ul className="border-t border-chalk/10">
            {navLinks.map((link) => (
              <li key={link.href} className="border-b border-chalk/10">
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="flex items-center justify-between py-4 font-display text-lg uppercase tracking-[0.08em] text-chalk"
                >
                  {link.label}
                  <span aria-hidden="true" className="text-accent">
                    /
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-8 font-display text-[0.62rem] uppercase tracking-[0.28em] text-chalk/40">
            Servicios
          </p>
          <ul className="mt-3 grid gap-x-6 gap-y-1 sm:grid-cols-2">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/servicios/${service.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-3 py-2 text-sm text-chalk/70"
                >
                  <span className="font-display text-[0.6rem] tracking-[0.2em] text-accent/70">
                    {service.number}
                  </span>
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3">
            <Link
              href="/contacto#formulario"
              onClick={onClose}
              className="bg-accent px-6 py-4 text-center font-display text-[0.72rem] uppercase tracking-[0.15em] text-ink"
            >
              Solicitar presupuesto
            </Link>
            <a
              href={buildWhatsAppUrl("general")}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-chalk/25 px-6 py-4 text-center font-display text-[0.72rem] uppercase tracking-[0.15em] text-chalk"
            >
              Hablar por WhatsApp
            </a>
          </div>

          <a
            href={siteConfig.phoneHref}
            className="mt-6 flex items-center justify-center gap-2 py-2 font-display text-sm tracking-[0.1em] text-accent"
          >
            <Phone className="size-4" aria-hidden="true" />
            {siteConfig.phoneDisplay}
          </a>
        </nav>
      </div>
    </div>
  );
}