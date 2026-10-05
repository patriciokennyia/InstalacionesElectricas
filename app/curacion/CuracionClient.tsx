"use client";

import { useMemo, useState } from "react";

type Kind = "hero" | "service" | "project" | "before" | "after" | "detail" | "reject";

type Photo = {
  id?: string;
  src: string;
  wide16x9?: string;
  originalName?: string;
  width?: number;
  height?: number;
  orientation?: string;
  alt: string;
  kind: string;
  service: string | null;
  pairId: string | null;
  title: string;
  category: string;
  result: string;
  location: string;
  featured: boolean;
};

const KINDS: { value: Kind; label: string }[] = [
  { value: "hero", label: "Hero" },
  { value: "service", label: "Servicio" },
  { value: "project", label: "Trabajo" },
  { value: "before", label: "Antes" },
  { value: "after", label: "Después" },
  { value: "detail", label: "Detalle" },
  { value: "reject", label: "Descartar" },
];

const SERVICE_SLUGS = [
  "tableros-electricos",
  "arreglos-instalaciones",
  "puesta-a-tierra",
  "iluminacion",
  "luces-emergencia",
  "declaracion-carga",
  "mantenimiento-edificios",
];

const STORAGE_KEY = "curacion-fotos-v1";

export default function CurationPage({ initialPhotos }: { initialPhotos: Photo[] }) {
  const [photos, setPhotos] = useState<Photo[]>(initialPhotos);
  const [filter, setFilter] = useState<string>("all");
  const [status, setStatus] = useState("");
  const [lightbox, setLightbox] = useState<Photo | null>(null);

  const visible = useMemo(
    () => (filter === "all" ? photos : photos.filter((photo) => photo.kind === filter)),
    [photos, filter],
  );

  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const photo of photos) {
      map[photo.kind] = (map[photo.kind] ?? 0) + 1;
    }
    return map;
  }, [photos]);

  function update(index: number, patch: Partial<Photo>) {
    setPhotos((current) => {
      const next = current.map((photo, itemIndex) =>
        itemIndex === index ? { ...photo, ...patch } : photo,
      );
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }

  /** La sesión guardada se carga a pedido: nunca se lee storage al montar. */
  function loadSession() {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      setStatus("No hay sesión guardada en este navegador.");
      return;
    }
    setPhotos(JSON.parse(raw) as Photo[]);
    setStatus("Sesión guardada cargada.");
  }

  function saveManifest() {
    // Se exporta el manifest tal cual: `npm run images` reasocia las etiquetas
    // por `src` en la próxima corrida, así que el `id` puede viajar.
    const payload = {
      $comment:
        "Generado desde /curacion. Los archivos van en public/images/_inbox y /images/_wide.",
      photos,
    };
    const blob = new Blob([`${JSON.stringify(payload, null, 2)}\n`], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "photos.json";
    link.click();
    URL.revokeObjectURL(url);
    setStatus("Descargá photos.json y reemplazá data/photos.json.");
  }

  const pending = photos.filter((photo) => !photo.alt || photo.kind === "pending").length;

  return (
    <div className="min-h-dvh bg-ink px-5 py-10 text-chalk">
      <div className="mx-auto max-w-[100rem]">
        <header className="border-b border-chalk/15 pb-6">
          <h1 className="font-display text-3xl uppercase tracking-wide">Curaduría de fotos</h1>
          <p className="mt-3 max-w-2xl text-sm text-chalk/60">
            Etiquetá cada foto: tipo, servicio, título y texto alternativo. Lo que quede sin{" "}
            <code className="text-accent">alt</code> no se publica. Guardá el manifest y
            reemplazá <code>data/photos.json</code>.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setFilter("all")}
              className={chip(filter === "all")}
            >
              Todas ({photos.length})
            </button>
            {KINDS.map((kind) => (
              <button
                key={kind.value}
                type="button"
                onClick={() => setFilter(kind.value)}
                className={chip(filter === kind.value)}
              >
                {kind.label} ({counts[kind.value] ?? 0})
              </button>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={saveManifest}
              className="bg-accent px-5 py-2.5 font-display text-xs uppercase tracking-[0.15em] text-ink"
            >
              Guardar manifest
            </button>
            <button
              type="button"
              onClick={loadSession}
              className="border border-chalk/25 px-5 py-2.5 font-display text-xs uppercase tracking-[0.15em] text-chalk/70"
            >
              Cargar sesión
            </button>
            <button
              type="button"
              onClick={() => {
                window.localStorage.removeItem(STORAGE_KEY);
                setPhotos(initialPhotos);
                setStatus("Curaduría reiniciada a la carga original.");
              }}
              className="border border-chalk/25 px-5 py-2.5 font-display text-xs uppercase tracking-[0.15em] text-chalk/70"
            >
              Reiniciar
            </button>
            <p className="text-xs text-accent">{status}</p>
          </div>

          {pending > 0 ? <p className="mt-4 text-xs text-chalk/40">{pending} foto(s) sin completar.</p> : null}
        </header>

        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((photo) => {
            const index = photos.findIndex((item) => item.src === photo.src);
            return (
              <li key={photo.src} className="border border-chalk/15 bg-carbon">
                <button
                  type="button"
                  onClick={() => setLightbox(photo)}
                  className="relative block aspect-[4/5] w-full overflow-hidden bg-graphite"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo.src}
                    alt={photo.alt || photo.originalName || "Foto sin etiquetar"}
                    className="size-full object-cover"
                  />
                  {photo.kind === "reject" ? (
                    <span className="absolute inset-0 flex items-center justify-center bg-ink/75 font-display text-xs uppercase tracking-[0.2em] text-accent">
                      Descartada
                    </span>
                  ) : null}
                  {photo.featured ? (
                    <span className="absolute left-2 top-2 bg-accent px-2 py-1 font-display text-[0.6rem] uppercase tracking-[0.15em] text-ink">
                      Destacada
                    </span>
                  ) : null}
                </button>

                <div className="space-y-3 p-4">
                  <p className="truncate font-display text-[0.62rem] uppercase tracking-[0.18em] text-chalk/40">
                    {photo.id ?? "?"} · {photo.originalName}
                  </p>

                  <div className="grid grid-cols-2 gap-2">
                    <label className="col-span-2 block text-[0.65rem] text-chalk/60">
                      Tipo
                      <select
                        value={photo.kind}
                        onChange={(event) => update(index, { kind: event.target.value })}
                        className="mt-1 w-full border border-chalk/20 bg-ink px-2 py-2 text-xs text-chalk"
                      >
                        {KINDS.map((kind) => (
                          <option key={kind.value} value={kind.value}>
                            {kind.label}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="col-span-2 block text-[0.65rem] text-chalk/60">
                      Servicio
                      <select
                        value={photo.service ?? ""}
                        onChange={(event) =>
                          update(index, { service: event.target.value || null })
                        }
                        className="mt-1 w-full border border-chalk/20 bg-ink px-2 py-2 text-xs text-chalk"
                      >
                        <option value="">— sin asignar —</option>
                        {SERVICE_SLUGS.map((slug) => (
                          <option key={slug} value={slug}>
                            {slug}
                          </option>
                        ))}
                      </select>
                    </label>

                    <Text
                      label="Título"
                      value={photo.title}
                      onChange={(value) => update(index, { title: value })}
                    />
                    <Text
                      label="Categoría"
                      value={photo.category}
                      onChange={(value) => update(index, { category: value })}
                    />
                    <label className="col-span-2 block text-[0.65rem] text-chalk/60">
                      Texto alternativo (alt)
                      <textarea
                        rows={2}
                        value={photo.alt}
                        placeholder="Describí la foto: qué se ve y qué trabajo representa"
                        onChange={(event) => update(index, { alt: event.target.value })}
                        className="mt-1 w-full resize-y border border-chalk/20 bg-ink px-2 py-2 text-xs text-chalk"
                      />
                    </label>
                    <Text
                      label="Par (antes/después)"
                      value={photo.pairId ?? ""}
                      placeholder="ej: tablero-a"
                      onChange={(value) => update(index, { pairId: value || null })}
                    />
                    <Text
                      label="Resultado"
                      value={photo.result}
                      onChange={(value) => update(index, { result: value })}
                    />
                  </div>

                  <label className="flex items-center gap-2 text-[0.65rem] text-chalk/60">
                    <input
                      type="checkbox"
                      checked={photo.featured}
                      onChange={(event) => update(index, { featured: event.target.checked })}
                      className="size-4 accent-[#f5b301]"
                    />
                    Destacar en la home
                  </label>
                </div>
              </li>
            );
          })}
        </ul>

        {photos.length === 0 ? (
          <p className="mt-12 text-sm text-chalk/50">
            No hay fotos cargadas. Corré{" "}
            <code className="text-accent">npm run images</code> para procesarlas desde{" "}
            <code>fotosdetrabajos/</code>.
          </p>
        ) : null}
      </div>

      {lightbox ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/95 p-6"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="max-h-full max-w-5xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={lightbox.wide16x9 ?? lightbox.src}
              alt={lightbox.alt}
              className="max-h-[80vh] w-auto object-contain"
            />
            <p className="mt-4 text-center text-xs text-chalk/50">
              {lightbox.originalName} — clic para cerrar
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function chip(active: boolean) {
  return [
    "border px-3 py-1.5 font-display text-[0.62rem] uppercase tracking-[0.15em] transition-colors",
    active
      ? "border-accent bg-accent text-ink"
      : "border-chalk/20 text-chalk/60 hover:border-accent hover:text-accent",
  ].join(" ");
}

function Text({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block text-[0.65rem] text-chalk/60">
      {label}
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1 w-full border border-chalk/20 bg-ink px-2 py-2 text-xs text-chalk"
      />
    </label>
  );
}
