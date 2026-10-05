import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Section } from "@/components/ui/JsonLd";
import { segments } from "@/data/segments";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

/** Cuatro bloques por tipo de cliente. El de edificios se destaca. */
export function ClientSegments() {
  return (
    <Section
      id="soluciones"
      aria-labelledby="soluciones-title"
      className="border-t border-chalk/10 bg-carbon"
    >
      <Container>
        <Reveal>
          <SectionLabel number={3}>Por cliente</SectionLabel>
        </Reveal>

        <div className="mt-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <h2
              id="soluciones-title"
              className="max-w-3xl text-[clamp(2rem,5.4vw,4rem)] leading-[0.95]"
            >
              Soluciones según <span className="text-accent">tu necesidad</span>
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-px bg-chalk/10 sm:grid-cols-2 lg:grid-cols-4">
          {segments.map((segment, index) => (
            <Reveal key={segment.slug} delay={index * 80}>
              <article
                className={cn(
                  "group relative flex h-full flex-col justify-between bg-ink p-7 transition-colors duration-500 hover:bg-graphite md:p-8",
                  segment.featured && "bg-graphite",
                )}
              >
                {/* Edificios: hilo amarillo que marca el bloque prioritario */}
                {segment.featured ? (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-0.5 bg-accent"
                  />
                ) : null}

                <div>
                  <Icon
                    name={segment.icon}
                    className="size-7 text-accent/90"
                  />
                  <h3 className="mt-6 text-[1.5rem] leading-none">
                    {segment.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-chalk/55">
                    {segment.description}
                  </p>

                  <ul className="mt-6 space-y-2 border-t border-chalk/10 pt-5">
                    {segment.points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-2.5 text-[0.8125rem] leading-relaxed text-chalk/60"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 size-1 shrink-0 bg-accent/70"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 flex flex-col items-start gap-4">
                  <Link
                    href={
                      segment.featured
                        ? "/servicios/mantenimiento-edificios"
                        : `/servicios/${segment.services[0]}`
                    }
                    className="inline-flex items-center gap-2 font-display text-[0.64rem] uppercase tracking-[0.2em] text-chalk transition-colors group-hover:text-accent"
                  >
                    Ver servicios
                    <span
                      aria-hidden="true"
                      className="h-px w-6 bg-accent/70 transition-all duration-500 group-hover:w-10"
                    />
                  </Link>

                  <a
                    href={buildWhatsAppUrl(segment.whatsappKey)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display text-[0.62rem] uppercase tracking-[0.2em] text-chalk/40 transition-colors hover:text-accent"
                  >
                    Consultar por WhatsApp
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}