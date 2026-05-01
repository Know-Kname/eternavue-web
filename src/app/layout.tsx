import type { Metadata } from "next";
import { DM_Serif_Display, Geist } from "next/font/google";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { SmoothScrollProvider } from "@/providers/SmoothScrollProvider";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Eternavue | Holographic Experiences That Honor Legacy",
  description:
    "Transform memories into immersive holographic tributes. Memorial services, special events, and corporate solutions using cutting-edge holographic technology. Founded at Detroit Memorial Park, serving families since 1925.",
  keywords: [
    "holographic memorial",
    "holographic display",
    "memorial services",
    "special events",
    "corporate experiential",
    "Detroit Memorial Park",
  ],
  authors: [{ name: "Eternavue" }],
  openGraph: {
    title: "Eternavue | Holographic Experiences That Honor Legacy",
    description:
      "Transform memories into immersive holographic tributes using cutting-edge technology.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSerif.variable} ${geist.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="antialiased bg-space text-white transition-colors">
        <ThemeProvider>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
