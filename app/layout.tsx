import type { Metadata, Viewport } from "next";
// Fonts are bundled with the site (no Google Fonts download at build time).
import "@fontsource-variable/inter";
import "@fontsource-variable/sora";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yooyoung Jeon — Interaction & UX/UI Designer",
  description: "Where human-centric design meets AI experience. Portfolio of Yooyoung Jeon, Interaction Designer and UX/UI Designer.",
};

export const viewport: Viewport = {
  themeColor: "#07061a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
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
