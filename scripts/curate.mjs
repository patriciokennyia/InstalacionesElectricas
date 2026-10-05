/**
 * Auditoría del manifest de fotos.
 *
 * NO etiqueta fotos: eso requiere criterio humano y se hace en `/curacion`.
 * Este script reporta qué falta para que el sitio pueda publicar cada slot sin
 * inventar contenido, y valida que las rutas existan en `public/`.
 *
 * Uso: npm run curate
 */
import { access, readFile } from "node:fs/promises";
import { join, resolve } from "node:path";

const MANIFEST = resolve("data/photos.json");
const PUBLIC = resolve("public");

const REQUIRED_ALT = new Set(["hero", "service", "project", "before", "after", "detail"]);

async function exists(publicPath) {
  if (typeof publicPath !== "string" || !publicPath.startsWith("/")) return false;
  try {
    await access(join(PUBLIC, publicPath));
    return true;
  } catch {
    return false;
  }
}

async function main() {
  let manifest;
  try {
    manifest = JSON.parse(await readFile(MANIFEST, "utf8"));
  } catch {
    console.error("No existe o no se puede leer data/photos.json. Corré npm run images.");
    process.exitCode = 1;
    return;
  }

  const photos = Array.isArray(manifest.photos) ? manifest.photos : [];
  if (photos.length === 0) {
    console.log("El manifest está vacío: el sitio usa placeholders diseñados.");
    return;
  }

  const problems = [];
  const byKind = new Map();

  for (const photo of photos) {
    byKind.set(photo.kind, (byKind.get(photo.kind) ?? 0) + 1);

    if (!(await exists(photo.src))) {
      problems.push(`${photo.id ?? photo.src}: falta el archivo ${photo.src}`);
    }

    if (photo.kind === "pending" || photo.kind === "reject") continue;

    if (REQUIRED_ALT.has(photo.kind) && !photo.alt?.trim()) {
      problems.push(`${photo.id ?? photo.src}: sin texto alternativo (no se publica)`);
    }

    if (photo.kind === "service" && !photo.service) {
      problems.push(`${photo.id ?? photo.src}: tipo "service" sin servicio asignado`);
    }

    if ((photo.kind === "before" || photo.kind === "after") && !photo.pairId) {
      problems.push(`${photo.id ?? photo.src}: before/after sin pairId`);
    }
  }

  console.log(`${photos.length} fotos en el manifest\n`);
  for (const kind of [...byKind.keys()].sort()) {
    console.log(`  ${String(byKind.get(kind)).padStart(3)} ${kind}`);
  }

  const publishable = photos.filter(
    (photo) => photo.kind !== "pending" && photo.kind !== "reject" && photo.alt?.trim(),
  );
  const heroes = publishable.filter((photo) => photo.kind === "hero");
  const projects = publishable.filter((photo) => photo.kind === "project");
  const services = new Set(
    publishable.filter((photo) => photo.kind === "service").map((photo) => photo.service),
  );

  console.log(`\nPublicables: ${publishable.length}`);
  console.log(`  hero: ${heroes.length}${heroes.length === 0 ? "  (el hero usa placeholder)" : ""}`);
  console.log(`  trabajos: ${projects.length}`);
  console.log(`  servicios con foto: ${services.size}`);

  const pending = byKind.get("pending") ?? 0;
  if (pending > 0) {
    console.log(`\nSin etiquetar: ${pending} foto(s) con kind "pending".`);
    console.log("Etiquetá en /curacion (npm run dev) y exportá el manifest.");
  }

  if (problems.length > 0) {
    console.log(`\n${problems.length} cosa(s) para resolver:`);
    for (const problem of problems.slice(0, 40)) console.log(`  - ${problem}`);
    if (problems.length > 40) console.log(`  … y ${problems.length - 40} más`);
    console.log("\nCorrigé en /curacion y volvé a correr este script.");
    process.exitCode = 1;
    return;
  }

  console.log(
    pending > 0
      ? "\nSin errores de formato, pero la curaduría está incompleta."
      : "\nTodo en orden.",
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
