"use client";

import ServiceLandingPage from "@/components/ServiceLandingPage";
import { Plane, Compass, Award, ShieldCheck, Clock, Star } from "lucide-react";

export default function Page() {
  const features = [
    {
      title: "Đa Dạng Dòng Máy Bay Cao Cấp",
      description: "Đội tàu bay chuyên cơ đa dạng từ các dòng phản lực mini (Light Jet), phản lực tầm trung (Midsize Jet) đến các dòng chuyên cơ tầm xa siêu sang (Heavy Jet) của Gulfstream, Bombardier, Cessna...",
      icon: <Plane className="w-6 h-6" />
    },
    {
      title: "Hành Trình Cá Nhân Hóa 100%",
      description: "Quý khách toàn quyền quyết định giờ bay, điểm khởi hành, điểm đến và lịch trình di chuyển mà không phụ thuộc vào bất kỳ hãng bay thương mại nào.",
      icon: <Compass className="w-6 h-6" />
    },
    {
      title: "Dịch Vụ Mặt Đất VIP Trọn Gói",
      description: "Thủ tục hải quan an ninh (CIQ) biệt lập tại nhà ga chuyên cơ riêng (FBO), đón tiếp chu đáo sát chân thang máy bay bằng xe VIP chuyên dụng.",
      icon: <Award className="w-6 h-6" />
    }
  ];

  const details = [
    {
      title: "Trải Nghiệm Hành Trình Độc Bản Với Chuyên Cơ Tư Nhân",
      description: "Thuê chuyên cơ riêng (Private Jet Charter) là biểu tượng đỉnh cao của sự tiện nghi, chủ động và bảo mật tuyệt đối dành cho các chính khách, tỷ phú và doanh nhân cấp cao. Lược bỏ hoàn toàn những thủ tục check-in rườm rà hay việc phải xếp hàng chờ đợi soi chiếu tại các nhà ga công cộng đông đúc. Với ABTRIP, quý khách sẽ được đón tiếp tại nhà ga chuyên cơ riêng biệt (FBO), đi lối đi VIP chuyên dụng, hoàn thành thủ tục xuất nhập cảnh chỉ trong 5 phút và cất cánh bay thẳng đến điểm đến đúng theo kế hoạch cá nhân.",
      image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=1000",
      bullets: [
        "Tự do lựa chọn điểm xuất phát và giờ bay linh hoạt",
        "Lối đi VIP biệt lập, bảo mật tối đa danh tính hành khách",
        "Hỗ trợ các chuyến bay thẳng quốc tế không cần transit",
        "Thủ tục kiểm tra an ninh và CIQ ưu tiên tại FBO"
      ]
    },
    {
      title: "Không Gian Cabin Siêu Sang & Thực Đơn Michelin Độc Quyền",
      description: "Bên trong khoang cabin chuyên cơ là không gian yên tĩnh và riêng tư tuyệt đối, được thiết kế như một văn phòng làm việc trên không hay một phòng ngủ hạng sang với ghế sofa da cao cấp có thể ngả phẳng thành giường ngủ. Suốt hành trình bay, đội ngũ tiếp viên chuyên trách sẽ túc trực phục vụ các suất ăn hảo hạng chuẩn phong cách nhà hàng Michelin được thiết kế riêng theo khẩu vị và chế độ dinh dưỡng cá nhân của quý khách, đi kèm các loại vang và sâm panh thượng hạng.",
      image: "https://images.unsplash.com/photo-1520484128551-7667d0218f27?q=80&w=1000",
      bullets: [
        "Thiết kế cabin biệt lập, cách âm hoàn hảo",
        "Suất ăn thiết kế riêng bởi các đầu bếp hàng đầu",
        "Trang bị đầy đủ hệ thống giải trí và wifi vệ tinh",
        "Không gian họp hành riêng tư cho các đối tác cấp cao"
      ]
    }
  ];

  const packages = [
    {
      name: "Gói Phản Lực Tư Nhân Mini (Light Jet)",
      price: "Báo giá chi tiết theo hành trình",
      description: "Phù hợp chặng bay ngắn (dưới 3 tiếng), nhóm khách dưới 6 người",
      features: [
        "Áp dụng cho các dòng máy bay: Cessna Citation, Phenom 300...",
        "Tự do chọn thời gian khởi hành theo lịch trình riêng",
        "Thủ tục CIQ ưu tiên tại nhà ga chuyên cơ riêng biệt",
        "Suất ăn nhẹ và đồ uống cao cấp phục vụ trên cabin",
        "Nhân viên mặt đất hỗ trợ hành lý trọn gói từ sảnh"
      ],
      popular: false
    },
    {
      name: "Gói Phản Lực Tầm Trung (Midsize Jet)",
      price: "Báo giá chi tiết theo hành trình",
      description: "Phù hợp chặng bay quốc tế khu vực (dưới 6 tiếng), nhóm khách dưới 10 người",
      features: [
        "Áp dụng cho các dòng máy bay: Hawker 900XP, Gulfstream G150...",
        "Tầm bay xa, cất hạ cánh linh hoạt tại các sân bay địa phương",
        "Cabin rộng rãi, có không gian họp bàn công việc riêng",
        "Suất ăn nóng cao cấp tự chọn theo yêu cầu cá nhân",
        "Xe đưa đón riêng biệt sát chân thang máy bay tại sân đỗ"
      ],
      popular: true
    },
    {
      name: "Gói Chuyên Cơ Siêu Sang Tầm Xa (Heavy Jet)",
      price: "Báo giá chi tiết theo hành trình",
      description: "Phù hợp chặng bay liên lục địa (trên 6 tiếng), nhóm khách dưới 16 người",
      features: [
        "Áp dụng cho các dòng siêu chuyên cơ: Gulfstream G650, Bombardier Global 6000...",
        "Khoang cabin rộng lớn, tích hợp phòng ngủ và nhà bếp hiện đại",
        "Hành trình bay thẳng liên lục địa không cần hạ cánh kỹ thuật",
        "Thực đơn món ăn chuẩn Michelin phục vụ bởi tiếp viên riêng",
        "Quy trình dịch vụ mặt đất Super VIP bảo mật tuyệt đối"
      ],
      popular: false
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Gửi yêu cầu thuê chuyến",
      description: "Quý khách cung cấp lộ trình bay, số lượng hành khách, yêu cầu dòng máy bay và các dịch vụ đặc biệt đi kèm."
    },
    {
      step: "02",
      title: "Nhận đề xuất phương án",
      description: "Trong vòng 2 tiếng, ABTRIP gửi bảng đề xuất 2 - 3 phương án dòng tàu bay phù hợp kèm báo giá chi phí trọn gói chi tiết."
    },
    {
      step: "03",
      title: "Ký hợp đồng & cấp phép",
      description: "Ký kết hợp đồng thuê chuyến, ABTRIP hoàn tất thủ tục xin giấy phép bay, slots cất hạ cánh và chuẩn bị hậu cần cabin."
    },
    {
      step: "04",
      title: "Đón tiếp & Cất cánh",
      description: "Nhân viên đón khách tại nhà ga chuyên cơ FBO, hỗ trợ thủ tục hải quan VIP và hộ tống khách lên chuyên cơ khởi hành."
    }
  ];

  const testimonials = [
    {
      author: "Anh Nguyễn Đăng Khoa",
      role: "Chủ tịch Hội đồng Quản trị, K-Holdings",
      content: "Thuê chuyên cơ của ABTRIP cho chuyến khảo sát dự án khẩn tại Quy Nhơn là lựa chọn rất sáng suốt của chúng tôi. Máy bay rất mới, thủ tục đón tiếp tại FBO Nội Bài bảo mật và nhanh gọn. Đội ngũ bay phục vụ rất chuyên nghiệp."
    },
    {
      author: "Mrs. Sarah Jenkins",
      role: "Khách hàng gia đình (Đến từ Anh)",
      content: "We rented a Bombardier Challenger from ABTRIP for our family vacation in Danang. The level of service from booking to landing was exceptional. The customized organic meals on board were delicious, and the cabin was spotlessly clean."
    },
    {
      author: "Anh Trần Thế Vinh",
      role: "Giám đốc Vận hành, Vingroup",
      content: "Chúng tôi đã tin tưởng thuê chuyến charter trọn gói từ ABTRIP để đưa đoàn đại biểu cấp cao sang Singapore. Quy trình phối hợp rất chặt chẽ, giờ bay chuẩn xác tuyệt đối và dịch vụ mặt đất tại hai đầu sân bay được lo chu đáo."
    }
  ];

  const faqs = [
    {
      question: "Chi phí thuê một chuyến chuyên cơ riêng được tính toán như thế nào?",
      answer: "Chi phí thuê chuyên cơ riêng phụ thuộc vào nhiều yếu tố: quãng đường bay (giờ bay thực tế), dòng máy bay lựa chọn (Light Jet, Midsize hay Heavy Jet), phí dịch vụ mặt đất tại các sân bay, phí xin phép bay qua các không phận quốc tế và phí lưu đêm của tàu bay tại sân bay đến nếu có chặng khứ hồi. ABTRIP sẽ cung cấp báo giá trọn gói (Lump-sum) không phát sinh chi phí ẩn sau khi nhận được lịch trình cụ thể."
    },
    {
      question: "Thủ tục check-in chuyên cơ riêng được thực hiện ở đâu tại sân bay Việt Nam?",
      answer: "Hành khách đi chuyên cơ riêng tại các sân bay lớn như SGN, HAN, DAD sẽ không làm thủ tục tại nhà ga hành khách công cộng thông thường. Quý khách sẽ được đón tiếp và làm thủ tục hải quan an ninh riêng biệt tại Nhà ga chuyên cơ riêng biệt (FBO - Fixed Base Operator) hoặc phòng VIP chuyên dụng của Cảng hàng không. Quy trình CIQ diễn ra khép kín, an toàn và riêng tư."
    },
    {
      question: "Tôi có thể mang theo thú cưng (chó, mèo) lên cabin chuyên cơ riêng không?",
      answer: "Có. Đây là một trong những ưu điểm lớn của chuyên cơ riêng. Thú cưng của quý khách được phép đi cùng trên khoang cabin với chủ mà không cần phải gửi dưới hầm hàng như chuyến bay thương mại. Tuy nhiên, quý khách cần cung cấp đầy đủ chứng thư kiểm dịch thú y và giấy phép nhập khẩu của nước đến để ABTRIP làm thủ tục đăng ký với cơ quan quản lý."
    },
    {
      question: "Thời gian tối thiểu để chuẩn bị một chuyến bay chuyên cơ là bao lâu?",
      answer: "Thông thường, để đảm bảo xin đầy đủ giấy phép bay từ Cục Hàng không và sắp xếp Slot cất hạ cánh phù hợp, quý khách nên đặt trước chuyến bay từ 3 - 5 ngày làm việc. Trong trường hợp khẩn cấp (như cứu hộ y tế MEDEVAC), ABTRIP có thể điều hành cất cánh chuyến bay trong vòng 12 - 24 giờ sau khi nhận yêu cầu."
    }
  ];

  const config = {
    id: "chuyen-co-thue-chuyen",
    category: "ground" as const,
    title: "Dịch Vụ Thuê Chuyên Cơ Riêng VIP",
    subtitle: "Hành Trình Độc Bản - Đẳng Cấp Thượng Lưu",
    description: "Giải pháp thuê chuyên cơ tư nhân và charter chuyến bay trọn gói. Đội tàu bay phản lực hiện đại, lịch trình bay thiết kế riêng biệt 100%, thủ tục VIP tại nhà ga chuyên cơ FBO và suất ăn Michelin thượng hạng.",
    heroImage: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=2000&auto=format&fit=crop",
    badge: "Thuê chuyên cơ tư nhân trọn gói",
    geoTarget: "Phục vụ cất hạ cánh tại các sân bay quốc tế và nhà ga FBO riêng biệt",
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
