"use client";
import { useState } from "react";

export default function PaymentSection() {
  const [agreed, setAgreed] = useState(false);
  const [suministro, setSuministro] = useState("");

  return (
    <section id="pagar" className="py-16 px-4 bg-gradient-to-br from-[#e8f4fd] to-[#f0f9ff]">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10 items-start">
        <div className="flex-1">
          <span className="text-[#0057a8] font-semibold text-sm uppercase tracking-wider">Pago en Línea</span>
          <h2 className="text-3xl font-bold text-gray-800 mt-2 mb-4">Pague su recibo ahora</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Nuestro sistema de pago en línea es 100% seguro y está certificado para proteger sus datos bancarios. Aceptamos las principales tarjetas de crédito y débito.
          </p>

          <div className="space-y-4 mb-6">
            {[
              "Sin comisiones adicionales",
              "Comprobante enviado por correo",
              "Disponible las 24 horas del día",
              "Certificado de seguridad SSL",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="bg-[#00a651] rounded-full p-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700 text-sm">{item}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-4 items-center">
            <div className="bg-white rounded-lg px-4 py-2 shadow-sm border border-gray-100 flex items-center gap-2">
              <div className="w-8 h-5 bg-[#1a1f71] rounded-sm flex items-center justify-center">
                <span className="text-white text-[8px] font-bold">VISA</span>
              </div>
              <span className="text-xs text-gray-500">Visa</span>
            </div>
            <div className="bg-white rounded-lg px-4 py-2 shadow-sm border border-gray-100 flex items-center gap-2">
              <div className="flex">
                <div className="w-4 h-4 bg-red-500 rounded-full opacity-90" />
                <div className="w-4 h-4 bg-yellow-400 rounded-full -ml-2 opacity-90" />
              </div>
              <span className="text-xs text-gray-500">Mastercard</span>
            </div>
            <div className="bg-white rounded-lg px-4 py-2 shadow-sm border border-gray-100 flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-xs text-gray-500">SSL Seguro</span>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-white rounded-2xl shadow-xl p-8 border border-gray-100 max-w-md w-full">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[#e8f4fd] rounded-full p-3">
              <svg className="w-7 h-7 text-[#0057a8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Consultar y Pagar Recibo</h3>
              <p className="text-xs text-gray-500">E.P.S. EMAQ S.A. — Canales Digitales</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">N° de Suministro *</label>
              <input
                type="text"
                value={suministro}
                onChange={(e) => setSuministro(e.target.value)}
                placeholder="Ingrese su número de suministro"
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-sm focus:border-[#0057a8] focus:outline-none transition-colors"
              />
              <p className="text-xs text-gray-400 mt-1">Encuéntrelo en su recibo físico</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">DNI del Titular</label>
              <input
                type="text"
                placeholder="Ingrese su DNI"
                maxLength={8}
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-sm focus:border-[#0057a8] focus:outline-none transition-colors"
              />
            </div>

            <div className="flex items-start gap-3 bg-gray-50 rounded-lg p-3">
              <input
                type="checkbox"
                id="terminos"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-[#0057a8] cursor-pointer"
              />
              <label htmlFor="terminos" className="text-sm text-gray-600 cursor-pointer">
                He leído y acepto los{" "}
                <a href="#" className="text-[#0057a8] font-medium hover:underline">
                  Términos y Condiciones
                </a>{" "}
                del servicio de pago en línea.
              </label>
            </div>

            <button
              disabled={!agreed || !suministro}
              className={`w-full font-bold py-4 rounded-xl text-white transition-all text-base ${
                agreed && suministro
                  ? "bg-[#0057a8] hover:bg-[#004a92] shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              CONSULTAR RECIBO
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
              </svg>
              Conexión segura — Sus datos están protegidos
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
