import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap", weight: ["200", "300", "400", "500", "600"] });

export const metadata: Metadata = {
  title: "Yooyoung Jeon — Interaction & UX/UI Designer",
  description: "Where human-centric design meets AI experience. Portfolio of Yooyoung Jeon, Interaction Designer and UX/UI Designer.",
};

export const viewport: Viewport = {
  themeColor: "#07061a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <body className="grain">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-night"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
