import type { Metadata, Viewport } from "next";
import { site } from "@/data/site";
import "tdesign-react/es/style/index.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.meta.siteUrl),
  title: site.meta.title,
  description: site.meta.description,
  applicationName: site.meta.title,
  alternates: { canonical: "/" },
  keywords: site.meta.keywords,
  formatDetection: { email: false, address: false, telephone: false },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: site.meta.locale,
    siteName: site.meta.title,
    title: site.meta.title,
    description: site.meta.description,
    url: `${site.meta.siteUrl}/`,
  },
  twitter: {
    card: "summary",
    title: site.meta.title,
    description: site.meta.description,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#000000",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
