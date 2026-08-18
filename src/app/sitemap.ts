import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://epsemaq.epsagua.com";
  const now = new Date();
  const staticPaths = [
    "",
    "/pagoWEB",
    "/nosotros/vision-mision",
    "/nosotros/informacion-general",
    "/nosotros/valores-corporativos",
    "/nosotros/historia",
    "/nosotros/organigrama",
    "/nosotros/funcionarios",
    "/gestion/transparencia",
    "/gestion/resoluciones",
    "/imagen/noticias",
    "/imagen/educacion-sanitaria",
    "/servicios/agentes-pago",
    "/servicios/tarifas",
    "/servicios/conoce-tu-recibo",
    "/servicios/cortes",
    "/contacto",
  ];
  const pages = staticPaths.map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : p === "/pagoWEB" ? 0.9 : 0.7,
  }));

  let noticias: MetadataRoute.Sitemap = [];
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { noticias: n } = require("../lib/emaq-data");
    noticias = n.map((x: { slug: string }) => ({
      url: `${base}/imagen/noticias/${x.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch {
    // ignore
  }

  return [...pages, ...noticias];
}