import type { Metadata } from "next";
import { Inter, Syne, DM_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
  weight: ["700", "800"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://superwitstech.com"),
  title: {
    default: "Superwits Tech | Conversion & Credibility Systems for Nigerian Service Businesses",
    template: "%s — Superwits Tech",
  },
  description:
    "Turn your website into a client-getting machine. Free conversion audit for Nigerian clinics, coaches, and e-commerce brands. Built with AI. Delivered in days.",
  keywords: [
    "website design Nigeria",
    "conversion optimization",
    "client acquisition",
    "Nigerian business website",
    "website audit",
    "Superwits Tech",
  ],
  authors: [{ name: "Marquis Festus", url: "https://superwitstech.com/about" }],
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://superwitstech.com",
    siteName: "Superwits Tech",
    title: "Superwits Tech | Conversion & Credibility Systems",
    description:
      "Turn your website into a client-getting machine. Free conversion audit for Nigerian service businesses.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Superwits Tech",
    description: "Conversion & Credibility Systems for Nigerian Service Businesses",
    creator: "@MarquisBuilds",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        {/* GA4 Consent Mode v2 default - denied until user accepts cookies */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                'analytics_storage': 'denied',
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'wait_for_update': 500
              });
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${syne.variable} ${dmMono.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}