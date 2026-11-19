import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import { Suspense, type ReactNode } from "react";
import { Providers } from "@/components/providers";
import { BottomNav } from "@/components/shell/bottom-nav";
import { MenuSheet } from "@/components/shell/menu-sheet";
import { NotificationsSheet } from "@/components/shell/notifications-sheet";
import { SplashScreen } from "@/components/shell/splash-screen";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const description = "Conoce candidaturas y compara propuestas.";
const siteUrl = process.env.BETTER_AUTH_URL ?? process.env.AUTH_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "SIBIC",
  title: {
    default: "SIBIC",
    template: "%s · SIBIC",
  },
  description,
  openGraph: {
    type: "website",
    locale: "es_GT",
    siteName: "SIBIC",
    title: "SIBIC",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "SIBIC",
    description,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "SIBIC",
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#1b2559",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className={`${jakarta.variable} h-full antialiased`}>
      <head>
        <link
          rel="apple-touch-startup-image"
          href="/assets/apple-splash.png"
          media="screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
        />
      </head>
      <body className="h-full bg-white text-navy">
        <Script id="sibic-splash" strategy="beforeInteractive">
          {`try{if(sessionStorage.getItem("sibic-splash-seen")==="1"){var s=document.createElement("style");s.id="sibic-splash-off";s.textContent="[data-splash-screen]{display:none!important}";document.head.appendChild(s)}}catch(e){}`}
        </Script>
        <Providers>
          <div className="fixed inset-0 flex w-full flex-col overflow-hidden bg-[#f6f7fb] lg:flex-row">
            <SplashScreen />
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain lg:order-2">{children}</div>
            <Suspense
              fallback={
                <div className="h-16 shrink-0 border-t border-slate-100 bg-white lg:order-1 lg:h-full lg:w-60 lg:border-t-0 lg:border-r" />
              }
            >
              <BottomNav />
            </Suspense>
          </div>
          <MenuSheet />
          <NotificationsSheet />
          <Toaster position="top-center" />
        </Providers>
      </body>
    </html>
  );
}
