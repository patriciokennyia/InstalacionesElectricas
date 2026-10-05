import { ImageResponse } from "next/og";

import { siteConfig } from "@/data/site";

export const alt = `${siteConfig.businessName} — instalaciones eléctricas en ${siteConfig.coverageArea}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Imagen social generada en build.
 *
 * Reproduce el lenguaje visual del sitio (negro + amarillo + retícula) en una
 * sola pieza. Cuando existan fotografías reales del cliente, reemplazar por
 * un `opengraph-image` con composición fotográfica.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          padding: "72px",
          position: "relative",
        }}
      >
        {/* Retícula técnica de fondo */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(to right, rgba(247,246,244,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(247,246,244,0.06) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        {/* Halo amarillo */}
        <div
          style={{
            position: "absolute",
            top: -220,
            right: -160,
            width: 720,
            height: 720,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(245,179,1,0.22), rgba(245,179,1,0))",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 56,
              height: 56,
              border: "2px solid rgba(245,179,1,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#f5b301",
              fontSize: 30,
            }}
          >
            ⚡
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "rgba(247,246,244,0.55)",
            }}
          >
            {siteConfig.coverageArea}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 104,
              lineHeight: 0.9,
              letterSpacing: -2,
              textTransform: "uppercase",
              fontWeight: 700,
              color: "#f7f6f4",
            }}
          >
            Instalaciones
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 104,
              lineHeight: 0.9,
              letterSpacing: -2,
              textTransform: "uppercase",
              fontWeight: 700,
              color: "#f5b301",
            }}
          >
            Eléctricas
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(247,246,244,0.15)",
            paddingTop: 32,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 26,
              color: "rgba(247,246,244,0.6)",
              maxWidth: 720,
            }}
          >
            Seguridad, precisión y soluciones eléctricas para hogares, edificios,
            comercios y empresas.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              letterSpacing: 3,
              color: "#f5b301",
            }}
          >
            {siteConfig.phoneDisplay}
          </div>
        </div>
      </div>
    ),
    size,
  );
}