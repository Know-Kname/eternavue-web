import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Eternavue | Holographic Experiences That Honor Legacy",
  description: "Transform memories into immersive holographic tributes. Memorial services, special events, and corporate solutions using cutting-edge holographic technology. Founded at Detroit Memorial Park, serving families since 1925.",
  keywords: ["holographic memorial", "holographic display", "memorial services", "special events", "corporate experiential", "Detroit Memorial Park"],
  authors: [{ name: "Eternavue" }],
  openGraph: {
    title: "Eternavue | Holographic Experiences That Honor Legacy",
    description: "Transform memories into immersive holographic tributes using cutting-edge technology.",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
