import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Section } from "@/components/ui/JsonLd";
import { complementaryNote, complementaryServices, principles } from "@/data/process";

/**
 * Seguridad ante todo.
 *
 * Copy deliberadamente sin referencias normativas ni certificaciones: el
 * documento fuente no las confirma y no se inventan.
 */
export function SafetySection() {
  return (
    <Section id="seguridad" aria-labelledby="seguridad-title" className="bg-ink">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionLabel number={9}>Seguridad</SectionLabel>
            </Reveal>
            <Reveal delay={80}>
              <h2
                id="seguridad-title"
                className="mt-10 text-[clamp(2.25rem,6vw,4.25rem)] leading-[0.95]"
              >
                Seguridad <span className="text-accent">ante todo</span>
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-8 max-w-md text-lg leading-relaxed text-chalk/65">
                Trabajamos buscando soluciones seguras, ordenadas y adecuadas para
                cada instalación.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-8 max-w-md text-sm leading-relaxed text-chalk/40">
                La instalación eléctrica no se ve mientras funciona. Por eso el
                detalle en las terminaciones, la identificación de los circuitos y
                el orden de las conexiones son la diferencia entre una obra
                terminada y una obra mantenible.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <ul className="grid gap-px bg-chalk/10 sm:grid-cols-2">
              {principles.map((principle, index) => (
                <Reveal key={principle.title} delay={index * 70}>
                  <li className="group flex h-full flex-col gap-4 bg-ink p-7 transition-colors duration-500 hover:bg-graphite">
                    <Icon
                      name={principle.icon}
                      className="size-7 text-accent transition-transform duration-500 group-hover:scale-110"
                    />
                    <h3 className="text-[1.25rem] leading-none">{principle.title}</h3>
                    <p className="text-sm leading-relaxed text-chalk/55">
                      {principle.body}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>

        {/* Servicios complementarios: referencias, nunca servicios propios */}
        <Reveal delay={120}>
          <div className="mt-24 border-t border-chalk/10 pt-12">
            <h3 className="font-display text-[0.66rem] uppercase tracking-[0.28em] text-chalk/40">
              También podemos ayudarte a coordinar
            </h3>
            <ul className="mt-6 flex flex-wrap gap-3">
              {complementaryServices.map((service) => (
                <li
                  key={service.title}
                  className="border border-chalk/15 px-5 py-3 font-display text-[0.68rem] uppercase tracking-[0.2em] text-chalk/60"
                >
                  {service.title}
                </li>
              ))}
            </ul>
            <p className="mt-5 max-w-2xl text-xs leading-relaxed text-chalk/35">
              {complementaryNote}
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}