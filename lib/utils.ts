/** Une clases condicionalmente, sin dependencias externas. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Formatea un teléfono argentino a formato legible: 11 5113-3791 */
export function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  const local = digits.startsWith("54") ? digits.slice(2) : digits;
  if (local.length === 10) {
    return `${local.slice(0, 2)} ${local.slice(2, 6)}-${local.slice(6)}`;
  }
  return raw;
}

/** Un slug de dos dígitos: 1 -> "01" */
export function pad2(n: number): string {
  return n.toString().padStart(2, "0");
}