import type { FaqItem } from "@/lib/seo";
import type { WhatsappMessageKey } from "@/lib/whatsapp";

/** Iconos del set lineal de lucide. Sin emojis, sin mezclar sets. */
export type IconName =
  | "plug"
  | "panels"
  | "lightbulb"
  | "siren"
  | "fileText"
  | "building"
  | "zap"
  | "wrench"
  | "shieldCheck"
  | "home"
  | "store"
  | "warehouse"
  | "factory"
  | "handshake";

/** Rol de la tarjeta en la grilla editorial de la home. */
export type CardVariant = "feature" | "standard" | "photo" | "inverted" | "numbered";

export type ScopeItem = { title: string; body: string };

export type Service = {
  slug: string;
  number: string;
  title: string;
  /** Una línea para tarjetas y listados. */
  short: string;
  /** Título del label de sección. */
  eyebrow: string;
  icon: IconName;
  cardVariant: CardVariant;
  /** CTA propio de la tarjeta, si difiere del global. */
  cardCta?: string;
  whatsappKey: WhatsappMessageKey;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  problem: { title: string; body: string; points: string[] };
  solution: { title: string; body: string };
  scope: { title: string; items: ScopeItem[] };
  includes: string[];
  faqs: FaqItem[];
  related: string[];
};

/**
 * Servicios eléctricos.
 *
 * TODOS los ítems provienen del documento de definición de servicios:
 * mantenimiento de luces de emergencia · mantenimiento de tableros de bombas ·
 * adecuación de PAT en edificios · arreglos generales en instalaciones
 * eléctricas · adecuación de tableros domiciliarios · puesta en servicio de
 * PAT · gestión y certificación de Declaraciones de Carga (DSI) para medidores
 * nuevos mono/trifásicos · instalación de automáticos de palier y luces
 * exteriores.
 *
 * NO se inventan servicios, certificaciones, plazos ni garantías.
 */
