import { Metadata } from "next";

const BASE_URL = "https://abtrip.vn";
const PAGE_URL = `${BASE_URL}/tour/tour-ghep`;

export const metadata: Metadata = {
  title: "Tour Ghép Đoàn Trong Nước & Quốc Tế Khởi Hành Hàng Tuần",
  description:
    "Tour ghép đoàn khởi hành hàng tuần: tour trong nước (Phú Quốc, Đà Nẵng, Hội An) và quốc tế (Nhật Bản, Hàn Quốc, Thái Lan, châu Âu). Giá tốt, dịch vụ chất lượng cao.",
  keywords: [
    "tour ghép đoàn",
    "tour Nhật Bản khởi hành hàng tuần",
    "tour Thái Lan giá rẻ",
    "tour Hàn Quốc",
    "tour Phú Quốc",
    "tour châu Âu",
    "ABTRIP tour ghép",
  ],
  metadataBase: new URL(BASE_URL),
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Tour Ghép Đoàn Trong Nước & Quốc Tế | ABTRIP",
    description: "Tour ghép đoàn khởi hành hàng tuần: trong nước và quốc tế giá tốt.",
    url: PAGE_URL,
    type: "website",
    locale: "vi_VN",
    images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "Tour Ghép Đoàn ABTRIP" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tour Ghép Đoàn | ABTRIP",
    description: "Tour ghép đoàn khởi hành hàng tuần.",
  },
  robots: { index: true, follow: true },
};

export default function TourGhepLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
