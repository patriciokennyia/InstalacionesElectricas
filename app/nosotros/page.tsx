import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ButtonLink, WhatsappButton } from "@/components/ui/Button";
import { WorkGallery } from "@/components/sections/WorkGallery";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { getSupportPhoto } from "@/data/projects";
import { services } from "@/data/services";
import { siteConfig } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Nosotros",
  description:
    "Instalaciones eléctricas para hogares, edificios, consorcios, comercios y empresas en CABA y GBA. Trabajamos con diagnóstico, propuesta clara y ejecución ordenada.",
  path: "/nosotros",
});

const ways = [
  {
    title: "Diagnóstico antes que propuesta",
    body: "No cotizamos a ciegas. Primero vemos la instalación y entendemos qué está pasando. El valor depende del estado real, no de una lista prefabricada.",
  },
  {
    title: "Explicamos lo que hacemos",
    body: "Cada etapa se explica antes de ejecutarla. Si encontramos algo que no estaba en el pedido, lo decimos.",
  },
  {
    title: "Orden en el trabajo",
    body: "Identificación de circuitos, terminaciones prolijas y una instalación que se pueda mantener después.",
  },
];

export default function AboutPage() {
  const photo = getSupportPhoto("project", 1);

  return (
    <>
      <section
        className="relative overflow-hidden border-b border-chalk/10 pt-[var(--spacing-header)]"
        aria-labelledby="nosotros-title"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="technical-grid absolute inset-0 opacity-30" />
          <div className="absolute -left-[10%] top-0 size-[36rem] rounded-full bg-accent/[0.06] blur-[120px]" />
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
              <li className="text-accent/80">Nosotros</li>
            </ol>
          </nav>

          <Reveal>
            <h1
              id="nosotros-title"
              className="mt-9 max-w-5xl text-[clamp(2.5rem,8vw,5.75rem)] leading-[0.88]"
            >
              Una instalación bien hecha{" "}
              <span className="text-accent">se nota en el detalle</span>
            </h1>
          </Reveal>

          <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-6">
              <Reveal delay={80}>
                <p className="text-[1.0625rem] leading-relaxed text-chalk/65">
                  La electricidad no se ve mientras funciona. Precisamente por eso
                  el detalle importa: una terminación correcta, un circuito
                  identificado, una conexión ordenada. Nada de eso se nota el día
                  que todo anda bien, y todo se nota el día que algo falla.
                </p>
              </Reveal>
              <Reveal delay={140}>
                <p className="mt-6 text-[1.0625rem] leading-relaxed text-chalk/65">
                  Trabajamos para hogares, edificios, consorcios, comercios y
                  empresas. El punto en común no es el tamaño del trabajo: es la
                  necesidad de entender qué está pasando antes de tocar nada.
                </p>
              </Reveal>
              <Reveal delay={200}>
                <p className="mt-10 flex items-center gap-2 font-display text-[0.66rem] uppercase tracking-[0.22em] text-chalk/40">
                  <MapPin className="size-3.5 text-accent/70" aria-hidden="true" />
                  {siteConfig.coverageArea}
                </p>
              </Reveal>
            </div>

            <Reveal delay={160} className="lg:col-span-5 lg:col-start-8">
              <PhotoFrame
                photo={photo}
                // TODO: reemplazar por fotografía real del cliente.
                alt="Instalación eléctrica terminada: detalle de tablero y cableado"
                placeholderLabel="Fotografía del cliente"
                placeholderIndex={4}
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="aspect-[4/5] w-full"
              />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Cómo trabajamos */}
      <section
        aria-labelledby="formas"
        className="border-b border-chalk/10 bg-carbon py-20 md:py-28"
      >
        <Container>
          <Reveal>
            <SectionLabel number="A">Cómo trabajamos</SectionLabel>
          </Reveal>

          <div className="mt-12 grid gap-px bg-chalk/10 md:grid-cols-3">
            {ways.map((way, index) => (
              <Reveal key={way.title} delay={index * 90}>
                <article className="flex h-full flex-col gap-5 bg-ink p-8 md:p-9">
                  <span className="font-display text-[0.66rem] tracking-[0.24em] text-accent/80">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 className="text-[1.5rem] leading-tight">{way.title}</h2>
                  <p className="text-sm leading-relaxed text-chalk/55">{way.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <ProcessSteps />

      {/* Servicios en una línea */}
      <section
        aria-labelledby="que-hacemos"
        className="border-b border-chalk/10 py-20 md:py-28"
      >
        <Container>
          <Reveal>
            <SectionLabel number="C">Qué hacemos</SectionLabel>
          </Reveal>

          <div className="mt-12 grid gap-px bg-chalk/10 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <Reveal key={service.slug} delay={index * 60}>
                <Link
                  href={`/servicios/${service.slug}`}
                  className="group flex h-full flex-col justify-between gap-8 bg-ink p-7 transition-colors duration-500 hover:bg-graphite"
                >
                  <div>
                    <span className="font-display text-[0.62rem] tracking-[0.22em] text-accent/70">
                      {service.number}
                    </span>
                    <h3 className="mt-4 text-lg leading-tight">{service.title}</h3>
                  </div>
                  <ArrowUpRight
                    className="size-5 text-chalk/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent"
                    aria-hidden="true"
                  />
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120} className="mt-12 flex flex-col gap-4 sm:flex-row">
            <ButtonLink href="/servicios">Ver todos los servicios</ButtonLink>
            <WhatsappButton href={buildWhatsAppUrl("general")} />
          </Reveal>
        </Container>
      </section>

      <WorkGallery />

      {/* CTA final sin formulario: evita duplicar el bloque de la home */}
      <section
        aria-labelledby="nosotros-cta"
        className="relative overflow-hidden border-t border-chalk/10 bg-carbon py-20 md:py-28"
      >
        <div aria-hidden="true" className="technical-grid absolute inset-0 opacity-25" />
        <Container className="relative">
          <Reveal>
            <h2
              id="nosotros-cta"
              className="max-w-3xl text-[clamp(2rem,5.2vw,3.75rem)] leading-[0.95]"
            >
              Cada instalación es <span className="text-accent">diferente</span>
            </h2>
          </Reveal>
          <Reveal delay={90}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-chalk/60">
              Contanos qué hay que resolver y, si podés, mandanos fotos. A partir
              de ahí hacemos el resto.
            </p>
          </Reveal>
          <Reveal delay={150} className="mt-9 flex flex-col gap-4 sm:flex-row">
            <ButtonLink href="/contacto#formulario" size="lg">
              Solicitar presupuesto
            </ButtonLink>

          </Reveal>
        </Container>
      </section>
    </>
  );
}