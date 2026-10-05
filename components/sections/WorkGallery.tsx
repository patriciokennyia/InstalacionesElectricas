import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Section } from "@/components/ui/JsonLd";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import { hasProjects, projectCategories, projects } from "@/data/projects";
import { cn } from "@/lib/utils";

/** Portafolio de trabajos realizados. */
export function WorkGallery({ limit }: { limit?: number }) {
  const visible = typeof limit === "number" ? projects.slice(0, limit) : projects;

  return (
    <Section id="trabajos" aria-labelledby="trabajos-title" className="bg-ink">
      <Container>
        <Reveal>
          <SectionLabel number={7}>Trabajos</SectionLabel>
        </Reveal>

        <div className="mt-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <h2
              id="trabajos-title"
              className="max-w-2xl text-[clamp(2.25rem,6vw,4.5rem)] leading-[0.95]"
            >
              Trabajos <span className="text-accent">realizados</span>
            </h2>
          </Reveal>

          {hasProjects ? (
            <Reveal delay={100}>
              <TextLink href="/trabajos">Ver todos los trabajos</TextLink>
            </Reveal>
          ) : null}
        </div>

        {!hasProjects ? (
          <EmptyGallery />
        ) : (
          <>
            {projectCategories.length > 1 ? (
              <Reveal delay={140} className="mt-10">
                <ul className="flex flex-wrap gap-x-6 gap-y-2">
                  {projectCategories.map((category) => (
                    <li
                      key={category}
                      className="font-display text-[0.62rem] uppercase tracking-[0.2em] text-chalk/40"
                    >
                      {category}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ) : null}

            <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
              {visible.map((project, index) => (
                <Reveal key={`${project.title}-${index}`} delay={Math.min(index * 70, 280)}>
                  <li>
                    <article className="group">
                      <div className="relative overflow-hidden border border-chalk/12 transition-colors duration-500 group-hover:border-accent/50">
                        <PhotoFrame
                          photo={{ src: project.image, alt: project.alt }}
                          alt={project.alt}
                          sizes="(min-width: 1024px) 32vw, (min-width: 640px) 50vw, 100vw"
                          className="aspect-[4/5]"
                          overlay={false}
                        />
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        />
                        {project.location ? (
                          <span className="absolute left-4 top-4 bg-ink/85 px-2.5 py-1 font-display text-[0.58rem] uppercase tracking-[0.18em] text-chalk/70 backdrop-blur">
                            {project.location}
                          </span>
                        ) : null}
                      </div>

                      <div className="mt-5">
                        <p className="font-display text-[0.6rem] uppercase tracking-[0.22em] text-accent/80">
                          {project.category}
                        </p>
                        <h3 className="mt-2 text-xl leading-tight text-chalk transition-colors group-hover:text-accent">
                          {project.title}
                        </h3>
                        <p className="mt-2.5 text-sm leading-relaxed text-chalk/50">
                          {project.description}
                        </p>
                        {project.result ? (
                          <p className="mt-3 border-l border-accent/40 pl-3 text-xs leading-relaxed text-chalk/45">
                            {project.result}
                          </p>
                        ) : null}
                      </div>
                    </article>
                  </li>
                </Reveal>
              ))}
            </ul>

            {typeof limit === "number" && projects.length > limit ? (
              <Reveal delay={120} className="mt-14 flex justify-center">
                <ButtonLink href="/trabajos" variant="secondary">
                  Ver todos los trabajos
                </ButtonLink>
              </Reveal>
            ) : null}
          </>
        )}
      </Container>
    </Section>
  );
}

/**
 * Estado vacío honesto: no se inventan trabajos ni se muestran placeholders
 * falsos. Se explica qué falta y se ofrece el siguiente paso.
 */
function EmptyGallery() {
  return (
    <Reveal delay={140}>
      <div
        className={cn(
          "mt-12 grid gap-px bg-chalk/10 md:grid-cols-2",
        )}
      >
        <div className="bg-graphite p-8 md:p-10">
          <p className="font-display text-[0.6rem] uppercase tracking-[0.25em] text-chalk/35">
            Archivo en preparación
          </p>
          <h3 className="mt-4 text-2xl leading-tight">
            Los trabajos se están <span className="text-accent">documentando</span>
          </h3>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-chalk/55">
            Cada obra se registra con su fotografía, su categoría y el resultado
            obtenido. Preferimos mostrar menos antes que mostrar algo que no se
            corresponde con el trabajo entregado.
          </p>
        </div>

        <div className="flex flex-col justify-center gap-5 bg-carbon p-8 md:p-10">
          <p className="text-sm leading-relaxed text-chalk/55">
            Si ya trabajamos juntos o conocés un edificio que necesita
            mantenimiento, escribinos y lo revisamos.
          </p>
          <Link
            href="/contacto#formulario"
            className="font-display text-[0.66rem] uppercase tracking-[0.2em] text-accent hover:underline"
          >
            Consultar por mantenimiento
          </Link>
        </div>
      </div>
    </Reveal>
  );
}