import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "John Wanyaga | Algorithmic Trading & Fintech Systems",
    template: "%s | John Wanyaga",
  },
  description: "Algorithmic trader and fintech builder specializing in MT5 expert advisors, machine learning trading agents, and production-grade trading platforms. Quantitative research and investment advisory.",
  keywords: ["algorithmic trading", "MT5 expert advisors", "fintech", "trading systems", "machine learning", "quantitative research", "investment advisory", "trading platforms"],
  authors: [{ name: "John Wanyaga" }],
  creator: "John Wanyaga",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://johnwanyaga.com",
    siteName: "John Wanyaga",
    title: "John Wanyaga | Algorithmic Trading & Fintech Systems",
    description: "Algorithmic trader and fintech builder specializing in MT5 expert advisors, machine learning trading agents, and production-grade trading platforms.",
  },
  twitter: {
    card: "summary_large_image",
    title: "John Wanyaga | Algorithmic Trading & Fintech Systems",
    description: "Algorithmic trader and fintech builder specializing in MT5 expert advisors, machine learning trading agents, and production-grade trading platforms.",
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${monoFont.variable} antialiased`}>
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Navigation />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

