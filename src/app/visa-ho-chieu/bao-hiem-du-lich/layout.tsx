import { Metadata } from "next";

const BASE_URL = "https://abtrip.vn";
const PAGE_URL = `${BASE_URL}/visa-ho-chieu/bao-hiem-du-lich`;

export const metadata: Metadata = {
  title: "Bảo Hiểm Du Lịch Quốc Tế, Đáp Ứng Tiêu Chuẩn Visa Schengen",
  description:
    "Mua bảo hiểm du lịch quốc tế online: đáp ứng tiêu chuẩn visa Schengen (tối thiểu 30.000 EUR), bảo hiểm y tế khẩn cấp toàn cầu, hành lý và chậm chuyến bay.",
  keywords: [
    "bảo hiểm du lịch quốc tế",
    "bảo hiểm visa Schengen",
    "mua bảo hiểm du lịch online",
    "bảo hiểm y tế du lịch",
    "travel insurance Việt Nam",
    "ABTRIP bảo hiểm",
  ],
  metadataBase: new URL(BASE_URL),
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Bảo Hiểm Du Lịch Quốc Tế Chuẩn Visa Schengen | ABTRIP",
    description: "Bảo hiểm du lịch quốc tế chuẩn Schengen 30.000 EUR, y tế khẩn cấp, hành lý.",
    url: PAGE_URL,
    type: "website",
    locale: "vi_VN",
    images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "Bảo Hiểm Du Lịch ABTRIP" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bảo Hiểm Du Lịch Quốc Tế | ABTRIP",
    description: "Bảo hiểm du lịch chuẩn Schengen, y tế khẩn cấp toàn cầu.",
  },
  robots: { index: true, follow: true },
};

export default function BaoHiemDuLichLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
