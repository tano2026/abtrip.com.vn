import { Metadata } from "next";

const BASE_URL = "https://abtrip.vn";
const PAGE_URL = `${BASE_URL}/dich-vu-mat-dat/ky-thuat-san-do`;

export const metadata: Metadata = {
  title: "Kỹ Thuật Sân Đỗ, Ramp Services & Tiếp Nhiên Liệu Jet A-1",
  description:
    "Dịch vụ kỹ thuật sân đỗ (Ramp Services) chuyên nghiệp: tiếp nhiên liệu Jet A-1, phục vụ mặt đất tàu bay, cung ứng GPU/ASU, dọn dẹp buồng lái tại sân bay Việt Nam.",
  keywords: [
    "kỹ thuật sân đỗ",
    "ramp services Việt Nam",
    "tiếp nhiên liệu Jet A-1",
    "phục vụ mặt đất tàu bay",
    "ground handling Vietnam",
    "ABTRIP ramp services",
  ],
  metadataBase: new URL(BASE_URL),
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Kỹ Thuật Sân Đỗ & Ramp Services Hàng Không | ABTRIP",
    description: "Ramp services: tiếp nhiên liệu Jet A-1, GPU/ASU, phục vụ mặt đất tàu bay.",
    url: PAGE_URL,
    type: "website",
    locale: "vi_VN",
    images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "Ramp Services ABTRIP" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kỹ Thuật Sân Đỗ & Ramp Services | ABTRIP",
    description: "Ramp services, tiếp nhiên liệu Jet A-1, kỹ thuật mặt đất.",
  },
  robots: { index: true, follow: true },
};

export default function KyThuatSanDoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
