/** Etapas del proceso. Copy directo, sin promesas de plazo. */
export type ProcessStep = {
  number: string;
  title: string;
  body: string;
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Consultamos",
    body: "Escuchamos qué está pasando y qué hace falta resolver. Si podés, mandanos fotos del tablero o de la instalación.",
  },
  {
    number: "02",
    title: "Evaluamos",
    body: "Revisamos la instalación en el lugar para entender el estado real y detectar lo que no se ve a simple vista.",
  },
  {
    number: "03",
    title: "Proponemos",
    body: "Explicamos qué hay que hacer y por qué. Sin promisos: el valor depende del estado de la instalación.",
  },
  {
    number: "04",
    title: "Resolvemos",
    body: "Ejecutamos el trabajo por etapas, cuidando los detalles y dejando la instalación ordenada.",
  },
];

/** Principios de trabajo. Sin certificaciones ni garantías inventadas. */
export type Principle = {
  icon: "shieldCheck" | "wrench" | "handshake" | "zap" | "panels" | "lightbulb";
  title: string;
  body: string;
};

export const principles: Principle[] = [
  {
    icon: "shieldCheck",
    title: "Seguridad",
    body: "Buscamos soluciones seguras y adecuadas para cada instalación.",
  },
  {
    icon: "wrench",
    title: "Orden",
    body: "Trabajo prolijo, con terminaciones que se pueden mantener.",
  },
  {
    icon: "zap",
    title: "Diagnóstico",
    body: "Primero entender el problema, después proponer la solución.",
  },
  {
    icon: "panels",
    title: "Precisión",
    body: "Cada circuito identificado, cada conexión en su lugar.",
  },
  {
    icon: "lightbulb",
    title: "Comunicación",
    body: "Explicamos lo que hacemos y lo que encontramos.",
  },
  {
    icon: "handshake",
    title: "Atención personalizada",
    body: "Cada instalación se evalúa como un caso particular.",
  },
];

/**
 * Servicios complementarios: referencias de profesionales, NO servicios
 * eléctricos propios. Air acondicionado nunca se ofrece como servicio propio.
 */
export const complementaryServices = [
  { title: "Plomería", body: "Referencia de profesional." },
  { title: "Albañilería", body: "Referencia de profesional." },
  { title: "Pintura", body: "Referencia de profesional." },
] as const;

export const complementaryNote =
  "Son referencias de profesionales complementarios, no servicios eléctricos propios. Para trabajos complementarios podemos ayudarte a coordinar una referencia.";