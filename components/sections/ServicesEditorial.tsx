import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Section } from "@/components/ui/JsonLd";
import { homeServiceOrder, servicesBySlug, type Service } from "@/data/services";
import { getServicePhoto } from "@/data/projects";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

/**
 * Retícula editorial de servicios.
 *
 * No es un `grid-cols-3` uniforme: la composición mezcla anchos, alturas,
 * fondos fotográficos, un bloque invertido y un bloque numerado. Los spans son
 * explícitos porque la asimetría es la decisión de diseño.
 */
const layout: Record<string, string> = {
  "tableros-electricos": "lg:col-span-7",
  "arreglos-instalaciones": "lg:col-span-5",
  iluminacion: "lg:col-span-7",
  "puesta-a-tierra": "lg:col-span-5",
  "mantenimiento-edificios": "lg:col-span-5",
  "luces-emergencia": "lg:col-span-3",
  "declaracion-carga": "lg:col-span-4",
};

export function ServicesEditorial() {
  const ordered = homeServiceOrder
    .map((slug) => servicesBySlug[slug])
    .filter((service): service is Service => Boolean(service));

  return (
    <Section id="servicios" aria-labelledby="servicios-title" className="bg-ink">
      <Container>
        <Reveal>
          <SectionLabel number={2}>Servicios</SectionLabel>
        </Reveal>

        <div className="mt-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <h2
              id="servicios-title"
              className="max-w-2xl text-[clamp(2.25rem,6vw,4.5rem)] leading-[0.95]"
            >
              Servicios <span className="text-accent">eléctricos</span>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="max-w-sm text-sm leading-relaxed text-chalk/50">
              Trabajos sobre instalaciones existentes y nuevas, en hogares,
              edificios, comercios y empresas.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12 lg:gap-5">
          {ordered.map((service, index) => (
            <Reveal
              key={service.slug}
              delay={Math.min(index * 70, 350)}
              className={cn("md:col-span-1", layout[service.slug] ?? "lg:col-span-4")}
            >
              <ServiceCard service={service} index={index + 1} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const href = `/servicios/${service.slug}`;

  if (service.cardVariant === "feature") {
    return (
      <Link
        href={href}
        className="group relative flex min-h-[26rem] flex-col justify-end overflow-hidden border border-chalk/12 p-7 transition-all duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:border-accent/60 md:p-9"
      >
        <PhotoFrame
          photo={getServicePhoto(service.slug)}
          // TODO: reemplazar por fotografía real del cliente.
          alt={`${service.title}: detalle del trabajo`}
          placeholderLabel="Fotografía del cliente"
          placeholderIndex={index}
          sizes="(min-width: 1024px) 56vw, 100vw"
          className="absolute inset-0"
          overlay={false}
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/25"
        />
        <CardBody service={service} light />
      </Link>
    );
  }

  if (service.cardVariant === "photo") {
    return (
      <Link
        href={href}
        className="group relative flex min-h-[24rem] items-end overflow-hidden border border-chalk/12 p-7 transition-all duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:border-accent/60 md:p-9"
      >
        <PhotoFrame
          photo={getServicePhoto(service.slug)}
          // TODO: reemplazar por fotografía real del cliente.
          alt={`${service.title}: resultado del trabajo`}
          placeholderLabel="Fotografía del cliente"
          placeholderIndex={index}
          sizes="(min-width: 1024px) 56vw, 100vw"
          className="absolute inset-0"
          overlay={false}
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/55 to-transparent"
        />
        <CardBody service={service} light />
      </Link>
    );
  }

  if (service.cardVariant === "inverted") {
    return (
      <Link
        href={href}
        className="group flex min-h-[24rem] flex-col justify-between bg-bone p-7 text-ink transition-all duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 md:p-9"
      >
        <div className="flex items-start justify-between gap-4">
          <span className="font-display text-[0.7rem] tracking-[0.25em] text-ink/40">
            {service.number}
          </span>
          <Icon
            name={service.icon}
            className="size-6 text-ink transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        <div>
          <h3 className="text-[1.75rem] leading-[0.95] text-ink md:text-[2.125rem]">
            {service.title}
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-ink/65">{service.short}</p>

          <span className="mt-7 flex items-center gap-2 font-display text-[0.66rem] uppercase tracking-[0.2em] text-ink">
            <span className="h-px w-6 bg-ink transition-all duration-500 group-hover:w-12" />
            Ver servicio
          </span>
        </div>
      </Link>
    );
  }

  if (service.cardVariant === "numbered") {
    return (
      <Link
        href={href}
        className="group flex min-h-[24rem] flex-col justify-between border border-chalk/12 bg-graphite p-7 transition-all duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:border-accent/60 md:p-9"
      >
        <span
          aria-hidden="true"
          className="font-display text-[5rem] leading-none text-accent/25 transition-colors duration-500 group-hover:text-accent/45 md:text-[6.5rem]"
        >
          {service.number}
        </span>

        <div>
          <h3 className="text-[1.75rem] leading-[0.95] md:text-[2.125rem]">
            {service.title}
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-chalk/60">{service.short}</p>
          <span className="mt-7 inline-flex items-center gap-2 font-display text-[0.66rem] uppercase tracking-[0.2em] text-accent">
            {service.cardCta ?? "Consultar"}
            <ArrowUpRight
              className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </span>
        </div>
      </Link>
    );
  }

  // standard
  return (
    <Link
      href={href}
      className="group flex min-h-[24rem] flex-col justify-between border border-chalk/12 p-7 transition-all duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:border-accent/60 md:p-9"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="font-display text-[0.7rem] tracking-[0.25em] text-chalk/35">
          {service.number}
        </span>
        <Icon
          name={service.icon}
          className="size-6 text-accent transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div>
        <h3 className="text-[1.75rem] leading-[0.95] md:text-[2.125rem]">
          {service.title}
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-chalk/55">{service.short}</p>
        <span className="mt-7 flex items-center gap-2 font-display text-[0.66rem] uppercase tracking-[0.2em] text-chalk/50 transition-colors group-hover:text-accent">
          <span className="h-px w-6 bg-accent/70 transition-all duration-500 group-hover:w-12" />
          Ver servicio
        </span>
      </div>
    </Link>
  );
}

/** Cuerpo común de las tarjetas con foto: número + título + resumen + CTA. */
function CardBody({ service, light }: { service: Service; light?: boolean }) {
  return (
    <>
      <span className="font-display text-[0.7rem] tracking-[0.25em] text-accent/80">
        {service.number}
      </span>

      <div className="relative mt-6">
        <h3
          className={cn(
            "text-[1.9rem] leading-[0.95] md:text-[2.5rem]",
            light ? "text-chalk" : "text-ink",
          )}
        >
          {service.title}
        </h3>
        <p
          className={cn(
            "mt-4 max-w-md text-sm leading-relaxed",
            light ? "text-chalk/65" : "text-ink/65",
          )}
        >
          {service.short}
        </p>

        <span
          className={cn(
            "mt-7 inline-flex items-center gap-2 font-display text-[0.66rem] uppercase tracking-[0.2em]",
            light ? "text-accent" : "text-ink",
          )}
        >
          {service.cardCta ?? "Ver servicio"}
          <ArrowUpRight
            className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </span>
      </div>
    </>
  );
}

/** Enlace de WhatsApp directo a un servicio (usado en las páginas de detalle). */
export function ServiceWhatsappLink({ service }: { service: Service }) {
  return (
    <a
      href={buildWhatsAppUrl(service.whatsappKey)}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 font-display text-[0.66rem] uppercase tracking-[0.2em] text-accent hover:underline"
    >
      Consultar por {service.eyebrow.toLowerCase()}
    </a>
  );
}