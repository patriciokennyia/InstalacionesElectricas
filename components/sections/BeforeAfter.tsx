"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MoveHorizontal } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { beforeAfterPairs, type BeforeAfterPair } from "@/data/projects";
import { cn } from "@/lib/utils";

/**
 * Comparador antes / después.
 *
 * Funciona con mouse, touch y teclado:
 * - puntero (arrastrar),
 * - teclado (role="slider" con flechas, Inicio y Fin),
 * - botón de alternancia para quien no arrastra.
 *
 * Sin librería de animación: el desplazamiento es un `clip-path`.
 */
export function BeforeAfter() {
  // Los hooks se ejecutan siempre; el render condicional va después.
  const [index, setIndex] = useState(0);
  const pairs = beforeAfterPairs;

  if (pairs.length === 0) return null;

  const pair = pairs[index] ?? pairs[0];
  if (!pair) return null;

  return (
    <section
      id="antes-despues"
      aria-labelledby="antes-despues-title"
      className="border-t border-chalk/10 bg-carbon py-20 md:py-28 lg:py-32"
    >
      <Container>
        <Reveal>
          <SectionLabel number={6}>Antes / después</SectionLabel>
        </Reveal>

        <div className="mt-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <h2
              id="antes-despues-title"
              className="text-[clamp(2rem,5.2vw,3.75rem)] leading-[0.98]"
            >
              Del problema <span className="text-chalk/35">→</span>{" "}
              <span className="text-accent">a la solución</span>
            </h2>
          </Reveal>

          {beforeAfterPairs.length > 1 ? (
            <Reveal delay={100}>
              <div className="flex gap-px bg-chalk/15" role="group" aria-label="Elegir comparación">
                {beforeAfterPairs.map((item, itemIndex) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setIndex(itemIndex)}
                    aria-pressed={itemIndex === index}
                    className={cn(
                      "bg-carbon px-4 py-2 font-display text-[0.6rem] uppercase tracking-[0.18em] transition-colors",
                      itemIndex === index
                        ? "bg-accent text-ink"
                        : "text-chalk/55 hover:text-chalk",
                    )}
                  >
                    {item.title || `Comparación ${itemIndex + 1}`}
                  </button>
                ))}
              </div>
            </Reveal>
          ) : null}
        </div>

        <Reveal delay={120} className="mt-12">
          <Comparator key={pair.id} pair={pair} />
        </Reveal>
      </Container>
    </section>
  );
}

function Comparator({ pair }: { pair: BeforeAfterPair }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const element = containerRef.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    if (rect.width === 0) return;
    const raw = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, raw)));
  }, []);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
    updateFromClientX(event.clientX);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    updateFromClientX(event.clientX);
  };

  const stopDragging = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setDragging(false);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const step = event.shiftKey ? 10 : 4;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setPosition((value) => Math.max(0, value - step));
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      setPosition((value) => Math.min(100, value + step));
    } else if (event.key === "Home") {
      event.preventDefault();
      setPosition(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setPosition(100);
    }
  };

  // El cursor propio del componente superpuesto estorba al arrastre: se oculta.
  useEffect(() => {
    document.body.style.userSelect = dragging ? "none" : "";
    return () => {
      document.body.style.userSelect = "";
    };
  }, [dragging]);

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="lg:col-span-9">
        <div
          ref={containerRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={stopDragging}
          onPointerCancel={stopDragging}
          className={cn(
            "relative aspect-[4/3] w-full touch-none select-none overflow-hidden border border-chalk/12 bg-carbon md:aspect-[16/10]",
            dragging ? "cursor-grabbing" : "cursor-grab",
          )}
        >
          {/* ANTES (base) */}
          <Image
            src={pair.before.src}
            alt={`Antes: ${pair.before.alt}`}
            fill
            sizes="(min-width: 1024px) 70vw, 100vw"
            className="photo-grade object-cover"
          />

          {/* DESPUÉS (revelado) */}
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          >
            <Image
              src={pair.after.src}
              alt={`Después: ${pair.after.alt}`}
              fill
              sizes="(min-width: 1024px) 70vw, 100vw"
              className="photo-grade object-cover"
            />
          </div>

          {/* Etiquetas */}
          <span className="pointer-events-none absolute left-4 top-4 bg-ink/85 px-3 py-1.5 font-display text-[0.6rem] uppercase tracking-[0.2em] text-chalk/70 backdrop-blur">
            Del problema
          </span>
          <span className="pointer-events-none absolute right-4 top-4 bg-accent px-3 py-1.5 font-display text-[0.6rem] uppercase tracking-[0.2em] text-ink">
            A la solución
          </span>

          {/* Manejador */}
          <div
            role="slider"
            tabIndex={0}
            aria-label="Comparar antes y después"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(position)}
            aria-valuetext={`${Math.round(position)}% de la solución visible`}
            onKeyDown={onKeyDown}
            className="absolute inset-y-0 z-10 w-12 -translate-x-1/2 cursor-ew-resize focus-visible:outline-none"
            style={{ left: `${position}%` }}
          >
            <span aria-hidden="true" className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-accent" />
            <span
              aria-hidden="true"
              className="absolute top-1/2 left-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-accent text-ink shadow-[0_8px_28px_-8px_rgba(0,0,0,0.8)]"
            >
              <MoveHorizontal className="size-5" strokeWidth={2} />
            </span>
          </div>
        </div>

        <p className="mt-3 text-xs text-chalk/35">
          Arrastrá, usá las flechas del teclado o el botón para ver el cambio.
        </p>
      </div>

      {/* Ficha del trabajo */}
      <aside className="lg:col-span-3">
        <h3 className="font-display text-[0.62rem] uppercase tracking-[0.25em] text-accent">
          {pair.title || "Trabajo"}
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-chalk/60">{pair.alt}</p>

        <button
          type="button"
          onClick={() => setPosition((value) => (value > 50 ? 0 : 100))}
          className="mt-6 w-full border border-chalk/20 px-5 py-3 font-display text-[0.64rem] uppercase tracking-[0.2em] text-chalk transition-colors hover:border-accent hover:text-accent"
        >
          Ver otra vez
        </button>
      </aside>
    </div>
  );
}