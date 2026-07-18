import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <div style={{ backgroundColor: "#0A0E27", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navigation />
      <main className="flex-1 flex items-center justify-center px-4" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
        <div className="text-center max-w-lg mx-auto">
          <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: "clamp(80px, 20vw, 140px)", color: "#D4A017", lineHeight: 1, marginBottom: "16px" }}>
            404
          </p>
          <h1 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: "clamp(22px, 5vw, 32px)", color: "#F5F5F0", marginBottom: "16px" }}>
            Page Not Found
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "16px", color: "#A8B2C7", lineHeight: 1.7, marginBottom: "32px" }}>
            The page you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link href="/" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-semibold no-underline transition-colors hover:bg-amber-500" style={{ backgroundColor: "#D4A017", color: "#0A1128", fontFamily: "'Inter', sans-serif", fontSize: "15px", fontWeight: 600, minHeight: "48px", lineHeight: "20px", textDecoration: "none" }}>
            &larr; Back to Home
          </Link>
        </div>
      </main>
      <div style={{ marginTop: "auto" }}><Footer /></div>
    </div>
  );
}