export const services: Service[] = [
  {
    slug: "tableros-electricos",
    number: "01",
    title: "Tableros eléctricos",
    short:
      "Adecuación de tableros domiciliarios, mantenimiento y tableros de bombas.",
    eyebrow: "Tableros",
    icon: "panels",
    cardVariant: "feature",
    whatsappKey: "boards",
    metaTitle: "Tableros eléctricos: adecuación y mantenimiento",
    metaDescription:
      "Adecuación de tableros domiciliarios, mantenimiento de tableros y trabajo sobre tableros de bombas en edificios y casas. Pedí una evaluación.",
    intro:
      "El tablero es el punto donde se decide cómo llega y cómo se protege la energía de una instalación. Cuando está ordenado, identificar cada circuito es fácil y el mantenimiento deja de ser una urgencia.",
    problem: {
      title: "El problema",
      body: "Un tablero desactualizado no solo queda desprolijo: complica cualquier trabajo futuro. Cuando algo falla, nadie sabe qué circuito es cuál, qué está protegido y qué se puede tocar.",
      points: [
        "Elementos sin identificar, con etiquetas ausentes o confusas",
        "Cálculos que ya no coinciden con la instalación que alimentan",
        "Espacios ocupados, sin margen para trabajar o medir con orden",
        "Terminaciones hechas de apuro que envejecen peor de lo debido",
      ],
    },
    solution: {
      title: "La solución",
      body: "Adecuamos el tablero manteniendo la instalación en servicio: relevamiento, orden de elementos, identificación clara de cada circuito y terminaciones prolijas. En edificios también trabajamos los tableros de bombas.",
    },
    scope: {
      title: "Qué hacemos",
      items: [
        {
          title: "Adecuación de tableros domiciliarios",
          body: "Ordenamos el tablero, identificamos los circuitos y dejamos las terminaciones en condiciones.",
        },
        {
          title: "Mantenimiento de tableros",
          body: "Revisión periódica del estado de los elementos y de las conexiones.",
        },
        {
          title: "Tableros de bombas",
          body: "Trabajo sobre los tableros que comandan las bombas del edificio, en el marco del mantenimiento general.",
        },
      ],
    },
    includes: [
      "Adecuación de tableros domiciliarios",
      "Mantenimiento de tableros",
      "Tableros de bombas",
      "Orden e identificación de circuitos",
      "Terminaciones",
    ],
    faqs: [
      {
        question: "¿Realizan mantenimiento de tableros?",
        answer:
          "Sí. El mantenimiento de tableros forma parte de la rutina de trabajo, tanto en tableros domiciliarios como en tableros de bombas de edificios.",
      },
      {
        question: "¿Se puede trabajar sobre el tablero con la instalación en servicio?",
        answer:
          "En muchos casos se puede trabajar por etapas, manteniendo el suministro. Eso se define evaluando el tablero y las necesidades del cliente antes de empezar.",
      },
      {
        question: "¿Puedo mandar fotos de mi tablero para una primera impresión?",
        answer:
          "Sí, y conviene. Enviando fotos del tablero podemos entender el estado general y entender qué habría que resolver antes de una visita.",
      },
    ],
    related: ["arreglos-instalaciones", "puesta-a-tierra", "mantenimiento-edificios"],
  },
  {
    slug: "arreglos-instalaciones",
    number: "02",
    title: "Arreglos e instalaciones eléctricas",
    short:
      "Arreglos generales, tomas, adecuaciones e instalaciones eléctricas.",
    eyebrow: "Arreglos",
    icon: "plug",
    cardVariant: "standard",
    whatsappKey: "general",
    metaTitle: "Arreglos e instalaciones eléctricas",
    metaDescription:
      "Arreglos generales en instalaciones eléctricas, tomas, adecuaciones e instalaciones eléctricas en casas, edificios, comercios y empresas.",
    intro:
      "Trabajos sobre la instalación existente y también instalaciones nuevas: arreglos generales, tomas, adecuaciones. Lo evaluamos en el lugar antes de proponer una solución.",
    problem: {
      title: "El problema",
      body: "Una instalación que envejece no avisa: sigue funcionando mientras acumula problemas. Los signos aparecen de a poco y cuando se hacen evidentes, suelen ser más caros de resolver.",
      points: [
        "Tomas que no hacen buen contacto, se calientan o están flojas",
        "Cables saturados, sin protección adequada o con recorridos imprecisos",
        "Conexiones hechas sobre la marcha, sin terminación correcta",
        "Espacios que se fueron improvisando y hoy no alcanzan",
      ],
    },
    solution: {
      title: "La solución",
      body: "Evaluamos la instalación, ordenamos los problemas y los resolvemos por partes, explicando qué se hace y por qué. El objetivo es que la instalación quede ordenada y sea mantenible.",
    },
    scope: {
      title: "Qué hacemos",
      items: [
        {
          title: "Arreglos generales",
          body: "Reparación y orden de puntos deficientes de una instalación existente.",
        },
        {
          title: "Tomas",
          body: "Adecuación y agregado de tomas, con terminaciones en condiciones.",
        },
        {
          title: "Adecuaciones",
          body: "Modificaciones puntuales para que la instalación responda a lo que necesita el espacio.",
        },
        {
          title: "Instalaciones eléctricas",
          body: "Ejecución de instalación eléctrica en casas, edificios, comercios y empresas.",
        },
      ],
    },
    includes: [
      "Arreglos generales",
      "Tomas",
      "Adecuaciones",
      "Instalaciones eléctricas",
      "Terminaciones",
    ],
    faqs: [
      {
        question: "¿Realizan trabajos domiciliarios?",
        answer:
          "Sí. Se realizan arreglos generales, tomas y adecuaciones en casas y departamentos.",
      },
      {
        question: "¿Trabajan para comercios?",
        answer:
          "Sí. Instalaciones y adecuaciones para locales y espacios comerciales.",
      },
      {
        question: "¿Hacen instalaciones nuevas o solo arreglos?",
        answer:
          "Ambos. Se trabaja sobre instalaciones existentes y también se ejecutan instalaciones eléctricas.",
      },
    ],
    related: ["tableros-electricos", "iluminacion", "mantenimiento-edificios"],
  },
  {
    slug: "puesta-a-tierra",
    number: "03",
    title: "Puesta a tierra — PAT",
    short:
      "Adecuación de PAT, puesta en servicio y trabajos de puesta a tierra en edificios.",
    eyebrow: "Puesta a tierra",
    icon: "zap",
    cardVariant: "inverted",
    whatsappKey: "earthGround",
    metaTitle: "Puesta a tierra (PAT): adecuación y puesta en servicio",
    metaDescription:
      "Adecuación de puesta a tierra, puesta en servicio y trabajos de PAT en edificios. Consultá por tu caso.",
    intro:
      "La puesta a tierra es la parte de la instalación que actúa cuando algo falla. Trabajamos su adecuación y su puesta en servicio, con especial atención en edificios.",
    problem: {
      title: "El problema",
      body: "Una puesta a tierra que no está mantenida deja de cumplir su función sin dar señales visibles. El síntoma aparece cuando ya hubo un problema, no antes.",
      points: [
        "PAT sin adecuar luego de reforma o ampliación de la instalación",
        "Conexiones holgadas, corroídas o sobre dimensionadas por acumulados",
        "Sistemas de puesta en servicio que quedaron incompletos",
        "Obras en edificios donde la PAT nunca se documentó",
      ],
    },
    solution: {
      title: "La solución",
      body: "Adecuamos la puesta a tierra, dejamos las conexiones en condiciones y revisamos el estado del sistema en el lugar. Cuando corresponde, hacemos la puesta en servicio.",
    },
    scope: {
      title: "Qué hacemos",
      items: [
        {
          title: "Adecuación de PAT",
          body: "Corrección de conexiones, recorridos y puntos de la puesta a tierra.",
        },
        {
          title: "Puesta en servicio",
          body: "Puesta en servicio del sistema de puesta a tierra.",
        },
        {
          title: "Puesta a tierra en edificios",
          body: "Trabajos de PAT en edificios, donde suele haber mejoras acumuladas a lo largo de la vida del edificio.",
        },
      ],
    },
    includes: [
      "Adecuación de PAT",
      "Puesta en servicio",
      "Puesta a tierra en edificios",
      "Revisión de conexiones",
    ],
    faqs: [
      {
        question: "¿Trabajan con puesta a tierra?",
        answer:
          "Sí. Se realizan adecuaciones de PAT, puesta en servicio y trabajos de puesta a tierra en edificios.",
      },
      {
        question: "¿Qué es una puesta a tierra?",
        answer:
          "Es la parte de la instalación eléctrica que conecta la instalación con tierra y actúa como vía de descarga cuando ocurre una falla. No se ve, pero es parte central de la seguridad de la instalación.",
      },
      {
        question: "¿Necesito una visita previa?",
        answer:
          "Lo habitual es evaluar en el lugar. Si podés, mandanos fotos del tablero y del lugar donde está la PAT para adelantar el diagnóstico.",
      },
    ],
    related: ["tableros-electricos", "mantenimiento-edificios", "arreglos-instalaciones"],
  },
  {
    slug: "iluminacion",
    number: "04",
    title: "Iluminación",
    short:
      "Automáticos de palier, luces exteriores y renovación de iluminación.",
    eyebrow: "Iluminación",
    icon: "lightbulb",
    cardVariant: "photo",
    whatsappKey: "lighting",
    metaTitle: "Iluminación: automáticos de palier, exteriores y renovación",
    metaDescription:
      "Instalación de automáticos de palier, luces exteriores y renovación de iluminación en edificios y casas.",
    intro:
      "Iluminación de palieres, exteriores y renovación general. En edificios, renovar la iluminación transforma el uso de los espacios comunes.",
    problem: {
      title: "El problema",
      body: "Una iluminación vencida no solo molesta: gasta más, falla seguido y deja los espacios mal iluminados. En edificios, Renovarla transforma por completo la percepción del lugar.",
      points: [
        "Luminarias viejas, con componentes vencidos",
        "Autómaticos de palier que no cumplen o que ya no se encuentran",
        "Iluminación exterior deficiente o ausente en sectores circulatorios",
        "Espacios comunes con luz que no acompaña el uso real",
      ],
    },
    solution: {
      title: "La solución",
      body: "Renovamos la iluminación que está vencida: luminarias, automáticos de palier e iluminación exterior, trabajando sobre la instalación existente.",
    },
    scope: {
      title: "Qué hacemos",
      items: [
        {
          title: "Automáticos de palier",
          body: "Instalación de automáticos de palier para edificios y casas.",
        },
        {
          title: "Luces exteriores",
          body: "Iluminación exterior de edificios y casas.",
        },
        {
          title: "Renovación de iluminación",
          body: "Reemplazo de luminarias y mejora general de la iluminación de un espacio.",
        },
      ],
    },
    includes: [
      "Automáticos de palier",
      "Luces exteriores",
      "Renovación de iluminación",
      "Luminarias",
    ],
    faqs: [
      {
        question: "¿Instalan automáticos de palier?",
        answer:
          "Sí. Se instalan automáticos de palier en edificios y casas.",
      },
      {
        question: "¿Renuevan la iluminación de un edificio completo?",
        answer:
          "Sí, se trabaja la renovación de iluminación en edificios. Es un trabajo habitual y se puede planificar por zonas para no dejar espacios comunes inutilizados.",
      },
      {
        question: "¿Trabajan con iluminación exterior?",
        answer:
          "Sí. Se realiza iluminación exterior para edificios y casas.",
      },
    ],
    related: ["mantenimiento-edificios", "luces-emergencia", "arreglos-instalaciones"],
  },
  {
    slug: "luces-emergencia",
    number: "05",
    title: "Luces de emergencia",
    short: "Mantenimiento, revisión y solución de problemas.",
    eyebrow: "Emergencia",
    icon: "siren",
    cardVariant: "standard",
    whatsappKey: "emergencyLights",
    metaTitle: "Mantenimiento de luces de emergencia",
    metaDescription:
      "Mantenimiento, revisión y solución de problemas en luces de emergencia para edificios, consorcios, comercios y empresas.",
    intro:
      "Las luces de emergencia son las que aparecen cuando todo lo demás falla. Su mantenimiento es parte de la rutina eléctrica de un edificio.",
    problem: {
      title: "El problema",
      body: "Una luz de emergencia que no funciona es un problema que solo se descubre en el momento en que hacía falta. Por eso el mantenimiento preventivo importa más que la reparación.",
      points: [
        "Luces de emergencia que no encienden o encienden de forma irregular",
        "Baterías agotadas o luminarias sin autonomía",
        "Indicadores de carga que ya no informan nada útil",
        "Luminarias que no están donde debería haber cobertura",
      ],
    },
    solution: {
      title: "La solución",
      body: "Mantenemos y revisamos las luces de emergencia: estado de carga, autonomía y ubicación. Si algo falla, se resuelve.",
    },
    scope: {
      title: "Qué hacemos",
      items: [
        {
          title: "Mantenimiento",
          body: "Mantenimiento de luces de emergencia en edificios y espacios comunes.",
        },
        {
          title: "Revisión",
          body: "Revisión del estado general de las luminarias de emergencia.",
        },
        {
          title: "Solución de problemas",
          body: "Resolución de fallas en luminarias de emergencia.",
        },
      ],
    },
    includes: [
      "Mantenimiento de luces de emergencia",
      "Revisión",
      "Solución de problemas",
      "Luminarias de emergencia",
    ],
    faqs: [
      {
        question: "¿Realizan mantenimiento de luces de emergencia?",
        answer:
          "Sí. El mantenimiento de luces de emergencia es parte de la rutina de trabajo.",
      },
      {
        question: "¿Cómo sé si mis luces de emergencia funcionan?",
        answer:
          "La forma directa es probarlas. Si querés una revisión antes de contratar, podés escribirnos y coordinamos.",
      },
    ],
    related: ["mantenimiento-edificios", "iluminacion", "tableros-electricos"],
  },
  {
    slug: "declaracion-carga",
    number: "06",
    title: "Declaraciones de carga — DSI",
    short: "Gestión y certificación para medidores nuevos.",
    eyebrow: "DSI",
    icon: "fileText",
    cardVariant: "numbered",
    cardCta: "Consultar mi caso",
    whatsappKey: "loadDeclaration",
    metaTitle: "Declaraciones de carga (DSI) para medidores nuevos",
    metaDescription:
      "Gestión y certificación de Declaraciones de Carga para medidores nuevos monofásicos y trifásicos. El valor depende de los metros cuadrados y el tipo de medidor.",
    intro:
      "Gestión y certificación de Declaraciones de Carga para medidores nuevos, tanto monofásicos como trifásicos.",
    problem: {
      title: "El problema",
      body: "Necesitar un medidor nuevo por una reforma o ampliación requiere una Declaración de Carga que respalde la instalación. El trámite tiene sus condiciones y el valor depende de variables concretas.",
      points: [
        "Reforma o ampliación que requiere más potencia de la declarada",
        "Medidor nuevo por cambio de uso o por nueva conexión",
        "Ambigüedad entre monofásico y trifásico según la instalación",
        "Trámite que no avanza por documentación incompleta",
      ],
    },
    solution: {
      title: "La solución",
      body: "Gestionamos y certificamos la Declaración de Carga. Para dimensionar el trabajo necesitamos saber los metros cuadrados involucrados y qué tipo de medidor corresponde.",
    },
    scope: {
      title: "Qué hacemos",
      items: [
        {
          title: "Medidores monofásicos",
          body: "Gestión y certificación de Declaraciones de Carga para medidores monofásicos.",
        },
        {
          title: "Medidores trifásicos",
          body: "Gestión y certificación de Declaraciones de Carga para medidores trifásicos.",
        },
        {
          title: "Medidores nuevos",
          body: "Declaraciones de Carga para toda instalación que requiera un medidor nuevo.",
        },
      ],
    },
    includes: [
      "Medidores nuevos",
      "Medidores monofásicos",
      "Medidores trifásicos",
      "Gestión",
      "Certificación",
    ],
    faqs: [
      {
        question: "¿Qué es una Declaración de Carga?",
        answer:
          "Es el documento que declara la carga de una instalación eléctrica ante el proveedor. Se necesita cuando se instala un medidor nuevo o cuando la instalación declara una potencia distinta a la original.",
      },
      {
        question: "¿Trabajan con medidores monofásicos y trifásicos?",
        answer:
          "Sí. La gestión y certificación de Declaraciones de Carga se realiza para medidores monofásicos y trifásicos.",
      },
      {
        question: "¿Cuánto cuesta una Declaración de Carga?",
        answer:
          "El valor varía según los metros cuadrados involucrados y el tipo de medidor. Por eso el precio se define después de evaluar el caso: escribinos contándonos la superficie y el tipo de medidor.",
      },
    ],
    related: ["arreglos-instalaciones", "tableros-electricos"],
  },
  {
    slug: "mantenimiento-edificios",
    number: "07",
    title: "Mantenimiento eléctrico para edificios",
    short:
      "Tableros de bombas, palieres, luces de emergencia, iluminación, PAT y tomas.",
    eyebrow: "Edificios",
    icon: "building",
    cardVariant: "standard",
    whatsappKey: "buildings",
    metaTitle: "Mantenimiento eléctrico para edificios y consorcios",
    metaDescription:
      "Mantenimiento eléctrico para edificios y consorcios: tableros de bombas, automáticos de palier, luces de emergencia, iluminación y puesta a tierra.",
    intro:
      "Un edificio tiene una instalación eléctrica que nunca termina de ajustarse: se suma una bomba, se cambia un automático, se renueva un palier. El mantenimiento continuo evita que todo eso se acumule sin control.",
    problem: {
      title: "El problema",
      body: "Una instalación eléctrica correctamente mantenida ayuda a detectar problemas antes de que se conviertan en inconvenientes mayores. Cuando el mantenimiento es eventual, los problemas aparecen de golpe.",
      points: [
        "Tableros y tableros de bombas sin seguimiento",
        "Palieres, iluminación y luces de emergencia que se deterioran por separado",
        "PAT de edificios nunca revisada después de reformas",
        "Tomas y puntos comunes que fallan y se reportan uno por uno",
      ],
    },
    solution: {
      title: "La solución",
      body: "Un trabajo de mantenimiento eléctrico para edificios ordena las partes que más importan: tablero general, tablero de bombas, palier, luces de emergencia, iluminación, puesta a tierra y tomas.",
    },
    scope: {
      title: "Qué hacemos en un edificio",
      items: [
        {
          title: "Tablero de bombas",
          body: "Mantenimiento y adecuación del tablero de bombas.",
        },
        {
          title: "Palier",
          body: "Automáticos de palier y orden de los circuitos de espacios comunes.",
        },
        {
          title: "Luces de emergencia",
          body: "Mantenimiento y revisión de las luminarias de emergencia del edificio.",
        },
        {
          title: "Iluminación",
          body: "Renovación y mantenimiento de la iluminación de espacios comunes y exteriores.",
        },
        {
          title: "Puesta a tierra",
          body: "Adecuación de la PAT del edificio y puesta en servicio.",
        },
        {
          title: "Tomas",
          body: "Arreglos generales en las tomas del edificio.",
        },
      ],
    },
    includes: [
      "Tablero de bombas",
      "Automáticos de palier",
      "Luces de emergencia",
      "Iluminación",
      "Puesta a tierra",
      "Tomas",
      "Tablero eléctrico",
    ],
    faqs: [
      {
        question: "¿Realizan trabajos eléctricos en edificios?",
        answer:
          "Sí. El mantenimiento eléctrico para edificios y consorcios es una parte central de la rutina de trabajo.",
      },
      {
        question: "¿Qué incluye el mantenimiento de un edificio?",
        answer:
          "Puede incluir tablero de bombas, automáticos de palier, luces de emergencia, iluminación, puesta a tierra y tomas. El alcance se define según el estado de cada parte.",
      },
      {
        question: "¿Trabajan con consorcios?",
        answer:
          "Sí. Los trabajos se realizan para edificios y consorcios,evaluando el estado real de la instalación antes de proponer el trabajo.",
      },
    ],
    related: ["tableros-electricos", "puesta-a-tierra", "luces-emergencia", "iluminacion"],
  },
];

export const servicesBySlug: Record<string, Service> = Object.fromEntries(
  services.map((service) => [service.slug, service]),
);

export function getService(slug: string): Service | undefined {
  return servicesBySlug[slug];
}

/** Slugs de las páginas de detalle que se generan en /servicios/[slug]. */
export const serviceSlugs = services.map((service) => service.slug);

/**
 * Servicios que aparecen en la grilla editorial de la home, en el orden
 * Ojo: la retícula no es uniforme, el orden sigue a la composición.
 */
export const homeServiceOrder = [
  "tableros-electricos",
  "arreglos-instalaciones",
  "iluminacion",
  "puesta-a-tierra",
  "mantenimiento-edificios",
  "luces-emergencia",
  "declaracion-carga",
] as const;