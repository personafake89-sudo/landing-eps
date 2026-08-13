import Image from "next/image";

const BASE = 'https://epsemaq.com.pe';

export default function QuienesSomos() {
  return (
    <section className="py-[5rem] bg-white">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">

          {/* Imagen izquierda */}
          <div className="relative">
            <div
              className="relative overflow-hidden rounded-2xl shadow-xl"
              style={{ aspectRatio: '4/3' }}
            >
              <Image
                src="/quienes-somos.jpg"
                alt="Quiénes Somos"
                fill
                sizes="(min-width: 1024px) 640px, 100vw"
                className="object-cover"
                style={{ objectPosition: '55% 2%' }}
              />
            </div>
            {/* Patrón decorativo */}
            <div
              aria-hidden="true"
              className="absolute -bottom-4 -right-4 w-32 h-32 rounded-2xl -z-10"
              style={{
                backgroundImage: 'radial-gradient(circle, #0095eb33 1.5px, transparent 1.5px)',
                backgroundSize: '12px 12px',
              }}
            />
          </div>

          {/* Texto derecha */}
          <div className="flex flex-col gap-5">
            <div>
              <h2
                className="text-[2rem] font-extrabold text-[#1e293b] mb-3"
                style={{ fontFamily: 'Poppins, Inter, sans-serif' }}
              >
                Quiénes Somos
                <span
                  className="block mt-2 w-[60px] h-1 rounded-full"
                  style={{ background: 'linear-gradient(135deg, #0095eb, #1e73be)' }}
                />
              </h2>
            </div>
            <p className="text-[#4a4a5a] leading-relaxed text-[0.95rem]">
              La <strong>EPS EMAQ S.A.</strong> es la Entidad Prestadora de Servicios de Saneamiento de
              la provincia de La Convención, comprometida con brindar agua potable de calidad y un sistema
              de alcantarillado eficiente para la ciudad de Quillabamba y sus alrededores.
            </p>
            <p className="text-[#4a4a5a] leading-relaxed text-[0.95rem]">
              Con más de 50 años de trayectoria, trabajamos cada día para garantizar el acceso al agua segura,
              implementando tecnología moderna y prácticas sostenibles que protejan nuestros recursos hídricos
              para las futuras generaciones.
            </p>
            <a
              href={`${BASE}/funcionarios`}
              target="_blank"
              rel="noopener noreferrer"
              className="self-start inline-flex items-center gap-2 px-7 py-3 rounded-full text-white font-semibold text-sm shadow-md hover:-translate-y-0.5 hover:brightness-110 active:scale-95 transition-all"
              style={{ background: 'linear-gradient(135deg, #0095eb, #1e73be)' }}
            >
              Nuestros funcionarios
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
