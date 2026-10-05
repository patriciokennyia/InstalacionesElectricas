import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Section } from "@/components/ui/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { services } from "@/data/services";
import { getServicePhoto } from "@/data/projects";
import { segments } from "@/data/segments";
import { siteConfig } from "@/data/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { buildBreadcrumbSchema, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";

export const metadata: Metadata = pageMetadata({
  title: "Servicios eléctricos",
  description:
    "Todos los servicios eléctricos: arreglos e instalaciones, tableros, puesta a tierra, iluminación, luces de emergencia, declaraciones de carga y mantenimiento para edificios. Consultá por tu caso.",
  path: "/servicios",
});

const crumbs = [
  { name: "Inicio", path: "/" },
  { name: "Servicios", path: "/servicios" },
];

export default function ServicesIndexPage() {
  return (
    <>
      {/* Hero del hub */}
      <section
        className="relative overflow-hidden border-b border-chalk/10 pt-[var(--spacing-header)]"
        aria-labelledby="servicios-index-title"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="technical-grid absolute inset-0 opacity-30" />
          <div className="absolute -right-[8%] top-0 size-[36rem] rounded-full bg-accent/[0.06] blur-[120px]" />
        </div>

        <Container className="relative pb-16 pt-12 md:pb-24 md:pt-16">
          <nav aria-label="Miga de pan" className="pt-6">
            <ol className="flex items-center gap-2 font-display text-[0.6rem] uppercase tracking-[0.2em] text-chalk/35">
              <li>
                <Link href="/" className="transition-colors hover:text-accent">
                  Inicio
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-accent/80">Servicios</li>
            </ol>
          </nav>

          <Reveal>
            <h1
              id="servicios-index-title"
              className="mt-9 max-w-4xl text-[clamp(2.75rem,9vw,6.5rem)] leading-[0.88]"
            >
              Servicios <span className="text-accent">eléctricos</span>
            </h1>
          </Reveal>

          <div className="mt-10 grid gap-8 lg:grid-cols-12">
            <Reveal delay={90}>
              <p className="max-w-xl text-lg leading-relaxed text-chalk/60">
                Trabajamos sobre instalaciones existentes y nuevas en {siteConfig.coverageArea}.
                Cada servicio se evalúa en el lugar antes de proponer una solución.
              </p>
            </Reveal>
            <Reveal delay={150} className="lg:col-span-4 lg:col-start-9">
              <ButtonLink href="/contacto#formulario" size="lg">
                Consultar mi caso
              </ButtonLink>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Listado */}
      <Section aria-label="Detalle de servicios">
        <Container>
          <div className="grid gap-4 lg:grid-cols-12 lg:gap-5">
            {services.map((service, index) => {
              const wide = index % 5 === 0;
              return (
                <Reveal
                  key={service.slug}
                  delay={Math.min(index * 60, 300)}
                  className={wide ? "lg:col-span-12" : "lg:col-span-6"}
                >
                  <article className="group relative h-full overflow-hidden border border-chalk/12 transition-all duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:border-accent/60">
                    <Link
                      href={`/servicios/${service.slug}`}
                      className={cnWide(wide)}
                    >
                      {wide ? (
                        <span className="relative block w-full">
                          <PhotoFrame
                            photo={getServicePhoto(service.slug)}
                            // TODO: reemplazar por fotografía real del cliente.
                            alt={`${service.title}: detalle del trabajo`}
                            placeholderLabel="Fotografía del cliente"
                            placeholderIndex={index + 1}
                            sizes="(min-width: 1024px) 92vw, 100vw"
                            className="aspect-[16/9] w-full"
                            overlay={false}
                          />
                          <span
                            aria-hidden="true"
                            className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/30"
                          />
                        </span>
                      ) : null}

                      <span className={wide ? "relative block p-7 md:p-10" : "block p-7 md:p-9"}>
                        <span className="flex items-start justify-between gap-4">
                          <span className="font-display text-[0.68rem] tracking-[0.24em] text-accent/80">
                            {service.number}
                          </span>
                          <Icon
                            name={service.icon}
                            className="size-6 text-accent transition-transform duration-500 group-hover:scale-110"
                          />
                        </span>

                        <span className="mt-6 block text-[1.625rem] leading-[0.98] md:text-[2.125rem]">
                          {service.title}
                        </span>
                        <span className="mt-3.5 block max-w-md text-sm leading-relaxed text-chalk/55">
                          {service.short}
                        </span>

                        <span className="mt-7 inline-flex items-center gap-2 font-display text-[0.64rem] uppercase tracking-[0.2em] text-chalk/55 transition-colors group-hover:text-accent">
                          Ver servicio
                          <ArrowUpRight
                            className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            aria-hidden="true"
                          />
                        </span>
                      </span>
                    </Link>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Por cliente */}
      <Section aria-labelledby="por-cliente" className="border-t border-chalk/10 bg-carbon">
        <Container>
          <Reveal>
            <SectionLabel number="B">Por cliente</SectionLabel>
          </Reveal>
          <Reveal delay={70}>
            <h2
              id="por-cliente"
              className="mt-9 text-[clamp(1.875rem,4.5vw,3.25rem)] leading-[0.98]"
            >
              Elegí según tu <span className="text-accent">tipo de cliente</span>
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-px bg-chalk/10 sm:grid-cols-2 lg:grid-cols-4">
            {segments.map((segment, index) => (
              <Reveal key={segment.slug} delay={index * 70}>
                <article className="flex h-full flex-col justify-between gap-6 bg-ink p-7">
                  <div>
                    <Icon name={segment.icon} className="size-6 text-accent/90" />
                    <h3 className="mt-5 text-xl leading-none">{segment.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-chalk/55">
                      {segment.description}
                    </p>
                    <ul className="mt-5 space-y-1.5">
                      {segment.services.slice(0, 3).map((slug) => {
                        const service = services.find((item) => item.slug === slug);
                        if (!service) return null;
                        return (
                          <li key={slug}>
                            <Link
                              href={`/servicios/${slug}`}
                              className="text-xs text-chalk/45 transition-colors hover:text-accent"
                            >
                              {service.title}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <a
                    href={buildWhatsAppUrl(segment.whatsappKey)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display text-[0.62rem] uppercase tracking-[0.2em] text-accent/80 hover:text-accent"
                  >
                    Consultar
                  </a>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <JsonLd schema={buildBreadcrumbSchema(crumbs)} />
    </>
  );
}

/** Layout interno del link según el ancho de la tarjeta. */
function cnWide(wide: boolean): string {
  return wide
    ? "flex h-full flex-col justify-end"
    : "flex h-full flex-col justify-between";
}