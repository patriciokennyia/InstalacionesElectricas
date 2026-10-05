# Instalaciones Eléctricas

Sitio institucional premium para servicios eléctricos en CABA y GBA.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · lucide-react.

## Puesta en marcha

```bash
npm install
cp .env.example .env.local
npm run images   # procesa fotosdetrabajos/ -> public/images/_inbox
npm run dev
```

## Datos editables

Todo lo editable vive en `data/site.ts`. Los campos sin confirmar usan el
prefijo `PENDING_` o cadena vacía y **el sitio los omite** (no inventa).

## Fotos

1. Las fotos originales viven en `fotosdetrabajos/` (ignoradas por git).
2. `npm run images` las normaliza a `public/images/_inbox/NNN.jpg` y genera
   recortes derivados (`16:9`, `3:2`).
3. En desarrollo, `/curacion` permite etiquetar cada foto (servicio, título,
   alt, rol) y exporta `data/photos.json`.

Los slots sin foto curada muestran un placeholder diseñado, nunca texto
"IMAGE HERE".

## Comandos

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run start` | Servidor de producción |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript sin emitir |
| `npm run images` | Procesa las fotos originales |
| `npm run curate` | Audita `data/photos.json` y reporta qué falta |

`npm run curate` no etiqueta nada: la clasificación de fotos requiere criterio
humano y se hace en `/curacion`. El script solo verifica formato, rutas y
cobertura.

## Despliegue

Vercel: importar el repo y definir `NEXT_PUBLIC_SITE_URL`. El build usa
`next build` (Turbopack). El endpoint del formulario se define con
`NEXT_PUBLIC_FORM_ENDPOINT`.

Sin `NEXT_PUBLIC_SITE_URL`, el sitio cae al dominio de Vercel
(`VERCEL_PROJECT_PRODUCTION_URL` / `VERCEL_URL`) para que el canonical nunca
sea `localhost` en producción. En local usa `http://localhost:3000`.

`/curacion` responde 404 en producción.