import type { Metadata } from "next";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Visión y Misión | EPS EMAQ S.A.",
  description:
    "Conoce la misión y visión de la Empresa Municipal de Agua Potable y Alcantarillado de Quillabamba, La Convención, Cusco.",
  alternates: { canonical: "https://epsemaq.epsagua.com/nosotros/vision-mision" },
};

export default function VisionMisionPage() {
  const vision =
    "Ser una empresa prestadora de servicios, con una infraestructura sanitaria que nos permite brindar un servicio de calidad a nuestros ciudadanos.";
  const mision =
    "Proporcionar agua potable y servicios de saneamiento a la población, dentro de un marco de eficiencia y eficacia, orientando a la sostenibilidad y rentabilidad de nuestra empresa.";

  return (
    <PageShell
      title="Visión y Misión"
      subtitle="Conoce la misión y visión de EPS EMAQ S.A."
      breadcrumb="La Empresa / Nosotros / Visión y Misión"
    >
      <div className="grid md:grid-cols-2 gap-8">
        <div className="rounded-2xl border-l-4 border-[#0057a8] bg-[#f0f7ff] p-7">
          <h2 className="text-2xl font-bold text-[#1e293b] mb-3" style={{ fontFamily: "Poppins, Inter, sans-serif" }}>
            Misión
          </h2>
          <p className="text-[#475569] leading-relaxed">{mision}</p>
        </div>
        <div className="rounded-2xl border-l-4 border-[#00a651] bg-[#f2fcf7] p-7">
          <h2 className="text-2xl font-bold text-[#1e293b] mb-3" style={{ fontFamily: "Poppins, Inter, sans-serif" }}>
            Visión
          </h2>
          <p className="text-[#475569] leading-relaxed">{vision}</p>
        </div>
      </div>
    </PageShell>
  );
}