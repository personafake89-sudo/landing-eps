import type { Metadata } from "next";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Contacto | EPS EMAQ S.A.",
  description: "Canales de contacto de EPS EMAQ S.A. de Quillabamba, La Convención, Cusco.",
  alternates: { canonical: "https://epsemaq.epsagua.com/contacto" },
};

const items = [
  { t: "Dirección", d: "Av. Nicanor Larrea N° 337 – Distrito Santa Ana, Quillabamba, Cusco.", icon: "📍" },
  { t: "Teléfono", d: "973 598 606", icon: "📞" },
  { t: "Correo", d: "consultas@epsemaq.com.pe", icon: "✉️" },
  { t: "Control de Calidad", d: "973 597 576", icon: "🧪" },
  { t: "Central de emergencias", d: "973 597 095", icon: "🚨" },
];

export default function ContactoPage() {
  return (
    <PageShell
      title="Contacto"
      subtitle="Estamos para atenderte. Conoce nuestros canales de atención."
      breadcrumb="Contacto"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        {items.map((c) => (
          <div key={c.t} className="flex items-start gap-4 rounded-xl border border-[#e2e8f0] p-5 bg-[#f8fafc]">
            <span className="text-3xl">{c.icon}</span>
            <div>
              <h3 className="font-semibold text-[#1e293b] mb-1">{c.t}</h3>
              <p className="text-[#64748b] text-sm leading-relaxed">{c.d}</p>
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
