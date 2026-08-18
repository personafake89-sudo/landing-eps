import type { Metadata } from "next";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Información General de la Empresa | EPS EMAQ S.A.",
  description: "Información general de la Empresa Municipal de Agua Potable y Alcantarillado de Quillabamba (EPS EMAQ S.A.).",
  alternates: { canonical: "https://epsemaq.epsagua.com/nosotros/informacion-general" },
};

export default function InformaciónGeneralDeLaEmpresaPage() {
  return (
    <PageShell title="Información General de la Empresa" subtitle="Información general de EPS EMAQ S.A." breadcrumb="La Empresa / Nosotros / Información General">
          <p className="text-[#475569] leading-relaxed mb-5">La Empresa de Agua Potable y Alcantarillado de Quillabamba S.A. (EPS EMAQ S.A.) es una entidad prestadora de servicios de saneamiento ubicada en la ciudad de Quillabamba, provincia de La Convención, departamento de Cusco, Perú.</p>
          <p className="text-[#475569] leading-relaxed mb-5">Supervisada por la SUNASS bajo el Decreto Legislativo N° 1280, brinda servicios de agua potable y alcantarillado a la población del distrito de Santa Ana.</p>
          <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex items-start gap-4 rounded-xl border border-[#e2e8f0] p-5 bg-[#f8fafc]">
            <span className="mt-0.5 shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#0057a8] text-white text-sm font-bold">✓</span>
            <div>
              <h3 className="font-semibold text-[#1e293b]">RUC</h3>
              <p className="text-[#64748b] text-sm leading-relaxed mt-1">20171147787</p>
            </div>
          </div>
          <div className="flex items-start gap-4 rounded-xl border border-[#e2e8f0] p-5 bg-[#f8fafc]">
            <span className="mt-0.5 shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#0057a8] text-white text-sm font-bold">✓</span>
            <div>
              <h3 className="font-semibold text-[#1e293b]">Razón Social</h3>
              <p className="text-[#64748b] text-sm leading-relaxed mt-1">EPS EMAQ S.A.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 rounded-xl border border-[#e2e8f0] p-5 bg-[#f8fafc]">
            <span className="mt-0.5 shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#0057a8] text-white text-sm font-bold">✓</span>
            <div>
              <h3 className="font-semibold text-[#1e293b]">Dirección</h3>
              <p className="text-[#64748b] text-sm leading-relaxed mt-1">Av. Nicanor Larrea N° 337 – Distrito Santa Ana</p>
            </div>
          </div>
          <div className="flex items-start gap-4 rounded-xl border border-[#e2e8f0] p-5 bg-[#f8fafc]">
            <span className="mt-0.5 shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#0057a8] text-white text-sm font-bold">✓</span>
            <div>
              <h3 className="font-semibold text-[#1e293b]">Teléfono</h3>
              <p className="text-[#64748b] text-sm leading-relaxed mt-1">973 698 606</p>
            </div>
          </div>
          <div className="flex items-start gap-4 rounded-xl border border-[#e2e8f0] p-5 bg-[#f8fafc]">
            <span className="mt-0.5 shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#0057a8] text-white text-sm font-bold">✓</span>
            <div>
              <h3 className="font-semibold text-[#1e293b]">Control de Calidad</h3>
              <p className="text-[#64748b] text-sm leading-relaxed mt-1">973 597 576</p>
            </div>
          </div>
          <div className="flex items-start gap-4 rounded-xl border border-[#e2e8f0] p-5 bg-[#f8fafc]">
            <span className="mt-0.5 shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#0057a8] text-white text-sm font-bold">✓</span>
            <div>
              <h3 className="font-semibold text-[#1e293b]">Central de emergencias</h3>
              <p className="text-[#64748b] text-sm leading-relaxed mt-1">973 597 095</p>
            </div>
          </div>
          </div>
    </PageShell>
  );
}
