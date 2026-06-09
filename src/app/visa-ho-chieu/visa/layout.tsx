import { Metadata } from "next";

const BASE_URL = "https://abtrip.vn";
const PAGE_URL = `${BASE_URL}/visa-ho-chieu/visa`;

export const metadata: Metadata = {
  title: "Dịch Vụ Làm Visa Du Lịch, Công Tác Các Nước Trọn Gói",
  description:
    "Dịch vụ xin visa trọn gói: visa Mỹ, Schengen (26 nước châu Âu), Úc, Nhật Bản, Hàn Quốc, Canada. Tư vấn hồ sơ, nộp thay, tỷ lệ đậu cao. ABTRIP xử lý nhanh chóng.",
  keywords: [
    "làm visa Mỹ",
    "xin visa Schengen",
    "visa Nhật Bản",
    "visa Hàn Quốc",
    "dịch vụ visa trọn gói",
    "tư vấn hồ sơ visa",
    "ABTRIP visa",
  ],
  metadataBase: new URL(BASE_URL),
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Làm Visa Mỹ, Schengen, Úc, Nhật, Hàn Trọn Gói | ABTRIP",
    description: "Visa Mỹ, Schengen, Úc, Nhật, Hàn. Tư vấn hồ sơ, nộp thay, tỷ lệ đậu cao.",
    url: PAGE_URL,
    type: "website",
    locale: "vi_VN",
    images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "Dịch Vụ Visa ABTRIP" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dịch Vụ Visa Mỹ, Schengen, Úc, Nhật | ABTRIP",
    description: "Visa Mỹ, Schengen, Úc, Nhật, Hàn trọn gói. Tỷ lệ đậu cao.",
  },
  robots: { index: true, follow: true },
};

export default function VisaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
