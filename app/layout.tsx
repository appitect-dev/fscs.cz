import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Analytics } from "@/app/components/Analytics";
import { ConsentProvider } from "@/app/components/consent/ConsentProvider";
import { CookieBanner } from "@/app/components/consent/CookieBanner";
import { company, offices, people, services, SITE_URL } from "@/app/lib/site";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = SITE_URL;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Fire & Safety Consulting s.r.o. – BOZP, PO, KBOZP a PBS",
    template: "%s | Fire & Safety Consulting s.r.o.",
  },
  description:
    "Poradenská firma pro bezpečnost práce (BOZP) a požární ochranu (PO). Zajišťujeme koordinátora BOZP na staveništi (KBOZP) i požárně bezpečnostní řešení staveb (PBS). Úvodní audit zdarma. Praha a Plzeň.",
  keywords: [
    "BOZP",
    "PO",
    "KBOZP",
    "PBS",
    "koordinátor BOZP",
    "požární bezpečnost staveb",
    "bezpečnost práce",
    "požární ochrana",
    "audit BOZP",
    "Praha",
    "Plzeň",
  ],
  authors: [{ name: company.legalName }],
  creator: company.legalName,
  publisher: company.legalName,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    url: siteUrl,
    siteName: company.legalName,
    title: "Fire & Safety Consulting s.r.o. – BOZP, PO, KBOZP a PBS",
    description:
      "Komplexní služby v oblasti bezpečnosti práce a požární ochrany. Úvodní audit zdarma. Působíme v Praze a Plzni.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fire & Safety Consulting s.r.o. – BOZP, PO, KBOZP a PBS",
    description:
      "Komplexní služby v oblasti bezpečnosti práce a požární ochrany. Úvodní audit zdarma. Praha a Plzeň.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "Bezpečnost práce a požární ochrana",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#f29322",
  width: "device-width",
  initialScale: 1,
};

function OrganizationJsonLd() {
  const orgId = `${siteUrl}/#organization`;
  const webId = `${siteUrl}/#website`;

  const organization = {
    "@type": "ProfessionalService",
    "@id": orgId,
    name: company.legalName,
    url: siteUrl,
    logo: `${siteUrl}/images/logo.svg`,
    image: `${siteUrl}/opengraph-image`,
    email: company.email,
    foundingDate: String(company.foundedYear),
    description:
      "Poradenská firma pro bezpečnost práce (BOZP) a požární ochranu (PO), koordinátora BOZP na staveništi (KBOZP) a požárně bezpečnostní řešení staveb (PBS).",
    taxID: company.dic,
    vatID: company.dic,
    telephone: people.find((p) => p.phone)?.phone,
    address: offices.map((o) => ({
      "@type": "PostalAddress",
      streetAddress: o.street,
      addressLocality: o.city,
      postalCode: o.zip,
      addressCountry: "CZ",
    })),
    areaServed: offices.map((o) => o.city),
    contactPoint: people
      .filter((p) => p.phone)
      .map((p) => ({
        "@type": "ContactPoint",
        telephone: p.phone,
        email: company.email,
        contactType: "sales",
        availableLanguage: "Czech",
      })),
    knowsAbout: [
      "BOZP",
      "PO",
      "KBOZP",
      "PBS",
      "bezpečnost práce",
      "požární ochrana",
    ],
  };

  const website = {
    "@type": "WebSite",
    "@id": webId,
    url: siteUrl,
    name: company.legalName,
    inLanguage: "cs-CZ",
    publisher: { "@id": orgId },
  };

  const serviceNodes = services.map((s) => ({
    "@type": "Service",
    name: `${s.title} (${s.abbr})`,
    serviceType: s.title,
    description: s.description,
    provider: { "@id": orgId },
    areaServed: offices.map((o) => o.city),
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [organization, website, ...serviceNodes],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs" className={`${poppins.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        <OrganizationJsonLd />
        <ConsentProvider>
          {children}
          <CookieBanner />
          <Analytics />
        </ConsentProvider>
      </body>
    </html>
  );
}
