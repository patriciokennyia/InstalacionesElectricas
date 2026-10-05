"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from "react";
import { cn } from "@/lib/utils";

/** Sin eventos a los que suscribirse: solo se lee el soporte del navegador. */
function noopSubscribe() {
  return () => {};
}

/**
 * Entrada al hacer scroll. CSS-first: solo cambia un atributo `data-state` y
 * la transición la resuelve `globals.css`. Cero librería de animación.
 *
 * Respeta `prefers-reduced-motion` mediante las reglas del propio CSS.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as,
}: {
  children: React.ReactNode;
  /** Retardo en ms. Se usa para escalonar elementos de una misma fila. */
  delay?: number;
  className?: string;
  /** Elemento que se renderiza. `li` dentro de listas, `div` por defecto. */
  as?: "div" | "li";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  // Snapshot de servidor `true` para que el HTML inicial coincida con el
  // primer render del cliente (que arranca en `out` y anima al entrar).
  const hasObserver = useSyncExternalStore(
    noopSubscribe,
    () => typeof IntersectionObserver !== "undefined",
    () => true,
  );

  // El tag dinámico se tipa como `div` para que el ref sea estable.
  const Tag = (as ?? "div") as "div";

  useEffect(() => {
    if (!hasObserver) return;
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.04 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [hasObserver]);

  // Sin IntersectionObserver no hay animación posible: se muestra directo.
  const visible = hasObserver ? inView : true;

  return (
    <Tag
      ref={ref}
      data-state={visible ? "in" : "out"}
      className={cn("reveal", className)}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}