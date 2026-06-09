import { Metadata } from "next";

const BASE_URL = "https://abtrip.vn";
const PAGE_URL = `${BASE_URL}/sim`;

export const metadata: Metadata = {
  title: "eSIM Du Lịch Quốc Tế 4G/5G Giá Tốt, Kích Hoạt 5 Phút",
  description:
    "eSIM du lịch quốc tế 4G/5G phủ sóng 200+ quốc gia, giá từ 99.000đ, kích hoạt ngay trên điện thoại trong 5 phút. Nhận SIM vật lý tại sân bay Nội Bài & Tân Sơn Nhất.",
  keywords: [
    "esim du lịch quốc tế",
    "SIM 4G 5G du lịch",
    "SIM Nhật Bản",
    "SIM châu Âu",
    "mua esim online",
    "SIM nhận tại sân bay",
    "ABTRIP SIM",
  ],
  metadataBase: new URL(BASE_URL),
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "eSIM Du Lịch Quốc Tế 200+ Nước, Kích Hoạt 5 Phút | ABTRIP",
    description: "eSIM 4G/5G du lịch quốc tế, phủ 200+ nước, giá tốt, kích hoạt nhanh 5 phút.",
    url: PAGE_URL,
    type: "website",
    locale: "vi_VN",
    images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "eSIM Du Lịch ABTRIP" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "eSIM Du Lịch 200+ Quốc Gia | ABTRIP",
    description: "eSIM 4G/5G du lịch quốc tế, kích hoạt 5 phút.",
  },
  robots: { index: true, follow: true },
};

export default function SimLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
