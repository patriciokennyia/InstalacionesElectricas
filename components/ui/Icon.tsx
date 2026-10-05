import {
  Building,
  Factory,
  Handshake,
  Home,
  LampDesk,
  PanelsTopLeft,
  Plug,
  ShieldCheck,
  Siren,
  Store,
  Warehouse,
  Wrench,
  Zap,
  FileText,
} from "lucide-react";
import type { IconName } from "@/data/services";

/**
 * Registro único de iconografía. Set lineal de lucide, sin emojis y sin
 * mezclar fuentes. Todo el sitio saca sus iconos de acá.
 */
const registry = {
  plug: Plug,
  panels: PanelsTopLeft,
  lightbulb: LampDesk,
  siren: Siren,
  fileText: FileText,
  building: Building,
  zap: Zap,
  wrench: Wrench,
  shieldCheck: ShieldCheck,
  home: Home,
  store: Store,
  warehouse: Warehouse,
  handshake: Handshake,
  factory: Factory,
} satisfies Record<string, React.ComponentType<{ className?: string }>>;

export function Icon({
  name,
  className,
}: {
  name: IconName;
  className?: string;
}) {
  const Component = registry[name];
  if (!Component) return null;
  return <Component className={className} aria-hidden="true" />;
}