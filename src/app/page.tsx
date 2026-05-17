import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import PaymentSection from "@/components/PaymentSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundImage: 'url(https://www.epsemaq.com.pe/slides/01K75Q8M98A0SXJ5YRW8FA6N2S.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Overlay blanco suave sobre toda la página */}
      <div className="absolute inset-0 bg-white/80 pointer-events-none" />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <Hero />
        <Services />
        <HowItWorks />
        <PaymentSection />
        <Footer />
      </div>
    </div>
  );
}
