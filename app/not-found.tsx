import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ButtonLink, WhatsappButton } from "@/components/ui/Button";
import { services } from "@/data/services";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export default function NotFound() {
  return (
    <section className="relative flex min-h-dvh items-center overflow-hidden pt-[var(--spacing-header)]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="technical-grid absolute inset-0 opacity-30" />
      </div>

      <Container className="relative py-24">
        <p className="font-display text-[0.66rem] uppercase tracking-[0.3em] text-accent">
          Error 404
        </p>
        <h1 className="mt-7 text-[clamp(2.75rem,9vw,6rem)] leading-[0.9]">
          Esta página <span className="text-accent">no existe</span>
        </h1>
        <p className="mt-7 max-w-lg text-lg leading-relaxed text-chalk/60">
          El enlace puede estar vencido o la dirección mal escrita. Te dejo los
          servicios más consultados para que llegues a donde estabas buscando.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <ButtonLink href="/" size="lg">
            Volver al inicio
          </ButtonLink>
          <WhatsappButton
            href={buildWhatsAppUrl("general")}
            className="px-8 py-4 text-[0.78rem]"
          />
        </div>

        <ul className="mt-16 grid gap-px bg-chalk/10 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <li key={service.slug}>
              <Link
                href={`/servicios/${service.slug}`}
                className="block bg-ink p-6 text-sm text-chalk/65 transition-colors hover:bg-graphite hover:text-accent"
              >
                {service.title}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}