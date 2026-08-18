import type { Metadata } from "next";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Agentes Autorizados de Pago | EPS EMAQ S.A.",
  description: "Agentes autorizados para el pago del recibo de agua de EPS EMAQ S.A. en Quillabamba.",
  alternates: { canonical: "https://epsemaq.epsagua.com/servicios/agentes-pago" },
};

const agentes = [
  { t: "Pago en línea", d: "Paga tu recibo desde la web con tarjeta VISA o Mastercard.", icon: "💳" },
  { t: "Billeteras digitales", d: "Yape, Plin y banca móvil para un pago rápido y seguro.", icon: "📱" },
  { t: "Bancos", d: "Agentes autorizados de los principales bancos del país.", icon: "🏦" },
  { t: "Oficina central", d: "Av. Nicanor Larrea N° 337 – Distrito Santa Ana, Quillabamba.", icon: "🏢" },
];

export default function AgentesPagoPage() {
  return (
    <PageShell
      title="Agentes Autorizados de Pago"
      subtitle="Canales autorizados para el pago de tu recibo de agua de EPS EMAQ S.A."
      breadcrumb="Servicios / Agentes Autorizados de Pago"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        {agentes.map((a) => (
          <div key={a.t} className="flex items-start gap-4 rounded-xl border border-[#e2e8f0] p-5 bg-[#f8fafc]">
            <span className="text-3xl">{a.icon}</span>
            <div>
              <h3 className="font-semibold text-[#1e293b] mb-1">{a.t}</h3>
              <p className="text-[#64748b] text-sm leading-relaxed">{a.d}</p>
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
