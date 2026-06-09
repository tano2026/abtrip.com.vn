import { Metadata } from "next";

const BASE_URL = "https://abtrip.vn";
const PAGE_URL = `${BASE_URL}/ve-may-bay/tich-hop-api`;

export const metadata: Metadata = {
  title: "Tích Hợp API Đặt Vé Máy Bay & Hàng Không Cho Doanh Nghiệp",
  description:
    "API đặt vé máy bay và dịch vụ hàng không cho doanh nghiệp, OTA, startup du lịch. Tích hợp nhanh, tài liệu đầy đủ, hỗ trợ kỹ thuật 24/7. ABTRIP cung cấp API GDS/NDC.",
  keywords: [
    "API đặt vé máy bay",
    "tích hợp API hàng không",
    "GDS API Việt Nam",
    "NDC API booking",
    "API du lịch B2B",
    "ABTRIP API",
  ],
  metadataBase: new URL(BASE_URL),
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Tích Hợp API Đặt Vé Máy Bay GDS/NDC | ABTRIP",
    description: "API vé máy bay GDS/NDC cho doanh nghiệp, OTA. Tích hợp nhanh, hỗ trợ 24/7.",
    url: PAGE_URL,
    type: "website",
    locale: "vi_VN",
    images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "API Hàng Không ABTRIP" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "API Đặt Vé Máy Bay GDS/NDC | ABTRIP",
    description: "API vé máy bay cho doanh nghiệp, OTA, startup.",
  },
  robots: { index: true, follow: true },
};

export default function TichHopApiLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
