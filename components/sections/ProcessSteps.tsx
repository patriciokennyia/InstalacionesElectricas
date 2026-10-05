import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Section } from "@/components/ui/JsonLd";
import { processSteps } from "@/data/process";

/**
 * Proceso en cuatro etapas.
 * Horizontal en desktop con línea conectoria, vertical en mobile.
 */
export function ProcessSteps() {
  return (
    <Section
      id="proceso"
      aria-labelledby="proceso-title"
      className="border-t border-chalk/10 bg-carbon"
    >
      <Container>
        <Reveal>
          <SectionLabel number={8}>Proceso</SectionLabel>
        </Reveal>

        <Reveal delay={80}>
          <h2
            id="proceso-title"
            className="mt-10 text-[clamp(2.25rem,6vw,4.5rem)] leading-[0.95]"
          >
            Así <span className="text-accent">trabajamos</span>
          </h2>
        </Reveal>

        <ol className="relative mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Línea conectoria: horizontal en desktop */}
          <span
            aria-hidden="true"
            className="absolute left-0 top-4 hidden h-px w-full bg-chalk/12 lg:block"
          />
          {/* Vertical en mobile */}
          <span
            aria-hidden="true"
            className="absolute left-4 top-4 h-full w-px bg-chalk/12 sm:hidden"
          />

          {processSteps.map((step, index) => (
            <Reveal key={step.number} delay={index * 110} as="li">
              <div className="relative pl-12 lg:pl-0">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 flex size-9 items-center justify-center border border-accent/45 bg-carbon font-display text-[0.62rem] tracking-[0.12em] text-accent lg:relative lg:mb-7 lg:size-9"
                >
                  {step.number}
                </span>
                <h3 className="text-[1.375rem] leading-none">{step.title}</h3>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-chalk/55">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}