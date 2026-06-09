import { Metadata } from "next";

const BASE_URL = "https://abtrip.vn";
const PAGE_URL = `${BASE_URL}/dich-vu-mat-dat/ho-tro-phi-hanh-doan`;

export const metadata: Metadata = {
  title: "Hỗ Trợ Phi Hành Đoàn & Crew Support Tại Sân Bay Việt Nam",
  description:
    "Dịch vụ hỗ trợ phi hành đoàn (Crew Support) tại các sân bay Việt Nam: đưa đón khách sạn layover, visa phi hành đoàn, catering bay, phòng nghỉ phi hành đoàn.",
  keywords: [
    "hỗ trợ phi hành đoàn",
    "crew support sân bay",
    "crew visa Việt Nam",
    "layover hotel phi hành đoàn",
    "airline crew support",
    "ABTRIP crew support",
  ],
  metadataBase: new URL(BASE_URL),
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Hỗ Trợ Phi Hành Đoàn & Crew Support | ABTRIP",
    description: "Crew support sân bay VN: đưa đón layover, crew visa, catering, phòng nghỉ.",
    url: PAGE_URL,
    type: "website",
    locale: "vi_VN",
    images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "Crew Support ABTRIP" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Crew Support Phi Hành Đoàn | ABTRIP",
    description: "Hỗ trợ phi hành đoàn tại sân bay Việt Nam.",
  },
  robots: { index: true, follow: true },
};

export default function HoTroPhiHanhDoanLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
