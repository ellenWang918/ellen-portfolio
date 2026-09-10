import type { Metadata } from "next";
import { CustomCursor } from "@/components/custom-cursor";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ellen | Portfolio",
  description: "Ellen’s personal portfolio — work, ideas, and the stories behind them.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="site-shell">
        <a href="#main-content" aria-label="Skip to main content" className="sr-only focus:not-sr-only focus:absolute focus:left-offset focus:top-focus-top focus:z-10 focus:bg-surface focus:p-control">
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <CustomCursor />
      </body>
    </html>
  );
}
