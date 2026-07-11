import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Méndez Estates Aruba | Luxury Villa Rental, Car Rental & Experiences",
    template: "%s | Méndez Estates Aruba",
  },
  description:
    "Two private luxury villas in Aruba — Naïma Luxury and Maxwell Luxury. Hosted personally by Ana Méndez. Includes car rental, private chef, massage, and island tours.",
  openGraph: {
    title: "Méndez Estates Aruba",
    description: "Two private luxury villas in Aruba, hosted by Ana Méndez.",
    siteName: "Méndez Estates Aruba",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="images/favicon.png" />
        <link rel="apple-touch-icon" href="images/apple-touch-icon.png" />
      </head>
      <body>
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
