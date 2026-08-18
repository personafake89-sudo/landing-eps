import type { Metadata } from "next";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Organigrama | EPS EMAQ S.A.",
  description: "Organigrama estructural de EPS EMAQ S.A., aprobado mediante Resolución de Gerencia General Nº 094-2024-EPS-EMAQ S.A.",
  alternates: { canonical: "https://epsemaq.epsagua.com/nosotros/organigrama" },
};

export default function OrganigramaPage() {
  return (
    <PageShell title="Organigrama" subtitle="Organigrama estructural de EPS EMAQ S.A." breadcrumb="La Empresa / Organización / Organigrama">
          <p className="text-[#475569] leading-relaxed mb-5">El organigrama estructural de EPS EMAQ S.A. refleja la organización de la empresa y ha sido aprobado mediante Resolución de Gerencia General Nº 094-2024-EPS-EMAQ S.A.</p>
          <p className="text-[#475569] leading-relaxed mb-5">La estructura orgánica de la EPS EMAQ S.A. comprende los órganos de dirección, administración y operación necesarios para brindar los servicios de agua potable y alcantarillado en la provincia de La Convención.</p>
          <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex items-start gap-4 rounded-xl border border-[#e2e8f0] p-5 bg-[#f8fafc]">
            <span className="mt-0.5 shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#0057a8] text-white text-sm font-bold">✓</span>
            <div>
              <h3 className="font-semibold text-[#1e293b]">Gerencia General</h3>
              <p className="text-[#64748b] text-sm leading-relaxed mt-1">Máximo órgano ejecutivo de la empresa.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 rounded-xl border border-[#e2e8f0] p-5 bg-[#f8fafc]">
            <span className="mt-0.5 shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#0057a8] text-white text-sm font-bold">✓</span>
            <div>
              <h3 className="font-semibold text-[#1e293b]">Oficina de Administración</h3>
              <p className="text-[#64748b] text-sm leading-relaxed mt-1">Gestión administrativa, financiera y de recursos humanos.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 rounded-xl border border-[#e2e8f0] p-5 bg-[#f8fafc]">
            <span className="mt-0.5 shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#0057a8] text-white text-sm font-bold">✓</span>
            <div>
              <h3 className="font-semibold text-[#1e293b]">Oficina de Operación y Mantenimiento</h3>
              <p className="text-[#64748b] text-sm leading-relaxed mt-1">Operación de los sistemas de agua potable y alcantarillado.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 rounded-xl border border-[#e2e8f0] p-5 bg-[#f8fafc]">
            <span className="mt-0.5 shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#0057a8] text-white text-sm font-bold">✓</span>
            <div>
              <h3 className="font-semibold text-[#1e293b]">Oficina de Ingeniería y Desarrollo</h3>
              <p className="text-[#64748b] text-sm leading-relaxed mt-1">Planeamiento, proyectos y expansión de la infraestructura.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 rounded-xl border border-[#e2e8f0] p-5 bg-[#f8fafc]">
            <span className="mt-0.5 shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#0057a8] text-white text-sm font-bold">✓</span>
            <div>
              <h3 className="font-semibold text-[#1e293b]">Oficina de Comercialización</h3>
              <p className="text-[#64748b] text-sm leading-relaxed mt-1">Atención a usuarios, facturación y cobranza.</p>
            </div>
          </div>
          </div>
    </PageShell>
  );
}
