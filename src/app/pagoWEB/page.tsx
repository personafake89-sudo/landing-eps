import type { Metadata } from "next";
import PagoWEBClient from "./PagoWEBClient";

const base = "https://epsemaq.epsagua.com/pagoWEB";

export const metadata: Metadata = {
  title: "Pago de Recibo de Agua en Línea – Quillabamba",
  description:
    "Consulte su deuda y pague el recibo de agua potable de EPS EMAQ por internet: rápido, seguro y sin filas. Disponible para suministros de Quillabamba, La Convención, Cusco.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: base,
    languages: {
      "es-PE": "/pagoWEB",
      "x-default": "/pagoWEB",
    },
  },
  openGraph: {
    type: "website",
    url: base,
    siteName: "EPS EMAQ S.A.",
    title: "Pago de Recibo de Agua en Línea – EPS EMAQ Quillabamba",
    description:
      "Consulte su deuda y pague el recibo de agua potable de EPS EMAQ por internet: rápido, seguro y sin filas.",
    locale: "es_PE",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "EPS EMAQ S.A. – Pago de Agua en Línea",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pago de Recibo de Agua en Línea – EPS EMAQ Quillabamba",
    description:
      "Consulte su deuda y pague el recibo de agua potable de EPS EMAQ por internet: rápido, seguro y sin filas.",
    images: ["/og-image.png"],
  },
};

export default function PagoWEBPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "EPS EMAQ S.A.",
        item: "https://epsemaq.epsagua.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Pago de recibo de agua en línea",
        item: "https://epsemaq.epsagua.com/pagoWEB",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <PagoWEBClient />
    </>
  );
}