import photoManifest from "@/data/photos.json";

/**
 * SISTEMA DE IMÁGENES
 *
 * Las fotos originales viven en `fotosdetrabajos/` (fuera de git). El script
 * `npm run images` las normaliza a `public/images/_inbox/NNN.jpg`. El cliente
 * las etiqueta desde el panel `/curacion` (solo desarrollo), que escribe este
 * manifest.
 *
 * REGLA: mientras el manifest esté vacío, los slots muestran un placeholder
 * diseñado (reja técnica + numeración), nunca un cuadrado gris ni el texto
 * "IMAGE HERE".
 */

export type PhotoKind =
  | "hero"
  | "service"
  | "project"
  | "before"
  | "after"
  | "detail"
  | "reject";

export type PhotoEntry = {
  /** Ruta pública. La resuelve `npm run images`. */
  src: string;
  /** Alt descriptivo. Obligatorio: si falta, se usa el caption. */
  alt: string;
  kind: PhotoKind;
  /** Slug del servicio al que pertenece. `null` cuando todavía no se asignó. */
  service?: string | null;
  /** Agrupa una foto "before" con su "after". */
  pairId?: string | null;
  /** Título del trabajo. */
  title?: string;
  /** Categoría visible (tableros, iluminación, PAT...). */
  category?: string;
  /** Resultado del trabajo. Sin inventar especificaciones. */
  result?: string;
  /** Ubicación. Solo si el cliente la confirma. */
  location?: string;
  /** Prioridad para la home. */
  featured?: boolean;
  orientation?: "portrait" | "landscape" | "square";
  /** Recorte a sangre para banners y OG. Lo genera el script de imágenes. */
  wide16x9?: string;
  /** Recorte intermedio 3:2. */
  wide3x2?: string;
};

type Manifest = { photos?: PhotoEntry[] };

// El manifest viene del script y del panel de curaduría: se valida por forma,
// no por tipos exactos, porque `null` explícito es válido en el JSON.
const raw = photoManifest as unknown as Manifest;

const all: PhotoEntry[] = Array.isArray(raw.photos) ? raw.photos : [];

/** Fotos descartadas nunca llegan a la UI. */
const usable = all.filter(
  (photo) => photo.kind !== "reject" && Boolean(photo.src) && Boolean(photo.alt),
);

const byKind = (kind: PhotoKind) => usable.filter((photo) => photo.kind === kind);

function pick(pool: PhotoEntry[], index: number): PhotoEntry | undefined {
  if (pool.length === 0) return undefined;
  const safeIndex = ((index % pool.length) + pool.length) % pool.length;
  return pool[safeIndex];
}

/**
 * Hero aprobado por el cliente.
 *
 * Viene de `imagen principal.png` (1024×1536, vertical 2:3) y se procesó al
 * mismo pipeline que el resto. Se declara acá y no en `photos.json` a
 * propósito: es una imagen curada y validada por el cliente, no un derivado
 * del lote pendiente de clasificar.
 *
 * El `alt` describe lo que el cliente confirmó (una instalación eléctrica que
 * respeta la paleta del sitio), sin inventar qué equipo se ve.
 */
const approvedHero: PhotoEntry = {
  src: "/images/_hero/hero-4x5.jpg",
  wide16x9: "/images/_hero/hero-16x9.jpg",
  alt: "Instalación eléctrica realizada, con la paleta del sitio",
  kind: "hero",
  title: "Instalación eléctrica",
  featured: true,
  orientation: "portrait",
};

export const heroPhotos = [approvedHero, ...byKind("hero")];

/** Imagen principal del hero. Siempre presente: el cliente ya la aprobó. */
export const heroPhoto = approvedHero;

export const detailPhotos = byKind("detail");

export const projectPhotos = byKind("project");

/** true cuando hay material curado suficiente para mostrar la galería. */
export const hasProjects = projectPhotos.length > 0;

export type Project = {
  title: string;
  category: string;
  description: string;
  result: string;
  image: string;
  alt: string;
  location: string;
};

/**
 * Trabajos realizados, derivados de las fotos marcadas como "project".
 * Sin título confirmado se usa la categoría; nunca se inventan specs.
 */
export const projects: Project[] = projectPhotos.map((photo, index) => ({
  title: photo.title?.trim() || photo.category?.trim() || `Trabajo ${index + 1}`,
  category: photo.category?.trim() || "Instalación eléctrica",
  description: photo.alt,
  result: photo.result?.trim() || "",
  image: photo.src,
  alt: photo.alt,
  location: photo.location?.trim() || "",
}));

/** Categorías presentes en la galería, para el filtro de /trabajos. */
export const projectCategories: string[] = Array.from(
  new Set(projectPhotos.map((photo) => photo.category?.trim()).filter(Boolean)),
) as string[];

/** Foto representativa de un servicio. */
export function getServicePhoto(slug: string, index = 0): PhotoEntry | undefined {
  const pool = usable.filter(
    (photo) => photo.kind === "service" && photo.service === slug,
  );
  if (pool.length > 0) return pick(pool, index);
  // Fallback: cualquier foto de servicio sirve de apoyo visual.
  const generic = byKind("service");
  const detail = byKind("detail");
  return pick(pool.length === 0 ? [...generic, ...detail] : generic, index);
}

/** Fotografía de apoyo para una sección (edificios, seguridad, proceso). */
export function getSupportPhoto(
  kind: "detail" | "project",
  index = 0,
): PhotoEntry | undefined {
  return pick(kind === "detail" ? detailPhotos : projectPhotos, index);
}

export type BeforeAfterPair = {
  id: string;
  before: PhotoEntry;
  after: PhotoEntry;
  title: string;
  alt: string;
};

/** Pares antes/después. Si no hay pares curados, la sección no se renderiza. */
export const beforeAfterPairs: BeforeAfterPair[] = (() => {
  const groups = new Map<string, { before?: PhotoEntry; after?: PhotoEntry }>();
  for (const photo of all) {
    if ((photo.kind !== "before" && photo.kind !== "after") || !photo.pairId) continue;
    const group = groups.get(photo.pairId) ?? {};
    group[photo.kind] = photo;
    groups.set(photo.pairId, group);
  }
  return Array.from(groups.entries())
    .filter((pair): pair is [string, { before: PhotoEntry; after: PhotoEntry }] =>
      Boolean(pair[1].before && pair[1].after),
    )
    .map(([id, pair]) => ({
      id,
      before: pair.before,
      after: pair.after,
      title: pair.after.title?.trim() || pair.before.title?.trim() || "",
      alt: pair.after.alt || pair.before.alt,
    }));
})();

export const hasBeforeAfter = beforeAfterPairs.length > 0;

/** Estado de la curaduría, para mostrar avisos honestos en la UI. */
export const curation = {
  total: all.length,
  usable: usable.length,
  projects: projectPhotos.length,
  services: byKind("service").length,
  hero: heroPhotos.length,
  pairs: beforeAfterPairs.length,
  isEmpty: usable.length === 0,
} as const;