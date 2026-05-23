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
    default: "Bowsky Ventures",
    template: "%s · Bowsky Ventures",
  },
  description:
    "A venture studio. We back early-stage founders with capital and operating talent, and we stay involved until the work is done.",
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
      "We build companies. We back companies. Sometimes both.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bowsky Ventures",
    description:
      "We build companies. We back companies. Sometimes both.",
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
