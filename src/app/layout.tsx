import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Image Generator | Powered by Gemini Imagen",
  description: "Transform your ideas into stunning images with AI. Built with Next.js, TypeScript, and Google Gemini Imagen API.",
  keywords: ["AI", "Image Generator", "Gemini", "Imagen", "Next.js", "TypeScript"],
  authors: [{ name: "Esenzhanov" }],
  openGraph: {
    title: "AI Image Generator",
    description: "Transform your ideas into stunning images with AI",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-animated`}
      >
        {children}
      </body>
    </html>
  );
}
