import { Metadata } from "next";

const BASE_URL = "https://abtrip.vn";
const PAGE_URL = `${BASE_URL}/ve-may-bay/tmc`;

export const metadata: Metadata = {
  title: "Giải Pháp TMC Quản Lý Công Tác Doanh Nghiệp Toàn Diện",
  description:
    "Nền tảng TMC (Travel Management Company) quản lý công tác doanh nghiệp: tự động hóa đặt vé & khách sạn, kiểm soát ngân sách công tác phí, báo cáo chi tiêu thời gian thực.",
  keywords: [
    "TMC doanh nghiệp",
    "Travel Management Company",
    "quản lý công tác phí",
    "phần mềm đặt vé doanh nghiệp",
    "tự động hóa công tác",
    "ABTRIP TMC",
  ],
  metadataBase: new URL(BASE_URL),
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Giải Pháp TMC Quản Lý Công Tác Doanh Nghiệp | ABTRIP",
    description: "TMC tự động hóa đặt vé & khách sạn, kiểm soát ngân sách, báo cáo thời gian thực.",
    url: PAGE_URL,
    type: "website",
    locale: "vi_VN",
    images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "TMC ABTRIP" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Giải Pháp TMC Doanh Nghiệp | ABTRIP",
    description: "TMC tự động hóa công tác, kiểm soát ngân sách.",
  },
  robots: { index: true, follow: true },
};

export default function TmcLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
