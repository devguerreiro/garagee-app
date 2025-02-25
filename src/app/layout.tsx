import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Garagee",
  description: "Um aplicativo para reservar vagas disponíveis em condomínios",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${inter.variable} antialiased relative`}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
