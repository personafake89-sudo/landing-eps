export default function Hero() {
  return (
    <section className="relative text-white py-24 px-4">
      {/* Viñeta: oscurece los bordes, despeja el centro */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.55) 100%)' }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4"
          style={{ textShadow: '0 2px 12px rgba(0,0,0,0.7)' }}>
          ¡Bienvenido! Pague su <span className="text-[#7dd3fc]">recibo de agua</span> desde casa
        </h1>
        <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto"
          style={{ textShadow: '0 1px 6px rgba(0,0,0,0.6)' }}>
          Consulte su deuda y realice su pago de forma rápida, segura y sin filas desde cualquier dispositivo.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
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

        <div className="mt-10 flex items-center gap-2 justify-center text-blue-200 text-sm"
          style={{ textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
          <svg className="w-4 h-4 text-[#00a651]" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
          </svg>
          Pagos seguros con VISA y Mastercard
        </div>
      </div>

    </section>
  );
}
