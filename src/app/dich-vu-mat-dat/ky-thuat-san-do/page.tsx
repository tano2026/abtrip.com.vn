"use client";

import ServiceLandingPage from "@/components/ServiceLandingPage";
import { Settings, ShieldCheck, Clock, Star } from "lucide-react";

export default function Page() {
  const features = [
    {
      title: "Tra Nạp Nhiên Liệu Jet A-1",
      description: "Cung ứng nhiên liệu hàng không Jet A-1 đạt chuẩn JIG quốc tế, đo lường chính xác, quy trình tra nạp tuyệt đối an toàn phòng chống cháy nổ.",
      icon: <Settings className="w-6 h-6" />
    },
    {
      title: "Cung Cấp Thiết Bị Mặt Đất GSE",
      description: "Cho thuê trang thiết bị mặt đất đa dạng: xe phát điện GPU, xe khởi động khí nén ASU, xe điều hòa mặt đất (ACU) đáp ứng mọi dòng tàu bay.",
      icon: <ShieldCheck className="w-6 h-6" />
    },
    {
      title: "Dịch Vụ Cabin Trọn Gói",
      description: "Dọn dẹp vệ sinh cabin chuyên sâu, tra nạp nước sạch sinh hoạt và xử lý chất thải sinh hoạt tàu bay đúng quy chuẩn vệ sinh y tế cảng hàng không.",
      icon: <Clock className="w-6 h-6" />
    }
  ];

  const details = [
    {
      title: "Dịch Vụ Cung Ứng & Tra Nạp Nhiên Liệu Jet A-1 Đạt Chuẩn JIG",
      description: "Nhiên liệu hàng không Jet A-1 là huyết quản của mỗi chuyến bay, yêu cầu chất lượng tinh khiết tuyệt đối không được lẫn tạp chất hay nước. ABTRIP hợp tác với các nhà cung ứng nhiên liệu hàng đầu được Cục Hàng không cấp phép, cung cấp hệ thống xe bồn tra nạp công suất lớn trực tiếp tại sân đỗ. Mọi quy trình từ tiếp nhận, kiểm tra mẫu thử, kiểm soát áp suất và lưu lượng tra nạp đều tuân thủ các quy tắc an toàn nghiêm ngặt nhất của Hiệp hội Nhiên liệu Hàng không Quốc tế (JIG).",
      image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=1000",
      bullets: [
        "Nhiên liệu Jet A-1 chính hãng, lọc sạch tạp chất 100%",
        "Quy trình tra nạp kiểm soát áp suất an toàn tuyệt đối",
        "Đo lường lưu lượng tra nạp bằng đồng hồ điện tử minh bạch",
        "Có xe bồn túc trực sẵn sàng nạp khẩn cấp cho chuyến bay"
      ]
    },
    {
      title: "Trang Thiết Bị Mặt Đất GSE Hiện Đại & Phục Vụ Cabin Chu Đáo",
      description: "Để bảo đảm thời gian quay đầu tàu bay (Turnaround Time - TAT) chuẩn xác, việc cung ứng thiết bị mặt đất (GSE) kịp thời là yếu tố then chốt. ABTRIP cung cấp các thiết bị GPU phát điện, ASU khởi động khí nén và hệ thống xe kéo dắt tàu bay công suất lớn. Đồng thời, đội ngũ nhân viên cabin của chúng tôi sẽ thực hiện dọn dẹp vệ sinh cabin chuyên sâu, tra nạp nước uống tinh khiết và xử lý chất thải sinh hoạt đúng quy trình vệ sinh sân bay.",
      image: "https://images.unsplash.com/photo-1517976487492-5750f3195933?q=80&w=1000",
      bullets: [
        "Thiết bị phát điện GPU và khởi động ASU hoạt động tin cậy",
        "Dịch vụ dọn dẹp vệ sinh cabin nhanh chóng, sạch sẽ",
        "Dịch vụ nạp nước sạch sinh hoạt đạt tiêu chuẩn y tế",
        "Xe kéo dắt tàu bay chuyên dụng từ vị trí đỗ ra đường lăn"
      ]
    }
  ];

  const packages = [
    {
      name: "Gói Tra Nạp Nhiên Liệu (Fueling Services)",
      price: "Báo giá theo sản lượng Jet A-1 thực tế",
      description: "Cung ứng nhiên liệu Jet A-1 cho mọi chuyến bay thương mại và chuyên cơ",
      features: [
        "Tra nạp nhiên liệu Jet A-1 đạt chuẩn JIG quốc tế",
        "Hỗ trợ đo lường và kiểm tra mẫu thử trước khi nạp",
        "Đồng hồ đo điện tử xuất hóa đơn chính xác tại chân thang",
        "Túc trực xe bồn hỗ trợ nạp khẩn cấp theo lịch bay",
        "Hỗ trợ thủ tục thuế quan nhiên liệu (nếu cần)"
      ],
      popular: true
    },
    {
      name: "Gói Phục Vụ Cabin Trọn Gói (Cabin Services)",
      price: "Báo giá theo dòng tàu bay",
      description: "Dịch vụ vệ sinh dọn dẹp cabin và cung cấp tiện ích sinh hoạt tàu bay",
      features: [
        "Dọn dẹp vệ sinh cabin, gom chất thải sinh hoạt sau bay",
        "Cung cấp và tra nạp nước sạch sinh hoạt chuẩn y tế",
        "Hỗ trợ hút xả chất thải sinh hoạt tàu bay an toàn",
        "Hỗ trợ chất xếp chăn ga, gối, khăn ăn phục vụ khách",
        "Kiểm soát chất lượng vệ sinh theo chuẩn hãng bay"
      ],
      popular: false
    },
    {
      name: "Cho Thuê Thiết Bị Mặt Đất (GSE Rental)",
      price: "Báo giá theo giờ sử dụng thiết bị",
      description: "Cung cấp trang thiết bị mặt đất phục vụ kỹ thuật tại vị trí đỗ",
      features: [
        "Cung cấp xe phát điện mặt đất (GPU) công suất cao",
        "Cung cấp xe khởi động khí nén (ASU) phục vụ khởi động động cơ",
        "Cung cấp xe điều hòa mặt đất (ACU) làm mát cabin",
        "Cung cấp xe kéo dắt tàu bay công suất lớn",
        "Kỹ thuật viên vận hành thiết bị chuyên nghiệp"
      ],
      popular: false
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Tiếp nhận yêu cầu kỹ thuật",
      description: "Khai thác viên gửi lịch bay, dòng tàu bay, lượng nhiên liệu Jet A-1 cần nạp và danh sách thiết bị GSE cần thuê."
    },
    {
      step: "02",
      title: "Chuẩn bị phương tiện",
      description: "Kiểm tra kỹ thuật thiết bị GSE, điều phối nhân viên kỹ thuật sân đỗ và chuẩn bị xe bồn nhiên liệu vào vị trí chờ."
    },
    {
      step: "03",
      title: "Triển khai tại chân tàu bay",
      description: "Tàu bay hạ cánh, nhân viên kỹ thuật kết nối GPU/ASU, tiến hành tra nạp nhiên liệu Jet A-1 và dọn dẹp cabin."
    },
    {
      step: "04",
      title: "Nghiệm thu & Ký biên bản",
      description: "Kỹ thuật viên ký xác nhận biên bản cung ứng dịch vụ (Ramp Service Voucher) và bàn giao hóa đơn nhiên liệu cho cơ trưởng."
    }
  ];

  const testimonials = [
    {
      author: "Capt. Marcus Vance",
      role: "Cơ trưởng, hãng ExecuJet Charter Services",
      content: "Fast and extremely reliable fueling and ground power services at SGN airport. The fuel truck was waiting for us when we landed, and the GPU was connected immediately. Great turnaround efficiency from the ABTRIP ground team!"
    },
    {
      author: "Anh Hoàng Minh Tuấn",
      role: "Giám đốc Khai thác mặt đất, Bamboo Airways",
      content: "Chúng tôi đánh giá rất cao năng lực cung ứng thiết bị mặt đất và phục vụ kỹ thuật cabin của ABTRIP tại các đầu sân bay lẻ. Dịch vụ dọn dẹp cabin sạch sẽ, đúng giờ giúp nâng cao đáng kể chỉ số đúng giờ OTP của hãng."
    },
    {
      author: "Mr. Lee Sang-woo",
      role: "Ramp Duty Manager, K-Cargo Flights (Hàn Quốc)",
      content: "Excellent ground support for our cargo operations. The GSE equipment (GPU and ASU) provided was in top technical condition. Their ramp team works with very high safety standards. Will continue using their services."
    }
  ];

  const faqs = [
    {
      question: "Nhiên liệu Jet A-1 do ABTRIP cung cấp có nguồn gốc từ đâu và đạt tiêu chuẩn nào?",
      answer: "Nhiên liệu Jet A-1 của chúng tôi được nhập khẩu chính ngạch từ các tập đoàn dầu khí hàng đầu, được lưu trữ và tra nạp thông qua các kho nhiên liệu sân bay do Cục Hàng không Việt Nam cấp phép. Nhiên liệu cam kết đạt tiêu chuẩn chất lượng quốc tế IATA Guidance Material và quy chuẩn kỹ thuật JIG mới nhất."
    },
    {
      question: "Khi tàu bay hạ cánh khẩn cấp (AOG), thiết bị GSE của ABTRIP có hỗ trợ được ngay không?",
      answer: "Có. ABTRIP túc trực điều phối thiết bị GSE 24/7/365 tại sân đỗ. Trong trường hợp tàu bay gặp sự cố kỹ thuật khẩn cấp (AOG), chúng tôi sẽ ưu tiên điều động xe phát điện GPU, xe khởi động ASU và xe ACU làm mát cabin đến vị trí đỗ trong vòng 15 - 30 phút để hỗ trợ thợ máy sửa chữa."
    },
    {
      question: "Quy trình vệ sinh dọn dẹp cabin tàu bay mất bao nhiêu thời gian?",
      answer: "Thời gian dọn dẹp cabin tùy thuộc vào dòng tàu bay và yêu cầu của hãng (dọn nhanh transit hay dọn sâu cuối ngày). Thông thường, đối với tàu bay thân hẹp (như A321/B737), quy trình dọn vệ sinh transit tiêu chuẩn diễn ra trong vòng 15 - 20 phút bởi đội ngũ 6 - 8 nhân viên chuyên nghiệp."
    },
    {
      question: "Tôi có thể thanh toán chi phí tra nạp nhiên liệu Jet A-1 bằng thẻ tín dụng hàng không (Fuel Card) không?",
      answer: "Có. ABTRIP hỗ trợ thanh toán chi phí nhiên liệu linh hoạt. Chúng tôi chấp nhận hầu hết các loại thẻ tín dụng nhiên liệu quốc tế phổ biến như World Fuel Services, AVCARD, UVair, Colt International... hoặc thanh toán bằng hình thức chuyển khoản bảo lãnh trước chuyến bay."
    }
  ];

  const config = {
    id: "ky-thuat-san-do",
    category: "ground" as const,
    title: "Dịch Vụ Kỹ Thuật Sân Đỗ & Tra Nạp Nhiên Liệu",
    subtitle: "Khai Thác An Toàn - Chuẩn Xác - Tiết Kiệm Thời Gian TAT",
    description: "Cung ứng dịch vụ kỹ thuật sân đỗ (Ramp Services) và tra nạp nhiên liệu hàng không Jet A-1 trọn gói. Đầy đủ trang thiết bị mặt đất GSE hiện đại (GPU, ASU, ACU), dọn dẹp cabin chuyên nghiệp và xử lý nước sạch/chất thải sinh hoạt tàu bay.",
    heroImage: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=2000&auto=format&fit=crop",
    badge: "Kỹ thuật mặt đất & tra nạp nhiên liệu",
    geoTarget: "Phục vụ kỹ thuật tại sân đỗ SGN, HAN, DAD, CXR, PQC",
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
