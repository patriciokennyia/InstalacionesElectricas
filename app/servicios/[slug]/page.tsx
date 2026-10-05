import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ButtonLink, WhatsappButton } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { JsonLd } from "@/components/ui/JsonLd";
import { getService, serviceSlugs, services } from "@/data/services";
import { getServicePhoto } from "@/data/projects";
import { siteConfig } from "@/data/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildServiceSchema,
  pageMetadata,
} from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return pageMetadata({
    title: `${service.metaTitle} — ${siteConfig.coverageArea}`,
    description: service.metaDescription,
    path: `/servicios/${service.slug}`,
  });
}

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const photo = getServicePhoto(service.slug);
  const secondary = getServicePhoto(service.slug, 1);

  const crumbs = [
    { name: "Inicio", path: "/" },
    { name: "Servicios", path: "/servicios" },
    { name: service.title, path: `/servicios/${service.slug}` },
  ];

  return (
    <>
      {/* HERO */}
      <section
        className="relative overflow-hidden border-b border-chalk/10 pt-[var(--spacing-header)]"
        aria-labelledby="service-title"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="technical-grid absolute inset-0 opacity-30" />
          <div className="absolute -left-[10%] top-0 size-[38rem] rounded-full bg-accent/[0.06] blur-[120px]" />
        </div>

        <Container className="relative">
          {/* Breadcrumb visible */}
          <nav aria-label="Miga de pan" className="pt-8">
            <ol className="flex flex-wrap items-center gap-2 font-display text-[0.6rem] uppercase tracking-[0.2em] text-chalk/35">
              <li>
                <Link href="/" className="transition-colors hover:text-accent">
                  Inicio
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/servicios" className="transition-colors hover:text-accent">
                  Servicios
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-accent/80">{service.title}</li>
            </ol>
          </nav>

          <div className="grid gap-10 py-14 md:py-20 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="flex items-center gap-3 font-display text-[0.62rem] uppercase tracking-[0.3em] text-accent">
                  <span className="font-display text-xs">{service.number}</span>
                  <span aria-hidden="true" className="h-px w-8 bg-accent" />
                  {service.eyebrow}
                </p>
              </Reveal>

              <Reveal delay={60}>
                <h1
                  id="service-title"
                  className="mt-7 text-[clamp(2.5rem,8vw,5.5rem)] leading-[0.9]"
                >
                  {service.title}
                </h1>
              </Reveal>

              <Reveal delay={130}>
                <p className="mt-8 max-w-xl text-lg leading-relaxed text-chalk/65">
                  {service.intro}
                </p>
              </Reveal>

              <Reveal delay={190}>
                <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <ButtonLink href="/contacto#formulario" size="lg">
                    {service.cardCta ?? "Solicitar evaluación"}
                  </ButtonLink>
                  <WhatsappButton
                    href={buildWhatsAppUrl(service.whatsappKey)}
                    className="px-8 py-4 text-[0.78rem]"
                  />
                </div>
              </Reveal>

              <Reveal delay={250}>
                <a
                  href={siteConfig.phoneHref}
                  className="mt-8 inline-flex items-center gap-3 text-chalk/55 transition-colors hover:text-accent"
                >
                  <Phone className="size-4 text-accent/80" aria-hidden="true" />
                  <span className="font-display text-base tracking-[0.08em]">
                    {siteConfig.phoneDisplay}
                  </span>
                </a>
              </Reveal>
            </div>

            <Reveal delay={140} className="lg:col-span-5">
              <PhotoFrame
                photo={photo}
                // TODO: reemplazar por fotografía real del cliente.
                alt={`${service.title}: detalle del trabajo realizado`}
                placeholderLabel="Fotografía del cliente"
                placeholderIndex={Number(service.number)}
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="aspect-[4/5] w-full"
              />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* PROBLEMA */}
      <section
        aria-labelledby="problema-title"
        className="border-b border-chalk/10 bg-ink py-20 md:py-28"
      >
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <Reveal>
                <SectionLabel number="A">El problema</SectionLabel>
              </Reveal>
              <Reveal delay={70}>
                <h2
                  id="problema-title"
                  className="mt-9 text-[clamp(1.875rem,4.5vw,3.25rem)] leading-[0.98]"
                >
                  {service.problem.title}
                </h2>
              </Reveal>
              <Reveal delay={130}>
                <p className="mt-7 max-w-md text-[1.0625rem] leading-relaxed text-chalk/60">
                  {service.problem.body}
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <Reveal delay={100}>
                <ul className="space-y-px bg-chalk/10">
                  {service.problem.points.map((point, index) => (
                    <li
                      key={point}
                      className="flex items-start gap-4 bg-ink py-5 text-sm leading-relaxed text-chalk/70"
                    >
                      <span className="mt-0.5 font-display text-[0.62rem] tracking-[0.18em] text-accent/70">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* SOLUCIÓN */}
      <section
        aria-labelledby="solucion-title"
        className="border-b border-chalk/10 bg-carbon py-20 md:py-28"
      >
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <Reveal>
                <SectionLabel number="B">La solución</SectionLabel>
              </Reveal>
              <Reveal delay={70}>
                <h2
                  id="solucion-title"
                  className="mt-9 text-[clamp(1.875rem,4.5vw,3.25rem)] leading-[0.98]"
                >
                  {service.solution.title}
                </h2>
              </Reveal>
              <Reveal delay={130}>
                <p className="mt-7 max-w-md text-[1.0625rem] leading-relaxed text-chalk/60">
                  {service.solution.body}
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <Reveal delay={100}>
                <p className="font-display text-[0.62rem] uppercase tracking-[0.28em] text-chalk/40">
                  Incluye
                </p>
                <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {service.includes.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 border-b border-chalk/10 pb-3 text-sm text-chalk/70"
                    >
                      <Check
                        className="mt-0.5 size-4 shrink-0 text-accent"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* ALCANCE */}
      <section
        aria-labelledby="alcance-title"
        className="border-b border-chalk/10 py-20 md:py-28"
      >
        <Container>
          <Reveal>
            <SectionLabel number="C">{service.scope.title}</SectionLabel>
          </Reveal>

          <div className="mt-12 grid gap-px bg-chalk/10 sm:grid-cols-2 lg:grid-cols-3">
            {service.scope.items.map((item, index) => (
              <Reveal key={item.title} delay={index * 80}>
                <article className="flex h-full flex-col gap-4 bg-ink p-7 transition-colors duration-500 hover:bg-graphite md:p-8">
                  <div className="flex items-center justify-between gap-4">
                    <Icon name={service.icon} className="size-6 text-accent" />
                    <span className="font-display text-[0.62rem] tracking-[0.2em] text-chalk/30">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-[1.375rem] leading-tight">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-chalk/55">{item.body}</p>
                </article>
              </Reveal>
            ))}
          </div>

          {secondary ? (
            <Reveal delay={120} className="mt-5">
              <PhotoFrame
                photo={secondary}
                // TODO: reemplazar por fotografía real del cliente.
                alt={`${service.title}: segundo detalle del trabajo`}
                placeholderLabel="Fotografía del cliente — segundo detalle"
                placeholderIndex={Number(service.number) + 3}
                sizes="(min-width: 1024px) 90vw, 100vw"
                className="aspect-[16/9] w-full"
              />
            </Reveal>
          ) : null}
        </Container>
      </section>

      {/* FAQ */}
      <section
        aria-labelledby="faq-title"
        className="border-b border-chalk/10 bg-carbon py-20 md:py-28"
      >
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-4">
              <Reveal>
                <SectionLabel number="D">Preguntas</SectionLabel>
              </Reveal>
              <Reveal delay={70}>
                <h2
                  id="faq-title"
                  className="mt-9 text-[clamp(1.875rem,4.5vw,3.25rem)] leading-[0.98]"
                >
                  Sobre <span className="text-accent">{service.eyebrow.toLowerCase()}</span>
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <Reveal delay={100}>
                <Accordion faqs={service.faqs} />
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section aria-labelledby="cta-title" className="relative overflow-hidden py-20 md:py-28">
        <div aria-hidden="true" className="technical-grid absolute inset-0 opacity-25" />
        <Container className="relative">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="flex items-center gap-2 font-display text-[0.62rem] uppercase tracking-[0.3em] text-accent">
                  <MapPin className="size-3.5" aria-hidden="true" />
                  {siteConfig.coverageArea}
                </p>
              </Reveal>
              <Reveal delay={70}>
                <h2
                  id="cta-title"
                  className="mt-7 text-[clamp(2rem,5vw,3.75rem)] leading-[0.95]"
                >
                  {service.cardCta ?? "Contanos tu caso"}
                </h2>
              </Reveal>
              <Reveal delay={130}>
                <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-chalk/60">
                  Mandanos fotos de la instalación si podés. Evaluamos el estado
                  real y te decimos qué hay que resolver.
                </p>
              </Reveal>
              <Reveal delay={190}>
                <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <ButtonLink href="/contacto#formulario" size="lg">
                    Solicitar evaluación
                  </ButtonLink>
                  <WhatsappButton
                    href={buildWhatsAppUrl(service.whatsappKey)}
                    className="px-8 py-4 text-[0.78rem]"
                  />
                </div>
              </Reveal>
            </div>

            <Reveal delay={220} className="lg:col-span-5">
              <div className="border border-chalk/12 bg-carbon p-7">
                <p className="font-display text-[0.62rem] uppercase tracking-[0.25em] text-chalk/40">
                  Otros servicios
                </p>
                <ul className="mt-5 space-y-1">
                  {services
                    .filter((item) => item.slug !== service.slug)
                    .map((item) => (
                      <li key={item.slug}>
                        <Link
                          href={`/servicios/${item.slug}`}
                          className="group flex items-center justify-between gap-4 border-b border-chalk/10 py-3 text-sm text-chalk/65 transition-colors hover:text-accent"
                        >
                          {item.title}
                          <ArrowRight
                            className="size-4 shrink-0 text-accent/70 transition-transform duration-300 group-hover:translate-x-1"
                            aria-hidden="true"
                          />
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <JsonLd schema={buildServiceSchema({
        name: service.title,
        description: service.metaDescription,
        path: `/servicios/${service.slug}`,
      })} />
      <JsonLd schema={buildFaqSchema(service.faqs)} />
      <JsonLd schema={buildBreadcrumbSchema(crumbs)} />
    </>
  );
}