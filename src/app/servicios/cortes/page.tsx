import type { Metadata } from "next";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Cortes Programados | EPS EMAQ S.A.",
  description: "Avisos de cortes programados del servicio de agua potable de EPS EMAQ S.A.",
  alternates: { canonical: "https://epsemaq.epsagua.com/servicios/cortes" },
};

export default function CortesPage() {
  return (
    <PageShell
      title="Cortes Programados"
      subtitle="Información sobre las interrupciones del servicio de agua potable."
      breadcrumb="Servicios / Cortes"
    >
      <div className="rounded-xl border border-[#e2e8f0] p-6 bg-[#f8fafc] text-center py-12">
        <h3 className="text-lg font-semibold text-[#1e293b] mb-2">No hay cortes programados</h3>
        <p className="text-[#64748b] text-sm">
          Actualmente no se reportan interrupciones del servicio de agua potable.
          Ante cualquier corte programado, EPS EMAQ S.A. informará oportunamente por este medio y por sus canales oficiales.
        </p>
      </div>
    </PageShell>
  );
}
