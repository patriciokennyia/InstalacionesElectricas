import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { siteConfig, siteUrl, brandCopy } from "@/data/site";
import { buildLocalBusinessSchema } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  // next/font subset hint para pesos mediterráneos
  preload: true,
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  variable: "--font-oswald",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `Instalaciones Eléctricas en CABA y GBA | ${siteConfig.businessName}`,
    template: `%s | ${siteConfig.businessName}`,
  },
  description: `${brandCopy.promise} Trabajos eléctricos en ${siteConfig.coverageArea}: tableros, puesta a tierra, iluminación, luces de emergencia y declaraciones de carga.`,
  keywords: [
    "instalaciones eléctricas",
    "electricista",
    "tableros eléctricos",
    "puesta a tierra",
    "PAT",
    "luces de emergencia",
    "autómaticos de palier",
    "declaración de carga",
    "DSI",
    "mantenimiento eléctrico",
    "edificios",
    "consorcios",
    "CABA",
    "Buenos Aires",
  ],
  applicationName: siteConfig.businessName,
  authors: [{ name: siteConfig.businessName }],
  creator: siteConfig.businessName,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: siteUrl,
    siteName: siteConfig.businessName,
    title: `Instalaciones Eléctricas | ${siteConfig.coverageArea}`,
    description: brandCopy.promise,
    // TODO: reemplazar opengraph-image por una composición con fotografía real del cliente.
  },
  twitter: {
    card: "summary_large_image",
    title: `Instalaciones Eléctricas | ${siteConfig.coverageArea}`,
    description: brandCopy.promise,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "Servicios profesionales",
  formatDetection: {
    telephone: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-AR" className={`${inter.variable} ${oswald.variable}`}>
      <body className="min-h-dvh bg-ink text-chalk antialiased">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink"
        >
          Saltar al contenido
        </a>
        <Header />
        <main id="contenido">{children}</main>
        <Footer />
        <FloatingActions />
        <script
          type="application/ld+json"
          // Datos confirmados únicamente: sin email, sin redes, sin matrícula inventada.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildLocalBusinessSchema()),
          }}
        />
      </body>
    </html>
  );
}