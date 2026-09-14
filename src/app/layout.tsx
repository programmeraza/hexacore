import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { SITE_URL, SITE_DESCRIPTION } from "@/lib/site-config";
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
  metadataBase: new URL(SITE_URL),
  title: {
    default: "NEUROTECH",
    template: "%s | NEUROTECH",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "NEUROTECH",
    "AI решения",
    "искусственный интеллект",
    "разработка AI-агентов",
    "RAG",
    "автоматизация бизнес-процессов",
    "цифровая трансформация",
    "Uzbekistan IT",
  ],
  authors: [{ name: "NEUROTECH" }],
  icons: {
    icon: "/logo-favicon.svg",
    apple: "/logo.png",
  },
  openGraph: {
    title: "NEUROTECH — AI-решения и цифровая трансформация бизнеса",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "NEUROTECH",
    images: [{ url: "/logo.png", width: 512, height: 512, alt: "NEUROTECH" }],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "NEUROTECH — AI-решения и цифровая трансформация бизнеса",
    description: SITE_DESCRIPTION,
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#03101C",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (

    <html
      lang="ru"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/*
          Браузер восстанавливает прежнюю позицию скролла при обновлении
          страницы РАНЬШЕ, чем успевает выполниться React-эффект — поэтому
          сброс scrollRestoration/позиции скролла из компонента иногда
          не срабатывает. beforeInteractive гарантирует, что этот код
          выполнится до того, как браузер восстановит скролл, — hero-секция
          и её reveal-анимация при любом обновлении всегда стартуют сверху.
          Вынесено в отдельный файл (а не инлайн-скрипт), чтобы CSP
          script-src мог оставаться на 'self' без 'unsafe-inline'.
        */}
        <Script src="/scroll-restoration-fix.js" strategy="beforeInteractive" />
        {children}
      </body>
    </html>
  );
}
