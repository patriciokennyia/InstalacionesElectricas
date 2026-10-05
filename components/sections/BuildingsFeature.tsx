import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink, WhatsappButton } from "@/components/ui/Button";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { getSupportPhoto } from "@/data/projects";
import { servicesBySlug } from "@/data/services";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

/**
 * Sección destacada: mantenimiento eléctrico para edificios.
 *
 * Es el bloque de mayor peso visual de la home. Composición full-bleed con
 * imagen grande, texto y lista técnica.
 */
export function BuildingsFeature() {
  const photo = getSupportPhoto("project", 0);
  const service = servicesBySlug["mantenimiento-edificios"];
  const checklist = service?.includes ?? [];

  return (
    <section
      id="edificios"
      aria-labelledby="edificios-title"
      className="relative overflow-hidden border-y border-chalk/10"
    >
      <div aria-hidden="true" className="absolute inset-0">
        <div className="technical-grid absolute inset-0 opacity-30" />
        <div className="absolute left-1/2 top-0 size-[40rem] -translate-x-1/2 rounded-full bg-accent/[0.05] blur-[130px]" />
      </div>

      <Container className="relative py-20 md:py-28 lg:py-36">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Imagen grande */}
          <Reveal className="lg:col-span-6">
            <div className="relative">
              <PhotoFrame
                photo={photo}
                // TODO: reemplazar por fotografía real: tablero de bombas,
                // palier o iluminación de un edificio.
                alt="Mantenimiento eléctrico en edificio: tablero de bombas o palier"
                placeholderLabel="Fotografía del cliente — tablero de bombas o palier"
                placeholderIndex={3}
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="aspect-[4/5] w-full"
              />
              <div className="absolute -right-3 -top-3 size-16 border-r-2 border-t-2 border-accent lg:-right-6" />
            </div>
          </Reveal>

          {/* Texto + lista técnica */}
          <div className="lg:col-span-6 lg:pl-8">
            <Reveal>
              <SectionLabel number={4} tone="light">
                Edificios y consorcios
              </SectionLabel>
            </Reveal>

            <Reveal delay={80}>
              <h2
                id="edificios-title"
                className="mt-9 text-[clamp(2.25rem,5.4vw,4.25rem)] leading-[0.95]"
              >
                Mantenimiento eléctrico para{" "}
                <span className="text-accent">edificios</span>
              </h2>
            </Reveal>

            <Reveal delay={140}>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-chalk/65">
                Una instalación eléctrica correctamente mantenida ayuda a detectar
                problemas antes de que se conviertan en inconvenientes mayores.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <ul className="mt-10 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {checklist.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 border-b border-chalk/10 pb-3 text-sm text-chalk/70"
                  >
                    <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={260}>
              <p className="mt-10 border-l-2 border-accent pl-5 text-sm leading-relaxed text-chalk/50">
                Un edificio nunca termina de ajustarse: se suma una bomba, se cambia
                un automático, se renueva un palier. El mantenimiento continuo evita
                que todo eso se acumule sin control.
              </p>
            </Reveal>

            <Reveal delay={320}>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <ButtonLink href="/servicios/mantenimiento-edificios" size="lg">
                  Consultar por mi edificio
                </ButtonLink>
                <WhatsappButton
                  href={buildWhatsAppUrl("buildings")}
                  className="px-8 py-4 text-[0.78rem]"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}