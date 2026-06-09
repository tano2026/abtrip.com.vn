import { Metadata } from "next";

const BASE_URL = "https://abtrip.vn";
const PAGE_URL = `${BASE_URL}/khach-san`;

export const metadata: Metadata = {
  title: "Đặt Phòng Khách Sạn Giá Đại Lý B2B, Resort 5 Sao",
  description:
    "Đặt phòng khách sạn 5 sao, resort cao cấp Vinpearl, Sun Group giá đại lý B2B, chiết khấu lên tới 25%. ABTRIP – đối tác chiến lược cấp 1 của các chuỗi khách sạn lớn Việt Nam.",
  keywords: [
    "đặt phòng khách sạn B2B",
    "khách sạn 5 sao giá đại lý",
    "Vinpearl Resort giá rẻ",
    "Sun Group hotel chiết khấu",
    "resort cao cấp Việt Nam",
    "đặt phòng doanh nghiệp",
    "ABTRIP khách sạn",
  ],
  metadataBase: new URL(BASE_URL),
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Đặt Phòng Khách Sạn Giá B2B, Resort 5 Sao | ABTRIP",
    description: "Khách sạn 5 sao, resort Vinpearl & Sun Group giá đại lý, chiết khấu tới 25%.",
    url: PAGE_URL,
    type: "website",
    locale: "vi_VN",
    images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "Khách Sạn ABTRIP" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Khách Sạn Giá Đại Lý B2B | ABTRIP",
    description: "Khách sạn 5 sao, resort cao cấp giá đại lý chiết khấu tới 25%.",
  },
  robots: { index: true, follow: true },
};

export default function KhachSanLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
