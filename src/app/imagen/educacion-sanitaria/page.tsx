import type { Metadata } from "next";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Educación Sanitaria | EPS EMAQ S.A.",
  description: "Plan de Educación Sanitaria de EPS EMAQ S.A. para promover el uso responsable del agua en La Convención.",
  alternates: { canonical: "https://epsemaq.epsagua.com/imagen/educacion-sanitaria" },
};

export default function EducacionSanitariaPage() {
  return (
    <PageShell
      title="Plan de Educación Sanitaria"
      subtitle="Programa permanente de EPS EMAQ S.A. para promover el uso responsable del agua."
      breadcrumb="Imagen Institucional / Educación Sanitaria"
    >
          <p className="text-[#475569] leading-relaxed mb-5">Plan de Educación Sanitaria Programa permanente de EPS EMAQ S.</p>
          <p className="text-[#475569] leading-relaxed mb-5">para promover el uso responsable del agua, la higiene sanitaria y el cuidado del medio ambiente en la provincia de La Convención.</p>
          <p className="text-[#475569] leading-relaxed mb-5">Sobre el Plan En cumplimiento del Reglamento de Calidad de la Prestación de los Servicios de Saneamiento aprobado por SUNASS, EPS EMAQ S.</p>
          <p className="text-[#475569] leading-relaxed mb-5">diseña y ejecuta anualmente su Plan de Educación Sanitaria, dirigido a usuarios actuales y potenciales del servicio.</p>
          <p className="text-[#475569] leading-relaxed mb-5">El plan reúne charlas, talleres, ferias informativas y material educativo orientado a generar una cultura del agua que permita asegurar la sostenibilidad del recurso, la calidad del servicio y el bienestar de las familias de Quillabamba.</p>
          <p className="text-[#475569] leading-relaxed mb-5">Objetivos del programa Uso racional del agua Promover hábitos de consumo responsable y prevenir el desperdicio en hogares, comercios e instituciones.</p>
          <p className="text-[#475569] leading-relaxed mb-5">Higiene y salud Difundir buenas prácticas de higiene relacionadas al agua y al saneamiento para prevenir enfermedades.</p>
          <p className="text-[#475569] leading-relaxed mb-5">Cuidado del ambiente Sensibilizar sobre la protección de fuentes de agua, conservación de la naturaleza y reforestación.</p>
          <p className="text-[#475569] leading-relaxed mb-5">Cuidado de la red Enseñar el correcto uso de conexiones, medidores y la importancia de no obstruir el alcantarillado.</p>
          <p className="text-[#475569] leading-relaxed mb-5">Cultura de pago Fomentar el pago oportuno como aporte directo a la mejora continua del servicio en la provincia.</p>
          <p className="text-[#475569] leading-relaxed mb-5">Derechos del usuario Informar sobre derechos, mecanismos de reclamo y canales de atención disponibles.</p>
          <p className="text-[#475569] leading-relaxed mb-5">Actividades que realizamos 🎓 Charlas en colegios Inicial, primaria y secundaria 🏘 Intervencion Comunitaria Sensibilización y ferias Informativas 📻 Spots y videos educativos Mensajes educativos 📰 Material impreso Folletos, afiches, manuales 💧 Visitas a la PTAP Conocé cómo se trata el agua Aprende Jugando Sobre el cuidado y uso responsable del agua 📄 Plan vigente y memorias Documentos oficiales del Plan de Educación Sanitaria, disponibles para consulta pública.</p>
          <p className="text-[#475569] leading-relaxed mb-5">Ver documentos del programa → ¿Querés una charla en tu colegio o sector? Si representás una institución educativa, junta vecinal o comunidad y querés solicitar una charla del programa, escribinos por nuestros canales de contacto y coordinamos una fecha.</p>
    </PageShell>
  );
}
