import type { Metadata } from "next";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Conoce tu Recibo de Agua | EPS EMAQ S.A.",
  description: "Guía para entender tu recibo de agua potable de EPS EMAQ S.A.",
  alternates: { canonical: "https://epsemaq.epsagua.com/servicios/conoce-tu-recibo" },
};

const partes = [
  { t: "Datos del usuario", d: "Nombre, dirección y número de suministro del usuario del servicio." },
  { t: "Lectura de medidor", d: "Lectura actual y anterior del medidor, y consumo del periodo en m³." },
  { t: "Cargos y tarifas", d: "Detalle de los importes por consumo de agua potable, alcantarillado y cargos fijos." },
  { t: "Deuda total", d: "Monto total a pagar y la fecha de vencimiento del recibo." },
  { t: "Medios de pago", d: "Canales autorizados: pago en línea, billeteras digitales, bancos y oficina central." },
];

export default function ConoceTuReciboPage() {
  return (
    <PageShell
      title="Conoce tu Recibo de Agua"
      subtitle="Entiende cada parte de tu recibo de agua potable de EPS EMAQ S.A."
      breadcrumb="Servicios / Conoce tu Recibo"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        {partes.map((p) => (
          <div key={p.t} className="flex items-start gap-4 rounded-xl border border-[#e2e8f0] p-5 bg-[#f8fafc]">
            <span className="mt-0.5 shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#00a651] text-white text-sm font-bold">✓</span>
            <div>
              <h3 className="font-semibold text-[#1e293b] mb-1">{p.t}</h3>
              <p className="text-[#64748b] text-sm leading-relaxed">{p.d}</p>
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
