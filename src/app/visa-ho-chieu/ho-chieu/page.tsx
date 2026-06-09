"use client";

import ServiceLandingPage from "@/components/ServiceLandingPage";
import { FileText, ShieldCheck, Clock, Star } from "lucide-react";

export default function Page() {
  const features = [
    {
      title: "Hỗ Trợ Nộp Trực Tuyến 100%",
      description: "Thay bạn hoàn thành toàn bộ tờ khai Cổng DVC, chỉnh sửa ảnh chân dung chuẩn ICAO được phê duyệt ngay từ lần nộp đầu tiên.",
      icon: <FileText className="w-6 h-6" />
    },
    {
      title: "Xử Lý Lấy Hộ Chiếu Khẩn Cấp",
      description: "Dịch vụ hỗ trợ lấy hộ chiếu khẩn cấp, lấy gấp trong vòng 1 - 3 ngày làm việc, phục vụ kịp thời các chuyến bay công tác hay du lịch đột xuất.",
      icon: <Clock className="w-6 h-6" />
    },
    {
      title: "Hồ Sơ Khó & Phát Sinh",
      description: "Giải quyết nhanh các trường hợp hộ chiếu bị mất làm lại, hộ chiếu bị rách/hỏng, đổi hộ chiếu sai thông tin hoặc hộ chiếu cho trẻ em dưới 14 tuổi.",
      icon: <ShieldCheck className="w-6 h-6" />
    }
  ];

  const details = [
    {
      title: "Làm Hộ Chiếu Trực Tuyến Nhanh Chóng - Không Sai Sót Thủ Tục",
      description: "Kể từ khi Bộ Công an áp dụng nộp hồ sơ làm hộ chiếu trực tuyến qua Cổng Dịch vụ công Quốc gia (đòi hỏi xác thực tài khoản VNeID cấp độ 2), rất nhiều người dân gặp khó khăn khi thao tác. Lỗi tải ảnh chân dung không đúng chuẩn ICAO, lỗi khai sai thông tin tờ khai, hoặc không thanh toán được lệ phí điện tử khiến hồ sơ bị Cục Xuất nhập cảnh trả lại nhiều lần. Dịch vụ hỗ trợ làm hộ chiếu trực tuyến của ABTRIP giúp bạn giải quyết triệt để rào cản này. Chuyên viên của chúng tôi sẽ thay bạn xử lý hồ sơ chuẩn chỉ A-Z chỉ trong 10 phút.",
      image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1000",
      bullets: [
        "Khai báo tờ khai dịch vụ công trực tuyến chuẩn xác 100%",
        "Chỉnh sửa và kiểm duyệt ảnh thẻ chân dung đạt chuẩn ICAO",
        "Hỗ trợ nộp hồ sơ lưu trú tạm thời (CT07) cho trẻ em",
        "Hướng dẫn thanh toán lệ phí nhà nước trực tuyến nhanh gọn"
      ]
    },
    {
      title: "Dịch Vụ Lấy Hộ Chiếu Khẩn Cấp Trong 1 - 3 Ngày Làm Việc",
      description: "Nếu quý khách có việc công tác nước ngoài khẩn cấp, đã đặt sẵn vé máy bay và khách sạn nhưng phát hiện hộ chiếu đã hết hạn (dưới 6 tháng không được bay) hoặc bị thất lạc, rách hỏng. Hãy liên hệ ngay với ABTRIP. Chúng tôi cung cấp giải pháp xử lý hồ sơ khẩn cấp trực tiếp tại Cục Xuất nhập cảnh Hà Nội và TP.HCM, đảm bảo bàn giao hộ chiếu mới tận tay quý khách đúng thời hạn cam kết để không lỡ chuyến bay.",
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=1000",
      bullets: [
        "Hỗ trợ lấy hộ chiếu khẩn cấp toàn quốc trong 24h - 72h",
        "Xử lý hồ sơ bị mất hộ chiếu làm lại khẩn cấp",
        "Giao nhận hộ chiếu mới tận nhà an toàn, bảo mật",
        "Tư vấn giải pháp bay tạm thời bằng giấy thông hành nếu cần"
      ]
    }
  ];

  const packages = [
    {
      name: "Gói Hỗ Trợ Trực Tuyến Standard",
      price: "Chỉ từ 300.000đ/hồ sơ",
      description: "Hỗ trợ khai tờ khai Cổng DVC, làm ảnh ICAO và nộp hồ sơ nhận hộ chiếu tại nhà",
      features: [
        "Khai báo tờ khai trực tuyến Cổng dịch vụ công Bộ Công an",
        "Chỉnh sửa file ảnh chân dung đạt chuẩn ICAO phê duyệt",
        "Đại diện theo dõi tiến độ duyệt hồ sơ của Cục XNC",
        "Hướng dẫn thanh toán lệ phí nhà nước 200.000đ trực tuyến",
        "Nhận hộ chiếu gửi chuyển phát nhanh về tận nhà qua bưu điện"
      ],
      popular: false
    },
    {
      name: "Gói Lấy Hộ Chiếu Khẩn Cấp (2 - 3 Ngày)",
      price: "Chỉ từ 1.500.000đ/hồ sơ",
      description: "Xử lý hồ sơ và lấy hộ chiếu nhanh phục vụ chuyến bay khẩn",
      features: [
        "Trọn gói khai tờ khai và chuẩn bị ảnh ICAO chuẩn chỉnh",
        "Hỗ trợ nộp hồ sơ trực tuyến phê duyệt nhanh",
        "Đại diện xử lý thủ tục lấy hộ chiếu khẩn cấp tại Cục XNC",
        "Cam kết có hộ chiếu mới sau 2 - 3 ngày làm việc",
        "Giao nhận hộ chiếu tận tay trực tiếp tại văn phòng ABTRIP"
      ],
      popular: true
    },
    {
      name: "Gói Hộ Chiếu Siêu Tốc Trong 24 Giờ",
      price: "Chỉ từ 2.500.000đ/hồ sơ",
      description: "Đặc biệt dành cho các trường hợp khẩn cấp cực kỳ giới hạn",
      features: [
        "Xử lý hồ sơ và xuất hộ chiếu mới tinh trong vòng 24 giờ",
        "Giải quyết các trường hợp mất hộ chiếu, rách hỏng khẩn sát giờ bay",
        "Chuyên viên hỗ trợ trực tiếp làm việc với Cục Xuất nhập cảnh",
        "Cam kết hoàn phí 100% nếu không bàn giao hộ chiếu đúng hẹn",
        "Hỗ trợ giao hộ chiếu trực tiếp sảnh sân bay trước giờ bay"
      ],
      popular: false
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Gửi thông tin ảnh chụp",
      description: "Khách hàng gửi ảnh chân dung tự chụp bằng điện thoại trên nền tường trắng, ảnh chụp hai mặt Căn cước công dân (CCC)."
    },
    {
      step: "02",
      title: "Khai tờ khai dịch vụ công",
      description: "Chuyên viên ABTRIP thiết kế ảnh chuẩn ICAO, tiến hành khai báo thông tin trên Cổng dịch vụ công và gửi khách duyệt."
    },
    {
      step: "03",
      title: "Thanh toán lệ phí công",
      description: "Sau khi hồ sơ được tiếp nhận thành công, khách hàng thực hiện thanh toán lệ phí 200.000đ cho nhà nước qua cổng thanh toán."
    },
    {
      step: "04",
      title: "Nhận hộ chiếu tại nhà",
      description: "Hộ chiếu sau khi được in sẽ được bưu điện chuyển phát nhanh trực tiếp về tận địa chỉ nhà của quý khách trên toàn quốc."
    }
  ];

  const testimonials = [
    {
      author: "Anh Bùi Văn Khánh",
      role: "Kỹ sư Xây dựng, Coteccons",
      content: "Tôi tự mày mò khai tờ khai trên cổng dịch vụ công suốt 2 ngày bị hệ thống trả lại vì ảnh không đúng chuẩn dung lượng và kích cỡ. Liên hệ ABTRIP làm gói 300k, các bạn khai hộ và sửa ảnh chỉ mất 10 phút. Khoảng 8 ngày sau hộ chiếu được giao về tận nhà. Quá nhanh và nhàn!"
    },
    {
      author: "Chị Nguyễn Mai Anh",
      role: "Giám đốc Quan hệ Khách hàng, VPBank",
      content: "Tôi phát hiện mất hộ chiếu trước chuyến bay công tác Singapore 3 ngày. May có dịch vụ làm hộ chiếu khẩn 24h của ABTRIP hỗ trợ nộp đơn cớ mất và làm việc trực tiếp Cục XNC. Đúng chiều ngày thứ 2 đã có hộ chiếu mới tinh cầm trên tay để kịp bay. Cảm ơn các bạn rất nhiều!"
    },
    {
      author: "Anh Phùng Ngọc Hải",
      role: "Khách hàng cá nhân (Đà Nẵng)",
      content: "Thủ tục làm hộ chiếu cho con dưới 14 tuổi trực tuyến rất phức tạp, cần xác nhận CT07 của công an phường. Nhờ các bạn ABTRIP tư vấn tận tình, chuẩn bị hồ sơ đầy đủ nên việc nộp trực tuyến diễn ra cực kỳ suôn sẻ, không phải đi lại xếp hàng."
    }
  ];

  const faqs = [
    {
      question: "Để làm hộ chiếu trực tuyến, tôi có bắt buộc phải đăng ký tài khoản VNeID cấp độ 2 không?",
      answer: "Có. Theo quy định mới nhất của Bộ Công an, từ ngày 01/07/2024, hành khách nộp hồ sơ làm hộ chiếu trực tuyến trên Cổng dịch vụ công bắt buộc phải xác thực đăng nhập thông qua tài khoản định danh điện tử VNeID cấp độ 2. Số điện thoại đăng ký VNeID phải trùng khớp với số điện thoại chính chủ sử dụng."
    },
    {
      question: "Ảnh chân dung tự chụp bằng điện thoại như thế nào để đạt chuẩn ICAO làm hộ chiếu?",
      answer: "Quý khách chỉ cần đứng dựa lưng vào một bức tường phẳng màu trắng (hoặc sáng màu), mắt nhìn thẳng, không đeo kính, để lộ rõ hai tai và trán, chụp ảnh rõ nét từ ngực trở lên. ABTRIP sẽ hỗ trợ xử lý cắt ghép nền, chỉnh sửa kích thước chuẩn 4x6cm và kiểm tra định dạng dung lượng đạt chuẩn phê duyệt của Cục Xuất nhập cảnh."
    },
    {
      question: "Khi làm hộ chiếu khẩn cấp, tôi có cần chuẩn bị thêm giấy tờ chứng minh lý do khẩn cấp không?",
      answer: "Tùy thuộc vào thời gian yêu cầu lấy khẩn. Đối với gói lấy khẩn cấp từ 1 - 3 ngày, quý khách nên chuẩn bị thêm các giấy tờ chứng minh như: Vé máy bay khứ hồi sát ngày đi, quyết định cử đi công tác nước ngoài của công ty hoặc hồ sơ bệnh án điều trị khẩn cấp ở nước ngoài để ABTRIP làm văn bản giải trình nộp Cục Xuất nhập cảnh."
    },
    {
      question: "Tôi bị mất hộ chiếu cũ thì thủ tục làm lại hộ chiếu mới có phức tạp hơn không?",
      answer: "Khi bị mất hộ chiếu, việc đầu tiên quý khách cần làm là nộp Đơn báo mất hộ chiếu (Mẫu TK05) lên cơ quan Công an phường/xã nơi gần nhất hoặc trực tiếp khai báo cớ mất trên Cổng dịch vụ công trực tuyến để hủy giá trị sử dụng của hộ chiếu cũ. Sau đó, quy trình nộp hồ sơ làm hộ chiếu mới được thực hiện bình thường như cấp lần đầu."
    }
  ];

  const config = {
    id: "ho-chieu",
    category: "utility" as const,
    title: "Dịch Vụ Làm Hộ Chiếu Nhanh",
    subtitle: "Tờ Khai Trực Tuyến - Lấy Gấp Khẩn 24H - Không Sai Sót",
    description: "Hỗ trợ trọn gói thủ tục làm hộ chiếu trực tuyến qua Cổng Dịch vụ công Quốc gia. Điền tờ khai chuẩn xác, chỉnh sửa ảnh đạt chuẩn ICAO, xử lý nhanh các hồ sơ hộ chiếu bị mất/hỏng và lấy hộ chiếu khẩn cấp từ 1 - 3 ngày toàn quốc.",
    heroImage: "https://images.unsplash.com/photo-1544016708-959f99718bfb?q=80&w=2000&auto=format&fit=crop",
    badge: "Hỗ trợ thủ tục Hộ chiếu trực tuyến",
    geoTarget: "Hỗ trợ nộp hồ sơ trực tuyến toàn quốc và lấy khẩn tại Hà Nội, TP.HCM",
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
