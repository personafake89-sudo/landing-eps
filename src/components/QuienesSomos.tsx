const BASE = 'https://epsemaq.com.pe';

export default function QuienesSomos() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Imagen */}
        <div className="relative">
          <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-[#0057a8]/15 to-[#00a651]/15 -z-10" />
          <img
            src="/images/slide-02.jpg"
            alt="Equipo de EPS EMAQ S.A."
            className="w-full h-72 sm:h-80 object-cover rounded-3xl shadow-lg"
          />
        </div>

        {/* Texto */}
        <div>
          <span className="text-[#00a651] font-semibold text-sm uppercase tracking-wider">Nuestra empresa</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mt-2 mb-4">Quiénes Somos</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Con más de 50 años de trayectoria, en <strong>EPS EMAQ S.A.</strong> trabajamos
            cada día para garantizar el acceso al agua segura en Quillabamba y la provincia
            de La Convención, implementando tecnología moderna y prácticas sostenibles que
            protejan nuestros recursos hídricos para las futuras generaciones.
          </p>
          <a
            href={`${BASE}/funcionarios`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#0057a8] hover:bg-[#00468a] text-white font-semibold px-6 py-3 rounded-full shadow transition-colors"
          >
            Nuestros funcionarios
            <svg width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
