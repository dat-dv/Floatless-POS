import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeTransition } from "@/components/ui/ThemeTransition";
import "./globals.css";
import ThemeProvider from "@/components/ui/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Bistro | Menu",
  description: "Official ordering menu for The Bistro",
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
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
    (function() {
      try {
        var t = localStorage.getItem('theme');
        var d = t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches);
        document.documentElement.classList.toggle('dark', d);
      } catch (e) {}
    })();
  `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
