import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Sans, IBM_Plex_Mono } from "next/font/google";
import { person } from "@/content/profile";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const description =
  "Forward deployed AI engineer at GSK R&D Tech. I embed with stakeholders and build agentic systems, dashboards and internal tools that hold up in regulated operations.";

const title = `${person.name} — ${person.billing}`;

export const metadata: Metadata = {
  metadataBase: new URL("https://isaacgriffiths.com"),
  title,
  description,
  openGraph: {
    title,
    description,
    url: "https://isaacgriffiths.com",
    siteName: person.name,
    locale: "en_GB",
    type: "profile",
  },
  icons: {
    icon: [
      {
        url:
          "data:image/svg+xml," +
          encodeURIComponent(
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="#0a0d13"/><text x="50" y="70" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="56" font-weight="700" fill="#f0a93b">IG</text></svg>`,
          ),
        type: "image/svg+xml",
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <body className={`${bricolage.variable} ${instrument.variable} ${plexMono.variable}`}>{children}</body>
    </html>
  );
}
