"use client";

import ServiceLandingPage from "@/components/ServiceLandingPage";
import { Settings, ShieldCheck, Clock, Star } from "lucide-react";

export default function Page() {
  const features = [
    {
      title: "Số Hóa Quy Trình Phê Duyệt",
      description: "Tự động hóa hoàn toàn luồng phê duyệt yêu cầu đi công tác (Travel Request) theo đúng sơ đồ tổ chức và phân cấp quản lý nội bộ của doanh nghiệp.",
      icon: <Settings className="w-6 h-6" />
    },
    {
      title: "Kiểm Soát Hạn Mức Chặt Chẽ",
      description: "Cấu hình hạn mức chi tiêu chi tiết cho từng cá nhân, phòng ban hoặc dự án. Tự động từ chối các lựa chọn vượt chính sách (Travel Policy) của công ty.",
      icon: <ShieldCheck className="w-6 h-6" />
    },
    {
      title: "Phân Tích & Tối Ưu Chi Phí",
      description: "Hệ thống báo cáo tài chính trực quan, cung cấp dữ liệu phân tích sâu sắc giúp doanh nghiệp tối ưu hóa ngân sách lữ hành lên tới 20% hàng năm.",
      icon: <Clock className="w-6 h-6" />
    }
  ];

  const details = [
    {
      title: "Giải Pháp Quản Lý Công Tác Toàn Diện Cho Doanh Nghiệp Thời Đại Số",
      description: "Đối với các doanh nghiệp có quy mô từ hàng trăm đến hàng ngàn nhân sự, việc quản lý thủ công các chi phí đi lại, vé máy bay, phòng khách sạn luôn là một thách thức lớn. Tình trạng đặt vé sai chính sách, lãng phí ngân sách do đặt sát ngày hoặc quy trình phê duyệt chậm trễ làm lỡ cơ hội kinh doanh xảy ra thường xuyên. Giải pháp TMC của ABTRIP số hóa toàn diện quy trình này trên một nền tảng duy nhất, giúp doanh nghiệp thiết lập quy chuẩn quản lý khoa học, nâng cao năng suất nhân sự và tiết kiệm đáng kể chi phí.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000",
      bullets: [
        "Nền tảng đặt dịch vụ tập trung (Vé máy bay, khách sạn, xe đưa đón)",
        "Tự động áp dụng và kiểm soát chính sách công tác của công ty",
        "Rút ngắn 80% thời gian duyệt hồ sơ đi công tác nội bộ",
        "Đối soát công nợ tự động bằng một click chuột"
      ]
    },
    {
      title: "Quản Lý Hạn Mức Ngân Sách Phân Cấp & Báo Cáo Tài Chính Trực Quan",
      description: "Hệ thống TMC cho phép người quản trị dễ dàng phân quyền hạn mức chi tiêu cho từng cấp bậc nhân sự (nhân viên, trưởng phòng, giám đốc). Nhân viên khi đặt vé/phòng trên hệ thống sẽ chỉ thấy các lựa chọn nằm trong hạn mức quy định. Đồng thời, bộ phận tài chính kế toán sẽ được cung cấp bảng báo cáo trực quan về tình hình chi tiêu lữ hành theo thời gian thực, phân tích chi tiết chi phí theo từng phòng ban hoặc từng dự án cụ thể.",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1000",
      bullets: [
        "Phân quyền phê duyệt đa cấp linh hoạt (Manager -> Accountant)",
        "Báo cáo biểu đồ phân tích chi phí công tác trực quan",
        "Hỗ trợ tích hợp dữ liệu kế toán với hệ thống ERP nội bộ",
        "Đề xuất các giải pháp tối ưu hóa chi tiêu định kỳ từ chuyên gia ABTRIP"
      ]
    }
  ];

  const packages = [
    {
      name: "Gói TMC Standard",
      price: "Miễn phí cài đặt & Vận hành",
      description: "Phù hợp cho các doanh nghiệp có quy mô dưới 100 nhân viên",
      features: [
        "Cấp quyền truy cập nền tảng đặt vé tập trung của ABTRIP",
        "Phân quyền đặt vé cho nhân sự hành chính/nhân viên",
        "Xuất báo cáo chi tiết các chuyến bay hàng tháng",
        "Chính sách giá vé doanh nghiệp ưu đãi đặc biệt",
        "Hỗ trợ tổng đài kỹ thuật hàng không 24/7"
      ],
      popular: false
    },
    {
      name: "Gói TMC Professional",
      price: "Phí triển khai ưu đãi đặc quyền",
      description: "Giải pháp tối ưu cho doanh nghiệp có quy mô từ 100 - 500 nhân viên",
      features: [
        "Số hóa quy trình phê duyệt công tác tự động 2 cấp",
        "Thiết lập chính sách công tác và hạn mức chi tiêu chi tiết",
        "Báo cáo phân tích chi phí lữ hành trực quan thời gian thực",
        "Tích hợp đặt phòng khách sạn và dịch vụ sân bay VIP",
        "Hưởng chính sách công nợ định kỳ và chiết khấu B2B cao"
      ],
      popular: true
    },
    {
      name: "Gói TMC Enterprise",
      price: "Thiết kế riêng theo yêu cầu doanh nghiệp",
      description: "Dành riêng cho các tập đoàn lớn trên 500 nhân viên hoặc đa quốc gia",
      features: [
        "Quy trình phê duyệt đa cấp tùy biến không giới hạn",
        "Tích hợp trực tiếp hệ thống ERP doanh nghiệp (SAP, Oracle, Fast...)",
        "Hỗ trợ cổng thanh toán bảo lãnh công nợ linh hoạt tới 45 ngày",
        "Cam kết bằng văn bản chỉ số tiết kiệm ngân sách hàng năm",
        "Đội ngũ kỹ sư CNTT và chuyên viên chăm sóc túc trực riêng biệt 24/7"
      ],
      popular: false
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Khảo sát quy trình nội bộ",
      description: "ABTRIP tiến hành khảo sát cơ cấu tổ chức, quy trình phê duyệt chi phí và chính sách công tác hiện tại của doanh nghiệp."
    },
    {
      step: "02",
      title: "Cấu hình & Phân quyền",
      description: "Thiết lập hệ thống phần mềm TMC, cài đặt hạn mức chi tiêu cho từng cấp bậc nhân sự và phân quyền tài khoản phê duyệt."
    },
    {
      step: "03",
      title: "Đào tạo nhân sự sử dụng",
      description: "Tổ chức các buổi hướng dẫn sử dụng chi tiết cho bộ phận hành chính đặt vé, kế toán đối soát và các cấp quản lý duyệt vé."
    },
    {
      step: "04",
      title: "Vận hành & Phân tích tối ưu",
      description: "Chính thức đưa hệ thống vào hoạt động. Định kỳ gửi báo cáo phân tích chi tiêu và tư vấn giải pháp tối ưu hóa ngân sách lữ hành."
    }
  ];

  const testimonials = [
    {
      author: "Anh Hoàng Minh Trí",
      role: "Giám đốc Tài chính, Coteccons Group",
      content: "Áp dụng giải pháp TMC của ABTRIP giúp chúng tôi kiểm soát chặt chẽ chi phí đi lại của hàng chục công trình xây dựng trên cả nước. Quy trình phê duyệt tự động giúp nhân sự đặt vé đi công tác nhanh gấp 3 lần và tiết kiệm được 15% tổng ngân sách lữ hành hàng năm."
    },
    {
      author: "Chị Vũ Thu Hương",
      role: "Trưởng bộ phận Hành chính Nhân sự, Shopee Việt Nam",
      content: "Hệ thống rất thân thiện và dễ sử dụng. Nhân viên chỉ cần lên app tự chọn chuyến bay và phòng khách sạn nằm trong chính sách công ty quy định. Quản lý duyệt yêu cầu ngay trên điện thoại chỉ mất 30 giây. Báo cáo chi tiêu đối soát cuối tháng cực kỳ nhàn."
    },
    {
      author: "Mr. Robert Green",
      role: "Global Travel Manager, Schneider Electric",
      content: "ABTRIP's TMC solution has successfully digitalized our travel booking workflow in Vietnam. The integration with our global corporate travel policy was seamless, and the automated approval flow has reduced administrative workload by 80%."
    }
  ];

  const faqs = [
    {
      question: "Hệ thống quản lý công tác TMC của ABTRIP có hỗ trợ ứng dụng trên điện thoại di động không?",
      answer: "Có. Nền tảng TMC của ABTRIP hỗ trợ giao diện responsive hoàn hảo trên mọi thiết bị di động. Cả nhân viên đặt dịch vụ và cấp quản lý phê duyệt đều có thể thực hiện mọi thao tác (tìm kiếm, đặt chỗ, duyệt vé) trực tiếp trên điện thoại thông minh mọi lúc mọi nơi."
    },
    {
      question: "Chính sách công tác (Travel Policy) có thể tùy biến linh hoạt theo từng phòng ban không?",
      answer: "Hoàn toàn có thể. Hệ thống cho phép thiết lập các nhóm chính sách công tác khác nhau. Ví dụ: Nhóm nhân viên kinh doanh áp dụng hạn mức phòng khách sạn 800k/đêm và vé máy bay phổ thông; Nhóm giám đốc dự án áp dụng phòng khách sạn 1.5M/đêm; Nhóm ban lãnh đạo áp dụng vé máy bay thương gia và phòng khách sạn 5 sao."
    },
    {
      question: "Việc tích hợp hệ thống TMC của ABTRIP với phần mềm ERP của doanh nghiệp (như SAP, Oracle) có mất phí không?",
      answer: "Phí tích hợp tùy thuộc vào độ phức tạp của cổng kết nối API và yêu cầu tùy biến của doanh nghiệp. Đối với gói Enterprise, ABTRIP hỗ trợ một phần chi phí kỹ sư CNTT kết nối dữ liệu. Chúng tôi cung cấp các tài liệu API chuẩn hóa giúp quá trình đồng bộ hóa dữ liệu hóa đơn, bảng kê chi tiêu diễn ra nhanh chóng."
    },
    {
      question: "Hệ thống có cảnh báo hoặc chặn thanh toán khi nhân viên đặt vé sai chính sách không?",
      answer: "Có. Hệ thống hỗ trợ cấu hình hai chế độ: Chế độ Cảnh báo (Soft-block) - cảnh báo nhân viên đặt vé vượt hạn mức và yêu cầu nhập lý do giải trình để gửi lên cấp quản lý xem xét; Chế độ Khóa (Hard-block) - chặn hoàn toàn không cho phép nhân viên đặt các dịch vụ vượt quá ngân sách hoặc chính sách quy định."
    }
  ];

  const config = {
    id: "tmc",
    category: "corporate" as const,
    title: "Nền Tảng Quản Lý Công Tác (TMC)",
    subtitle: "Số Hóa Quy Trình - Tự Động Phê Duyệt - Tối Ưu Hạn Mức 20%",
    description: "Giải pháp quản lý lữ hành doanh nghiệp toàn diện. Số hóa quy trình phê duyệt công tác, cấu hình tự động chính sách công tác (Travel Policy), quản lý ngân sách phân cấp chi tiết và tối ưu hóa chi phí đi lại.",
    heroImage: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2000&auto=format&fit=crop",
    badge: "Giải pháp quản lý lữ hành TMC",
    geoTarget: "Triển khai hệ thống phần mềm quản lý công tác cho doanh nghiệp toàn quốc",
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
