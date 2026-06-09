"use client";

import ServiceLandingPage from "@/components/ServiceLandingPage";
import { CheckCircle, Zap, UserCheck, ShieldCheck, Clock, Star } from "lucide-react";

export default function Page() {
  const features = [
    {
      title: "Luồng Ưu Tiên VIP Biệt Lập",
      description: "Được hộ tống di chuyển qua các lối đi ưu tiên chuyên biệt dành cho khách VIP tại khu vực kiểm soát hải quan và an ninh hàng không.",
      icon: <Zap className="w-6 h-6" />
    },
    {
      title: "Đón Tiếp Chu Đáo Từ Cửa Máy Bay",
      description: "Nhân viên đón tiếp quý khách ngay tại cửa ống lồng máy bay (ga đến) hoặc sảnh đón nhà ga (ga đi) với bảng tên nhận diện lịch sự.",
      icon: <UserCheck className="w-6 h-6" />
    },
    {
      title: "Hỗ Trợ Hành Lý Trọn Gói",
      description: "Chúng tôi hỗ trợ nhận hành lý ký gửi ưu tiên tại băng chuyền sân bay và vận chuyển ra tận xe đưa đón ngoại khu cho quý khách.",
      icon: <CheckCircle className="w-6 h-6" />
    }
  ];

  const details = [
    {
      title: "Hành Trình Di Chuyển Thông Suốt Và Bảo Mật Tuyệt Đối",
      description: "Việc phải xếp hàng chờ đợi làm thủ tục hải quan xuất nhập cảnh và kiểm tra an ninh tại các sân bay quốc tế lớn luôn gây ra sự mệt mỏi và tốn kém thời gian đối với các doanh nhân bận rộn hay các vị khách VIP nước ngoài. Dịch vụ VIP Fastrack của ABTRIP mang đến giải pháp tối giản hóa toàn bộ quy trình này. Chuyên viên của chúng tôi sẽ thay bạn giải quyết các thủ tục hàng không phức tạp và dẫn bạn đi theo luồng ưu tiên riêng biệt, đảm bảo sự nhanh chóng, bảo mật và riêng tư cao nhất.",
      image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=1000",
      bullets: [
        "Rút ngắn đến 80% thời gian xếp hàng thủ tục",
        "Lối đi VIP riêng biệt không cần chờ đợi",
        "Bảo mật tuyệt đối thông tin hành khách và lộ trình",
        "Thích hợp cho đối tác ngoại giao, doanh nhân quốc tế"
      ]
    },
    {
      title: "Dịch Vụ Đón Tiễn VIP Chân Thang Máy Bay & Hỗ Trợ Hành Lý",
      description: "Đối với các yêu cầu cao cấp nhất, chúng tôi cung cấp dịch vụ đón tiễn đặc quyền ngay tại chân thang máy bay (sân đỗ) bằng xe VIP chuyên dụng (Ramp Car). Quý khách sẽ được hộ tống trực tiếp vào nhà ga VIP làm thủ tục nhập cảnh khẩn cấp. Song song đó, nhân viên mặt đất của chúng tôi sẽ túc trực tại băng chuyền, nhận diện hành lý ký gửi ưu tiên và hỗ trợ đẩy xe đưa ra tận xe chờ của quý khách ngoài sảnh đón.",
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1000",
      bullets: [
        "Đón khách tại chân thang bằng xe VIP chuyên dụng",
        "Thủ tục kiểm soát xuất nhập cảnh VIP nhanh gọn",
        "Hỗ trợ nhận hành lý ký gửi ưu tiên từ băng chuyền",
        "Hỗ trợ khai tờ khai nhập cảnh hải quan chu đáo"
      ]
    }
  ];

  const packages = [
    {
      name: "Gói VIP Fastrack Ga Đến (Arrival)",
      price: "Chỉ từ 950.000đ/khách",
      description: "Đón tại ống lồng máy bay và làm thủ tục nhập cảnh nhanh ga đến quốc tế",
      features: [
        "Nhân viên đón tại cửa ống lồng máy bay với bảng tên",
        "Dẫn đi lối ưu tiên làm thủ tục nhập cảnh hải quan",
        "Hỗ trợ nhận hành lý ký gửi tại băng chuyền",
        "Hỗ trợ khai báo tờ khai nhập cảnh hải quan",
        "Hộ tống tiễn khách ra tận xe đón ngoài sảnh"
      ],
      popular: false
    },
    {
      name: "Gói VIP Fastrack Ga Đi (Departure)",
      price: "Chỉ từ 850.000đ/khách",
      description: "Đón tại sảnh đi và dẫn lối ưu tiên qua an ninh xuất cảnh ga đi quốc tế",
      features: [
        "Nhân viên đón khách trực tiếp tại sảnh đi nhà ga",
        "Hỗ trợ làm thủ tục check-in nhanh tại quầy ưu tiên",
        "Dẫn lối ưu tiên qua khu vực kiểm soát xuất cảnh",
        "Hộ tống qua cửa kiểm tra an ninh nhanh VIP",
        "Dẫn khách đến phòng chờ VIP hoặc cửa ra máy bay"
      ],
      popular: true
    },
    {
      name: "Gói Super VIP Fastrack (Có Xe Đón Sân Đỗ)",
      price: "Chỉ từ 1.800.000đ/khách",
      description: "Đặc quyền đón tiễn bằng xe riêng tại chân thang máy bay (sân đỗ)",
      features: [
        "Đón tại chân thang máy bay bằng xe VIP chuyên dụng",
        "Thủ tục kiểm tra nhập cảnh tại nhà ga riêng biệt",
        "Nhân viên xử lý trọn gói hành lý ký gửi VIP",
        "Được nghỉ ngơi tự do tại phòng chờ thương gia",
        "Bảo mật tối đa lộ trình di chuyển của khách VIP"
      ],
      popular: false
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Cung cấp thông tin chuyến bay",
      description: "Khách hàng gửi lịch trình bay, danh sách hành khách và ảnh mặt hộ chiếu cho ABTRIP trước giờ bay tối thiểu 12 tiếng."
    },
    {
      step: "02",
      title: "Đón tiếp tại điểm hẹn",
      description: "Nhân viên đón khách trực tiếp tại cửa ống lồng máy bay (ga đến) hoặc sảnh đi nhà ga (ga đi) kèm bảng tên nhận diện."
    },
    {
      step: "03",
      title: "Lối đi ưu tiên nhanh chóng",
      description: "Hộ tống quý khách di chuyển qua lối đi ưu tiên riêng biệt để hoàn tất nhanh thủ tục nhập cảnh/xuất cảnh và an ninh."
    },
    {
      step: "04",
      title: "Hỗ trợ hành lý & tiễn khách",
      description: "Nhân viên hỗ trợ lấy hành lý ký gửi ưu tiên tại băng chuyền, sắp xếp xe đẩy hành lý và đưa quý khách ra tận xe đón."
    }
  ];

  const testimonials = [
    {
      author: "Anh Nguyễn Hoàng Nam",
      role: "Giám đốc điều hành, Alpha Corp",
      content: "Dịch vụ VIP Fastrack của ABTRIP thực sự xuất sắc. Tôi thường xuyên bay công tác quốc tế, mỗi lần hạ cánh tại Tân Sơn Nhất chỉ mất chưa đầy 10 phút là đã ra tới xe, không cần xếp hàng hàng giờ mệt mỏi tại khu vực nhập cảnh. Vô cùng hài lòng!"
    },
    {
      author: "Chị Natalie Chen",
      role: "Nhà đầu tư nước ngoài (Singapore)",
      content: "Excellent service! The staff was waiting for me right at the aircraft gate with a clear sign. They led me through immigration check in less than 5 minutes. Luggage handling was superb. Definitely booking again."
    },
    {
      author: "Anh Phạm Thế Hiển",
      role: "Trưởng phòng Nhân sự, Vingroup",
      content: "Chúng tôi luôn sử dụng dịch vụ Fastrack của ABTRIP mỗi khi đón các chuyên gia nước ngoài sang làm việc tại Việt Nam. Các đối tác đều đánh giá rất cao sự chu đáo, lịch sự và tác phong phục vụ chuyên nghiệp của các bạn."
    }
  ];

  const faqs = [
    {
      question: "Dịch vụ VIP Fastrack có thực hiện đúng quy chuẩn hàng không quốc gia không?",
      answer: "Có. Dịch vụ VIP Fastrack của ABTRIP được thực hiện hoàn toàn hợp pháp và tuân thủ nghiêm ngặt các quy định an ninh sân bay, quy chế kiểm soát xuất nhập cảnh hàng không của Cục Quản lý xuất nhập cảnh Việt Nam."
    },
    {
      question: "Tôi có thể đặt dịch vụ khẩn sát giờ bay được không?",
      answer: "Chúng tôi hỗ trợ nhận đặt lịch dịch vụ khẩn cấp trước giờ bay tối thiểu từ 3 - 4 tiếng thông qua Hotline khẩn 0788320320. Tuy nhiên, để đảm bảo hồ sơ của khách được đăng ký hoàn tất trên hệ thống sân bay, khuyến nghị đặt trước ít nhất 12 - 24 tiếng."
    },
    {
      question: "Tôi bay chuyến bay đêm/rạng sáng thì có nhân viên hỗ trợ không?",
      answer: "Có. ABTRIP cung cấp dịch vụ túc trực và đón tiễn hành khách 24/7/365 tại các sân bay quốc tế lớn tại Việt Nam, bất kể chuyến bay của quý khách khởi hành hay hạ cánh vào khung giờ nào."
    },
    {
      question: "Hành lý của tôi có được miễn trừ kiểm tra hải quan không?",
      answer: "Không. Mọi hành lý của hành khách đi qua cửa khẩu hàng không quốc tế đều phải tuân thủ việc soi chiếu hải quan theo đúng quy định pháp luật Việt Nam. Nhân viên của chúng tôi hỗ trợ quý khách thực hiện quy trình này nhanh chóng hơn chứ không có thẩm quyền miễn trừ kiểm tra an ninh."
    }
  ];

  const config = {
    id: "fastrack",
    category: "airport" as const,
    title: "Dịch Vụ VIP Fastrack Sân Bay",
    subtitle: "Lối Đi Ưu Tiên - Trải Nghiệm Hành Trình Đẳng Cấp",
    description: "Bỏ qua các hàng dài chờ đợi xếp hàng làm thủ tục. Nhân viên đón tiếp trực tiếp tại sân bay và hỗ trợ dẫn quý khách qua luồng thủ tục hàng không ưu tiên nhanh chóng, bảo mật.",
    heroImage: "https://images.unsplash.com/photo-1499063078284-f78f7d89616a?q=80&w=2000&auto=format&fit=crop",
    badge: "Đi luồng ưu tiên nhanh gọn",
    geoTarget: "Hỗ trợ xuất nhập cảnh tại SGN, HAN, DAD, CXR, PQC theo đúng quy chuẩn",
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
