import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { WorkGallery } from "@/components/sections/WorkGallery";
import { ButtonLink } from "@/components/ui/Button";
import { hasProjects, projectCategories, projects } from "@/data/projects";
import { services } from "@/data/services";
import { pageMetadata, buildBreadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";

export const metadata: Metadata = pageMetadata({
  title: "Trabajos realizados",
  description:
    "Trabajos eléctricos realizados: adecuación de tableros, puesta a tierra, iluminación, automáticos de palier, luces de emergencia y declaraciones de carga.",
  path: "/trabajos",
});

const crumbs = [
  { name: "Inicio", path: "/" },
  { name: "Trabajos", path: "/trabajos" },
];

export default function WorksPage() {
  return (
    <>
      <section
        className="relative overflow-hidden border-b border-chalk/10 pt-[var(--spacing-header)]"
        aria-labelledby="trabajos-title"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="technical-grid absolute inset-0 opacity-30" />
          <div className="absolute right-0 top-0 size-[32rem] rounded-full bg-accent/[0.06] blur-[120px]" />
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
              <li className="text-accent/80">Trabajos</li>
            </ol>
          </nav>

          <Reveal>
            <h1
              id="trabajos-title"
              className="mt-9 max-w-4xl text-[clamp(2.5rem,8vw,5.5rem)] leading-[0.88]"
            >
              Trabajos <span className="text-accent">realizados</span>
            </h1>
          </Reveal>

          {hasProjects ? (
            <Reveal delay={90}>
              <div className="mt-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <p className="max-w-xl text-lg leading-relaxed text-chalk/60">
                  {projects.length} registro{projects.length === 1 ? "" : "s"}{" "}
                  documentado{projects.length === 1 ? "" : "s"}. Cada uno con su
                  categoría y su resultado.
                </p>
              </div>
            </Reveal>
          ) : null}
        </Container>
      </section>

      {hasProjects ? (
        <Reveal delay={100}>
          <Container>
            {projectCategories.length > 1 ? (
              <ul className="flex flex-wrap gap-x-6 gap-y-2 border-b border-chalk/10 pb-6">
                {projectCategories.map((category) => (
                  <li
                    key={category}
                    className="font-display text-[0.62rem] uppercase tracking-[0.2em] text-chalk/40"
                  >
                    {category}
                  </li>
                ))}
              </ul>
            ) : null}
          </Container>
        </Reveal>
      ) : null}

      <WorkGallery />

      {/* Enlace a servicios: da salida a quien llegó buscando referencias */}
      <section
        aria-labelledby="trabajos-cta"
        className="border-t border-chalk/10 bg-carbon py-20 md:py-28"
      >
        <Container>
          <Reveal>
            <SectionTitleLine />
          </Reveal>

          <ul className="mt-12 grid gap-px bg-chalk/10 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Reveal key={service.slug} delay={index * 60}>
                <li>
                  <Link
                    href={`/servicios/${service.slug}`}
                    className="group flex items-center justify-between gap-4 bg-ink p-6 transition-colors duration-500 hover:bg-graphite"
                  >
                    <span className="text-sm text-chalk/70 transition-colors group-hover:text-chalk">
                      {service.title}
                    </span>
                    <ArrowRight
                      className="size-4 shrink-0 text-accent/70 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={120} className="mt-12">
            <ButtonLink href="/contacto#formulario" size="lg">
              Consultar por un trabajo
            </ButtonLink>
          </Reveal>
        </Container>
      </section>

      <JsonLd schema={buildBreadcrumbSchema(crumbs)} />
    </>
  );
}

function SectionTitleLine() {
  return (
    <h2
      id="trabajos-cta"
      className="text-[clamp(1.875rem,4.5vw,3.25rem)] leading-[0.98]"
    >
      ¿Necesitás algo <span className="text-accent">parecido?</span>
    </h2>
  );
}