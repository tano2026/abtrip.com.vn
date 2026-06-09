import { Metadata } from "next";

const BASE_URL = "https://abtrip.vn";
const PAGE_URL = `${BASE_URL}/dich-vu-mat-dat/chuyen-co-thue-chuyen`;

export const metadata: Metadata = {
  title: "Chuyên Cơ VIP & Thuê Chuyến Bay Charter Việt Nam",
  description:
    "Dịch vụ thuê máy bay riêng (charter flight) và chuyên cơ VIP tại Việt Nam: linh hoạt lịch bay, không gian riêng tư tuyệt đối, phù hợp doanh nhân cao cấp và đoàn ngoại giao.",
  keywords: [
    "thuê máy bay riêng",
    "charter flight Việt Nam",
    "chuyên cơ VIP",
    "thuê chuyến bay nguyên chuyến",
    "private jet Việt Nam",
    "ABTRIP chuyên cơ",
  ],
  metadataBase: new URL(BASE_URL),
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Chuyên Cơ VIP & Charter Flight Việt Nam | ABTRIP",
    description: "Thuê máy bay riêng & chuyên cơ VIP: linh hoạt lịch bay, riêng tư tuyệt đối.",
    url: PAGE_URL,
    type: "website",
    locale: "vi_VN",
    images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "Chuyên Cơ ABTRIP" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chuyên Cơ & Charter Flight | ABTRIP",
    description: "Thuê máy bay riêng, chuyên cơ VIP.",
  },
  robots: { index: true, follow: true },
};

export default function ChuyenCoThueChuyenLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
