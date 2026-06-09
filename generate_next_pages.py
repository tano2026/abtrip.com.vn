import os

base_dir = "src/app"

pages = [
    {
        "slug": "dich-vu-san-bay",
        "title": "Dịch Vụ Sân Bay VIP",
        "bgImage": "https://images.unsplash.com/photo-1499063078284-f78f7d89616a?q=80&w=2064&auto=format&fit=crop",
        "heroTitle": "Trải Nghiệm VIP Từ Khi Bước Xuống Xe",
        "heroSubtitle": "Cung cấp Fastrack, Phòng chờ thương gia cao cấp, Thu đổi ngoại tệ và Sim du lịch.",
        "featuresTitle": "Các Dịch Vụ Sân Bay",
        "features": """[
            { title: "Fastrack - Đón tiễn ưu tiên", description: "Đặc quyền qua cổng an ninh và hải quan nhanh chóng không phải xếp hàng chờ đợi.", icon: <Luggage className="w-8 h-8" /> },
            { title: "Phòng chờ Thương gia", description: "Trải nghiệm thư giãn trước chuyến bay tại các phòng chờ VIP hạng sang.", icon: <Coffee className="w-8 h-8" /> },
            { title: "Thu đổi Ngoại tệ", description: "Hỗ trợ tỷ giá tốt nhất, an toàn và tiện lợi ngay tại các ga quốc tế.", icon: <Banknote className="w-8 h-8" /> },
            { title: "Sim Du lịch Quốc tế", description: "Kết nối 4G/5G toàn cầu ngay khi hạ cánh, không lo mất liên lạc.", icon: <Wifi className="w-8 h-8" /> },
        ]""",
        "imports": "import { Luggage, Coffee, Banknote, Wifi } from 'lucide-react';"
    },
    {
        "slug": "ho-chieu",
        "title": "Hộ Chiếu Online",
        "bgImage": "https://images.unsplash.com/photo-1544463870-137a8ee8cb2c?q=80&w=1974&auto=format&fit=crop",
        "heroTitle": "Làm Hộ Chiếu Online Siêu Tốc",
        "heroSubtitle": "Tiết kiệm thời gian vàng bạc của bạn. Xử lý hồ sơ trọn gói, trả kết quả tận nhà.",
        "featuresTitle": "Ưu Điểm Dịch Vụ",
        "features": """[
            { title: "Nhanh Chóng", description: "Giải quyết các ca khẩn cấp cần xuất cảnh gấp chỉ trong vòng vài ngày làm việc.", icon: <Zap className="w-8 h-8" /> },
            { title: "Tại Nhà 100%", description: "Nộp hồ sơ trực tuyến, hỗ trợ chụp ảnh chuẩn ICAO, gửi hộ chiếu tận tay.", icon: <Home className="w-8 h-8" /> },
        ]""",
        "imports": "import { Zap, Home } from 'lucide-react';"
    },
    {
        "slug": "visa",
        "title": "Visa Các Nước",
        "bgImage": "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop",
        "heroTitle": "Tỷ Lệ Đậu Visa 99% Thị Trường Khó",
        "heroSubtitle": "Chuyên xử lý visa công tác, thăm thân, du lịch các nước: Mỹ, Châu Âu, Úc, Canada.",
        "featuresTitle": "Giải Pháp Visa Đặc Quyền",
        "features": """[
            { title: "Đánh giá Hồ sơ Chuyên sâu", description: "Cố vấn tài chính và công việc để tối ưu tỷ lệ đậu cho từng khách hàng cụ thể.", icon: <FileSearch className="w-8 h-8" /> },
            { title: "Tư vấn 1-1", description: "Theo sát tiến độ, hỗ trợ chuẩn bị phỏng vấn chi tiết để mang lại sự tự tin tuyệt đối.", icon: <MessageSquare className="w-8 h-8" /> },
        ]""",
        "imports": "import { FileSearch, MessageSquare } from 'lucide-react';"
    },
    {
        "slug": "tour",
        "title": "Tour Du Lịch Cao Cấp",
        "bgImage": "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=2070&auto=format&fit=crop",
        "heroTitle": "Khám Phá Thế Giới Đẳng Cấp 5 Sao",
        "heroSubtitle": "Từ những chuyến du ngoạn riêng tư (Free & Easy) đến các tour Incentive đặc quyền.",
        "featuresTitle": "Hành Trình Được Thiết Kế Riêng",
        "features": """[
            { title: "Tour Quốc Tế Tuyển Chọn", description: "Khám phá Châu Âu cổ kính, Nhật Bản tinh tế hay Maldives lãng mạn.", icon: <Map className="w-8 h-8" /> },
            { title: "Incentive Tours", description: "Chuyến đi khen thưởng doanh nghiệp được cá nhân hóa hoàn toàn với ngân sách tối ưu.", icon: <Users className="w-8 h-8" /> },
        ]""",
        "imports": "import { Map, Users } from 'lucide-react';"
    },
    {
        "slug": "mice",
        "title": "MICE & Sự Kiện",
        "bgImage": "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2069&auto=format&fit=crop",
        "heroTitle": "Kiến Tạo Sự Kiện Tầm Cỡ Doanh Nghiệp",
        "heroSubtitle": "Tổ chức Hội nghị cấp cao, Year-End Party, Gala Dinner hoành tráng và chuyên nghiệp.",
        "featuresTitle": "Năng Lực Sự Kiện",
        "features": """[
            { title: "Hội Nghị Cấp Cao", description: "Set-up hội trường 5 sao, hệ thống âm thanh ánh sáng đạt chuẩn quốc tế.", icon: <Mic className="w-8 h-8" /> },
            { title: "Gala Dinner", description: "Kịch bản chương trình độc quyền, đạo diễn sân khấu chuyên nghiệp, nâng tầm thương hiệu.", icon: <PartyPopper className="w-8 h-8" /> },
        ]""",
        "imports": "import { Mic, PartyPopper } from 'lucide-react';"
    }
]

for page in pages:
    dir_path = os.path.join(base_dir, page["slug"])
    os.makedirs(dir_path, exist_ok=True)
    
    file_content = f"""import ServicePage from "@/components/ServicePage";
{page["imports"]}

export default function Page() {{
  const features = {page["features"]};

  return (
    <ServicePage
      title="{page["heroTitle"]}"
      subtitle="{page["heroSubtitle"]}"
      bgImage="{page["bgImage"]}"
      featuresTitle="{page["featuresTitle"]}"
      features={{features}}
      serviceName="{page["title"]}"
    />
  );
}}
"""
    with open(os.path.join(dir_path, "page.tsx"), "w", encoding="utf-8") as f:
        f.write(file_content)
    print(f"Created {page['slug']}/page.tsx")
