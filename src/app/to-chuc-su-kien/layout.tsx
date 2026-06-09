import { Metadata } from "next";

const BASE_URL = "https://abtrip.vn";
const PAGE_URL = `${BASE_URL}/to-chuc-su-kien`;

export const metadata: Metadata = {
  title: "Tổ Chức Sự Kiện Doanh Nghiệp, MICE & Team Building",
  description:
    "Tổ chức hội nghị, hội thảo, sự kiện doanh nghiệp MICE, team building, gala dinner và các chương trình incentive du lịch cao cấp. ABTRIP – đối tác tổ chức sự kiện uy tín.",
  keywords: [
    "tổ chức sự kiện doanh nghiệp",
    "MICE Việt Nam",
    "team building",
    "hội nghị hội thảo",
    "gala dinner",
    "incentive tour doanh nghiệp",
    "ABTRIP sự kiện",
  ],
  metadataBase: new URL(BASE_URL),
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Tổ Chức Sự Kiện MICE, Team Building & Incentive | ABTRIP",
    description: "Tổ chức hội nghị, MICE, team building, gala dinner, incentive tour doanh nghiệp.",
    url: PAGE_URL,
    type: "website",
    locale: "vi_VN",
    images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "Tổ Chức Sự Kiện ABTRIP" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tổ Chức Sự Kiện & MICE | ABTRIP",
    description: "Hội nghị, MICE, team building, incentive tour doanh nghiệp.",
  },
  robots: { index: true, follow: true },
};

export default function ToChucSuKienLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
