"use client";

import ServiceLandingPage from "@/components/ServiceLandingPage";
import { CheckCircle, Zap, UserCheck, ShieldCheck, Clock, Star } from "lucide-react";

export default function Page() {
  const features = [
    {
      title: "Check-in Quầy Ưu Tiên",
      description: "Bỏ qua các dòng người xếp hàng rồng rắn. Bạn được hỗ trợ thủ tục tại quầy ưu tiên của hãng hàng không cực kỳ nhanh chóng.",
      icon: <Zap className="w-6 h-6" />
    },
    {
      title: "Hỗ Trợ Hành Lý Chu Đáo",
      description: "Nhân viên hỗ trợ mang vác hành lý, dán nhãn ưu tiên (Priority) giúp hành lý được đưa ra sớm nhất tại sân bay đến.",
      icon: <UserCheck className="w-6 h-6" />
    },
    {
      title: "Chuyên Viên Đồng Hành",
      description: "Đội ngũ điều phối đón tiếp ngay tại cửa sảnh đi sân bay, am hiểu nghiệp vụ hàng không để xử lý mọi tình huống phát sinh.",
      icon: <CheckCircle className="w-6 h-6" />
    }
  ];

  const details = [
    {
      title: "Lược Bỏ Sự Chờ Đợi - Khởi Hành Thư Thái Tối Đa",
      description: "Quy trình check-in sân bay truyền thống vào các giờ cao điểm hay dịp Lễ/Tết thường ngốn của bạn hàng giờ đồng hồ mệt mỏi. Dịch vụ hỗ trợ check-in nhanh của ABTRIP được thiết kế để giải phóng bạn khỏi sự bất tiện đó. Chuyên viên của chúng tôi sẽ liên hệ trước, đón bạn ngay tại cửa xe ở sảnh đi, thay bạn xử lý các thủ tục cân đo ký gửi hành lý và lấy thẻ lên máy bay chỉ trong vòng 5 - 10 phút.",
      image: "/fast-checkin-service.png",
      bullets: [
        "Tiết kiệm tối thiểu 30 - 45 phút xếp hàng",
        "Đặc biệt hữu ích cho gia đình có trẻ nhỏ, người già",
        "Xử lý nhanh chóng các lỗi sai tên, sai thông tin vé",
        "Hỗ trợ điền tờ khai xuất cảnh quốc tế chuẩn xác"
      ]
    },
    {
      title: "Ký Gửi Hành Lý VIP - Nhận Tiên Phong Tại Điểm Đến",
      description: "Không chỉ dừng lại ở thủ tục check-in, hành lý ký gửi của bạn sẽ được chăm sóc chu đáo bởi chuyên viên sân bay. Chúng tôi hỗ trợ dán thẻ ưu tiên đặc quyền (Priority Tag) của hãng bay giúp hành lý của bạn là những kiện hàng đầu tiên được đưa ra băng chuyền ở sân bay hạ cánh, giảm thiểu tối đa thời gian chờ lấy đồ.",
      image: "/vip-baggage-priority.png",
      bullets: [
        "Hành lý được dán thẻ VIP Priority",
        "Hỗ trợ xử lý nhanh các tình huống hành lý quá cước",
        "Đóng gói hành lý đúng chuẩn quy định an ninh",
        "Nhân viên đẩy xe hành lý tiễn khách đến cửa kiểm an ninh"
      ]
    }
  ];

  const packages = [
    {
      name: "Gói Check-in Nhanh Ga Nội Địa",
      price: "Chỉ từ 350.000đ/khách",
      description: "Áp dụng cho các chuyến bay trong nước tại SGN, HAN, DAD...",
      features: [
        "Đón tại cửa sảnh đi của nhà ga nội địa",
        "Làm thủ tục tại quầy check-in ưu tiên",
        "Hỗ trợ ký gửi hành lý cẩn thận",
        "Bàn giao thẻ lên máy bay và thẻ hành lý tận tay"
      ],
      popular: false
    },
    {
      name: "Gói Check-in Nhanh Ga Quốc Tế",
      price: "Chỉ từ 550.000đ/khách",
      description: "Áp dụng cho các chuyến bay đi nước ngoài",
      features: [
        "Đón tại sảnh đi quốc tế ngay từ cửa xe",
        "Hỗ trợ điền tờ khai hải quan, tờ khai y tế (nếu có)",
        "Thủ tục check-in tại quầy ưu tiên của hãng",
        "Dán thẻ Priority ưu tiên cho hành lý ký gửi",
        "Hướng dẫn di chuyển qua luồng kiểm soát an ninh nhanh"
      ],
      popular: true
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Đăng ký chuyến bay",
      description: "Cung cấp mã đặt chỗ, thông tin hãng bay và lịch bay dự kiến của bạn cho ABTRIP trước giờ bay tối thiểu 3 tiếng."
    },
    {
      step: "02",
      title: "Hẹn gặp tại sảnh đi",
      description: "Chuyên viên sân bay chủ động liên hệ trước 2 tiếng, đón bạn trực tiếp tại sảnh đi ga xuất phát theo đúng hẹn."
    },
    {
      step: "03",
      title: "Thủ tục nhanh quầy ưu tiên",
      description: "Nhân viên tiếp nhận giấy tờ tùy thân, thực hiện cân hành lý và làm thủ tục check-in tại quầy ưu tiên của hãng bay."
    },
    {
      step: "04",
      title: "Bàn giao & Tiễn khách",
      description: "Bàn giao thẻ lên máy bay, thẻ hành lý, hướng dẫn tận tình luồng di chuyển qua cửa an ninh vào khu cách ly."
    }
  ];

  const testimonials = [
    {
      author: "Chị Trần Kim Chi",
      role: "CEO, Chi Chi Fashion Store",
      content: "Chuyến bay đi Seoul vừa rồi của mình suýt trễ vì kẹt xe đường Cộng Hòa. May mà đã đặt dịch vụ check-in nhanh của ABTRIP từ trước. Ra tới sân bay có bạn nhân viên đón sẵn, làm thủ tục vèo cái 5 phút là xong. Rất đáng tiền!"
    },
    {
      author: "Anh Nguyễn Tuấn Anh",
      role: "Kỹ sư trưởng, FPT Software",
      content: "Tôi đặt gói này cho bố mẹ lớn tuổi đi du lịch một mình từ Hà Nội vào Sài Gòn. Các bạn nhân viên chu đáo vô cùng, đón từ cửa xe taxi, xách đồ hộ, làm thủ tục xong còn dặn dò kỹ lưỡng rồi dẫn bố mẹ ra cửa an ninh. Rất yên tâm."
    },
    {
      author: "Chị Sophia Martinez",
      role: "Khách du lịch tự do",
      content: "I had a wonderful experience at Noi Bai terminal with ABTRIP's fast check-in service. The staff helped me fill out the exit declaration forms swiftly, saved me from an hour-long waiting line. Highly recommended!"
    }
  ];

  const faqs = [
    {
      question: "Dịch vụ check-in nhanh này có bao gồm lối đi an ninh ưu tiên không?",
      answer: "Gói check-in nhanh tiêu chuẩn hỗ trợ quý khách làm thủ tục lấy thẻ lên máy bay và ký gửi hành lý tại quầy ưu tiên của hãng. Đối với ga quốc tế, nhân viên sẽ hướng dẫn khách đi luồng an ninh nhanh nhất. Nếu quý khách muốn đi lối an ninh ưu tiên chuyên biệt (Fast Track), vui lòng đăng ký gói VIP Fastrack."
    },
    {
      question: "Tôi có thể đặt dịch vụ khẩn sát giờ bay được không?",
      answer: "Có. Chúng tôi hỗ trợ nhận lịch khẩn cấp tối thiểu 3 tiếng trước giờ bay qua Hotline 0788320320. Tuy nhiên, khuyến khích đặt trước 24 tiếng để chúng tôi sắp xếp nhân viên phục vụ tốt nhất."
    },
    {
      question: "Tôi bị trễ chuyến bay do lỗi khách quan, ABTRIP có hỗ trợ gì không?",
      answer: "Nếu quý khách gặp sự cố trễ chuyến, chuyên viên check-in của chúng tôi tại sân bay sẽ hỗ trợ làm việc với hãng hàng không để xin đổi chuyến bay kế tiếp, đổi ngày giờ bay hoặc tìm giải pháp tối ưu nhất cho quý khách theo đúng quy định hàng không."
    },
    {
      question: "Thủ tục hủy dịch vụ check-in nhanh có mất phí không?",
      answer: "Quý khách được hủy dịch vụ miễn phí và hoàn tiền 100% nếu báo trước giờ khởi hành dự kiến 12 tiếng. Hủy trước từ 4 - 12 tiếng chịu phí 50%, và hủy dưới 4 tiếng hoặc không xuất hiện (No-show) sẽ không được hoàn phí dịch vụ."
    }
  ];

  const config = {
    id: "fast-check-in",
    category: "airport" as const,
    title: "Dịch Vụ Check-in Nhanh Sân Bay",
    subtitle: "Thủ Tục Ưu Tiên - Không Chờ Đợi - Khởi Hành Thư Thái",
    description: "Giải pháp hỗ trợ thủ tục bay trọn gói tại sảnh đi. Đội ngũ nhân viên đón tiếp tận tình, làm thủ tục check-in tại quầy ưu tiên của hãng bay và ký gửi hành lý VIP giúp tiết kiệm tối đa thời gian xếp hàng.",
    heroImage: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=2000&auto=format&fit=crop",
    badge: "Thủ tục nhanh quầy ưu tiên",
    geoTarget: "Hỗ trợ phục vụ tại ga đi SGN, HAN, DAD, CXR, PQC",
    geoAirports: ["SGN", "HAN", "DAD", "CXR", "PQC"],
    features,
    details,
    packages,
    processSteps,
    testimonials,
    faqs
  };

  return <ServiceLandingPage {...config} />;
}
