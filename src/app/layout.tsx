import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "E.P.S. EMAQ S.A. — Pago de Recibos en Línea",
  description: "Consulte su deuda y pague su recibo de agua de forma rápida y segura desde cualquier dispositivo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
