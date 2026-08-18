import Image from "next/image";
import Link from "next/link";

export default function AgentesSection() {
  return (
    <section className="py-[5rem] px-4 bg-white">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center gap-12">

        {/* Image */}
        <div className="flex-1 flex justify-center">
          <Image
            src="/agentes-pago.png"
            alt="Agentes Autorizados de Pago"
            width={1024}
            height={1536}
            className="w-full max-w-[440px] object-contain drop-shadow-xl"
          />
        </div>

        {/* Text */}
        <div className="flex-1 flex flex-col gap-5">
          <span className="text-[#0095eb] font-bold text-xs uppercase tracking-[.06em]">
            Pago presencial
          </span>
          <h2
            className="text-[2rem] font-bold text-[#1e293b] leading-[1.15]"
            style={{ fontFamily: 'Poppins, Inter, sans-serif' }}
          >
            Agentes Autorizados de Pago
          </h2>
          <div className="w-[60px] h-1 rounded-full" style={{ background: 'linear-gradient(135deg, #0095eb, #1e73be)' }} />
          <p className="text-[#64748b] text-[0.95rem] leading-relaxed max-w-[480px]">
            Realiza el pago de tu recibo de agua en cualquiera de nuestros agentes autorizados ubicados en Quillabamba y La Convención. Rápido, seguro y sin necesidad de internet.
          </p>
          <Link
            href="/servicios/agentes-pago"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-white font-semibold text-sm shadow-md hover:-translate-y-0.5 hover:brightness-110 transition-all self-start"
            style={{ background: 'linear-gradient(135deg, #0095eb, #1e73be)' }}
          >
            Ver agentes
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
}
