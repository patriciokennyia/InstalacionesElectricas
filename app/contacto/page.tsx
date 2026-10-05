import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Section } from "@/components/ui/JsonLd";
import { WhatsappButton } from "@/components/ui/Button";
import { ContactForm } from "@/components/sections/ContactForm";
import { siteConfig } from "@/data/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { buildBreadcrumbSchema, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";

export const metadata: Metadata = pageMetadata({
  title: "Contacto y presupuesto",
  description:
    "Escribinos o llamanos para consultar por un trabajo eléctrico. Mandanos fotos del tablero o de la instalación y evaluamos tu caso.",
  path: "/contacto",
});

const crumbs = [
  { name: "Inicio", path: "/" },
  { name: "Contacto", path: "/contacto" },
];

export default function ContactPage() {
  return (
    <>
      <section
        className="relative overflow-hidden border-b border-chalk/10 pt-[var(--spacing-header)]"
        aria-labelledby="contacto-title"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="technical-grid absolute inset-0 opacity-30" />
          <div className="absolute left-1/2 top-0 size-[34rem] -translate-x-1/2 rounded-full bg-accent/[0.06] blur-[120px]" />
        </div>

        <Container className="relative pb-14 pt-12 md:pb-20 md:pt-16">
          <nav aria-label="Miga de pan" className="pt-6">
            <ol className="flex items-center gap-2 font-display text-[0.6rem] uppercase tracking-[0.2em] text-chalk/35">
              <li>
                <Link href="/" className="transition-colors hover:text-accent">
                  Inicio
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-accent/80">Contacto</li>
            </ol>
          </nav>

          <Reveal>
            <h1
              id="contacto-title"
              className="mt-9 max-w-4xl text-[clamp(2.5rem,8vw,5.5rem)] leading-[0.88]"
            >
              Contanos qué hay que <span className="text-accent">resolver</span>
            </h1>
          </Reveal>

          <Reveal delay={90}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-chalk/60">
              Para poder evaluar correctamente un trabajo necesitamos conocer qué
              hay que resolver y, cuando sea posible, ver imágenes de la
              instalación.
            </p>
          </Reveal>

          <Reveal delay={140} className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center">
            <a
              href={siteConfig.phoneHref}
              className="inline-flex items-center gap-3 text-chalk/70 transition-colors hover:text-accent"
            >
              <Phone className="size-5 text-accent" aria-hidden="true" />
              <span className="font-display text-xl tracking-[0.08em]">
                {siteConfig.phoneDisplay}
              </span>
            </a>
            <WhatsappButton href={buildWhatsAppUrl("general")} />
          </Reveal>
        </Container>
      </section>

      {/* Formulario */}
      <Section aria-label="Formulario de consulta">
        <Container>
          <div id="formulario" className="scroll-mt-28">
            <Reveal>
              <SectionLabel>Solicitar evaluación</SectionLabel>
            </Reveal>
            <Reveal delay={90}>
              <ContactForm />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Alternativas */}
      <Section
        aria-labelledby="alternativas"
        className="border-t border-chalk/10 bg-carbon"
      >
        <Container>
          <Reveal>
            <SectionLabel number="B">Otras vías</SectionLabel>
          </Reveal>

          <div className="mt-12 grid gap-px bg-chalk/10 md:grid-cols-3">
            <Reveal>
              <div className="flex h-full flex-col justify-between gap-8 bg-ink p-8">
                <div>
                  <h3 className="text-2xl leading-none">WhatsApp</h3>
                  <p className="mt-4 text-sm leading-relaxed text-chalk/55">
                    Escribinos contándonos qué pasa. Si podés, adjuntá fotos en el
                    chat.
                  </p>
                </div>
                <a
                  href={buildWhatsAppUrl("general")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-[0.66rem] uppercase tracking-[0.2em] text-accent hover:underline"
                >
                  Abrir conversación
                </a>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="flex h-full flex-col justify-between gap-8 bg-ink p-8">
                <div>
                  <h3 className="text-2xl leading-none">Teléfono</h3>
                  <p className="mt-4 text-sm leading-relaxed text-chalk/55">
                    {siteConfig.phoneDisplay}. Llamanos si preferís explicar el caso
                    por voz.
                  </p>
                </div>
                <a
                  href={siteConfig.phoneHref}
                  className="font-display text-[0.66rem] uppercase tracking-[0.2em] text-accent hover:underline"
                >
                  Llamar ahora
                </a>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div className="flex h-full flex-col justify-between gap-8 bg-ink p-8">
                <div>
                  <h3 className="text-2xl leading-none">Zona</h3>
                  <p className="mt-4 text-sm leading-relaxed text-chalk/55">
                    Trabajamos en {siteConfig.coverageArea}.
                  </p>
                  <p className="mt-3 flex items-center gap-2 text-xs text-chalk/40">
                    <MapPin className="size-3.5 text-accent/70" aria-hidden="true" />
                    {siteConfig.location}
                  </p>
                </div>
                <Link
                  href="/servicios"
                  className="font-display text-[0.66rem] uppercase tracking-[0.2em] text-accent hover:underline"
                >
                  Ver servicios
                </Link>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <JsonLd schema={buildBreadcrumbSchema(crumbs)} />
    </>
  );
}