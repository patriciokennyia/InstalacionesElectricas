import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { services } from "@/data/services";
import { hasEmail, navLinks, siteConfig } from "@/data/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-chalk/10 bg-carbon pb-28 pt-16 md:pb-28 md:pt-20">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Marca */}
          <div className="lg:col-span-4">
            <p className="font-display text-2xl uppercase leading-none tracking-[0.06em] text-chalk">
              Instalaciones
              <span className="block text-accent">Eléctricas</span>
            </p>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-chalk/55">
              Seguridad, calidad y confianza.
            </p>

            <p className="mt-8 max-w-xs text-xs leading-relaxed text-chalk/35">
              Trabajos eléctricos para hogares, edificios, consorcios, comercios y
              empresas en {siteConfig.coverageArea}.
            </p>
          </div>

          {/* Navegación */}
          <nav aria-label="Pie de página" className="lg:col-span-2">
            <h2 className="font-display text-[0.62rem] uppercase tracking-[0.28em] text-chalk/40">
              Navegación
            </h2>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-chalk/70 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Servicios */}
          <div className="lg:col-span-3">
            <h2 className="font-display text-[0.62rem] uppercase tracking-[0.28em] text-chalk/40">
              Servicios
            </h2>
            <ul className="mt-5 space-y-3">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/servicios/${service.slug}`}
                    className="text-sm text-chalk/70 transition-colors hover:text-accent"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div className="lg:col-span-3">
            <h2 className="font-display text-[0.62rem] uppercase tracking-[0.28em] text-chalk/40">
              Contacto
            </h2>
            <ul className="mt-5 space-y-4">
              <li>
                <a
                  href={siteConfig.phoneHref}
                  className="group flex items-start gap-3 text-sm text-chalk/70 transition-colors hover:text-accent"
                >
                  <Phone className="mt-0.5 size-4 shrink-0 text-accent/70" aria-hidden="true" />
                  {siteConfig.phoneDisplay}
                </a>
              </li>

              {/* El email solo aparece si está confirmado en la configuración. */}
              {hasEmail ? (
                <li>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="group flex items-start gap-3 text-sm text-chalk/70 transition-colors hover:text-accent"
                  >
                    <Mail className="mt-0.5 size-4 shrink-0 text-accent/70" aria-hidden="true" />
                    {siteConfig.email}
                  </a>
                </li>
              ) : null}

              <li className="flex items-start gap-3 text-sm text-chalk/70">
                <MapPin className="mt-0.5 size-4 shrink-0 text-accent/70" aria-hidden="true" />
                <span>
                  {siteConfig.location}
                  <span className="block text-chalk/40">{siteConfig.coverageArea}</span>
                </span>
              </li>

              <li>
                <a
                  href={buildWhatsAppUrl("general")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-sm text-chalk transition-colors hover:text-accent"
                >
                  WhatsApp
                  <ArrowUpRight
                    className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-chalk/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-chalk/35">
            © {year} {siteConfig.businessName}. Todos los derechos reservados.
          </p>
          <p className="text-xs text-chalk/35">
            {siteConfig.coverageArea}
          </p>
        </div>
      </Container>
    </footer>
  );
}