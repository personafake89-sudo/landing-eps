import type { Metadata } from "next";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Estructura Tarifaria | EPS EMAQ S.A.",
  description: "Estructura tarifaria del servicio de agua potable y alcantarillado de EPS EMAQ S.A.",
  alternates: { canonical: "https://epsemaq.epsagua.com/servicios/tarifas" },
};

const categorias = [
  { t: "Doméstico", d: "Viviendas unifamiliares y multifamiliares con consumo residencial.", ejemplo: "Consumo de 0 a 20 m³ mensuales." },
  { t: "Comercial", d: "Establecimientos comerciales, restaurantes, tiendas y oficinas.", ejemplo: "Tarifa diferenciada por consumo." },
  { t: "Industrial", d: "Plantas y procesos industriales que requieren abastecimiento de agua.", ejemplo: "Tarifa por consumo medido." },
  { t: "Estatal", d: "Instituciones públicas y organismos del Estado.", ejemplo: "Tarifa establecida por SUNASS." },
];

export default function TarifasPage() {
  return (
    <PageShell
      title="Estructura Tarifaria"
      subtitle="Conoce las categorías del servicio de agua potable y alcantarillado de EPS EMAQ S.A."
      breadcrumb="Servicios / Estructura Tarifaria"
    >
      <p className="text-[#475569] leading-relaxed mb-6">
        La estructura tarifaria de EPS EMAQ S.A. es aprobada por la SUNASS conforme a la normativa de saneamiento vigente.
        Las tarifas se establecen según la categoría del usuario y su nivel de consumo.
      </p>
      <div className="grid sm:grid-cols-2 gap-4">
        {categorias.map((c) => (
          <div key={c.t} className="rounded-xl border border-[#e2e8f0] p-5 bg-[#f8fafc]">
            <h3 className="font-semibold text-[#0057a8] mb-1">{c.t}</h3>
            <p className="text-sm text-[#64748b] leading-relaxed">{c.d}</p>
            <p className="text-xs text-[#94a3b8] mt-2">{c.ejemplo}</p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
