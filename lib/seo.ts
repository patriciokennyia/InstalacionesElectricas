import type { Metadata } from "next";
import { hasEmail, hasFacebook, hasInstagram, siteConfig, siteUrl } from "@/data/site";

/* ==========================================================================
   METADATA
   ========================================================================== */

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  /** Rutas absolutas de imágenes para OG/Twitter. */
  images?: string[];
};

/** Metadata de página con canonical y OG consistentes. */
export function pageMetadata({
  title,
  description,
  path,
  images,
}: PageMetaInput): Metadata {
  const url = `${siteUrl}${path === "/" ? "" : path}`;
  return {
    title,
    description,
    alternates: { canonical: path === "/" ? "/" : path },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.businessName,
      locale: "es_AR",
      type: "website",
      ...(images ? { images } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(images ? { images } : {}),
    },
  };
}

/* ==========================================================================
   SCHEMA.ORG
   Solo se emiten datos confirmados.
   ========================================================================== */

export function buildLocalBusinessSchema() {
  const sameAs = [
    hasInstagram ? `https://instagram.com/${siteConfig.instagram}` : "",
    hasFacebook ? `https://facebook.com/${siteConfig.facebook}` : "",
  ].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "Electrician",
    "@id": `${siteUrl}/#business`,
    name: siteConfig.businessName,
    description:
      "Servicios de electricidad para hogares, edificios, consorcios, comercios y empresas: tableros, puesta a tierra, iluminación, luces de emergencia y declaraciones de carga.",
    url: siteUrl,
    telephone: siteConfig.phoneIntl,
    ...(hasEmail ? { email: siteConfig.email } : {}),
    ...(sameAs.length ? { sameAs } : {}),
    image: `${siteUrl}/opengraph-image`,
    address: {
      "@type": "PostalAddress",
      // Sin calle ni altura: no están confirmadas.
      addressLocality: siteConfig.location,
      addressCountry: "AR",
    },
    areaServed: [
      { "@type": "City", name: "Ciudad Autónoma de Buenos Aires" },
      { "@type": "AdministrativeArea", name: "Provincia de Buenos Aires" },
    ],
    priceRange: "$$",
    knowsAbout: [
      "Instalaciones eléctricas",
      "Tableros eléctricos",
      "Puesta a tierra (PAT)",
      "Iluminación",
      "Luces de emergencia",
      "Declaraciones de carga",
    ],
    // Sin openingHours niAggregateRating: no confirmados.
  };
}

export type ServiceSchemaInput = {
  name: string;
  description: string;
  path: string;
};

export function buildServiceSchema({ name, description, path }: ServiceSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteUrl}${path}#service`,
    name,
    description,
    url: `${siteUrl}${path}`,
    serviceType: name,
    provider: { "@id": `${siteUrl}/#business` },
    areaServed: { "@type": "City", name: siteConfig.location },
  };
}

export type FaqItem = { question: string; answer: string };

export function buildFaqSchema(faqs: FaqItem[]) {
  if (faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export type Crumb = { name: string; path: string };

export function buildBreadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${siteUrl}${crumb.path === "/" ? "" : crumb.path}`,
    })),
  };
}

/** Serializa cualquier schema para inyectarlo en un <script>. */
export function jsonLd(schema: unknown): string {
  return JSON.stringify(schema);
}