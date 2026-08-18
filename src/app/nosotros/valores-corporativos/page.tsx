import type { Metadata } from "next";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Valores Corporativos | EPS EMAQ S.A.",
  description: "Valores empresariales de EPS EMAQ S.A.: honestidad, responsabilidad, respeto, trabajo en equipo, liderazgo y compromiso.",
  alternates: { canonical: "https://epsemaq.epsagua.com/nosotros/valores-corporativos" },
};

export default function ValoresCorporativosPage() {
  return (
    <PageShell title="Valores Corporativos" subtitle="Los valores que guían el trabajo de EPS EMAQ S.A." breadcrumb="La Empresa / Nosotros / Valores Corporativos">
          <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex items-start gap-4 rounded-xl border border-[#e2e8f0] p-5 bg-[#f8fafc]">
            <span className="mt-0.5 shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#0057a8] text-white text-sm font-bold">✓</span>
            <div>
              <h3 className="font-semibold text-[#1e293b]">Honestidad</h3>
              <p className="text-[#64748b] text-sm leading-relaxed mt-1">Actuamos con transparencia e integridad en cada uno de nuestros procesos.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 rounded-xl border border-[#e2e8f0] p-5 bg-[#f8fafc]">
            <span className="mt-0.5 shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#0057a8] text-white text-sm font-bold">✓</span>
            <div>
              <h3 className="font-semibold text-[#1e293b]">Responsabilidad</h3>
              <p className="text-[#64748b] text-sm leading-relaxed mt-1">Cumplimos con nuestros compromisos con los usuarios y la comunidad.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 rounded-xl border border-[#e2e8f0] p-5 bg-[#f8fafc]">
            <span className="mt-0.5 shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#0057a8] text-white text-sm font-bold">✓</span>
            <div>
              <h3 className="font-semibold text-[#1e293b]">Respeto</h3>
              <p className="text-[#64748b] text-sm leading-relaxed mt-1">Tratamos a todas las personas con dignidad y consideración.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 rounded-xl border border-[#e2e8f0] p-5 bg-[#f8fafc]">
            <span className="mt-0.5 shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#0057a8] text-white text-sm font-bold">✓</span>
            <div>
              <h3 className="font-semibold text-[#1e293b]">Trabajo en Equipo</h3>
              <p className="text-[#64748b] text-sm leading-relaxed mt-1">Trabajamos de manera colaborativa para lograr los objetivos institucionales.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 rounded-xl border border-[#e2e8f0] p-5 bg-[#f8fafc]">
            <span className="mt-0.5 shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#0057a8] text-white text-sm font-bold">✓</span>
            <div>
              <h3 className="font-semibold text-[#1e293b]">Liderazgo</h3>
              <p className="text-[#64748b] text-sm leading-relaxed mt-1">Impulsamos iniciativas que mejoran el servicio de saneamiento.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 rounded-xl border border-[#e2e8f0] p-5 bg-[#f8fafc]">
            <span className="mt-0.5 shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#0057a8] text-white text-sm font-bold">✓</span>
            <div>
              <h3 className="font-semibold text-[#1e293b]">Identificación y compromiso empresarial</h3>
              <p className="text-[#64748b] text-sm leading-relaxed mt-1">Nos sentimos parte de EPS EMAQ y de su misión de servicio.</p>
            </div>
          </div>
          </div>
    </PageShell>
  );
}
