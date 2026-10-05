/**
 * Procesa las fotos originales del cliente hacia `public/images/`.
 *
 * - Normaliza nombres a `NNN.jpg` en orden estable.
 * - Genera recortes derivados `16:9` y `3:2` para hero y banners.
 * - NO borra los originales: `fotosdetrabajos/` queda intacto.
 *
 * Uso: npm run images
 */
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { extname, join, resolve } from "node:path";
import sharp from "sharp";

const SOURCE = resolve("fotosdetrabajos");
const OUTBOX = resolve("public/images");
const INBOX = join(OUTBOX, "_inbox");
const WIDE = join(OUTBOX, "_wide");
const MANIFEST = resolve("data/photos.json");

const EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".heic"]);

async function main() {
  let files;
  try {
    files = await readdir(SOURCE);
  } catch {
    console.error(
      `No se encontró la carpeta de fotos en ${SOURCE}.\n` +
        `Copiá tus imágenes ahí y volvé a correr: npm run images`,
    );
    process.exitCode = 1;
    return;
  }

  // Orden estable: numérico dentro de cada grupo de timestamp, para que la
  // numeración sea predecible entre corridas.
  const images = files
    .filter((name) => EXTENSIONS.has(extname(name).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, "es", { numeric: true }));

  if (images.length === 0) {
    console.log("No hay imágenes para procesar.");
    return;
  }

  await mkdir(INBOX, { recursive: true });
  await mkdir(WIDE, { recursive: true });

  const entries = [];
  let index = 0;

  for (const name of images) {
    index += 1;
    const id = String(index).padStart(3, "0");
    const buffer = await readFile(join(SOURCE, name));
    const pipeline = sharp(buffer).rotate();

    const meta = await pipeline.metadata();
    const width = meta.width ?? 0;
    const height = meta.height ?? 0;
    const orientation =
      height > width * 1.05 ? "portrait" : width > height * 1.05 ? "landscape" : "square";

    const baseName = `${id}`;

    // Original optimizado, con el ancho máximo razonable para pantallas grandes.
    await pipeline
      .clone()
      .resize({ width: 1800, withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true, progressive: true })
      .toFile(join(INBOX, `${baseName}.jpg`));

    // Recorte 16:9 para hero y banners (el sitio es portrait-first, pero los
    // bloques a sangre necesitan un encuadre apaisado).
    await pipeline
      .clone()
      .resize({ width: 1920, height: 1080, fit: "cover", position: "attention" })
      .jpeg({ quality: 80, mozjpeg: true, progressive: true })
      .toFile(join(WIDE, `${baseName}-16x9.jpg`));

    // Recorte 3:2 para banners intermedios.
    await pipeline
      .clone()
      .resize({ width: 1600, height: 1067, fit: "cover", position: "attention" })
      .jpeg({ quality: 80, mozjpeg: true, progressive: true })
      .toFile(join(WIDE, `${baseName}-3x2.jpg`));

    entries.push({
      id,
      src: `/images/_inbox/${baseName}.jpg`,
      wide16x9: `/images/_wide/${baseName}-16x9.jpg`,
      wide3x2: `/images/_wide/${baseName}-3x2.jpg`,
      originalName: name,
      width,
      height,
      orientation,
      bytes: buffer.byteLength,
    });
  }

  // Preserva etiquetas ya curadas: se reasocia por índice, no por ruta.
  let previous = { photos: [] };
  try {
    previous = JSON.parse(await readFile(MANIFEST, "utf8"));
  } catch {
    // Primer paso: todavía no existe el manifest.
  }

  const byOriginal = new Map(
    (previous.photos ?? []).map((photo) => [photo.src, photo]),
  );

  const photos = entries.map((entry) => {
    const prior = byOriginal.get(entry.src) ?? {};
    return {
      ...prior,
      id: entry.id,
      src: entry.src,
      wide16x9: entry.wide16x9,
      wide3x2: entry.wide3x2,
      originalName: entry.originalName,
      width: entry.width,
      height: entry.height,
      orientation: entry.orientation,
      alt: prior.alt ?? "",
      kind: prior.kind ?? "pending",
      service: prior.service ?? null,
      pairId: prior.pairId ?? null,
      title: prior.title ?? "",
      category: prior.category ?? "",
      result: prior.result ?? "",
      location: prior.location ?? "",
      featured: prior.featured ?? false,
    };
  });

  await writeFile(
    MANIFEST,
    `${JSON.stringify({ $comment: "Generado por npm run images. Editá las etiquetas desde /curacion (solo desarrollo).", photos }, null, 2)}\n`,
    "utf8",
  );

  const totalMb = (entries.reduce((sum, entry) => sum + entry.bytes, 0) / 1024 / 1024).toFixed(1);
  const portraits = entries.filter((entry) => entry.orientation === "portrait").length;
  const landscapes = entries.filter((entry) => entry.orientation === "landscape").length;

  console.log(`${entries.length} imágenes procesadas (${totalMb} MB de origen).`);
  console.log(`  ${portraits} verticales · ${landscapes} apaisadas · resto cuadradas`);
  console.log(`  inbox: ${INBOX}`);
  console.log(`  derivados 16:9 y 3:2: ${WIDE}`);
  console.log(`  manifest: ${MANIFEST}`);
  console.log("");
  console.log("Ahora levantá el sitio y entrá a /curacion para etiquetarlas.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
