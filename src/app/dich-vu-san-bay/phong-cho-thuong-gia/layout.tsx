import { Metadata } from "next";

const BASE_URL = "https://abtrip.vn";
const PAGE_URL = `${BASE_URL}/dich-vu-san-bay/phong-cho-thuong-gia`;

export const metadata: Metadata = {
  title: "Phòng Chờ Thương Gia VIP Lounge Nội Bài & Tân Sơn Nhất",
  description:
    "Đặt phòng chờ thương gia VIP Lounge tại sân bay Nội Bài (HAN) và Tân Sơn Nhất (SGN). Tận hưởng không gian riêng tư, đồ ăn thức uống miễn phí, WiFi tốc độ cao, ghế massage thư giãn.",
  keywords: [
    "phòng chờ thương gia Nội Bài",
    "VIP lounge Tân Sơn Nhất",
    "đặt phòng chờ sân bay",
    "business lounge Hà Nội",
    "priority lounge Hồ Chí Minh",
    "ABTRIP lounge",
  ],
  metadataBase: new URL(BASE_URL),
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Phòng Chờ Thương Gia VIP Lounge Nội Bài, Tân Sơn Nhất | ABTRIP",
    description: "VIP Lounge sân bay HAN & SGN: không gian riêng tư, đồ ăn miễn phí, WiFi, ghế massage.",
    url: PAGE_URL,
    type: "website",
    locale: "vi_VN",
    images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "VIP Lounge ABTRIP" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "VIP Lounge Sân Bay | ABTRIP",
    description: "Phòng chờ thương gia VIP tại HAN & SGN.",
  },
  robots: { index: true, follow: true },
};

export default function PhongChoThuongGiaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
