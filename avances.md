# Avances Instalaciones Eléctricas

## Contexto general

Sitio institucional premium para un electricista de CABA y Gran Buenos Aires.
Next.js 16 (App Router) · React 19 · TypeScript estricto · Tailwind CSS v4 ·
`lucide-react`. Sin librería de animación: transiciones CSS + `IntersectionObserver`
respetando `prefers-reduced-motion`.

Regla de oro del proyecto: **no inventar datos comerciales**. Todo lo no
confirmado por el cliente queda vacío o con prefijo `PENDING_`, y los
componentes lo omiten en lugar de mostrar placeholders feos.

Datos confirmados: nombre "Instalaciones Eléctricas", teléfono `11 5113-3791`,
WhatsApp `5491151133791`, cobertura CABA y GBA. **No** se publica que no se
emite factura. No hay email, redes sociales ni matrícula confirmados.

Fuente de verdad del contenido: minuta de la reunión del cliente
(`.docx`, fuera del repo, su contenido ya está volcado en `data/services.ts`).

Servicios reales (7): tableros domiciliarios y de bombas, PAT, arreglos e
instalaciones, automáticos de palier, iluminación exterior y renovación,
luces de emergencia, DSI mono/trifásica, mantenimiento de edificios.
No se ofrece reparación de aire acondicionado; plomería, albañilería y pintura
solo como referencias complementarias.

Identidad visual: negro/carbón/grafito, acento `#F5B301` usado únicamente
sobre fondos oscuros, tipografías Oswald (display) + Inter (texto), layout
editorial portrait-first.

---

## Sesión: Cierre de páginas, build y despliegue (octubre 2026)

### 1. Corrección de páginas pendientes
- **Objetivo**: cerrar las páginas `/servicios`, `/contacto` y `/nosotros`, que
  habían quedado con errores de la sesión anterior.
- **Cambios**:
  - `app/nosotros/page.tsx`: eliminado texto corrupto (un carácter CJK que se
    había colado en la palabra "lista") y un
    uso inválido de `Button` con `asChild={false}` y `<span />` anidado. El
    import de `Button` ya no es necesario.
  - `app/contacto/page.tsx`: removidos los imports `ButtonLink` y `PhotoFrame`
    sin uso (TS6133 bajo `noUnusedLocals`).
  - `app/servicios/[slug]/page.tsx`: eliminada la variable `related` no usada y
    el import `servicesBySlug` que quedó huérfano.
- **Verificado**: `npx tsc --noEmit` limpio.

### 2. Páginas SEO nuevas
- **Objetivo**: completar el set de rutas públicas del sitio.
- **Cambios**:
  - `app/trabajos/page.tsx`: galería de trabajos con `WorkGallery`, salida a
    servicios y `buildBreadcrumbSchema`. Muestra el conteo de registros solo si
    `hasProjects`.
  - `app/sitemap.ts`: 12 URLs (5 estáticas + 7 servicios), usando `serviceSlugs`
    para que no quede desactualizado si se agrega un servicio.
  - `app/robots.ts`: permite todo, bloquea `/curacion` y `/api/`, declara
    `sitemap` y `host`.
  - `app/opengraph-image.tsx`: imagen social 1200×630 generada en build con
    `ImageResponse`, replicando la retícula técnica y el halo amarillo. Sin
    `next/og` en dependencies: es una API de `next` nativa.
  - `app/not-found.tsx`: 404 con enlaces a los siete servicios y fallback a
    WhatsApp.
- **Verificado**: `npm run build` genera 17 rutas.

### 3. Sistema de imágenes
- **Objetivo**: que las fotos reales entren al sitio sin inventar descripciones.
- **Cambios**:
  - `scripts/prepare-images.mjs`: procesa `fotosdetrabajos/` hacia
    `public/images/_inbox/NNN.jpg` (máx. 1800px, mozjpeg) y genera derivados
    `16:9` (1920×1080) y `3:2` (1600×1067) con `position: "attention"`.
    Orden estable con `localeCompare` numérico, y **no borra los originales**.
    Preserva etiquetas previas reasociando por `src`.
  - Ejecutado: **91 imágenes** (77 verticales, 14 apaisadas, 8.6 MB de origen).
  - `data/projects.ts`: los tipos ahora aceptan `string | null`, y el manifest
    se castea por `unknown` porque el script emite `null` explícito (TS2352).
  - `scripts/curate.mjs`: auditoría del manifest. **No etiqueta** fotos
    (eso requiere criterio humano), solo valida formato, existencia de rutas y
    cobertura. Reporta cuántos slots quedan `pending`.
