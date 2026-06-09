import { Metadata } from "next";

const BASE_URL = "https://abtrip.vn";
const PAGE_URL = `${BASE_URL}/ve-may-bay/doanh-nghiep`;

export const metadata: Metadata = {
  title: "Vé Máy Bay Doanh Nghiệp B2B, Vé Đoàn Chiết Khấu Cao",
  description:
    "Giải pháp vé máy bay doanh nghiệp B2B: hạn mức tín dụng định kỳ, vé đoàn chiết khấu cao, báo cáo công tác tự động, ưu tiên chỗ ngồi. ABTRIP – đối tác TMC cho doanh nghiệp.",
  keywords: [
    "vé máy bay doanh nghiệp",
    "vé đoàn chiết khấu",
    "hạn mức tín dụng vé máy bay",
    "công tác phí doanh nghiệp",
    "TMC Việt Nam",
    "ABTRIP doanh nghiệp",
  ],
  metadataBase: new URL(BASE_URL),
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Vé Máy Bay Doanh Nghiệp B2B & Vé Đoàn | ABTRIP",
    description: "Vé doanh nghiệp B2B, hạn mức tín dụng, vé đoàn chiết khấu cao, báo cáo tự động.",
    url: PAGE_URL,
    type: "website",
    locale: "vi_VN",
    images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "Vé Máy Bay Doanh Nghiệp ABTRIP" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vé Máy Bay Doanh Nghiệp B2B | ABTRIP",
    description: "Vé doanh nghiệp B2B, vé đoàn chiết khấu cao.",
  },
  robots: { index: true, follow: true },
};

export default function DoanhNghiepLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
