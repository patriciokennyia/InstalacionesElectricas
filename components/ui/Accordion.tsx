import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FaqItem } from "@/lib/seo";

/**
 * Acordeón construido sobre `<details>` nativo.
 *
 * A elección de performance y accesibilidad: el estado vive en el DOM (funciona
 * sin JS, navegable con teclado, conmutable con lector de pantalla y
 * estilizable). Se pierde la animación de alto, que no aporta nada aquí.
 */
export function Accordion({
  faqs,
  className,
  questionClassName,
  defaultOpenFirst = false,
}: {
  faqs: FaqItem[];
  className?: string;
  questionClassName?: string;
  defaultOpenFirst?: boolean;
}) {
  return (
    <div className={cn("divide-y divide-chalk/10 border-t border-chalk/10", className)}>
      {faqs.map((faq, index) => (
        <details
          key={faq.question}
          className="group/faq"
          open={defaultOpenFirst && index === 0}
        >
          <summary
            className={cn(
              "flex cursor-pointer list-none items-start justify-between gap-6 py-6 font-display text-base uppercase tracking-[0.04em] text-chalk transition-colors duration-300 marker:content-none hover:text-accent focus-visible:text-accent sm:text-lg [&::-webkit-details-marker]:hidden",
              questionClassName,
            )}
          >
            <span className="flex gap-5">
              <span className="mt-1 font-display text-[0.65rem] tracking-[0.2em] text-accent/70">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{faq.question}</span>
            </span>
            <ChevronDown
              className="mt-1 size-5 shrink-0 text-chalk/40 transition-transform duration-300 ease-[var(--ease-out-expo)] group-open/faq:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <div className="pb-7 pl-0 sm:pl-[3.1rem]">
            <p className="max-w-2xl text-[0.95rem] leading-relaxed text-chalk/65">
              {faq.answer}
            </p>
          </div>
        </details>
      ))}
    </div>
  );
}