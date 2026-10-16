import type { Metadata } from "next";
import { Montserrat, Lato } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import logo01 from "@/images/01.jpeg";

const montserrat = Montserrat({
  variable: "--font-title",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const lato = Lato({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Colegio Adventista Sierra Maestra",
  description: "Sistema de Gestión Escolar",
  icons: {
    icon: logo01.src,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${montserrat.variable} ${lato.variable} antialiased bg-[--background] text-[--foreground]`}>
        <Header />
        <main className="min-h-[60vh]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
