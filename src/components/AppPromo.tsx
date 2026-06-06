export default function AppPromo() {
  return (
    <section className="py-[5rem] px-4 bg-white">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-8">
          <span className="text-[#0095eb] font-bold text-xs uppercase tracking-[.06em]">Disponible para Android y Apple</span>
          <h2 className="text-[2rem] font-bold text-[#1e293b] mt-2 mb-3" style={{ fontFamily: 'Poppins, Inter, sans-serif' }}>
            Instala nuestra App
          </h2>
          <div className="w-[60px] h-1 rounded-full mx-auto" style={{ background: 'linear-gradient(135deg, #0095eb, #1e73be)' }} />
          <p className="text-[#64748b] mt-4 text-sm">Accede a tu cuenta, paga tu recibo y recibe alertas desde tu celular.</p>
        </div>
        <div className="flex justify-center">
          <img
            src="/app-promo.png"
            alt="Instala nuestra app - EPS EMAQ S.A. Rápida, fácil y segura"
            className="w-full max-w-2xl rounded-2xl object-contain"
            style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.10), 0 2px 6px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9' }}
          />
        </div>
      </div>
    </section>
  );
}
