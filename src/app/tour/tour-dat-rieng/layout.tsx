import { Metadata } from "next";

const BASE_URL = "https://abtrip.vn";
const PAGE_URL = `${BASE_URL}/tour/tour-dat-rieng`;

export const metadata: Metadata = {
  title: "Tour Đặt Riêng Theo Yêu Cầu, Private Tour Cao Cấp",
  description:
    "Tour du lịch đặt riêng theo yêu cầu: lịch trình cá nhân hoá, hướng dẫn viên riêng, xe đưa đón riêng, khách sạn 5 sao. Phù hợp honeymoon, gia đình, nhóm bạn thân.",
  keywords: [
    "tour đặt riêng",
    "private tour Việt Nam",
    "tour thiết kế theo yêu cầu",
    "tour honeymoon",
    "tour gia đình",
    "ABTRIP private tour",
  ],
  metadataBase: new URL(BASE_URL),
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Tour Đặt Riêng Theo Yêu Cầu & Private Tour | ABTRIP",
    description: "Tour riêng lịch trình cá nhân hoá, hướng dẫn viên riêng, khách sạn 5 sao.",
    url: PAGE_URL,
    type: "website",
    locale: "vi_VN",
    images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "Tour Đặt Riêng ABTRIP" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tour Đặt Riêng & Private Tour | ABTRIP",
    description: "Tour riêng cá nhân hoá, hướng dẫn viên riêng.",
  },
  robots: { index: true, follow: true },
};

export default function TourDatRiengLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