- **Decisión**: `hasProjects === false` hasta que haya curaduría, así que
  `/trabajos` y la galería de home muestran placeholders diseñados (retícula
  + numeración), nunca un cuadro gris ni texto "IMAGE HERE".

### 4. Panel de curaduría `/curacion`
- **Objetivo**: que el cliente etiquete las fotos sin tocar código.
- **Cambios**:
  - `app/curacion/page.tsx`: server component, `dynamic = "force-dynamic"`,
    llama `notFound()` si `NODE_ENV === "production"`.
  - `app/curacion/CuracionClient.tsx`: cliente con filtros por tipo, lightbox,
    y edición de tipo / servicio / título / categoría / alt / pairId / resultado
    / destacado.
  - Sesión en `localStorage`, export del manifest vía descarga de `photos.json`.
- **Correcciones durante la implementación**:
  - Faltaba `"use client"` (el build falló con *"importing a module that depends
    on `useEffect` into a React Server Component"*).
  - La carga inicial pasó de `window.__PHOTOS__` inyectado a **props**, para no
    romper la serialización hacia un Client Component.
  - La hidratación desde `localStorage` se cambió a **botón "Cargar sesión"**:
    leer storage al montar rompe el lint de `react-hooks/set-state-in-effect` y
    genera mismatch de hidratación.
- **Verificado**: en dev responde 200 con las 91 fotos; en build de producción
  responde **404**.

### 5. Arreglo del lint
- **Problema**: `npm run lint` crasheaba con
  `TypeError: Converting circular structure to JSON` en
  `@eslint/eslintrc/ConfigValidator`.
- **Causa**: `eslint.config.mjs` usaba `FlatCompat` + `compat.extends("next/core-web-vitals")`,
  pero `eslint-config-next` 16 **ya exporta flat config nativo**.
- **Fix**: se importan directo `eslint-config-next/core-web-vitals` y
  `eslint-config-next/typescript`, ambos arrays planos.

### 6. Errores de `react-hooks/set-state-in-effect`
Cuatro `setState` síncronos dentro de `useEffect`. Todos resueltos con patrones
idempotentes de React 19, no con `eslint-disable`:

| Archivo | Patrón aplicado |
| --- | --- |
| `components/ui/Reveal.tsx` | `useSyncExternalStore` para detectar soporte de `IntersectionObserver`; el estado inicial es `false` y el snapshot de servidor es `true`, de modo que el HTML inicial coincide con el primer render del cliente |
| `components/sections/ContactForm.tsx` | el object URL del preview pasa a ser **derivado** con `useMemo`; el `useEffect` solo revoca |
| `components/layout/Header.tsx` | se elimina el efecto "cerrar drawer al navegar": los links del drawer ya llaman `onClose`, así que el efecto era redundante |
| `app/curacion/CuracionClient.tsx` | hidratación de `localStorage` movida a acción explícita del usuario |
- **Verificado**: `npm run lint` → 0 errores, 0 warnings.

### 7. Canonical sin `localhost`
- **Problema**: `data/site.ts` usaba `http://localhost:3000` como fallback, lo
  que publicaba un canonical inválido si faltaba la variable de entorno.
- **Fix**: prioridad `NEXT_PUBLIC_SITE_URL` → `VERCEL_PROJECT_PRODUCTION_URL`
  → `VERCEL_URL` → localhost (solo dev). Confirmado funcionando en el deploy:
  el canonical salió bien **sin** configurar la variable a mano.

### 8. Despliegue en Vercel
- **Objetivo**: publicar el sitio y verificarlo contra el dominio real.
- **Cambios**:
  - `git init`, rama `main`, primer commit `f997795` (59 archivos).
  - `.gitignore` actualizado: `/public/images` (27 MB derivados, se regeneran
    con `npm run images`) y `/estilo.jpeg` + `*.docx` (material de referencia
    del cliente, conservado en local pero fuera del repo).
  - Commit `b87706a`: remoción de `estilo.jpeg` y del `.docx` mediante
    `git rm --cached`, de modo que los archivos **no se borraron del disco**.
- **Verificado contra `https://instalaciones-electricas.vercel.app`**:

```
/               200      /contacto          200
/servicios      200      /curacion          404   (correcto)
/trabajos       200      /sitemap.xml       200   12 URLs
/nosotros       200      /robots.txt        200
```

  Canonical y `og:url` correctos: `https://instalaciones-electricas.vercel.app`.

---

## Estado de validación

```
npm run lint      → 0 errores, 0 warnings
npm run typecheck → limpio
npm run build     → 17 rutas, 7 SSG de servicio
npm run curate    → 91 fotos, todas kind "pending", 0 publicables
```

## Pendientes / notas

- **Fotos**: las 91 imágenes siguen `pending`. El flujo es `npm run dev` →
  `/curacion` → etiquetar → exportar `photos.json` y reemplazar
  `data/photos.json`. Requiere criterio humano: el modelo no tiene visión, así
  que no puede clasificar las fotos por sí mismo.
- **`public/images` ignorada en git**: cuando se cureen las fotos, comentar esa
  línea del `.gitignore` para subir los archivos al repo. Si no, el deploy
  sigue mostrando placeholders.
- **Videos**: hay 4 MP4 en `fotosdetrabajos/` que quedaron fuera de v1 por
  decisión de diseño. Sin `ffmpeg`/`ffprobe` en el entorno, así que no se pueden
  extraer posters. Decidir si vale la pena incorporarlos.
- **Variables de entorno en Vercel**: `NEXT_PUBLIC_SITE_URL` hoy no se define y
  funciona por el fallback a `VERCEL_URL`. Conviene fijarla explícitamente,
  sobre todo al comprar dominio propio: las 12 URLs del sitemap usan hoy
  `.vercel.app` y habría que redeployar para actualizarlas.
- **Formulario**: sin `NEXT_PUBLIC_FORM_ENDPOINT` deriva a WhatsApp con los
  datos precargados, así que convierte sin backend. Para recibir envíos por
  email, crear un form en formspree.io y pasar `https://formspree.io/f/TU_ID`.
- **Datos pendientes del cliente**: email de contacto, perfiles de Instagram o
  Facebook, y si tiene matrícula o habilitaciones para publicarlas. Nada de esto
  bloquea el sitio.
- **No se publica** que no se emite factura. La sección "Empresas" evita
  promesas corporativas sin evidencia.

## Sesión: Cambio de acento a dorado cobrizo (octubre 2026)

### 1. Reemplazo del amarillo por cobre
- **Objetivo**: el cliente pidió un dorado más cobrizo en vez del amarillo
  `#F5B301`, por consideraciones estéticas.
- **Decisión**: se armó una comparativa HTML con 4 candidatos renderizados
  sobre el negro real, y se eligió la variante **D**.
- **Cambios**:
  - `app/globals.css`: `--color-accent` `#f5b301` → `#d99a4e`,
    `--color-accent-soft` `#ffd75e` → `#ebc182`,
    `--color-accent-deep` `#b88300` → `#96601f`.
  - `app/opengraph-image.tsx`: los 3 usos de `#f5b301` y los 2 gradientes
    `rgba(245,179,1,...)` actualizados a los valores nuevos (el hex y el RGB
    están duplicados en ese archivo, hay que cambiar ambos).
  - `app/curacion/CuracionClient.tsx`: el checkbox usa `accent-[#d99a4e]`.
- **Verificado**:
  ```
  npm run lint      → 0 errores
  npm run typecheck → limpio
  npm run build     → OK
  ```
  Y en el dev server: el CSS servido expone los tres tokens nuevos, 28 reglas
  los consumen vía `var(--color-accent)`, y Tailwind precompila los derivados
  con opacidad (`#d99a4e66` para `/40`, `#d99a4e73` para `/45`). Sin restos de
  `245,179,1` en todo el proyecto.

### Contraste del acento nuevo

Medido sobre `#0a0a0a` (superficie `ink`):

| Variante | Hex | Contraste |
| --- | --- | --- |
| Anterior | `#f5b301` | 10.68:1 |
| **D (elegida)** | `#d99a4e` | **8.19:1** |
| `accent-soft` | `#ebc182` | 11.77:1 |
| `accent/80` | — | 5.52:1 |
| `accent/70` | — | 4.46:1 |
| `accent-deep` | `#96601f` | 3.76:1 |

**Corrección importante**: durante esta sesión se informó erróneamente que la
variante D daba 4.32:1 y quedaba "al límite" de WCAG AA. Eso fue un error de
cálculo. El valor real es **8.19:1**, muy por encima de AA, y solo `text-accent/70`
(4.46:1, 11 usos) queda por debajo del 4.5:1 para texto normal. Ese uso es
decorativo y no bloquea nada, pero conviene saberlo si someday se audita
accesibilidad.

Conclusión práctica: la variante D **sí** cumple AA con holgura. La nota anterior
en este mismo archivo que decía que había que descartar `#B87333` por contraste
(5.22:1) también estaba mal calculada; ese cobre sería aceptable para texto
grande, pero se mantiene la decisión de evitarlo porque `#d99a4e` rinde mejor
en display.

## Nota sobre `npm audit`

Reporta 5 vulnerabilidades altas transitivas de ESLint (`braces` / `fast-glob`).
El `fix` propuesto degrada a Next 14, así que **no debe aplicarse**. Son
dependencias de desarrollo y no afectan el runtime del sitio desplegado.
