import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import { noticias } from "@/lib/emaq-data";

export const metadata: Metadata = {
  title: "Noticias | EPS EMAQ S.A.",
  description: "Noticias de EPS EMAQ S.A. de Quillabamba, La Convención, Cusco.",
  alternates: { canonical: "https://epsemaq.epsagua.com/imagen/noticias" },
};

export default function NoticiasPage() {
  return (
    <PageShell title="Noticias" subtitle="Mantente informado sobre las actividades de EPS EMAQ S.A." breadcrumb="Imagen Institucional / Noticias">
      <div className="grid md:grid-cols-3 gap-7">
        {noticias.map((n) => (
          <Link key={n.slug} href={`/imagen/noticias/${n.slug}`} className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
            <div className="relative h-48 overflow-hidden">
              <Image src={n.imagen} alt={n.titulo} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="flex flex-col flex-1 p-5">
              <span className="text-xs text-gray-400 mb-2">{n.fecha}</span>
              <h3 className="font-bold text-gray-800 leading-snug mb-2 group-hover:text-[#0057a8] transition-colors">{n.titulo}</h3>
              <p className="text-gray-500 text-sm leading-relaxed flex-1">{n.resumen}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-[#0057a8] font-semibold text-sm">Leer más →</span>
            </div>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
