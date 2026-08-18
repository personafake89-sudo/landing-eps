import type { Metadata } from "next";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Transparencia | EPS EMAQ S.A.",
  description: "Información de transparencia y acceso a la información pública de EPS EMAQ S.A. de Quillabamba.",
  alternates: { canonical: "https://epsemaq.epsagua.com/gestion/transparencia" },
};

const links = [
  { t: "Portal de Transparencia Estándar", d: "Información pública de la empresa en el portal del Estado peruano.", h: "https://www.transparencia.gob.pe/enlaces/pte_transparencia_enlaces.aspx?id_entidad=103007&id_tema=1&ver=D" },
  { t: "Gobierno del Perú – EPS EMAQ", d: "Perfil institucional en el portal oficial del Estado peruano.", h: "https://www.gob.pe/epsemaq" },
  { t: "SUNASS", d: "Superintendencia Nacional de Servicios de Saneamiento.", h: "https://www.sunass.gob.pe" },
  { t: "Ley de Transparencia", d: "Texto Único Ordenado de la Ley Nº 27806 – Ley de Transparencia y Acceso a la Información Pública.", h: "https://www.gob.pe/institucion/pcm/normas-legales/1185311-27806" },
];

export default function TransparenciaPage() {
  return (
    <PageShell
      title="Transparencia"
      subtitle="Acceso a la información pública de EPS EMAQ S.A."
      breadcrumb="Gestión / Transparencia"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        {links.map(l => (
          <a key={l.t} href={l.h} target="_blank" rel="noopener noreferrer"
            className="block rounded-xl border border-[#e2e8f0] p-5 bg-[#f8fafc] hover:border-[#0057a8] hover:shadow-md transition-all">
            <h3 className="font-semibold text-[#0057a8] mb-1">{l.t}</h3>
            <p className="text-sm text-[#64748b] leading-relaxed">{l.d}</p>
          </a>
        ))}
      </div>
    </PageShell>
  );
}
