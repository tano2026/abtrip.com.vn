import { Metadata } from "next";

const BASE_URL = "https://abtrip.vn";
const PAGE_URL = `${BASE_URL}/dich-vu-san-bay/thue-wifi`;

export const metadata: Metadata = {
  title: "Thuê Bộ Phát WiFi Du Lịch Quốc Tế, Nhận Tại Sân Bay",
  description:
    "Thuê bộ phát WiFi 4G/5G du lịch quốc tế phủ 200+ nước, tốc độ cao, pin khỏe. Đặt online, nhận tại sân bay Nội Bài hoặc Tân Sơn Nhất trước khi bay.",
  keywords: [
    "thuê bộ phát wifi du lịch",
    "wifi router quốc tế",
    "thuê wifi Nhật Bản",
    "thuê pocket wifi sân bay",
    "bộ phát wifi 4G 5G",
    "ABTRIP wifi",
  ],
  metadataBase: new URL(BASE_URL),
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Thuê Bộ Phát WiFi Du Lịch Quốc Tế, Nhận Tại Sân Bay | ABTRIP",
    description: "Pocket WiFi 4G/5G du lịch 200+ nước. Đặt online, nhận tại HAN hoặc SGN.",
    url: PAGE_URL,
    type: "website",
    locale: "vi_VN",
    images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "Thuê WiFi ABTRIP" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thuê Pocket WiFi Du Lịch Quốc Tế | ABTRIP",
    description: "Pocket WiFi 4G/5G 200+ nước, nhận tại sân bay.",
  },
  robots: { index: true, follow: true },
};

export default function ThueWifiLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
