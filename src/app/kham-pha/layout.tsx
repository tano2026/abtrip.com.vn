import type { Metadata } from "next";
import { BlogProvider } from "@/context/BlogContext";

export const metadata: Metadata = {
  title: "Khám Phá Thế Giới",
  description:
    "Cẩm nang du lịch ABTRIP — Điểm đến nổi bật, ẩm thực địa phương, văn hóa & lễ hội, mẹo du lịch tiết kiệm cho người Việt. Từ Đông Nam Á đến Châu Âu, Nhật Bản, Hàn Quốc.",
  keywords: [
    "cẩm nang du lịch",
    "điểm đến nổi bật",
    "du lịch Nhật Bản",
    "du lịch Châu Âu",
    "ẩm thực địa phương",
    "kinh nghiệm du lịch",
    "mẹo du lịch tiết kiệm",
    "tour du lịch ABTRIP",
  ],
  openGraph: {
    title: "Khám Phá Thế Giới | ABTRIP",
    description:
      "Điểm đến, ẩm thực, văn hóa & mẹo du lịch từ đội ngũ chuyên gia ABTRIP.",
  },
};

export default function KhamPhaLayout({ children }: { children: React.ReactNode }) {
  return <BlogProvider>{children}</BlogProvider>;
}
