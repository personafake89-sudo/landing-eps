import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import PaymentSection from "@/components/PaymentSection";
import Footer from "@/components/Footer";
import BackgroundSlideshow from "@/components/BackgroundSlideshow";
import AvisoModal from "@/components/AvisoModal";

export default function Home() {
  return (
    <BackgroundSlideshow>
      {/* H1 estático para crawlers; el Hero visual lo oculta visualmente */}
      <h1 className="sr-only">
        EPS EMAQ S.A. – Pago de Recibo de Agua en Línea – Quillabamba, La Convención, Cusco
      </h1>
      <AvisoModal />
      <Navbar />
      <Hero />
      <HowItWorks />
      <PaymentSection />
      <Services />
      <Footer />
    </BackgroundSlideshow>
  );
}
