"use client";

import ServiceLandingPage from "@/components/ServiceLandingPage";
import { Plane, BadgePercent, Clock, ShieldCheck, Star } from "lucide-react";

export default function Page() {
  const features = [
    {
      title: "Hạn Mức Công Nợ Linh Hoạt",
      description: "Hỗ trợ chính sách thanh toán công nợ định kỳ từ 15 - 45 ngày giúp doanh nghiệp tối ưu hóa dòng tiền và tinh gọn thủ tục tạm ứng chi phí công tác.",
      icon: <Clock className="w-6 h-6" />
    },
    {
      title: "Chiết Khấu Đại Lý Tốt Nhất",
      description: "Chính sách giá chiết khấu trực tiếp lên đến 3 - 5% trên giá vé gốc của hãng cho cả các chặng bay nội địa và chặng bay quốc tế.",
      icon: <BadgePercent className="w-6 h-6" />
    },
    {
      title: "Hỗ Trợ Kỹ Thuật 24/7/365",
      description: "Tổng đài hỗ trợ khẩn cấp túc trực 24/7/365 xử lý nhanh chóng các trường hợp đổi ngày giờ bay, hoàn hủy vé, đổi tên hành khách sát giờ cất cánh.",
      icon: <Plane className="w-6 h-6" />
    }
  ];

  const details = [
    {
      title: "Tối Ưu Hóa Dòng Tiền & Tinh Giản Thủ Tục Hành Chính Doanh Nghiệp",
      description: "Việc cử cán bộ nhân viên đi công tác thường xuyên luôn đi kèm các quy trình tạm ứng, thanh toán nội bộ phức tạp và mất nhiều thời gian của cả nhân sự lẫn bộ phận kế toán. Dịch vụ Vé máy bay Doanh nghiệp của ABTRIP mang lại giải pháp Billing công nợ định kỳ thông minh. Kế toán doanh nghiệp không cần phải thanh toán lẻ tẻ cho từng chiếc vé phát sinh mà chỉ cần đối chiếu bảng kê tổng hợp duy nhất và thực hiện thanh toán một lần vào cuối kỳ, giúp tinh giản 90% thủ tục giấy tờ sổ sách.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000",
      bullets: [
        "Hạn mức công nợ linh hoạt dựa trên sản lượng bay",
        "Một bảng đối chiếu duy nhất, kiểm soát chặt chẽ chi phí",
        "Giảm tải hoàn toàn quy trình tạm ứng chi phí công tác lẻ",
        "Hỗ trợ phân quyền đặt vé cho từng phòng ban chuyên biệt"
      ]
    },
    {
      title: "Chiết Khấu Đại Lý Cấp 1 & Dịch Vụ Hỗ Trợ Kỹ Thuật VIP 24/7",
      description: "Là đại lý cấp 1 chính thức của các hãng hàng không nội địa lớn (Vietnam Airlines, Vietjet, Bamboo...) và hơn 100 hãng bay quốc tế, ABTRIP mang lại chính sách giá vé sỉ Corporate chiết khấu cao trực tiếp trên giá vé gốc của hãng, giúp tiết kiệm tối đa ngân sách lữ hành hàng năm cho doanh nghiệp. Bên cạnh đó, chúng tôi cung cấp chuyên viên chăm sóc riêng biệt (Key Account Manager) luôn túc trực hỗ trợ khẩn cấp mọi sự cố sát giờ bay.",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1000",
      bullets: [
        "Chiết khấu trực tiếp trên giá vé gốc của hãng hàng không",
        "Tổng đài hỗ trợ kỹ thuật khẩn cấp 24/7/365 kể cả Lễ/Tết",
        "Đặc quyền ưu tiên đặt chỗ và giữ chỗ miễn phí giờ cao điểm",
        "Xuất hóa đơn VAT tự động nhanh chóng trong vòng 5 phút"
      ]
    }
  ];

  const packages = [
    {
      name: "Gói SME Starter",
      price: "Miễn phí dịch vụ đại lý",
      description: "Phù hợp cho các doanh nghiệp vừa và nhỏ có ngân sách bay dưới 20 triệu/tháng",
      features: [
        "Áp dụng giá vé sỉ cạnh tranh cao",
        "Giữ chỗ chuyến bay miễn phí trong 24 giờ",
        "Xuất hóa đơn VAT tự động cho từng chiếc vé",
        "Hỗ trợ tổng đài kỹ thuật hàng không 24/7",
        "Không yêu cầu doanh số tối thiểu tháng"
      ],
      popular: false
    },
    {
      name: "Gói Growth Partner",
      price: "Hạn mức công nợ 15 ngày",
      description: "Dành cho doanh nghiệp tăng trưởng có ngân sách bay từ 20 - 100 triệu/tháng",
      features: [
        "Chiết khấu trực tiếp 2% - 3% trên giá vé gốc",
        "Thời gian đối chiếu công nợ linh hoạt 15 ngày",
        "Xuất hóa đơn tổng hợp cuối kỳ đối chiếu",
        "Hỗ trợ làm thủ tục check-in nhanh tại sân bay",
        "Ưu tiên giữ chỗ miễn phí các khung giờ cao điểm"
      ],
      popular: true
    },
    {
      name: "Gói Strategic Elite",
      price: "Hạn mức công nợ tới 45 ngày",
      description: "Đặc quyền dành cho doanh nghiệp lớn có ngân sách bay trên 100 triệu/tháng",
      features: [
        "Mức chiết khấu tối đa lên tới 5% giá vé gốc",
        "Hạn mức công nợ linh hoạt kéo dài từ 30 - 45 ngày",
        "Có chuyên viên Key Account phục vụ riêng biệt 24/7",
        "Đặc quyền hỗ trợ nâng hạng ghế VIP miễn phí khi có chỗ",
        "Hỗ trợ trọn gói dịch vụ phòng chờ thương gia sân bay"
      ],
      popular: false
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Khảo sát nhu cầu bay B2B",
      description: "Doanh nghiệp cung cấp ngân sách bay dự kiến hàng tháng, các chặng bay thường xuyên và chính sách công tác nội bộ."
    },
    {
      step: "02",
      title: "Ký kết hợp đồng hợp tác",
      description: "ABTRIP xây dựng bảng đề xuất chính sách chiết khấu, hạn mức công nợ tương ứng và ký kết hợp đồng hợp tác chính thức."
    },
    {
      step: "03",
      title: "Cấp tài khoản đặt vé",
      description: "Thiết lập tài khoản doanh nghiệp trên hệ thống đặt vé tự động của ABTRIP, hướng dẫn nhân viên phụ trách sử dụng."
    },
    {
      step: "04",
      title: "Đối chiếu & Thanh toán",
      description: "Hàng tháng, hai bên tiến hành đối chiếu bảng kê chi tiết, xuất hóa đơn tổng và doanh nghiệp thực hiện thanh toán một lần."
    }
  ];

  const testimonials = [
    {
      author: "Chị Nguyễn Thị Bích Vân",
      role: "Trưởng phòng Hành chính, FPT Retail",
      content: "Sử dụng gói dịch vụ vé doanh nghiệp của ABTRIP giúp kế toán công ty mình giảm tải rất nhiều công việc. Chính sách công nợ 30 ngày giúp công ty tối ưu hóa dòng tiền, các bạn hỗ trợ xuất hóa đơn rất nhanh và chính xác."
    },
    {
      author: "Anh Hoàng Thế Nam",
      role: "Giám đốc Nhân sự, Đất Xanh Group",
      content: "Tôi rất ấn tượng với đội ngũ kỹ thuật 24/7 của ABTRIP. Có những chuyến công tác khẩn cấp của Ban lãnh đạo lúc nửa đêm hay ngày Lễ đều được các bạn xử lý đặt vé, giữ chỗ và hỗ trợ check-in VIP tại sân bay cực kỳ chu đáo."
    },
    {
      author: "Mrs. Kelly Parker",
      role: "Administration Lead, DHL Vietnam",
      content: "ABTRIP has been our trusted corporate travel agency in Vietnam for years. Their discount structure is highly transparent, and their customer support team always handles last-minute ticket changes promptly. Great partner!"
    }
  ];

  const faqs = [
    {
      question: "Để được áp dụng chính sách công nợ, doanh nghiệp cần đáp ứng những điều kiện gì?",
      answer: "Để thiết lập hạn mức công nợ (Billing Cycle), doanh nghiệp cần cung cấp bản sao Giấy đăng ký kinh doanh hợp pháp, có lịch sử hoạt động ổn định và ký kết Hợp đồng hợp tác kinh doanh chính thức với ABTRIP. Hạn mức công nợ cụ thể và thời gian đối chiếu sẽ được thống nhất dựa trên quy mô ngân sách bay hàng tháng của doanh nghiệp."
    },
    {
      question: "Hóa đơn VAT có được xuất gộp chung một lần vào cuối tháng không?",
      answer: "Có. ABTRIP hỗ trợ xuất hóa đơn theo hai hình thức: xuất hóa đơn điện tử cho từng vé máy bay ngay sau khi đặt thành công, hoặc xuất hóa đơn gộp (hóa đơn tổng) kèm theo bảng kê đối chiếu chi tiết vào cuối kỳ đối chiếu công nợ hàng tháng, giúp kế toán doanh nghiệp dễ dàng hạch toán chi phí."
    },
    {
      question: "Chính sách chiết khấu 3 - 5% được áp dụng trên tổng giá trị thanh toán hay thế nào?",
      answer: "Theo quy định của các hãng hàng không, chính sách chiết khấu đại lý được tính toán và áp dụng trực tiếp trên phần giá vé gốc (chưa bao gồm thuế, phí sân bay và phụ thu của hãng). ABTRIP cam kết hiển thị minh bạch phần giá vé gốc và thuế phí để doanh nghiệp dễ dàng kiểm soát."
    },
    {
      question: "Khi nhân viên công ty bị trễ chuyến bay (miss flight) vào cuối tuần, ABTRIP hỗ trợ thế nào?",
      answer: "Quý khách chỉ cần liên hệ Hotline khẩn dành riêng cho doanh nghiệp 0788320320. Chuyên viên của chúng tôi sẽ lập tức liên hệ với hãng để hỗ trợ đổi chuyến bay kế tiếp gần nhất, xin phạt trễ chuyến tối thiểu hoặc tìm phương án bay thay thế tối ưu nhất để đảm bảo tiến độ công việc của nhân sự."
    }
  ];

  const config = {
    id: "doanh-nghiep",
    category: "corporate" as const,
    title: "Vé Máy Bay Doanh Nghiệp VIP",
    subtitle: "Dịch Vụ Công Nợ Linh Hoạt - Chiết Khấu Đại Lý Tốt Nhất",
    description: "Giải pháp quản lý và đặt vé máy bay chuyên biệt dành cho doanh nghiệp. Chính sách công nợ định kỳ từ 15 - 45 ngày, chiết khấu trực tiếp lên đến 5%, xuất hóa đơn VAT gộp cuối kỳ và hotline hỗ trợ 24/7/365 xử lý sự cố khẩn cấp.",
    heroImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2000&auto=format&fit=crop",
    badge: "Giải pháp Vé máy bay B2B trọn gói",
    geoTarget: "Hỗ trợ quản lý công nợ và xuất vé 24/7 cho doanh nghiệp toàn quốc",
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
