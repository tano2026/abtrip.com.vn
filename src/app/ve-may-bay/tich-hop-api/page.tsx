"use client";

import ServiceLandingPage from "@/components/ServiceLandingPage";
import { Settings, ShieldCheck, Clock, Star } from "lucide-react";

export default function Page() {
  const features = [
    {
      title: "NDC & GDS Kết Nối Trực Tiếp",
      description: "Tích hợp trực tiếp hệ thống NDC của Vietnam Airlines, API kết nối Vietjet, Bamboo cùng hệ thống phân phối toàn cầu GDS Sabre, Amadeus.",
      icon: <Settings className="w-6 h-6" />
    },
    {
      title: "Hiệu Năng Phản Hồi Siêu Tốc",
      description: "Tốc độ truy vấn tìm kiếm giá vé và giữ chỗ dưới 3 giây. Tỷ lệ uptime máy chủ đạt 99.99%, chịu tải cao phục vụ hàng triệu query mỗi ngày.",
      icon: <ShieldCheck className="w-6 h-6" />
    },
    {
      title: "Hỗ Trợ Kỹ Thuật IT 24/7",
      description: "Cung cấp tài liệu Swagger chuẩn hóa, mã nguồn mẫu phong phú, môi trường Sandbox thử nghiệm miễn phí và group IT hỗ trợ debug trực tiếp 24/7.",
      icon: <Clock className="w-6 h-6" />
    }
  ];

  const details = [
    {
      title: "Số Hóa Hệ Sinh Thái Dịch Vụ - Tăng Trưởng Doanh Thu Vượt Trội",
      description: "Tích hợp tính năng tìm kiếm, đặt chỗ và xuất vé máy bay tự động trực tiếp vào ứng dụng Ngân hàng (Mobile Banking), Ví điện tử, ứng dụng quản lý doanh nghiệp hoặc website của đại lý lữ hành giúp gia tăng mạnh mẽ trải nghiệm người dùng và mở rộng nguồn doanh thu. Cổng kết nối API của ABTRIP cung cấp luồng dữ liệu chuẩn JSON tối giản, bảo mật SSL/HTTPS cao nhất, đồng hành hỗ trợ tối đa cho các nhà phát triển hệ thống.",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1000",
      bullets: [
        "Kết nối trực tiếp kho vé của các hãng nội địa và quốc tế",
        "Luồng xử lý khép kín: Tìm kiếm -> Giữ chỗ -> Thanh toán -> Xuất vé",
        "Mã hóa dữ liệu bảo mật SSL/TLS cao nhất theo chuẩn tài chính",
        "Hỗ trợ tự động cập nhật lịch trình bay (Schedule Change) thời gian thực"
      ]
    },
    {
      title: "Môi Trường Sandbox Thử Nghiệm Miễn Phí & Tài Liệu Swagger Chi Tiết",
      description: "Chúng tôi cung cấp tài liệu hướng dẫn tích hợp API (Swagger) chi tiết, trực quan kèm theo các mã nguồn mẫu (SDK) bằng nhiều ngôn ngữ lập trình phổ biến (NodeJS, Java, PHP, Python...). Đội ngũ kỹ sư CNTT của ABTRIP sẽ đồng hành hỗ trợ trực tiếp qua group chat để giải quyết nhanh các vấn đề debug kết nối, giúp đối tác rút ngắn thời gian Go-live chỉ từ 3 - 5 ngày làm việc.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000",
      bullets: [
        "Cấp tài khoản Sandbox chạy thử nghiệm đầy đủ tính năng miễn phí",
        "Hỗ trợ tự động hóa hoàn toàn quy trình xuất vé (Auto-issuance)",
        "Đội ngũ kỹ sư IT hỗ trợ giải quyết sự cố tích hợp trực tiếp 24/7",
        "Hỗ trợ cấu hình biên lợi nhuận (Markup) tự động cho đại lý"
      ]
    }
  ];

  const packages = [
    {
      name: "Gói API Sandbox (Thử Nghiệm)",
      price: "Miễn phí kết nối & Test",
      description: "Dành cho các nhà phát triển phần mềm muốn chạy thử nghiệm kết nối",
      features: [
        "Truy cập đầy đủ tài liệu API Swagger chuẩn hóa",
        "Cấp khóa API Sandbox kết nối môi trường chạy thử",
        "Hỗ trợ kỹ thuật cơ bản qua Email/Tài liệu",
        "Không giới hạn số lượng query thử nghiệm",
        "Thời hạn sử dụng môi trường test lên tới 60 ngày"
      ],
      popular: false
    },
    {
      name: "Gói API Agent / Lữ Hành",
      price: "Báo giá chi tiết theo sản lượng",
      description: "Giải pháp cho các công ty du lịch, đại lý vé máy bay cấp 2 muốn tự động hóa hệ thống",
      features: [
        "Kết nối API chính thức môi trường Live xuất vé thật",
        "Tự động hóa hoàn toàn quy trình giữ chỗ và xuất vé",
        "Hỗ trợ nạp ký quỹ (Deposit) linh hoạt, thanh toán tự động",
        "Hỗ trợ kỹ sư IT đồng hành hỗ trợ tích hợp trực tiếp qua Zalo/Telegram",
        "Cấu hình hệ thống Markup tự động quản lý biên lợi nhuận"
      ],
      popular: true
    },
    {
      name: "Gói API Enterprise & Fintech",
      price: "Cam kết Uptime SLA 99.99%",
      description: "Dành cho các Ngân hàng, Ví điện tử, ứng dụng Fintech có lượng truy cập cực lớn",
      features: [
        "Kết nối API chịu tải lớn thông qua mạng phân phối CDN riêng",
        "Cam kết Uptime dịch vụ SLA đạt 99.99% bằng hợp đồng pháp lý",
        "Quy trình bảo mật nghiêm ngặt đáp ứng tiêu chuẩn tài chính ngân hàng",
        "Hỗ trợ đội ngũ kỹ sư IT riêng biệt túc trực 24/7/365 xử lý sự cố",
        "Hỗ trợ công nợ đối soát linh hoạt định kỳ hàng tháng"
      ],
      popular: false
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Đăng ký nhận tài liệu",
      description: "Đối tác gửi thông tin đăng ký dự án, ABTRIP cấp bộ tài liệu Swagger và khóa API kết nối môi trường Sandbox."
    },
    {
      step: "02",
      title: "Tích hợp Sandbox & Test",
      description: "Đội ngũ IT đối tác thực hiện viết mã kết nối, chạy thử nghiệm các luồng tìm kiếm, giữ chỗ và đối chiếu dữ liệu thử."
    },
    {
      step: "03",
      title: "Rà soát & Nghiệm thu",
      description: "ABTRIP và IT đối tác tiến hành rà soát bảo mật, kiểm tra khả năng chịu tải và phê duyệt nghiệm thu kỹ thuật."
    },
    {
      step: "04",
      title: "Khai thác chính thức (Go-live)",
      description: "Cấp khóa API Live kết nối kho vé thật, đối tác nạp ký quỹ và chính thức bán vé tự động trên hệ thống ứng dụng."
    }
  ];

  const testimonials = [
    {
      author: "Anh Nguyễn Đăng Khoa",
      role: "Giám đốc Công nghệ, ví điện tử PayPro",
      content: "Chúng tôi đã tích hợp cổng đặt vé máy bay của ABTRIP vào ứng dụng ví điện tử chỉ trong 4 ngày làm việc. API phản hồi cực nhanh, cấu trúc dữ liệu JSON rất tường minh và hệ thống vận hành cực kỳ ổn định, gần như không có downtime."
    },
    {
      author: "Chị Lê Hoàng Lan",
      role: "Trưởng phòng CNTT, VinaTravel Agency",
      content: "Dịch vụ hỗ trợ kỹ thuật của các bạn kỹ sư ABTRIP rất tuyệt vời. Các bạn túc trực hỗ trợ trực tiếp trong group chat đến đêm muộn để cùng debug lỗi kết nối. Quy trình tự động xuất vé thật hoạt động hoàn hảo, giúp đại lý tiết kiệm tối đa nhân lực trực quầy."
    },
    {
      author: "Mr. Rajiv Nair",
      role: "IT Director, Indochina Booking Group",
      content: "Very clean and structured API documentation. The SDK examples made our integration seamless. The auto-ticketing engine is highly reliable and easily handles our high daily query volumes. Outstanding developer support!"
    }
  ];

  const faqs = [
    {
      question: "Thời gian trung bình để hoàn thành việc tích hợp API và chính thức Go-live là bao lâu?",
      answer: "Thời gian tích hợp phụ thuộc vào năng lực phát triển của đội ngũ IT đối tác. Thông thường, với tài liệu API Swagger chuẩn hóa và sự hỗ trợ trực tiếp của kỹ sư ABTRIP, các công ty lữ hành chỉ mất từ 3 - 5 ngày làm việc để hoàn tất việc kết nối Sandbox. Quá trình kiểm thử và Go-live chính thức diễn ra trong vòng 2 - 3 ngày sau đó."
    },
    {
      question: "Hệ thống API có hỗ trợ tính năng tự động hoàn, hủy hoặc đổi vé máy bay trực tuyến không?",
      answer: "Có. API của chúng tôi cung cấp đầy đủ các endpoint phục vụ việc truy vấn điều kiện vé (Refund/Change rules), tính toán phí phát sinh và thực hiện yêu cầu hoàn/hủy/đổi vé tự động trực tiếp trên hệ thống mà không cần can thiệp thủ công từ nhân viên trực."
    },
    {
      question: "ABTRIP có yêu cầu số tiền ký quỹ tối thiểu để kết nối API Live không?",
      answer: "Để duy trì khóa kết nối API Live và thực hiện xuất vé tự động (Auto-issuance), đối tác cần duy trì một tài khoản ký quỹ (Deposit) tại ABTRIP. Mức ký quỹ tối thiểu ban đầu đối với đại lý du lịch thường là 10.000.000đ. Hệ thống sẽ tự động trừ tiền ký quỹ khi xuất vé thành công và gửi thông báo khi tài khoản dưới hạn mức tối thiểu."
    },
    {
      question: "Quy trình bảo mật dữ liệu của cổng API được thiết kế thế nào?",
      answer: "Cổng kết nối API của ABTRIP sử dụng giao thức truyền tải mã hóa SSL/TLS (HTTPS) cao nhất, xác thực truy cập bằng khóa API Key kết hợp IP Whitelisting (chỉ cho phép các địa chỉ IP đăng ký trước gửi query). Dữ liệu hành khách và thông tin thanh toán được bảo vệ nghiêm ngặt theo tiêu chuẩn bảo mật dữ liệu ngành thẻ thanh toán (PCI DSS)."
    }
  ];

  const config = {
    id: "tich-hop-api",
    category: "corporate" as const,
    title: "Giải Pháp Tích Hợp API Vé Máy Bay",
    subtitle: "Kết Nối Siêu Tốc - Kho Vé Toàn Cầu - Tự Động Hóa 100%",
    description: "Giải pháp kết nối API/e-SDK hàng không dành cho Ngân hàng, Ví điện tử, ứng dụng Fintech và các đại lý lữ hành lớn. Tích hợp trực tiếp hệ thống NDC/GDS, tốc độ phản hồi truy vấn dưới 3 giây, cam kết Uptime 99.99% và hỗ trợ kỹ thuật IT 24/7.",
    heroImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2000&auto=format&fit=crop",
    badge: "Tích hợp API hàng không chuyên nghiệp",
    geoTarget: "Hỗ trợ kết nối và bàn giao tài liệu kỹ thuật API toàn quốc",
    geoAirports: [],
    features,
    details,
    packages,
    processSteps,
    testimonials,
    faqs
  };

  return <ServiceLandingPage {...config} />;
}
