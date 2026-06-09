import { Metadata } from "next";

const BASE_URL = "https://abtrip.vn";
const PAGE_URL = `${BASE_URL}/dich-vu-san-bay/fastrack`;

export const metadata: Metadata = {
  title: "Fastrack Sân Bay VIP: Nội Bài, Tân Sơn Nhất, Đà Nẵng",
  description:
    "Dịch vụ Fastrack VIP tại sân bay Nội Bài (HAN), Tân Sơn Nhất (SGN), Đà Nẵng (DAD): đón tiễn tận cửa máy bay, lối đi ưu tiên thông quan nhanh, hỗ trợ hành lý 24/7.",
  keywords: [
    "fastrack sân bay Nội Bài",
    "fastrack Tân Sơn Nhất",
    "dịch vụ đón tiễn VIP sân bay",
    "lối đi ưu tiên thông quan",
    "fastrack Đà Nẵng",
    "ABTRIP fastrack",
  ],
  metadataBase: new URL(BASE_URL),
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Fastrack Sân Bay VIP Nội Bài, Tân Sơn Nhất | ABTRIP",
    description: "Fastrack VIP HAN, SGN, DAD: đón tận cửa máy bay, lối ưu tiên thông quan nhanh.",
    url: PAGE_URL,
    type: "website",
    locale: "vi_VN",
    images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "Fastrack Sân Bay ABTRIP" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fastrack VIP Sân Bay | ABTRIP",
    description: "Fastrack VIP HAN, SGN, DAD: đón tận cửa máy bay, thông quan nhanh.",
  },
  robots: { index: true, follow: true },
  other: { "geo.region": "VN" },
};

export default function FastrackLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
