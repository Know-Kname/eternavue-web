import type { Metadata } from "next";
import { ThemeProvider } from "@/providers/ThemeProvider";
import "./globals.css";

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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className="antialiased bg-white dark:bg-primary-950 text-neutral-900 dark:text-white transition-colors"
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
