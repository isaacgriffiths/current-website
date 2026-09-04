import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter } from "next/font/google";
import { person } from "@/content/profile";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
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
  "AI Engineer at GSK R&D Tech, building agentic systems in Python, forward deployed. Internal AI tools that hold up in regulated operations. London, UK.";

const title = `${person.name} | ${person.billing}`;

export const metadata: Metadata = {
  metadataBase: new URL("https://isaacgriffiths.com"),
  title,
  description,
  alternates: {
    canonical: "/",
  },
  // Static files in public/ so the URLs never carry a build hash.
  // Google only refreshes a favicon it can find at a stable URL.
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title,
    description,
    url: "https://isaacgriffiths.com",
    siteName: person.name,
    locale: "en_GB",
    type: "profile",
    images: [{ url: person.photo, alt: person.name, width: 512, height: 640, type: "image/jpeg" }],
  },
  twitter: {
    card: "summary",
    title,
    description,
    images: [person.photo],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": "https://isaacgriffiths.com/#profile",
  url: "https://isaacgriffiths.com/",
  dateCreated: "2025-03-19",
  dateModified: "2026-09-04",
  mainEntity: {
    "@type": "Person",
    "@id": "https://isaacgriffiths.com/#person",
    name: person.name,
    jobTitle: person.role,
    description: person.tagline,
    url: "https://isaacgriffiths.com/",
    image: `https://isaacgriffiths.com${person.photo}`,
    email: `mailto:${person.email}`,
    worksFor: { "@type": "Organization", name: "GSK", url: "https://www.gsk.com" },
    address: {
      "@type": "PostalAddress",
      addressRegion: "London",
      addressCountry: "GB",
    },
    sameAs: [person.links.linkedin, person.links.github],
    knowsAbout: [
      "Agentic AI systems",
      "Generative AI engineering",
      "Data and analytics engineering",
      "Forward deployed engineering",
      "Enterprise automation",
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <body className={`${inter.variable} ${plexMono.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
