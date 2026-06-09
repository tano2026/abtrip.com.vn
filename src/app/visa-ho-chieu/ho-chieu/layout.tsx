import { Metadata } from "next";

const BASE_URL = "https://abtrip.vn";
const PAGE_URL = `${BASE_URL}/visa-ho-chieu/ho-chieu`;

export const metadata: Metadata = {
  title: "Hỗ Trợ Làm Hộ Chiếu Trực Tuyến Nhanh, Lấy Khẩn 1–3 Ngày",
  description:
    "Hỗ trợ làm hộ chiếu trực tuyến qua VNeID cấp độ 2: chuẩn hoá ảnh AI, điền tờ khai chuẩn, nộp thay và xử lý khẩn lấy trong 1–3 ngày làm việc khi cần bay gấp.",
  keywords: [
    "làm hộ chiếu online",
    "hộ chiếu khẩn 1 ngày",
    "hỗ trợ hộ chiếu VNeID",
    "cấp hộ chiếu nhanh",
    "gia hạn hộ chiếu",
    "ABTRIP hộ chiếu",
  ],
  metadataBase: new URL(BASE_URL),
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Hỗ Trợ Làm Hộ Chiếu Online, Khẩn 1–3 Ngày | ABTRIP",
    description: "Hộ chiếu online VNeID: chuẩn hoá ảnh AI, điền tờ khai, nộp thay, khẩn 1–3 ngày.",
    url: PAGE_URL,
    type: "website",
    locale: "vi_VN",
    images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "Hộ Chiếu ABTRIP" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hộ Chiếu Online, Khẩn 1–3 Ngày | ABTRIP",
    description: "Hỗ trợ hộ chiếu VNeID, khẩn 1–3 ngày.",
  },
  robots: { index: true, follow: true },
};

export default function HoChieuLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
