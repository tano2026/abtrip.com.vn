import { Metadata } from "next";
import { BlogProvider } from "@/context/BlogContext";

const BASE_URL = "https://abtrip.vn";
const PAGE_URL = `${BASE_URL}/blog`;

export const metadata: Metadata = {
  title: "Blog & Cẩm Nang Du Lịch - Visa, Sân Bay, Tour",
  description:
    "Cẩm nang du lịch ABTRIP: hướng dẫn làm hộ chiếu online VNeID, thủ tục visa các nước, kinh nghiệm Fastrack sân bay VIP, quản lý công tác doanh nghiệp và mẹo du lịch cao cấp.",
  keywords: [
    "cẩm nang du lịch",
    "blog du lịch Việt Nam",
    "hướng dẫn làm visa",
    "kinh nghiệm đặt phòng khách sạn",
    "dịch vụ fastrack sân bay",
    "hộ chiếu online VNeID",
    "ABTRIP blog",
    "tin tức du lịch 2026",
  ],
  metadataBase: new URL(BASE_URL),
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Blog & Cẩm Nang Du Lịch | ABTRIP",
    description:
      "Cẩm nang du lịch ABTRIP: hướng dẫn làm hộ chiếu, visa, fastrack sân bay VIP và mẹo công tác doanh nghiệp.",
    url: PAGE_URL,
    type: "website",
    locale: "vi_VN",
    images: [
      {
        url: `${BASE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "ABTRIP Blog & Cẩm Nang Du Lịch",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog & Cẩm Nang Du Lịch | ABTRIP",
    description:
      "Cẩm nang du lịch ABTRIP: hướng dẫn làm hộ chiếu, visa, fastrack sân bay VIP.",
  },
  robots: { index: true, follow: true },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <BlogProvider>{children}</BlogProvider>;
}
