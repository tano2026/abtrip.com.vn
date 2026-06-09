import type { Metadata } from "next";
import { Inter, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ZaloFloatingButton from "@/components/ZaloFloatingButton";

const inter = Inter({
  subsets: ["vietnamese", "latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["vietnamese", "latin"],
  variable: "--font-be-vietnam-pro",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const BASE_URL = "https://abtrip.vn";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "ABTRIP - Hệ Sinh Thái Dịch Vụ Hàng Không & Du Lịch 5 Sao",
    template: "%s | ABTRIP",
  },
  description:
    "ABTRIP - Đối tác chiến lược cung cấp giải pháp vé máy bay, dịch vụ sân bay VIP, visa, tour, khách sạn đẳng cấp dành riêng cho Tổ chức, Doanh nghiệp và Khách VIP tại Việt Nam.",
  keywords: [
    "ABTRIP",
    "dịch vụ hàng không",
    "vé máy bay doanh nghiệp",
    "dịch vụ sân bay VIP",
    "fastrack sân bay",
    "visa quốc tế",
    "tour du lịch",
    "khách sạn B2B",
    "công ty du lịch Hà Nội",
    "travel management company Vietnam",
  ],
  authors: [{ name: "ABTRIP", url: BASE_URL }],
  creator: "ABTRIP",
  publisher: "Công ty TNHH TM Du lịch và DV Hàng không ABTRIP",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: {
    canonical: BASE_URL,
    languages: { "vi-VN": BASE_URL, "en-US": `${BASE_URL}/en` },
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: BASE_URL,
    siteName: "ABTRIP",
    title: "ABTRIP - Hệ Sinh Thái Dịch Vụ Hàng Không & Du Lịch 5 Sao",
    description:
      "Giải pháp di chuyển, lưu trú và sự kiện đẳng cấp dành riêng cho doanh nghiệp và khách VIP tại Việt Nam.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ABTRIP - Hệ sinh thái dịch vụ hàng không & du lịch 5 sao",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ABTRIP - Hệ Sinh Thái Dịch Vụ Hàng Không & Du Lịch 5 Sao",
    description:
      "Giải pháp di chuyển, lưu trú và sự kiện đẳng cấp dành riêng cho doanh nghiệp và khách VIP tại Việt Nam.",
    images: ["/og-image.jpg"],
    site: "@abtrip_vn",
  },
  verification: {
    google: "GOOGLE_SEARCH_CONSOLE_TOKEN",
  },
  other: {
    "geo.region": "VN-HN",
    "geo.placename": "Hà Nội, Việt Nam",
    "geo.position": "21.0285;105.8542",
    "ICBM": "21.0285, 105.8542",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${BASE_URL}/#organization`,
  name: "Công ty TNHH Thương mại Du lịch và Dịch vụ Hàng không ABTRIP",
  alternateName: "ABTRIP",
  url: BASE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${BASE_URL}/logo.png`,
    width: 200,
    height: 60,
  },
  description:
    "Hệ sinh thái dịch vụ hàng không và du lịch 5 sao dành cho doanh nghiệp, tổ chức và khách VIP tại Việt Nam.",
  foundingDate: "2020",
  taxID: "0109972765",
  legalName: "Công ty TNHH Thương mại Du lịch và Dịch vụ Hàng không ABTRIP",
  address: [
    {
      "@type": "PostalAddress",
      streetAddress: "Số 8 ngõ 80/78 Bắc Cầu",
      addressLocality: "Phường Bồ Đề",
      addressRegion: "Hà Nội",
      addressCountry: "VN",
      name: "Trụ sở chính",
    },
    {
      "@type": "PostalAddress",
      streetAddress: "Số 16 ngõ 61 Lạc Trung",
      addressLocality: "Phường Vĩnh Tuy",
      addressRegion: "Hà Nội",
      addressCountry: "VN",
      name: "Văn phòng giao dịch",
    },
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+84-868-320-320",
      contactType: "customer service",
      areaServed: "VN",
      availableLanguage: ["Vietnamese", "English"],
    },
    {
      "@type": "ContactPoint",
      telephone: "+84-868-320-320",
      contactType: "sales",
      areaServed: "VN",
      availableLanguage: "Vietnamese",
    },
  ],
  email: "info@abtrip.vn",
  sameAs: [
    "https://www.facebook.com/abtrip",
    "https://zalo.me/0868320320",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Dịch vụ ABTRIP",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Vé máy bay B2B" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Dịch vụ sân bay VIP" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Visa quốc tế" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Tour du lịch thiết kế riêng" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Đặt phòng khách sạn" } },
    ],
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "@id": `${BASE_URL}/#localbusiness`,
  name: "ABTRIP",
  image: `${BASE_URL}/og-image.jpg`,
  url: BASE_URL,
  telephone: "+84-868-320-320",
  email: "info@abtrip.vn",
  priceRange: "$$",
  currenciesAccepted: "VND",
  paymentAccepted: "Cash, Credit Card, Bank Transfer",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Số 16 ngõ 61 Lạc Trung",
    addressLocality: "Phường Vĩnh Tuy, Quận Hai Bà Trưng",
    addressRegion: "Hà Nội",
    postalCode: "100000",
    addressCountry: "VN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 21.0285,
    longitude: 105.8542,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "08:00",
      closes: "12:00",
    },
  ],
  areaServed: {
    "@type": "Country",
    name: "Vietnam",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="scroll-smooth">
      <head>
        <link rel="alternate" hrefLang="vi-VN" href={BASE_URL} />
        <link rel="alternate" hrefLang="x-default" href={BASE_URL} />
      </head>
      <body
        className={`${inter.variable} ${beVietnamPro.variable} antialiased selection:bg-[var(--accent)] selection:text-[var(--primary)] bg-[var(--background)] font-sans`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <ZaloFloatingButton phone="0868320320" />
      </body>
    </html>
  );
}
