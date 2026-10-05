"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Check, Loader2, Paperclip, TriangleAlert, X } from "lucide-react";
import { clientTypes, serviceOptions } from "@/data/faqs";
import { siteConfig } from "@/data/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const MAX_FILES = 6;
const MAX_FILE_BYTES = 8 * 1024 * 1024;

type Values = {
  nombre: string;
  telefono: string;
  email: string;
  tipoCliente: string;
  servicio: string;
  descripcion: string;
};

type Status = "idle" | "sending" | "sent" | "error";

const EMPTY: Values = {
  nombre: "",
  telefono: "",
  email: "",
  tipoCliente: "",
  servicio: "",
  descripcion: "",
};

/**
 * Formulario de consulta con carga de fotografías.
 *
 * Sin backend propio. El payload es un `FormData` listo para enviarse a
 * `NEXT_PUBLIC_FORM_ENDPOINT` (Formspree, Resend vía API propia, etc.). Si el
 * endpoint no está configurado, deriva a WhatsApp con los datos precargados y
 * avisa que las fotos hay que adjuntarlas ahí.
 */
export function ContactForm({ defaultService = "" }: { defaultService?: string }) {
  const [values, setValues] = useState<Values>({
    ...EMPTY,
    servicio: defaultService,
  });
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});

  const inputRef = useRef<HTMLInputElement>(null);
  const liveRef = useRef<HTMLParagraphElement>(null);

  const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "";

  const set = (key: keyof Values) => (value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const addFiles = (incoming: FileList | null) => {
    if (!incoming) return;
    const next: File[] = [];
    const rejected: string[] = [];

    for (const file of Array.from(incoming)) {
      if (!file.type.startsWith("image/")) {
        rejected.push(file.name);
        continue;
      }
      if (file.size > MAX_FILE_BYTES) {
        rejected.push(file.name);
        continue;
      }
      next.push(file);
    }

    setFiles((current) => {
      const merged = [...current, ...next].slice(0, MAX_FILES);
      return merged;
    });

    if (rejected.length > 0) {
      setFeedback(
        `Se omitieron ${rejected.length} archivo(s): solo imágenes de hasta 8 MB, máximo ${MAX_FILES} fotos.`,
      );
    } else if (incoming.length > MAX_FILES) {
      setFeedback(`Se cargaron las primeras ${MAX_FILES} fotos.`);
    } else {
      setFeedback("");
    }
  };

  const removeFile = (index: number) => {
    setFiles((current) => current.filter((_, itemIndex) => itemIndex !== index));
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof Values, string>> = {};

    if (values.nombre.trim().length < 2) next.nombre = "Escribí tu nombre.";
    if (values.telefono.trim().length < 6) {
      next.telefono = "Escribí un teléfono para poder contactarte.";
    }
    if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      next.email = "Revisá el email: no parece válido.";
    }
    if (values.descripcion.trim().length < 10) {
      next.descripcion = "Contanos brevemente qué hay que resolver.";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    if (!validate()) {
      setStatus("error");
      setFeedback("Revisá los campos marcados.");
      return;
    }

    setStatus("sending");
    setFeedback("");

    const payload = new FormData();
    payload.append("nombre", values.nombre.trim());
    payload.append("telefono", values.telefono.trim());
    payload.append("email", values.email.trim());
    payload.append("tipoCliente", values.tipoCliente);
    payload.append("servicio", values.servicio);
    payload.append("descripcion", values.descripcion.trim());
    payload.append("origen", "sitio web");
    for (const file of files) {
      payload.append("fotos", file);
    }

    // Sin endpoint configurado: derivamos a WhatsApp con el detalle escrito.
    if (!endpoint) {
      const label = (value: string, map?: Map<string, string>) =>
        value ? (map?.get(value) ?? value) : "—";

      const typeLabels = new Map(clientTypes.map((item) => [item.value, item.label]));

      const message = [
        `Consulta desde el sitio web.`,
        ``,
        `Nombre: ${values.nombre.trim()}`,
        `Teléfono: ${values.telefono.trim()}`,
        values.email.trim() ? `Email: ${values.email.trim()}` : "",
        `Tipo de cliente: ${label(values.tipoCliente, typeLabels)}`,
        `Servicio: ${label(values.servicio)}`,
        ``,
        values.descripcion.trim(),
        ``,
        files.length > 0
          ? `Voy a adjuntar ${files.length} foto(s) en este chat.`
          : "",
      ]
        .filter(Boolean)
        .join("\n");

      window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
      setStatus("sent");
      setFeedback(
        files.length > 0
          ? "Abrimos WhatsApp con tu consulta. Adjuntá las fotos en el chat."
          : "Abrimos WhatsApp con tu consulta.",
      );
      return;
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: payload,
        headers: { Accept: "application/json" },
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      setStatus("sent");
      setFeedback("Recibimos tu consulta. Te contactamos a la brevedad.");
      setValues(EMPTY);
      setFiles([]);
    } catch {
      setStatus("error");
      setFeedback(
        "No pudimos enviar el formulario. Probá por WhatsApp o por teléfono.",
      );
    }
  }

  // Mueve el foco al anuncio para que el lector de pantalla lo lea.
  useEffect(() => {
    if (feedback && liveRef.current) liveRef.current.textContent = feedback;
  }, [feedback]);

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-10 lg:grid-cols-12">
      {/* Honeypot: invisible para personas, tentador para bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px]">
        <label htmlFor="empresa">Empresa</label>
        <input id="empresa" name="empresa" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="lg:col-span-7">
        <div className="grid gap-6 sm:grid-cols-2">
          <Field
            id="nombre"
            label="Nombre"
            required
            error={errors.nombre}
            value={values.nombre}
            onChange={set("nombre")}
            autoComplete="name"
            placeholder="Tu nombre"
          />
          <Field
            id="telefono"
            label="Teléfono"
            required
            type="tel"
            error={errors.telefono}
            value={values.telefono}
            onChange={set("telefono")}
            autoComplete="tel"
            placeholder="11 0000-0000"
          />
          <Field
            id="email"
            label="Email"
            type="email"
            error={errors.email}
            value={values.email}
            onChange={set("email")}
            autoComplete="email"
            placeholder="Opcional"
            className="sm:col-span-2"
          />

          <SelectField
            id="tipoCliente"
            label="Tipo de cliente"
            value={values.tipoCliente}
            onChange={set("tipoCliente")}
            placeholder="Elegí una opción"
            options={clientTypes}
          />
          <SelectField
            id="servicio"
            label="Servicio"
            value={values.servicio}
            onChange={set("servicio")}
            placeholder="Elegí una opción"
            options={serviceOptions.map((label) => ({ value: label, label }))}
          />

          <div className="sm:col-span-2">
            <TextareaField
              id="descripcion"
              label="Descripción"
              required
              error={errors.descripcion}
              value={values.descripcion}
              onChange={set("descripcion")}
              placeholder="Contanos qué pasó, qué hace falta o qué querés resolver."
            />
          </div>
        </div>

        {/* Fotografías */}
        <div className="mt-8">
          <label
            htmlFor="fotos"
            className="font-display text-[0.68rem] uppercase tracking-[0.2em] text-chalk/70"
          >
            Fotografías
          </label>
          <p className="mt-2 text-sm leading-relaxed text-chalk/50">
            Si podés, enviá fotos del tablero o instalación. Nos ayuda a entender
            mejor el trabajo.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="inline-flex items-center gap-2.5 border border-chalk/20 px-5 py-3 font-display text-[0.64rem] uppercase tracking-[0.2em] text-chalk transition-colors hover:border-accent hover:text-accent"
            >
              <Paperclip className="size-4" aria-hidden="true" />
              Adjuntar fotos
            </button>
            <span className="text-xs text-chalk/35">
              {files.length > 0 ? `${files.length} de ${MAX_FILES} seleccionadas` : `Hasta ${MAX_FILES} imágenes`}
            </span>
          </div>

          <input
            ref={inputRef}
            id="fotos"
            name="fotos"
            type="file"
            accept="image/*"
            multiple
            onChange={(event) => addFiles(event.target.files)}
            className="sr-only"
          />

          {files.length > 0 ? (
            <ul className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-4">
              {files.map((file, index) => (
                <li key={`${file.name}-${index}`} className="relative">
                  <Preview file={file} />
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    aria-label={`Quitar ${file.name}`}
                    className="absolute right-1 top-1 flex size-6 items-center justify-center bg-ink/85 text-chalk transition-colors hover:bg-accent hover:text-ink"
                  >
                    <X className="size-3.5" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>

      {/* Envío */}
      <div className="lg:col-span-5">
        <div className="border border-chalk/12 bg-carbon p-7 lg:sticky lg:top-28">
          <h3 className="font-display text-[0.66rem] uppercase tracking-[0.25em] text-accent">
            Solicitar evaluación
          </h3>

          <ul className="mt-6 space-y-3 border-b border-chalk/10 pb-6">
            {[
              "Revisamos tu consulta y tus fotos.",
              "Coordinamos la evaluación en el lugar.",
              "Te explicamos qué hay que resolver.",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-sm text-chalk/60">
                <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>

          <p className="mt-6 text-xs leading-relaxed text-chalk/40">
            {endpoint
              ? "Los datos y las fotos se envían desde este sitio."
              : "Si el envío directo no está disponible, el botón abre WhatsApp con tu consulta escrita. Las fotos se adjuntan en el chat."}
          </p>

          <Button
            type="submit"
            size="lg"
            disabled={status === "sending"}
            className="mt-6 w-full"
          >
            {status === "sending" ? "Enviando" : "Solicitar evaluación"}
          </Button>

          <a
            href={siteConfig.phoneHref}
            className="mt-4 block text-center font-display text-xs tracking-[0.15em] text-chalk/45 transition-colors hover:text-accent"
          >
            o llamanos al {siteConfig.phoneDisplay}
          </a>

          {/* Anuncio para lectores de pantalla */}
          <p
            ref={liveRef}
            aria-live="polite"
            className={cn(
              "mt-5 flex items-start gap-2 text-xs leading-relaxed",
              status === "sent" && "text-accent",
              status === "error" && "text-chalk/70",
            )}
          >
            {status === "sent" ? (
              <Check className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            ) : null}
            {status === "error" ? (
              <TriangleAlert className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
            ) : null}
            {feedback}
          </p>

          {status === "sending" ? (
            <span className="sr-only" role="status">
              <Loader2 className="size-4" aria-hidden="true" />
              Enviando consulta
            </span>
          ) : null}
        </div>
      </div>
    </form>
  );
}

function Preview({ file }: { file: File }) {
  // El object URL se deriva del archivo (no es estado) y se libera al cambiar.
  const url = useMemo(() => URL.createObjectURL(file), [file]);

  useEffect(() => () => URL.revokeObjectURL(url), [url]);

  return (
    <div className="aspect-square overflow-hidden border border-chalk/12 bg-graphite">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={url}
        alt={file.name}
        className="size-full object-cover"
        loading="lazy"
      />
    </div>
  );
}

const fieldClass =
  "mt-2.5 w-full border border-chalk/15 bg-ink px-4 py-3.5 text-[0.95rem] text-chalk placeholder:text-chalk/25 transition-colors focus:border-accent focus:outline-none";

function Field({
  id,
  label,
  value,
  onChange,
  error,
  required = false,
  type = "text",
  placeholder,
  autoComplete,
  className,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="font-display text-[0.68rem] uppercase tracking-[0.2em] text-chalk/70"
      >
        {label}
        {required ? <span className="ml-1 text-accent">*</span> : null}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(fieldClass, error && "border-accent")}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-xs text-accent">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="font-display text-[0.68rem] uppercase tracking-[0.2em] text-chalk/70"
      >
        {label}
      </label>
      <select
        id={id}
        name={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={cn(fieldClass, "appearance-none bg-[length:0] pr-10")}
        style={{
          backgroundImage:
            "linear-gradient(45deg, transparent 50%, #a3a09a 50%), linear-gradient(135deg, #a3a09a 50%, transparent 50%)",
          backgroundPosition: "right 18px top 55%, right 13px top 55%",
          backgroundSize: "5px 5px, 5px 5px",
          backgroundRepeat: "no-repeat",
        }}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function TextareaField({
  id,
  label,
  value,
  onChange,
  error,
  required = false,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="font-display text-[0.68rem] uppercase tracking-[0.2em] text-chalk/70"
      >
        {label}
        {required ? <span className="ml-1 text-accent">*</span> : null}
      </label>
      <textarea
        id={id}
        name={id}
        rows={5}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(fieldClass, "resize-y", error && "border-accent")}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-xs text-accent">
          {error}
        </p>
      ) : null}
    </div>
  );
}