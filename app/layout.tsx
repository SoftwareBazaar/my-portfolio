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
    default: "John Wanyaga | Full-Stack Developer & Investment Advisor",
    template: "%s | John Wanyaga",
  },
  description: "Full-stack developer, investment advisor, and technical writer. Building modern web applications and helping clients grow their wealth through strategic investment guidance.",
  keywords: ["full-stack developer", "investment advisor", "technical writer", "web development", "stock analysis", "portfolio management"],
  authors: [{ name: "John Wanyaga" }],
  creator: "John Wanyaga",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://johnwanyaga.com",
    siteName: "John Wanyaga",
    title: "John Wanyaga | Full-Stack Developer & Investment Advisor",
    description: "Full-stack developer, investment advisor, and technical writer specializing in web applications and investment guidance.",
  },
  twitter: {
    card: "summary_large_image",
    title: "John Wanyaga | Full-Stack Developer & Investment Advisor",
    description: "Full-stack developer, investment advisor, and technical writer specializing in web applications and investment guidance.",
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

