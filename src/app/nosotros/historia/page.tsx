import type { Metadata } from "next";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Nuestra Historia | EPS EMAQ S.A.",
  description: "Historia de la Empresa Municipal de Agua Potable y Alcantarillado de Quillabamba (EPS EMAQ S.A.).",
  alternates: { canonical: "https://epsemaq.epsagua.com/nosotros/historia" },
};

export default function NuestraHistoriaPage() {
  return (
    <PageShell title="Nuestra Historia" subtitle="Historia de EPS EMAQ S.A." breadcrumb="La Empresa / Nosotros / Historia">
          <p className="text-[#475569] leading-relaxed mb-5">La Empresa Municipal de Agua Potable y Alcantarillado de Quillabamba E.P.S. EMAQ SRLtda. es una Entidad Prestadora de Servicios de Agua Potable y Alcantarillado, Empresa Estatal de Derecho Privado Interno.</p>
          <p className="text-[#475569] leading-relaxed mb-5">Se constituye teniendo como base legal el Decreto Supremo Nº 168-91-PCM del 23 de octubre de 1991; esta norma legal autoriza la transferencia de la Ex Administradora Provincial de Quillabamba Filial SENAPA – SEDA QOSQO a la Municipalidad Provincial de La Convención, iniciando sus operaciones a partir del 01 de abril de 1991.</p>
          <p className="text-[#475569] leading-relaxed mb-5">La Empresa Municipal de Agua Potable y Alcantarillado Quillabamba fue legalmente reconocida como Empresa de Saneamiento mediante la Resolución de Superintendencia Nº 042-95-PRESS/VMI/SSS del 13 de marzo de 1995, y como Entidad Prestadora de Servicios mediante la Resolución Nº 194-95 PRESS/VMI/SUNASS del 23 de octubre de 1995.</p>
          <p className="text-[#475569] leading-relaxed mb-5">A lo largo de los años, la empresa ha trabajado en la mejora continua de su infraestructura y servicios, ampliando su cobertura y modernizando sus sistemas para brindar agua potable y alcantarillado de calidad a los habitantes de Quillabamba y alrededores.</p>
    </PageShell>
  );
}
