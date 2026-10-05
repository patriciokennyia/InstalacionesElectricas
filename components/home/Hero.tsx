import { MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/data/site";
import { heroPhoto } from "@/data/projects";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { ButtonLink, WhatsappButton } from "@/components/ui/Button";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function Hero() {
  return (
    <section
      className="relative overflow-hidden pt-[var(--spacing-header)]"
      aria-labelledby="hero-title"
    >
      {/* Fondo técnico */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="technical-grid absolute inset-0 opacity-40" />
        <div className="absolute -right-[10%] top-[-20%] size-[45rem] rounded-full bg-accent/[0.07] blur-[120px]" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <Container className="relative">
        <div className="grid items-end gap-12 pb-16 pt-14 md:pb-20 md:pt-20 lg:grid-cols-12 lg:gap-8 lg:pb-28 lg:pt-24">
          {/* Titular */}
          <div className="lg:col-span-7">
            <Reveal>
              <p className="flex items-center gap-3 font-display text-[0.62rem] uppercase tracking-[0.3em] text-accent">
                <span aria-hidden="true" className="h-px w-8 bg-accent" />
                {siteConfig.coverageArea}
              </p>
            </Reveal>

            <h1
              id="hero-title"
              className="mt-7 text-[clamp(3.25rem,11vw,8.5rem)] leading-[0.85]"
            >
              <Reveal delay={60}>
                <span className="block text-chalk">Instalaciones</span>
              </Reveal>
              <Reveal delay={140}>
                <span className="block text-accent">Eléctricas</span>
              </Reveal>
            </h1>

            <Reveal delay={220}>
              <p className="mt-8 max-w-xl text-[1.0625rem] leading-relaxed text-chalk/65 sm:text-lg">
                Seguridad, precisión y soluciones eléctricas para hogares,
                edificios, comercios y empresas.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <ButtonLink href="/contacto#formulario" size="lg">
                  Solicitar presupuesto
                </ButtonLink>
                <WhatsappButton href={buildWhatsAppUrl("general")} className="px-8 py-4 text-[0.78rem]" />
              </div>
            </Reveal>

            <Reveal delay={380}>
              <a
                href={siteConfig.phoneHref}
                className="mt-10 inline-flex items-center gap-3 text-chalk/60 transition-colors hover:text-accent"
              >
                <Phone className="size-4 text-accent/80" aria-hidden="true" />
                <span className="font-display text-lg tracking-[0.08em]">
                  {siteConfig.phoneDisplay}
                </span>
              </a>
            </Reveal>
          </div>

          {/* Fotografía */}
          <Reveal delay={180} className="lg:col-span-5">
            <div className="relative lg:-mr-8">
              <PhotoFrame
                photo={heroPhoto}
                alt={heroPhoto.alt}
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="aspect-[4/5] w-full"
              />

              {/* Ficha técnica sobre la foto */}
              <div className="absolute -bottom-5 left-0 hidden border border-chalk/12 bg-ink/92 px-5 py-4 backdrop-blur sm:block lg:-left-6">
                <p className="font-display text-[0.58rem] uppercase tracking-[0.25em] text-chalk/40">
                  Evaluamos
                </p>
                <p className="mt-1.5 text-sm text-chalk/80">Diagnóstico · Propuesta</p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>

      {/* Pie del hero */}
      <div className="relative border-t border-chalk/10">
        <Container className="flex flex-wrap items-center justify-between gap-4 py-5">
          <p className="flex items-center gap-2 font-display text-[0.62rem] uppercase tracking-[0.22em] text-chalk/40">
            <MapPin className="size-3.5 text-accent/70" aria-hidden="true" />
            {siteConfig.location}
          </p>
          <p className="font-display text-[0.62rem] uppercase tracking-[0.22em] text-chalk/40">
            Hogares · Edificios · Comercios · Empresas
          </p>
        </Container>
      </div>
    </section>
  );
}