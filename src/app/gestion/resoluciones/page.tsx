import type { Metadata } from "next";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Resoluciones | EPS EMAQ S.A.",
  description: "Resoluciones de la EPS EMAQ S.A. de Quillabamba, La Convención, Cusco.",
  alternates: { canonical: "https://epsemaq.epsagua.com/gestion/resoluciones" },
};

export default function ResolucionesPage() {
  return (
    <PageShell
      title="Resoluciones"
      subtitle="Resoluciones emitidas por EPS EMAQ S.A."
      breadcrumb="Gestión / Resoluciones"
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b-2 border-[#0057a8] text-[#0057a8] text-sm uppercase tracking-wide">
              <th className="py-3 pr-4">Número</th>
              <th className="py-3 pr-4">Asunto</th>
              <th className="py-3 pr-4">Fecha</th>
              <th className="py-3 pr-4">Tipo</th>
              <th className="py-3">Documento</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-[#e2e8f0]">
              <td className="py-3 pr-4 text-sm text-[#1e293b] font-medium">Nº 094-2024-EPS-EMAQ S.A</td>
              <td className="py-3 pr-4 text-sm text-[#475569]">REGLAMENTO DE ORGANIZACIÓN Y FUNCIONES DE LA EPS EMAQ S.A</td>
              <td className="py-3 pr-4 text-sm text-[#64748b] whitespace-nowrap">2024-12-23</td>
              <td className="py-3 text-sm text-[#64748b]">GERENCIA</td>
              <td className="py-3 text-sm">
                <a className="text-[#0057a8] font-semibold hover:underline" href="https://epsemaq.com.pe/uploads/1778887404374-e4tabt.pdf" target="_blank" rel="noopener noreferrer">Ver PDF</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </PageShell>
  );
}
