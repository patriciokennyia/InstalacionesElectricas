/**
 * Configuración central del sitio.
 *
 * REGLA DE ORO: no inventar datos comerciales. Todo lo que no esté confirmado
 * por el cliente se deja vacío o con prefijo `PENDING_`, y los componentes lo
 * omiten en lugar de mostrar un placeholder feo.
 */

const raw = {
  businessName: "Instalaciones Eléctricas",
  phoneDisplay: "11 5113-3791",
  whatsapp: "5491151133791",
  location: "Ciudad Autónoma de Buenos Aires",
  coverageArea: "CABA y Gran Buenos Aires",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
};

const isSet = (value: string) => value.trim().length > 0;

export const siteConfig = {
  businessName: raw.businessName,
  /** Frase corta para el pie del logo y espacios estrechos. */
  shortName: "IE",
  /** Teléfono como se muestra. */
  phoneDisplay: raw.phoneDisplay,
  /** Teléfono en formato internacional, solo dígitos (prefijo + antepuesto en el href). */
  phoneIntl: "+" + raw.whatsapp,
  phoneHref: `tel:+${raw.whatsapp}`,
  whatsapp: raw.whatsapp,
  email: raw.email,
  location: raw.location,
  coverageArea: raw.coverageArea,
  // TODO: reemplazar por los perfiles reales cuando el cliente los confirme.
  instagram: "",
  facebook: "",

  /**
   * PENDIENTE: confirmar si el cliente cuenta con matrícula, habilitaciones o
   * certificaciones. No se publica nada hasta entonces.
   */
  credentials: [] as string[],
} as const;

export type SiteConfig = typeof siteConfig;

/**
 * Base URL para metadata, canonical, sitemap y Open Graph.
 *
 * Prioridad: variable de entorno → dominio de Vercel (se autocompleta al
 * desplegar) → localhost solo en desarrollo. Así nunca se publica un
 * canonical con `localhost` en producción.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000")
).replace(/\/$/, "");

export const hasEmail = isSet(raw.email);
export const hasInstagram = isSet(siteConfig.instagram);
export const hasFacebook = isSet(siteConfig.facebook);
export const hasSocials = hasInstagram || hasFacebook;

export const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/trabajos", label: "Trabajos" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
] as const;

/** Copy base de la marca. Sin promesas sin evidencia. */
export const brandCopy = {
  tagline: "Seguridad, calidad y confianza.",
  promise: "Seguridad, precisión y soluciones eléctricas para hogares, edificios, comercios y empresas.",
  phoneCta: "Solicitar presupuesto",
} as const;