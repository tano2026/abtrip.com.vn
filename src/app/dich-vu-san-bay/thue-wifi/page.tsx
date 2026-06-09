"use client";

import ServiceLandingPage from "@/components/ServiceLandingPage";
import { Wifi, Globe, Compass, ShieldCheck, Clock, Star } from "lucide-react";

export default function Page() {
  const features = [
    {
      title: "eSIM Kích Hoạt Trong 1 Phút",
      description: "Công nghệ kết nối hiện đại nhất. Chỉ cần quét mã QR qua Email/Zalo trước bay là bạn có mạng dùng ngay khi hạ cánh, không cần tháo SIM Việt Nam.",
      icon: <Wifi className="w-6 h-6" />
    },
    {
      title: "Phủ Sóng Ổn Định 150+ Quốc Gia",
      description: "Liên kết trực tiếp với các nhà mạng viễn thông lớn tại nước bản địa (Softbank, Singtel, T-Mobile...) đảm bảo tốc độ 4G/5G căng đét.",
      icon: <Globe className="w-6 h-6" />
    },
    {
      title: "Giao Nhận Nhanh Tại Sân Bay",
      description: "Thuận tiện nhận SIM vật lý hoặc thiết bị phát WiFi trực tiếp tại hệ thống quầy quầy đối tác túc trực 24/7 của chúng tôi ở ga đi sân bay.",
      icon: <Compass className="w-6 h-6" />
    }
  ];

  const details = [
    {
      title: "eSIM Du Lịch Quốc Tế - Kết Nối Online Không Cần Tháo Lắp SIM",
      description: "Chào tạm biệt những phiền toái khi phải tìm kiếm chọc SIM, sợ thất lạc chiếc SIM gốc Việt Nam hay phải xếp hàng dài chờ đợi mua SIM đắt đỏ tại sân bay nước bạn. eSIM du lịch thế hệ mới của ABTRIP cho phép bạn kết nối internet tốc độ cao chỉ bằng một thao tác quét mã QR trực tuyến trước khi bay. Điện thoại của bạn sẽ tự động chuyển vùng dữ liệu mạng quốc tế ngay khi máy bay chạm bánh xuống đường băng nước bạn, giúp bạn lập tức liên lạc với người thân hoặc đặt xe đưa đón công nghệ dễ dàng.",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000",
      bullets: [
        "Kích hoạt online nhận mã QR tức thì qua Zalo/Email",
        "Giữ nguyên SIM gốc Việt Nam để nhận cuộc gọi và mã OTP ngân hàng",
        "Tiết kiệm đến 70% chi phí chuyển vùng quốc tế thông thường",
        "Tương thích hoàn hảo với các dòng iPhone, Samsung, Google Pixel đời mới"
      ]
    },
    {
      title: "Thuê Bộ Phát WiFi Không Giới Hạn - Giải Pháp Tối Ưu Cho Đi Nhóm",
      description: "Nếu bạn đi du lịch hoặc công tác nước ngoài theo đoàn gia đình, nhóm bạn hoặc tổ công tác doanh nghiệp, thuê thiết bị phát WiFi di động là giải pháp tiết kiệm và hiệu quả nhất. Thiết bị phát WiFi bỏ túi nhỏ gọn của ABTRIP hỗ trợ kết nối đồng thời lên đến 5 thiết bị (điện thoại, máy tính bảng, laptop) với dung lượng dữ liệu không giới hạn tốc độ cao, pin khỏe sử dụng liên tục lên đến 12 tiếng sau mỗi lần sạc đầy.",
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1000",
      bullets: [
        "Kết nối đồng thời lên đến 5 thiết bị di động cùng lúc",
        "Dung lượng data tốc độ cao không giới hạn hàng ngày",
        "Pin dung lượng lớn hoạt động bền bỉ suốt 12 tiếng liên tục",
        "Thủ tục nhận và trả thiết bị cực kỳ nhanh gọn tại sảnh đi/đến sân bay"
      ]
    }
  ];

  const packages = [
    {
      name: "Thuê Bộ Phát WiFi Di Động Quốc Tế",
      price: "Chỉ từ 70.000đ/ngày",
      description: "Thích hợp cho nhóm đi từ 2 - 5 người, phủ sóng toàn cầu",
      features: [
        "Dung lượng dữ liệu tốc độ cao không giới hạn",
        "Kết nối đồng thời 5 thiết bị (điện thoại, laptop, tablet)",
        "Nhận và trả thiết bị trực tiếp tại quầy sân bay ga đi/đến",
        "Cung cấp đầy đủ củ sạc, dây sạc và túi bảo vệ thiết bị",
        "Đặt cọc thiết bị hoàn trả 100% khi trả máy"
      ],
      popular: false
    },
    {
      name: "eSIM Du Lịch Quốc Tế (Mã QR Online)",
      price: "Chỉ từ 120.000đ/gói",
      description: "Nhận mã QR kích hoạt online qua Zalo/Email trong 1 phút",
      features: [
        "Không cần tháo lắp SIM vật lý gốc của điện thoại",
        "Gói cước đa dạng: 1GB/2GB data mỗi ngày hoặc trọn gói dữ liệu",
        "Tự động kết nối mạng dữ liệu ngay khi vừa hạ cánh",
        "Giữ nguyên kết nối SIM Việt Nam để nhận mã OTP ngân hàng",
        "Hỗ trợ cài đặt kỹ thuật trực tuyến từ xa 24/7"
      ],
      popular: true
    },
    {
      name: "SIM Vật Lý Du Lịch Nhận Tại Sân Bay",
      price: "Chỉ từ 180.000đ/SIM",
      description: "Nhận trực tiếp tại quầy ga đi sân bay Việt Nam",
      features: [
        "Tự động kích hoạt khi lắp vào điện thoại, dùng được ngay",
        "Có sẵn dung lượng data tốc độ cao từ 5GB - 30GB sử dụng",
        "Tùy chọn tích hợp sẵn phút gọi nội địa nước đến",
        "Nhân viên hỗ trợ cài đặt, cấu hình APN trực tiếp tại quầy",
        "Không mất thời gian khai báo đăng ký thông tin cá nhân phức tạp"
      ],
      popular: false
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Đăng ký điểm đến",
      description: "Quý khách chọn quốc gia đến, số ngày sử dụng và chọn loại hình kết nối phù hợp (eSIM, SIM vật lý hoặc Bộ phát WiFi)."
    },
    {
      step: "02",
      title: "Xác nhận & Nhận mã QR (eSIM)",
      description: "Đối với eSIM, ABTRIP gửi mã QR kèm hướng dẫn cài đặt qua Zalo/Email. Đối với SIM/WiFi, nhân viên xác nhận quầy nhận tại sân bay."
    },
    {
      step: "03",
      title: "Giao nhận thiết bị tại quầy",
      description: "Hành khách đến quầy đối tác của ABTRIP tại ga đi sân bay để nhận SIM vật lý hoặc thiết bị phát WiFi bỏ túi tiện lợi."
    },
    {
      step: "04",
      title: "Sử dụng mạng & Trả thiết bị",
      description: "Sử dụng mạng data mượt mà suốt chuyến đi. Khi về nước, hoàn trả bộ phát WiFi tại quầy đối tác ga đến sân bay và nhận lại tiền cọc."
    }
  ];

  const testimonials = [
    {
      author: "Chị Hứa Kim Ngân",
      role: "Travel Blogger (Kênh Ngân Balo)",
      content: "Mình đã dùng eSIM của ABTRIP cho chuyến đi Hàn Quốc vừa rồi, sóng mạng siêu tốt luôn. Quét mã QR từ lúc ở nhà, sang Incheon khởi động máy phát là có mạng đăng bài story ngay. Không phải đổi SIM vật lý nên không sợ rơi mất SIM chính."
    },
    {
      author: "Anh Vũ Đình Phong",
      role: "Trưởng đoàn Tour, Saigontourist",
      content: "Nhóm gia đình tôi 5 người thuê bộ phát WiFi của ABTRIP đi Nhật Bản rất tiện lợi và tiết kiệm. Pin khỏe dùng từ sáng tới tối mịt mới hết, 5 máy kết nối cùng lúc lướt bản đồ, liên lạc thoải mái mà chia chi phí ra mỗi người chỉ mười mấy nghìn một ngày."
    },
    {
      author: "Chị Lê Hoàng Lan",
      role: "Giám đốc Kinh doanh, GHN Express",
      content: "Gặp nhân viên nhận SIM tại sảnh đi Nội Bài rất nhanh gọn và nhiệt tình cài đặt hộ. Sóng 4G bên Singapore căng đét, giúp tôi duyệt email, check-in công việc và đặt xe Grab đi lại thông suốt trong suốt chuyến công tác."
    }
  ];

  const faqs = [
    {
      question: "Làm thế nào để biết điện thoại của tôi có hỗ trợ cài đặt eSIM du lịch hay không?",
      answer: "eSIM tương thích với hầu hết các dòng điện thoại thông minh đời mới. Để kiểm tra nhanh, đối với iPhone bạn vào Cài đặt -> Di động -> xem có dòng 'Thêm eSIM' hay không. Đối với Samsung/Android, bạn vào Cài đặt -> Kết nối -> Quản lý SIM -> kiểm tra xem có tùy chọn 'Thêm eSIM'. Hoặc bạn có thể bấm lệnh *#06# nếu màn hình hiển thị mã EID là điện thoại có hỗ trợ eSIM."
    },
    {
      question: "Nếu tôi mua eSIM nhưng sang nước bạn gặp sự cố không kết nối được mạng thì xử lý thế nào?",
      answer: "ABTRIP cung cấp đội ngũ kỹ thuật túc trực hỗ trợ trực tuyến 24/7 qua Hotline/Zalo 0788320320. Khi gặp sự cố kết nối, quý khách chỉ cần kết nối WiFi công cộng tại sân bay nước đến và nhắn tin cho chúng tôi, kỹ thuật viên sẽ kiểm tra cấu hình mạng APN hoặc cấp lại mã QR mới thay thế ngay lập tức."
    },
    {
      question: "Thủ tục đặt cọc và hoàn trả bộ phát WiFi di động được thực hiện như thế nào?",
      answer: "Khi thuê bộ phát WiFi, quý khách đặt cọc trước một khoản tiền (khoảng 1.000.000đ/thiết bị). Khi hoàn thành chuyến đi trở về Việt Nam, quý khách bàn giao lại bộ phát kèm phụ kiện tại quầy đối tác của ABTRIP ở ga đến sân bay, nhân viên sẽ kiểm tra thiết bị và hoàn trả 100% tiền cọc bằng hình thức chuyển khoản ngân hàng ngay tại quầy."
    },
    {
      question: "Tôi đi du lịch liên tuyến nhiều nước (ví dụ Sing-Mã-Thái) thì có loại SIM/WiFi nào dùng chung không?",
      answer: "Có. ABTRIP cung cấp các gói eSIM và SIM vật lý chuyên dụng liên tuyến Đông Nam Á (Sing - Mã - Thái), liên tuyến Châu Âu (40+ nước) và Toàn Cầu. Quý khách chỉ cần mua 1 SIM duy nhất và thoải mái di chuyển giữa các nước mà không cần đổi mạng viễn thông."
    }
  ];

  const config = {
    id: "thue-wifi",
    category: "airport" as const,
    title: "SIM Du Lịch Quốc Tế & WiFi Sân Bay",
    subtitle: "Kết Nối Tốc Độ Cao - Phủ Sóng Toàn Cầu 150+ Quốc Gia",
    description: "Giải pháp kết nối internet quốc tế trọn gói. Cung cấp eSIM thế hệ mới nhận mã QR online tức thì, SIM vật lý lắp dùng ngay giao tận sảnh đi sân bay, và thiết bị phát WiFi bỏ túi dung lượng không giới hạn cho nhóm đông người.",
    heroImage: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2000&auto=format&fit=crop",
    badge: "Kết nối Internet toàn cầu 5G/4G",
    geoTarget: "Nhận SIM vật lý / WiFi trực tiếp tại quầy SGN, HAN, DAD 24/7",
    geoAirports: ["SGN", "HAN", "DAD"],
    features,
    details,
    packages,
    processSteps,
    testimonials,
    faqs
  };

  return <ServiceLandingPage {...config} />;
}
