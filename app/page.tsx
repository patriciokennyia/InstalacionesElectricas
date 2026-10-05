import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { BrandPhrase } from "@/components/sections/BrandPhrase";
import { ServicesEditorial } from "@/components/sections/ServicesEditorial";
import { ClientSegments } from "@/components/sections/ClientSegments";
import { BuildingsFeature } from "@/components/sections/BuildingsFeature";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { WorkGallery } from "@/components/sections/WorkGallery";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { SafetySection } from "@/components/sections/SafetySection";
import { FaqSection, QuoteCta } from "@/components/sections/QuoteCta";
import { ContactForm } from "@/components/sections/ContactForm";
import { Container } from "@/components/ui/Container";
import { JsonLd, Section } from "@/components/ui/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ButtonLink } from "@/components/ui/Button";
import { generalFaqs } from "@/data/faqs";
import { siteConfig, brandCopy } from "@/data/site";
import { buildFaqSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Instalaciones eléctricas en CABA y GBA",
  description:
    "Instalaciones eléctricas para hogares, edificios, consorcios, comercios y empresas. Tableros, puesta a tierra, iluminación, luces de emergencia y declaraciones de carga. Envianos fotos y evaluamos tu instalación.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandPhrase />
      <ServicesEditorial />
      <ClientSegments />
      <BuildingsFeature />
      <BeforeAfter />
      <WorkGallery limit={3} />
      <ProcessSteps />
      <SafetySection />
      <QuoteCta />
      <FaqSection />
      <ContactSection />
      <JsonLd schema={buildFaqSchema(generalFaqs)} />
    </>
  );
}

/** Cierre de conversión: el formulario, con ancla para el CTA del header. */
function ContactSection() {
  return (
    <Section
      id="contacto"
      aria-labelledby="contacto-title"
      className="border-t border-chalk/10 bg-carbon"
    >
      <Container>
        <Reveal>
          <SectionLabel number={11}>Consulta</SectionLabel>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Reveal>
              <h2
                id="contacto-title"
                className="text-[clamp(2.25rem,5.6vw,4.25rem)] leading-[0.95]"
              >
                Contanos qué <span className="text-accent">hay que resolver</span>
              </h2>
            </Reveal>
            <Reveal delay={90}>
              <p className="mt-7 max-w-md text-lg leading-relaxed text-chalk/60">
                {brandCopy.promise}
              </p>
            </Reveal>
            <Reveal delay={150}>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-chalk/45">
                Trabajamos en {siteConfig.coverageArea}. Si podés, adjuntá fotos del
                tablero o de la instalación: nos ayudan a entender el trabajo antes
                de coordinarte la visita.
              </p>
            </Reveal>
            <Reveal delay={210}>
              <ButtonLink href="/servicios" variant="secondary" className="mt-9">
                Ver todos los servicios
              </ButtonLink>
            </Reveal>
          </div>

          <div id="formulario" className="scroll-mt-28 lg:col-span-7">
            <Reveal delay={120}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}