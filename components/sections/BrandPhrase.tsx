import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { getSupportPhoto } from "@/data/projects";

const concepts = [
  "Seguridad",
  "Precisión",
  "Calidad",
  "Confianza",
  "Respuesta",
  "Orden",
];

/**
 * Frase de marca. Bloque de mucho aire y pocos elementos: es un respiro
 * entre el hero y los servicios.
 */
export function BrandPhrase() {
  const photo = getSupportPhoto("detail", 0);

  return (
    <section className="relative py-24 md:py-36" aria-labelledby="frase-marca">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <h2
                id="frase-marca"
                className="text-[clamp(2rem,5.2vw,3.75rem)] leading-[1.02]"
              >
                <span className="block text-chalk">La electricidad no se ve.</span>
                <span className="block text-accent">Su calidad, sí.</span>
              </h2>
            </Reveal>

            <Reveal delay={120}>
              <p className="mt-9 max-w-xl text-lg leading-relaxed text-chalk/60">
                Una instalación correctamente realizada no solamente funciona.
                También aporta seguridad, orden y tranquilidad.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <p className="mt-12 max-w-sm font-display text-[0.66rem] uppercase leading-[2.2] tracking-[0.22em] text-chalk/35">
                Evaluamos · Diagnosticamos · Adecuamos · Instalamos · Mantenemos ·
                Resolvemos
              </p>
            </Reveal>
          </div>

          <Reveal delay={160} className="lg:col-span-4 lg:col-start-9">
            <PhotoFrame
              photo={photo}
              // TODO: reemplazar por fotografía de detalle real del cliente.
              alt="Detalle de una instalación eléctrica"
              placeholderLabel="Detalle de instalación"
              placeholderIndex={2}
              sizes="(min-width: 1024px) 30vw, 100vw"
              className="aspect-[3/4] w-full"
            />
          </Reveal>
        </div>
      </Container>

      {/* Cinta de conceptos */}
      <div className="mt-24 border-y border-chalk/10 py-5 md:mt-32">
        <div className="overflow-hidden">
          <ul className="marquee-track flex w-max items-center gap-10 md:gap-16">
            {[...concepts, ...concepts].map((concept, index) => (
              <li
                key={`${concept}-${index}`}
                className="flex items-center gap-10 font-display text-sm uppercase tracking-[0.3em] text-chalk/30 md:gap-16"
              >
                {concept}
                <span aria-hidden="true" className="size-1 bg-accent/60" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}