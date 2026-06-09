"use client";

import ServiceLandingPage from "@/components/ServiceLandingPage";
import { FileText, Clock, ShieldCheck, Sparkles, Star } from "lucide-react";

export default function Page() {
  const features = [
    {
      title: "Cấp Phép Bay Quá Cảnh & Hạ Cánh",
      description: "Đại diện xin giấy phép bay quá cảnh (Overflight Permit), phép hạ cánh kỹ thuật / thương mại (Landing Permit) nhanh chóng từ Cục Hàng không Việt Nam (CAAV).",
      icon: <FileText className="w-6 h-6" />
    },
    {
      title: "Điều Phối Slot Sân Bay Khẩn Cấp",
      description: "Thương lượng điều phối giờ cất hạ cánh (Slot Coordination) tại các sân bay mật độ cao như SGN, HAN vào các khung giờ vàng tối ưu nhất.",
      icon: <Clock className="w-6 h-6" />
    },
    {
      title: "Lập & Nộp Kế Hoạch Bay (FPL)",
      description: "Hỗ trợ tổ bay xây dựng đường hàng không (route), soạn thảo và nộp kế hoạch bay (Flight Plan) lên các trung tâm quản lý bay khu vực (ACC) theo đúng chuẩn ICAO.",
      icon: <ShieldCheck className="w-6 h-6" />
    }
  ];

  const details = [
    {
      title: "Hỗ Trợ Pháp Lý Khai Thác Bầu Trời Việt Nam Chuyên Nghiệp",
      description: "Quy trình thủ tục xin phép bay và điều phối slots tại Việt Nam đòi hỏi các bên khai thác phải chuẩn bị hồ sơ kỹ thuật tàu bay, chứng chỉ phi hành đoàn cực kỳ khắt khe và tuân thủ các quy định an ninh quốc gia nghiêm ngặt. Bộ phận điều hành bay (Flight Dispatch) của ABTRIP với mạng lưới quan hệ sâu rộng, am hiểu quy trình xử lý hồ sơ hành chính của CAAV sẽ đại diện quý khách thực hiện trọn gói quy trình này, rút ngắn tối đa thời gian phê duyệt hồ sơ và hạn chế tối đa rủi ro chậm trễ hành trình bay.",
      image: "https://images.unsplash.com/photo-1517976487492-5750f3195933?q=80&w=1000",
      bullets: [
        "Xin phép bay quá cảnh (Overflight Permit) khẩn trong 12 - 24 giờ",
        "Giấy phép bay hạ cánh thương mại (Commercial Charter) hoặc tư nhân",
        "Hỗ trợ xin phép cho các chuyến bay chở hàng hóa (Cargo Flight)",
        "Đại diện nộp hồ sơ xin phép bay kỹ thuật (Technical Landing)"
      ]
    },
    {
      title: "Giải Pháp Điều Phối Slot Giờ Vàng & Nộp FPL Tự Động",
      description: "Tại các sân bay trọng điểm thường xuyên nghẽn hạ tầng như Tân Sơn Nhất (SGN) và Nội Bài (HAN), việc giành được slot cất hạ cánh phù hợp là yếu tố quyết định hiệu quả khai thác chuyến bay. ABTRIP hỗ trợ các hãng hàng không đàm phán slot, theo dõi cập nhật thay đổi và lập kế hoạch bay (FPL) chi tiết thông qua các kênh chuyên dụng gửi trực tiếp tới các cơ quan quản lý bay vùng thông báo bay (FIR) của Việt Nam.",
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1000",
      bullets: [
        "Đàm phán xin slot khẩn cấp sát ngày bay",
        "Lập kế hoạch đường bay (Route) tối ưu nhiên liệu",
        "Nộp và cập nhật kế hoạch bay FPL qua mạng AFTN/AMHS",
        "Theo dõi thời gian thực chuyến bay và hỗ trợ điều hành mặt đất"
      ]
    }
  ];

  const packages = [
    {
      name: "Gói Phép Bay Quá Cảnh (Overflight)",
      price: "Báo giá theo dòng tàu bay",
      description: "Xin phép bay quá cảnh qua vùng thông báo bay (FIR) của Việt Nam",
      features: [
        "Hỗ trợ chuẩn bị hồ sơ kỹ thuật tàu bay",
        "Nộp đơn xin phép bay quá cảnh lên CAAV",
        "Xin phép bay khẩn cấp trong vòng 24 giờ",
        "Nộp và phân bổ kế hoạch bay FPL miễn phí",
        "Theo dõi hành trình bay qua radar thời gian thực"
      ],
      popular: false
    },
    {
      name: "Gói Phép Hạ Cánh & Slots (Landing & Slot)",
      price: "Báo giá theo loại hình chuyến bay",
      description: "Xin phép hạ cánh thương mại/tư nhân và điều phối slots sân bay Việt Nam",
      features: [
        "Xin giấy phép hạ cánh chính thức từ Cục Hàng không",
        "Đàm phán và điều phối slot cất hạ cánh tại SGN, HAN, DAD...",
        "Hỗ trợ thủ tục sửa đổi giấy phép bay khi thay đổi lịch trình",
        "Lập và nộp kế hoạch bay FPL chi tiết chuẩn ICAO",
        "Đại diện làm việc trực tiếp với cơ quan Quản lý bay Việt Nam"
      ],
      popular: true
    },
    {
      name: "Gói Phép Bay Khẩn Cấp (MEDEVAC / AOG)",
      price: "Tối ưu hóa thời gian xử lý nhanh nhất",
      description: "Dành cho các chuyến bay cứu trợ y tế hoặc tàu bay gặp sự cố kỹ thuật",
      features: [
        "Đội ngũ điều hành bay túc trực 24/7/365 xử lý khẩn cấp",
        "Xin giấy phép bay nhân đạo y tế nhanh nhất trong 3 - 6 tiếng",
        "Điều phối slot ưu tiên khẩn cấp cho chuyến bay MEDEVAC",
        "Hỗ trợ trọn gói thủ tục hải quan y tế cho tổ bay và bệnh nhân",
        "Hỗ trợ kỹ thuật mặt đất AOG ưu tiên tại sân đỗ"
      ],
      popular: false
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Tiếp nhận hồ sơ bay",
      description: "Khai thác viên cung cấp thông tin tàu bay (chứng chỉ bảo hiểm, đăng ký tàu bay), danh sách tổ bay và lịch trình chi tiết."
    },
    {
      step: "02",
      title: "Nộp hồ sơ CAAV",
      description: "ABTRIP soạn thảo hồ sơ pháp lý, nộp đơn trực tiếp lên Cục Hàng không Việt Nam và làm việc xin slot tại cảng hàng không."
    },
    {
      step: "03",
      title: "Nộp kế hoạch bay (FPL)",
      description: "Sau khi có giấy phép bay và slot, bộ phận Dispatch lập kế hoạch bay và nộp FPL lên hệ thống quản lý bay quốc gia."
    },
    {
      step: "04",
      title: "Theo dõi khai thác",
      description: "Giám sát hành trình bay thời gian thực, phối hợp cùng phi hành đoàn và đại diện mặt đất hỗ trợ tàu bay hạ cánh an toàn."
    }
  ];

  const testimonials = [
    {
      author: "Capt. Alexander Fischer",
      role: "Cơ trưởng, hãng Global Jet Charter (Đức)",
      content: "ABTRIP saved our flight! We had an urgent charter flight to Ho Chi Minh City with only 24 hours to secure the landing permit and airport slots. Their flight dispatch team handled everything flawlessly. Highly professional dispatch services!"
    },
    {
      author: "Anh Bùi Quốc Toản",
      role: "Trưởng đại diện, Air Asia Group tại Việt Nam",
      content: "Làm việc với đội ngũ điều hành bay của ABTRIP nhiều năm nay, tôi hoàn toàn yên tâm về dịch vụ xin phép bay khẩn và điều phối slot của họ. Tác phong nhanh nhẹn, chính xác và xử lý tình huống phát sinh cực kỳ nhạy bén."
    },
    {
      author: "Chị Elena Rostova",
      role: "Operations Director, AeroLink Services (Nga)",
      content: "Excellent support for our private jet operations in Vietnam. Prompt response, deep knowledge of CAAV regulations, and smooth coordination with local airport authorities. Highly recommend ABTRIP's ground support services."
    }
  ];

  const faqs = [
    {
      question: "Thời gian tối thiểu để xin phép bay hạ cánh thông thường là bao lâu?",
      answer: "Theo quy chế của Cục Hàng không Việt Nam (CAAV), đối với các chuyến bay thường lệ thương mại, hồ sơ cần được gửi trước ít nhất 7 ngày làm việc. Đối với các chuyến bay chuyên cơ tư nhân phi thương mại (Non-commercial / Private jet), thời gian xin phép chuẩn là từ 3 - 5 ngày làm việc. Trong trường hợp khẩn cấp, ABTRIP có thể hỗ trợ xin cấp phép khẩn trong vòng 24 - 48 giờ."
    },
    {
      question: "Chuyến bay cứu trợ y tế khẩn cấp (MEDEVAC) được xử lý như thế nào?",
      answer: "Đối với các chuyến bay y tế cứu người hoặc cứu trợ nhân đạo thiên tai, chúng tôi cung cấp đường dây nóng túc trực 24/7/365 để tiếp nhận yêu cầu. ABTRIP sẽ làm việc trực tiếp với Cục Hàng không và Bộ Ngoại giao để xin cấp phép bay khẩn cấp tối đa trong vòng 3 - 6 tiếng, đồng thời xin điều phối slot ưu tiên hạ cánh sát khu vực y tế tại sân bay."
    },
    {
      question: "Nếu lịch trình bay thay đổi đột xuất, tôi có phải xin lại giấy phép bay mới không?",
      answer: "Tùy thuộc vào thời gian thay đổi. Nếu lịch bay thay đổi trong phạm vi dưới 24 tiếng so với giờ bay cũ, chúng tôi chỉ cần nộp đơn xin điều chỉnh giờ bay (Delay/Bring forward) và xin cấp lại Slot mới. Nếu lịch bay thay đổi trên 24 tiếng hoặc thay đổi đường bay (Route), bắt buộc phải làm thủ tục xin sửa đổi giấy phép bay chính thức từ CAAV."
    },
    {
      question: "ABTRIP có hỗ trợ dịch vụ nộp kế hoạch bay FPL cho chặng bay quốc tế ngoài Việt Nam không?",
      answer: "Có. Bộ phận điều hành bay của chúng tôi sử dụng các hệ thống lập kế hoạch bay chuyên nghiệp kết nối toàn cầu, hỗ trợ lập đường bay và nộp FPL quá cảnh qua không phận của nhiều quốc gia lân cận như Campuchia, Lào, Thái Lan, Trung Quốc, Singapore..."
    }
  ];

  const config = {
    id: "cap-phep-bay",
    category: "ground" as const,
    title: "Dịch Vụ Xin Giấy Phép Bay & Slots",
    subtitle: "Xin Phép Nhanh Chóng - Đúng Quy Định - Hỗ Trợ Khẩn 24/7",
    description: "Hỗ trợ các hãng hàng không và đơn vị khai thác chuyên cơ xin cấp phép bay quá cảnh (Overflight), phép hạ cánh (Landing Permit) và điều phối giờ cất hạ cánh (Slot Coordination) tại Cục Hàng không Việt Nam nhanh chóng, đúng quy trình pháp lý.",
    heroImage: "https://images.unsplash.com/photo-1517976487492-5750f3195933?q=80&w=2000&auto=format&fit=crop",
    badge: "Xin giấy phép bay nhanh gọn",
    geoTarget: "Làm việc trực tiếp với Cục Hàng không Việt Nam (CAAV) và các cơ quan quản lý",
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
