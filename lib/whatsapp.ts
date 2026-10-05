import { siteConfig } from "@/data/site";

/**
 * Mensajes contextuales de WhatsApp.
 *
 * Cada punto de entrada del sitio usa el mensaje que corresponde al contexto
 * (general, edificio, tablero, DSI, etc.) para que la conversación empiece
 * con contexto y no con un "hola" vacío.
 */
export const whatsappMessages = {
  general:
    "Hola, quisiera consultar por un trabajo eléctrico.",
  buildings:
    "Hola, quisiera consultar por mantenimiento eléctrico para un edificio.",
  boards:
    "Hola, quisiera consultar por un tablero eléctrico.",
  earthGround:
    "Hola, quisiera consultar por puesta a tierra (PAT).",
  emergencyLights:
    "Hola, quisiera consultar por mantenimiento de luces de emergencia.",
  lighting:
    "Hola, quisiera consultar por un trabajo de iluminación.",
  loadDeclaration:
    "Hola, quisiera consultar por una Declaración de Carga para un medidor nuevo.",
  home:
    "Hola, quisiera consultar por una instalación en mi casa.",
  commercial:
    "Hola, quisiera consultar por una instalación para mi comercio.",
  company:
    "Hola, quisiera consultar por mantenimiento eléctrico para una empresa.",
  budget:
    "Hola, quisiera solicitar un presupuesto.",
} as const;

export type WhatsappMessageKey = keyof typeof whatsappMessages;

/**
 * Construye el enlace de WhatsApp con el mensaje precargado.
 *
 * @param key clave de `whatsappMessages`, o un mensaje libre como segundo argumento.
 */
export function buildWhatsAppUrl(
  keyOrMessage: WhatsappMessageKey | string = "general",
): string {
  const message =
    typeof keyOrMessage === "string" && keyOrMessage in whatsappMessages
      ? whatsappMessages[keyOrMessage as WhatsappMessageKey]
      : keyOrMessage;

  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** Enlace de WhatsApp ya listo para `href`. */
export function whatsappHref(keyOrMessage: WhatsappMessageKey | string = "general") {
  return buildWhatsAppUrl(keyOrMessage);
}