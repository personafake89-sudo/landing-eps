import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const BASE_URL = "https://epsemaq.epsagua.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "EPS EMAQ S.A. | Pago de Recibo de Agua en Línea – Quillabamba",
    template: "%s | EPS EMAQ S.A.",
  },
  description:
    "Consulte y pague su recibo de agua potable de EPS EMAQ en Quillabamba, La Convención, Cusco. Pago rápido, seguro y sin filas desde cualquier dispositivo.",
  applicationName: "EPS EMAQ S.A.",
  category: "Servicios públicos de agua y alcantarillado",
  themeColor: "#0057a8",
  colorScheme: "light",
  keywords: [
    "EPS EMAQ",
    "pago recibo agua Quillabamba",
    "agua potable La Convención",
    "pago en línea agua Cusco",
    "consultar deuda agua EMAQ",
    "EMAQ Quillabamba",
    "servicio agua potable",
  ],
  authors: [{ name: "EPS EMAQ S.A." }],
  robots: { index: true, follow: true },
  alternates: {
    canonical: BASE_URL,
    languages: {
      "es-PE": "/",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: "EPS EMAQ S.A.",
    title: "EPS EMAQ S.A. - Quillabamba",
    description:
      "Consulte y pague su recibo de agua potable de EPS EMAQ en Quillabamba, La Convención, Cusco. Pago rápido, seguro y sin filas.",
    locale: "es_PE",
    alternateLocale: ["es_419", "es"],
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
    title: "EPS EMAQ S.A. - Quillabamba",
    description:
      "Consulte y pague su recibo de agua potable de EPS EMAQ en Quillabamba, La Convención, Cusco.",
    images: ["/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "Organization"],
  "@id": "https://epsemaq.epsagua.com",
  name: "EPS EMAQ S.A.",
  alternateName: "Empresa Prestadora de Servicios de Saneamiento EMAQ",
  url: "https://epsemaq.epsagua.com",
  logo: `${BASE_URL}/images/logo.png`,
  image: `${BASE_URL}/images/slide-01.jpg`,
  priceRange: "Pago de recibo de agua en línea",
  currenciesAccepted: "PEN",
  paymentAccepted: "Tarjeta de crédito, débito, Yape y banca móvil",
  description:
    "EPS EMAQ S.A. brinda servicios de agua potable y alcantarillado en Quillabamba, La Convención, Cusco.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. Nicanor Larrea N° 337",
    addressLocality: "Quillabamba",
    addressRegion: "Cusco",
    addressCountry: "PE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -12.8635,
    longitude: -72.6929,
  },
  telephone: "+51973598606",
  email: "consultas@epsemaq.com.pe",
  openingHours: "Mo-Fr 08:00-16:00",
  areaServed: [
    {
      "@type": "Place",
      name: "Quillabamba",
      address: { "@type": "PostalAddress", addressLocality: "Quillabamba", addressRegion: "Cusco", addressCountry: "PE" },
    },
    {
      "@type": "Place",
      name: "La Convención",
      address: { "@type": "PostalAddress", addressLocality: "La Convención", addressRegion: "Cusco", addressCountry: "PE" },
    },
  ],
  sameAs: [
    "https://www.facebook.com/p/EPS-EMAQ-Quillabamba-100063889960218",
    "https://www.instagram.com/eps_emaq_sa",
    "https://www.youtube.com/@EPSEMAQS.A",
    "https://www.tiktok.com/@eps.emaq.s.a",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios en Línea",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Consulta de deuda de agua",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Pago de recibo de agua en línea",
        },
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-PE" className={`h-full antialiased ${poppins.variable} ${inter.variable}`} style={{ colorScheme: 'light' }}>
      <head>
        <meta name="geo.region" content="PE-CUS" />
        <meta name="geo.placename" content="Quillabamba, La Convención, Cusco, Perú" />
        <meta name="geo.position" content="-12.8635;-72.6929" />
        <meta name="ICBM" content="-12.8635, -72.6929" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col text-[#1e293b]">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
