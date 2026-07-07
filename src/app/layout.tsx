import type { Metadata, Viewport } from "next";
import "./globals.css";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
import Toast from "@/components/Toast";

export const metadata: Metadata = {
  title: "Surat Pilihan & Juz 'Amma — Mushaf Digital",
  description:
    "Baca Al-Kahfi, Yasin, Al-Waqi'ah, Al-Mulk, dan Juz 'Amma dengan tampilan identik mushaf cetak. Gratis, offline, tanpa iklan.",
  keywords: [
    "Al-Quran digital",
    "mushaf online",
    "surat pilihan",
    "Juz Amma",
    "Yasin",
    "Al-Kahfi",
    "Al-Mulk",
    "Al-Waqiah",
  ],
  authors: [{ name: "Surat Pilihan" }],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Surat Pilihan",
  },
  openGraph: {
    title: "Surat Pilihan & Juz 'Amma — Mushaf Digital",
    description:
      "Baca surat-surat pilihan Al-Qur'an dengan tampilan mushaf cetak standar.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FBF8F1" },
    { media: "(prefers-color-scheme: dark)", color: "#121212" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body className="min-h-dvh antialiased">
        {children}
        <Toast />
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
