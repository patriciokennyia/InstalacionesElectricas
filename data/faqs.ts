import type { FaqItem } from "@/lib/seo";

/**
 * FAQ general. Todas las respuestas derivan de los servicios reales definidos
 * en la reunión: no se promete cobertura, tiempos ni condiciones no confirmadas.
 */
export const generalFaqs: FaqItem[] = [
  {
    question: "¿Realizan trabajos eléctricos en edificios?",
    answer:
      "Sí. El mantenimiento eléctrico de edificios y consorcios es una parte central de la rutina de trabajo: tablero de bombas, automáticos de palier, luces de emergencia, iluminación, puesta a tierra y tomas.",
  },
  {
    question: "¿Realizan mantenimiento de tableros?",
    answer:
      "Sí. Se realiza mantenimiento de tableros domiciliarios y de tableros de bombas, además de adecuaciones para dejar cada circuito identificado.",
  },
  {
    question: "¿Trabajan con puesta a tierra?",
    answer:
      "Sí. Se hacen adecuaciones de PAT, puesta en servicio y trabajos de puesta a tierra en edificios.",
  },
  {
    question: "¿Realizan mantenimiento de luces de emergencia?",
    answer:
      "Sí. El mantenimiento de luces de emergencia incluye revisión del estado de carga, autonomía y ubicación de las luminarias, además de la solución de problemas.",
  },
  {
    question: "¿Puedo enviar fotos antes de solicitar presupuesto?",
    answer:
      "Sí, y es la forma más rápida de arrancar. Podés adjuntar fotos del tablero o de la instalación en el formulario de consulta: nos ayudan a entender mejor el trabajo antes de coordinarte una visita.",
  },
  {
    question: "¿Trabajan con medidores monofásicos y trifásicos?",
    answer:
      "Sí. La gestión y certificación de Declaraciones de Carga se realiza para medidores nuevos monofásicos y trifásicos.",
  },
  {
    question: "¿Qué es una Declaración de Carga?",
    answer:
      "Es el documento que declara la carga de una instalación eléctrica ante el proveedor. Se necesita cuando se instala un medidor nuevo o cuando la instalación necesita declarar una potencia distinta a la original.",
  },
  {
    question: "¿Realizan trabajos domiciliarios?",
    answer:
      "Sí. Arreglos generales, tomas, adecuaciones e instalaciones eléctricas en casas y departamentos.",
  },
  {
    question: "¿Trabajan para comercios?",
    answer:
      "Sí. Se realizan instalaciones y adecuaciones para locales y espacios comerciales.",
  },
  {
    question: "¿Cómo solicito un presupuesto?",
    answer:
      "Desde el formulario de consulta, por WhatsApp o por teléfono. El valor depende del estado real de la instalación, así que primero evaluamos y después definimos el trabajo.",
  },
];

export type ClientType = {
  value: string;
  label: string;
};

export const clientTypes: ClientType[] = [
  { value: "casa", label: "Casa" },
  { value: "departamento", label: "Departamento" },
  { value: "edificio", label: "Edificio / Consorcio" },
  { value: "comercio", label: "Comercio" },
  { value: "empresa", label: "Empresa" },
];

/** Opciones del select de servicio. Sin "instalaciones de algo" inventado. */
export const serviceOptions: string[] = [
  "Instalación eléctrica",
  "Tablero",
  "Puesta a tierra",
  "Luces de emergencia",
  "Mantenimiento",
  "Iluminación",
  "Declaración de carga",
  "Otro",
];