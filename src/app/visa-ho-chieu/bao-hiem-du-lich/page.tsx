"use client";

import ServiceLandingPage from "@/components/ServiceLandingPage";
import { ShieldCheck, HeartPulse, FileText, Clock, Star } from "lucide-react";

export default function Page() {
  const features = [
    {
      title: "Hạn Mức Đạt Chuẩn Visa Quốc Tế",
      description: "Cung cấp các gói bảo hiểm có hạn mức chi trả tối đa từ 30.000 EUR đến 150.000 USD, đáp ứng tiêu chuẩn xin Visa Schengen, Mỹ, Úc, Canada...",
      icon: <ShieldCheck className="w-6 h-6" />
    },
    {
      title: "Bảo Vệ Sức Khỏe Toàn Diện",
      description: "Chi trả các chi phí điều trị nội trú, ngoại trú, phẫu thuật khẩn cấp và bảo lãnh viện phí tại các bệnh viện quốc tế liên kết toàn cầu.",
      icon: <HeartPulse className="w-6 h-6" />
    },
    {
      title: "Cấp Chứng Nhận E-Policy Trong 10 Phút",
      description: "Quy trình đăng ký trực tuyến siêu tốc, nhận ngay chứng nhận bảo hiểm điện tử (PDF) có đầy đủ chữ ký số pháp lý qua Zalo/Email để nộp hồ sơ xin Visa.",
      icon: <FileText className="w-6 h-6" />
    }
  ];

  const details = [
    {
      title: "Tấm Lá Chắn Tài Chính Vững Chắc Cho Hành Trình Xuất Ngoại",
      description: "Khi đi du lịch hoặc công tác nước ngoài, các sự cố về sức khỏe, ngộ độc thực phẩm hay tai nạn bất ngoại luôn có thể xảy ra và đi kèm với những hóa đơn viện phí đắt đỏ ở nước bạn (có thể lên tới hàng chục nghìn USD). Bảo hiểm du lịch quốc tế do ABTRIP liên kết cung cấp mang lại sự bảo vệ tài chính toàn diện cho bạn và gia đình. Chúng tôi hợp tác với các nhà bảo hiểm uy tín lớn (Liberty, Bảo Việt, PVI...) cam kết hỗ trợ y tế khẩn cấp toàn cầu 24/7 và quy trình giải quyết bồi thường minh bạch, nhanh chóng.",
      image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=1000",
      bullets: [
        "Đáp ứng tiêu chuẩn bắt buộc xin thị thực Schengen (Châu Âu)",
        "Đường dây nóng cứu trợ y tế khẩn cấp hoạt động 24/7/365",
        "Hỗ trợ chi phí vận chuyển y tế cấp cứu về nước an toàn",
        "Bảo lãnh viện phí trực tiếp tại các bệnh viện liên kết quốc tế"
      ]
    },
    {
      title: "Bảo Vệ Trước Sự Cố Trễ Chuyến Bay & Mất Mát Hành Lý",
      description: "Không chỉ dừng lại ở vấn đề y tế, bảo hiểm du lịch của chúng tôi còn là cứu cánh cho bạn trước những rủi ro phi y tế phổ biến: chuyến bay bị trì hoãn hoặc hủy đột xuất do thời tiết/kỹ thuật, hành lý ký gửi bị thất lạc hoặc hư hỏng nặng do lỗi vận chuyển của hãng hàng không, hoặc mất mát các giấy tờ tùy thân quan trọng như hộ chiếu, ví tiền.",
      image: "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?q=80&w=1000",
      bullets: [
        "Bồi thường chi phí phát sinh khi chuyến bay trễ trên 6 tiếng",
        "Bồi thường tổn thất hành lý ký gửi bị thất lạc hoặc hư hỏng",
        "Hỗ trợ chi phí làm lại hộ chiếu bị mất cắp ở nước ngoài",
        "Hỗ trợ tư vấn thủ tục pháp lý khẩn cấp từ xa"
      ]
    }
  ];

  const packages = [
    {
      name: "Bảo Hiểm Du Lịch Trong Nước (Nội Địa)",
      price: "Chỉ từ 15.000đ/khách/ngày",
      description: "Bảo vệ bạn trước các rủi ro tai nạn khi đi du lịch trong nước",
      features: [
        "Hạn mức chi trả tai nạn lên tới 100.000.000đ/vụ",
        "Hỗ trợ chi phí y tế do tai nạn phát sinh trong chuyến đi",
        "Thủ tục cấp chứng nhận bảo hiểm trực tuyến tức thì",
        "Thời hạn bảo hiểm linh hoạt theo số ngày đi thực tế",
        "Không giới hạn độ tuổi tham gia bảo hiểm"
      ],
      popular: false
    },
    {
      name: "Bảo Hiểm Quốc Tế Hạng Phổ Thông (Schengen)",
      price: "Chỉ từ 45.000đ/khách/ngày",
      description: "Hạn mức 30.000 EUR - 50.000 EUR đáp ứng tuyệt đối tiêu chuẩn xin Visa Châu Âu",
      features: [
        "Hạn mức chi trả y tế lên tới 50.000 EUR / 1.2 tỷ VNĐ",
        "Bảo lãnh viện phí y tế nội trú tại các bệnh viện Châu Âu",
        "Chi trả chi phí khi chuyến bay bị trễ, hủy chuyến",
        "Bồi thường hành lý ký gửi bị thất lạc hoặc hư hỏng",
        "Chứng nhận song ngữ Anh - Việt nộp Visa hợp lệ"
      ],
      popular: true
    },
    {
      name: "Bảo Hiểm Quốc Tế Hạng VIP Toàn Cầu",
      price: "Chỉ từ 85.000đ/khách/ngày",
      description: "Hạn mức lên tới 150.000 USD áp dụng toàn cầu bao gồm Mỹ, Canada...",
      features: [
        "Hạn mức chi trả y tế cao cấp lên tới 150.000 USD / 3.6 tỷ VNĐ",
        "Bảo lãnh viện phí y tế toàn cầu 24/7",
        "Hỗ trợ chi phí gián đoạn chuyến đi, mất cắp giấy tờ tùy thân",
        "Hỗ trợ chi phí đi lại cho người thân sang chăm sóc khi nằm viện",
        "Dịch vụ hỗ trợ khẩn cấp y tế toàn cầu SOS International"
      ],
      popular: false
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Cung cấp lịch trình đi",
      description: "Khách hàng cung cấp quốc gia đến, ngày đi - ngày về dự kiến và thông tin hộ chiếu của người tham gia bảo hiểm."
    },
    {
      step: "02",
      title: "Tư vấn hạn mức tối ưu",
      description: "Chuyên viên ABTRIP đề xuất gói bảo hiểm có hạn mức phù hợp với quy chuẩn xin Visa của quốc gia đến và gửi báo phí."
    },
    {
      step: "03",
      title: "Cấp chứng nhận E-Policy",
      description: "Sau khi xác nhận thanh toán, ABTRIP cấp và gửi chứng nhận E-policy bản PDF có chữ ký số hợp pháp qua Zalo/Email trong 10 phút."
    },
    {
      step: "04",
      title: "Đồng hành bồi thường",
      description: "Bảo vệ bạn suốt hành trình. Hỗ trợ hướng dẫn thu thập giấy tờ, hóa đơn làm thủ tục thanh toán bồi thường nhanh chóng khi có sự cố."
    }
  ];

  const testimonials = [
    {
      author: "Anh Phan Văn Minh",
      role: "Khách du lịch tự túc (Tp.HCM)",
      content: "Đặt bảo hiểm du lịch Schengen của ABTRIP siêu nhanh. Chỉ nhắn tin 10 phút là nhận được file PDF song ngữ có chữ ký số gửi qua Zalo để in ra nộp hồ sơ xin Visa Pháp. Mình đã đỗ visa thành công, mức phí lại rất rẻ so với mua trực tiếp."
    },
    {
      author: "Chị Nguyễn Thảo Nguyên",
      role: "Trưởng đoàn Tour, VinaTravel Agency",
      content: "Đợt dẫn đoàn đi Châu Âu có một bác lớn tuổi bị ngộ độc thực phẩm phải cấp cứu tại Munich. May mắn là đã mua bảo hiểm quốc tế qua ABTRIP, toàn bộ chi phí viện phí hơn 2.500 EUR đều được hãng bảo hiểm liên kết bảo lãnh chi trả trực tiếp, gia đình không phải trả tiền túi."
    },
    {
      author: "Anh David Le",
      role: "Doanh nhân Công nghệ, Hải Phòng",
      content: "Tôi luôn mua bảo hiểm du lịch VIP của ABTRIP mỗi lần sang Mỹ công tác. Hạn mức chi trả 100k USD giúp tôi yên tâm tối đa trước chi phí y tế cực kỳ đắt đỏ ở Mỹ. Các điều khoản bồi thường hành lý thất lạc cũng rất rõ ràng."
    }
  ];

  const faqs = [
    {
      question: "Chứng nhận bảo hiểm du lịch điện tử (E-policy) có được chấp nhận khi nộp hồ sơ xin Visa không?",
      answer: "Hoàn toàn được chấp nhận. Chứng nhận bảo hiểm điện tử (E-policy) bản PDF do ABTRIP cung cấp có đầy đủ chữ ký số hợp pháp của hãng bảo hiểm, được dịch song ngữ Anh - Việt theo đúng quy chuẩn quốc tế và được tất cả các Đại sứ quán/Lãnh sự quán (bao gồm cả khối Schengen, Mỹ, Úc, Nhật...) chấp nhận như bản cứng."
    },
    {
      question: "Nếu tôi bị trượt Visa, tôi có được hủy và hoàn tiền mua bảo hiểm du lịch không?",
      answer: "Có. ABTRIP hỗ trợ chính sách hủy hợp đồng bảo hiểm và hoàn trả 100% chi phí mua bảo hiểm cho quý khách trong trường hợp bị trượt Visa. Quý khách chỉ cần cung cấp thư từ chối cấp Visa của Đại sứ quán trước ngày khởi hành dự kiến ghi trên đơn bảo hiểm."
    },
    {
      question: "Độ tuổi tối đa được tham gia bảo hiểm du lịch quốc tế là bao nhiêu?",
      answer: "Độ tuổi tham gia bảo hiểm du lịch quốc tế thông thường là từ 6 tuần tuổi đến 85 tuổi. Đối với khách hàng lớn tuổi (từ 70 - 85 tuổi), mức phí bảo hiểm có thể có phụ thu theo quy định của từng hãng bảo hiểm và hạn mức chi trả y tế có thể được điều chỉnh phù hợp."
    },
    {
      question: "Quy trình yêu cầu bồi thường bảo hiểm khi gặp sự cố y tế ở nước ngoài được thực hiện thế nào?",
      answer: "Khi xảy ra sự cố y tế, quý khách (hoặc người thân) cần liên hệ ngay với số Hotline cứu trợ y tế khẩn cấp 24/7 in trên đơn bảo hiểm để được hướng dẫn bệnh viện liên kết gần nhất. Đối với các chi phí nhỏ tự chi trả trước, quý khách lưu ý thu thập đầy đủ: Báo cáo y tế của bác sĩ, Hóa đơn tài chính viện phí và đơn thuốc. Sau khi về nước, ABTRIP sẽ hỗ trợ hướng dẫn bạn nộp hồ sơ yêu cầu bồi thường trực tuyến để nhận tiền bồi thường nhanh chóng."
    }
  ];

  const config = {
    id: "bao-hiem-du-lich",
    category: "utility" as const,
    title: "Bảo Hiểm Du Lịch Quốc Tế",
    subtitle: "Tấm Lá Chắn Toàn Diện - Đạt Chuẩn Xin Visa 100%",
    description: "Giải pháp bảo vệ tài chính tối ưu cho mọi chuyến đi. Bảo hiểm y tế khẩn cấp lên tới 150.000 USD đáp ứng tuyệt đối tiêu chuẩn xin Visa Schengen, Mỹ, Úc... Hỗ trợ chi phí trễ/hủy chuyến bay, mất cắp hành lý và cấp chứng nhận E-policy trong 10 phút.",
    heroImage: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=2000&auto=format&fit=crop",
    badge: "Bảo hiểm du lịch quốc tế đạt chuẩn",
    geoTarget: "Cấp đơn bảo hiểm trực tuyến toàn quốc và hỗ trợ bồi thường nhanh chóng",
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
