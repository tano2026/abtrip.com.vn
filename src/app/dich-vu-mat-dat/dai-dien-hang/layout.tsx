import { Metadata } from "next";

const BASE_URL = "https://abtrip.vn";
const PAGE_URL = `${BASE_URL}/dich-vu-mat-dat/dai-dien-hang`;

export const metadata: Metadata = {
  title: "Đại Diện Hãng Hàng Không Sân Bay (Station Representation)",
  description:
    "Dịch vụ đại diện hãng hàng không tại các sân bay Việt Nam (Station Representation): xử lý tình huống tàu bay, hỗ trợ hành khách, liên lạc cơ quan sân bay, báo cáo hoạt động.",
  keywords: [
    "đại diện hãng hàng không",
    "station representation",
    "đại diện sân bay",
    "airline representation Vietnam",
    "GSA hàng không",
    "ABTRIP đại diện hãng",
  ],
  metadataBase: new URL(BASE_URL),
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Đại Diện Hãng Hàng Không, Station Representation | ABTRIP",
    description: "Station Representation tại sân bay Việt Nam: xử lý tàu bay, hỗ trợ hành khách.",
    url: PAGE_URL,
    type: "website",
    locale: "vi_VN",
    images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "Đại Diện Hãng ABTRIP" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Đại Diện Hãng & Station Representation | ABTRIP",
    description: "Đại diện hãng hàng không tại sân bay Việt Nam.",
  },
  robots: { index: true, follow: true },
};

export default function DaiDienHangLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
