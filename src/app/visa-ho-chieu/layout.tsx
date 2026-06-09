import { Metadata } from "next";

const BASE_URL = "https://abtrip.vn";
const PAGE_URL = `${BASE_URL}/visa-ho-chieu`;

export const metadata: Metadata = {
  title: "Dịch Vụ Visa Quốc Tế & Hỗ Trợ Hộ Chiếu Trực Tuyến",
  description:
    "Dịch vụ xin visa Mỹ, Schengen, Úc, Nhật, Hàn Quốc và hỗ trợ làm hộ chiếu trực tuyến nhanh, lấy khẩn 1–3 ngày. ABTRIP xử lý hồ sơ chuẩn xác, tỷ lệ đậu cao.",
  keywords: [
    "dịch vụ visa du lịch",
    "xin visa Mỹ",
    "visa Schengen",
    "làm hộ chiếu online",
    "hộ chiếu khẩn cấp",
    "bảo hiểm du lịch Schengen",
    "ABTRIP visa",
  ],
  metadataBase: new URL(BASE_URL),
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Dịch Vụ Visa Quốc Tế & Hộ Chiếu Trực Tuyến | ABTRIP",
    description:
      "Xin visa Mỹ, Schengen, Úc, Nhật, Hàn. Hỗ trợ hộ chiếu online khẩn 1–3 ngày. Tỷ lệ đậu cao.",
    url: PAGE_URL,
    type: "website",
    locale: "vi_VN",
    images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "Dịch Vụ Visa ABTRIP" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Visa Quốc Tế & Hộ Chiếu Online | ABTRIP",
    description: "Visa Mỹ, Schengen, Úc, Nhật, Hàn. Hộ chiếu khẩn 1–3 ngày.",
  },
  robots: { index: true, follow: true },
};

export default function VisaHoChieuLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
