import type { Metadata } from "next";
import { RouteTransition } from "./components/RouteTransition";
import { SiteHeader } from "./components/SiteHeader";
import { site } from "./content";
import "katex/dist/katex.min.css";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const iconPath = `${basePath}/favicon-pj.png`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: site.name,
    template: `%s — ${site.name}`,
  },
  description: `The personal website of ${site.name}.`,
  openGraph: {
    title: site.name,
    description: `The personal website of ${site.name}.`,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: site.name,
    description: `The personal website of ${site.name}.`,
  },
  icons: {
    icon: [
      { url: `${basePath}/favicon.ico`, sizes: "any" },
      { url: iconPath, type: "image/png", sizes: "128x128" },
    ],
    shortcut: `${basePath}/favicon.ico`,
    apple: `${basePath}/apple-touch-icon.png`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeScript = `
    try {
      const saved = localStorage.getItem("portfolio-theme");
      const preferred = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      document.documentElement.dataset.theme = saved === "light" || saved === "dark" ? saved : preferred;
    } catch (_) {
      document.documentElement.dataset.theme = "light";
    }
  `;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <SiteHeader />
        <RouteTransition>{children}</RouteTransition>
      </body>
    </html>
  );
}
