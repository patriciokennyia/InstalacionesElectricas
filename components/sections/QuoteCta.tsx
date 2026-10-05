import { Container } from "@/components/ui/Container";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Section } from "@/components/ui/JsonLd";
import { ButtonLink, WhatsappButton } from "@/components/ui/Button";
import { generalFaqs } from "@/data/faqs";
import { siteConfig } from "@/data/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

/** Bloque "cada instalación es diferente". Sin calculadora de precios. */
export function QuoteCta() {
  return (
    <section
      aria-labelledby="quote-title"
      className="relative overflow-hidden border-y border-chalk/10 bg-carbon"
    >
      <div aria-hidden="true" className="technical-grid absolute inset-0 opacity-30" />
      <Container className="relative py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="font-display text-[0.62rem] uppercase tracking-[0.3em] text-accent">
                Antes de cotizar
              </p>
            </Reveal>
            <Reveal delay={70}>
              <h2
                id="quote-title"
                className="mt-7 text-[clamp(2rem,5.4vw,4rem)] leading-[0.95]"
              >
                Cada instalación <span className="text-accent">es diferente</span>
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-chalk/60">
                Para poder evaluar correctamente un trabajo necesitamos conocer qué
                hay que resolver y, cuando sea posible, ver imágenes de la
                instalación.
              </p>
            </Reveal>
          </div>

          <Reveal delay={200} className="lg:col-span-5">
            <p className="border-l-2 border-accent pl-5 text-sm leading-relaxed text-chalk/50">
              El valor de un trabajo depende del estado real de la instalación y de
              los imprevistos que aparecen al abrirla. Por eso primero evaluamos y
              después definimos.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row lg:flex-col xl:flex-row">
              <ButtonLink href="/contacto#formulario" size="lg">
                Enviar consulta
              </ButtonLink>
              <WhatsappButton
                href={buildWhatsAppUrl("budget")}
                className="px-8 py-4 text-[0.78rem]"
              />
            </div>

            <a
              href={siteConfig.phoneHref}
              className="mt-6 inline-block font-display text-sm tracking-[0.1em] text-chalk/45 transition-colors hover:text-accent"
            >
              o llamanos al {siteConfig.phoneDisplay}
            </a>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/** FAQ general. */
export function FaqSection({ faqs = generalFaqs }: { faqs?: typeof generalFaqs }) {
  return (
    <Section id="faq" aria-labelledby="faq-title" className="bg-ink">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Reveal>
              <SectionLabel number={10}>Preguntas</SectionLabel>
            </Reveal>
            <Reveal delay={70}>
              <h2
                id="faq-title"
                className="mt-10 text-[clamp(2rem,5vw,3.5rem)] leading-[0.95]"
              >
                Preguntas <span className="text-accent">frecuentes</span>
              </h2>
            </Reveal>
            <Reveal delay={130}>
              <p className="mt-7 max-w-sm text-sm leading-relaxed text-chalk/50">
                Si tu caso no está acá, escribinos y lo charlamos. También podés
                mandar fotos desde el formulario.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal delay={100}>
              <Accordion faqs={faqs} />
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}