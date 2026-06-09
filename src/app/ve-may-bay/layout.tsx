import { Metadata } from "next";

const BASE_URL = "https://abtrip.vn";
const PAGE_URL = `${BASE_URL}/ve-may-bay`;

export const metadata: Metadata = {
  title: "Vé Máy Bay Giá Tốt: Doanh Nghiệp B2B, Vé Đoàn, Tích Hợp API",
  description:
    "Đặt vé máy bay giá tốt nhất dành cho doanh nghiệp B2B, vé đoàn chiết khấu cao, tích hợp API booking hàng không. ABTRIP – đại lý vé máy bay uỷ quyền chính thức các hãng lớn.",
  keywords: [
    "vé máy bay doanh nghiệp",
    "đặt vé máy bay B2B",
    "vé máy bay giá rẻ",
    "vé đoàn giảm giá",
    "API đặt vé máy bay",
    "đại lý vé máy bay Hà Nội",
    "ABTRIP vé máy bay",
  ],
  metadataBase: new URL(BASE_URL),
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Vé Máy Bay Doanh Nghiệp, Vé Đoàn & API Booking | ABTRIP",
    description:
      "Vé máy bay B2B, vé đoàn chiết khấu cao, tích hợp API hàng không. Đại lý uỷ quyền chính thức.",
    url: PAGE_URL,
    type: "website",
    locale: "vi_VN",
    images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "Vé Máy Bay ABTRIP" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vé Máy Bay Doanh Nghiệp & B2B | ABTRIP",
    description: "Vé máy bay B2B, đoàn, API booking. Đại lý uỷ quyền chính thức.",
  },
  robots: { index: true, follow: true },
};

export default function VeMayBayLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
