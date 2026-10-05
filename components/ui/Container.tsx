import { cn } from "@/lib/utils";

/** Contenedor editorial. Un solo lugar donde vive el ancho máximo y el gutter. */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn("container-page", className)}>{children}</div>;
}