import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const display = Montserrat({
  subsets: ["latin"],
  weight: ["500", "700", "800", "900"],
  variable: "--font-display",
  display: "swap"
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap"
});

export const metadata: Metadata = {
  title: "NOPO Media – Kreative Full-Service Medienagentur aus Kiel",
  description:
    "Digitale Medienagentur aus Kiel für Social Media, Webseiten, SEO & Ads. Maßgeschneiderte Strategien für mehr Sichtbarkeit und Wachstum.",
  metadataBase: new URL("https://nopo.studio"),
  openGraph: {
    title: "NOPO Media – Kreative Full-Service Medienagentur aus Kiel",
    description:
      "Digitale Medienagentur aus Kiel für Social Media, Webseiten, SEO & Ads. Maßgeschneiderte Strategien für mehr Sichtbarkeit und Wachstum.",
    type: "website"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${display.variable} ${sans.variable}`}>
      <body className="bg-paper text-ink antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
