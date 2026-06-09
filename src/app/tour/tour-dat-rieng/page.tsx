"use client";

import ServiceLandingPage from "@/components/ServiceLandingPage";
import { Compass, Award, ShieldCheck, Clock, Star } from "lucide-react";

export default function Page() {
  const features = [
    {
      title: "Thiết Kế Lịch Trình Riêng Biệt",
      description: "Cá nhân hóa 100% chương trình du lịch theo đúng sở thích, nhu cầu, độ tuổi hành khách và ngân sách tài chính của gia đình hoặc doanh nghiệp.",
      icon: <Compass className="w-6 h-6" />
    },
    {
      title: "Tuyển Chọn Dịch Vụ Cao Cấp",
      description: "Hợp tác chiến lược với các tập đoàn resort 4 - 5 sao lớn (Vinpearl, Sun Group, Marriott...) mang lại mức giá ưu đãi Corporate tốt nhất.",
      icon: <Award className="w-6 h-6" />
    },
    {
      title: "Vận Hành Chuyên Nghiệp",
      description: "Đội ngũ hướng dẫn viên giàu kinh nghiệm, am hiểu văn hóa địa phương, chu đáo phục vụ đoàn suốt hành trình và xử lý sự cố phát sinh nhạy bén.",
      icon: <ShieldCheck className="w-6 h-6" />
    }
  ];

  const details = [
    {
      title: "Kiến Tạo Những Hành Trình Độc Bản Đầy Cảm Xúc",
      description: "Mỗi hành trình du lịch là một câu chuyện riêng, chứa đựng những mong muốn và cảm xúc khác nhau. Với dịch vụ thiết kế tour đặt riêng của ABTRIP, quý khách không cần phải gò bó theo các lịch trình đóng sẵn rập khuôn của các tour ghép truyền thống. Dù là một chuyến nghỉ dưỡng gia đình ấm cúng cần sự thư thái tối đa, hay một chương trình du lịch kết hợp hội nghị khách hàng, sự kiện Teambuilding bãi biển hoành tráng cho doanh nghiệp lên tới hàng trăm người, ABTRIP luôn lắng nghe để thiết lập một kịch bản hành trình độc bản, tối ưu chi phí và đem lại trải nghiệm trọn vẹn nhất.",
      image: "/tour-teambuilding.png",
      bullets: [
        "Lịch trình thiết kế linh hoạt, tự do lựa chọn điểm đến",
        "Khảo sát địa điểm kỹ lưỡng trước khi triển khai đoàn lớn",
        "Tích hợp các kịch bản Teambuilding bãi biển độc đáo, gắn kết",
        "Đội ngũ điều hành bay và mặt đất hỗ trợ hậu cần di chuyển trọn gói"
      ]
    },
    {
      title: "Tiêu Chuẩn Dịch Vụ Lưu Trú & Ẩm Thực Chuẩn 4 - 5 Sao",
      description: "Chúng tôi hiểu rằng chất lượng bữa ăn và giấc ngủ quyết định 90% sự hài lòng của du khách trong suốt chuyến đi. ABTRIP cam kết tuyển chọn hệ thống nhà hàng ẩm thực đặc sắc tại địa phương, đảm bảo thực đơn phong phú ngon miệng, vệ sinh an toàn thực phẩm cao nhất. Đồng thời, mạng lưới xe du lịch đời mới sang trọng và đội ngũ hướng dẫn viên tận tâm sẽ đồng hành, mang lại sự an tâm tuyệt đối cho quý khách.",
      image: "/luxury-resort-dining.png",
      bullets: [
        "Lưu trú hệ thống resort, khách sạn 4 - 5 sao đẳng cấp",
        "Thực đơn Gala Dinner cao cấp kết hợp kịch bản sự kiện độc quyền",
        "Sử dụng xe du lịch đời mới (Universe, Ford Transit VIP) êm ái",
        "Tặng kèm bảo hiểm du lịch quốc tế/nội địa hạn mức cao bảo vệ khách"
      ]
    }
  ];

  const packages = [
    {
      name: "Tư Vấn & Thiết Kế Lịch Trình",
      price: "Miễn phí thiết kế chương trình",
      description: "Dành cho khách hàng đang tìm ý tưởng cho chuyến đi sắp tới",
      features: [
        "Tư vấn điểm đến, lịch trình và thời gian bay tối ưu",
        "Phác thảo chương trình tour chi tiết trong vòng 24 giờ",
        "Lập dự toán ngân sách chi tiết theo các hạng mức dịch vụ",
        "Hỗ trợ khảo sát địa điểm trực tiếp (dành cho đoàn doanh nghiệp)",
        "Tặng bộ tài liệu cẩm nang du lịch điểm đến độc quyền"
      ],
      popular: false
    },
    {
      name: "Tour Doanh Nghiệp & Teambuilding (MICE)",
      price: "Chỉ từ 3.200.000đ/khách",
      description: "Gói trọn gói kết hợp du lịch, sự kiện gắn kết nhân sự công ty",
      features: [
        "Lưu trú resort/khách sạn 4 - 5 sao cao cấp (2 Đêm)",
        "Vé máy bay khứ hồi & Xe du lịch đưa đón suốt tuyến",
        "Tổ chức sự kiện Teambuilding bãi biển (kịch bản + đạo cụ trọn gói)",
        "Đêm tiệc Gala Dinner hoành tráng (MC, âm thanh, ánh sáng, sân khấu)",
        "Mũ du lịch, nước uống, bảo hiểm du lịch tối đa 100 triệu/vụ"
      ],
      popular: true
    },
    {
      name: "Tour Nghỉ Dưỡng Gia Đình Cao Cấp",
      price: "Chỉ từ 4.500.000đ/khách",
      description: "Thiết kế không gian nghỉ ngơi thư thái dành riêng cho gia đình bạn",
      features: [
        "Lưu trú phòng Suite hoặc Biệt thự biển riêng biệt (Resort 5 sao)",
        "Xe limousine riêng đưa đón gia đình suốt hành trình",
        "Thực đơn bữa ăn thiết kế riêng (có món ăn cho bé và người già)",
        "Hướng dẫn viên cá nhân chuyên nghiệp, chu đáo phục vụ đoàn",
        "Vé tham quan trọn gói các điểm vui chơi giải trí cao cấp"
      ],
      popular: false
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Tiếp nhận ý tưởng chuyến đi",
      description: "Khách hàng cung cấp thông tin điểm đến mong muốn, số lượng thành viên, thời gian khởi hành và ngân sách dự kiến."
    },
    {
      step: "02",
      title: "Thiết kế lịch trình & Dự toán",
      description: "Trong vòng 24 - 48 giờ, ABTRIP gửi bản phác thảo chương trình chi tiết kèm dự toán ngân sách theo các lựa chọn dịch vụ."
    },
    {
      step: "03",
      title: "Tinh chỉnh & Khảo sát dịch vụ",
      description: "Cùng thảo luận chỉnh sửa kịch bản. Đối với đoàn lớn, ABTRIP hỗ trợ tổ chức đoàn khảo sát dịch vụ thực tế trước khi đi."
    },
    {
      step: "04",
      title: "Vận hành chuyên nghiệp",
      description: "Triển khai tour theo đúng cam kết. Chuyên viên giám sát chất lượng túc trực hỗ trợ đoàn suốt hành trình bay và nghỉ dưỡng."
    }
  ];

  const testimonials = [
    {
      author: "Anh Nguyễn Tuấn Khải",
      role: "Giám đốc Marketing, VNG Corporation",
      content: "ABTRIP đã tổ chức chương trình Company Trip kết hợp teambuilding cho hơn 120 nhân sự của công ty tại Phú Quốc vô cùng thành công. Kịch bản trò chơi bãi biển độc đáo, đêm Gala hoành tráng và khâu hậu cần di chuyển rất chuẩn xác. Cảm ơn đội ngũ điều hành rất nhiều!"
    },
    {
      author: "Chị Phạm Thu Trang",
      role: "Khách hàng gia đình (Hà Nội)",
      content: "Gia đình mình có cả người già lớn tuổi và trẻ nhỏ nên đã chọn gói thiết kế tour riêng đi Đà Nẵng của ABTRIP. Lịch trình rất thong thả, không bị gấp gáp, xe limousine đưa đón riêng sạch sẽ, bạn hướng dẫn viên nói chuyện rất lễ phép và chu đáo chụp ảnh kỷ niệm cho cả nhà."
    },
    {
      author: "Mrs. Emily Watson",
      role: "MICE Coordinator, Global Tech Events (Singapore)",
      content: "Highly recommend ABTRIP for corporate events in Vietnam. They organized our international tech summit in Danang for 80 VIP delegates. The logistics, gala dinner, and hotel coordination were absolutely flawless."
    }
  ];

  const faqs = [
    {
      question: "Số lượng khách tối thiểu bao nhiêu người thì có thể đặt thiết kế tour riêng?",
      answer: "ABTRIP hỗ trợ thiết kế tour đặt riêng cho mọi quy mô đoàn khách. Đối với khách hàng gia đình, chúng tôi thiết kế chương trình từ nhóm nhỏ 4 - 6 người (sử dụng xe riêng biệt, biệt thự nghỉ dưỡng riêng). Đối với khách hàng doanh nghiệp, chúng tôi có đầy đủ năng lực vận hành các đoàn lớn từ 50 - 500 khách kết hợp tổ chức sự kiện MICE."
    },
    {
      question: "Chúng tôi có được thay đổi lịch trình hoặc điểm tham quan khi đang đi tour không?",
      answer: "Hoàn toàn có thể. Đây là ưu điểm vượt trội của tour thiết kế riêng. Trong quá trình đi tour, nếu quý khách muốn thay đổi điểm tham quan hoặc điều chỉnh thời gian dừng chân, hướng dẫn viên và tài xế xe riêng sẽ linh hoạt phối hợp đáp ứng ngay lập tức, miễn là không ảnh hưởng đến an toàn bay hoặc các dịch vụ khách sạn đã đặt cố định trước."
    },
    {
      question: "Chi phí thiết kế chương trình và báo giá tour có mất phí không?",
      answer: "Hoàn toàn miễn phí. ABTRIP hỗ trợ tư vấn điểm đến, lên lịch trình chi tiết và lập bảng dự toán chi phí chi tiết theo yêu cầu của quý khách mà không thu bất kỳ khoản phí thiết kế nào. Quý khách chỉ thanh toán khi đồng ý ký hợp đồng thực hiện chương trình."
    },
    {
      question: "Chính sách hoàn hủy tour thiết kế riêng dành cho doanh nghiệp được quy định thế nào?",
      answer: "Chính sách hoàn hủy đối với tour đoàn doanh nghiệp được thỏa thuận cụ thể và ghi rõ trong hợp đồng kinh tế dựa trên chính sách của các hãng hàng không và khách sạn resort đã đặt. ABTRIP luôn nỗ lực đàm phán với các nhà cung cấp để áp dụng điều khoản hoàn hủy linh hoạt nhất, giảm thiểu tối đa rủi ro thiệt hại tài chính cho doanh nghiệp đối tác."
    }
  ];

  const config = {
    id: "tour-dat-rieng",
    category: "travel" as const,
    title: "Tour Thiết Kế Riêng & MICE Doanh Nghiệp",
    subtitle: "Cá Nhân Hóa Lịch Trình - Trải Nghiệm Độc Bản Đẳng Cấp",
    description: "Giải pháp du lịch nghỉ dưỡng thiết kế riêng biệt dành cho gia đình và sự kiện Teambuilding/MICE trọn gói dành cho doanh nghiệp. Lịch trình linh hoạt 100%, dịch vụ resort 4 - 5 sao cao cấp và đội ngũ vận hành chu đáo.",
    heroImage: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2000&auto=format&fit=crop",
    badge: "Thiết kế Tour riêng & Sự kiện MICE",
    geoTarget: "Thiết kế tour đi các điểm đến nổi tiếng trong nước và quốc tế theo yêu cầu",
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
