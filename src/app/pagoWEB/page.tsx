'use client';

import { useState } from 'react';
import Link from 'next/link';

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

type Paso = 'buscar' | 'resultado' | 'pagar' | 'confirmado';

function fmt(n: number) { return `S/ ${n.toFixed(2)}`; }
function maskCard(v: string) { return v.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19); }
function fmtPeriodo(p: string) {
  const [anio, mes] = p.split('-');
  const m = ['','Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
  return `${m[parseInt(mes)] || mes} ${anio}`;
}

export default function PagoWEB() {
  const [paso, setPaso]       = useState<Paso>('buscar');
  const [codigo, setCodigo]   = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const [cliente, setCliente] = useState<ClienteData | null>(null);
  const [acepta, setAcepta]   = useState(false);

  const [num, setNum]         = useState('');
  const [titular, setTitular] = useState('');
  const [venc, setVenc]       = useState('');
  const [cvv, setCvv]         = useState('');
  const [pagando, setPagando] = useState(false);
  const [cardErr, setCardErr] = useState('');
  const [result, setResult]   = useState<{ nroOperacion: string; tarjeta: string; fecha: string } | null>(null);

  async function consultar(e: React.FormEvent) {
    e.preventDefault();
    if (!codigo.trim()) return;
    setLoading(true); setError('');
    try {
      const res = await fetch(`/api/consultar?codigo=${encodeURIComponent(codigo.trim())}`);
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Error al consultar'); setLoading(false); return; }
      setCliente(data); setPaso('resultado');
    } catch { setError('Error de conexión. Intente nuevamente.'); }
    setLoading(false);
  }

  async function pagar(e: React.FormEvent) {
    e.preventDefault(); setCardErr('');
    const n = num.replace(/\s/g, '');
    if (n.length < 16)      { setCardErr('Número de tarjeta inválido'); return; }
    if (!titular.trim())    { setCardErr('Ingrese el nombre del titular'); return; }
    if (venc.length < 5)    { setCardErr('Fecha de vencimiento inválida'); return; }
    if (cvv.length < 3)     { setCardErr('CVV inválido'); return; }
    setPagando(true);
    try {
      const res = await fetch('/api/pagar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ codcliente: cliente!.codcliente, nombre: cliente!.nombre, monto: cliente!.deuda_total, numTarjeta: num, titular, vencimiento: venc, cvv }),
      });
      const data = await res.json();
      if (!data.exitoso) { setCardErr(data.motivo || 'Pago rechazado.'); setPagando(false); return; }
      setResult({ nroOperacion: data.nroOperacion, tarjeta: data.tarjeta, fecha: data.fecha });
      setPaso('confirmado');
    } catch { setCardErr('Error de conexión.'); }
    setPagando(false);
  }

  function reset() {
    setCodigo(''); setCliente(null); setError(''); setAcepta(false);
    setNum(''); setTitular(''); setVenc(''); setCvv(''); setCardErr(''); setResult(null);
    setPaso('buscar');
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#f0f4f8' }}>

      {/* Top bar */}
      <div className="w-full flex items-center justify-between px-6 py-3 bg-white shadow-sm">
        <Link href="/" className="flex items-center gap-2 text-[#0057a8] font-bold text-sm hover:underline">
          <svg width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Volver al inicio
        </Link>
        <span className="text-xs text-gray-400">E.P.S. EMAQ S.A.</span>
      </div>

      {/* Main card */}
      <div className="flex-1 flex items-center justify-center p-4 py-10">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">

          {/* Columna izquierda — imagen */}
          <div className="md:w-1/2 flex items-center justify-center bg-[#eaf6ff] p-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/tarjetas.jpg"
              alt="Pago con tarjeta EPS EMAQ"
              className="w-full max-w-[340px] rounded-xl object-cover shadow-md"
            />
          </div>

          {/* Columna derecha — formulario */}
          <div className="md:w-1/2 flex flex-col justify-center p-8 gap-2">
            <h2 className="text-2xl font-extrabold text-[#0057a8]">E.P.S. EMAQ S.A.</h2>
            <p className="text-gray-500 mb-4">¡Bienvenido, pague su recibo!</p>

            {/* PASO 1 — Buscar */}
            {paso === 'buscar' && (
              <form onSubmit={consultar} className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Código de Suministro</label>
                  <input
                    type="number"
                    value={codigo}
                    onChange={e => setCodigo(e.target.value)}
                    placeholder="Ingresar Código de suministro"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-[#0057a8] focus:outline-none focus:ring-1 focus:ring-[#0057a8]"
                    style={{ background: '#EAFAF1' }}
                  />
                </div>

                <label className="flex items-start gap-2 cursor-pointer">
                  <input type="checkbox" required className="mt-0.5 accent-[#0057a8]" />
                  <span className="text-xs text-gray-600">
                    Acepto los <a href="#" className="text-[#0057a8] hover:underline">Términos y Condiciones</a>
                  </span>
                </label>

                {error && (
                  <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#0057a8] hover:bg-[#004a92] disabled:bg-gray-300 text-white font-bold py-3 rounded-lg transition-all"
                >
                  {loading ? 'Consultando...' : 'CONSULTAR'}
                </button>

                {/* Visa promo row */}
                <div className="flex items-center gap-4 mt-2 pt-3 border-t border-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/credit-card.gif" alt="Tarjeta" className="h-12 object-contain" />
                  <p className="text-sm font-semibold text-gray-600 italic">
                    Paga con VISA, en nuestros canales digitales
                  </p>
                </div>
              </form>
            )}

            {/* PASO 2 — Resultado */}
            {paso === 'resultado' && cliente && (
              <div className="flex flex-col gap-4">
                <div className={`rounded-xl px-5 py-4 text-white ${cliente.tiene_deuda ? 'bg-red-500' : 'bg-[#00a651]'}`}>
                  <p className="text-white/80 text-xs uppercase tracking-wider">Saldo actual</p>
                  <p className="text-3xl font-extrabold mt-1">
                    {cliente.tiene_deuda ? fmt(cliente.deuda_total) : 'Al día ✓'}
                  </p>
                  {cliente.tiene_deuda && (
                    <p className="text-red-100 text-sm mt-1">{cliente.meses_pendientes} mes(es) pendiente(s) · ⚠ Afecto al corte</p>
                  )}
                </div>

                <div className="space-y-1.5 text-sm">
                  {[
                    ['Titular', cliente.nombre],
                    ['Código', cliente.codcliente],
                    cliente.dni && ['DNI', cliente.dni],
                    cliente.direccion && ['Dirección', cliente.direccion],
                  ].filter(Boolean).map(([k, v]) => (
                    <div key={k as string} className="flex justify-between">
                      <span className="text-gray-500">{k}:</span>
                      <span className="font-medium text-gray-800 text-right max-w-[60%]">{v as string}</span>
                    </div>
                  ))}
                </div>

                {cliente.tiene_deuda && cliente.detalle_meses.length > 0 && (
                  <div className="bg-red-50 rounded-lg p-3">
                    <p className="text-xs font-semibold text-red-700 mb-1.5">Meses pendientes:</p>
                    <div className="flex flex-wrap gap-1">
                      {cliente.detalle_meses.map(m => (
                        <span key={m} className="bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full">{fmtPeriodo(m)}</span>
                      ))}
                    </div>
                  </div>
                )}

                {!cliente.tiene_deuda && cliente.ultimo_recibo && (
                  <div className="bg-green-50 rounded-lg p-3 text-sm text-green-700">
                    Último recibo: {fmtPeriodo(cliente.ultimo_recibo.periodo)} — {fmt(cliente.ultimo_recibo.monto)} (Pagado ✓)
                  </div>
                )}

                {cliente.tiene_deuda && (
                  <label className="flex items-start gap-2 bg-gray-50 rounded-lg p-3 cursor-pointer">
                    <input type="checkbox" checked={acepta} onChange={e => { setAcepta(e.target.checked); setError(''); }} className="mt-0.5 accent-[#0057a8]" />
                    <span className="text-xs text-gray-600">
                      Acepto los <a href="#" className="text-[#0057a8] hover:underline">Términos y Condiciones</a>
                    </span>
                  </label>
                )}

                {error && <p className="text-red-600 text-xs">{error}</p>}

                <div className="flex gap-3">
                  <button onClick={reset} className="flex-1 border-2 border-gray-200 hover:border-gray-300 text-gray-600 font-semibold py-3 rounded-xl text-sm transition-all">
                    Nueva consulta
                  </button>
                  {cliente.tiene_deuda && (
                    <button
                      onClick={() => { if (!acepta) { setError('Debe aceptar los términos.'); return; } setError(''); setPaso('pagar'); }}
                      className="flex-1 bg-[#00a651] hover:bg-[#008f45] text-white font-bold py-3 rounded-xl text-sm shadow-md transition-all"
                    >
                      PAGAR AHORA
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* PASO 3 — Tarjeta */}
            {paso === 'pagar' && cliente && (
              <form onSubmit={pagar} className="flex flex-col gap-4">
                <div className="bg-[#0057a8] rounded-xl px-5 py-3 text-white flex justify-between items-center">
                  <div>
                    <p className="text-white/70 text-xs">Pagando deuda de</p>
                    <p className="font-bold text-sm">{cliente.nombre}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/70 text-xs">Total</p>
                    <p className="font-bold text-xl">{fmt(cliente.deuda_total)}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Número de Tarjeta</label>
                  <input value={num} onChange={e => setNum(maskCard(e.target.value))} placeholder="0000 0000 0000 0000" maxLength={19} required
                    className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-sm focus:border-[#0057a8] focus:outline-none font-mono tracking-widest" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Nombre del Titular</label>
                  <input value={titular} onChange={e => setTitular(e.target.value.toUpperCase())} placeholder="COMO APARECE EN LA TARJETA" required
                    className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-sm focus:border-[#0057a8] focus:outline-none uppercase" />
                </div>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Vencimiento</label>
                    <input value={venc} onChange={e => { let v = e.target.value.replace(/\D/g,''); if (v.length>=2) v=v.slice(0,2)+'/'+v.slice(2,4); setVenc(v); }} placeholder="MM/AA" maxLength={5} required
                      className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-sm focus:border-[#0057a8] focus:outline-none" />
                  </div>
                  <div className="w-24">
                    <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">CVV</label>
                    <input value={cvv} onChange={e => setCvv(e.target.value.replace(/\D/g,'').slice(0,4))} placeholder="•••" maxLength={4} type="password" required
                      className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-sm focus:border-[#0057a8] focus:outline-none" />
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 flex-wrap py-1">
                  <img src="https://static-content.vnforapps.com/v2/img/pci.png" alt="PCI" className="h-5 object-contain" />
                  <img src="https://static-content.vnforapps.com/v2/img/bottom/visa.png" alt="Visa" className="h-5 object-contain" />
                  <img src="https://static-content.vnforapps.com/v2/img/bottom/mc.png" alt="MC" className="h-5 object-contain" />
                </div>

                {cardErr && <p className="text-red-600 text-xs bg-red-50 border border-red-200 rounded-lg px-3 py-2">{cardErr}</p>}

                <div className="flex gap-3">
                  <button type="button" onClick={() => setPaso('resultado')} className="flex-1 border-2 border-gray-200 text-gray-600 font-semibold py-3 rounded-xl text-sm transition-all">
                    Atrás
                  </button>
                  <button type="submit" disabled={pagando} className="flex-1 bg-[#00a651] hover:bg-[#008f45] disabled:bg-gray-300 text-white font-bold py-3 rounded-xl text-sm shadow-md transition-all">
                    {pagando ? 'Procesando...' : `PAGAR ${fmt(cliente.deuda_total)}`}
                  </button>
                </div>
              </form>
            )}

            {/* PASO 4 — Confirmado */}
            {paso === 'confirmado' && cliente && result && (
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-9 h-9 text-[#00a651]" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">¡Pago Exitoso!</h3>
                  <p className="text-gray-500 text-sm">Su pago fue procesado correctamente.</p>
                </div>
                <div className="w-full bg-gray-50 rounded-xl p-4 text-left space-y-2 text-sm">
                  {[
                    ['Cliente', cliente.nombre],
                    ['Código', cliente.codcliente],
                    ['Tarjeta', result.tarjeta],
                    ['Monto pagado', fmt(cliente.deuda_total)],
                    ['Fecha', result.fecha],
                    ['N° Operación', result.nroOperacion],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between">
                      <span className="text-gray-500">{k}:</span>
                      <span className="font-medium text-gray-800">{v}</span>
                    </div>
                  ))}
                </div>
                {cliente.email && (
                  <p className="text-xs text-gray-500">Comprobante enviado a <span className="font-medium">{cliente.email}</span></p>
                )}
                <button onClick={reset} className="w-full bg-[#0057a8] hover:bg-[#004a92] text-white font-bold py-3 rounded-xl transition-all">
                  Nueva consulta
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <footer className="text-center text-xs text-gray-400 pb-6">
        © {new Date().getFullYear()} E.P.S. EMAQ S.A. — Todos los derechos reservados
      </footer>
    </div>
  );
}
