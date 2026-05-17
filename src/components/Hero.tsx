export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-[#0069c8] via-[#0090e0] to-[#00b4f0] text-white py-20 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1 text-center md:text-left">
          <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
            Servicios en Línea
          </span>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            ¡Bienvenido! Pague su <span className="text-[#7dd3fc]">recibo de agua</span> desde casa
          </h1>
          <p className="text-blue-100 text-lg mb-8 max-w-lg">
            Consulte su deuda, descargue su recibo y realice su pago de forma rápida, segura y sin filas desde cualquier dispositivo.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <a
              href="#pagar"
              className="bg-[#00a651] hover:bg-[#008f45] text-white font-bold px-8 py-4 rounded-full text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Consultar y Pagar
            </a>
            <a
              href="#como-funciona"
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-full text-lg border border-white/30 transition-all"
            >
              Ver más
            </a>
          </div>
          <div className="mt-8 flex items-center gap-2 justify-center md:justify-start text-blue-200 text-sm">
            <svg className="w-4 h-4 text-[#00a651]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            Pagos seguros con VISA y Mastercard
          </div>
        </div>

        <div className="flex-1 flex justify-center">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-gray-800">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#e8f4fd] rounded-full p-3">
                <svg className="w-8 h-8 text-[#0057a8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-[#0057a8]">Consulta Rápida</p>
                <p className="text-xs text-gray-500">Ingresa tu número de suministro</p>
              </div>
            </div>
            <label className="block text-sm font-medium text-gray-700 mb-1">N° de Suministro</label>
            <input
              type="text"
              placeholder="Ej: 123456"
              className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-sm focus:border-[#0057a8] focus:outline-none mb-4 transition-colors"
            />
            <a
              href="#pagar"
              className="block w-full bg-[#0057a8] hover:bg-[#004a92] text-white text-center font-bold py-3 rounded-lg transition-colors"
            >
              CONSULTAR
            </a>
            <p className="text-xs text-gray-400 text-center mt-3">
              Encuentra tu N° en la parte superior de tu recibo
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        {[
          { num: "+15,000", label: "Usuarios registrados" },
          { num: "100%", label: "Pagos seguros" },
          { num: "24/7", label: "Disponibilidad" },
          { num: "<1 min", label: "Tiempo de pago" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white/10 rounded-xl py-4 px-3">
            <p className="text-2xl font-bold">{stat.num}</p>
            <p className="text-blue-200 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
