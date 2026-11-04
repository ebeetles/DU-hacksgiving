import type { Metadata, Viewport } from "next";
import "@fontsource/jersey-25/latin-400.css";
import "@fontsource/gabarito/latin-400.css";
import "@fontsource/gabarito/latin-600.css";
import "@fontsource/gabarito/latin-800.css";
import "./globals.css";
import { event } from "@/content/event";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: { default: event.name, template: `%s | ${event.name}` },
  description: `${event.tagline} ${event.dateLong}, ${event.timeLong}. Hosted by ${event.host}.`,
  openGraph: { title: event.name, description: event.tagline, images: ["/og.png"] },
};

export const viewport: Viewport = { viewportFit: "cover", themeColor: "#142747" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
