import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/site";
import { serviceSlugs } from "@/data/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    { path: "", priority: 1 },
    { path: "/servicios", priority: 0.9 },
    { path: "/trabajos", priority: 0.7 },
    { path: "/nosotros", priority: 0.6 },
    { path: "/contacto", priority: 0.9 },
  ].map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: route.priority,
  }));

  const serviceRoutes = serviceSlugs.map((slug) => ({
    url: `${siteUrl}/servicios/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...serviceRoutes];
}