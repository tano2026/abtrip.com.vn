import { Metadata } from "next";

const BASE_URL = "https://abtrip.vn";
const PAGE_URL = `${BASE_URL}/dich-vu-san-bay/doi-ngoai-te`;

export const metadata: Metadata = {
  title: "Đổi Ngoại Tệ Tại Sân Bay - Tỷ Giá Tốt, Có Biên Lai",
  description:
    "Đổi ngoại tệ tại sân bay Nội Bài & Tân Sơn Nhất với tỷ giá cạnh tranh, có biên lai xác nhận, đổi được 30+ loại tiền tệ phổ biến (USD, EUR, JPY, KRW, THB...).",
  keywords: [
    "đổi ngoại tệ sân bay",
    "tỷ giá tốt sân bay",
    "đổi tiền Nội Bài",
    "đổi tiền Tân Sơn Nhất",
    "đổi USD EUR JPY",
    "ABTRIP ngoại tệ",
  ],
  metadataBase: new URL(BASE_URL),
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Đổi Ngoại Tệ Sân Bay Tỷ Giá Tốt | ABTRIP",
    description: "Đổi 30+ ngoại tệ tại HAN & SGN, tỷ giá cạnh tranh, có biên lai.",
    url: PAGE_URL,
    type: "website",
    locale: "vi_VN",
    images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "Đổi Ngoại Tệ ABTRIP" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Đổi Ngoại Tệ Sân Bay | ABTRIP",
    description: "Đổi 30+ ngoại tệ, tỷ giá tốt, có biên lai.",
  },
  robots: { index: true, follow: true },
};

export default function DoiNgoaiTeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
