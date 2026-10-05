import type { IconName } from "@/data/services";

/** Segmentos de cliente. Todos confirmados en la definición de servicios. */
export type Segment = {
  slug: string;
  title: string;
  icon: IconName;
  description: string;
  /** Detalle de lo que se hace para ese cliente. */
  points: string[];
  whatsappKey: "home" | "buildings" | "commercial" | "company";
  /** Servicios relacionados, por slug. */
  services: string[];
  featured?: boolean;
};

export const segments: Segment[] = [
  {
    slug: "hogar",
    title: "Hogar",
    icon: "home",
    description: "Soluciones para instalaciones domiciliarias.",
    points: [
      "Arreglos generales e instalaciones eléctricas",
      "Adecuación de tableros domiciliarios",
      "Tomas y adecuaciones",
      "Luces exteriores y automáticos de palier en casas",
    ],
    whatsappKey: "home",
    services: ["arreglos-instalaciones", "tableros-electricos", "iluminacion"],
  },
  {
    slug: "edificios",
    title: "Edificios y consorcios",
    icon: "building",
    description: "Mantenimiento, tableros, iluminación y seguridad eléctrica.",
    points: [
      "Tablero de bombas y tablero general",
      "Automáticos de palier",
      "Luces de emergencia",
      "Puesta a tierra del edificio",
      "Tomas y espacios comunes",
    ],
    whatsappKey: "buildings",
    services: [
      "mantenimiento-edificios",
      "tableros-electricos",
      "puesta-a-tierra",
      "luces-emergencia",
      "iluminacion",
    ],
    featured: true,
  },
  {
    slug: "comercios",
    title: "Comercios",
    icon: "store",
    description: "Instalaciones y adecuaciones para locales y espacios comerciales.",
    points: [
      "Adecuaciones para el espacio de trabajo",
      "Tomas e iluminación",
      "Tableros y puesta a tierra",
      "Declaraciones de carga para medidores nuevos",
    ],
    whatsappKey: "commercial",
    services: [
      "arreglos-instalaciones",
      "tableros-electricos",
      "declaracion-carga",
      "iluminacion",
    ],
  },
  {
    slug: "empresas",
    title: "Empresas",
    icon: "warehouse",
    description:
      "Soluciones y mantenimiento eléctrico según las necesidades de cada instalación.",
    points: [
      "Mantenimiento de la instalación existente",
      "Adecuaciones y arreglos generales",
      "Tableros, PAT e iluminación",
      "Luces de emergencia",
    ],
    whatsappKey: "company",
    services: [
      "mantenimiento-edificios",
      "tableros-electricos",
      "puesta-a-tierra",
      "luces-emergencia",
    ],
  },
];

export const featuredSegment = segments.find((segment) => segment.featured);