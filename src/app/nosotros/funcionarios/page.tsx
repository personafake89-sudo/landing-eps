import type { Metadata } from "next";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Funcionarios | EPS EMAQ S.A.",
  description: "Directorio de funcionarios de EPS EMAQ S.A. de Quillabamba, La Convención, Cusco.",
  alternates: { canonical: "https://epsemaq.epsagua.com/nosotros/funcionarios" },
};

const areas = [
  { t: "Gerencia General", d: "Dirección general y representación de la empresa." },
  { t: "Administración y Finanzas", d: "Gestión administrativa, presupuestal y contable." },
  { t: "Operación y Mantenimiento", d: "Operación de los sistemas de agua potable y alcantarillado." },
  { t: "Ingeniería y Desarrollo", d: "Proyectos de inversión y expansión de infraestructura." },
  { t: "Comercialización", d: "Atención al usuario, facturación y cobranza." },
  { t: "Control de Calidad", d: "Monitoreo de la calidad del agua potable." },
];

export default function FuncionariosPage() {
  return (
    <PageShell
      title="Funcionarios"
      subtitle="Directorio de las áreas y funciones de EPS EMAQ S.A."
      breadcrumb="La Empresa / Organización / Funcionarios"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        {areas.map((a) => (
          <div key={a.t} className="rounded-xl border border-[#e2e8f0] p-5 bg-[#f8fafc]">
            <h3 className="font-semibold text-[#0057a8] mb-1">{a.t}</h3>
            <p className="text-sm text-[#64748b] leading-relaxed">{a.d}</p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
