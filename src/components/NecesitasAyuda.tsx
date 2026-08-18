import Link from "next/link";

export default function NecesitasAyuda() {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/slide-03.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#003d7a]/92 to-[#0057a8]/80" />

      <div className="relative z-10 max-w-3xl mx-auto text-center text-white">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
          ¿Necesitas ayuda con tu servicio?
        </h2>
        <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
          Estamos aquí para atenderte. Consulta el estado de tu servicio, reporta una
          incidencia o comunícate con nuestro equipo de atención al ciudadano.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contacto"
            className="inline-flex items-center justify-center gap-2 bg-[#00a651] hover:bg-[#008f46] text-white font-semibold px-7 py-3.5 rounded-full shadow-lg hover:-translate-y-0.5 transition-all"
          >
            <svg width={19} height={19} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
            </svg>
            Contáctanos
          </Link>
          <Link
            href="/servicios/cortes"
            className="inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 ring-1 ring-white/40 text-white font-semibold px-7 py-3.5 rounded-full backdrop-blur-sm transition-all"
          >
            Ver cortes de servicio
            <svg width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
