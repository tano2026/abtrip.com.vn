import { Metadata } from "next";

const BASE_URL = "https://abtrip.vn";
const PAGE_URL = `${BASE_URL}/dich-vu-mat-dat/cap-phep-bay`;

export const metadata: Metadata = {
  title: "Xin Giấy Phép Bay, Overflight & Landing Permit Việt Nam",
  description:
    "Dịch vụ xin giấy phép bay, overflight permit và landing permit tại Việt Nam cho tàu bay nước ngoài. Xử lý nhanh 24–48 giờ, hỗ trợ slot sân bay, ABTRIP đối tác CAAV.",
  keywords: [
    "xin giấy phép bay Việt Nam",
    "overflight permit",
    "landing permit Việt Nam",
    "cấp phép bay",
    "slot sân bay",
    "ABTRIP cấp phép bay",
  ],
  metadataBase: new URL(BASE_URL),
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Xin Giấy Phép Bay, Overflight & Landing Permit | ABTRIP",
    description: "Giấy phép bay, overflight & landing permit Việt Nam. Xử lý nhanh 24–48 giờ.",
    url: PAGE_URL,
    type: "website",
    locale: "vi_VN",
    images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "Cấp Phép Bay ABTRIP" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cấp Phép Bay & Landing Permit Việt Nam | ABTRIP",
    description: "Giấy phép bay, overflight, landing permit. Xử lý 24–48 giờ.",
  },
  robots: { index: true, follow: true },
};

export default function CapPhepBayLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
