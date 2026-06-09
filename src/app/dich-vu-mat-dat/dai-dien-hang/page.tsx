"use client";

import ServiceLandingPage from "@/components/ServiceLandingPage";
import { UserCheck, ShieldAlert, Award, ShieldCheck, Clock, Star } from "lucide-react";

export default function Page() {
  const features = [
    {
      title: "Đại Diện Dịch Vụ Hành Khách",
      description: "Quản lý, giám sát quy trình làm thủ tục check-in tại quầy, hỗ trợ hành khách gặp sự cố về vé, giấy tờ tùy thân và xử lý nâng hạng dịch vụ.",
      icon: <UserCheck className="w-6 h-6" />
    },
    {
      title: "Giám Sát An Toàn Sân Đỗ (Ramp)",
      description: "Giám sát quy trình phục vụ kỹ thuật mặt đất, tra nạp nhiên liệu Jet A-1, dọn dẹp cabin tàu bay, cung ứng suất ăn theo đúng tiêu chuẩn an toàn hàng không.",
      icon: <ShieldAlert className="w-6 h-6" />
    },
    {
      title: "Xử Lý Hành Lý Lost & Found",
      description: "Đại diện hãng hàng không tiếp nhận, xử lý khiếu nại về hành lý thất lạc, hư hỏng của hành khách tại quầy Lost & Found theo Công ước Montreal.",
      icon: <Award className="w-6 h-6" />
    }
  ];

  const details = [
    {
      title: "Giải Pháp Đại Diện Hãng Khai Thác Sân Bay Trọn Gói & Tiết Kiệm",
      description: "Đối với các hãng hàng không quốc tế hoặc hãng bay Charter khai thác tần suất không thường lệ đến Việt Nam, việc thiết lập một văn phòng đại diện thường trú tại sân bay đòi hỏi chi phí đầu tư rất lớn và quy trình pháp lý phức tạp. Dịch vụ đại diện hãng (Supervisory Agent) của ABTRIP mang lại giải pháp thay thế hoàn hảo. Chúng tôi cung cấp đội ngũ chuyên viên có chứng chỉ chuyên môn, am hiểu quy trình khai thác cảng hàng không và luật hàng không dân dụng Việt Nam, đại diện hãng giám sát toàn bộ hoạt động khai thác mặt đất, bảo đảm chuyến bay cất cánh an toàn và đúng giờ.",
      image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=1000",
      bullets: [
        "Tiết kiệm đến 60% chi phí vận hành nhân sự thường trú",
        "Giám sát chất lượng dịch vụ check-in hành khách và hành lý",
        "Cầu nối thông tin liên lạc 24/7 giữa tổ bay, hãng và cảng hàng không",
        "Thay mặt hãng xử lý thủ tục CIQ cho phi hành đoàn và hành khách"
      ]
    },
    {
      title: "Giám Sát Quy Trình Ramp Chuyên Sâu & Xử Lý Sự Cố Kỹ Thuật (AOG)",
      description: "An toàn khai thác bay là ưu tiên số một. Chuyên viên giám sát sân đỗ của ABTRIP sẽ trực tiếp túc trực tại chân tàu bay để giám sát chất lượng dọn dẹp cabin, tra nạp nhiên liệu, dịch vụ GPU/Air Starter và chất xếp hành lý lên hầm hàng. Khi xảy ra sự cố kỹ thuật đột xuất làm tàu bay phải nằm lại sân đỗ (AOG), chúng tôi sẽ hỗ trợ điều phối khẩn cấp phụ tùng thay thế qua hải quan và phối hợp cùng thợ máy sân bay khắc phục nhanh sự cố.",
      image: "https://images.unsplash.com/photo-1517976487492-5750f3195933?q=80&w=1000",
      bullets: [
        "Giám sát an toàn chất xếp hàng hóa hành lý lên hầm hàng",
        "Hỗ trợ thủ tục hải quan thông quan phụ tùng thay thế AOG khẩn",
        "Kiểm soát thời gian quay đầu tàu bay (Turnaround Time - TAT)",
        "Lập báo cáo khai thác chuyến bay chi tiết gửi về tổng bộ của hãng"
      ]
    }
  ];

  const packages = [
    {
      name: "Đại Diện Chuyến Bay Lẻ (Ad-hoc Charter)",
      price: "Báo giá theo loại chuyến bay",
      description: "Áp dụng cho các chuyến bay charter lẻ, bay thuê chuyến du lịch/hàng hóa",
      features: [
        "Đón tiếp và làm thủ tục check-in nhanh cho hành khách đoàn",
        "Giám sát quy trình phục vụ kỹ thuật mặt đất tại sân đỗ",
        "Hỗ trợ làm thủ tục CIQ xuất nhập cảnh cho tổ bay",
        "Bàn giao hồ sơ chuyến bay (Loadsheet, Flight Release) cho cơ trưởng",
        "Báo cáo chất lượng dịch vụ sau khi chuyến bay cất cánh"
      ],
      popular: false
    },
    {
      name: "Đại Diện Hãng Thường Lệ (Scheduled Representative)",
      price: "Hợp đồng trọn gói theo tháng/năm",
      description: "Dành cho các hãng hàng không khai thác lịch bay thường lệ đến Việt Nam",
      features: [
        "Thiết lập bộ máy nhân sự đại diện hãng túc trực tại sân bay",
        "Giám sát trọn gói dịch vụ hành khách, quầy check-in, phòng chờ VIP",
        "Giám sát dịch vụ kỹ thuật sân đỗ và tra nạp nhiên liệu Jet A-1",
        "Đại diện xử lý hành lý thất lạc (Lost & Found) của hành khách",
        "Thay mặt hãng làm việc với Hải quan, Biên phòng, An ninh sân bay"
      ],
      popular: true
    },
    {
      name: "Giám Sát Sân Đỗ Chuyên Sâu (Ramp Supervision)",
      price: "Báo giá theo lượt phục vụ chuyến bay",
      description: "Tập trung giám sát chất lượng kỹ thuật mặt đất tại chân tàu bay",
      features: [
        "Có mặt tại sân đỗ trước khi tàu bay hạ cánh 30 phút",
        "Giám sát quy trình chất xếp hành lý/hàng hóa an toàn",
        "Kiểm tra chất lượng dọn dẹp vệ sinh cabin và tra nạp nước sạch",
        "Giám sát quy trình tra nạp nhiên liệu an toàn phòng chống cháy nổ",
        "Ký xác nhận biên bản cung ứng dịch vụ mặt đất"
      ],
      popular: false
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Tiếp nhận quy chuẩn khai thác",
      description: "Hãng hàng không cung cấp lịch bay chi tiết, dòng tàu bay, quy chuẩn phục vụ (SLA) và tài liệu hướng dẫn nghiệp vụ của hãng."
    },
    {
      step: "02",
      title: "Thiết lập đội ngũ đại diện",
      description: "ABTRIP phân bổ nhân sự có chứng chỉ chuyên môn phù hợp, đăng ký thẻ kiểm soát an ninh sân bay dài hạn cấp bởi Cảng hàng không."
    },
    {
      step: "03",
      title: "Phục vụ chuyến bay trực tiếp",
      description: "Nhân viên túc trực tại quầy check-in và sân đỗ trước giờ cất/hạ cánh 3 tiếng để điều hành toàn bộ quy trình dịch vụ mặt đất."
    },
    {
      step: "04",
      title: "Báo cáo & Đối chiếu số liệu",
      description: "Gửi báo cáo khai thác chuyến bay chi tiết (MVT, LDM, Delay Code nếu có) và tài liệu tài chính đối chiếu định kỳ hàng tháng."
    }
  ];

  const testimonials = [
    {
      author: "Mr. Kenji Tanaka",
      role: "Station Operations Manager, Japan Charter Airlines",
      content: "We have partnered with ABTRIP for our cargo charter operations at SGN airport. Their team is extremely professional, providing detailed ramp supervision reports and handling customs clearances efficiently. They have helped us avoid costly ground delays multiple times."
    },
    {
      author: "Anh Nguyễn Quang Dũng",
      role: "Trưởng phòng Khai thác bay, Vietstar Airlines",
      content: "Dịch vụ đại diện hãng của ABTRIP giúp chúng tôi tối ưu hóa nguồn lực và kiểm soát tốt chất lượng dịch vụ mặt đất tại các sân bay miền Trung và miền Nam. Nhân viên am hiểu quy trình cảng và phối hợp rất ăn ý với tổ bay."
    },
    {
      author: "Ms. Linda Wu",
      role: "Operations Coordinator, Pacific Cargo Services (Hong Kong)",
      content: "Reliable and highly responsive station representation in Vietnam. ABTRIP assisted us during a critical Aircraft-on-Ground (AOG) event by coordinating with the local customs authority to release aircraft spare parts in record time."
    }
  ];

  const faqs = [
    {
      question: "Nhân viên đại diện hãng của ABTRIP có thẻ kiểm soát an ninh để vào khu vực sân đỗ không?",
      answer: "Có. Toàn bộ nhân sự đại diện hãng và giám sát sân đỗ của ABTRIP đều được trang bị Thẻ kiểm soát an ninh sân bay dài hạn (do Cục Hàng không hoặc Cảng hàng không Việt Nam cấp), cho phép di chuyển vào khu vực cách ly, quầy thủ tục xuất nhập cảnh và sân đỗ tàu bay để hỗ trợ tổ bay và hành khách."
    },
    {
      question: "Dịch vụ Lost & Found của ABTRIP hoạt động như thế nào?",
      answer: "Chúng tôi thay mặt hãng hàng không túc trực tại quầy Lost & Found của nhà ga đến để tiếp nhận khai báo của hành khách khi hành lý bị thất lạc hoặc hư hại. Nhân viên sẽ lập Biên bản bất thường về hành lý (PIR), cập nhật dữ liệu lên hệ thống WorldTracer toàn cầu, phối hợp vận chuyển hành lý về tận nhà khách và thực hiện các thủ tục đền bù theo đúng quy chế của hãng."
    },
    {
      question: "Hợp đồng đại diện hãng hàng không thường lệ có thời hạn tối thiểu là bao lâu?",
      answer: "Để đảm bảo tính ổn định trong công tác vận hành, đăng ký thẻ kiểm soát an ninh và đào tạo nghiệp vụ chuyên sâu theo chuẩn của hãng, hợp đồng đại diện hãng thường lệ thường được ký kết với thời hạn tối thiểu là 1 năm. Đối với các chuyến bay charter, chúng tôi hỗ trợ ký kết hợp đồng theo gói lẻ hoặc chuỗi chuyến bay ngắn ngày."
    },
    {
      question: "ABTRIP có giấy phép cung cấp dịch vụ kỹ thuật mặt đất trực tiếp không?",
      answer: "ABTRIP đóng vai trò là Đại lý giám sát (Supervisory Agent) đại diện cho hãng hàng không để kiểm soát và điều phối chất lượng của các đơn vị cung cấp dịch vụ mặt đất trực tiếp tại sân bay (như VIAGS, SAGS, HGS). Việc này giúp hãng bay có một bên thứ ba độc lập bảo vệ quyền lợi, kiểm soát chi phí dịch vụ mặt đất tránh việc bị tính khống sản lượng."
    }
  ];

  const config = {
    id: "dai-dien-hang",
    category: "ground" as const,
    title: "Dịch Vụ Đại Diện Hãng Hàng Không",
    subtitle: "Giám Sát Chuyên Nghiệp - Khai Thác An Toàn & Tối Ưu Chi Phí",
    description: "Giải pháp đại diện sân bay toàn diện dành cho các hãng hàng không quốc tế và chuyến bay Charter. Giám sát dịch vụ hành khách tại quầy check-in, kiểm soát an toàn kỹ thuật mặt đất tại sân đỗ và xử lý khiếu nại Lost & Found.",
    heroImage: "https://images.unsplash.com/photo-1517976487492-5750f3195933?q=80&w=2000&auto=format&fit=crop",
    badge: "Đại lý đại diện hãng sân bay",
    geoTarget: "Phục vụ triển khai đại diện tại các cảng hàng không SGN, HAN, DAD, CXR, PQC",
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
