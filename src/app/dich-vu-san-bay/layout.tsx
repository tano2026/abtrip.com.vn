import { Metadata } from "next";

const BASE_URL = "https://abtrip.vn";
const PAGE_URL = `${BASE_URL}/dich-vu-san-bay`;

export const metadata: Metadata = {
  title: "Dịch Vụ Sân Bay VIP: Fastrack, Phòng Chờ Thương Gia, SIM",
  description:
    "Dịch vụ sân bay VIP trọn gói tại Nội Bài (HAN), Tân Sơn Nhất (SGN), Đà Nẵng (DAD): VIP Fastrack làm thủ tục ưu tiên, phòng chờ thương gia, mua vé khẩn, SIM/WiFi du lịch.",
  keywords: [
    "fastrack sân bay",
    "dịch vụ sân bay VIP",
    "phòng chờ thương gia",
    "fast check-in sân bay Nội Bài",
    "đón tiễn VIP Tân Sơn Nhất",
    "dịch vụ hàng không cao cấp",
    "ABTRIP sân bay",
  ],
  metadataBase: new URL(BASE_URL),
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Dịch Vụ Sân Bay VIP: Fastrack, Phòng Chờ, SIM | ABTRIP",
    description:
      "Fastrack VIP, phòng chờ thương gia, fast check-in, SIM/WiFi du lịch tại HAN, SGN, DAD. Đặt dịch vụ 24/7.",
    url: PAGE_URL,
    type: "website",
    locale: "vi_VN",
    images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "Dịch Vụ Sân Bay VIP ABTRIP" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dịch Vụ Sân Bay VIP | ABTRIP",
    description: "Fastrack, phòng chờ thương gia, fast check-in, SIM du lịch tại HAN, SGN, DAD.",
  },
  robots: { index: true, follow: true },
  other: {
    "geo.region": "VN",
    "geo.placename": "Việt Nam",
  },
};

export default function DichVuSanBayLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
