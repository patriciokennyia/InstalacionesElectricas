import { notFound } from "next/navigation";
import photoManifest from "@/data/photos.json";
import CuracionClient from "./CuracionClient";

/**
 * Panel de curaduría: SOLO DESARROLLO.
 *
 * En producción responde 404.
 */
export const dynamic = "force-dynamic";

export default function CuracionPage() {
  if (process.env.NODE_ENV === "production") notFound();

  return <CuracionClient initialPhotos={photoManifest.photos ?? []} />;
}
