"use client";

import ServiceLandingPage from "@/components/ServiceLandingPage";
import { FileText, ShieldCheck, Globe, Clock, Star } from "lucide-react";

export default function Page() {
  const features = [
    {
      title: "Tỷ Lệ Đậu Hồ Sơ Lên Đến 99%",
      description: "Thẩm định hồ sơ chuyên sâu 3 lớp bởi đội ngũ chuyên viên giàu kinh nghiệm, phát hiện điểm yếu và tư vấn lộ trình khắc phục tài chính vững chắc.",
      icon: <ShieldCheck className="w-6 h-6" />
    },
    {
      title: "Hồ Sơ Đơn Giản Hóa Tối Đa",
      description: "Thay bạn xử lý trọn gói dịch thuật công chứng tư pháp, hoàn thiện điền tờ khai Lãnh sự phức tạp và đặt lịch hẹn lăn tay ưu tiên.",
      icon: <FileText className="w-6 h-6" />
    },
    {
      title: "Hỗ Trợ Xin Visa Hơn 150 Quốc Gia",
      description: "Am hiểu luật di trú và quy định cấp thị thực mới nhất của các nước phát triển: Châu Âu (Schengen), Mỹ, Úc, Canada, Nhật Bản, Hàn Quốc...",
      icon: <Globe className="w-6 h-6" />
    }
  ];

  const details = [
    {
      title: "Thẩm Định Hồ Sơ Chuyên Sâu - Tối Ưu Hóa Tỷ Lệ Đậu Visa Quốc Tế",
      description: "Thủ tục xin cấp thị thực (Visa) đi các quốc gia phát triển luôn đòi hỏi hồ sơ chứng minh tài chính, tài sản, công việc cực kỳ khắt khe và minh bạch. Rất nhiều trường hợp bị đánh trượt đáng tiếc do chuẩn bị hồ sơ sai cách hoặc trả lời phỏng vấn thiếu tự tin. Chuyên viên Visa của ABTRIP với hơn 10 năm kinh nghiệm sẽ đồng hành cùng bạn để phân tích chi tiết điểm mạnh/yếu của hồ sơ, tư vấn kịch bản luyện phỏng vấn 1-1 chuyên sâu, cam kết nâng tỷ lệ đậu visa của bạn lên mức cao nhất.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000",
      bullets: [
        "Đánh giá hồ sơ ban đầu hoàn toàn miễn phí trong 15 phút",
        "Hỗ trợ giải pháp tối ưu hóa hồ sơ chứng minh tài chính yếu",
        "Lập kế hoạch lịch trình du lịch/công tác chi tiết, hợp lệ",
        "Luyện phỏng vấn visa Mỹ, Schengen chuyên sâu sát thực tế"
      ]
    },
    {
      title: "Dịch Vụ Trọn Gói Từ A - Z, Tiết Kiệm Thời Gian & Công Sức",
      description: "Không còn cảnh phải thức đêm xếp hàng lấy số thứ tự tại các trung tâm tiếp nhận hồ sơ thị thực (VFS Global, TLS Contact, KVAC). Sử dụng dịch vụ làm Visa của ABTRIP, quý khách chỉ cần cung cấp các giấy tờ cá nhân cơ bản, toàn bộ khâu dịch thuật công chứng tư pháp, điền tờ khai trực tuyến và đặt lịch hẹn lăn tay sẽ được chúng tôi xử lý trọn gói. Kết quả Visa sẽ được gửi chuyển phát nhanh an toàn về tận địa chỉ nhà của quý khách.",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1000",
      bullets: [
        "Dịch thuật công chứng tư pháp đa ngôn ngữ chuẩn xác",
        "Đại diện nộp hồ sơ ủy thác (đối với các quốc gia cho phép)",
        "Nhân viên hỗ trợ trực tiếp hướng dẫn lăn tay chụp ảnh tại trung tâm",
        "Theo dõi cập nhật tiến độ duyệt hồ sơ liên tục cho khách"
      ]
    }
  ];

  const packages = [
    {
      name: "Visa Châu Á (Hàn/Nhật/Trung)",
      price: "Chỉ từ 1.200.000đ/bộ",
      description: "Hồ sơ đơn giản, kết quả nhanh chóng sau 7 - 10 ngày làm việc",
      features: [
        "Điền tờ khai Lãnh sự và xây dựng lịch trình du lịch chi tiết",
        "Dịch thuật công chứng tư pháp các hồ sơ cần thiết",
        "Đại diện nộp hồ sơ ủy thác tại trung tâm tiếp nhận thị thực",
        "Theo dõi tiến độ duyệt và nhận kết quả hộ chiếu từ LSQ",
        "Giao nhận hộ chiếu chứa visa tận nhà an toàn"
      ],
      popular: false
    },
    {
      name: "Visa Âu - Mỹ - Úc - Canada (Schengen, US)",
      price: "Chỉ từ 3.500.000đ/bộ",
      description: "Thẩm định hồ sơ tài chính chuyên sâu và luyện phỏng vấn kỹ lưỡng",
      features: [
        "Đánh giá điểm mạnh/yếu hồ sơ 3 lớp bởi chuyên gia hàng đầu",
        "Tư vấn giải pháp tối ưu hóa hồ sơ chứng minh tài chính, công việc",
        "Dịch thuật công chứng trọn gói hồ sơ đạt chuẩn VFS/TLS",
        "Đặt lịch hẹn lăn tay ưu tiên tại trung tâm tiếp nhận",
        "Luyện phỏng vấn visa 1-1 chuyên sâu tự tin đậu"
      ],
      popular: true
    },
    {
      name: "Gói Hỗ Trợ Visa Khẩn Cấp (Emergency Visa)",
      price: "Báo giá theo yêu cầu khẩn cấp",
      description: "Xin visa lấy gấp đi Trung Quốc, Hàn Quốc hoặc xin lịch lăn tay khẩn đi Châu Âu",
      features: [
        "Kích hoạt đội phản ứng nhanh xử lý hồ sơ khẩn trong 2 tiếng",
        "Lấy lịch hẹn lăn tay ưu tiên khẩn cấp tại VFS Global / TLS Contact",
        "Xin visa công tác, du lịch lấy nhanh trong 1 - 3 ngày làm việc",
        "Bảo lãnh duyệt hồ sơ nhanh từ đối tác uy tín",
        "Cam kết hoàn phí 100% nếu không đạt tiến độ thời gian"
      ],
      popular: false
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Thẩm định hồ sơ ban đầu",
      description: "Chuyên viên Visa đánh giá miễn phí hồ sơ tài chính, công việc của khách, dự báo tỷ lệ đậu và đề xuất lộ trình cải thiện."
    },
    {
      step: "02",
      title: "Dịch thuật & Khai tờ khai",
      description: "Ký hợp đồng dịch vụ, tiến hành dịch thuật công chứng tư pháp các giấy tờ liên quan và hoàn thiện điền tờ khai Lãnh sự."
    },
    {
      step: "03",
      title: "Nộp hồ sơ & Lăn tay",
      description: "Đặt lịch hẹn lăn tay. Nhân viên ABTRIP túc trực tại trung tâm VFS/TLS để hướng dẫn quý khách làm thủ tục chụp ảnh và lấy vân tay."
    },
    {
      step: "04",
      title: "Nhận kết quả tại nhà",
      description: "Theo dõi tiến độ hồ sơ. Nhận hộ chiếu có dán nhãn Visa chính thức từ Đại sứ quán và chuyển phát nhanh an toàn về tận nhà bạn."
    }
  ];

  const testimonials = [
    {
      author: "Chị Nguyễn Mai Anh",
      role: "Trưởng phòng Nhân sự, FPT Retail",
      content: "Mình đặt dịch vụ làm Visa Schengen đi Pháp tại ABTRIP. Hồ sơ của mình có điểm yếu lớn là mới chuyển công ty chưa đầy 3 tháng nên rất sợ bị đánh trượt. Nhờ các bạn chuyên viên hướng dẫn bổ sung giải trình tài chính và công việc cực kỳ chi tiết, mình đã đỗ visa Pháp hạn 1 năm. Vô cùng uy tín!"
    },
    {
      author: "Anh David Le",
      role: "Khách hàng cá nhân (Hải Phòng)",
      content: "Chương trình luyện phỏng vấn Visa Mỹ của ABTRIP thực sự rất sát thực tế. Tôi được chuyên viên luyện 1-1 qua Zoom, chỉnh sửa từng câu trả lời sao cho tự tin và trung thực nhất. Khi bước vào phỏng vấn thật với nhân viên LSQ Mỹ tôi rất thoải mái và được dán visa ngay."
    },
    {
      author: "Chị Phan Hoàng Yến",
      role: "Trưởng đoàn sự kiện, Vingroup",
      content: "Đặt làm visa Hàn Quốc trọn gói cho đoàn 15 nhân sự đi du lịch qua ABTRIP rất nhàn. Không ai trong đoàn phải nghỉ việc đi xếp hàng nộp hồ sơ ở KVAC từ sáng sớm, chỉ cần bàn giao hồ sơ và chờ nhận hộ chiếu có visa tận nhà."
    }
  ];

  const faqs = [
    {
      question: "Nếu hồ sơ xin Visa của tôi bị trượt, tôi có được hoàn lại tiền phí không?",
      answer: "Lệ phí nộp cho Đại sứ quán/Lãnh sự quán và phí dịch vụ của trung tâm tiếp nhận (VFS/TLS) là khoản phí không hoàn lại trong mọi trường hợp theo quy định của Lãnh sự. Tuy nhiên, đối với phí dịch vụ tư vấn của ABTRIP, chúng tôi áp dụng chính sách hỗ trợ hoàn trả lại 50% - 100% phí dịch vụ hoặc hỗ trợ làm lại hồ sơ lần 2 miễn phí tùy thuộc vào điều khoản cam kết thỏa thuận ban đầu đối với từng bộ hồ sơ."
    },
    {
      question: "Tôi cần chuẩn bị hồ sơ xin Visa trước ngày khởi hành dự kiến bao lâu là tốt nhất?",
      answer: "Thời gian xét duyệt visa của các Đại sứ quán thay đổi tùy nước. Đối với các quốc gia Châu Á thường mất từ 7 - 10 ngày làm việc. Đối với Châu Âu (Schengen), Mỹ, Úc, Canada có thể mất từ 3 - 6 tuần tùy thời điểm cao điểm. Do đó, để đảm bảo an toàn, quý khách nên đăng ký chuẩn bị hồ sơ trước ngày khởi hành dự kiến tối thiểu từ 1.5 - 2 tháng."
    },
    {
      question: "Tôi không có hợp đồng lao động và không chứng minh được thu nhập qua ngân hàng thì có làm Visa được không?",
      answer: "Hoàn toàn có thể. ABTRIP hỗ trợ xử lý các hồ sơ đặc thù như: người lao động tự do (Freelancer), chủ hộ kinh doanh cá thể nhỏ không có giấy phép, hoặc nội trợ, sinh viên... Chúng tôi sẽ tư vấn các giải pháp thay thế hợp lệ như chứng minh tài sản tích lũy (sổ tiết kiệm, sổ đỏ nhà đất, cổ phiếu) hoặc làm hồ sơ bảo lãnh tài chính từ người thân để thuyết phục Lãnh sự quán."
    },
    {
      question: "Visa Schengen cho phép đi được những quốc gia nào tại Châu Âu?",
      answer: "Sở hữu tấm Visa Schengen (khối thị thực chung Châu Âu) cho phép quý khách tự do đi lại và lưu trú tại 29 quốc gia thành viên khối Schengen (bao gồm Pháp, Đức, Ý, Tây Ban Nha, Thụy Sĩ, Hà Lan, Bỉ, Ba Lan...). Lưu ý là Vương quốc Anh (UK) không thuộc khối Schengen nên quý khách cần xin visa Anh riêng biệt nếu muốn ghé thăm nước này."
    }
  ];

  const config = {
    id: "visa",
    category: "utility" as const,
    title: "Dịch Vụ Làm Visa Trọn Gói",
    subtitle: "Tỷ Lệ Đậu Cao - Hồ Sơ Tối Giản - Hỗ Trợ Khẩn",
    description: "Tư vấn hồ sơ làm Visa đi các nước trên thế giới trọn gói từ A-Z. Đội ngũ chuyên viên giàu kinh nghiệm hỗ trợ tối giản hồ sơ, tối ưu chi phí và xử lý làm visa khẩn nhanh chóng.",
    heroImage: "https://images.unsplash.com/photo-1544016708-959f99718bfb?q=80&w=2000&auto=format&fit=crop",
    badge: "Dịch vụ Visa chuyên nghiệp",
    geoTarget: "Hỗ trợ nộp hồ sơ trực tuyến và trực tiếp tại Hà Nội, TP.HCM, Đà Nẵng",
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
