import { Metadata } from "next";

const BASE_URL = "https://abtrip.vn";
const PAGE_URL = `${BASE_URL}/tour`;

export const metadata: Metadata = {
  title: "Tour Du Lịch Thiết Kế Riêng, Incentive & Luxury Travel",
  description:
    "Tour du lịch thiết kế theo yêu cầu, tour ghép đoàn khởi hành hàng tuần, tour incentive doanh nghiệp và luxury travel cao cấp. ABTRIP tư vấn và lên lịch trình cá nhân hoá.",
  keywords: [
    "tour du lịch thiết kế riêng",
    "tour ghép đoàn",
    "tour incentive doanh nghiệp",
    "luxury travel Việt Nam",
    "đặt tour Nhật Bản",
    "tour châu Âu",
    "ABTRIP tour",
  ],
  metadataBase: new URL(BASE_URL),
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Tour Du Lịch Thiết Kế Riêng & Luxury Travel | ABTRIP",
    description:
      "Tour du lịch thiết kế theo yêu cầu, incentive doanh nghiệp, luxury travel. Tư vấn lịch trình cá nhân hoá.",
    url: PAGE_URL,
    type: "website",
    locale: "vi_VN",
    images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "Tour Du Lịch ABTRIP" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tour Thiết Kế Riêng & Incentive | ABTRIP",
    description: "Tour du lịch thiết kế riêng, incentive, luxury travel.",
  },
  robots: { index: true, follow: true },
};

export default function TourLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
