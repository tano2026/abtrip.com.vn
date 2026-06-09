import { Metadata } from "next";

const BASE_URL = "https://abtrip.vn";
const PAGE_URL = `${BASE_URL}/dich-vu-mat-dat`;

export const metadata: Metadata = {
  title: "Dịch Vụ Mặt Đất Sân Bay & Hậu Cần Hàng Không B2B",
  description:
    "Dịch vụ mặt đất sân bay chuyên nghiệp: đại diện hãng hàng không, cấp phép bay, chuyên cơ thuê chuyến, hỗ trợ phi hành đoàn, kỹ thuật sân đỗ. ABTRIP – đối tác hàng không B2B.",
  keywords: [
    "dịch vụ mặt đất sân bay",
    "đại diện hãng hàng không",
    "cấp phép bay Việt Nam",
    "chuyên cơ thuê chuyến",
    "hỗ trợ phi hành đoàn",
    "kỹ thuật sân đỗ",
    "ABTRIP mặt đất",
  ],
  metadataBase: new URL(BASE_URL),
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Dịch Vụ Mặt Đất Sân Bay & Hậu Cần Hàng Không | ABTRIP",
    description:
      "Đại diện hãng, cấp phép bay, chuyên cơ, hỗ trợ phi hành đoàn, kỹ thuật sân đỗ.",
    url: PAGE_URL,
    type: "website",
    locale: "vi_VN",
    images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "Dịch Vụ Mặt Đất ABTRIP" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dịch Vụ Mặt Đất & Hậu Cần Hàng Không | ABTRIP",
    description: "Đại diện hãng, cấp phép bay, chuyên cơ, kỹ thuật sân đỗ.",
  },
  robots: { index: true, follow: true },
};

export default function DichVuMatDatLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
