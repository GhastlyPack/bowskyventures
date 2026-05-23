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

const siteUrl = "https://bowskyventures.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Bowsky Ventures — Building and scaling early-stage companies",
    template: "%s · Bowsky Ventures",
  },
  description:
    "Bowsky Ventures is a venture studio that builds and scales early-stage companies through strategic advisory, operational expertise, hands-on execution, and selective capital.",
  keywords: [
    "Bowsky Ventures",
    "Brandon Bowsky",
    "venture studio",
    "early-stage",
    "operator investor",
  ],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Bowsky Ventures",
    title: "Bowsky Ventures",
    description:
      "A venture studio building and scaling the next generation of category leaders.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bowsky Ventures",
    description:
      "A venture studio building and scaling the next generation of category leaders.",
  },
  robots: {
    index: true,
    follow: true,
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
