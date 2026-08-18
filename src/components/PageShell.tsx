import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";

export default function PageShell({
  children,
  title,
  subtitle,
  breadcrumb,
}: {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  breadcrumb?: string;
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#f9fafb]">
        <section
          className="relative text-white py-16 px-4"
          style={{ background: "linear-gradient(135deg, #0057a8 0%, #1e73be 60%, #0095eb 100%)" }}
        >
          <div className="max-w-6xl mx-auto">
            {breadcrumb && (
              <nav className="text-xs text-white/70 mb-3 uppercase tracking-wider">
                {breadcrumb}
              </nav>
            )}
            <h1 className="text-3xl sm:text-4xl font-extrabold" style={{ fontFamily: "Poppins, Inter, sans-serif" }}>
              {title}
            </h1>
            {subtitle && <p className="mt-3 max-w-3xl text-white/90 leading-relaxed">{subtitle}</p>}
          </div>
        </section>
        <section className="px-4 py-12">
          <div className="max-w-6xl mx-auto bg-white rounded-2xl border border-[#e2e8f0] p-6 sm:p-10 shadow-sm">
            {children}
          </div>
        </section>
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}