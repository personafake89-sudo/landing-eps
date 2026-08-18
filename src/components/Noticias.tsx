import Image from "next/image";
import Link from "next/link";

type Noticia = {
  img: string;
  categoria: string;
  fecha: string;
  titulo: string;
  resumen: string;
};

const noticias: Noticia[] = [
  {
    img: '/images/slide-02.jpg',
    categoria: 'General',
    fecha: '15 May 2026',
    titulo: 'Campaña de sensibilización sobre uso responsable del agua',
    resumen:
      'EPS EMAQ realizó jornadas educativas en colegios de Quillabamba para promover el consumo responsable del agua potable.',
  },
  {
    img: '/images/slide-04.jpg',
    categoria: 'Comunicado',
    fecha: '08 May 2026',
    titulo: 'EMAQ inicia mejoramiento de red de agua en sector Santa Ana',
    resumen:
      'Se ejecutan trabajos de renovación de tuberías para garantizar un servicio continuo y de calidad en el sector Santa Ana.',
  },
  {
    img: '/images/slide-06.jpg',
    categoria: 'Aviso',
    fecha: '02 May 2026',
    titulo: 'Interrupción programada del servicio por reparaciones en Cacaopampa',
    resumen:
      'Informamos a los usuarios sobre la suspensión temporal del servicio de agua potable por trabajos de reparación en Cacaopampa.',
  },
];

const badgeColor: Record<string, string> = {
  General: 'bg-[#0057a8]',
  Comunicado: 'bg-[#00a651]',
  Aviso: 'bg-[#f59e0b]',
};

export default function Noticias() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <span className="text-[#00a651] font-semibold text-sm uppercase tracking-wider">Mantente informado</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mt-1">Noticias</h2>
          </div>
          <Link
            href="/imagen/noticias"
            className="inline-flex items-center gap-2 text-[#0057a8] font-semibold hover:gap-3 transition-all"
          >
            Ver todas
            <svg width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-7">
          {noticias.map((n) => (
            <Link
              key={n.titulo}
              href="/imagen/noticias"
              className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={n.img}
                  alt={n.titulo}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className={`absolute top-3 left-3 text-white text-xs font-semibold px-3 py-1 rounded-full ${badgeColor[n.categoria] ?? 'bg-[#0057a8]'}`}>
                  {n.categoria}
                </span>
              </div>
              <div className="flex flex-col flex-1 p-5">
                <span className="text-xs text-gray-400 mb-2">{n.fecha}</span>
                <h3 className="font-bold text-gray-800 leading-snug mb-2 group-hover:text-[#0057a8] transition-colors">
                  {n.titulo}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed flex-1">{n.resumen}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[#0057a8] font-semibold text-sm">
                  Leer más
                  <svg width={15} height={15} fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
