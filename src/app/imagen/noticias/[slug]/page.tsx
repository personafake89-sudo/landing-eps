import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import { noticias } from "@/lib/emaq-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return noticias.map((n) => ({ slug: n.slug }));
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const n = noticias.find((x) => x.slug === slug);
  return {
    title: n ? `${n.titulo} | EPS EMAQ S.A.` : "Noticia | EPS EMAQ S.A.",
    description: n ? n.resumen : undefined,
    alternates: { canonical: `https://epsemaq.epsagua.com/imagen/noticias/${slug}` },
  };
}

export default async function NoticiaDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const n = noticias.find((x) => x.slug === slug);
  if (!n) return null;
  const paragraphs = (n.contenido || n.resumen).split(/\n+/).filter(Boolean);
  return (
    <PageShell title={n.titulo} subtitle={n.resumen} breadcrumb="Imagen Institucional / Noticias">
      <div className="max-w-3xl">
        <div className="text-sm text-gray-500 mb-6">{n.fecha} · {n.categoria}</div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={n.imagen} alt={n.titulo} className="w-full h-72 object-cover rounded-2xl mb-8" />
        <div className="prose prose-slate max-w-none space-y-4">
          {paragraphs.map((p, i) => (
            <p key={i} className="text-[#475569] leading-relaxed">{p}</p>
          ))}
        </div>
      </div>
    </PageShell>
  );
}