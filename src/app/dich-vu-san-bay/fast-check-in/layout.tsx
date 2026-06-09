import { Metadata } from "next";

const BASE_URL = "https://abtrip.vn";
const PAGE_URL = `${BASE_URL}/dich-vu-san-bay/fast-check-in`;

export const metadata: Metadata = {
  title: "Fast Check-in Sân Bay Ưu Tiên Nội Bài & Tân Sơn Nhất",
  description:
    "Dịch vụ Fast Check-in ưu tiên tại sân bay Nội Bài (HAN) và Tân Sơn Nhất (SGN): quầy làm thủ tục riêng, ký gửi hành lý nhanh, không xếp hàng chờ đợi.",
  keywords: [
    "fast check-in sân bay",
    "check-in ưu tiên Nội Bài",
    "check-in nhanh Tân Sơn Nhất",
    "ký gửi hành lý nhanh",
    "ABTRIP fast check-in",
  ],
  metadataBase: new URL(BASE_URL),
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Fast Check-in Ưu Tiên Sân Bay | ABTRIP",
    description: "Fast Check-in ưu tiên HAN, SGN: quầy riêng, ký gửi hành lý nhanh, không xếp hàng.",
    url: PAGE_URL,
    type: "website",
    locale: "vi_VN",
    images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "Fast Check-in ABTRIP" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fast Check-in Sân Bay Ưu Tiên | ABTRIP",
    description: "Check-in ưu tiên, không xếp hàng tại HAN & SGN.",
  },
  robots: { index: true, follow: true },
};

export default function FastCheckInLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
