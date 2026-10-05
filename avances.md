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
- **`public/images/_inbox` y `_wide` ignoradas en git** (el hero en `_hero/` sí
  se versiona): cuando se cureen las fotos, comentar esas dos líneas del
  `.gitignore` para subir los archivos al repo. Si no, el deploy sigue
  mostrando placeholders.
- **Análisis del lote**: las 91 fotos son de una sola sesión de 12 minutos, sin
  EXIF. Probablemente son 1-2 trabajos, no 91. Propuesta: elegir 8-12 y marcar
  el resto como `reject`. Ver la sección de la última sesión.
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

## Sesión: Hero del cliente y análisis del lote de fotos (octubre 2026)

### 1. La foto del cliente como hero de la home
- **Objetivo**: usar `imagen principal.png` como imagen principal de la portada,
  reemplazando el placeholder que venía desde el primer deploy.
- **Datos técnicos del original**:
  ```
  1024 × 1536   vertical, ratio 2:3 (0.667)
  1.9 MB, PNG sin canal alfa, sRGB, 72 dpi
  luminancia media 43  → imagen oscura
  canales: R 61  G 40  B 22  → tonalidad cálida, domina el rojo
  ```
- **Procesado**: mismo pipeline que el lote (`position: "attention"`), con tres
  derivados. De 1.9 MB PNG a 183 KB JPG.

  | Archivo | Dimensiones | Peso | Uso |
  | --- | --- | --- | --- |
  | `hero-4x5.jpg` | 1200×1500 | 183 KB | slot del hero (`aspect-[4/5]`) |
  | `hero-16x9.jpg` | 1920×1080 | 166 KB | banners |
  | `hero-3x2.jpg` | 1600×1067 | 147 KB | bloques intermedios |

- **Cambios**:
  - `data/projects.ts`: nueva constante `approvedHero` con la foto, el alt y
    los recortes. Se declara **fuera** de `photos.json` a propósito: es una
    imagen validada por el cliente, no un derivado del lote pendiente. Si
    estuviera en el manifest, `npm run images` la pisaría en la próxima corrida.
    `heroPhotos` pasa a ser `[approvedHero, ...byKind("hero")]` y `heroPhoto`
    siempre resuelve a la aprobada, sin depender de la curaduría.
  - `PhotoEntry`: se agregaron `wide16x9` y `wide3x2` al tipo (el manifest ya
    los emitía pero el tipo no los declaraba, TS2353).
  - `components/home/hero.tsx` (`components/home/Hero.tsx`): se eliminó el
    `TODO`, el `placeholderLabel` y el `placeholderIndex`. El `alt` ahora sale de
    `heroPhoto.alt` en vez de estar hardcodeado.
  - `.gitignore`: cambió de ignorar todo `/public/images` a ignorar solo
    `/public/images/_inbox` y `/public/images/_wide`. **Esto era necesario**: con
    la regla anterior el hero nunca se hubiera subido al repo ni al deploy.
    Además se ignora `/imagen principal.png` (el PNG de 1.9 MB no se versiona,
    los JPG sí).
- **Verificado**:
  ```
  npm run lint / typecheck / build → limpio
  dev:  <img src="/_next/image?url=%2Fimages%2F_hero%2Fhero-4x5.jpg&w=1920&q=75"
          alt="Instalación eléctrica realizada, con la paleta del sitio">
  prod: https://instalaciones-electricas.vercel.app → 200, hero sirviendo
  ```
- **Pendiente de verificación humana** (el modelo no tiene visión):
  - **El recorte 4:5.** La fuente es 2:3 y el slot es 4:5, así que sharp recorta
    ~800px de ancho con `position: "attention"`, que elige por entropía. Es
    heurístico: si el punto focal quedó cortado hay que fijar la posición.
  - **El texto `alt`.** Se puso `"Instalación eléctrica realizada, con la paleta
    del sitio"`, que es literalmente lo que confirmó el cliente. Es honesto pero
    vago para SEO y accesibilidad.

### 2. Análisis del lote de 91 fotos (aún sin tocar)
Se analizaron las 91 imágenes para decidir cómo curarlas. El hallazgo cambia el
planteo original:

- **Las 91 son de un solo día y una sola sesión**: 2 de octubre de 2026, entre
  las 18:44 y las 18:56. Doce minutos.
- **Sin EXIF en ninguna**: ni cámara, ni modelo, ni GPS, ni fecha. WhatsApp las
  stripped por completo.
- 74 verticales, 12 apaisadas; casi todas de ~1500px de lado mayor.
- 29 archivos llevan sufijo `(1)`, `(2)` de WhatsApp, pero **solo un par es
  duplicado real** (hash perceptual 32×32 grayscale). El resto son fotos distintas.
- 4 MP4 del mismo minuto (4.3 MB, 3.8 MB, 6.5 MB, 6.2 MB).

**Conclusión**: es probablemente **uno o dos trabajos**, no 91. Armar 91 fichas de
"trabajos realizados" con el mismo material sería redundante.

**Plan propuesto al cliente** (aún no ejecutado):
1. Elegir las 8 a 12 mejores en `/curacion`; el resto se marca `reject`.
2. Ordenarlas en 2 o 3 trabajos reales: hero, un par antes/después si existe, y
   el resto como apoyo.
3. Cargar un `alt` descriptivo de una línea cada una.

Reduce 91 decisiones a ~10.

**Mejora pendiente de `/curacion`**: hoy muestra 91 tarjetas con 7 campos cada
una en grilla de 4 columnas, lo que es inmanejable. La idea es pasarlo a un modo
"elección" de una foto a la vez, pantalla completa, con botones grandes para
`hero` / `trabajo` / `descartar` / `servicio`, y una segunda pantalla solo para
cargar los textos de las que quedaron.

---

## Nota sobre `npm audit`

Reporta 5 vulnerabilidades altas transitivas de ESLint (`braces` / `fast-glob`).
El `fix` propuesto degrada a Next 14, así que **no debe aplicarse**. Son
dependencias de desarrollo y no afectan el runtime del sitio desplegado.
